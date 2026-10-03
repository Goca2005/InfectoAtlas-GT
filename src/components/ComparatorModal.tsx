import React, { useState } from 'react';
import { Microorganism } from '../types/microorganism';
import { X, GitCompare, ArrowRightLeft, Check, AlertCircle } from 'lucide-react';

interface ComparatorModalProps {
  microorganisms: Microorganism[];
  initialOrganismA?: Microorganism | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ComparatorModal: React.FC<ComparatorModalProps> = ({
  microorganisms,
  initialOrganismA,
  isOpen,
  onClose,
}) => {
  const [organismAId, setOrganismAId] = useState<string>(
    initialOrganismA ? initialOrganismA.id : (microorganisms[0]?.id ?? '')
  );
  const [organismBId, setOrganismBId] = useState<string>(
    microorganisms.find(m => m.id !== (initialOrganismA?.id ?? microorganisms[0]?.id))?.id ?? (microorganisms[1]?.id ?? '')
  );

  if (!isOpen) return null;

  const orgA = microorganisms.find(m => m.id === organismAId) ?? microorganisms[0];
  const orgB = microorganisms.find(m => m.id === organismBId) ?? microorganisms[1] ?? microorganisms[0];

  const comparisonRows = [
    {
      title: 'Categoría & Taxonomía',
      renderA: () => (
        <div>
          <span className="font-bold uppercase text-[11px] text-sky-800">{orgA.category}</span>
          {orgA.parasiteGroup && <span className="text-[11px] text-slate-500"> ({orgA.parasiteGroup})</span>}
          <div className="text-slate-600 mt-0.5">Familia: {orgA.taxonomy.family}</div>
        </div>
      ),
      renderB: () => (
        <div>
          <span className="font-bold uppercase text-[11px] text-sky-800">{orgB.category}</span>
          {orgB.parasiteGroup && <span className="text-[11px] text-slate-500"> ({orgB.parasiteGroup})</span>}
          <div className="text-slate-600 mt-0.5">Familia: {orgB.taxonomy.family}</div>
        </div>
      )
    },
    {
      title: 'Morfología & Tinciones',
      renderA: () => (
        <div>
          <div className="font-medium text-slate-800">{orgA.morphology.shape}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Tinción: {orgA.morphology.gramStain ?? 'N/A'} · {orgA.morphology.size}
          </div>
        </div>
      ),
      renderB: () => (
        <div>
          <div className="font-medium text-slate-800">{orgB.morphology.shape}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Tinción: {orgB.morphology.gramStain ?? 'N/A'} · {orgB.morphology.size}
          </div>
        </div>
      )
    },
    {
      title: 'Transmisión & Vector',
      renderA: () => (
        <div>
          <div className="text-slate-800">{orgA.transmissionRoute[0]}</div>
          <div className="text-[11px] font-semibold text-amber-800 mt-0.5">
            {orgA.vector ? `Vector: ${orgA.vector}` : 'Sin vector biológico'}
          </div>
        </div>
      ),
      renderB: () => (
        <div>
          <div className="text-slate-800">{orgB.transmissionRoute[0]}</div>
          <div className="text-[11px] font-semibold text-amber-800 mt-0.5">
            {orgB.vector ? `Vector: ${orgB.vector}` : 'Sin vector biológico'}
          </div>
        </div>
      )
    },
    {
      title: 'Enfermedad Principal',
      renderA: () => (
        <div>
          <div className="font-bold text-slate-900">{orgA.associatedDiseases[0]?.name}</div>
          <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
            {orgA.associatedDiseases[0]?.description}
          </p>
        </div>
      ),
      renderB: () => (
        <div>
          <div className="font-bold text-slate-900">{orgB.associatedDiseases[0]?.name}</div>
          <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
            {orgB.associatedDiseases[0]?.description}
          </p>
        </div>
      )
    },
    {
      title: 'Diagnóstico Gold Standard',
      renderA: () => (
        <div>
          <div className="font-bold text-sky-900">{orgA.diagnosticMethods[0]?.method}</div>
          <div className="text-[11px] text-slate-600 mt-0.5">{orgA.diagnosticMethods[0]?.keyFindings}</div>
        </div>
      ),
      renderB: () => (
        <div>
          <div className="font-bold text-sky-900">{orgB.diagnosticMethods[0]?.method}</div>
          <div className="text-[11px] text-slate-600 mt-0.5">{orgB.diagnosticMethods[0]?.keyFindings}</div>
        </div>
      )
    },
    {
      title: 'Tratamiento de 1ª Línea',
      renderA: () => (
        <ul className="list-disc list-inside space-y-1 text-slate-800">
          {orgA.treatment.firstLine.map((fl, i) => (
            <li key={i}>{fl}</li>
          ))}
        </ul>
      ),
      renderB: () => (
        <ul className="list-disc list-inside space-y-1 text-slate-800">
          {orgB.treatment.firstLine.map((fl, i) => (
            <li key={i}>{fl}</li>
          ))}
        </ul>
      )
    },
    {
      title: 'Epidemiología en Guatemala',
      renderA: () => (
        <div>
          <div className="font-bold text-rose-700">{orgA.guatemalaRelevance.endemicStatus}</div>
          <div className="text-[11px] text-slate-600 mt-0.5">
            Regiones: {orgA.guatemalaRelevance.departmentsWithHighPrevalence.join(', ')}
          </div>
        </div>
      ),
      renderB: () => (
        <div>
          <div className="font-bold text-rose-700">{orgB.guatemalaRelevance.endemicStatus}</div>
          <div className="text-[11px] text-slate-600 mt-0.5">
            Regiones: {orgB.guatemalaRelevance.departmentsWithHighPrevalence.join(', ')}
          </div>
        </div>
      )
    },
    {
      title: 'Auditoría Bibliográfica',
      renderA: () => (
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${
          orgA.reviewStatus === 'Fuentes verificadas'
            ? 'bg-emerald-50 text-emerald-800'
            : 'bg-amber-50 text-amber-800'
        }`}>
          {orgA.reviewStatus}
        </span>
      ),
      renderB: () => (
        <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${
          orgB.reviewStatus === 'Fuentes verificadas'
            ? 'bg-emerald-50 text-emerald-800'
            : 'bg-amber-50 text-amber-800'
        }`}>
          {orgB.reviewStatus}
        </span>
      )
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-2 sm:p-4 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-800">
              <GitCompare className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Comparador Clínico Frente a Frente
              </h3>
              <p className="text-xs text-slate-500">
                Análisis diferencial de patógenos para diagnóstico y terapéutica
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 hover:text-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content: Selectors & Comparison Matrix */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          
          {/* Top Selectors Bar */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center border-b border-slate-200 pb-5">
            {/* Selector A */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="font-bold text-slate-700 block">Patógeno A:</label>
              <select
                value={organismAId}
                onChange={(e) => setOrganismAId(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs font-semibold text-slate-900 focus:border-sky-600 focus:outline-none"
              >
                {microorganisms.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.scientificName} ({m.commonName ?? m.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-1 flex justify-center py-1 md:py-0">
              <button
                type="button"
                onClick={() => {
                  const temp = organismAId;
                  setOrganismAId(organismBId);
                  setOrganismBId(temp);
                }}
                className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-600 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 transition-colors shadow-2xs"
                title="Intercambiar patógenos"
              >
                <ArrowRightLeft className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Selector B */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="font-bold text-slate-700 block">Patógeno B:</label>
              <select
                value={organismBId}
                onChange={(e) => setOrganismBId(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs font-semibold text-slate-900 focus:border-sky-600 focus:outline-none"
              >
                {microorganisms.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.scientificName} ({m.commonName ?? m.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white overflow-hidden">
            {comparisonRows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-3.5 gap-2 hover:bg-slate-50/60 transition-colors">
                <div className="md:col-span-3 font-bold text-slate-500 uppercase tracking-wider text-[11px] flex items-center">
                  {row.title}
                </div>
                <div className="md:col-span-4 border-l border-slate-100 pl-3">
                  {row.renderA()}
                </div>
                <div className="md:col-span-5 border-l border-slate-100 pl-3">
                  {row.renderB()}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white shadow-xs hover:bg-slate-800 text-xs"
          >
            Finalizar Comparación
          </button>
        </div>
      </div>
    </div>
  );
};
