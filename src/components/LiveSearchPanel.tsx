import React, { useEffect, useRef, useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import type { Microorganism } from '../types/microorganism';
import type { LiveSearchInput, LiveSearchResult, LiveTopic } from '../types/live';
import { LIVE_EVENT, LiveRepository, searchPubmed } from '../services/liveService';
import { useLiveState } from './useLiveState';
import { LiveArticleCard, liveTime } from './LiveArticleCard';
import { organismSearchTerm } from '../../shared/organismTerms.mjs';

const TOPIC_LABELS: Record<LiveTopic, string> = { all: 'Todos los temas', diagnosis: 'Diagnóstico', treatment: 'Tratamiento', resistance: 'Resistencia antimicrobiana', epidemiology: 'Epidemiología', vaccines: 'Vacunas' };
const fieldClass = 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-cyan-600';

export function LiveSearchPanel({ microorganisms, fixedOrganism, onSelectOrganism }: {
  microorganisms: Microorganism[];
  fixedOrganism?: Microorganism;
  onSelectOrganism?: (organism: Microorganism) => void;
}) {
  const [q, setQ] = useState('');
  const [organismId, setOrganismId] = useState(fixedOrganism?.id ?? '');
  const [category, setCategory] = useState('all');
  const [topic, setTopic] = useState<LiveTopic>('all');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [publicationType, setPublicationType] = useState('all');
  const [resultCategory, setResultCategory] = useState('all');
  const [result, setResult] = useState<LiveSearchResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [persistenceWarning, setPersistenceWarning] = useState('');
  const [newRecords, setNewRecords] = useState<number | null>(null);
  const activeRequest = useRef<AbortController | null>(null);
  const requestId = useRef(0);
  const { state, storageError, toggleFollow } = useLiveState();
  const selected = fixedOrganism ?? microorganisms.find(organism => organism.id === organismId);
  useEffect(() => () => { requestId.current++; activeRequest.current?.abort(); }, []);
  useEffect(() => {
    requestId.current++;
    activeRequest.current?.abort();
    setBusy(false); setResult(null); setQ(''); setOrganismId(fixedOrganism?.id ?? '');
    setError(''); setPersistenceWarning(''); setNewRecords(null);
  }, [fixedOrganism?.id]);
  const execute = async (input: LiveSearchInput, linkedId?: string) => {
    const id = ++requestId.current;
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 55000);
    const attemptedAt = new Date().toISOString();
    setBusy(true); setError(''); setPersistenceWarning('');
    try {
      const data = await searchPubmed(input, controller.signal);
      if (requestId.current !== id) return;
      let linked = data.articles;
      try {
        const saved = new LiveRepository(localStorage).recordSuccess(data, attemptedAt, microorganisms, linkedId);
        linked = saved.articles; setNewRecords(saved.newRecords);
        window.dispatchEvent(new Event(LIVE_EVENT));
      } catch (storageFailure) {
        setNewRecords(null);
        setPersistenceWarning(`Consulta completada, pero no se guardó el historial: ${storageFailure instanceof Error ? storageFailure.message : 'almacenamiento no disponible'}`);
        linked = data.articles.map(article => ({ ...article, relatedOrganismIds: linkedId ? [linkedId] : [] }));
      }
      setResult({ ...data, articles: linked }); setPublicationType('all'); setResultCategory('all');
    } catch (failure) {
      if (requestId.current !== id) return;
      const message = controller.signal.aborted ? 'La consulta agotó el tiempo de espera. Intenta nuevamente.' : failure instanceof Error ? failure.message : 'Falló la búsqueda.';
      setError(message);
      try {
        new LiveRepository(localStorage).recordFailure([input.organism, input.q, TOPIC_LABELS[input.topic]].filter(Boolean).join(' · '), attemptedAt, message);
        window.dispatchEvent(new Event(LIVE_EVENT));
      } catch { setPersistenceWarning('No se pudo guardar este intento en el historial local.'); }
    } finally {
      window.clearTimeout(timeout);
      if (requestId.current === id) setBusy(false);
    }
  };
  const publicationTypes = [...new Set(result?.articles.flatMap(article => article.publicationTypes) ?? [])].sort();
  const visible = result?.articles.filter(article => (publicationType === 'all' || article.publicationTypes.includes(publicationType))
    && (resultCategory === 'all' || microorganisms.some(organism => organism.category === resultCategory && article.relatedOrganismIds?.includes(organism.id)))) ?? [];
  const lastSuccess = state.history.find(entry => entry.success);
  return <div className="space-y-4">
    {fixedOrganism && <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-cyan-200 bg-cyan-50 p-3">
      <p className="text-sm text-cyan-950">Literatura sobre <strong className="italic">{fixedOrganism.scientificName}</strong></p>
      <button type="button" onClick={() => toggleFollow(fixedOrganism.id)} className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white">{state.followedIds.includes(fixedOrganism.id) ? 'Dejar de seguir' : 'Seguir microorganismo'}</button>
    </div>}
    <p className="text-xs text-slate-600">La literatura recuperada requiere revisión. Las fichas clínicas conservan sus datos aprobados. Consultas manuales; alertas en LIVE para especies seguidas, sin vigilancia continua ni avisos externos.</p>
    <form onSubmit={event => { event.preventDefault(); void execute({ q, organism: selected ? organismSearchTerm(selected) : '', topic, from, to, offset: 0 }, selected?.id); }} className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
      <label className="block text-xs font-semibold text-slate-600">Buscar por enfermedad, término o consulta PubMed
        <input value={q} onChange={event => setQ(event.target.value)} maxLength={500} placeholder={fixedOrganism ? 'Opcional: Guatemala, diagnóstico, tratamiento…' : 'Ej.: dengue diagnosis o Leishmaniasis Guatemala'} className={fieldClass} />
      </label>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {!fixedOrganism && <>
          <label className="text-xs font-semibold text-slate-600">Categoría del catálogo
            <select className={fieldClass} value={category} onChange={event => { setCategory(event.target.value); setOrganismId(''); }}>
              <option value="all">Todas</option><option value="bacteria">Bacterias</option><option value="virus">Virus</option><option value="hongo">Hongos</option><option value="parasito">Parásitos</option>
            </select>
          </label>
          <label className="text-xs font-semibold text-slate-600">Microorganismo
            <select className={fieldClass} value={organismId} onChange={event => setOrganismId(event.target.value)}>
              <option value="">Seleccionar (opcional)</option>{microorganisms.filter(organism => category === 'all' || organism.category === category).map(organism => <option key={organism.id} value={organism.id}>{organism.scientificName}</option>)}
            </select>
          </label>
        </>}
        <label className="text-xs font-semibold text-slate-600">Tema de búsqueda
          <select value={topic} onChange={event => setTopic(event.target.value as LiveTopic)} className={fieldClass}>{Object.entries(TOPIC_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
        </label>
        <label className="text-xs font-semibold text-slate-600">Publicación desde<input type="date" value={from} onChange={event => setFrom(event.target.value)} className={fieldClass} /></label>
        <label className="text-xs font-semibold text-slate-600">Publicación hasta<input type="date" value={to} min={from || undefined} onChange={event => setTo(event.target.value)} className={fieldClass} /></label>
      </div>
      {!fixedOrganism && category !== 'all' && <p className="text-xs text-slate-500">La categoría limita el selector de microorganismos. Selecciona una especie para limitar la consulta.</p>}
      <button type="submit" disabled={busy || (!q.trim() && !selected)} className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-sky-900 disabled:opacity-50">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}{busy ? 'Consultando PubMed…' : 'BUSCAR ACTUALIZACIONES AHORA'}
      </button>
    </form>
    {(storageError || persistenceWarning) && <p role="alert" className="rounded-lg bg-amber-50 p-3 text-xs text-amber-900">{persistenceWarning || storageError}</p>}
    {error && <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{error}{result && <p className="mt-1 text-xs">Se conservan debajo los resultados de la última consulta satisfactoria.</p>}</div>}
    <p className="text-xs text-slate-500">Última consulta satisfactoria guardada: {lastSuccess?.retrievedAt ? `${liveTime(lastSuccess.retrievedAt)} (Guatemala)` : 'Aún no registrada'}.</p>
    {result ? <>
      <div role="status" className="rounded-xl border border-cyan-200 bg-cyan-50 p-4 space-y-2 text-xs text-cyan-950">
        <p className="font-bold">Consulta completada · {result.articles.length} registros recuperados · {newRecords === null ? 'nuevos sin contabilizar' : `${newRecords} nuevos en el historial local`}</p>
        <p>Recuperación de la fuente: {liveTime(result.retrievedAt)} · Respuesta: {liveTime(result.servedAt)} (Guatemala).</p>
        <p>{result.cacheHit ? 'Respuesta desde caché temporal; conserva la fecha de recuperación original.' : 'Consulta real completada a NCBI E-utilities.'}</p>
        <p className="break-words">Consulta aplicada: {result.query.term}{result.query.from && ` · Desde ${result.query.from}`}{result.query.to && ` · Hasta ${result.query.to}`} · Página {result.offset / 20 + 1} · {result.total} coincidencias en PubMed.</p>
        <details><summary className="cursor-pointer">Trazabilidad de la búsqueda</summary><p className="mt-2 break-words">Interpretación de NCBI: {result.translatedQuery}</p></details>
        <a href={result.sourceSearchUrl} target="_blank" rel="noopener noreferrer" className="underline">Abrir consulta en PubMed</a>
      </div>
      {publicationTypes.length > 0 && <label className="block max-w-md text-xs font-semibold text-slate-600">Tipo de publicación (filtra esta página)
        <select value={publicationType} onChange={event => setPublicationType(event.target.value)} className={fieldClass}><option value="all">Todos los tipos informados</option>{publicationTypes.map(type => <option key={type}>{type}</option>)}</select>
      </label>}
      {!fixedOrganism && <label className="block max-w-md text-xs font-semibold text-slate-600">Categoría vinculada (clasificación preliminar de esta página)
        <select value={resultCategory} onChange={event => setResultCategory(event.target.value)} className={fieldClass}><option value="all">Todas</option><option value="bacteria">Bacterias</option><option value="virus">Virus</option><option value="hongo">Hongos</option><option value="parasito">Parásitos</option></select>
      </label>}
      <p className="text-xs text-slate-500">{visible.length} de {result.articles.length} registros de esta página coinciden con los filtros locales.</p>
      {visible.length === 0 && <p className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600">{result.articles.length ? 'Ningún registro de esta página coincide con el tipo seleccionado.' : 'PubMed no devolvió resultados para esta consulta. Prueba otros términos o fechas.'}</p>}
      {visible.map(article => <LiveArticleCard key={article.pmid} article={article} microorganisms={microorganisms} onSelectOrganism={onSelectOrganism} />)}
      <div className="flex gap-3 text-xs">
        <button type="button" disabled={busy || result.offset === 0} onClick={() => void execute({ ...result.query, offset: result.offset - 20 }, microorganisms.find(organism => organismSearchTerm(organism) === result.query.organism)?.id)} className="rounded border border-slate-300 px-3 py-2 disabled:opacity-40">Página anterior</button>
        <button type="button" disabled={busy || !result.hasMore} onClick={() => void execute({ ...result.query, offset: result.offset + 20 }, microorganisms.find(organism => organismSearchTerm(organism) === result.query.organism)?.id)} className="rounded border border-slate-300 px-3 py-2 disabled:opacity-40">Siguiente página</button>
      </div>
    </> : !busy && <p className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">Selecciona una especie o escribe una consulta y pulsa buscar para recuperar publicaciones reales.</p>}
    <p className="text-[11px] text-slate-500">Fuente: PubMed / NCBI. Los resúmenes pueden estar protegidos por derechos de autor. <a className="underline" href="https://www.ncbi.nlm.nih.gov/About/disclaimer.html" target="_blank" rel="noopener noreferrer">Condiciones y aviso de NCBI</a>.</p>
  </div>;
}
