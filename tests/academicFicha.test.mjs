import test from 'node:test';
import assert from 'node:assert/strict';
import {FICHA_SECTIONS,organizeFichaDocuments,fichaDocumentBlocks} from '../src/services/academicFicha.ts';
import {analyzeAcademicDocument} from '../src/services/aiDocumentAnalyzer.ts';
import {INITIAL_MICROORGANISMS} from '../src/data/microorganisms.ts';
const source=(id,text,number=1)=>({document:{id,title:'Fuente de prueba',sourceTier:'Material docente'},pageNumber:number,text,association:'direct',headingPage:number,mentionedNames:['Escherichia coli']});

test('morphology heading retains paragraphs that mention diagnostic forms without moving them into diagnosis',()=>{
  const text='MORFOLOGIA Es un protozoo. La forma diagnóstica es un ooquiste. DIAGNÓSTICO Microscopía.';
  const blocks=fichaDocumentBlocks(text);
  assert.equal(blocks[0].section,'morphology');assert.equal(blocks[1].section,'diagnosis');
  assert.equal(blocks.map(b=>b.text).join(''),text);
});
test('a slide whose only heading is extracted last keeps its full literal body under that heading',()=>{
  const text='Es un protozoo. La forma diagnóstica es el ooquiste. MORFOLOGIA';
  assert.deepEqual(fichaDocumentBlocks(text),[{start:0,end:text.length,text,section:'morphology'}]);
});
test('singular disease and symptom headings stay clinical; ciclosporiasis does not become a cycle heading',()=>{
  const text='ENFERMEDAD CICLOSPORIASIS. SINTOMATOLOGÍA. Diarrea y dolor. CICLO DE VIDA Ooquistes.';
  const blocks=fichaDocumentBlocks(text);
  assert.deepEqual(blocks.map(b=>b.section),['clinical','clinical','cycle']);
  assert.equal(blocks.map(b=>b.text).join(''),text);
});
test('academic index includes eight sections and retains every literal documentary block',()=>{
  const page=source('fixture','MORFOLOGÍA Bacilo DIAGNÓSTICO Cultivo TRATAMIENTO Referencia PREVENCIÓN Higiene CICLO Estadios SÍNTOMAS Fiebre');
  const before=JSON.stringify(page),groups=organizeFichaDocuments([page]);
  assert.equal(FICHA_SECTIONS.length,8);
  assert.ok(groups.identity.length&&groups.diagnosis.length&&groups.treatment.length&&groups.prevention.length&&groups.cycle.length&&groups.clinical.length);
  const blocks=Object.values(groups).flat().sort((a,b)=>a.sources[0].start-b.sources[0].start);
  for(const block of blocks){const {start,end}=block.sources[0];assert.equal(block.text,page.text.slice(start,end).trim());}
  assert.equal(JSON.stringify(page),before);
});
test('identical excerpts share all citations without losing page context',()=>{
  const groups=organizeFichaDocuments([source('one','DIAGNÓSTICO Cultivo',2),{...source('two','DIAGNÓSTICO Cultivo',7),association:'heading',headingPage:6,mentionedNames:['Escherichia coli','Salmonella Typhi']}]);
  assert.equal(groups.diagnosis.length,1);assert.equal(groups.diagnosis[0].sources.length,2);
  assert.equal(groups.diagnosis[0].sources[1].page.headingPage,6);
  assert.equal(groups.diagnosis[0].sources[1].page.mentionedNames.length,2);
});
test('analyzer emits separate source proposals for each topic on the same page',async()=>{
  const organism=INITIAL_MICROORGANISMS.find(o=>o.category==='bacteria');
  const text=`${organism.scientificName} DIAGNÓSTICO PCR TRATAMIENTO Documento PREVENCIÓN Higiene`;
  const doc={id:'fixture-topic',title:'Prueba aislada',sourceTier:'Material docente',pages:[{pageNumber:1,textContent:text,hasExtractableText:true}]};
  const proposals=await analyzeAcademicDocument(doc,[organism]);
  for(const field of ['Método de identificación','Tratamiento y manejo','Prevención y control'])assert.ok(proposals.some(p=>p.field===field));
  assert.equal(new Set(proposals.map(p=>p.id)).size,proposals.length);
  assert.ok(proposals.every(p=>text.includes(p.originalSnippet)&&p.sourcePage===1&&p.status==='pendiente'));
});
