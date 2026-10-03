import { useState } from 'react';
import type { Microorganism } from '../types/microorganism';
import { PUBLIC_REFERENCE_CATALOG, catalogIdentity } from '../services/publicCatalog';
import { buildVisualAtlas } from '../services/visualAtlas';
import { learningSupplement, curatedImages } from '../services/learningAtlas';
import { academicProfile, academicSearchText } from '../services/academicContent';

export function ReferenceCatalogPanel({ organisms, onSelect, onBackup }: { organisms: Microorganism[]; onSelect: (org: Microorganism) => void; onAdd: () => number; onBackup: () => Promise<void> }) {
  const [expanded, setExpanded] = useState(false);
  const [query,setQuery]=useState('');
  const references=PUBLIC_REFERENCE_CATALOG.filter(o=>academicSearchText(o.scientificName).includes(academicSearchText(query))).sort((a,b)=>a.scientificName.localeCompare(b.scientificName));
  return <section className="rounded-xl bg-slate-950 text-slate-100 border border-sky-900 p-5 space-y-4">
    <div className="flex flex-wrap justify-between gap-3">
      <div><p className="text-xs uppercase tracking-widest text-sky-300">Fase 4C · contenido y atlas visual</p><h3 className="text-xl font-bold mt-1">{PUBLIC_REFERENCE_CATALOG.length} referencias incluidas · {PUBLIC_REFERENCE_CATALOG.reduce((n,o)=>n+(learningSupplement(o)?.cycles.length??0),0)} ciclos CDC</h3></div>
      <button type="button" onClick={() => setExpanded(!expanded)} className="rounded-lg border border-sky-700 px-4 py-2 text-sm">{expanded ? 'Ocultar fichas documentadas' : 'Explorar fichas documentadas'}</button>
    </div>
    <p className="text-sm text-slate-300">{buildVisualAtlas(PUBLIC_REFERENCE_CATALOG).length} fotografías distintas referenciadas con fuente y créditos. Las referencias aparecen automáticamente junto a tus fichas y documentos; los apartados pendientes se indican al abrir cada ficha. Las versiones personales conservan su información.</p>
    {expanded && <>
      <label className="block text-xs text-sky-200">Buscar una referencia pública<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Nombre del microorganismo…" className="mt-2 block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white"/></label>
      <p className="text-xs text-slate-400">{references.length} referencias. Las fichas con ampliación incorporan síntesis con fuentes junto al contenido documental.</p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{references.map(org => {
        const current = organisms.find(o => catalogIdentity(o.scientificName) === catalogIdentity(org.scientificName)) ?? org;
        return <article key={org.id} className="rounded-lg bg-slate-900 border border-slate-700 p-3 space-y-2">
          <p className="text-xs text-sky-300 capitalize">{current.category} · {curatedImages(current).length} imágenes documentadas</p>
          <h4 className="font-bold italic">{current.scientificName}</h4><p className="text-xs text-slate-400">{current.publicReference ? 'Referencia incluida en la aplicación' : 'Ficha personal guardada; se conserva'}</p>
          {academicProfile(current.scientificName)&&<p className="text-xs text-sky-300">Síntesis académica ampliada</p>}
          <button type="button" onClick={() => onSelect(current)} className="text-sm text-sky-200 underline">Ver ficha de {current.scientificName}</button>
        </article>;
      })}</div>
      <p className="text-xs leading-6 text-slate-400">La colección pública se distribuye con el código. Tus documentos, notas y cambios personales pertenecen a este navegador y se conservan mediante el respaldo.</p>
      <button type="button" onClick={onBackup} className="rounded-lg border border-slate-500 px-3 py-2 text-sm">Exportar respaldo personal</button>
    </>}
  </section>;
}
