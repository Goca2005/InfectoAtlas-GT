import React, { useEffect, useRef, useState } from 'react';
import { Bell, Loader2 } from 'lucide-react';
import type { Microorganism } from '../types/microorganism';
import { useLiveState } from './useLiveState';
import { LIVE_EVENT, LiveRepository } from '../services/liveService';
import { refreshFollowed, type RefreshProgress } from '../services/followedRefresh';
import { liveTime } from './LiveArticleCard';

const field = 'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm';
const calendarDay = (date: Date) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guatemala', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
export function LiveAlertsPanel({ microorganisms, onSelectOrganism }: {
  microorganisms: Microorganism[]; onSelectOrganism: (organism: Microorganism) => void;
}) {
  const { state, alerts, storageError, markAlertsRead } = useLiveState();
  const followed = microorganisms.filter(organism => state.followedIds.includes(organism.id));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [from, setFrom] = useState(() => calendarDay(new Date(Date.now() - 30 * 86400000)));
  const [to, setTo] = useState(() => calendarDay(new Date()));
  const [filter, setFilter] = useState('unread');
  const [species, setSpecies] = useState('all');
  const [busy, setBusy] = useState(false);
  const [outcomes, setOutcomes] = useState<RefreshProgress[]>([]);
  const [message, setMessage] = useState('');
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => { const previous = controller.current; controller.current = null; previous?.abort(); }, []);
  const selected = followed.filter(organism => selectedIds.includes(organism.id));
  const unread = alerts.alerts.filter(alert => !alert.readAt);
  const visible = alerts.alerts.filter(alert => (filter === 'all' || (filter === 'unread' ? !alert.readAt : Boolean(alert.readAt))) && (species === 'all' || alert.organismIds.includes(species)));
  const run = async () => {
    if (busy) return;
    const request = new AbortController(); controller.current = request;
    setBusy(true); setMessage(''); setOutcomes([]);
    try {
      const results = await refreshFollowed({ organisms: selected, from, to, signal: request.signal,
        repository: new LiveRepository(localStorage), catalogue: microorganisms,
        onProgress: progress => { if (controller.current !== request) return; setOutcomes(previous => [...previous, progress]); window.dispatchEvent(new Event(LIVE_EVENT)); },
      });
      if (controller.current !== request) return;
      setMessage(request.signal.aborted ? 'Consulta cancelada. Se conservaron las especies ya completadas.' : results.length < selected.length ? 'El lote se detuvo. Revisa el error antes de volver a consultar.' : 'Consulta por lote completada.');
    } catch (error) { if (controller.current === request) setMessage(error instanceof Error ? error.message : 'No se pudo completar el lote.'); }
    finally { if (controller.current === request) setBusy(false); }
  };
  return <div className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h3 className="flex items-center gap-2 text-xl font-bold"><Bell className="h-5 w-5 text-cyan-700" /> Alertas científicas · {unread.length} sin leer</h3>
      <button type="button" disabled={!unread.length || Boolean(storageError)} onClick={() => markAlertsRead(unread.map(alert => alert.id))} className={`${field} text-xs disabled:opacity-40`}>Marcar todas como leídas</button>
    </div>
    <p className="text-sm text-slate-600">Publicaciones nuevas para tus microorganismos seguidos, detectadas al consultar PubMed. Cada alerta conserva su fuente y su búsqueda. Requieren revisión científica y no indican por sí mismas un brote o un cambio de tratamiento.</p>
    <form onSubmit={event => { event.preventDefault(); void run(); }} className="space-y-4 rounded-xl border border-cyan-200 bg-cyan-50 p-4">
      <h4 className="text-sm font-bold">Consultar mis microorganismos seguidos</h4>
      <p className="text-xs text-slate-600">Selecciona hasta 10 especies. Se consulta una por vez y se recupera la primera página de hasta 20 publicaciones por especie en el intervalo indicado. Para explorar más resultados usa Actualizaciones científicas.</p>
      {!followed.length && <p className="text-sm">Abre una ficha y pulsa «Seguir microorganismo» para comenzar.</p>}
      <div className="flex flex-wrap gap-2">
        <button type="button" disabled={busy || !followed.length} onClick={() => setSelectedIds(followed.slice(0, 10).map(organism => organism.id))} className={`${field} text-xs`}>Seleccionar hasta 10</button>
        <button type="button" disabled={busy} onClick={() => setSelectedIds([])} className={`${field} text-xs`}>Quitar selección</button>
      </div>
      <fieldset disabled={busy} className="grid gap-2 sm:grid-cols-2">
        <legend className="sr-only">Microorganismos del lote</legend>
        {followed.map(organism => <label key={organism.id} className="flex items-center gap-2 text-xs">
          <input type="checkbox" checked={selectedIds.includes(organism.id)} disabled={!selectedIds.includes(organism.id) && selected.length >= 10}
            onChange={event => setSelectedIds(previous => event.target.checked ? [...previous, organism.id] : previous.filter(id => id !== organism.id))} />
          <span className="italic">{organism.scientificName}</span>
        </label>)}
      </fieldset>
      <div className="flex flex-wrap gap-3">
        <label className="flex flex-col gap-1 text-xs">Publicación desde<input required type="date" disabled={busy} value={from} onChange={event => setFrom(event.target.value)} className={field} /></label>
        <label className="flex flex-col gap-1 text-xs">Publicación hasta<input required type="date" min={from} disabled={busy} value={to} onChange={event => setTo(event.target.value)} className={field} /></label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={busy || !selected.length || Boolean(storageError)} className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-xs font-bold text-white disabled:opacity-40">{busy && <Loader2 className="h-4 w-4 animate-spin" />}{busy ? 'Consultando especies…' : `CONSULTAR SELECCIONADOS (${selected.length})`}</button>
        {busy && <button type="button" onClick={() => controller.current?.abort()} className={`${field} text-xs`}>Cancelar consulta</button>}
      </div>
      <p className="text-xs text-slate-500">Consulta manual. La bandeja y sus estados de lectura se guardan en este navegador y se incluyen en el respaldo JSON.</p>
    </form>
    {storageError && <p role="alert" className="text-sm text-rose-800">{storageError}</p>}
    <div role="status" aria-live="polite" className="space-y-2 text-xs">
      {message && <p className="rounded-lg bg-slate-100 p-3">{message}</p>}
      {outcomes.map(outcome => <p key={outcome.organismId} className={outcome.success ? 'text-emerald-800' : 'text-rose-800'}>{outcome.name}: {outcome.success ? `${outcome.records} registros · ${outcome.newAlerts} alertas nuevas` : outcome.error}</p>)}
    </div>
    <div className="flex flex-wrap gap-3">
      <label className="flex flex-col gap-1 text-xs">Estado de lectura<select value={filter} onChange={event => setFilter(event.target.value)} className={field}><option value="unread">Sin leer</option><option value="all">Todas</option><option value="read">Leídas</option></select></label>
      <label className="flex flex-col gap-1 text-xs">Microorganismo de la alerta<select value={species} onChange={event => setSpecies(event.target.value)} className={field}><option value="all">Todos</option>{microorganisms.filter(organism => alerts.alerts.some(alert => alert.organismIds.includes(organism.id))).map(organism => <option key={organism.id} value={organism.id}>{organism.scientificName}</option>)}</select></label>
    </div>
    {!visible.length && <p className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">No hay alertas para estos filtros. Sigue una especie y consulta sus publicaciones para detectar novedades.</p>}
    {visible.map(alert => <article key={alert.id} className={`space-y-3 rounded-xl border p-5 ${alert.readAt ? 'border-slate-200 bg-white' : 'border-cyan-300 bg-cyan-50/40'}`}>
      <span className="text-xs font-bold text-cyan-800">{alert.readAt ? 'Leída' : 'Nueva en tu seguimiento'} · Publicación científica · Pendiente de revisión</span>
      <h4 className="text-sm font-bold">{alert.title}</h4>
      <p className="text-xs text-slate-600">PMID {alert.pmid}{alert.doi && ` · DOI ${alert.doi}`} · Publicación: {alert.publicationDate ?? 'No informada por la fuente'}</p>
      {alert.electronicPublicationDate && <p className="text-xs text-slate-600">Publicación electrónica: {alert.electronicPublicationDate}</p>}
      <p className="text-xs text-slate-500">Recuperada: {liveTime(alert.retrievedAt)} · Detectada: {liveTime(alert.detectedAt)} (Guatemala)</p>
      <div className="flex flex-wrap gap-3 text-xs">
        <a href={alert.pubmedUrl} target="_blank" rel="noopener noreferrer" className="text-sky-800 underline">Abrir publicación en PubMed</a>
        <button type="button" disabled={Boolean(storageError)} onClick={() => markAlertsRead([alert.id], !alert.readAt)} className="text-slate-700 underline">{alert.readAt ? 'Marcar sin leer' : 'Marcar como leída'}</button>
        {microorganisms.filter(organism => alert.organismIds.includes(organism.id)).map(organism => <button key={organism.id} type="button" onClick={() => onSelectOrganism(organism)} className="italic text-sky-800 underline">Abrir ficha: {organism.scientificName}</button>)}
      </div>
      <details className="text-xs text-slate-600"><summary className="cursor-pointer">Trazabilidad y vínculo preliminar</summary><p className="mt-2 break-words">{alert.query}</p><a href={alert.sourceSearchUrl} target="_blank" rel="noopener noreferrer" className="underline">Abrir búsqueda original con sus fechas</a><p className="mt-2">Vinculada por la especie consultada o por menciones textuales. Revisa el artículo antes de incorporar su contenido a la ficha. La fecha de edición de revista puede ser posterior a la publicación electrónica; se conserva lo informado por PubMed.</p></details>
    </article>)}
    <p className="text-xs text-slate-500">Se conservan hasta 100 alertas y 1000 identificadores de deduplicación. «Nueva» significa ausente del registro local conservado; no implica que se haya publicado hoy. Las consultas previas a Fase 4B no generan alertas retroactivas.</p>
  </div>;
}
