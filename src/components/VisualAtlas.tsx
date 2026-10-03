import { useMemo, useState } from 'react';
import { Images, ArrowUpRight, Microscope } from 'lucide-react';
import type { Microorganism, MicroorganismCategory } from '../types/microorganism';
import { buildVisualAtlas, filterVisualAtlas, IMAGE_TYPE_LABELS, visualCoverage } from '../services/visualAtlas';
import { ImageCard } from './SourceImageGallery';
import { CdcAttribution } from './CdcAttribution';
import { catalogIdentity } from '../services/publicCatalog';

export function VisualAtlas({ microorganisms, onSelectOrganism }: { microorganisms: Microorganism[]; onSelectOrganism: (o: Microorganism) => void }) {
  const [query, setQuery] = useState(''), [category, setCategory] = useState<MicroorganismCategory | 'all'>('all'), [type, setType] = useState('all'), [organismId, setOrganismId] = useState('all'), [limit, setLimit] = useState(24);
  const entries = useMemo(() => buildVisualAtlas(microorganisms), [microorganisms]);
  const coverage = useMemo(() => visualCoverage(microorganisms), [microorganisms]);
  const filtered = filterVisualAtlas(entries, { query, category, type, organismKey: organismId });
  const selectable = Array.from(new Map(microorganisms.filter(o => (category === 'all' || o.category === category) && entries.some(e => e.organisms.some(v => v.id === o.id))).map(o => [catalogIdentity(o.scientificName),o])).values()).sort((a, b) => a.scientificName.localeCompare(b.scientificName));
  const resetLimit = () => setLimit(24);
  return <div className="space-y-6">
    <section className="rounded-2xl bg-slate-950 p-6 sm:p-8 text-white border border-sky-900">
      <p className="text-xs uppercase tracking-[0.2em] text-sky-300 flex items-center gap-2"><Images size={16}/>Colección de referencia · Guatemala</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight">Atlas visual de infectología</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Explora fotografías auténticas, identifica la técnica y abre la ficha correspondiente. Cada imagen conserva su procedencia, fecha disponible y condiciones de uso. Las muestras y los casos internacionales sirven como referencia de estudio para Guatemala.</p>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800 pt-5">
        {[['Fotografías distintas', entries.length], ['Fichas con imágenes', coverage.withImages], ['Con ocho o más', coverage.atLeastEight], ['Aún sin imágenes', coverage.withoutImages]].map(([label, n]) => <div key={label}><p className="text-2xl font-bold text-sky-200 tabular-nums">{n}</p><p className="mt-1 text-xs text-slate-400">{label}</p></div>)}
      </div>
    </section>
    <CdcAttribution/>
    <section aria-label="Filtros del atlas visual" className="rounded-xl border border-slate-200 bg-white p-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4 text-sm">
      <label>Buscar imagen o técnica<input value={query} onChange={e => { setQuery(e.target.value); resetLimit(); }} placeholder="Sangre, Giemsa, PHIL…" className="mt-1 w-full rounded-lg border border-slate-300 p-2.5"/></label>
      <label>Grupo de microorganismos<select value={category} onChange={e => { setCategory(e.target.value as typeof category); setOrganismId('all'); resetLimit(); }} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5"><option value="all">Todos los grupos</option><option value="bacteria">Bacterias</option><option value="virus">Virus</option><option value="hongo">Hongos</option><option value="parasito">Parásitos</option></select></label>
      <label>Tipo de fotografía<select value={type} onChange={e => { setType(e.target.value); resetLimit(); }} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5"><option value="all">Todos los tipos</option>{Object.entries(IMAGE_TYPE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
      <label>Microorganismo<select value={organismId} onChange={e => { setOrganismId(e.target.value); resetLimit(); }} className="mt-1 w-full rounded-lg border border-slate-300 p-2.5"><option value="all">Todos los microorganismos con imágenes</option>{selectable.map(o => <option key={catalogIdentity(o.scientificName)} value={catalogIdentity(o.scientificName)}>{o.scientificName}</option>)}</select></label>
    </section>
    <div className="flex flex-wrap justify-between gap-2 text-xs text-slate-600"><p role="status">{filtered.length} fotografías coinciden · mostrando {Math.min(limit, filtered.length)}</p><button className="text-sky-800 font-semibold underline" onClick={() => { setQuery(''); setCategory('all'); setType('all'); setOrganismId('all'); resetLimit(); }}>Restablecer filtros</button></div>
    <p className="text-xs leading-6 text-slate-600">Una fotografía compartida aparece una sola vez y muestra todas sus fichas asociadas. La asociación permite estudiar el registro; no significa que la imagen identifique por sí sola una especie.</p>
    {filtered.length ? <div className="grid gap-5 lg:grid-cols-2">{filtered.slice(0, limit).map(entry => <article key={entry.key} className="min-w-0 space-y-2"><ImageCard image={entry.image}/><div className="rounded-lg border border-slate-200 bg-white p-3 space-y-2"><p className="text-[11px] uppercase tracking-wider text-slate-500">Fichas asociadas</p>{entry.organisms.map(o => <button key={o.id} className="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-sky-800" onClick={() => onSelectOrganism(o)}><span className="italic">{o.scientificName}</span><ArrowUpRight size={16}/></button>)}</div></article>)}</div> : <div className="rounded-xl border border-slate-200 bg-white p-10 text-center"><Microscope className="mx-auto text-slate-400"/><p className="mt-3">No hay imágenes que coincidan. Cambia los filtros para explorar la colección.</p></div>}
    {filtered.length > limit && <button className="w-full rounded-xl border border-sky-300 bg-sky-50 p-4 font-semibold text-sky-900" onClick={() => setLimit(n => n + 24)}>Cargar 24 imágenes más</button>}
  </div>;
}
