import { useState } from 'react';
import type { Microorganism } from '../types/microorganism';
import { REFERENCE_MICROORGANISMS } from '../data/referenceMicroorganisms';
import { missingReferences, normalizeScientificName } from '../services/catalogExpansion';
import { LEARNING_ATLAS, curatedImages } from '../services/learningAtlas';

export function ReferenceCatalogPanel({ organisms, onSelect, onAdd, onBackup }: { organisms: Microorganism[]; onSelect: (org: Microorganism) => void; onAdd: () => number; onBackup: () => Promise<void> }) {
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const missing = missingReferences(organisms);
  return <section className="rounded-xl bg-slate-950 text-slate-100 border border-sky-900 p-5 space-y-4">
    <div className="flex flex-wrap justify-between gap-3">
      <div><p className="text-xs uppercase tracking-widest text-sky-300">Fase 4C · atlas visual y ciclos CDC</p><h3 className="text-xl font-bold mt-1">32 galerías documentadas · 21 ciclos · laboratorio 3D</h3></div>
      <button type="button" onClick={() => setExpanded(!expanded)} className="rounded-lg border border-sky-700 px-4 py-2 text-sm">{expanded ? 'Ocultar fichas documentadas' : 'Explorar fichas documentadas'}</button>
    </div>
    <p className="text-sm text-slate-300">{LEARNING_ATLAS.reduce((n,e)=>n+e.images.length,0)+4} imágenes de referencia con fuente y créditos: microscopía, cultivos e imágenes clínicas, además de vectores y entorno identificados. Las galerías y ciclos aparecen también en tus fichas guardadas. Síntesis educativa pendiente de revisión clínica.</p>
    {expanded && <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{REFERENCE_MICROORGANISMS.map(org => {
        const exists = organisms.some(current => normalizeScientificName(current.scientificName) === normalizeScientificName(org.scientificName));
        return <article key={org.id} className="rounded-lg bg-slate-900 border border-slate-700 p-3 space-y-2">
          <p className="text-xs text-sky-300 capitalize">{org.category} · {curatedImages(org).length} imágenes documentadas</p>
          <h4 className="font-bold italic">{org.scientificName}</h4><p className="text-xs text-slate-400">{exists ? 'Ya existe una ficha personal; se conserva' : 'Disponible para añadir'}</p>
          <button type="button" onClick={() => onSelect(org)} className="text-sm text-sky-200 underline">Ver ficha de {org.scientificName}</button>
        </article>;
      })}</div>
      <div className="rounded-lg border border-slate-700 p-3 text-sm space-y-3">
        <p>Se añadirán únicamente {missing.length} fichas ausentes: {missing.map(org => org.scientificName).join(', ') || 'ninguna'}. Las fichas personales existentes mantienen sus textos y clasificación.</p>
        <div className="flex flex-wrap gap-3"><button type="button" onClick={onBackup} className="rounded-lg border border-slate-500 px-3 py-2">Exportar respaldo antes de añadir</button>
        <button type="button" disabled={!missing.length} onClick={() => { try { const added = onAdd(); setMessage(`${added} fichas añadidas. Las existentes se conservaron.`); } catch(error) { setMessage(error instanceof Error ? error.message : 'No se pudieron guardar las fichas.'); } }} className="rounded-lg bg-sky-700 px-3 py-2 disabled:opacity-40">Añadir fichas ausentes ({missing.length})</button></div>
        <p role="status">{message}</p>
      </div>
    </>}
  </section>;
}
