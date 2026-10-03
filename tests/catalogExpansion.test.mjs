import test from 'node:test';
import assert from 'node:assert/strict';
import { REFERENCE_MICROORGANISMS } from '../src/data/referenceMicroorganisms.ts';
import { INITIAL_MICROORGANISMS } from '../src/data/microorganisms.ts';
import { appendReferenceBatch, missingReferences, saveMissingReferences } from '../src/services/catalogExpansion.ts';
import { createOrganismFromProposal } from '../src/services/proposalOrganism.ts';
import { analyzeAcademicDocument } from '../src/services/aiDocumentAnalyzer.ts';
import { LocalStorageRepository } from '../src/services/storageService.ts';

const document = (pages) => ({ id: 'test-only', title: 'Documento sintético aislado', sourceTier: 'Material docente', pages: pages.map((textContent, index) => ({ pageNumber: index + 1, textContent, hasExtractableText: true })) });
test('reference batch documents eight organisms, four categories and four actual CDC images', () => {
  assert.equal(REFERENCE_MICROORGANISMS.length, 8);
  assert.equal(new Set(REFERENCE_MICROORGANISMS.map(org => org.category)).size, 4);
  assert.equal(new Set(REFERENCE_MICROORGANISMS.map(org => org.id)).size, 8);
  const images = REFERENCE_MICROORGANISMS.flatMap(org => org.imagery);
  assert.equal(images.length, 4);
  for (const org of REFERENCE_MICROORGANISMS) {
    assert.equal(org.reviewStatus, 'Fuentes pendientes de revisión');
    assert.equal(org.guatemalaRelevance.priorityLevel, 'No evaluada');
    assert.deepEqual(org.guatemalaRelevance.departmentsWithHighPrevalence, []);
    assert.ok(org.bibliography.every(source => source.url.startsWith('https://www.cdc.gov/')));
  }
  for (const image of images) {
    assert.equal(image.type, 'microfotografia_real');
    assert.ok(image.url.startsWith('https://wwwn.cdc.gov/phil/PHIL_Images/'));
    assert.ok(image.sourceUrl.includes('Details.aspx?pid='));
    assert.ok(image.creditOrSource && image.license && image.interpretation);
  }
});
test('reference additions preserve personal versions and deduplicate case and whitespace', () => {
  const personal = { ...structuredClone(REFERENCE_MICROORGANISMS[0]), id: 'personal', scientificName: '  CAMPYLOBACTER   jejuni ', commonName: 'Mi apunte' };
  const result = appendReferenceBatch([personal]);
  assert.equal(result.length, 8);
  assert.equal(result[0], personal);
  assert.equal(result[0].commonName, 'Mi apunte');
  assert.equal(appendReferenceBatch(result).length, result.length);
  result[1].reservoir.push('test-only');
  assert.ok(!REFERENCE_MICROORGANISMS[1].reservoir.includes('test-only'));
  assert.equal(INITIAL_MICROORGANISMS.length, 24);
});
test('safe append reads latest storage and propagates failed writes without mutation', () => {
  let raw = JSON.stringify([REFERENCE_MICROORGANISMS[0]]); let writes = 0;
  const storage = { getItem: () => raw, setItem: (_, value) => { raw = value; writes++; } };
  const result = saveMissingReferences(storage, []);
  assert.equal(result.added, 7); assert.equal(writes, 1);
  assert.equal(saveMissingReferences(storage, []).added, 0); assert.equal(writes, 1);
  assert.throws(() => saveMissingReferences({ getItem: () => '{broken', setItem: () => assert.fail('must not write') }, []));
  assert.throws(() => saveMissingReferences({ getItem: () => '{}', setItem: () => assert.fail('must not write') }, []));
  assert.throws(() => saveMissingReferences({ getItem: () => '[]', setItem: () => { throw new Error('quota'); } }, []), /quota/);
});
test('PDF analysis emits one new typed proposal per species across multiple pages', async () => {
  const doc = document(['Campylobacter jejuni se menciona en este documento.', 'Campylobacter jejuni vuelve a mencionarse. Histoplasma capsulatum aparece también.']);
  const proposals = (await analyzeAcademicDocument(doc, [])).filter(p => p.isNewOrganism);
  assert.equal(proposals.length, 2);
  assert.equal(proposals[0].proposedCategory, 'bacteria');
  assert.equal(proposals[1].proposedCategory, 'hongo');
  assert.equal(proposals[0].sourcePage, 1);
  assert.ok(proposals[0].originalSnippet.includes('Campylobacter'));
  const existing = [ { ...REFERENCE_MICROORGANISMS[0], scientificName: '  CAMPYLOBACTER   jejuni ' } ];
  const known = (await analyzeAcademicDocument(doc, existing)).filter(p => p.isNewOrganism);
  assert.equal(known.length, 1); assert.equal(known[0].proposedCategory, 'hongo');
});
test('PDF creation preserves typed and legacy categories without inventing clinical facts', () => {
  for (const [name, category] of [['Histoplasma capsulatum', 'hongo'], ['Campylobacter jejuni', 'bacteria'], ['Toxoplasma gondii', 'parasito'], ['Zika virus', 'virus']]) {
    const proposal = { targetMicroorganismId: 'test-only', targetMicroorganismName: name, documentTitle: 'Prueba aislada', sourcePage: 2 };
    const result = createOrganismFromProposal(proposal, 'Mención documental', '2022');
    assert.equal(result.category, category);
    assert.deepEqual(result.microbiologyCharacteristics, {});
    assert.deepEqual(result.signsAndSymptoms, []);
    assert.deepEqual(result.imagery, []);
    assert.equal(result.bibliography[0].year, '2022');
    assert.equal(result.guatemalaRelevance.priorityLevel, 'No evaluada');
  }
  assert.throws(() => createOrganismFromProposal({ targetMicroorganismName: 'Unknown species' }, 'Mención'), /categoría/);
  assert.equal(createOrganismFromProposal({ targetMicroorganismId: 'test-only', targetMicroorganismName: 'Unknown species', proposedCategory: 'virus', documentTitle: 'Prueba', sourcePage: 1 }, 'Mención').category, 'virus');
});
test('reference source URLs, image licenses and unknown epidemiology survive verified backup', async () => {
  const values = new Map();
  const repository = new LocalStorageRepository({ getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) });
  const current = await repository.getBackupData();
  const data = { ...current, microorganisms: structuredClone(REFERENCE_MICROORGANISMS) };
  const exported = await repository.exportBackupJSON(data);
  const plan = await repository.inspectBackupJSON(exported, current);
  const restored = await repository.applyBackupImport(plan, 'restore', current);
  assert.deepEqual(restored.microorganisms, data.microorganisms);
});
