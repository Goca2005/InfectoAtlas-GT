import test from 'node:test';
import assert from 'node:assert/strict';
import {INITIAL_MICROORGANISMS} from '../src/data/microorganisms.ts';
import {REFERENCE_MICROORGANISMS} from '../src/data/referenceMicroorganisms.ts';
import {LEARNING_ATLAS,learningSupplement,curatedImages} from '../src/services/learningAtlas.ts';
import {MODEL_PROFILES} from '../src/data/modelProfiles.ts';
const organisms=[...INITIAL_MICROORGANISMS,...REFERENCE_MICROORGANISMS];
test('learning atlas covers all 32 bundled species without modifying saved records',()=>{
  assert.equal(LEARNING_ATLAS.length,32);const before=JSON.stringify(organisms);
  for(const o of organisms){const entry=learningSupplement(o);assert.ok(entry,`${o.scientificName} needs coverage`);assert.ok(curatedImages(o).length>=4);assert.ok(entry.diagnosticPearls.length>=1);}
  assert.equal(JSON.stringify(organisms),before);
  const old={...REFERENCE_MICROORGANISMS[0],category:'parasito',scientificName:'  CAMPYLOBACTER   jejuni  '};
  assert.equal(learningSupplement(old).category,'bacteria');assert.equal(old.category,'parasito');
  assert.equal(learningSupplement({scientificName:'Unknown test species'}),undefined);
});
test('164 sourced additions and four earlier images retain credits, techniques and limits',()=>{
  assert.equal(LEARNING_ATLAS.flatMap(e=>e.images).length,164);
  assert.equal(organisms.reduce((n,o)=>n+curatedImages(o).length,0),168);
  for(const entry of LEARNING_ATLAS)for(const i of entry.images){
    assert.ok(i.creditOrSource&&i.license&&i.licenseUrl&&i.interpretation&&i.stainOrModality&&i.consultedAt);
    assert.equal(new URL(i.url).protocol,'https:');assert.ok(new URL(i.sourceUrl).hostname.endsWith('cdc.gov'));
    assert.ok(!['ilustracion_cientifica','modelo_educativo_3d'].includes(i.type));
  }
  const dengue=LEARNING_ATLAS.find(e=>e.scientificName.startsWith('Dengue'));
  assert.ok(dengue.images.some(i=>i.type==='fotografia_vector'));
  const shig=LEARNING_ATLAS.find(e=>e.scientificName==='Shigella dysenteriae');
  assert.ok(shig.images.some(i=>i.interpretation.includes('género')));
});
test('image deduplication catches both normalized IDs and URLs and rejects unsafe links',()=>{
  const base=REFERENCE_MICROORGANISMS.find(o=>o.scientificName==='Histoplasma capsulatum');const images=curatedImages(base);
  const duplicate={...images[0],imageId:'another-id',url:images[0].url+'?display=small'};
  const old={...base,imagery:[duplicate,{...images[0],url:'http://example.com/a'},{...images[0],url:'https://user:pass@example.com/a'},{...images[0],license:''}]};
  assert.equal(curatedImages(old).length,images.length);
});
test('all 20 parasite species have 21 original CDC cycles with named infective and diagnostic forms',()=>{
  const parasites=LEARNING_ATLAS.filter(e=>e.category==='parasito');assert.equal(parasites.length,20);assert.equal(parasites.flatMap(e=>e.cycles).length,21);
  for(const entry of parasites)for(const c of entry.cycles){assert.ok(c.infective.length&&c.diagnostic.length&&c.note);assert.equal(c.steps.length,4);assert.ok(new URL(c.sourceUrl).hostname.endsWith('cdc.gov'));assert.equal(new URL(c.imageUrl).protocol,'https:');}
  const taenia=parasites.find(e=>e.scientificName==='Taenia solium');assert.equal(taenia.cycles.length,2);
  assert.ok(taenia.cycles[0].infective.join(' ').toLowerCase().includes('cisticerco'));
  assert.ok(taenia.cycles[1].infective.join(' ').toLowerCase().includes('huevo'));
  const toxo=parasites.find(e=>e.scientificName==='Toxoplasma gondii');assert.match(toxo.cycles[0].note,/humano|humanas/i);
});
test('ten educational 3D archetypes carry scoped biology, named layers and primary sources',()=>{
  assert.equal(MODEL_PROFILES.length,10);assert.equal(new Set(MODEL_PROFILES.map(p=>p.kind)).size,10);
  for(const p of MODEL_PROFILES){assert.ok(p.scope.length>80);assert.deepEqual(p.parts.map(v=>v[0]),['surface','genome','appendages']);assert.equal(new URL(p.sourceUrl).protocol,'https:');}
  assert.match(MODEL_PROFILES.find(p=>p.kind==='mite').scope,/cuatro pares/);
  assert.match(MODEL_PROFILES.find(p=>p.kind==='louse').scope,/tres pares/);
  assert.match(MODEL_PROFILES.find(p=>p.kind==='protozoan').scope,/Entamoeba/);
});
