import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createWorker, workerFetch } from '../server/worker.mjs';
import { createNcbiTransport, PubmedError } from '../server/pubmed.mjs';

test('Worker uses manual redirects and rejects a redirect without forwarding credentials', async () => {
  const original = globalThis.fetch; const calls = [];
  globalThis.fetch = async (url, options) => { calls.push({ url, options }); return new Response('', { status: 302, headers: { Location: 'https://untrusted.example/' } }); };
  try {
    const transport = createNcbiTransport({ env: { NCBI_API_KEY: 'synthetic-test-key' }, fetchImpl: workerFetch, sleep: async () => {} });
    await assert.rejects(transport('esearch.fcgi', { term: 'malaria' }), error => error instanceof PubmedError && error.status === 502);
    assert.equal(calls.length, 1); assert.equal(calls[0].options.redirect, 'manual');
    assert.ok(calls[0].url.startsWith('https://eutils.ncbi.nlm.nih.gov/')); assert.ok(calls[0].options.signal instanceof AbortSignal);
  } finally { globalThis.fetch = original; }
});

function fixture({ cached, limited = false, error } = {}) {
  const pending = []; let calls = 0; let budgets = 0; let saved;
  const worker = createWorker({ cache: () => ({ match: async () => cached && Response.json(cached), put: async (_key, response) => { saved = await response.json(); } }), service: () => ({ search: async input => { calls++; if (error) throw error; return { articles: [], total: 0, query: input, cacheHit: false }; } }) });
  const env = { ASSETS: { fetch: async () => new Response('SPA') }, PUBMED_LIMIT: { limit: async () => { budgets++; return { success: !limited }; } } };
  return { run: (path, method = 'GET') => worker.fetch(new Request(`https://atlas.example${path}`, { method }), env, { waitUntil: promise => pending.push(promise) }), pending, stats: () => ({ calls, budgets, saved }) };
}

test('Worker serves health and assets separately from API', async () => {
  const f = fixture(); assert.equal((await (await f.run('/api/health')).json()).status, 'ok');
  assert.equal(await (await f.run('/ficha')).text(), 'SPA');
  assert.equal((await f.run('/api/unknown')).status, 404);
  assert.equal((await f.run('/api/live/pubmed?q=malaria', 'POST')).status, 405);
});
test('Worker rejects repeated and invalid parameters before using NCBI', async () => {
  const f = fixture();
  for (const path of ['/api/live/pubmed?q=a&q=b', '/api/live/pubmed?url=https://example.com', '/api/live/pubmed?q=a&from=2026-02-30']) assert.equal((await f.run(path)).status, 400);
  assert.equal(f.stats().calls, 0); assert.equal(f.stats().budgets, 0);
});
test('Worker cache returns original provenance without spending query budget', async () => {
  const f = fixture({ cached: { articles: [{ pmid: '123' }], retrievedAt: '2026-10-03T00:00:00Z' } });
  const data = await (await f.run('/api/live/pubmed?q=malaria')).json();
  assert.equal(data.cacheHit, true); assert.equal(data.retrievedAt, '2026-10-03T00:00:00Z'); assert.equal(f.stats().budgets, 0);
});
test('Worker limits uncached queries with a retry interval', async () => {
  const f = fixture({ limited: true }); const response = await f.run('/api/live/pubmed?q=malaria');
  assert.equal(response.status, 429); assert.equal(response.headers.get('Retry-After'), '10'); assert.equal(f.stats().calls, 0);
});
test('Worker stores successful NCBI results and masks unexpected errors', async () => {
  const f = fixture(); assert.equal((await f.run('/api/live/pubmed?q=malaria')).status, 200); await Promise.all(f.pending); assert.equal(f.stats().saved.total, 0);
  const failed = fixture({ error: new Error('private credential') }); const response = await failed.run('/api/live/pubmed?q=malaria');
  assert.equal(response.status, 502); assert.ok(!(await response.text()).includes('private credential'));
});
