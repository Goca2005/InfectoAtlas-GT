import test from 'node:test';
import assert from 'node:assert/strict';
import { ACADEMIC_PROFILES, ACADEMIC_SOURCES, academicProfile, academicSources, matchingAcademicBlocks, savedSectionMatches } from '../src/services/academicContent.ts';
import { PUBLIC_REFERENCE_CATALOG, buildPublicCatalog } from '../src/services/publicCatalog.ts';
import { curatedImages, learningSupplement } from '../src/services/learningAtlas.ts';
import { FICHA_SECTIONS } from '../src/services/academicFicha.ts';

test('academic expansion has explicit section citations, unique aliases and honest review scope', () => {
  assert.equal(ACADEMIC_PROFILES.length, 27);
  assert.equal(ACADEMIC_SOURCES.length, 38);
  assert.equal(ACADEMIC_PROFILES.reduce((n,p)=>n+p.sections.length,0), 138);
  const ids = new Set(ACADEMIC_SOURCES.map(s=>s.id)), aliases = new Set();
  assert.equal(ids.size, ACADEMIC_SOURCES.length);
  for (const s of ACADEMIC_SOURCES) { assert.equal(new URL(s.url).protocol,'https:'); assert.equal(s.consultedAt,'2026-10-03'); }
  for (const p of ACADEMIC_PROFILES) {
    assert.ok(p.scope); assert.ok(p.sections.some(b=>b.section==='diagnosis'));
    for(const alias of p.aliases) { assert.ok(!aliases.has(alias.toLowerCase())); aliases.add(alias.toLowerCase()); }
    for(const b of p.sections) {
      assert.ok(FICHA_SECTIONS.some(s=>s.id===b.section)); assert.ok(b.paragraphs.every(t=>t.trim()));
      assert.ok(b.sourceIds.length && b.sourceIds.every(id=>ids.has(id) && p.sourceIds.includes(id)));
    }
  }
});
test('new references appear without replacing personal fields, review status or backup records', () => {
  assert.equal(PUBLIC_REFERENCE_CATALOG.length,51);
  const additions=ACADEMIC_PROFILES.filter(p=>p.newReference);
  assert.equal(additions.length,8);
  for(const p of additions){
    const o=PUBLIC_REFERENCE_CATALOG.find(o=>o.scientificName===p.scientificName);
    assert.ok(o); assert.deepEqual(o.treatment.firstLine,[]);
    assert.equal(o.reviewStatus,'Fuentes pendientes de revisión'); assert.deepEqual(o.guatemalaRelevance.departmentsWithHighPrevalence,[]);
    assert.equal(academicSources(p.sourceIds).length,p.sourceIds.length);
  }
  const personal={...PUBLIC_REFERENCE_CATALOG.find(o=>o.scientificName==='Hepatitis B virus'),id:'personal',publicReference:undefined,signsAndSymptoms:['Mi nota'],reviewStatus:'Verificado'};
  const before=JSON.stringify(personal), result=buildPublicCatalog([personal]);
  assert.equal(result[0],personal); assert.equal(JSON.stringify(personal),before);
  assert.equal(result.filter(o=>o.scientificName==='Hepatitis B virus').length,1);
});
test('whole-ficha search handles accents, aliases and section isolation',()=>{
  const p=academicProfile('Giardia duodenalis'); assert.ok(p);
  assert.ok(matchingAcademicBlocks(p,'diagnosis','microscopia').length);
  assert.equal(matchingAcademicBlocks(p,'treatment','microscopia').length,0);
  const o=PUBLIC_REFERENCE_CATALOG[0], modified={...o,clinicalSpecimens:['Muestra personal única']};
  assert.equal(savedSectionMatches(modified,'diagnosis','UNICA'),true);
  assert.equal(savedSectionMatches(modified,'clinical','única'),false);
  assert.equal(academicProfile('Unknown'),undefined);
  assert.equal(academicProfile('Trichophyton rubrum'),academicProfile('Trichophyton mentagrophytes'));
});
test('expanded photos retain exact taxon associations, source IDs and credits',()=>{
  for(const name of ['Clostridium tetani','Parvovirus B19','Rubella virus','Trichophyton rubrum','Trichophyton mentagrophytes','Cyclospora cayetanensis']){
    const o=PUBLIC_REFERENCE_CATALOG.find(o=>o.scientificName===name); assert.ok(o,name);
    const images=curatedImages(o); assert.ok(images.length>=8,name);
    assert.ok(images.every(i=>i.sourceUrl && i.creditOrSource && i.license && i.consultedAt));
    assert.equal(new Set(images.map(i=>i.url.replace(/\/{2,}/g,'/'))).size,images.length);
  }
  const rubrum=curatedImages(PUBLIC_REFERENCE_CATALOG.find(o=>o.scientificName==='Trichophyton rubrum'));
  assert.ok(!rubrum.some(i=>i.imageId==='PHIL 30138'));
  const rubella=curatedImages(PUBLIC_REFERENCE_CATALOG.find(o=>o.scientificName==='Rubella virus'));
  assert.ok(!rubella.some(i=>['PHIL 24404','PHIL 24405'].includes(i.imageId)),'Echovirus is not rubella');
});
test('Cyclospora cycle distinguishes environmentally matured infective stage and fecal diagnostic stage',()=>{
  const p=learningSupplement({scientificName:'Cyclospora cayetanensis'});
  assert.equal(p.cycles.length,1); assert.equal(p.cycles[0].steps.length,4);
  assert.deepEqual(p.cycles[0].infective,['Ooquiste esporulado']);
  assert.deepEqual(p.cycles[0].diagnostic,['Ooquiste no esporulado en heces']);
  assert.match(p.cycles[0].sourceUrl,/cdc.gov\/dpdx\/cyclosporiasis/);
});
