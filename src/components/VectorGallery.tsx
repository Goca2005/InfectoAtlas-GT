import React, { useState } from 'react';
import { MEDICAL_VECTORS } from '../data/vectors';
import { MedicalVector } from '../types/vector';
import { Bug, MapPin, ShieldAlert, CheckCircle, Info } from 'lucide-react';

interface VectorGalleryProps {
  onSelectPathogen?: (pathogenId: string) => void;
}

export const VectorGallery: React.FC<VectorGalleryProps> = ({
  onSelectPathogen,
}) => {
  const [selectedVectorId, setSelectedVectorId] = useState<string>(MEDICAL_VECTORS[0]?.id ?? '');

  const selectedVector = MEDICAL_VECTORS.find(v => v.id === selectedVectorId) ?? MEDICAL_VECTORS[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-sky-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
          <Bug className="h-4 w-4" />
          <span>Entomología Médica y Transmisión Vectorial</span>
        </div>
        <h2 className="mt-1 text-2xl font-black text-slate-900 tracking-tight">
          Vectores Artrópodos de Importancia en Guatemala
        </h2>
        <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed">
          Catálogo bioecológico de mosquitos culícidos y triatóminos responsables de la transmisión de arbovirosis, malaria y enfermedad de Chagas en Centroamérica.
        </p>
      </div>

      {/* Main Grid Layout: Vector Selector + Vector Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Vector Cards */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Vectores Biológicos Clave:
          </div>

          <div className="space-y-2">
            {MEDICAL_VECTORS.map((vec) => {
              const isSelected = vec.id === selectedVector.id;
              return (
                <button
                  key={vec.id}
                  type="button"
                  onClick={() => setSelectedVectorId(vec.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-sky-600 bg-sky-50/80 shadow-xs ring-1 ring-sky-600'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-sky-800 uppercase">
                    <span>{vec.family}</span>
                    <span className="text-slate-400 font-normal">{vec.orderTaxon}</span>
                  </div>
                  <div className="font-extrabold text-slate-900 text-sm italic mt-1">
                    {vec.scientificName}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {vec.commonName}
                  </div>
                  <div className="mt-2 text-[11px] text-slate-600 border-t border-slate-100 pt-2">
                    <span className="font-semibold text-slate-700">Patógenos: </span>
                    {vec.transmittedPathogens.map(p => p.disease).join(', ')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: In-Depth Vector Monograph */}
        <div className="lg:col-span-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-6 text-xs">
            
            {/* Vector Title Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                  {selectedVector.orderTaxon} · {selectedVector.family}
                </span>
                <h3 className="text-2xl font-black text-slate-900 italic">
                  {selectedVector.scientificName}
                </h3>
                <div className="text-sm text-slate-600 mt-0.5">
                  Nombre popular en Guatemala: <span className="font-semibold text-slate-800">{selectedVector.commonName}</span>
                </div>
              </div>

              <div className="rounded-lg bg-sky-50 border border-sky-100 p-2.5 text-right">
                <span className="text-slate-500 block text-[11px]">Límite altitudinal:</span>
                <span className="font-extrabold text-sky-900 font-mono text-xs">
                  Hasta {selectedVector.guatemalaDistribution.elevationLimitMeters} msnm
                </span>
              </div>
            </div>

            {/* Morphology & Identifying Features */}
            <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-4 space-y-1.5">
              <span className="font-bold text-slate-900 text-xs block">Morfología Diagnóstica de Campo:</span>
              <p className="text-slate-700 leading-relaxed">
                {selectedVector.morphologyHighlights}
              </p>
            </div>

            {/* Transmitted Diseases */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 block text-xs uppercase tracking-wide">
                Enfermedades y Patógenos que Transmite:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedVector.transmittedPathogens.map((tp, idx) => (
                  <div key={idx} className="rounded-md border border-slate-200 p-2.5 bg-white space-y-0.5">
                    <span className="font-bold text-slate-900 text-xs block">{tp.disease}</span>
                    <span className="text-slate-500 italic text-[11px] block">{tp.scientificName}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Biological Cycle & Behavior */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-200 p-3.5 space-y-1.5">
                <span className="font-bold text-slate-900 block">Ciclo Biológico:</span>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {selectedVector.biologicalCycle}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-3.5 space-y-1.5">
                <span className="font-bold text-slate-900 block">Hábitat & Comportamiento de Picadura:</span>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {selectedVector.habitatAndBehavior}
                </p>
              </div>
            </div>

            {/* Guatemala Distribution */}
            <div className="rounded-lg border border-sky-200 bg-sky-50/40 p-4 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-sky-950 text-xs">
                <MapPin className="h-4 w-4 text-sky-700" />
                <span>Distribución en Departamentos de Guatemala</span>
              </div>
              <div className="text-slate-700">
                <span className="font-semibold text-slate-800">Departamentos con mayor densidad: </span>
                {selectedVector.guatemalaDistribution.endemicDepartments.join(', ')}.
              </div>
              <div className="text-[11px] text-slate-500 pt-1 border-t border-sky-100">
                <span className="font-semibold text-slate-700">Pico estacional: </span>
                {selectedVector.guatemalaDistribution.peakSeason}
              </div>
            </div>

            {/* Control & Vector Management */}
            <div className="space-y-1.5">
              <span className="font-bold text-slate-900 block text-xs">
                Medidas de Control Vectorial y Manejo Integrado (MSPAS):
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                {selectedVector.controlMeasures.map((cm, i) => (
                  <li key={i}>{cm}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
