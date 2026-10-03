import React, { useState } from 'react';
import { Microorganism } from '../types/microorganism';
import { GitCompare, ArrowLeftRight, Check, AlertCircle, FileText, ChevronRight } from 'lucide-react';

interface ComparatorViewProps {
  microorganisms: Microorganism[];
  onSelectOrganismForDetail: (organism: Microorganism) => void;
  initialOrganismAId?: string;
  initialOrganismBId?: string;
}

export const ComparatorView: React.FC<ComparatorViewProps> = ({
  microorganisms,
  onSelectOrganismForDetail,
  initialOrganismAId,
  initialOrganismBId,
}) => {
  const [organismAId, setOrganismAId] = useState<string>(
    initialOrganismAId || (microorganisms[0]?.id ?? '')
  );
  const [organismBId, setOrganismBId] = useState<string>(
    initialOrganismBId || (microorganisms[1]?.id ?? microorganisms[0]?.id ?? '')
  );

  const orgA = microorganisms.find(m => m.id === organismAId) ?? microorganisms[0];
  const orgB = microorganisms.find(m => m.id === organismBId) ?? microorganisms[1] ?? microorganisms[0];

  const handleSwap = () => {
    const temp = organismAId;
    setOrganismAId(organismBId);
    setOrganismBId(temp);
  };

  const comparisonRows = [
    {
      title: 'Categoría & Taxonomía',
      renderA: () => (
        <div>
          <span className="font-bold uppercase text-[11px] text-sky-800">{orgA.category}</span>
          {orgA.parasiteGroup && <span className="text-[11px] text-slate-500"> ({orgA.parasiteGroup})</span>}
          <div className="text-slate-600 mt-0.5">Familia: {orgA.taxonomy.family}</div>
          <div className="text-[11px] text-slate-400 italic">Género: {orgA.taxonomy.genus}</div>
        </div>
      ),
      renderB: () => (
        <div>
          <span className="font-bold uppercase text-[11px] text-sky-800">{orgB.category}</span>
          {orgB.parasiteGroup && <span className="text-[11px] text-slate-500"> ({orgB.parasiteGroup})</span>}
          <div className="text-slate-600 mt-0.5">Familia: {orgB.taxonomy.family}</div>
          <div className="text-[11px] text-slate-400 italic">Género: {orgB.taxonomy.genus}</div>
        </div>
      )
    },
    {
      title: 'Morfología & Tinciones',
      renderA: () => (
        <div>
          <div className="font-medium text-slate-800">{orgA.morphology.shape}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Tinción: <span className="font-semibold text-slate-700">{orgA.morphology.gramStain ?? 'N/A'}</span> · {orgA.morphology.size}
          </div>
        </div>
      ),
      renderB: () => (
        <div>
          <div className="font-medium text-slate-800">{orgB.morphology.shape}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Tinción: <span className="font-semibold text-slate-700">{orgB.morphology.gramStain ?? 'N/A'}</span> · {orgB.morphology.size}
          </div>
        </div>
      )
    },
    {
      title: 'Transmisión & Vector',
      renderA: () => (
        <div>
          <div className="text-slate-800 leading-snug">{orgA.transmissionRoute[0]}</div>
          <div className="text-[11px] font-semibold text-amber-800 mt-1">
            {orgA.vector ? `Vector: ${orgA.vector}` : 'Sin vector biológico'}
          </div>
        </div>
      ),
      renderB: () => (
        <div>
          <div className="text-slate-800 leading-snug">{orgB.transmissionRoute[0]}</div>
          <div className="text-[11px] font-semibold text-amber-800 mt-1">
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
      title: 'Relevancia en Guatemala',
      renderA: () => (
        <div>
          <div className="font-bold text-rose-700">{orgA.guatemalaRelevance.endemicStatus}</div>
          <div className="text-[11px] text-slate-600 mt-0.5">
            Departamentos: {orgA.guatemalaRelevance.departmentsWithHighPrevalence.join(', ')}
          </div>
        </div>
      ),
      renderB: () => (
        <div>
          <div className="font-bold text-rose-700">{orgB.guatemalaRelevance.endemicStatus}</div>
          <div className="text-[11px] text-slate-600 mt-0.5">
            Departamentos: {orgB.guatemalaRelevance.departmentsWithHighPrevalence.join(', ')}
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
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl border border-sky-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
          <GitCompare className="h-4 w-4" />
          <span>Diagnóstico Diferencial Clínico</span>
        </div>
        <h2 className="mt-1 text-2xl font-black text-slate-900 tracking-tight">
          Comparador de Especies y Patógenos
        </h2>
        <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed">
          Herramienta para el análisis diferencial frente a frente de microorganismos. Permite contrastar morfología, vías de transmisión, pruebas estándar de oro y esquemas terapéuticos de primera línea.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
          
          {/* Selector Organism A */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Patógeno A:
            </label>
            <select
              value={organismAId}
              onChange={(e) => setOrganismAId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-semibold text-slate-900 focus:border-sky-600 focus:bg-white focus:outline-none"
            >
              {microorganisms.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.scientificName} ({m.commonName ?? m.category})
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => onSelectOrganismForDetail(orgA)}
              className="text-[11px] font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 mt-1"
            >
              <span>Abrir ficha monográfica de {orgA.scientificName}</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center py-2 md:py-0">
            <button
              type="button"
              onClick={handleSwap}
              className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-600 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800 transition-colors shadow-2xs"
              title="Intercambiar patógenos"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>
          </div>

          {/* Selector Organism B */}
          <div className="md:col-span-5 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Patógeno B:
            </label>
            <select
              value={organismBId}
              onChange={(e) => setOrganismBId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-semibold text-slate-900 focus:border-sky-600 focus:bg-white focus:outline-none"
            >
              {microorganisms.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.scientificName} ({m.commonName ?? m.category})
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => onSelectOrganismForDetail(orgB)}
              className="text-[11px] font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 mt-1"
            >
              <span>Abrir ficha monográfica de {orgB.scientificName}</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-100/90 border-b border-slate-200 p-4 font-bold text-xs text-slate-800">
          <div className="md:col-span-3 uppercase tracking-wider text-slate-500 text-[11px]">
            Criterio Clínico
          </div>
          <div className="md:col-span-4 border-l border-slate-200 pl-4 text-sky-900 italic">
            {orgA.scientificName}
          </div>
          <div className="md:col-span-5 border-l border-slate-200 pl-4 text-sky-900 italic">
            {orgB.scientificName}
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100 text-xs">
          {comparisonRows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-4 gap-2 hover:bg-slate-50/70 transition-colors">
              <div className="md:col-span-3 font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center">
                {row.title}
              </div>
              <div className="md:col-span-4 md:border-l border-slate-100 md:pl-4">
                {row.renderA()}
              </div>
              <div className="md:col-span-5 md:border-l border-slate-100 md:pl-4">
                {row.renderB()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
