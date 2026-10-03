import { createNcbiTransport, createPubmedService, PubmedError, validateSearch } from './pubmed.mjs';
import { sourceAdapters } from './sources.mjs';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};
const json = (value, status = 200, extra = {}) => new Response(JSON.stringify(value), { status, headers: { ...headers, ...extra } });

// Dependencies are injectable for tests; no pending requests are shared between
// Workers invocations. NCBI credentials stay in server-side environment bindings.
export function createWorker({ cache = () => caches.default, service = env => createPubmedService({ request: createNcbiTransport({ env, fetchImpl: (url, options) => fetch(url.toString(), options) }) }) } = {}) {
  return {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
      if (url.pathname !== '/api' && !url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
      if (request.method !== 'GET') return json({ error: 'Método no permitido.' }, 405, { Allow: 'GET' });
      if (url.pathname === '/api/health') return json({ status: 'ok', source: 'PubMed', mode: 'manual', platform: 'Cloudflare Workers' });
      if (url.pathname === '/api/live/sources') return json(sourceAdapters);
      if (url.pathname !== '/api/live/pubmed') return json({ error: 'Ruta no disponible.' }, 404);
      try {
        const input = Object.create(null);
        for (const [key, value] of url.searchParams) {
          if (Object.hasOwn(input, key)) throw new PubmedError('Parámetro de búsqueda repetido.', 400);
          input[key] = value;
        }
        const search = validateSearch(input);
        const cacheUrl = new URL('/__pubmed_cache_v1', url.origin);
        cacheUrl.searchParams.set('query', JSON.stringify(search));
        const key = new Request(cacheUrl);
        const store = cache();
        const cached = await store.match(key);
        if (cached) return json({ ...await cached.json(), cacheHit: true, servedAt: new Date().toISOString() });
        // Conservative shared budget per Cloudflare location; not a global NCBI
        // quota. Cached queries do not contact NCBI or consume this budget.
        if (!env.PUBMED_LIMIT) return json({ error: 'Falta configurar el límite de consultas PubMed.' }, 503);
        const { success } = await env.PUBMED_LIMIT.limit({ key: 'infectoatlas-pubmed' });
        if (!success) return json({ error: 'Espera diez segundos antes de otra consulta nueva a PubMed.' }, 429, { 'Retry-After': '10' });
        const result = await service(env).search(input);
        ctx.waitUntil(store.put(key, new Response(JSON.stringify(result), { headers: { 'Content-Type': headers['Content-Type'], 'Cache-Control': 'public, max-age=900' } })).catch(() => {}));
        return json(result);
      } catch (error) {
        if (error.cause) {
          let reason = String(error.cause.message || error.cause.name || 'transport error').replace(/https?:\/\/\S+/g, '[URL omitida]');
          for (const secret of [env.NCBI_API_KEY, env.NCBI_EMAIL].filter(Boolean)) reason = reason.replaceAll(secret, '[omitido]');
          console.error('PubMed transport:', reason.slice(0, 240));
        }
        const known = error instanceof PubmedError;
        return json({ error: known ? error.message : 'No se pudo recuperar la información de PubMed. Reintenta la consulta.' }, known ? error.status : 502, known && error.retryAfter ? { 'Retry-After': String(error.retryAfter) } : {});
      }
    },
  };
}

export default createWorker();
