import { useState } from 'react';
import type { Microorganism } from '../types/microorganism';
import { curatedImages, learningSupplement } from '../services/learningAtlas';
import { CdcAttribution } from './CdcAttribution';

export function safeHttpsUrl(value?: string) { try { const url = new URL(value || ''); return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined; } catch { return undefined; } }
function ImageCard({ image }: { image: Microorganism['imagery'][number] }) {
  const [failed, setFailed] = useState(false);
  const url = safeHttpsUrl(image.url);
  const sourceUrl = safeHttpsUrl(image.sourceUrl);
  return <figure className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 text-slate-200">
    {url && !failed ? <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar: ${image.caption}`}><img src={url} alt={image.caption} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} className="w-full h-64 sm:h-80 object-contain bg-black" /></a> : <p className="p-6">La imagen no está disponible. Consulta el registro original del CDC.</p>}
    <figcaption className="p-4 space-y-2 text-sm"><p className="font-bold">{image.caption}</p><p>{image.stainOrModality} · {image.imageId}</p><p>{image.interpretation}</p><p className="text-xs text-slate-400">{image.creditOrSource} · Fecha de imagen: {image.imageDate || 'No informada'}<br />{image.license} · Fuente consultada: {image.consultedAt}</p>
      {sourceUrl && <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sky-300 underline">Abrir registro y créditos originales</a>}
      {safeHttpsUrl(image.licenseUrl) && <a href={safeHttpsUrl(image.licenseUrl)} target="_blank" rel="noopener noreferrer" className="ml-4 text-sky-300 underline">Condiciones de uso</a>}
    </figcaption>
  </figure>;
}
export function SourceImageGallery({ organism,initialType="all" }: { organism: Microorganism;initialType?:string }) {
  const [query,setQuery]=useState(''),[type,setType]=useState(initialType),[all,setAll]=useState(false);
  const labels:Record<string,string>={microfotografia_real:'Microscopía',fotografia_cultivo:'Cultivos',fotografia_clinica:'Imagen clínica',fotografia_vector:'Vectores',fotografia_entorno:'Entorno',ilustracion_cientifica:'Ilustraciones',modelo_educativo_3d:'Modelo educativo'};
  const realImages = curatedImages(organism).filter(image => !['ilustracion_cientifica','modelo_educativo_3d'].includes(image.type));
  const filtered=realImages.filter(image=>(type==='all'||image.type===type)&&`${image.caption} ${image.stainOrModality} ${image.interpretation}`.toLowerCase().includes(query.toLowerCase().trim()));
  const supplement=learningSupplement(organism);
  return <section className="space-y-4"><h3 className="text-xl font-bold">Galería documentada · {realImages.length} imágenes</h3><p className="text-sm">Microfotografías, cultivos e imágenes clínicas; vectores y entorno se identifican aparte. Pulsa una imagen para ampliarla. La técnica y la muestra determinan qué puede interpretarse.</p>
    {supplement&&<p className="rounded-lg bg-sky-50 border border-sky-200 p-3 text-xs">{supplement.scope} Leyendas educativas pendientes de revisión clínica independiente. Las imágenes externas necesitan conexión.</p>}
    <p className="text-xs text-slate-600">Objetivo editorial: hasta ocho imágenes pertinentes por microorganismo. Disponibles: {realImages.length}; imágenes clínicas: {realImages.filter(i=>i.type==='fotografia_clinica').length}. {realImages.length<8?'Ampliación pendiente con fuentes verificables.':'Se conservan también las imágenes adicionales ya guardadas.'}</p>
    <CdcAttribution />
    <div className="grid gap-3 sm:grid-cols-2"><label className="text-sm">Buscar estadio o técnica<input className="mt-1 block w-full rounded-lg border border-slate-300 p-2" value={query} onChange={e=>{setQuery(e.target.value);setAll(false);}} placeholder="Quiste, Giemsa, cultivo…"/></label><label className="text-sm">Tipo de imagen<select className="mt-1 block w-full rounded-lg border border-slate-300 p-2" value={type} onChange={e=>{setType(e.target.value);setAll(false);}}><option value="all">Todas</option>{Array.from(new Set(realImages.map(i=>i.type))).map(t=><option key={t} value={t}>{labels[t]??t}</option>)}</select></label></div>
    {filtered.length ? <div className="grid gap-4 lg:grid-cols-2">{filtered.slice(0,all?undefined:8).map((image, index) => <ImageCard key={`${organism.id}-${image.imageId}-${index}`} image={image} />)}</div> : <p className="rounded-lg border border-amber-200 bg-amber-50 p-4">{realImages.length?'No hay imágenes que coincidan con el filtro.':'Esta ficha todavía no tiene imágenes con procedencia y condiciones de uso documentadas.'}</p>}
    {filtered.length>8&&<button className="rounded-lg border border-slate-300 p-3 text-sm" onClick={()=>setAll(!all)}>{all?'Mostrar las primeras ocho':`Ver las ${filtered.length} imágenes disponibles`}</button>}
  </section>;
}
