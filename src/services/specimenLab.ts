import type {Microorganism} from '../types/microorganism';
import {INITIAL_MICROORGANISMS} from '../data/microorganisms';
import {REFERENCE_MICROORGANISMS} from '../data/referenceMicroorganisms';
import {curatedImages} from './learningAtlas';
export type SpecimenKind='blood'|'stool'|'tissue'|'culture'|'other';
export const SPECIMEN_LABELS={blood:'Sangre · frotis y gota gruesa',stool:'Heces y muestras intestinales',tissue:'Tejidos y biopsias',culture:'Cultivos',other:'Otras preparaciones / muestra no informada'};
export interface SpecimenImage {id:string;organism:Microorganism;image:Microorganism['imagery'][number];specimen:SpecimenKind;preparation:'Gota gruesa'|'Frotis delgado'|'Preparación indicada por la fuente';classificationNote:string}
const normalized=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
/** Metadata routing, never pixel diagnosis. Unknown specimens remain explicitly unknown. */
export function specimenKind(image:Microorganism['imagery'][number]):SpecimenKind{
  const text=normalized(`${image.caption} ${image.stainOrModality}`);
  if(image.type==='fotografia_cultivo'||/\bcultivo\b|\bculture\b/.test(text))return 'culture';
  if(/\bsangre\b|\bblood\b|gota gruesa|frotis delgado|thin blood smear|thick blood smear/.test(text))return 'blood';
  if(/\bheces\b|\bstool\b|\bfecal\b|muestra intestinal/.test(text))return 'stool';
  if(/\btejido\b|\bbiopsia\b|\btissue\b|lesion cutanea|\bcorazon\b|\bhistolog/.test(text))return 'tissue';
  return 'other';
}
export function buildSpecimenCollection(saved:Microorganism[]=[]):SpecimenImage[]{
  const organisms=new Map<string,Microorganism>();
  for(const org of [...INITIAL_MICROORGANISMS,...REFERENCE_MICROORGANISMS,...saved])organisms.set(normalized(org.scientificName).replace(/\s+/g,' ').trim(),org);
  const seen=new Set<string>(),result:SpecimenImage[]=[];
  for(const org of organisms.values())for(const image of curatedImages(org)){
    if(!['microfotografia_real','fotografia_cultivo'].includes(image.type))continue;
    const key=new URL(image.url!).origin+new URL(image.url!).pathname;if(seen.has(key))continue;seen.add(key);
    const text=normalized(image.caption),specimen=specimenKind(image);
    result.push({id:key,organism:org,image,specimen,preparation:/gota gruesa|thick.*smear/.test(text)?'Gota gruesa':/frotis delgado|thin.*smear/.test(text)?'Frotis delgado':'Preparación indicada por la fuente',classificationNote:specimen==='other'?'No se atribuye una muestra clínica que el título o la técnica no indiquen.':'Agrupación automática basada en los metadatos de la imagen; confirma la preparación en la fuente.'});
  }
  return result;
}
