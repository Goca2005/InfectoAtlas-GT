import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { LiveArticle } from '../types/live';
import type { Microorganism } from '../types/microorganism';

export const liveTime = (value: string) => new Intl.DateTimeFormat('es-GT', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Guatemala' }).format(new Date(value));

export function LiveArticleCard({ article, microorganisms, onSelectOrganism }: {
  article: LiveArticle;
  microorganisms: Microorganism[];
  onSelectOrganism?: (organism: Microorganism) => void;
}) {
  const related = microorganisms.filter(organism => article.relatedOrganismIds?.includes(organism.id));
  return <article className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 text-sm">
    <div className="flex flex-wrap gap-2 text-[11px]">
      <span className="rounded bg-cyan-50 px-2 py-1 text-cyan-800">Publicación científica recuperada</span>
      <span className="rounded bg-amber-50 px-2 py-1 text-amber-800">Pendiente de revisión clínica</span>
      {article.publicationTypes.map(type => <span key={type} className="rounded bg-slate-100 px-2 py-1 text-slate-600">{type}</span>)}
    </div>
    <h3 className="font-bold text-slate-900 leading-snug"><a href={article.pubmedUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sky-700">{article.title} <ExternalLink className="inline h-3.5 w-3.5" /></a></h3>
    <p className="text-xs text-slate-600">{article.authors.length ? article.authors.join(', ') : 'Autores no informados por la fuente'}</p>
    <dl className="grid gap-2 sm:grid-cols-2 text-xs text-slate-600">
      <div><dt className="font-semibold">Revista</dt><dd>{article.journal ?? 'No informada'}</dd></div>
      <div><dt className="font-semibold">Publicación (fecha original)</dt><dd>{article.publicationDate ?? 'No informada'}{article.electronicPublicationDate && <span> · Electrónica: {article.electronicPublicationDate}</span>}</dd></div>
      <div><dt className="font-semibold">Identificadores</dt><dd>PMID: {article.pmid}{article.doi && <> · <a href={`https://doi.org/${encodeURIComponent(article.doi.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, ''))}`} target="_blank" rel="noopener noreferrer" className="text-sky-700 underline">DOI: {article.doi}</a></>}</dd></div>
      <div><dt className="font-semibold">Recuperado de PubMed</dt><dd>{liveTime(article.retrievedAt)} (Guatemala)</dd></div>
    </dl>
    {article.abstracts.length ? <details className="rounded-lg bg-slate-50 p-3">
      <summary className="cursor-pointer text-xs font-semibold text-sky-800">Resumen original · idioma de la fuente</summary>
      <div className="mt-3 space-y-2 text-xs leading-relaxed">{article.abstracts.map((section, index) => <p key={index}>{section.label && <strong>{section.label}: </strong>}{section.text}</p>)}</div>
    </details> : <p className="text-xs text-slate-500">Resumen no disponible en el registro de PubMed.</p>}
    {related.length > 0 && <div className="border-t border-slate-100 pt-3 text-xs space-y-2">
      <p className="text-slate-500">Vínculo preliminar por consulta o mención del nombre científico; requiere revisión.</p>
      <div className="flex flex-wrap gap-2">{related.map(organism => <button key={organism.id} type="button" disabled={!onSelectOrganism} onClick={() => onSelectOrganism?.(organism)} className="rounded border border-sky-200 px-2 py-1 text-sky-800 hover:bg-sky-50 disabled:cursor-default">Ficha: {organism.scientificName}</button>)}</div>
    </div>}
  </article>;
}
