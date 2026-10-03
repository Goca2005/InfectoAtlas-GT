import { test } from 'node:test';
import assert from 'node:assert/strict';
import { officialSourceUrl } from '../shared/officialSources.mjs';
import { OfficialBulletinRepository, validateBulletinInput, bulletinAcademicDocument, appendBulletinToLibrary } from '../src/services/officialBulletins.ts';
import { LocalStorageRepository } from '../src/services/storageService.ts';
import { INITIAL_MICROORGANISMS } from '../src/data/microorganisms.ts';
import { analyzeAcademicDocument } from '../src/services/aiDocumentAnalyzer.ts';
import { sourceAdapters } from '../server/sources.mjs';

class Storage { map = new Map(); getItem(key) { return this.map.get(key) ?? null; } setItem(key, value) { this.map.set(key, value); } removeItem(key) { this.map.delete(key); } }
const snippet = 'Fixture sintético sobre Plasmodium vivax: su morfología incluye un trofozoíto en anillo.';
const input = (overrides = {}) => ({ sourceId: 'mspas', sourceUrl: 'https://epidemiologia.mspas.gob.gt/synthetic-test-only.pdf', title: 'Fixture sintético, no es un boletín real',
  publicationDate: null, referencePeriod: '', territory: 'Guatemala, ámbito nacional (fixture)', departmentIds: [], relatedOrganismIds: ['plasmodium-vivax'], kind: 'bulletin',
  evidence: { mode: 'pdf', page: 1, excerpt: snippet, fileName: 'synthetic-test.pdf', fileSize: 100, sha256: 'a'.repeat(64), pages: [{ pageNumber: 1, textContent: snippet, hasExtractableText: true, charCount: snippet.length, detectedMicroorganisms: [] }] }, ...overrides });
const note = 'Fixture de revisión: se comparó el fragmento y la metadata, sin aprobación clínica.';
test('library transfer persists once and preserves corrupt or full storage on failure', () => {
  const { storage, repo, record } = setup();
  const reviewed = repo.review(record.id, 'reviewed', 'Revisor de prueba', note, true);
  assert.equal(appendBulletinToLibrary(storage, reviewed, []).added, true);
  assert.equal(appendBulletinToLibrary(storage, reviewed, []).added, false);
  const key = 'infectoatlas_academic_docs_v3';
  for (const invalid of ['broken JSON', '{}', '[null]', '[{"id":"old"}]']) {
    storage.setItem(key, invalid);
    assert.throws(() => appendBulletinToLibrary(storage, reviewed, []));
    assert.equal(storage.getItem(key), invalid);
  }
  storage.setItem(key, '[]');
  storage.setItem = () => { throw new Error('QuotaExceededError'); };
  assert.throws(() => appendBulletinToLibrary(storage, reviewed, []), /QuotaExceededError/);
  assert.equal(storage.getItem(key), '[]');
});
function setup() { const storage = new Storage(); const repo = new OfficialBulletinRepository(storage); const record = repo.add(input()); return { storage, repo, record }; }

test('accepts only exact HTTPS institution hosts; rejects spoofing, credentials, ports and arbitrary URLs', () => {
  assert.equal(officialSourceUrl('mspas', 'https://epidemiologia.mspas.gob.gt/file.pdf#page=2'), 'https://epidemiologia.mspas.gob.gt/file.pdf');
  assert.equal(officialSourceUrl('paho', 'https://www.paho.org/en/documents/fixture'), 'https://www.paho.org/en/documents/fixture');
  assert.equal(officialSourceUrl('who', 'https://www.who.int/emergencies/fixture'), 'https://www.who.int/emergencies/fixture');
  for (const value of ['http://epidemiologia.mspas.gob.gt/file.pdf', 'https://epidemiologia.mspas.gob.gt.evil.test/file.pdf', 'https://epidemiologia.mspas.gob.gt@evil.test/file.pdf', 'https://a:b@epidemiologia.mspas.gob.gt/file.pdf', 'https://epidemiologia.mspas.gob.gt:8443/file.pdf', 'https://127.0.0.1/file.pdf', 'javascript:alert(1)', ' https://epidemiologia.mspas.gob.gt/file.pdf', 'https://epidemiologia.mspas.gob.gt\\evil.test/file.pdf']) assert.throws(() => officialSourceUrl('mspas', value));
  assert.throws(() => officialSourceUrl('paho', 'https://www.who.int/file.pdf'));
});
test('validates dates, departments and PDF page/excerpt integrity without inventing unknown values', () => {
  const { repo, record } = setup(); assert.equal(record.publicationDate, null); assert.equal(record.referencePeriod, ''); assert.equal(record.status, 'pending');
  assert.equal(repo.read().bulletins[0].evidence.excerpt, snippet);
  for (const patch of [{ publicationDate: '2026-02-30' }, { title: 'a' }, { departmentIds: ['invented-department'] }, { relatedOrganismIds: ['a', 'a'] }]) assert.throws(() => validateBulletinInput(input(patch)));
  for (const patch of [{ page: 2 }, { excerpt: 'Este texto no aparece en ninguna página del archivo PDF de prueba.' }, { sha256: 'bad' }, { fileSize: 11 * 1024 * 1024 }]) assert.throws(() => validateBulletinInput(input({ evidence: { ...input().evidence, ...patch } })));
});
test('manual transcription is explicitly separate from PDF extraction and cannot spoof its metadata', () => {
  const evidence = { mode: 'transcribed', page: null, excerpt: snippet, fileName: null, fileSize: null, sha256: null, pages: [] };
  validateBulletinInput(input({ evidence }));
  assert.throws(() => validateBulletinInput(input({ evidence: { ...evidence, sha256: 'a'.repeat(64) } })));
  assert.throws(() => validateBulletinInput(input({ evidence: { ...evidence, pages: input().evidence.pages } })));
});
test('deduplicates active canonical links and file hashes independently of filenames', () => {
  const { repo } = setup();
  assert.throws(() => repo.add(input({ sourceUrl: input().sourceUrl + '#page=1' })), /ya está registrado/);
  assert.throws(() => repo.add(input({ sourceUrl: 'https://epidemiologia.mspas.gob.gt/another-test.pdf' })), /ya está registrado/);
  assert.equal(repo.read().bulletins.length, 1);
});
test('review requires explicit attestation, reviewer and reason; does not approve clinical proposals', () => {
  const { repo, record } = setup();
  assert.throws(() => repo.review(record.id, 'reviewed', 'Revisor de prueba', note, false));
  assert.throws(() => repo.review(record.id, 'reviewed', '', note, true));
  assert.throws(() => repo.review(record.id, 'reviewed', 'Revisor de prueba', 'short', true));
  const reviewed = repo.review(record.id, 'reviewed', 'Revisor de prueba', note, true);
  assert.equal(reviewed.reviews.length, 1); assert.equal(reviewed.status, 'reviewed'); assert.equal(reviewed.reviews[0].action, 'reviewed');
  assert.equal(bulletinAcademicDocument(reviewed).processingStatus, 'Sin procesar');
});
test('requires reopening before discarding reviewed documents and preserves every transition', () => {
  const { repo, record } = setup(); repo.review(record.id, 'reviewed', 'Revisor de prueba', note, true);
  assert.throws(() => repo.review(record.id, 'discarded', 'Revisor de prueba', note, true), /Reabre/);
  repo.review(record.id, 'pending', 'Revisor de prueba', note, true); repo.review(record.id, 'discarded', 'Revisor de prueba', note, true);
  assert.deepEqual(repo.read().bulletins[0].reviews.map(review => review.action), ['reviewed', 'pending', 'discarded']);
});
test('corrections can replace a discarded version while preventing two active versions', () => {
  const { repo, record } = setup(); repo.review(record.id, 'discarded', 'Revisor de prueba', note, true);
  const corrected = repo.add(input({ title: 'Fixture corregido, no documento real' }));
  assert.notEqual(corrected.id, record.id); assert.equal(repo.read().bulletins.length, 2);
  assert.throws(() => repo.review(record.id, 'pending', 'Revisor de prueba', note, true), /otra versión activa/);
});
test('only reviewed PDFs enter the library with source URL, hash, pages and no clinical approval', async () => {
  const { repo, record } = setup(); assert.throws(() => bulletinAcademicDocument(record), /PDF/);
  const reviewed = repo.review(record.id, 'reviewed', 'Revisor de prueba', note, true); const document = bulletinAcademicDocument(reviewed);
  assert.equal(document.officialSource.url, record.sourceUrl); assert.equal(document.officialSource.sha256, record.evidence.sha256);
  assert.equal(document.pages[0].textContent, snippet); assert.equal(document.pageCount, 1); assert.equal(document.sourceTier, 'Boletín o alerta oficial MSPAS / OPS / OMS');
  const proposals = await analyzeAcademicDocument(document, INITIAL_MICROORGANISMS);
  assert.ok(proposals.length > 0); assert.ok(proposals.every(proposal => proposal.status === 'pendiente' && proposal.verificationStatus === 'En proceso de validación'));
  assert.throws(() => bulletinAcademicDocument({ ...reviewed, evidence: { mode: 'transcribed', page: null, excerpt: snippet, fileName: null, fileSize: null, sha256: null, pages: [] } }));
});
test('record, review trail and library provenance round-trip with the existing SHA-256 backup', async () => {
  const { storage, repo, record } = setup(); const reviewed = repo.review(record.id, 'reviewed', 'Revisor de prueba', note, true);
  const source = new LocalStorageRepository(storage); source.saveAcademicDocuments([bulletinAcademicDocument(reviewed)]);
  const json = await source.exportBackupJSON(); const targetStorage = new Storage(); const target = new LocalStorageRepository(targetStorage);
  const current = await target.getBackupData(); const plan = await target.inspectBackupJSON(json, current); assert.equal(plan.valid, true);
  await target.applyBackupImport(plan, 'restore', current);
  assert.deepEqual(new OfficialBulletinRepository(targetStorage).read(), repo.read()); assert.equal(target.getAcademicDocuments()[0].officialSource.sha256, 'a'.repeat(64));
});
test('preserves LIVE and other preferences; quota failures never replace earlier records', () => {
  const storage = new Storage(); storage.setItem('infectoatlas_user_settings_v1', JSON.stringify({ theme: 'navy', infectoAtlasLiveV1: { version: 1 } }));
  const repo = new OfficialBulletinRepository(storage); repo.add(input());
  const settings = JSON.parse(storage.getItem('infectoatlas_user_settings_v1')); assert.equal(settings.theme, 'navy'); assert.deepEqual(settings.infectoAtlasLiveV1, { version: 1 });
  const before = storage.getItem('infectoatlas_user_settings_v1'); storage.setItem = () => { throw new Error('quota'); };
  assert.throws(() => repo.review(repo.read().bulletins[0].id, 'reviewed', 'Revisor de prueba', note, true), /quota/); assert.equal(storage.getItem('infectoatlas_user_settings_v1'), before);
});
test('corrupt state and inconsistent review status block writes instead of resetting history', () => {
  const { storage, repo, record } = setup(); const settings = JSON.parse(storage.getItem('infectoatlas_user_settings_v1'));
  settings.infectoAtlasOfficialV1.bulletins[0].status = 'reviewed'; storage.setItem('infectoatlas_user_settings_v1', JSON.stringify(settings));
  const before = storage.getItem('infectoatlas_user_settings_v1'); assert.throws(() => repo.read(), /registro documental/); assert.throws(() => repo.add(input()), /registro documental/);
  assert.equal(storage.getItem('infectoatlas_user_settings_v1'), before);
  storage.setItem('infectoatlas_user_settings_v1', '{broken'); assert.throws(() => repo.read());
});
test('bounded registry refuses silent eviction and source modes never claim automatic retrieval', () => {
  const storage = new Storage(); const repo = new OfficialBulletinRepository(storage);
  for (let i = 0; i < 50; i++) repo.add(input({ sourceUrl: `https://epidemiologia.mspas.gob.gt/synthetic-test-${i}.pdf`, evidence: { ...input().evidence, sha256: String(i).padStart(64, '0') } }));
  assert.equal(repo.read().bulletins.length, 50);
  assert.throws(() => repo.add(input({ sourceUrl: 'https://epidemiologia.mspas.gob.gt/overflow-test.pdf' })), /50 documentos/);
  assert.ok(sourceAdapters.filter(source => source.id !== 'pubmed').every(source => source.mode === 'manual-document-with-review'));
});
