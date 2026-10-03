import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createNcbiTransport, createPubmedService, normalizeArticles, parseAbstracts, PubmedError, validateSearch } from '../server/pubmed.mjs';
import { createApp } from '../server/app.mjs';

// Synthetic unit fixtures only. They are never loaded by the application.
const fixtureXml = `<?xml version="1.0"?><!DOCTYPE PubmedArticleSet PUBLIC "-//NLM//DTD PubMedArticle//EN" "https://dtd.nlm.nih.gov/ncbi/pubmed/out/pubmed_260101.dtd"><PubmedArticleSet>
<PubmedArticle><MedlineCitation><PMID>101</PMID><Article><Abstract>
<AbstractText Label="BACKGROUND">First <i>original</i> phrase &amp; second.</AbstractText>
<AbstractText Label="RESULTS">Result sentence.</AbstractText></Abstract>
<PublicationTypeList><PublicationType UI="D016454">Review</PublicationType></PublicationTypeList>
</Article></MedlineCitation></PubmedArticle>
<PubmedArticle><MedlineCitation><PMID>102</PMID><Article /></MedlineCitation></PubmedArticle>
</PubmedArticleSet>`;
const summaries = { result: { uids: ['101', '102'], '101': { uid: '101', title: 'Synthetic <i>test</i> title.', authors: [{ name: 'Test A' }], pubdate: '2026 Oct', fulljournalname: 'Fixture Journal', articleids: [{ idtype: 'doi', value: '10.1000/ABC' }] }, '102': { uid: '102', title: 'No abstract fixture', authors: [] } } };
function fakeService(overrides = {}) {
  const calls = [];
  const request = async (utility, params) => {
    calls.push({ utility, params });
    if (utility === 'esearch.fcgi') return { esearchresult: { idlist: ['101', '102'], count: '42', querytranslation: 'NCBI interpretation' } };
    if (utility === 'esummary.fcgi') return summaries;
    return fixtureXml;
  };
  return { service: createPubmedService({ request, ...overrides }), calls };
}

test('validates and applies organism, topic, date and paging without arbitrary URLs', () => {
  const query = validateSearch({ organism: 'Plasmodium vivax', topic: 'resistance', from: '2026-01-01', to: '2026-10-03', offset: '20' });
  assert.match(query.term, /"Plasmodium vivax"\[Title\/Abstract\]/);
  assert.match(query.term, /antimicrobial resistance OR drug resistance/);
  assert.equal(query.offset, 20);
  for (const input of [{}, { q: 'a', url: 'https://example.org' }, { q: ['a', 'b'] }, { q: 'x'.repeat(501) }, { q: 'x', from: '2026-02-30' }, { q: 'x', from: '2026-10-03', to: '2026-01-01' }, { q: 'x', topic: 'unknown' }, { q: 'x', offset: '999' }, { q: 'x', offset: '1' }, { organism: 'A"[All Fields]' }, { organism: 'A |' }]) {
    assert.throws(() => validateSearch(input), error => error.status === 400);
  }
});
test('grouped species are separate quoted PubMed terms', () => {
  assert.equal(validateSearch({ organism: 'Leishmania braziliensis | Leishmania mexicana' }).term, '("Leishmania braziliensis"[Title/Abstract] OR "Leishmania mexicana"[Title/Abstract])');
});
test('preserves structured abstract text and original publication types; absent data stays absent', () => {
  const abstracts = parseAbstracts(fixtureXml);
  assert.deepEqual(abstracts.get('101').abstracts, [{ label: 'BACKGROUND', text: 'First original phrase & second.' }, { label: 'RESULTS', text: 'Result sentence.' }]);
  const articles = normalizeArticles(summaries, abstracts, ['101', '102'], '2026-10-03T12:00:00Z');
  assert.equal(articles[0].title, 'Synthetic test title.');
  assert.equal(articles[0].pubmedUrl, 'https://pubmed.ncbi.nlm.nih.gov/101/');
  assert.equal(articles[0].publicationDate, '2026 Oct');
  assert.equal(articles[0].retrievedAt, '2026-10-03T12:00:00Z');
  assert.deepEqual(articles[0].publicationTypes, ['Review']);
  assert.deepEqual(articles[1].abstracts, []);
  assert.equal(articles[1].doi, null);
  assert.equal(articles[1].publicationDate, null);
});
test('rejects malformed XML, internal entities and incomplete upstream results', () => {
  assert.throws(() => parseAbstracts('<broken>'), PubmedError);
  assert.throws(() => parseAbstracts('<!DOCTYPE a [<!ENTITY x "test">]><a/>'), PubmedError);
  assert.throws(() => normalizeArticles(summaries, new Map(), ['101'], 'date'), PubmedError);
});
test('abstract superscripts and subscripts retain their scientific meaning', () => {
  const body = '<PubmedArticleSet><PubmedArticle><MedlineCitation><PMID>1</PMID><Article><Abstract><AbstractText>10<sup>6</sup> and H<sub>2</sub>O</AbstractText></Abstract></Article></MedlineCitation></PubmedArticle></PubmedArticleSet>';
  assert.equal(parseAbstracts(body).get('1').abstracts[0].text, '10⁶ and H₂O');
});
test('deduplicates PMIDs and DOI case variants', () => {
  const summary = structuredClone(summaries);
  summary.result['102'].articleids = [{ idtype: 'doi', value: '10.1000/abc' }];
  assert.equal(normalizeArticles(summary, parseAbstracts(fixtureXml), ['101', '101', '102'], 'date').length, 1);
});
test('ESearch -> ESummary -> EFetch, date range and original NCBI trace', async () => {
  const { service, calls } = fakeService();
  const result = await service.search({ q: 'dengue', from: '2026-01-01', to: '2026-10-03', offset: '20' });
  assert.deepEqual(calls.map(call => call.utility), ['esearch.fcgi', 'esummary.fcgi', 'efetch.fcgi']);
  assert.equal(calls[0].params.datetype, 'pdat');
  assert.equal(calls[0].params.mindate, '2026/01/01');
  assert.equal(calls[0].params.maxdate, '2026/10/03');
  assert.equal(calls[0].params.retstart, 20);
  assert.equal(calls[0].params.sort, 'pub_date');
  assert.equal(result.translatedQuery, 'NCBI interpretation');
  assert.equal(result.hasMore, true);
  assert.equal(result.cacheHit, false);
  assert.ok(decodeURIComponent(result.sourceSearchUrl).includes('2026/01/01'));
  assert.ok(decodeURIComponent(result.sourceSearchUrl).includes('2026/10/03'));
});
test('coalesces concurrent searches, caches for 15 minutes and preserves retrieval timestamps', async () => {
  let clock = 1000;
  const { service, calls } = fakeService({ now: () => clock });
  const [first, concurrent] = await Promise.all([service.search({ q: 'dengue' }), service.search({ q: 'dengue' })]);
  assert.deepEqual(first, concurrent);
  assert.equal(calls.length, 3);
  clock += 5000;
  const cached = await service.search({ q: 'dengue' });
  assert.equal(cached.cacheHit, true);
  assert.equal(cached.retrievedAt, first.retrievedAt);
  assert.notEqual(cached.servedAt, first.servedAt);
  clock += 15 * 60 * 1000;
  assert.equal((await service.search({ q: 'dengue' })).cacheHit, false);
  assert.equal(calls.length, 6);
});
test('empty search only calls ESearch and does not fabricate articles', async () => {
  let calls = 0;
  const service = createPubmedService({ request: async () => { calls++; return { esearchresult: { idlist: [], count: '0' } }; } });
  assert.deepEqual((await service.search({ q: 'empty' })).articles, []);
  assert.equal(calls, 1);
});
test('failed upstream requests are not cached and may be retried', async () => {
  let calls = 0;
  const service = createPubmedService({ request: async () => { if (calls++ === 0) throw new PubmedError('network unavailable'); return { esearchresult: { idlist: [], count: '0' } }; } });
  await assert.rejects(service.search({ q: 'retry' }));
  assert.equal((await service.search({ q: 'retry' })).cacheHit, false);
});
test('global uncached-query budget limits public endpoint usage', async () => {
  const { service } = fakeService();
  for (let i = 0; i < 12; i++) await service.search({ q: `query${i}` });
  await assert.rejects(service.search({ q: 'query13' }), error => error.status === 429);
  assert.equal((await service.search({ q: 'query0' })).cacheHit, true);
});
test('transport serializes NCBI calls, including a rate-limit retry', async () => {
  let clock = 0;
  const starts = [];
  const request = createNcbiTransport({ now: () => clock, sleep: async ms => { clock += ms; }, env: { NCBI_API_KEY: 'test-secret', NCBI_EMAIL: 'test@example.org' }, fetchImpl: async url => {
    starts.push(clock);
    assert.equal(url.hostname, 'eutils.ncbi.nlm.nih.gov');
    assert.equal(url.searchParams.get('api_key'), 'test-secret');
    if (starts.length === 1) return new Response('', { status: 429, headers: { 'retry-after': '1' } });
    return Response.json({ ok: true });
  } });
  await Promise.all([request('esearch.fcgi', {}), request('esummary.fcgi', {})]);
  assert.equal(starts.length, 3);
  assert.ok(starts[1] - starts[0] >= 400 && starts[2] - starts[1] >= 400);
  await assert.rejects(request('https://example.org', {}), error => error.status === 400);
});
test('transport reports invalid JSON, NCBI errors and timeout without disclosing keys', async () => {
  for (const response of [new Response('broken'), Response.json({ error: 'test-secret' })]) {
    const request = createNcbiTransport({ sleep: async () => {}, fetchImpl: async () => response });
    await assert.rejects(request('esearch.fcgi', {}), error => error instanceof PubmedError && !error.message.includes('test-secret'));
  }
  const request = createNcbiTransport({ fetchImpl: async () => { throw new Error('https://upstream?api_key=test-secret'); }, sleep: async () => {} });
  await assert.rejects(request('esearch.fcgi', {}), error => error.status === 504 && !error.message.includes('test-secret'));
});
test('HTTP endpoint validates inputs, returns JSON errors and never falls through to SPA', async () => {
  const { service } = fakeService();
  const app = createApp({ pubmed: service });
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    const good = await fetch(`${base}/api/live/pubmed?q=dengue`);
    assert.equal(good.status, 200);
    assert.equal(good.headers.get('x-powered-by'), null);
    assert.equal(good.headers.get('cache-control'), 'no-store');
    assert.equal((await good.json()).articles.length, 2);
    assert.equal((await fetch(`${base}/api/live/pubmed?q=one&q=two`)).status, 400);
    assert.equal((await fetch(`${base}/api/not-found`)).status, 404);
    assert.equal((await (await fetch(`${base}/api/live/sources`)).json())[0].id, 'mspas');
  } finally { await new Promise(resolve => server.close(resolve)); }
});
