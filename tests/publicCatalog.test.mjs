import test from 'node:test';
import assert from 'node:assert/strict';
import { INITIAL_MICROORGANISMS } from '../src/data/microorganisms.ts';
import { PUBLIC_REFERENCE_CATALOG, buildPublicCatalog, catalogIdentity } from '../src/services/publicCatalog.ts';
import { buildVisualAtlas, filterVisualAtlas, visualCoverage } from '../src/services/visualAtlas.ts';
import { clinicalPatterns } from '../src/services/clinicalPatterns.ts';
import { curatedImages } from '../src/services/learningAtlas.ts';
import { buildDocumentAtlas } from '../src/services/documentAtlas.ts';
import { observationSession } from '../src/services/observationPractice.ts';

test('public references are available on first visit, while personal fields and arrays remain untouched', () => {
  const saved = [{ ...INITIAL_MICROORGANISMS[0], scientificName: '  STAPHYLOCOCCUS   AUREUS ', id: 'my-personal-id', signsAndSymptoms: ['Personal notes'] }];
  const before = JSON.stringify(saved), result = buildPublicCatalog(saved);
  assert.equal(JSON.stringify(saved), before); assert.equal(result[0], saved[0]);
  assert.equal(result.filter(o => catalogIdentity(o.scientificName) === catalogIdentity('Staphylococcus aureus')).length, 1);
  assert.equal(new Set(PUBLIC_REFERENCE_CATALOG.map(o => catalogIdentity(o.scientificName))).size, PUBLIC_REFERENCE_CATALOG.length);
  assert.ok(result.length > 32); assert.ok(result.find(o => o.scientificName === 'Measles virus').publicReference);
  assert.equal(buildPublicCatalog(result).length, result.length);
  assert.equal(catalogIdentity('Giardia lamblia'), catalogIdentity('Giardia duodenalis'));
  const collisions = PUBLIC_REFERENCE_CATALOG.slice(0,3).map((o,i) => ({...o,id:PUBLIC_REFERENCE_CATALOG[3+i].id,scientificName:`Custom organism ${i}`}));
  const combined = buildPublicCatalog(collisions); assert.equal(new Set(combined.map(o=>o.id)).size, combined.length);
});
test('initial clinical profiles contain sourced manifestations and explicit gaps without invented treatment or Guatemala prevalence', () => {
  for (const name of ['Clostridium tetani','Bordetella pertussis','Parvovirus B19','Borrelia burgdorferi','Varicella-zoster virus','Treponema pallidum','Trichophyton rubrum','Trichophyton mentagrophytes']) {
    const o = PUBLIC_REFERENCE_CATALOG.find(o => o.scientificName === name);
    assert.ok(o, name); assert.ok(clinicalPatterns(o.scientificName).length);
    assert.ok(o.signsAndSymptoms.length); assert.equal(o.reviewStatus, 'Fuentes pendientes de revisión');
    assert.deepEqual(o.treatment.firstLine, []); assert.deepEqual(o.guatemalaRelevance.departmentsWithHighPrevalence, []);
    assert.equal(o.guatemalaRelevance.endemicStatus, 'No documentado en esta ficha');
    assert.ok(o.bibliography.every(b => b.url && b.consultedAt));
  }
  assert.match(clinicalPatterns('Clostridium tetani')[0].context, /diagnóstico es clínico/);
  assert.match(clinicalPatterns('Borrelia burgdorferi')[0].context, /no siempre/);
});
test('public overlays still receive documentary page links, without saving the document content into the reference seed', () => {
  const docs = [{ id:'local-doc', title:'Personal PDF', authorOrInstitution:'Local', yearOrEdition:'2020', pages:[{pageNumber:1,hasExtractableText:true,textContent:'Corynebacterium diphtheriae. DIAGNÓSTICO Texto literal del documento.'}] }];
  const before = JSON.stringify(PUBLIC_REFERENCE_CATALOG);
  const result = buildDocumentAtlas(docs, buildPublicCatalog([]));
  const org = result.organisms.find(o => o.scientificName === 'Corynebacterium diphtheriae');
  assert.equal(result.links.get(org.id)[0].text, docs[0].pages[0].textContent);
  assert.equal(org.documentPageCount, 1); assert.equal(JSON.stringify(PUBLIC_REFERENCE_CATALOG), before);
});
test('visual collection counts distinct images separately from species associations and deduplicates shared images', () => {
  const first = PUBLIC_REFERENCE_CATALOG[0], second = { ...first, id:'second-record', scientificName:'Other species', imagery:curatedImages(first) };
  const before = JSON.stringify([first, second]), entries = buildVisualAtlas([first, second]);
  assert.equal(entries.length, curatedImages(first).length);
  assert.ok(entries.every(e => e.organisms.length === 2));
  assert.equal(JSON.stringify([first, second]), before);
  assert.equal(new Set(buildVisualAtlas(PUBLIC_REFERENCE_CATALOG).map(e => e.key)).size, buildVisualAtlas(PUBLIC_REFERENCE_CATALOG).length);
});
test('visual filters intersect organism and category on the same association, with accents normalized', () => {
  const o = PUBLIC_REFERENCE_CATALOG[0], entries = buildVisualAtlas([o]);
  assert.equal(filterVisualAtlas(entries, {organismId:'missing'}).length, 0);
  assert.equal(filterVisualAtlas(entries, {organismId:o.id, category:'parasito'}).length, 0);
  assert.equal(filterVisualAtlas(entries, {query:o.scientificName.toUpperCase()}).length, entries.length);
  assert.equal(filterVisualAtlas(entries, {organismKey:catalogIdentity(o.scientificName)}).length, entries.length);
  assert.ok(filterVisualAtlas(entries, {type:'microfotografia_real'}).every(e => e.image.type === 'microfotografia_real'));
  const shared = [{key:'x',image:{caption:'Lesión clínica',stainOrModality:''},organisms:[{id:'a',category:'virus',scientificName:'Virus'},{id:'b',category:'bacteria',scientificName:'Bacterium'}]}];
  assert.equal(filterVisualAtlas(shared, {query:'lesion',organismId:'b',category:'virus'}).length, 0);
  assert.equal(filterVisualAtlas(shared, {query:'lesion',organismId:'b',category:'bacteria'}).length, 1);
});
test('five new clinical photographs have exact species associations and do not leak between dermatophytes', () => {
  const find = name => PUBLIC_REFERENCE_CATALOG.find(o => o.scientificName === name);
  assert.ok(curatedImages(find('Varicella-zoster virus')).some(i => i.imageId === 'PHIL 6121'));
  const syphilis = curatedImages(find('Treponema pallidum')); assert.deepEqual(syphilis.map(i => i.imageId).sort(), ['PHIL 2361','PHIL 4147']);
  assert.ok(curatedImages(find('Trichophyton rubrum')).some(i => i.imageId === 'PHIL 16682'));
  assert.ok(!curatedImages(find('Trichophyton rubrum')).some(i => i.imageId === 'PHIL 15441'));
  assert.ok(curatedImages(find('Trichophyton mentagrophytes')).some(i => i.imageId === 'PHIL 15441'));
});
test('coverage states remain measurable when a catalog has no sourced images', () => {
  const unknown = { ...INITIAL_MICROORGANISMS[0], scientificName:'Unknown species', imagery:[] };
  assert.deepEqual(visualCoverage([unknown]), {withImages:0,atLeastEight:0,withoutImages:1,clinicalProfiles:0,cycles:0});
});
test('observation practice uses six distinct real preparations with known metadata, preserves records and varies the session', () => {
  const before = JSON.stringify(PUBLIC_REFERENCE_CATALOG), session = observationSession(PUBLIC_REFERENCE_CATALOG);
  assert.equal(session.length, 6); assert.equal(new Set(session.map(i => i.id)).size, 6);
  assert.ok(session.every(i => ['blood','stool','tissue','culture'].includes(i.specimen)));
  assert.ok(session.every(i => ['microfotografia_real','fotografia_cultivo'].includes(i.image.type)));
  assert.equal(JSON.stringify(PUBLIC_REFERENCE_CATALOG), before);
  assert.notDeepEqual(session.map(i => i.id), observationSession(PUBLIC_REFERENCE_CATALOG, 2).map(i => i.id));
});
