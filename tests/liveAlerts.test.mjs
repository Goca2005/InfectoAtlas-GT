import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LiveRepository, LiveSearchError } from '../src/services/liveService.ts';
import { refreshFollowed } from '../src/services/followedRefresh.ts';
import { LocalStorageRepository } from '../src/services/storageService.ts';
import { INITIAL_MICROORGANISMS } from '../src/data/microorganisms.ts';
import { collectAlerts, readAlerts } from '../src/services/liveAlerts.ts';

const time = '2026-10-03T12:00:00Z';
const species = INITIAL_MICROORGANISMS.find(item => item.id === 'plasmodium-vivax');
class Storage {
  map = new Map();
  getItem(key) { return this.map.get(key) ?? null; }
  setItem(key, value) { this.map.set(key, value); }
  removeItem(key) { this.map.delete(key); }
}
function article(pmid = '101', doi = null) {
  return { pmid, doi, title: 'Synthetic Plasmodium vivax fixture', authors: [], journal: null, publicationDate: '2026 Oct', electronicPublicationDate: null,
    publicationTypes: [], abstracts: [], pubmedUrl: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`, retrievedAt: time,
    source: 'PubMed / NCBI', verificationStatus: 'Publicación científica recuperada', relatedOrganismIds: [species.id] };
}
function result(articles = [article()]) {
  return { articles, query: { term: 'fixture', q: '', organism: 'Plasmodium vivax', topic: 'all', from: '', to: '', offset: 0 },
    retrievedAt: time, servedAt: time, total: articles.length, pageSize: 20, offset: 0, hasMore: false, cacheHit: false,
    translatedQuery: 'fixture', source: 'PubMed / NCBI', sourceSearchUrl: 'https://pubmed.ncbi.nlm.nih.gov/?term=fixture' };
}
function repository() { const storage = new Storage(); const repo = new LiveRepository(storage); repo.toggleFollow(species.id); return { storage, repo }; }

test('new followed publications produce sourced alerts; repeat/cache preserves read state', () => {
  const { repo } = repository();
  assert.equal(repo.recordSuccess(result(), time, INITIAL_MICROORGANISMS, species.id).newAlerts, 1);
  const alert = repo.readAlerts().alerts[0];
  assert.equal(alert.pmid, '101'); assert.equal(alert.sourceSearchUrl, result().sourceSearchUrl);
  assert.equal(alert.retrievedAt, time); assert.equal(alert.readAt, null);
  repo.markAlertsRead([alert.id]); const readAt = repo.readAlerts().alerts[0].readAt;
  assert.equal(repo.recordSuccess({ ...result(), cacheHit: true }, time, INITIAL_MICROORGANISMS, species.id).newAlerts, 0);
  assert.equal(repo.readAlerts().alerts.length, 1); assert.equal(repo.readAlerts().alerts[0].readAt, readAt);
  repo.markAlertsRead([alert.id], false); assert.equal(repo.readAlerts().alerts[0].readAt, null);
});
test('unfollowed and already known publications do not produce retroactive alerts', () => {
  const storage = new Storage(); const repo = new LiveRepository(storage);
  repo.recordSuccess(result(), time, INITIAL_MICROORGANISMS, species.id);
  assert.equal(repo.readAlerts().alerts.length, 0);
  repo.toggleFollow(species.id); repo.recordSuccess(result(), time, INITIAL_MICROORGANISMS, species.id);
  assert.equal(repo.readAlerts().alerts.length, 0);
  storage.setItem('infectoatlas_user_settings_v1', JSON.stringify({ infectoAtlasLiveV1: repo.read() }));
  assert.equal(repo.readAlerts().seenKeys.includes('pmid:101'), true);
  repo.recordSuccess(result(), time, INITIAL_MICROORGANISMS, species.id);
  assert.equal(repo.readAlerts().alerts.length, 0);
});
test('normalized DOI avoids duplicate alerts across PMIDs and links multiple followed species', () => {
  const { repo } = repository(); const other = INITIAL_MICROORGANISMS.find(item => item.id !== species.id);
  repo.toggleFollow(other.id);
  repo.recordSuccess(result([article('101', '10.1000/ABC')]), time, INITIAL_MICROORGANISMS, species.id);
  repo.recordSuccess(result([article('102', 'https://doi.org/10.1000/abc')]), time, INITIAL_MICROORGANISMS, other.id);
  assert.equal(repo.readAlerts().alerts.length, 1);
  assert.deepEqual(repo.readAlerts().alerts[0].organismIds, [species.id, other.id]);
});
test('alerts survive article eviction and ledger is bounded', () => {
  let state = collectAlerts(readAlerts(undefined, []), [article()], [species.id], result(), time);
  state = collectAlerts(state, Array.from({ length: 1100 }, (_, i) => article(String(i + 200), `10.fixture/${i}`)), [], result(), time);
  assert.equal(state.seenKeys.length, 1000);
  state = collectAlerts(state, [article()], [species.id], result(), time);
  assert.equal(state.alerts.length, 1);
  state = collectAlerts(state, Array.from({ length: 150 }, (_, i) => article(String(i + 2000))), [species.id], result(), time);
  assert.equal(state.alerts.length, 100);
});
test('alerts and read states restore through existing verified backup', async () => {
  const { storage, repo } = repository(); repo.recordSuccess(result(), time, INITIAL_MICROORGANISMS, species.id);
  repo.markAlertsRead([repo.readAlerts().alerts[0].id]);
  const json = await new LocalStorageRepository(storage).exportBackupJSON();
  const target = new Storage(); const backup = new LocalStorageRepository(target);
  const current = await backup.getBackupData(); const plan = await backup.inspectBackupJSON(json, current);
  assert.equal(plan.valid, true); await backup.applyBackupImport(plan, 'restore', current);
  assert.deepEqual(new LiveRepository(target).readAlerts(), repo.readAlerts());
});
test('corrupt alerts and quota errors preserve the entire previous settings', () => {
  const { storage, repo } = repository();
  storage.setItem('infectoatlas_user_settings_v1', JSON.stringify({ infectoAtlasLiveV1: repo.read(), infectoAtlasAlertsV1: { version: 2 } }));
  const before = storage.getItem('infectoatlas_user_settings_v1');
  assert.throws(() => repo.recordSuccess(result(), time, INITIAL_MICROORGANISMS), /bandeja/);
  assert.equal(storage.getItem('infectoatlas_user_settings_v1'), before);
  assert.throws(() => repo.markAlertsRead([]), /bandeja/);
  const second = repository(); const saved = second.storage.getItem('infectoatlas_user_settings_v1');
  second.storage.setItem = () => { throw new Error('quota'); };
  assert.throws(() => second.repo.recordSuccess(result(), time, INITIAL_MICROORGANISMS), /quota/);
  assert.equal(second.storage.getItem('infectoatlas_user_settings_v1'), saved);
});
test('marking all read does not remove source metadata or other settings', () => {
  const { storage, repo } = repository(); const settings = JSON.parse(storage.getItem('infectoatlas_user_settings_v1'));
  storage.setItem('infectoatlas_user_settings_v1', JSON.stringify({ ...settings, theme: 'navy' }));
  repo.recordSuccess(result([article('101'), article('102')]), time, INITIAL_MICROORGANISMS);
  const before = repo.readAlerts(); repo.markAlertsRead(before.alerts.map(alert => alert.id));
  assert.equal(repo.readAlerts().alerts.filter(alert => !alert.readAt).length, 0);
  assert.equal(repo.readAlerts().alerts[0].sourceSearchUrl, before.alerts[0].sourceSearchUrl);
  assert.equal(JSON.parse(storage.getItem('infectoatlas_user_settings_v1')).theme, 'navy');
});
const batch = (repo, search, signal = new AbortController().signal, organisms = [species]) => ({
  organisms, from: '2026-09-01', to: '2026-10-03', signal, repository: repo, catalogue: INITIAL_MICROORGANISMS, search, onProgress: () => {},
});
test('batch queries followed species sequentially and creates alerts once', async () => {
  const { repo } = repository(); const other = INITIAL_MICROORGANISMS.find(item => item.id !== species.id); repo.toggleFollow(other.id);
  let active = 0; let maxActive = 0; const calls = [];
  const search = async input => { active++; maxActive = Math.max(maxActive, active); calls.push(input); await Promise.resolve(); active--; return result(); };
  const output = await refreshFollowed(batch(repo, search, undefined, [species, other]));
  assert.equal(output.length, 2); assert.equal(maxActive, 1);
  assert.equal(output[0].newAlerts, 1); assert.equal(output[1].newAlerts, 0);
  assert.equal(calls[0].from, '2026-09-01'); assert.equal(calls[0].offset, 0);
});
test('batch validates follows, dates and maximum before any request', async () => {
  const { repo } = repository(); let calls = 0; const search = async () => { calls++; return result(); };
  await assert.rejects(refreshFollowed(batch(repo, search, undefined, [])), /uno y diez/);
  await assert.rejects(refreshFollowed(batch(repo, search, undefined, [species, species])), /diferentes/);
  await assert.rejects(refreshFollowed({ ...batch(repo, search), from: '2026-02-30' }), /fechas/);
  await assert.rejects(refreshFollowed(batch(repo, search, undefined, INITIAL_MICROORGANISMS.slice(0, 11))), /diez/);
  repo.toggleFollow(species.id); await assert.rejects(refreshFollowed(batch(repo, search)), /seguidos/);
  assert.equal(calls, 0);
});
test('cancel prevents saving an in-flight response and further requests', async () => {
  const { repo } = repository(); const controller = new AbortController();
  const output = await refreshFollowed(batch(repo, async () => { controller.abort(); return result(); }, controller.signal));
  assert.deepEqual(output, []); assert.equal(repo.read().history.length, 0); assert.equal(repo.readAlerts().alerts.length, 0);
});
test('429 and upstream failure stop batch while preserving history and successful work', async () => {
  for (const status of [429, 502]) {
    const { repo } = repository(); const other = INITIAL_MICROORGANISMS.find(item => item.id !== species.id); repo.toggleFollow(other.id);
    let calls = 0;
    const output = await refreshFollowed(batch(repo, async () => { calls++; throw new LiveSearchError('limited', status); }, undefined, [species, other]));
    assert.equal(calls, 1); assert.equal(output[0].success, false); assert.equal(repo.read().history[0].success, false);
  }
});
test('partial batch preserves completed results when the following request fails', async () => {
  const { repo } = repository(); const others = INITIAL_MICROORGANISMS.filter(item => item.id !== species.id).slice(0, 2);
  others.forEach(organism => repo.toggleFollow(organism.id)); let calls = 0;
  const output = await refreshFollowed(batch(repo, async () => { if (++calls === 1) return result(); throw new LiveSearchError('unavailable', 503); }, undefined, [species, ...others]));
  assert.equal(calls, 2); assert.equal(output.length, 2); assert.equal(output[0].success, true); assert.equal(output[1].success, false);
  assert.equal(repo.readAlerts().alerts.length, 1); assert.equal(repo.read().history.length, 2);
});
