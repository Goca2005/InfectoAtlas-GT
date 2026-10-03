import { useState } from 'react';
import type { Microorganism } from '../types/microorganism';
import { learningSupplement } from '../services/learningAtlas';
import { safeHttpsUrl } from './SourceImageGallery';
import { CdcAttribution } from './CdcAttribution';
export function LifeCyclePanel({organism}:{organism:Microorganism}) {
  const supplement=learningSupplement(organism);
  const [selected,setSelected]=useState(0),[failed,setFailed]=useState(false);
  const cycle=supplement?.cycles[selected];
  if(!cycle)return <p className="rounded-lg border border-amber-200 bg-amber-50 p-4">Esta ficha aún no tiene un ciclo CDC documentado. El ciclo de otro parásito no debe utilizarse como sustituto.</p>;
  return <section className="space-y-5">
    <div><p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Parasitología · CDC / DPDx</p><h3 className="mt-1 text-2xl font-bold">Ciclo de vida: {cycle.title}</h3><p className="mt-2 text-sm text-slate-600">{supplement.scope}</p></div>
    <CdcAttribution />
    {supplement.cycles.length>1&&<label className="block font-semibold">Ciclo a estudiar<select value={selected} onChange={e=>{setSelected(Number(e.target.value));setFailed(false);}} className="block mt-1 rounded-lg border border-slate-300 p-2 w-full">{supplement.cycles.map((c,i)=><option key={c.title} value={i}>{c.title}</option>)}</select></label>}
    <div className="grid gap-3 sm:grid-cols-2"><article className="rounded-xl border border-emerald-300 bg-emerald-50 p-4"><h4 className="font-bold text-emerald-900">Fase infectiva · nombre y vía</h4><ul className="list-disc pl-5 mt-2 space-y-2 text-sm">{cycle.infective.map(s=><li key={s}>{s}</li>)}</ul></article><article className="rounded-xl border border-sky-300 bg-sky-50 p-4"><h4 className="font-bold text-sky-900">Fase diagnóstica · nombre y muestra</h4><ul className="list-disc pl-5 mt-2 space-y-2 text-sm">{cycle.diagnostic.map(s=><li key={s}>{s}</li>)}</ul></article></div>
    <div className="rounded-xl border border-slate-200 p-4"><h4 className="font-bold">Explicación breve del ciclo</h4><ol className="list-decimal pl-5 mt-2 space-y-2 text-sm">{cycle.steps.map(s=><li key={s}>{s}</li>)}</ol><p className="mt-4 text-sm rounded-lg bg-amber-50 p-3 text-amber-900">{cycle.note}</p></div>
    <figure className="rounded-xl border border-slate-200 bg-white overflow-hidden">{!failed&&safeHttpsUrl(cycle.imageUrl)?<a href={cycle.imageUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir ciclo CDC en tamaño original"><img src={cycle.imageUrl} alt={`Ciclo original CDC / DPDx de ${cycle.title}. Explicación en español disponible encima.`} loading="lazy" referrerPolicy="no-referrer" onError={()=>setFailed(true)} className="w-full max-h-[650px] object-contain p-3"/></a>:<p className="p-6">No se pudo cargar el diagrama. Abre la fuente CDC para consultarlo.</p>}<figcaption className="p-4 border-t border-slate-200 text-xs text-slate-600 space-y-2"><p>Diagrama original del CDC, sin modificar; texto original en inglés. Explicación en español: síntesis educativa de InfectoAtlas GT, pendiente de revisión clínica independiente. Fuente consultada el 03/10/2026.</p><div className="flex flex-wrap gap-4"><a href={cycle.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sky-700 underline">Fuente CDC y explicación original</a><a href="https://www.cdc.gov/other/agencymaterials.html" target="_blank" rel="noopener noreferrer" className="text-sky-700 underline">Condiciones de uso del CDC</a></div></figcaption></figure>
  </section>;
}
