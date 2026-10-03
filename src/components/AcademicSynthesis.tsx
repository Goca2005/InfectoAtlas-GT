import { BookOpen, ExternalLink, Images } from 'lucide-react';
import { academicSources, type AcademicBlock, type AcademicProfile } from '../services/academicContent';
import type { Microorganism } from '../types/microorganism';
import { safeHttpsUrl, ImageCard } from './SourceImageGallery';
import { CdcAttribution } from './CdcAttribution';

export function AcademicSynthesis({ blocks }: { blocks: AcademicBlock[] }) {
  if (!blocks.length) return null;
  return <div className="space-y-3" aria-label="Síntesis académica con fuentes">
    {blocks.map((block,i) => <article key={`${block.section}-${i}`} className="rounded-xl border border-sky-100 bg-white p-5 shadow-xs">
      <h4 className="font-semibold text-slate-900">{block.title}</h4>
      {block.paragraphs.map((text,j) => <p key={j} className="mt-2 text-sm leading-7 text-slate-700">{text}</p>)}
      <footer className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
        {academicSources(block.sourceIds).map(source => safeHttpsUrl(source.url) && <a key={source.id} href={safeHttpsUrl(source.url)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-sky-50 px-2.5 py-1.5 text-xs leading-5 text-sky-800 hover:bg-sky-100"><BookOpen size={12} className="shrink-0"/>{source.issuer} · {source.title}<ExternalLink size={11} className="shrink-0"/></a>)}
      </footer>
    </article>)}
  </div>;
}
export function AcademicBibliography({ profile }: { profile: AcademicProfile }) {
  return <section className="space-y-3" aria-label="Fuentes de la síntesis">
    <h4 className="text-sm font-semibold text-slate-900">Fuentes de esta ampliación</h4>
    {academicSources(profile.sourceIds).map(s => <article key={s.id} className="rounded-xl border border-sky-100 bg-white p-4 text-sm">
      <p className="text-xs font-semibold text-sky-800">{s.issuer} · {s.kind}</p>
      <a href={safeHttpsUrl(s.url)} target="_blank" rel="noopener noreferrer" className="mt-1 block font-semibold text-slate-900 underline">{s.title}</a>
      <p className="mt-2 text-xs text-slate-500">{s.published && `Fecha de la fuente: ${s.published} · `}Consulta editorial: {s.consultedAt}</p>
    </article>)}
  </section>;
}
export function AcademicImagePreview({ images, onAll }: { images: Microorganism['imagery']; onAll: () => void }) {
  if (!images.length) return null;
  return <section className="space-y-3" aria-label="Imágenes vinculadas al apartado">
    <div className="flex flex-wrap items-center justify-between gap-2"><h4 className="flex items-center gap-2 text-sm font-semibold text-slate-800"><Images size={16}/>Evidencia visual documentada</h4><button onClick={onAll} className="text-xs font-semibold text-sky-800 underline">Abrir galería completa</button></div>
    <div className="grid gap-3 xl:grid-cols-2">{images.slice(0,2).map((image,i) => <ImageCard key={`${image.imageId}-${i}`} image={image}/>)}</div>
    <CdcAttribution/>
  </section>;
}
