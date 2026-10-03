import test from 'node:test';
import assert from 'node:assert/strict';
import {specimenKind,buildSpecimenCollection} from '../src/services/specimenLab.ts';
import {parseAlphaCarbons} from '../src/services/experimentalStructure.ts';
import {clinicalPatterns,CLINICAL_PATTERNS} from '../src/services/clinicalPatterns.ts';
import {curatedImages} from '../src/services/learningAtlas.ts';
import {INITIAL_MICROORGANISMS} from '../src/data/microorganisms.ts';
import {sectionOfText} from '../src/services/documentAtlas.ts';
const image=(caption,type='microfotografia_real')=>({caption,type,stainOrModality:''});
test('specimen routing uses explicit metadata, never infers a sample from a cyst',()=>{
 assert.equal(specimenKind(image('Quiste de Giardia')),'other');
 assert.equal(specimenKind(image('Frotis delgado de sangre')),'blood');
 assert.equal(specimenKind(image('Quistes en heces')),'stool');
 assert.equal(specimenKind(image('Amastigotes en tejido')),'tissue');
 assert.equal(specimenKind(image('Cultivo en agar sangre')),'culture');
});
test('real specimen pool preserves records, deduplicates photos and excludes clinical photos and drawings',()=>{
 const before=JSON.stringify(INITIAL_MICROORGANISMS);const pool=buildSpecimenCollection(INITIAL_MICROORGANISMS);
 assert.equal(JSON.stringify(INITIAL_MICROORGANISMS),before);
 assert.equal(new Set(pool.map(i=>i.id)).size,pool.length);
 assert.ok(pool.filter(i=>i.specimen==='blood').length>=17);
 assert.ok(pool.every(i=>['microfotografia_real','fotografia_cultivo'].includes(i.image.type)));
});
function atom(residue,x=0,chain='A',record='ATOM  '){let s=Array(80).fill(' ');const put=(i,v)=>{[...v].forEach((c,j)=>s[i+j]=c);};put(0,record);put(12,' CA ');put(17,'ALA');put(21,chain);put(22,String(residue).padStart(4));put(30,x.toFixed(3).padStart(8));put(38,'   0.000');put(46,'   0.000');return s.join('');}
test('protein trace preserves chain identifiers and breaks at absent residues',()=>{
 const p=parseAlphaCarbons([atom(1),atom(2,3),atom(7,6),atom(8,9),atom(1,0,'B')].join('\n'));
 assert.equal(p.atomCount,5);assert.equal(p.chains.length,2);assert.deepEqual(p.chains[0].segments.map(s=>s.length),[2,2]);
});
test('protein parser ignores calcium HETATM and later models; rejects blank coordinates',()=>{
 const p=parseAlphaCarbons(['MODEL        1',atom(1),atom(2,3),atom(8,0,'A','HETATM'),'ENDMDL','MODEL        2',atom(3,6)].join('\n'));assert.equal(p.atomCount,2);
 const bad=atom(1).slice(0,30)+'        '+atom(1).slice(38);assert.throws(()=>parseAlphaCarbons([bad,atom(2)].join('\n')),/inválidas/);
 assert.throws(()=>parseAlphaCarbons('HETATM'),/coordenadas/);
});
test('named signs and triads retain source and congenital context, without generic assignment',()=>{
 assert.equal(clinicalPatterns('Toxoplasma gondii')[0].manifestations.length,3);
 assert.match(clinicalPatterns('Toxoplasma gondii')[0].context,/congénita/);
 assert.equal(clinicalPatterns('Unknown species').length,0);
 for(const p of CLINICAL_PATTERNS){assert.ok(p.context&&p.manifestations.length);assert.ok(new URL(p.sourceUrl).hostname.endsWith('cdc.gov'));}
});
test('clinical photographs attach to their exact organism and retain documented permissions',()=>{
 const base=INITIAL_MICROORGANISMS[0];const photos=curatedImages({...base,scientificName:'Measles virus',imagery:[]});
 assert.ok(photos.some(i=>i.imageId==='PHIL 24420'&&i.type==='fotografia_clinica'));
 assert.equal(curatedImages({...base,scientificName:'Unknown species',imagery:[]}).length,0);
});
test('triads and named signs from documents are organized as clinical text',()=>{
 assert.equal(sectionOfText('Tríada de referencia'),'clinical');assert.equal(sectionOfText('Signo de Romaña'),'clinical');
});
