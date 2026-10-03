import React from 'react';
import { Microorganism } from '../types/microorganism';
import { Activity, ArrowRight, ShieldAlert, Layers } from 'lucide-react';

interface DiseasesViewProps {
  microorganisms: Microorganism[];
  onSelectOrganism: (organism: Microorganism) => void;
}

export const DiseasesView: React.FC<DiseasesViewProps> = ({
  microorganisms,
  onSelectOrganism,
}) => {
  // Aggregate all associated diseases across microorganisms
  const diseaseRecords = microorganisms.flatMap(m => 
    m.associatedDiseases.map(d => ({
      ...d,
      organism: m
    }))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-sky-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
          <Activity className="h-4 w-4" />
          <span>Clínica Médica e Infectología</span>
        </div>
        <h2 className="mt-1 text-2xl font-black text-slate-900 tracking-tight">
          Catálogo Clínico de Enfermedades Infecciosas
        </h2>
        <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed">
          Cuadros sindrómicos, presentaciones cardinales y criterios de severidad vinculados a los patógenos de mayor impacto en Guatemala y Centroamérica.
        </p>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {diseaseRecords.map((item, idx) => (
          <div 
            key={idx} 
            className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-sky-800 uppercase tracking-wide">
                  Etiología: <span className="italic">{item.organism.scientificName}</span>
                </span>
                <span className="text-[11px] text-slate-400 capitalize">
                  {item.organism.category}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 group-hover:text-sky-800 transition-colors">
                {item.name}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                <span className="font-semibold text-slate-700 block text-[11px]">
                  Signos y Síntomas Clave:
                </span>
                <div className="flex flex-wrap gap-1">
                  {item.clinicalPresentation.map((cp, i) => (
                    <span key={i} className="rounded bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700">
                      {cp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom link to view full pathogen monograph */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[11px] text-slate-500">
                Endemicidad GT: <span className="font-semibold text-slate-700">{item.organism.guatemalaRelevance.endemicStatus}</span>
              </div>

              <button
                type="button"
                onClick={() => onSelectOrganism(item.organism)}
                className="flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-900 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Ficha del Patógeno</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
