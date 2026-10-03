import { useState } from 'react';
import type { Microorganism } from '../types/microorganism';
import { REFERENCE_MICROORGANISMS } from '../data/referenceMicroorganisms';
import { PUBLIC_REFERENCE_CATALOG, catalogIdentity } from '../services/publicCatalog';
import { buildVisualAtlas } from '../services/visualAtlas';
import { LEARNING_ATLAS, curatedImages } from '../services/learningAtlas';

export function ReferenceCatalogPanel({ organisms, onSelect, onBackup }: { organisms: Microorganism[]; onSelect: (org: Microorganism) => void; onAdd: () => number; onBackup: () => Promise<void> }) {
  const [expanded, setExpanded] = useState(false);
  return <section className="rounded-xl bg-slate-950 text-slate-100 border border-sky-900 p-5 space-y-4">
    <div className="flex flex-wrap justify-between gap-3">
      <div><p className="text-xs uppercase tracking-widest text-sky-300">Fase 4C · contenido y atlas visual</p><h3 className="text-xl font-bold mt-1">{PUBLIC_REFERENCE_CATALOG.length} referencias incluidas · {LEARNING_ATLAS.flatMap(e=>e.cycles).length} ciclos CDC</h3></div>
      <button type="button" onClick={() => setExpanded(!expanded)} className="rounded-lg border border-sky-700 px-4 py-2 text-sm">{expanded ? 'Ocultar fichas documentadas' : 'Explorar fichas documentadas'}</button>
    </div>
    <p className="text-sm text-slate-300">{buildVisualAtlas(PUBLIC_REFERENCE_CATALOG).length} fotografías distintas referenciadas con fuente y créditos. Las referencias aparecen automáticamente junto a tus fichas y documentos; los apartados pendientes se indican al abrir cada ficha. Las versiones personales conservan su información.</p>
    {expanded && <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{REFERENCE_MICROORGANISMS.map(org => {
        const current = organisms.find(o => catalogIdentity(o.scientificName) === catalogIdentity(org.scientificName)) ?? org;
        return <article key={org.id} className="rounded-lg bg-slate-900 border border-slate-700 p-3 space-y-2">
          <p className="text-xs text-sky-300 capitalize">{current.category} · {curatedImages(current).length} imágenes documentadas</p>
          <h4 className="font-bold italic">{current.scientificName}</h4><p className="text-xs text-slate-400">{current.publicReference ? 'Referencia incluida en la aplicación' : 'Ficha personal guardada; se conserva'}</p>
          <button type="button" onClick={() => onSelect(current)} className="text-sm text-sky-200 underline">Ver ficha de {current.scientificName}</button>
        </article>;
      })}</div>
      <p className="text-xs leading-6 text-slate-400">La colección pública se distribuye con el código. Tus documentos, notas y cambios personales pertenecen a este navegador y se conservan mediante el respaldo.</p>
      <button type="button" onClick={onBackup} className="rounded-lg border border-slate-500 px-3 py-2 text-sm">Exportar respaldo personal</button>
    </>}
  </section>;
}
