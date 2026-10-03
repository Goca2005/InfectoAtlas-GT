import React, { useState } from 'react';
import { AtlasParasiteStage } from '../types/microscopyAtlas';
import { MicroscopicStageVisualizer } from './MicroscopicStageVisualizer';
import { 
  X, 
  Microscope, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  ExternalLink, 
  Layers, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  FileText,
  GitCompare,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Microorganism } from '../types/microorganism';

interface MicroscopicStageDetailModalProps {
  stage: AtlasParasiteStage | null;
  onClose: () => void;
  onOpenMicroorganismDetail?: (organismId: string) => void;
  onOpenComparatorWithStage?: (stage: AtlasParasiteStage) => void;
  microorganisms?: Microorganism[];
}

export const MicroscopicStageDetailModal: React.FC<MicroscopicStageDetailModalProps> = ({
  stage,
  onClose,
  onOpenMicroorganismDetail,
  onOpenComparatorWithStage,
  microorganisms = []
}) => {
  const [activeObjective, setActiveObjective] = useState<'10x' | '40x' | '100x'>('100x');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  if (!stage) return null;

  // Find linked microorganism from catalog if present
  const linkedOrganism = microorganisms.find(m => m.id === stage.microorganismId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80 shrink-0">
          <div className="space-y-1 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100/70 px-2 py-0.5 rounded">
                {stage.parasiteGroup.toUpperCase()} {stage.specificTaxonDetail ? `• ${stage.specificTaxonDetail}` : ''}
              </span>
              <span className="text-[11px] font-medium text-slate-500">
                Estadio: <strong className="text-slate-800 capitalize">{stage.stageType}</strong>
              </span>
              {stage.isDiagnosticStage && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  Estadio Diagnóstico
                </span>
              )}
              {stage.isInfectiveStage && (
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                  Estadio Infectante
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight italic">
              {stage.scientificName}
            </h3>
            <p className="text-sm font-semibold text-slate-700">
              {stage.stageName} {stage.commonName ? `(${stage.commonName})` : ''}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            title="Cerrar ventana"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Top Row: Microscope Field & Technical Laboratory Specs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left: Microscope Virtual Eyepiece */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800 text-center shadow-inner">
              <div className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold mb-2 flex items-center gap-1.5">
                <Microscope className="h-3.5 w-3.5" />
                <span>Simulador de Campo Óptico</span>
              </div>

              {/* Eyepiece with dynamic zoom */}
              <div 
                className="transition-transform duration-300 ease-out"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <MicroscopicStageVisualizer stage={stage} size="lg" showAnnotations={false} />
              </div>

              {/* Magnification controls with explicit disclaimer */}
              <div className="mt-3 flex items-center justify-between w-full max-w-[240px] px-2 py-1 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400">Objetivo didáctico:</span>
                <div className="flex gap-1">
                  {(['10x', '40x', '100x'] as const).map((obj) => (
                    <button
                      key={obj}
                      type="button"
                      onClick={() => setActiveObjective(obj)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                        activeObjective === obj
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {obj}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zoom In / Out Buttons */}
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.max(0.85, prev - 0.15))}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Reducir zoom de pantalla"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <span className="text-[10px] font-mono text-slate-400 w-16 text-center">
                  Zoom: {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel(prev => Math.min(1.45, prev + 0.15))}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Aumentar zoom de pantalla"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-2 px-2 py-1 text-[9px] text-slate-400 border-t border-slate-800/80 leading-tight">
                ⚠️ <strong className="text-slate-300">Nota de rigor técnico:</strong> El visor presenta ilustraciones educativas vectoriales para reconocimiento morfológico. El zoom digital no es magnificación óptica física calibrada.
              </div>

              {stage.approximateDimensions && (
                <div className="mt-1 text-[10px] font-mono text-sky-300 font-semibold bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                  Dimensión documentada en literatura: {stage.approximateDimensions}
                </div>
              )}
            </div>

            {/* Right: Technical Specs Grid */}
            <div className="md:col-span-7 space-y-3.5">
              <div className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 space-y-2">
                <span className="font-bold text-slate-900 block text-xs uppercase tracking-wide">
                  Parámetros Técnicos de Laboratorio
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <span className="font-semibold text-slate-500 block text-[11px]">Muestra Clínica Primaria:</span>
                    <span className="font-bold text-slate-900">{stage.clinicalSpecimen}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block text-[11px]">Método Diagnóstico:</span>
                    <span className="font-bold text-slate-900">{stage.diagnosticMethod}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block text-[11px]">Tinción Recomendada:</span>
                    <span className="font-bold text-sky-800">{stage.stainUsed}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 block text-[11px]">Enfermedad Asociada:</span>
                    <span className="font-bold text-slate-900">{stage.associatedDisease}</span>
                  </div>
                </div>
              </div>

              {/* Biological Role */}
              <div className="p-3.5 rounded-lg border border-sky-100 bg-sky-50/40 space-y-1">
                <span className="font-bold text-sky-950 block text-[11px] uppercase tracking-wider">
                  Rol Biológico en el Ciclo Parasitario:
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {stage.biologicalRole}
                </p>
              </div>
            </div>

          </div>

          {/* Morphological Description & Microscopic Findings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Detailed Morphology */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                <FileText className="h-4 w-4 text-sky-700" />
                <span>Morfología Microscópica Detallada</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-xs">
                {stage.detailedMorphology}
              </p>
            </div>

            {/* What you see specifically under microscope checklist */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Qué se observa específicamente al microscopio</span>
              </div>
              <ul className="space-y-1.5 text-slate-700">
                {stage.specificMicroscopicFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span className="leading-snug">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Differential Characteristics & Pitfalls */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-amber-950 text-xs">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Criterios Diferenciales Indispensables y Riesgos de Confusión</span>
            </div>
            <ul className="space-y-1.5 text-slate-700">
              {stage.differentialCharacteristics.map((diff, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-amber-700 shrink-0">#{idx + 1}</span>
                  <span className="leading-relaxed font-medium">{diff}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Source Attribution & Scientific Reference */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-[11px] text-slate-600">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <ShieldCheck className="h-3.5 w-3.5 text-sky-700" />
                <span>Base Científica y Referencia de la Ilustración:</span>
              </div>
              <span className="font-semibold text-slate-700">
                {stage.microscopyImage?.sourceName ?? 'Biblioteca de Referencia CDC DPDx'}
              </span>
            </div>

            <div className="flex items-start gap-1.5 pt-1 text-slate-500">
              <BookOpen className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
              <span>
                <strong className="text-slate-700">Referencia bibliográfica: </strong>
                {stage.bibliographicReference}
              </span>
            </div>

            <div className="pt-1.5 border-t border-slate-200/80 text-[10px] text-slate-500 flex items-center justify-between">
              <span>Tipo de recurso: Ilustración morfológica vectorial con fines de docencia</span>
              <span className="font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                Referencia comprobable registrada
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-4 border-t border-slate-100 bg-slate-50 shrink-0">
          <div className="text-[11px] text-slate-500">
            Identificador único: <code className="font-mono text-slate-700">{stage.id}</code>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenComparatorWithStage && (
              <button
                type="button"
                onClick={() => onOpenComparatorWithStage(stage)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
              >
                <GitCompare className="h-3.5 w-3.5 text-sky-600" />
                <span>Comparar esta estructura</span>
              </button>
            )}

            {onOpenMicroorganismDetail && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenMicroorganismDetail(stage.microorganismId);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-700 text-xs font-bold text-white hover:bg-sky-800 transition-colors shadow-xs"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Ver Ficha Médica Completa</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-300 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
