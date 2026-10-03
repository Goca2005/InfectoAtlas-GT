import { Buffer } from 'node:buffer';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
import { pubmedSearchUrl } from '../shared/pubmedUrl.mjs';

export const EUTILS_BASE = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
export const TOPICS = Object.freeze({
  all: '',
  diagnosis: 'diagnosis',
  treatment: 'therapy OR treatment',
  resistance: 'antimicrobial resistance OR drug resistance',
  epidemiology: 'epidemiology',
  vaccines: 'vaccines OR vaccination',
});

export class PubmedError extends Error {
  constructor(message, status = 502, retryAfter = undefined) {
    super(message);
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

export function validateSearch(input) {
  const allowed = new Set(['q', 'organism', 'topic', 'from', 'to', 'offset']);
  for (const key of Object.keys(input)) {
    if (!allowed.has(key) || typeof input[key] !== 'string') {
      throw new PubmedError('Parámetro de búsqueda no válido.', 400);
    }
  }
  const q = (input.q ?? '').trim();
  const organism = (input.organism ?? '').trim();
  if (q.length > 500 || organism.length > 180 || /[\x00-\x1f]/.test(q + organism) || /["\[\]]/.test(organism)) {
    throw new PubmedError('La consulta es demasiado larga o contiene caracteres no permitidos.', 400);
  }
  if (!q && !organism) throw new PubmedError('Escribe una búsqueda o selecciona un microorganismo.', 400);
  const topic = input.topic ?? 'all';
  if (!Object.hasOwn(TOPICS, topic)) throw new PubmedError('Tema no válido.', 400);
  const date = value => {
    if (!value) return '';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) {
      throw new PubmedError('Fecha no válida. Usa AAAA-MM-DD.', 400);
    }
    return value;
  };
  const from = date(input.from);
  const to = date(input.to);
  if (from && to && from > to) throw new PubmedError('La fecha inicial debe ser anterior a la final.', 400);
  if (input.offset && !/^\d{1,3}$/.test(input.offset)) throw new PubmedError('Página no válida.', 400);
  const offset = Number(input.offset ?? 0);
  if (offset > 180 || offset % 20 !== 0) throw new PubmedError('Se permiten hasta diez páginas de veinte resultados.', 400);
  const organismTerms = organism.split('|').map(name => name.trim());
  if (organism && (organismTerms.length > 4 || organismTerms.some(name => !name))) throw new PubmedError('Microorganismo no válido.', 400);
  const terms = [organism ? organismTerms.map(name => `"${name}"[Title/Abstract]`).join(' OR ') : '', q, TOPICS[topic]].filter(Boolean);
  const term = terms.map(part => `(${part})`).join(' AND ');
  return { q, organism, topic, from, to, offset, term };
}

const parser = new XMLParser({ preserveOrder: true, ignoreAttributes: false, trimValues: false, parseTagValue: false });
const children = (nodes, name) => (nodes ?? []).filter(node => Array.isArray(node[name]));
const first = (nodes, name) => children(nodes, name)[0]?.[name] ?? [];
function textContent(nodes) {
  return (nodes ?? []).map(node => Object.entries(node).filter(([key]) => key !== ':@')
    .map(([key, value]) => {
      if (key === '#text') return String(value);
      if (!Array.isArray(value)) return '';
      const text = textContent(value);
      if (key === 'sup' || key === 'sub') {
        const normal = '0123456789+-=()';
        const script = key === 'sup' ? '⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾' : '₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎';
        return [...text].every(char => normal.includes(char)) ? [...text].map(char => script[normal.indexOf(char)]).join('') : `${key === 'sup' ? '^' : '_'}(${text})`;
      }
      return text;
    }).join('')).join('');
}
const clean = nodes => textContent(nodes).replace(/\s+/g, ' ').trim();
function xml(body) {
  // NCBI includes an external PubmedArticleSet DTD. It is never downloaded.
  if (/<!ENTITY|<!DOCTYPE[^>]*\[/i.test(body)) throw new PubmedError('PubMed devolvió XML no válido.');
  body = body.replace(/<!DOCTYPE\s+PubmedArticleSet\s+PUBLIC\s+"[^"]*"\s+"https:\/\/dtd\.nlm\.nih\.gov\/[^"<>]*"\s*>/i, '');
  if (/<!DOCTYPE/i.test(body) || XMLValidator.validate(body) !== true) {
    throw new PubmedError('PubMed devolvió XML no válido.');
  }
  return parser.parse(body);
}
function titleText(value) {
  if (typeof value !== 'string') return '';
  try { return clean(first(xml(`<title>${value}</title>`), 'title')); }
  catch { return value; }
}
export function parseAbstracts(body) {
  const result = new Map();
  const root = first(xml(body), 'PubmedArticleSet');
  for (const item of children(root, 'PubmedArticle')) {
    const citation = first(item.PubmedArticle, 'MedlineCitation');
    const pmid = clean(first(citation, 'PMID'));
    const article = first(citation, 'Article');
    const abstracts = children(first(article, 'Abstract'), 'AbstractText').map(section => ({
      label: section[':@']?.['@_Label'] || null,
      text: clean(section.AbstractText),
    })).filter(section => section.text);
    const publicationTypes = children(first(article, 'PublicationTypeList'), 'PublicationType').map(node => clean(node.PublicationType)).filter(Boolean);
    if (/^\d+$/.test(pmid)) result.set(pmid, { abstracts, publicationTypes });
  }
  for (const item of children(root, 'PubmedBookArticle')) {
    const document = first(item.PubmedBookArticle, 'BookDocument');
    const pmid = clean(first(document, 'PMID'));
    if (/^\d+$/.test(pmid)) result.set(pmid, {
      abstracts: children(first(document, 'Abstract'), 'AbstractText').map(section => ({ label: section[':@']?.['@_Label'] || null, text: clean(section.AbstractText) })).filter(section => section.text),
      publicationTypes: [],
    });
  }
  return result;
}

export function normalizeArticles(summary, abstracts, ids, retrievedAt) {
  if (!summary?.result || !Array.isArray(summary.result.uids)) throw new PubmedError('PubMed devolvió metadatos no válidos.');
  const seenPmids = new Set();
  const seenDois = new Set();
  const articles = [];
  for (const pmid of ids) {
    const item = summary.result[pmid];
    if (!item || item.error || item.uid !== pmid || !item.title) throw new PubmedError('PubMed no devolvió todos los registros solicitados. Reintenta la consulta.');
    const doi = item.articleids?.find(id => id.idtype === 'doi')?.value?.trim() || null;
    const doiKey = doi?.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '').toLowerCase();
    if (seenPmids.has(pmid) || (doiKey && seenDois.has(doiKey))) continue;
    seenPmids.add(pmid);
    if (doiKey) seenDois.add(doiKey);
    const detail = abstracts.get(pmid);
    if (!detail) throw new PubmedError('PubMed no devolvió el registro XML completo. Reintenta la consulta.');
    articles.push({
      pmid, doi, title: titleText(item.title),
      authors: (item.authors ?? []).map(author => author.name).filter(Boolean),
      journal: item.fulljournalname || item.source || null,
      publicationDate: item.pubdate || null,
      electronicPublicationDate: item.epubdate || null,
      publicationTypes: detail.publicationTypes,
      abstracts: detail.abstracts,
      pubmedUrl: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`,
      retrievedAt, source: 'PubMed / NCBI',
      verificationStatus: 'Publicación científica recuperada',
    });
  }
  return articles;
}

// One shared queue per server process: <= 2.5 requests/second, including retries.
export function createNcbiTransport({ fetchImpl = fetch, sleep = ms => new Promise(resolve => setTimeout(resolve, ms)), now = Date.now, env = process.env } = {}) {
  let tail = Promise.resolve();
  let lastStarted = -Infinity;
  let queued = 0;
  return async function request(utility, params, format = 'json') {
    if (!['esearch.fcgi', 'esummary.fcgi', 'efetch.fcgi'].includes(utility)) throw new PubmedError('Servicio no permitido.', 400);
    if (queued >= 24) throw new PubmedError('PubMed está ocupado. Intenta de nuevo en un minuto.', 429, 60);
    queued++;
    const operation = tail.then(async () => {
      const url = new URL(utility, EUTILS_BASE);
      for (const [key, value] of Object.entries({ ...params, db: 'pubmed', tool: 'InfectoAtlasGT' })) url.searchParams.set(key, String(value));
      if (env.NCBI_API_KEY) url.searchParams.set('api_key', env.NCBI_API_KEY);
      if (env.NCBI_EMAIL) url.searchParams.set('email', env.NCBI_EMAIL);
      for (let attempt = 0; attempt < 2; attempt++) {
        await sleep(Math.max(0, 400 - (now() - lastStarted)));
        lastStarted = now();
        let response;
        try {
          response = await fetchImpl(url, { signal: AbortSignal.timeout(12000), redirect: 'error', headers: { Accept: format === 'json' ? 'application/json' : 'application/xml' } });
        } catch (cause) {
          const error = new PubmedError('No fue posible conectar con PubMed o se agotó el tiempo de espera.', 504);
          error.cause = cause;
          throw error;
        }
        if ((response.status === 429 || response.status === 503) && attempt === 0) {
          const waitSeconds = Math.min(3, Math.max(1, Number(response.headers.get('retry-after')) || 1));
          await response.body?.cancel();
          await sleep(waitSeconds * 1000);
          continue;
        }
        if (!response.ok) {
          await response.body?.cancel();
          throw new PubmedError(response.status === 429 ? 'NCBI limitó temporalmente las consultas.' : 'PubMed no pudo completar la consulta.', response.status === 429 ? 429 : 502, response.status === 429 ? 60 : undefined);
        }
        const reader = response.body.getReader();
        const chunks = [];
        let length = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          length += value.byteLength;
          if (length > 4 * 1024 * 1024) { await reader.cancel(); throw new PubmedError('La respuesta PubMed excede el tamaño permitido.'); }
          chunks.push(value);
        }
        const body = Buffer.concat(chunks).toString('utf8');
        if (format === 'xml') return body;
        let data;
        try { data = JSON.parse(body); } catch { throw new PubmedError('PubMed devolvió una respuesta no válida.'); }
        if (data.error || data.esearchresult?.ERROR || data.esearchresult?.errorlist) throw new PubmedError('PubMed rechazó la consulta. Revisa los términos de búsqueda.', 422);
        return data;
      }
    });
    tail = operation.catch(() => {}).finally(() => { queued--; });
    return operation;
  };
}

export function createPubmedService({ request = createNcbiTransport(), now = Date.now, cacheMs = 15 * 60 * 1000 } = {}) {
  const cache = new Map();
  const inFlight = new Map();
  let windowStart = now();
  let uncachedQueries = 0;
  return {
    async search(input) {
      const search = validateSearch(input);
      const key = JSON.stringify(search);
      const cached = cache.get(key);
      if (cached && now() - cached.time < cacheMs) return { ...cached.value, cacheHit: true, servedAt: new Date(now()).toISOString() };
      if (inFlight.has(key)) return inFlight.get(key);
      if (now() - windowStart >= 60000) { windowStart = now(); uncachedQueries = 0; }
      if (uncachedQueries >= 12 || inFlight.size >= 4) throw new PubmedError('Se alcanzó el límite temporal de consultas. Reintenta en un minuto.', 429, 60);
      uncachedQueries++;
      const operation = (async () => {
        const params = { term: search.term, retmode: 'json', retmax: 20, retstart: search.offset, sort: 'pub_date' };
        if (search.from || search.to) {
          params.datetype = 'pdat';
          if (search.from) params.mindate = search.from.replaceAll('-', '/');
          if (search.to) params.maxdate = search.to.replaceAll('-', '/');
        }
        const found = await request('esearch.fcgi', params);
        const ids = found.esearchresult?.idlist;
        const total = Number(found.esearchresult?.count);
        if (!Array.isArray(ids) || ids.length > 20 || !ids.every(id => typeof id === 'string' && /^\d+$/.test(id)) || !Number.isSafeInteger(total) || total < 0) throw new PubmedError('PubMed devolvió una búsqueda no válida.');
        let articles = [];
        if (ids.length) {
          const summary = await request('esummary.fcgi', { id: ids.join(','), retmode: 'json' });
          const abstracts = parseAbstracts(await request('efetch.fcgi', { id: ids.join(','), retmode: 'xml' }, 'xml'));
          articles = normalizeArticles(summary, abstracts, ids, new Date(now()).toISOString());
        }
        const retrievedAt = new Date(now()).toISOString();
        const value = {
          articles, total, offset: search.offset, pageSize: 20,
          hasMore: search.offset + ids.length < Math.min(total, 200),
          query: search, translatedQuery: found.esearchresult.querytranslation || search.term,
          retrievedAt, servedAt: retrievedAt, cacheHit: false,
          source: 'PubMed / NCBI E-utilities',
          sourceSearchUrl: pubmedSearchUrl(search.term, search.from, search.to),
        };
        cache.delete(key);
        if (cache.size >= 50) cache.delete(cache.keys().next().value);
        cache.set(key, { time: now(), value });
        return value;
      })();
      inFlight.set(key, operation);
      try { return await operation; } finally { inFlight.delete(key); }
    },
  };
}
