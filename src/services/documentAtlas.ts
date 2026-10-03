import {DOCUMENT_TAXA,type DocumentTaxon} from '../data/documentTaxa';
import type {AcademicDocument,ExtractionProposal} from '../types/academicLibrary';
import type {Microorganism} from '../types/microorganism';
import {normalizeScientificName} from './catalogExpansion';
import {learningSupplement} from './learningAtlas';
export interface DocumentPageLink {document:AcademicDocument;pageNumber:number;text:string;association:'direct'|'heading';headingPage:number;mentionedNames:string[]}
export interface DocumentAtlas {organisms:Microorganism[];links:Map<string,DocumentPageLink[]>;newCount:number;classifiedCount:number;unreadablePages:number;indexedPages:number}
const normalize=(s:string)=>s.normalize('NFKC').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim().toLowerCase();
const escaped=(s:string)=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/\s+/g,'\\s+');
const matcher=(aliases:string[])=>new RegExp(`(?<![a-z])(?:${aliases.map(a=>escaped(normalize(a))).join('|')})(?![a-z])`,'i');
const taxa=DOCUMENT_TAXA.map(entry=>({...entry,test:matcher(entry.aliases)}));
export function recognizedTaxa(text:string):DocumentTaxon[]{const normalized=normalize(text),matches=taxa.filter(t=>t.test.test(normalized));return matches.filter(t=>!t.name.includes('spp. (grupo)')||!matches.some(other=>!other.group&&other.name.startsWith(t.aliases[0]+' ')));}
function canonicalKey(name:string){const normalized=normalizeScientificName(name);const found=DOCUMENT_TAXA.find(e=>e.aliases.some(a=>normalizeScientificName(a)===normalized));return normalizeScientificName(found?.name??learningSupplement({scientificName:name})?.scientificName??name);}
function keysForOrganism(o:Microorganism){return [...new Set([o.scientificName,...(learningSupplement(o)?.aliases??[])].map(canonicalKey))];}
function categoryForName(o:Microorganism){return learningSupplement(o)?.category??DOCUMENT_TAXA.find(t=>t.aliases.some(a=>normalizeScientificName(a)===normalizeScientificName(o.scientificName)))?.category??DOCUMENT_TAXA.find(t=>t.name.split(' ')[0].toLowerCase()===o.scientificName.split(' ')[0].toLowerCase())?.category??o.category;}
function terms(t:DocumentTaxon){const result=[...t.aliases];const parts=t.name.split(' ');if(parts.length===2&&!t.group&&t.category!=='virus')result.push(`${parts[0][0]}. ${parts[1]}`);return result;}
function emptyDocumentOrganism(t:DocumentTaxon,links:DocumentPageLink[]):Microorganism {
  const first=links[0];return {id:`document-index-${canonicalKey(t.name).replace(/[^a-z0-9]+/g,'-')}`,scientificName:t.name,category:t.category,reviewStatus:'Fuentes pendientes de revisión',taxonomy:{genus:'No informado en esta ficha',species:t.group?'Grupo documental; especie no atribuida':t.name,family:'Taxonomía completa pendiente'},morphology:{shape:'Consulta la información de tus documentos, organizada por sección y página.',size:'No sintetizado',specialStructures:[]},microbiologyCharacteristics:{},externalAndInternalStructures:[],virulenceFactors:[],reservoir:[],transmissionRoute:[],associatedDiseases:[],signsAndSymptoms:[],complications:[],clinicalSpecimens:[],diagnosticMethods:[],labFindings:[],treatment:{disclaimer:'Consulta el texto original y revisa su vigencia antes de usarlo para decisiones clínicas.',firstLine:[],alternatives:[]},prevention:[],guatemalaRelevance:{endemicStatus:'No documentado en esta ficha',priorityLevel:'No evaluada',departmentsWithHighPrevalence:[],officialNotes:'Ficha documental para estudio en Guatemala. El origen de cada documento se conserva; no se infiere circulación nacional.'},imagery:[],bibliography:Array.from(new Map(links.map(l=>[l.document.id,{source:l.document.authorOrInstitution,title:l.document.title,year:l.document.yearOrEdition,status:'Fuentes pendientes de revisión' as const}])).values()),lastReviewedDate:'Pendiente',documentIndexed:true};
}
export function buildDocumentAtlas(documents:AcademicDocument[],saved:Microorganism[],proposals:ExtractionProposal[]=[]):DocumentAtlas {
  const known=new Map<string,DocumentTaxon>();
  for(const entry of DOCUMENT_TAXA)known.set(canonicalKey(entry.name),entry);
  for(const org of saved){const key=canonicalKey(org.scientificName),source=known.get(key);known.set(key,{name:source?.name??org.scientificName,category:categoryForName(org),aliases:[...new Set([...(source?.aliases??[]),org.scientificName])]});}
  const entries=Array.from(known.entries()).map(([key,t])=>({key,t,test:matcher(terms(t)),heading:matcher(t.aliases)}));
  const byKey=new Map<string,DocumentPageLink[]>();let unreadablePages=0,indexedPages=0;
  const link=(key:string,item:DocumentPageLink)=>{const list=byKey.get(key)??[];if(!list.some(v=>v.document.id===item.document.id&&v.pageNumber===item.pageNumber))list.push(item);byKey.set(key,list);};
  for(const doc of documents){let heading:{key:string;page:number}|null=null;
    for(const page of [...doc.pages].sort((a,b)=>a.pageNumber-b.pageNumber)){
      if(!page.hasExtractableText||!page.textContent.trim()){unreadablePages++;heading=null;continue;}
      const original=page.textContent,normalized=normalize(original),found=entries.filter(e=>e.test.test(normalized)),matches=found.filter(e=>!e.t.name.includes('spp. (grupo)')||!found.some(other=>!other.t.group&&other.t.name.startsWith(e.t.aliases[0]+' ')));
      const names=matches.map(e=>e.t.name);
      if(matches.length){indexedPages++;for(const e of matches)link(e.key,{document:doc,pageNumber:page.pageNumber,text:original,association:'direct',headingPage:page.pageNumber,mentionedNames:names});}
      const headings=matches.filter(e=>e.heading.test(normalized.slice(0,180)));
      if(matches.length>1)heading=null;
      else if(headings.length===1&&matches.length===1)heading={key:headings[0].key,page:page.pageNumber};
      else if(heading&&!matches.length&&page.pageNumber-heading.page<=5&&!/^(?:referencias|bibliografia|bibliography|conclusiones)\b/i.test(normalized)){
        indexedPages++;link(heading.key,{document:doc,pageNumber:page.pageNumber,text:original,association:'heading',headingPage:heading.page,mentionedNames:[known.get(heading.key)!.name]});
      }else if(matches.length||heading&&page.pageNumber-heading.page>5)heading=null;
    }
  }
  // Previously reviewed links stay visible even when an old extractor used another spelling.
  for(const p of proposals){if(p.status==='descartado')continue;const doc=documents.find(d=>d.id===p.documentId),page=doc?.pages.find(v=>v.pageNumber===p.sourcePage);if(doc&&page?.hasExtractableText)link(canonicalKey(p.targetMicroorganismName),{document:doc,pageNumber:p.sourcePage,text:page.textContent,association:'direct',headingPage:p.sourcePage,mentionedNames:[p.targetMicroorganismName]});}
  const links=new Map<string,DocumentPageLink[]>(),seen=new Set<string>();let classifiedCount=0;
  const organisms=saved.map(o=>{const keys=keysForOrganism(o),category=categoryForName(o);keys.forEach(key=>seen.add(key));const pages=keys.flatMap(key=>byKey.get(key)??[]),unique=new Map(pages.map(p=>[`${p.document.id}-${p.pageNumber}`,p]));links.set(o.id,Array.from(unique.values()));if(category!==o.category)classifiedCount++;return category===o.category?o:{...o,category,originalCategory:o.category,parasiteGroup:category==='parasito'?o.parasiteGroup:undefined};});
  let newCount=0;
  for(const [key,pages] of byKey){if(seen.has(key))continue;const taxon=known.get(key);if(!taxon)continue;const o=emptyDocumentOrganism(taxon,pages);organisms.push(o);links.set(o.id,pages);seen.add(key);newCount++;}
  const withPreviews=organisms.map(o=>{const pages=links.get(o.id)??[];if(!pages.length)return o;const best=pages.find(p=>p.mentionedNames.length===1&&p.association==='direct'&&p.text.length>100)??pages[0];return {...o,documentPageCount:pages.length,documentPreview:`${best.document.title} · pág. ${best.pageNumber}: ${best.text.slice(0,240).trim()}${best.text.length>240?'…':''}`};});
  return {organisms:withPreviews,links,newCount,classifiedCount,unreadablePages,indexedPages};
}
export const DOCUMENT_SECTION_LABELS={all:'Todo el texto',morphology:'Morfología y estructuras',clinical:'Clínica y patogenia',diagnosis:'Diagnóstico y muestras',treatment:'Tratamiento',prevention:'Prevención y control',cycle:'Ciclo y estadios',epidemiology:'Epidemiología y contexto',general:'Información general'};
export type DocumentSection=keyof typeof DOCUMENT_SECTION_LABELS;
export function documentBlocks(text:string):{section:DocumentSection;text:string;start:number;end:number}[]{
  const headings=/\b(?:DIAGN[ÓO]STICO|TRATAMIENTO|PREVENCI[ÓO]N|MORFOLOG[IÍ]A|S[IÍ]NTOMAS|ENFERMEDADES|CICLO(?: DE VIDA)?|EPIDEMIOLOG[IÍ]A|TRANSMISI[ÓO]N|RESERVORIO|PATOGENIA|COMPLICACIONES|MUESTRAS?|ESTADIOS?)\b/g;
  const bounds=[...new Set([0,...Array.from(text.matchAll(headings),m=>m.index!),text.length])].sort((a,b)=>a-b);
  return bounds.slice(0,-1).map((start,i)=>({start,end:bounds[i+1],text:text.slice(start,bounds[i+1])})).filter(b=>b.text.trim()).map(b=>{const first=normalize(b.text).split(' ')[0];const section:DocumentSection=/^diagnostico|^muestra/.test(first)?'diagnosis':first==='tratamiento'?'treatment':first==='prevencion'?'prevention':first==='morfologia'?'morphology':/^sintomas|^enfermedades|^patogenia|^complicaciones/.test(first)?'clinical':/^ciclo|^estadio/.test(first)?'cycle':/^epidemiologia|^transmision|^reservorio/.test(first)?'epidemiology':sectionOfText(b.text);return {...b,section};});
}
export function sectionOfText(text:string):DocumentSection {
  const s=normalize(text);
  if(/tratamiento|antibiotic|antiviral|antifung|dosis|mg\/kg|terapia/.test(s))return 'treatment';
  if(/diagnost|muestra|tincion|cultivo|coprolog|serolog|pcr|elisa|gota gruesa/.test(s))return 'diagnosis';
  if(/prevencion|profilaxis|vacun|control vectorial/.test(s))return 'prevention';
  if(/ciclo|estadio|fase infect|fase diagn|huevo|larva|quiste|trofozo/.test(s))return 'cycle';
  if(/morfolog|estructura|gram|capsula|tamano|forma/.test(s))return 'morphology';
  if(/epidemiolog|guatemala|incidencia|prevalencia|reservorio|transmision/.test(s))return 'epidemiology';
  if(/sintom|enfermedad|patogen|complic|clinica|lesion|triada|signo de|sindrome|manifestacion/.test(s))return 'clinical';
  return 'general';
}
