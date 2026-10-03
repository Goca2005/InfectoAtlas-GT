import React from 'react';
import { Microorganism } from '../types/microorganism';
import { ChevronRight, Bookmark, BookmarkCheck, ArrowRightLeft } from 'lucide-react';

interface MicroorganismCardProps {
  organism: Microorganism;
  onSelect: (organism: Microorganism) => void;
  onToggleBookmark: (id: string) => void;
  isBookmarked: boolean;
  onAddToCompare: (organism: Microorganism) => void;
}

export const MicroorganismCard: React.FC<MicroorganismCardProps> = ({
  organism,
  onSelect,
  onToggleBookmark,
  isBookmarked,
  onAddToCompare,
}) => {
  // Category label styling
  const categoryLabels: Record<string, string> = {
    bacteria: 'Bacteria',
    virus: 'Virus',
    hongo: 'Hongo',
    parasito: organism.parasiteGroup ? `Parásito · ${organism.parasiteGroup}` : 'Parásito',
  };

  const primaryDisease = organism.associatedDiseases[0]?.name;
  const stageCount = organism.parasiticStages?.length ?? 0;

  return (
    <article 
      onClick={() => onSelect(organism)}
      tabIndex={0}
      aria-label={`Ver ficha de ${organism.scientificName}`}
      onKeyDown={e=>{if(e.target===e.currentTarget&&(e.key==='Enter'||e.key===' ')){e.preventDefault();onSelect(organism);}}}
      className="group relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-xs transition-all hover:border-sky-300 hover:shadow-md cursor-pointer"
    >
      <div>
        {/* Top quiet metadata line with typographic separators (anti-slop zero-pill) */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-sky-700">{categoryLabels[organism.category]}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{organism.taxonomy.family}</span>
            {organism.morphology.gramStain && organism.morphology.gramStain !== 'No aplica' && (
              <>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-600">{organism.morphology.gramStain}</span>
              </>
            )}
          </div>

          {/* Bookmark & compare actions */}
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => onAddToCompare(organism)}
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              title="Añadir a comparador"
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onToggleBookmark(organism.id)}
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-amber-600 transition-colors"
              title={isBookmarked ? 'Quitar de guardados' : 'Guardar en mis notas'}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-3.5 w-3.5 text-amber-600 fill-amber-600" />
              ) : (
                <Bookmark className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Title: Scientific name in italics */}
        <h3 className="mt-2 text-base font-bold text-slate-900 tracking-tight group-hover:text-sky-800 transition-colors">
          <span className="italic">{organism.scientificName}</span>
          {organism.commonName && (
            <span className="ml-2 text-xs font-normal text-slate-500 not-italic">
              ({organism.commonName})
            </span>
          )}
        </h3>

        {/* High-yield morphology & disease summary */}
        <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {organism.documentIndexed ? organism.documentPreview : organism.morphology.shape}
          {!organism.documentIndexed && organism.morphology.arrangement ? ` (${organism.morphology.arrangement})` : ''}
          {primaryDisease && <> Enfermedad clave: <span className="font-semibold text-slate-800">{primaryDisease}</span>.</>}
        </p>
        {!!organism.documentPageCount && <p className="mt-2 text-xs font-semibold text-sky-800">Tus documentos · {organism.documentPageCount} páginas</p>}

        {/* Transmission / Vector highlights */}
        <div className="mt-3 text-[11px] text-slate-500">
          <span className="font-medium text-slate-700">Transmisión: </span>
          <span>{organism.transmissionRoute[0] ?? 'Consulta la fuente documental'}</span>
          {organism.vector && (
            <span className="ml-1 text-amber-800 font-medium">
              [Vector: <span className="italic">{organism.vector}</span>]
            </span>
          )}
        </div>

        {/* Review status indicator */}
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px]">
          <span className={`h-1.5 w-1.5 rounded-full ${organism.reviewStatus === 'Fuentes verificadas' ? 'bg-emerald-600' : 'bg-amber-500'}`} />
          <span className={organism.reviewStatus === 'Fuentes verificadas' ? 'font-medium text-emerald-800' : 'text-slate-500'}>
            {organism.reviewStatus}
          </span>
        </div>

        {/* Parasitology stages teaser if applicable */}
        {stageCount > 0 && (
          <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50/70 rounded p-1.5 border border-emerald-100">
            <span className="font-semibold">{stageCount} estadios biológicos catalogados: </span>
            <span className="text-emerald-700">
              {organism.parasiticStages?.map(s => s.name).join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Card bottom: Guatemala relevance & view button */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="text-[11px] text-slate-500">
          <span className="font-medium text-slate-700">Situación GT: </span>
          <span className={organism.guatemalaRelevance.endemicStatus === 'Hiperendémico' || organism.guatemalaRelevance.priorityLevel === 'Alta' ? 'font-semibold text-rose-700' : 'text-slate-600'}>
            {organism.guatemalaRelevance.endemicStatus}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sky-700 font-medium text-xs group-hover:text-sky-900">
          <span>Ver Ficha</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </article>
  );
};
