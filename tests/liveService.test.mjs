import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LiveRepository, mergeArticles, searchPubmed } from '../src/services/liveService.ts';
import { LocalStorageRepository } from '../src/services/storageService.ts';
import { INITIAL_MICROORGANISMS } from '../src/data/microorganisms.ts';
import { organismSearchTerm } from '../shared/organismTerms.mjs';
import { epidemiologyService } from '../src/services/epidemiologyService.ts';

class MemoryStorage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, value); }
  removeItem(key) { this.values.delete(key); }
}
const article = { pmid: '101', doi: '10.1000/abc', title: 'Synthetic Plasmodium vivax fixture', authors: [], journal: null, publicationDate: null, electronicPublicationDate: null, publicationTypes: [], abstracts: [], retrievedAt: '2026-10-03T12:00:00Z', pubmedUrl: 'https://pubmed.ncbi.nlm.nih.gov/101/', source: 'PubMed / NCBI', verificationStatus: 'Publicación científica recuperada' };
const result = { articles: [article], query: { term: 'test-query', q: 'test-query', organism: '', from: '', to: '', topic: 'all', offset: 0 }, retrievedAt: article.retrievedAt, servedAt: article.retrievedAt, cacheHit: false, hasMore: false, offset: 0, pageSize: 20, sourceSearchUrl: 'https://pubmed.ncbi.nlm.nih.gov/?term=test-query' };
test('retains existing preferences and follows species independently from bookmarks', () => {
  const storage = new MemoryStorage();
  storage.setItem('infectoatlas_user_settings_v1', JSON.stringify({ language: 'es' }));
  const repository = new LiveRepository(storage);
  repository.toggleFollow('plasmodium-vivax');
  assert.deepEqual(repository.read().followedIds, ['plasmodium-vivax']);
  assert.equal(JSON.parse(storage.getItem('infectoatlas_user_settings_v1')).language, 'es');
  assert.equal(storage.getItem('infectoatlas_bookmarks_v3'), null);
  repository.toggleFollow('plasmodium-vivax');
  assert.deepEqual(repository.read().followedIds, []);
});
test('cross-query deduplication by PMID/DOI merges organism links', () => {
  const merged = mergeArticles([{ ...article, relatedOrganismIds: ['a'] }], [{ ...article, pmid: '102', doi: 'https://doi.org/10.1000/ABC', relatedOrganismIds: ['b'] }]);
  assert.equal(merged.newRecords, 0);
  assert.equal(merged.articles.length, 1);
  assert.deepEqual(merged.articles[0].relatedOrganismIds, ['a', 'b']);
});
test('history records new counts, failed attempts and preserves the last success', () => {
  const repository = new LiveRepository(new MemoryStorage());
  assert.equal(repository.recordSuccess(result, article.retrievedAt, INITIAL_MICROORGANISMS).newRecords, 1);
  assert.equal(repository.recordSuccess(result, article.retrievedAt, INITIAL_MICROORGANISMS).newRecords, 0);
  repository.recordFailure('failed-query', article.retrievedAt, 'network unavailable');
  const state = repository.read();
  assert.equal(state.history[0].success, false);
  assert.equal(state.history.find(entry => entry.success).newRecords, 0);
  assert.ok(state.articles[0].relatedOrganismIds.includes('plasmodium-vivax'));
});
test('followed species, articles and history round-trip through the existing SHA-256 backup', async () => {
  const sourceStorage = new MemoryStorage();
  const live = new LiveRepository(sourceStorage);
  live.toggleFollow('plasmodium-vivax');
  live.recordSuccess(result, article.retrievedAt, INITIAL_MICROORGANISMS);
  const source = new LocalStorageRepository(sourceStorage);
  const json = await source.exportBackupJSON();
  const targetStorage = new MemoryStorage();
  const target = new LocalStorageRepository(targetStorage);
  const current = await target.getBackupData();
  const plan = await target.inspectBackupJSON(json, current);
  assert.equal(plan.valid, true);
  await target.applyBackupImport(plan, 'restore', current);
  assert.deepEqual(new LiveRepository(targetStorage).read(), live.read());
});
test('damaged settings and storage quota errors do not silently replace local data', () => {
  const storage = new MemoryStorage();
  storage.setItem('infectoatlas_user_settings_v1', '{invalid');
  assert.throws(() => new LiveRepository(storage).toggleFollow('a'));
  assert.equal(storage.getItem('infectoatlas_user_settings_v1'), '{invalid');
  const repository = new LiveRepository({ getItem: () => null, setItem: () => { throw new Error('quota'); } });
  assert.throws(() => repository.toggleFollow('a'), /quota/);
});
test('client sends only supported query parameters and handles missing backend/errors', async () => {
  const previous = globalThis.fetch;
  try {
    globalThis.fetch = async url => {
      assert.ok(!url.includes('term='));
      assert.ok(!url.includes('api_key'));
      return Response.json({ ...result, total: 1 });
    };
    await searchPubmed({ q: 'x', organism: '', topic: 'all', from: '', to: '', offset: 20, term: 'extra' }, new AbortController().signal);
    globalThis.fetch = async () => new Response('<html>SPA</html>');
    await assert.rejects(searchPubmed({}, new AbortController().signal), /servidor/);
    globalThis.fetch = async () => Response.json({ error: 'Rate limit' }, { status: 429 });
    await assert.rejects(searchPubmed({}, new AbortController().signal), /Rate limit/);
  } finally { globalThis.fetch = previous; }
});
test('keeps the 24 existing catalogue records and starts without invented official alerts', () => {
  assert.equal(INITIAL_MICROORGANISMS.length, 24);
  assert.equal(new Set(INITIAL_MICROORGANISMS.map(item => item.id)).size, 24);
  assert.deepEqual(epidemiologyService.getReports(), []);
  assert.equal(organismSearchTerm(INITIAL_MICROORGANISMS.find(item => item.id === 'virus-del-dengue')), 'Dengue virus');
  assert.match(organismSearchTerm(INITIAL_MICROORGANISMS.find(item => item.id === 'leishmania-braziliensis')), /Leishmania mexicana/);
});
