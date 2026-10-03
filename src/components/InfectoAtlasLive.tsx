import React, { useState } from 'react';
import { Radio, ExternalLink } from 'lucide-react';
import type { Microorganism } from '../types/microorganism';
import { LiveSearchPanel } from './LiveSearchPanel';
import { LiveArticleCard, liveTime } from './LiveArticleCard';
import { useLiveState } from './useLiveState';
import { LiveAlertsPanel } from './LiveAlertsPanel';

const sections = [
  ['home', 'Inicio LIVE'], ['science', 'Actualizaciones científicas'], ['guatemala', 'Guatemala Sentinel'],
  ['global', 'Global Watch'], ['amr', 'AMR Radar'], ['treatment', 'Treatment Tracker'],
  ['alerts', 'Alertas científicas'], ['followed', 'Mis microorganismos seguidos'], ['history', 'Historial de consultas'],
] as const;
type Section = typeof sections[number][0];

export function InfectoAtlasLive({ microorganisms, onSelectOrganism }: {
  microorganisms: Microorganism[];
  onSelectOrganism: (organism: Microorganism) => void;
}) {
  const [section, setSection] = useState<Section>('home');
  const { state, alerts, storageError, toggleFollow } = useLiveState();
  const unread = alerts.alerts.filter(alert => !alert.readAt).length;
  const followed = microorganisms.filter(organism => state.followedIds.includes(organism.id));
  const followedArticles = state.articles.filter(article => article.relatedOrganismIds?.some(id => state.followedIds.includes(id)));
  return <div className="space-y-5">
    <div className="rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
      <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-300"><Radio className="h-4 w-4" /> FASE 4B · PUBMED Y ALERTAS CIENTÍFICAS</div>
      <h2 className="mt-3 text-3xl font-black">InfectoAtlas LIVE</h2>
      <p className="mt-2 text-sm text-slate-300">Observatorio científico y epidemiológico · Guatemala primero</p>
      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-slate-300">Consulta literatura real y sigue los microorganismos que estudias. La bandeja conserva las novedades científicas detectadas en tus consultas. Las fuentes epidemiológicas y la vigilancia programada están en desarrollo.</p>
    </div>
    <nav aria-label="Secciones de InfectoAtlas LIVE" className="flex flex-wrap gap-2">
      {sections.map(([id, label]) => <button key={id} type="button" aria-current={section === id ? 'page' : undefined} onClick={() => setSection(id)} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${section === id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-cyan-500'}`}>{label}{id === 'alerts' && unread > 0 && ` (${unread})`}</button>)}
    </nav>
    {storageError && <p role="alert" className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">{storageError}</p>}
    {(section === 'home' || section === 'science') && <LiveSearchPanel microorganisms={microorganisms} onSelectOrganism={onSelectOrganism} />}
    {section === 'alerts' && <LiveAlertsPanel microorganisms={microorganisms} onSelectOrganism={onSelectOrganism} />}
    {section === 'followed' && <div className="space-y-4">
      <h3 className="text-lg font-bold">Mis microorganismos seguidos</h3>
      <p className="text-xs text-slate-500">Seguimiento guardado en este navegador e incluido en el respaldo. Abre la ficha para consultar nuevas publicaciones manualmente.</p>
      {!followed.length && <p className="rounded-xl border border-dashed border-slate-300 p-6 text-sm">Abre una ficha y elige «Seguir microorganismo» en Actualizaciones científicas.</p>}
      {followed.map(organism => <div key={organism.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <button type="button" onClick={() => onSelectOrganism(organism)} className="text-sm font-bold italic text-sky-800">{organism.scientificName} · Abrir ficha</button>
        <button type="button" onClick={() => toggleFollow(organism.id)} className="text-xs text-slate-500 underline">Dejar de seguir</button>
      </div>)}
      <h4 className="text-sm font-bold">Literatura ya recuperada para tus especies</h4>
      {!followedArticles.length && <p className="text-xs text-slate-500">Aún no hay publicaciones recuperadas vinculadas a las especies seguidas.</p>}
      {followedArticles.map(article => <LiveArticleCard key={article.pmid} article={article} microorganisms={microorganisms} onSelectOrganism={onSelectOrganism} />)}
    </div>}
    {section === 'history' && <div className="space-y-4">
      <h3 className="text-lg font-bold">Historial de consultas</h3>
      <p className="text-xs text-slate-500">Últimos 50 intentos y hasta 100 publicaciones en este navegador. «Nuevo» significa ausente del historial local conservado. Este historial está incluido en Exportar Respaldo JSON.</p>
      {!state.history.length && <p className="rounded-xl border border-dashed border-slate-300 p-6 text-sm">Aún no hay consultas registradas.</p>}
      {state.history.map(entry => <article key={entry.id} className="rounded-xl border border-slate-200 bg-white p-4 text-xs space-y-2">
        <p className={`font-bold ${entry.success ? 'text-emerald-700' : 'text-rose-700'}`}>{entry.success ? 'Consulta completada' : 'Consulta fallida'} · {liveTime(entry.attemptedAt)} (Guatemala)</p>
        <p className="break-words text-slate-700">{entry.term}</p>
        {entry.success ? <p>{entry.records} registros recuperados · {entry.newRecords} nuevos · {entry.cacheHit ? 'caché temporal' : 'consulta a NCBI'}{entry.retrievedAt && ` · Fuente recuperada: ${liveTime(entry.retrievedAt)}`}</p> : <p className="text-rose-700">{entry.error}</p>}
      </article>)}
    </div>}
    {['guatemala', 'global', 'amr', 'treatment'].includes(section) && <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
      <span className="rounded bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800">En desarrollo · sin conexión automática</span>
      <h3 className="text-xl font-bold">{sections.find(([id]) => id === section)?.[1]}</h3>
      <p className="text-sm text-slate-600">{section === 'guatemala' ? 'La incorporación de boletines del MSPAS requiere validar cada documento, su fecha y el territorio al que corresponde.' : section === 'global' ? 'OMS y OPS se incorporarán después de validar un método estable de acceso y la trazabilidad de cada comunicado.' : section === 'amr' ? 'El radar de resistencia antimicrobiana requiere fuentes revisadas, especie, territorio y métodos comparables.' : 'El seguimiento terapéutico requiere revisión de guías y aprobación clínica antes de cambiar una ficha.'}</p>
      <p className="text-xs text-slate-500">Puedes buscar estos temas en PubMed desde Actualizaciones científicas. Un artículo reciente requiere evaluación antes de considerarse una recomendación terapéutica.</p>
      {section === 'guatemala' && <a href="https://www.mspas.gob.gt/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-sky-700 underline">Portal oficial MSPAS <ExternalLink className="h-3 w-3" /></a>}
      {section === 'global' && <div className="flex flex-wrap gap-4 text-sm text-sky-700 underline">
        <a href="https://www.who.int/emergencies/disease-outbreak-news" target="_blank" rel="noopener noreferrer">OMS · Disease Outbreak News</a>
        <a href="https://www.paho.org/en/epidemiological-alerts-and-updates" target="_blank" rel="noopener noreferrer">OPS · Alertas y actualizaciones</a>
      </div>}
    </div>}
  </div>;
}
