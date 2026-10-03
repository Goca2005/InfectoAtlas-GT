import test from 'node:test';
import assert from 'node:assert/strict';
import {buildDocumentAtlas,documentBlocks,recognizedTaxa} from '../src/services/documentAtlas.ts';

test('document sections preserve original text and expose diagnosis, treatment and prevention separately',()=>{
  const text='DIAGNÓSTICO PCR detecta el ADN TRATAMIENTO Aciclovir PREVENCIÓN Lavado de manos';
  const blocks=documentBlocks(text);
  assert.deepEqual(blocks.map(b=>b.section),['diagnosis','treatment','prevention']);
  assert.equal(blocks.map(b=>b.text).join(''),text);
  assert.equal(blocks[0].text,'DIAGNÓSTICO PCR detecta el ADN ');
});
test('document recognition covers bacteria, viruses, fungi and parasites',()=>{
  for(const [name,category] of [['Escherichia coli','bacteria'],['Herpes simplex virus 1','virus'],['Candida albicans','hongo'],['Trichinella spiralis','parasito']])assert.ok(recognizedTaxa(name).some(t=>t.category===category),name);
});
test('document indexing is read only, keeps source pages and stops at unreadable pages',()=>{
  const doc={id:'fixture-doc',title:'Documento de prueba',authorOrInstitution:'Fuente de prueba',yearOrEdition:'No informada',sourceTier:'Apuntes académicos',pages:[{pageNumber:1,hasExtractableText:true,textContent:'Candida albicans MORFOLOGÍA Levadura'},{pageNumber:2,hasExtractableText:true,textContent:'DIAGNÓSTICO Cultivo'},{pageNumber:3,hasExtractableText:false,textContent:''},{pageNumber:4,hasExtractableText:true,textContent:'PREVENCIÓN Higiene'}]};
  const before=JSON.stringify(doc),saved=[];
  const atlas=buildDocumentAtlas([doc],saved);
  assert.equal(atlas.newCount,1);assert.equal(atlas.unreadablePages,1);
  const org=atlas.organisms[0];assert.equal(org.category,'hongo');assert.equal(org.documentPageCount,2);
  assert.equal(org.documentIndexed,true);assert.deepEqual(org.treatment.firstLine,[]);
  assert.deepEqual(atlas.links.get(org.id).map(p=>[p.pageNumber,p.association]),[[1,'direct'],[2,'heading']]);
  assert.equal(JSON.stringify(doc),before);assert.equal(saved.length,0);
});
