import type {DocumentPageLink,DocumentSection} from './documentAtlas';
import {documentBlocks} from './documentAtlas';

export const FICHA_SECTIONS=[
  {id:'identity',title:'Identidad y morfología',subtitle:'Clasificación, estructura y microbiología',topics:['morphology']},
  {id:'clinical',title:'Patogenia y clínica',subtitle:'Virulencia, enfermedades y manifestaciones',topics:['clinical']},
  {id:'diagnosis',title:'Diagnóstico y laboratorio',subtitle:'Muestras, métodos y hallazgos',topics:['diagnosis']},
  {id:'treatment',title:'Tratamiento',subtitle:'Manejo documentado y límites de la evidencia',topics:['treatment']},
  {id:'prevention',title:'Transmisión y prevención',subtitle:'Reservorios, vías de transmisión y control',topics:['prevention','epidemiology']},
  {id:'cycle',title:'Ciclo y estadios',subtitle:'Formas biológicas, infectivas y diagnósticas',topics:['cycle']},
  {id:'guatemala',title:'Contexto de Guatemala',subtitle:'Situación registrada y referencias regionales',topics:[]},
  {id:'sources',title:'Fuentes y lectura documental',subtitle:'Bibliografía y contenido general de tus documentos',topics:['general']},
] as const;
export type FichaSectionId=typeof FICHA_SECTIONS[number]['id'];
export interface FichaExcerpt {text:string;section:DocumentSection;sources:{page:DocumentPageLink;start:number;end:number}[]}
/** Recognizable headings control grouping, without changing the source text or saved index. */
export function fichaDocumentBlocks(text:string):{section:DocumentSection;text:string;start:number;end:number}[]{
  const heading=/\b(?:DIAGN[ÓO]STICO|TRATAMIENTO|PREVENCI[ÓO]N|MORFOLOG[IÍ]A|S[IÍ]NTOMAS|SINTOMATOLOG[IÍ]A|ENFERMEDAD(?:ES)?|CICLO(?: DE VIDA)?|EPIDEMIOLOG[IÍ]A|TRANSMISI[ÓO]N|RESERVORIO|PATOGENIA|COMPLICACIONES|MUESTRAS?|ESTADIOS?)\b/g;
  const matches=Array.from(text.matchAll(heading));
  if(!matches.length)return documentBlocks(text);
  const sectionForHeading=(value:string):DocumentSection=>{
    const name=value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    return /^(diagnostico|muestra)/.test(name)?'diagnosis':name==='tratamiento'?'treatment':name==='prevencion'?'prevention':name==='morfologia'?'morphology':/^(sintoma|enfermedad|patogenia|complicaciones)/.test(name)?'clinical':/^(ciclo\b|estadio)/.test(name)?'cycle':'epidemiology';
  };
  // Slide extractors can place the only heading after its body. Keep that page whole.
  if(matches.length===1&&matches[0].index!>0&&!text.slice(matches[0].index!+matches[0][0].length).trim()){
    return [{start:0,end:text.length,text,section:sectionForHeading(matches[0][0])}];
  }
  const bounds=[...new Set([0,...matches.map(m=>m.index!),text.length])].sort((a,b)=>a-b);
  return bounds.slice(0,-1).map((start,i)=>{
    const end=bounds[i+1],literal=text.slice(start,end),match=matches.find(m=>m.index===start);
    if(!match)return {start,end,text:literal,section:documentBlocks(literal)[0]?.section??'general'};
    return {start,end,text:literal,section:sectionForHeading(match[0])};
  }).filter(b=>b.text.trim());
}
/** Group literal excerpts by topic; exact duplicates share citations. No clinical facts are inferred. */
export function organizeFichaDocuments(pages:DocumentPageLink[]):Record<FichaSectionId,FichaExcerpt[]>{
  const result:Record<FichaSectionId,FichaExcerpt[]>={identity:[],clinical:[],diagnosis:[],treatment:[],prevention:[],cycle:[],guatemala:[],sources:[]};
  for(const page of pages)for(const block of fichaDocumentBlocks(page.text)){
    const target=FICHA_SECTIONS.find(s=>(s.topics as readonly string[]).includes(block.section));
    if(!target)continue;
    const text=block.text.trim();if(!text)continue;
    const existing=result[target.id].find(e=>e.section===block.section&&e.text===text);
    const source={page,start:block.start,end:block.end};
    if(existing)existing.sources.push(source);else result[target.id].push({text,section:block.section,sources:[source]});
  }
  return result;
}
