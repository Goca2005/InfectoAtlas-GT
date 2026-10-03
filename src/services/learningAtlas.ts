import atlasData from '../data/learningAtlas.json';
import clinicalImageData from '../data/clinicalImages.json';
import { REFERENCE_MICROORGANISMS } from '../data/referenceMicroorganisms';
import { normalizeScientificName } from './catalogExpansion';
import type { Microorganism } from '../types/microorganism';
export interface LifeCycleReference { title:string; imageUrl:string; sourceUrl:string; infective:string[]; diagnostic:string[]; steps:string[]; note:string }
export interface LearningSupplement { scientificName:string; aliases:string[]; category:Microorganism['category']; scope:string; images:Microorganism['imagery']; cycles:LifeCycleReference[]; diagnosticPearls:string[] }
export const LEARNING_ATLAS = atlasData as LearningSupplement[];
export function learningSupplement(organism:Pick<Microorganism,'scientificName'>) {
  const name=normalizeScientificName(organism.scientificName);
  return LEARNING_ATLAS.find(entry=>entry.aliases.some(alias=>normalizeScientificName(alias)===name));
}
export function curatedImages(organism:Microorganism) {
  const supplement=learningSupplement(organism);
  const reference=REFERENCE_MICROORGANISMS.find(org=>normalizeScientificName(org.scientificName)===normalizeScientificName(organism.scientificName));
  const name=normalizeScientificName(organism.scientificName);
  const clinical=clinicalImageData.filter(e=>e.names.some(n=>normalizeScientificName(n)===name)).map(e=>e.image) as Microorganism['imagery'];
  const images=[...(supplement?.images??[]),...clinical,...(reference?.imagery??[]),...organism.imagery];
  const ids=new Set<string>(), urls=new Set<string>();
  return images.filter(image=>{
    if(!image.url||!image.sourceUrl||!image.license)return false;
    try{const url=new URL(image.url),source=new URL(image.sourceUrl);if(url.protocol!=='https:'||source.protocol!=='https:'||url.username||url.password||source.username||source.password)return false;
      const key=url.origin+url.pathname.replace(/\/{2,}/g,'/');
      const id=image.imageId?.trim().toLowerCase();
      if(urls.has(key)||(id&&ids.has(id)))return false;
      urls.add(key);if(id)ids.add(id);return true;
    }catch{return false;}
  });
}
// Bundled teaching references never write to the user's records or change review status.
