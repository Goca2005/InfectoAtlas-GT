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
/** Group literal excerpts by topic; exact duplicates share citations. No clinical facts are inferred. */
export function organizeFichaDocuments(pages:DocumentPageLink[]):Record<FichaSectionId,FichaExcerpt[]>{
  const result:Record<FichaSectionId,FichaExcerpt[]>={identity:[],clinical:[],diagnosis:[],treatment:[],prevention:[],cycle:[],guatemala:[],sources:[]};
  for(const page of pages)for(const block of documentBlocks(page.text)){
    const target=FICHA_SECTIONS.find(s=>(s.topics as readonly string[]).includes(block.section));
    if(!target)continue;
    const text=block.text.trim();if(!text)continue;
    const existing=result[target.id].find(e=>e.section===block.section&&e.text===text);
    const source={page,start:block.start,end:block.end};
    if(existing)existing.sources.push(source);else result[target.id].push({text,section:block.section,sources:[source]});
  }
  return result;
}
