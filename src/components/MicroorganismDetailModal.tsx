import { SourceImageGallery, safeHttpsUrl } from './SourceImageGallery';
import React, { useState } from 'react';
import { Microorganism } from '../types/microorganism';
import { 
  X, 
  BookOpen, 
  FileText, 
  MapPin, 
  Microscope, 
  Activity, 
  Pill, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  CheckCircle,
  ExternalLink,
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import { ParasiteStageVisualizer } from './ParasiteStageVisualizer';
import { LiveSearchPanel } from './LiveSearchPanel';

interface MicroorganismDetailModalProps {
  organism: Microorganism | null;
  onClose: () => void;
  onAddToCompare: (organism: Microorganism) => void;
}

export const MicroorganismDetailModal: React.FC<MicroorganismDetailModalProps> = ({
  organism,
  onClose,
  onAddToCompare,
}) => {
  const [viewMode, setViewMode] = useState<'resumen' | 'completa' | 'actualizaciones' | 'imagenes'>('resumen');

  if (!organism) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/90 px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="uppercase tracking-wider text-sky-700 font-bold">
                  {organism.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{organism.taxonomy.family}</span>
                {organism.parasiteGroup && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-semibold">{organism.parasiteGroup}</span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span className={organism.reviewStatus === 'Fuentes verificadas' ? 'text-emerald-700 font-semibold' : 'text-amber-700'}>
                  {organism.reviewStatus}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex flex-wrap items-baseline gap-2">
                <span className="italic">{organism.scientificName}</span>
                {organism.commonName && (
                  <span className="text-sm font-normal text-slate-500 not-italic">
                    ({organism.commonName})
                  </span>
                )}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher: Segmented Control */}
            <div className="flex flex-wrap items-center rounded-lg bg-slate-200/80 p-1 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('resumen')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-semibold transition-all ${
                  viewMode === 'resumen'
                    ? 'bg-white text-sky-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Resumen Rápido</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('completa')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1 font-semibold transition-all ${
                  viewMode === 'completa'
                    ? 'bg-white text-sky-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Ficha Completa</span>
              </button>
              <button type="button" onClick={() => setViewMode('imagenes')} className={`rounded-md px-3 py-1 font-semibold ${viewMode === 'imagenes' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}>Imágenes reales</button>
              <button type="button" onClick={() => setViewMode('actualizaciones')} className={`rounded-md px-3 py-1 font-semibold ${viewMode === 'actualizaciones' ? 'bg-white text-sky-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}>Actualizaciones científicas</button>
            </div>

            <button
              type="button"
              onClick={() => onAddToCompare(organism)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-200/60 hover:text-slate-900 transition-colors"
              title="Comparar con otro patógeno"
            >
              <ArrowRightLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-200/60 hover:text-slate-900 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-700">
          {organism.id.startsWith('reference-') && <p className="rounded-lg border border-sky-200 bg-sky-50 p-3">Ficha documentada de la ampliación 4C. Síntesis educativa pendiente de revisión clínica independiente. Tus fichas anteriores no se reemplazan al consultar esta versión.</p>}
          {viewMode === 'imagenes' && <SourceImageGallery key={organism.id} organism={organism} />}
          {viewMode === 'actualizaciones' && <LiveSearchPanel key={organism.id} microorganisms={[organism]} fixedOrganism={organism} />}

          {/* ========================================================= */}
          {/* MODE 1: RESUMEN RÁPIDO (High-yield board review summary) */}
          {/* ========================================================= */}
          {viewMode === 'resumen' && (
            <div className="space-y-6">
              {/* High-yield Grid: 4 Key Fact Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Morfología Clave</div>
                  <div className="mt-1 font-bold text-slate-900 text-xs">
                    {organism.morphology.shape}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-600">
                    {organism.morphology.gramStain ?? 'N/A'} · {organism.morphology.size}
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Transmisión & Vector</div>
                  <div className="mt-1 font-bold text-slate-900 text-xs">
                    {organism.transmissionRoute[0]}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-600">
                    {organism.vector ? `Vector: ${organism.vector}` : 'Sin vector biológico'}
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Diagnóstico Principal</div>
                  <div className="mt-1 font-bold text-slate-900 text-xs">
                    {organism.diagnosticMethods[0]?.method ?? 'Microbiológico'}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-600">
                    Rol: {organism.diagnosticMethods[0]?.standardRole ?? 'Confirmatorio'}
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-3.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Situación en Guatemala</div>
                  <div className="mt-1 font-bold text-rose-700 text-xs">
                    {organism.guatemalaRelevance.endemicStatus}
                  </div>
                  <div className="mt-0.5 text-[11px] text-slate-600">
                    Prioridad: {organism.guatemalaRelevance.priorityLevel}
                  </div>
                </div>
              </div>

              {/* Core Clinical Pathology & Treatment Synopsis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Clinical Picture */}
                <div className="rounded-lg border border-slate-200 p-4 space-y-3 bg-white">
                  <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-100 pb-2">
                    <Activity className="h-4 w-4 text-sky-700" />
                    <span>Cuadro Clínico Clave</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">Enfermedades asociadas:</div>
                    <ul className="mt-1 space-y-1 text-xs text-slate-600 list-disc list-inside">
                      {organism.associatedDiseases.map((d, i) => (
                        <li key={i}>
                          <span className="font-medium text-slate-800">{d.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="text-xs font-semibold text-slate-800">Signos y síntomas cardinales:</div>
                    <div className="mt-1 flex flex-wrap gap-1 text-xs text-slate-600">
                      {organism.signsAndSymptoms.map((s, i) => (
                        <span key={i} className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Treatment First Line */}
                <div className="rounded-lg border border-slate-200 p-4 space-y-3 bg-white">
                  <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-100 pb-2">
                    <Pill className="h-4 w-4 text-emerald-700" />
                    <span>Tratamiento de 1ª Línea</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {organism.treatment.firstLine.map((line, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-100">
                    <span className="font-semibold">Nota médica: </span>
                    {organism.treatment.disclaimer}
                  </div>
                </div>
              </div>

              {/* Parasitic Stages Preview in Resumen Mode if exists */}
              {organism.parasiticStages && organism.parasiticStages.length > 0 && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 font-bold text-emerald-900 text-xs uppercase tracking-wide">
                      <Layers className="h-4 w-4 text-emerald-700" />
                      <span>Estadios Parasitológicos Clínicos</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setViewMode('completa')}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold underline"
                    >
                      Explorar estadios en Ficha Completa →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {organism.parasiticStages.map((st) => (
                      <div key={st.id} className="bg-white p-2.5 rounded border border-emerald-100 text-slate-800">
                        <div className="font-bold text-slate-900">{st.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {st.isInfectiveStage ? 'Infectante' : ''}
                          {st.isInfectiveStage && st.isDiagnosticStage ? ' / ' : ''}
                          {st.isDiagnosticStage ? 'Diagnóstico' : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* MODE 2: FICHA COMPLETA (Comprehensive Monograph)          */}
          {/* ========================================================= */}
          {viewMode === 'completa' && (
            <div className="space-y-8">
              {/* Section 1: Taxonomy & Morphology */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Microscope className="h-4 w-4 text-sky-700" />
                  <span>1. Clasificación Taxonómica y Morfología</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3.5 space-y-1.5">
                    <div className="font-bold text-slate-800 mb-1">Jerarquía Taxonómica:</div>
                    <div className="grid grid-cols-2 gap-1 text-slate-600">
                      <div><span className="text-slate-400">Dominio:</span> {organism.taxonomy.domain ?? 'Eukaryota'}</div>
                      <div><span className="text-slate-400">Phylum:</span> {organism.taxonomy.phylum ?? 'N/A'}</div>
                      <div><span className="text-slate-400">Familia:</span> {organism.taxonomy.family}</div>
                      <div><span className="text-slate-400">Género:</span> <span className="italic">{organism.taxonomy.genus}</span></div>
                      <div><span className="text-slate-400">Especie:</span> <span className="italic">{organism.taxonomy.species}</span></div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3.5 space-y-1.5">
                    <div className="font-bold text-slate-800 mb-1">Morfología & Estructura:</div>
                    <div className="text-slate-600">
                      <span className="font-medium text-slate-700">Forma y tamaño:</span> {organism.morphology.shape} ({organism.morphology.size})
                    </div>
                    {organism.morphology.arrangement && (
                      <div className="text-slate-600">
                        <span className="font-medium text-slate-700">Agrupación:</span> {organism.morphology.arrangement}
                      </div>
                    )}
                    {organism.morphology.gramStain && (
                      <div className="text-slate-600">
                        <span className="font-medium text-slate-700">Tinción de Gram:</span> {organism.morphology.gramStain}
                      </div>
                    )}
                  </div>
                </div>

                {organism.morphology.specialStructures.length > 0 && (
                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded">
                    <span className="font-semibold text-slate-800">Estructuras especiales: </span>
                    {organism.morphology.specialStructures.join(' · ')}
                  </div>
                )}
              </section>

              {/* Section 2: Microbiology & Virulence Factors */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Activity className="h-4 w-4 text-sky-700" />
                  <span>2. Factores de Virulencia y Patogenia</span>
                </div>

                <div className="space-y-2">
                  {organism.virulenceFactors.map((vf, idx) => (
                    <div key={idx} className="rounded-lg border border-slate-100 p-3 bg-white text-xs">
                      <div className="font-bold text-slate-900">{vf.name}</div>
                      <p className="mt-0.5 text-slate-600 leading-relaxed">{vf.mechanism}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3: PARASITOLOGY STAGES (Special requirement for protozoa & helminths) */}
              {organism.parasiticStages && organism.parasiticStages.length > 0 && (
                <section className="rounded-xl border border-emerald-200 bg-emerald-50/20 p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-emerald-200 pb-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
                    <Layers className="h-4 w-4 text-emerald-700" />
                    <span>3. Arquitectura de Estadios Parasitarios ({organism.parasiteGroup?.toUpperCase()})</span>
                  </div>
                  <ParasiteStageVisualizer stages={organism.parasiticStages} parasiteName={organism.scientificName} />
                </section>
              )}

              {/* Section 4: Clinical Presentation & Associated Diseases */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Activity className="h-4 w-4 text-sky-700" />
                  <span>4. Cuadro Clínico y Complicaciones</span>
                </div>

                <div className="space-y-3">
                  {organism.associatedDiseases.map((dis, idx) => (
                    <div key={idx} className="rounded-lg border border-slate-200 p-4 bg-white text-xs space-y-2">
                      <div className="flex items-baseline justify-between">
                        <h4 className="font-bold text-slate-900 text-sm">{dis.name}</h4>
                        {dis.typicalIncubation && (
                          <span className="text-[11px] text-slate-500 font-mono">
                            Incubación: {dis.typicalIncubation}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 leading-relaxed">{dis.description}</p>
                      <div>
                        <span className="font-semibold text-slate-700">Presentación clínica típica: </span>
                        <span className="text-slate-600">{dis.clinicalPresentation.join('; ')}.</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-3">
                  <div className="p-3 bg-slate-50 rounded border border-slate-100">
                    <span className="font-bold text-slate-800 block mb-1">Muestras Clínicas de Elección:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                      {organism.clinicalSpecimens.map((spec, i) => (
                        <li key={i}>{spec}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-rose-50/50 rounded border border-rose-100">
                    <span className="font-bold text-rose-900 block mb-1">Complicaciones Potenciales:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-rose-800">
                      {organism.complications.map((comp, i) => (
                        <li key={i}>{comp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 5: Diagnostic Methods */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Microscope className="h-4 w-4 text-sky-700" />
                  <span>5. Métodos Diagnósticos y Criterios de Laboratorio</span>
                </div>

                <div className="space-y-2 text-xs">
                  {organism.diagnosticMethods.map((dm, idx) => (
                    <div key={idx} className="rounded-lg border border-slate-200 p-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="font-bold text-slate-900">{dm.method}</div>
                        <div className="text-slate-600 mt-0.5">{dm.keyFindings}</div>
                      </div>
                      <span className="shrink-0 text-[11px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-100 self-start sm:self-center">
                        {dm.standardRole}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 6: Treatment & Prevention */}
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Pill className="h-4 w-4 text-sky-700" />
                  <span>6. Tratamiento Antimicrobiano y Prevención</span>
                </div>

                <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3.5 text-xs text-amber-900">
                  <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-950">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span>Advertencia Clínica y Contexto Guatemalteco</span>
                  </div>
                  <p>{organism.treatment.disclaimer}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-2">
                    <span className="font-bold text-slate-900 block">Esquemas de Primera Línea:</span>
                    <ul className="space-y-1 list-disc list-inside text-slate-700">
                      {organism.treatment.firstLine.map((fl, i) => (
                        <li key={i}>{fl}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-2">
                    <span className="font-bold text-slate-900 block">Alternativas Clínicas:</span>
                    <ul className="space-y-1 list-disc list-inside text-slate-700">
                      {organism.treatment.alternatives.map((alt, i) => (
                        <li key={i}>{alt}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {organism.treatment.resistanceNotes && (
                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded border border-slate-100">
                    <span className="font-semibold text-slate-800">Notas sobre resistencia antimicrobiana: </span>
                    {organism.treatment.resistanceNotes}
                  </div>
                )}
              </section>

              {/* Section 7: Guatemala Epidemiological Relevance */}
              <section className="rounded-xl border border-sky-200 bg-sky-50/30 p-4 space-y-3 text-xs">
                <div className="flex items-center gap-2 border-b border-sky-200 pb-2 font-bold uppercase tracking-wider text-sky-950">
                  <MapPin className="h-4 w-4 text-sky-700" />
                  <span>7. Relevancia Epidemiológica en Guatemala</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 block">Estatus de Endemicidad:</span>
                    <span className="font-bold text-slate-900 text-sm">{organism.guatemalaRelevance.endemicStatus}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block">Departamentos de Mayor Notificación:</span>
                    <span className="font-semibold text-slate-800">
                      {organism.guatemalaRelevance.departmentsWithHighPrevalence.join(', ')}
                    </span>
                  </div>
                </div>

                <p className="text-slate-700 leading-relaxed pt-2 border-t border-sky-100">
                  {organism.guatemalaRelevance.officialNotes}
                </p>
              </section>

              {/* Section 8: Bibliography & Date */}
              <section className="border-t border-slate-200 pt-4 text-xs text-slate-500 space-y-2">
                <div className="font-bold text-slate-700 flex items-center justify-between">
                  <span>Fuentes Bibliográficas Consultadas:</span>
                  <span className="font-mono text-[11px] font-normal flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    Última revisión: {organism.lastReviewedDate}
                  </span>
                </div>
                <ul className="space-y-1.5 text-slate-600">
                  {organism.bibliography.map((b, i) => (
                    <li key={i} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-slate-100 pb-1">
                      <div>
                        <span className="text-sky-700 font-semibold">{b.source}</span>
                        <span className="mx-1.5 text-slate-300">·</span>
                        {safeHttpsUrl(b.url) ? <a href={safeHttpsUrl(b.url)} target="_blank" rel="noopener noreferrer" className="italic underline text-sky-700">{b.title} ({b.year})</a> : <span className="italic">{b.title} ({b.year})</span>}
                        {b.consultedAt && <span className="block">Fuente consultada: {b.consultedAt}</span>}
                      </div>
                      <span className={`text-[10px] shrink-0 font-medium px-2 py-0.5 rounded ${
                        b.status === 'Verificado' 
                          ? 'bg-emerald-50 text-emerald-800' 
                          : b.status === 'Fuentes pendientes de revisión'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                      }`}>
                        {b.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          )}

        </div>

        {/* Modal Bottom Sticky Controls */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-3 text-xs">
          <div className="text-slate-500 font-medium">
            Modo: <span className="font-bold text-slate-800 capitalize">{viewMode}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
