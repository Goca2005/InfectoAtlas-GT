import { useState } from 'react';
import { Microscope } from 'lucide-react';
import type { Microorganism } from '../types/microorganism';
import { curatedImages } from '../services/learningAtlas';

export function OrganismThumbnail({ organism, className = '' }: { organism?: Microorganism; className?: string }) {
  const images = organism ? curatedImages(organism) : [];
  const image = images.find(i => i.type === 'microfotografia_real') ?? images.find(i => i.type === 'fotografia_cultivo') ?? images.find(i => i.type === 'fotografia_clinica');
  const [failedUrl, setFailedUrl] = useState('');
  return image?.url && failedUrl !== image.url
    ? <img src={image.url} alt={image.caption} title={`${image.caption} · ${image.creditOrSource}. Fuente y licencia en la ficha.`} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailedUrl(image.url!)} className={className}/>
    : <div className={`${className} flex items-center justify-center gap-2 text-xs text-slate-400`}><Microscope size={20}/><span>Imagen por incorporar</span></div>;
}
