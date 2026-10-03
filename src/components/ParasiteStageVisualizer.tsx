import React, { useState } from 'react';
import { ParasiticStage } from '../types/microorganism';
import { Microscope, CheckCircle2, AlertCircle, Info, ShieldAlert } from 'lucide-react';

interface ParasiteStageVisualizerProps {
  stages: ParasiticStage[];
  parasiteName: string;
}

export const ParasiteStageVisualizer: React.FC<ParasiteStageVisualizerProps> = ({
  stages,
  parasiteName,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<string>(stages[0]?.id ?? '');

  if (!stages || stages.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center text-xs text-slate-500">
        No se han definido estadios parasitológicos para este taxón (organismo no parasitario o estadio único).
      </div>
    );
  }

  const selectedStage = stages.find(s => s.id === selectedStageId) ?? stages[0];

  return (
    <div className="space-y-4">
      {/* Introduction note */}
      <div className="flex items-start justify-between border-b border-slate-200 pb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-900 tracking-tight">
            Estadios Biológicos y Morfología Diagnóstica
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Diferenciación biológica de estadios en el ciclo de <span className="italic">{parasiteName}</span>.
          </p>
        </div>
        <div className="text-xs font-mono text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
          {stages.length} Estadios Catalogados
        </div>
      </div>

      {/* Stage Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-lg">
        {stages.map((st) => {
          const isSelected = st.id === selectedStage.id;
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => setSelectedStageId(st.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                isSelected
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>{st.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Stage Detail Panel */}
      <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
        {/* Header of selected stage with role highlights */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-800">
              Tipo: {selectedStage.stageType}
            </span>
            <h5 className="text-base font-bold text-slate-900">
              {selectedStage.name}
            </h5>
          </div>

          {/* Biological role indicator */}
          <div className="flex items-center gap-2 text-xs">
            {selectedStage.isInfectiveStage && (
              <span className="inline-flex items-center gap-1 font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                <AlertCircle className="h-3 w-3" />
                Estadio Infectante
              </span>
            )}
            {selectedStage.isDiagnosticStage && (
              <span className="inline-flex items-center gap-1 font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                <CheckCircle2 className="h-3 w-3" />
                Estadio Diagnóstico
              </span>
            )}
          </div>
        </div>

        {/* Biological role description */}
        <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded border border-slate-100">
          <span className="font-semibold text-slate-900">Función Biológica: </span>
          {selectedStage.biologicalRole}
        </div>

        {/* 2-Column Grid: Morphology & Diagnostic Identification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Column 1: Morphology & Dimensions */}
          <div className="space-y-3 rounded-md border border-slate-100 p-3.5 bg-white">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Microscope className="h-4 w-4 text-sky-700" />
              <span>Morfología Microscópica</span>
            </div>
            
            <p className="text-slate-600 leading-relaxed">
              {selectedStage.morphologyDescription}
            </p>

            {selectedStage.keyDimensions && (
              <div className="text-[11px] text-slate-500 font-mono bg-slate-50 p-2 rounded">
                <span className="font-bold text-slate-700">Dimensiones típicas: </span>
                {selectedStage.keyDimensions}
              </div>
            )}

            <div>
              <div className="font-semibold text-slate-800 mb-1.5">
                Criterios Diferenciales Clave:
              </div>
              <ul className="space-y-1 list-disc list-inside text-slate-600">
                {selectedStage.differentialCharacteristics.map((char, i) => (
                  <li key={i}>{char}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Specimen & Lab Identification */}
          <div className="space-y-3 rounded-md border border-slate-100 p-3.5 bg-white">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Info className="h-4 w-4 text-emerald-700" />
              <span>Identificación en el Laboratorio Clínico</span>
            </div>

            <div>
              <span className="text-slate-500 block">Muestra Clínica Principal:</span>
              <span className="font-semibold text-slate-900 block mt-0.5">
                {selectedStage.primaryClinicalSpecimen}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block">Método de Observación:</span>
              <span className="font-semibold text-slate-900 block mt-0.5">
                {selectedStage.identificationMethod}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
              <span className="font-semibold text-slate-700">Modalidad visual: </span>
              {selectedStage.visualRepresentationType === 'microfotografia_real' 
                ? 'Microfotografía óptica verificada' 
                : 'Esquema morfológico analítico'}
            </div>

            {/* "¿Qué estoy viendo en el microscopio?" teaser button */}
            <div className="mt-3 rounded bg-sky-50/70 p-2.5 border border-sky-100 text-[11px] text-sky-900">
              <span className="font-bold block">¿Qué estoy viendo en el microscopio?</span>
              <span className="text-sky-700 block mt-0.5">
                En frotis y frentes clínicos, observe detenidamente la relación núcleo/citoplasma, la ausencia o presencia de inclusiones y la refringencia de la pared.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
