import React, { useState } from 'react';
import { AtlasParasiteStage } from '../types/microscopyAtlas';
import { PARASITOLOGY_ATLAS_STAGES } from '../data/parasitologyAtlasData';
import { MicroscopicStageVisualizer } from './MicroscopicStageVisualizer';
import { 
  GitCompare, 
  ArrowRightLeft, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  Layers,
  Sparkles,
  Info,
  Maximize2
} from 'lucide-react';

interface MicroscopeStructureComparatorProps {
  initialStageA?: AtlasParasiteStage;
  initialStageB?: AtlasParasiteStage;
  onSelectStageForDetail?: (stage: AtlasParasiteStage) => void;
}

export const MicroscopeStructureComparator: React.FC<MicroscopeStructureComparatorProps> = ({
  initialStageA,
  initialStageB,
  onSelectStageForDetail
}) => {
  const [stageAId, setStageAId] = useState<string>(
    initialStageA?.id ?? 'eh-stage-cyst'
  );
  const [stageBId, setStageBId] = useState<string>(
    initialStageB?.id ?? 'gd-stage-cyst'
  );

  const stageA = PARASITOLOGY_ATLAS_STAGES.find(s => s.id === stageAId) ?? PARASITOLOGY_ATLAS_STAGES[0];
  const stageB = PARASITOLOGY_ATLAS_STAGES.find(s => s.id === stageBId) ?? PARASITOLOGY_ATLAS_STAGES[1];

  // Presets of high-yield differentials for medical students
  const HIGH_YIELD_PRESETS = [
    {
      label: 'Entamoeba histolytica vs Giardia duodenalis',
      subtitle: 'Quiste esférico (4 núcleos) vs Quiste ovalado (axonemas)',
      idA: 'eh-stage-cyst',
      idB: 'gd-stage-cyst'
    },
    {
      label: 'Plasmodium falciparum vs Plasmodium vivax',
      subtitle: 'Hematíe tamaño normal (semiluna) vs Reticulocito hipertrofiado (Schüffner)',
      idA: 'pf-stage-gametocyte',
      idB: 'pv-stage-ameboid'
    },
    {
      label: 'Ascaris lumbricoides: Fecundado vs Infecundo',
      subtitle: 'Huevo mamelonado esférico vs Huevo alargado amorfo',
      idA: 'al-stage-fertilized-egg',
      idB: 'al-stage-unfertilized-egg'
    },
    {
      label: 'Taenia solium vs Taenia saginata',
      subtitle: 'Proglótide 7-12 ramas primarias vs 15-30 ramas dicotómicas',
      idA: 'ts-stage-proglottid-solium',
      idB: 'ts-stage-proglottid-saginata'
    },
    {
      label: 'Enterobius vermicularis vs Trichuris trichiura',
      subtitle: 'Huevo plano-convexo en "D" vs Huevo en barril con tapones polares',
      idA: 'ev-stage-egg',
      idB: 'tt-stage-egg'
    },
    {
      label: 'Strongyloides stercoralis L1 vs Uncinarias',
      subtitle: 'Larva viva en heces frescas (vestíbulo corto) vs Huevos segmentados',
      idA: 'ss-stage-rhabditiform-larva',
      idB: 'unc-stage-egg'
    }
  ];

  const handleSwap = () => {
    const temp = stageAId;
    setStageAId(stageBId);
    setStageBId(temp);
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Preset Selector */}
      <div className="rounded-xl border border-sky-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">
              <GitCompare className="h-4 w-4" />
              <span>Laboratorio Diferencial Interactivo</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
              Comparador de Estructuras Microscópicas
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Contraste lado a lado de criterios morfológicos, tinciones, tamaño y trampas diagnósticas frecuentes en el frotis.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSwap}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors shadow-2xs self-start sm:self-auto"
            title="Intercambiar estructuras"
          >
            <ArrowRightLeft className="h-3.5 w-3.5 text-sky-600" />
            <span>Intercambiar Posición</span>
          </button>
        </div>

        {/* High Yield Presets Buttons */}
        <div>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Casos Clásicos de Diferenciación en el Examen Clínico:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {HIGH_YIELD_PRESETS.map((preset, i) => {
              const isActive = (stageAId === preset.idA && stageBId === preset.idB);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setStageAId(preset.idA);
                    setStageBId(preset.idB);
                  }}
                  className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                    isActive
                      ? 'border-sky-600 bg-sky-50 ring-1 ring-sky-600 shadow-2xs'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-slate-900 text-[11px] truncate">{preset.label}</div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">{preset.subtitle}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Structure A Selector */}
        <div className="p-3.5 rounded-xl border border-sky-300 bg-sky-50/50 space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-sky-900 block">
            Estructura A:
          </label>
          <select
            value={stageAId}
            onChange={(e) => setStageAId(e.target.value)}
            className="w-full rounded-lg border border-sky-200 bg-white p-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-sky-600"
          >
            {PARASITOLOGY_ATLAS_STAGES.map((st) => (
              <option key={st.id} value={st.id}>
                {st.scientificName} — {st.stageName} ({st.stageType})
              </option>
            ))}
          </select>
        </div>

        {/* Structure B Selector */}
        <div className="p-3.5 rounded-xl border border-indigo-300 bg-indigo-50/50 space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-indigo-900 block">
            Estructura B:
          </label>
          <select
            value={stageBId}
            onChange={(e) => setStageBId(e.target.value)}
            className="w-full rounded-lg border border-indigo-200 bg-white p-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600"
          >
            {PARASITOLOGY_ATLAS_STAGES.map((st) => (
              <option key={st.id} value={st.id}>
                {st.scientificName} — {st.stageName} ({st.stageType})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Microscope Slides Card View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Structure A Card */}
        <div className="rounded-xl border border-sky-200 bg-white p-5 shadow-xs space-y-4 text-xs">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                {stageA.parasiteGroup.toUpperCase()} • {stageA.stageType.toUpperCase()}
              </span>
              <h4 className="text-lg font-black text-slate-900 italic mt-1">{stageA.scientificName}</h4>
              <p className="text-xs font-bold text-slate-700">{stageA.stageName}</p>
            </div>

            {onSelectStageForDetail && (
              <button
                type="button"
                onClick={() => onSelectStageForDetail(stageA)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-sky-700 hover:bg-sky-50 transition-colors"
                title="Ver en visor ampliado"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Centered Eyepiece */}
          <div className="flex justify-center p-3 bg-slate-900 rounded-xl">
            <MicroscopicStageVisualizer stage={stageA} size="md" showAnnotations={true} />
          </div>

          {/* Quick Parameters */}
          <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div>
              <span className="font-semibold text-slate-500 block text-[11px]">Dimensión reportada:</span>
              <span className="font-bold text-slate-900 font-mono">{stageA.approximateDimensions ?? 'No aplica'}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block text-[11px]">Tinción / Montaje:</span>
              <span className="font-bold text-sky-800">{stageA.stainUsed}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block text-[11px]">Muestra de elección:</span>
              <span className="font-bold text-slate-900">{stageA.clinicalSpecimen}</span>
            </div>
          </div>

          {/* Observable Findings Checklist */}
          <div>
            <span className="font-bold text-slate-900 block mb-1">Criterios Morfológicos al Microscopio:</span>
            <ul className="space-y-1 text-slate-700 text-[11px]">
              {stageA.specificMicroscopicFindings.map((f, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Differential Key */}
          <div className="p-3 rounded-lg border border-sky-100 bg-sky-50/60 text-[11px] text-slate-700">
            <span className="font-bold text-sky-950 block mb-0.5">Clave de Diagnóstico Diferencial:</span>
            <p className="leading-snug">{stageA.differentialCharacteristics[0]}</p>
          </div>
        </div>

        {/* Structure B Card */}
        <div className="rounded-xl border border-indigo-200 bg-white p-5 shadow-xs space-y-4 text-xs">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                {stageB.parasiteGroup.toUpperCase()} • {stageB.stageType.toUpperCase()}
              </span>
              <h4 className="text-lg font-black text-slate-900 italic mt-1">{stageB.scientificName}</h4>
              <p className="text-xs font-bold text-slate-700">{stageB.stageName}</p>
            </div>

            {onSelectStageForDetail && (
              <button
                type="button"
                onClick={() => onSelectStageForDetail(stageB)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
                title="Ver en visor ampliado"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Centered Eyepiece */}
          <div className="flex justify-center p-3 bg-slate-900 rounded-xl">
            <MicroscopicStageVisualizer stage={stageB} size="md" showAnnotations={true} />
          </div>

          {/* Quick Parameters */}
          <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div>
              <span className="font-semibold text-slate-500 block text-[11px]">Dimensión reportada:</span>
              <span className="font-bold text-slate-900 font-mono">{stageB.approximateDimensions ?? 'No aplica'}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block text-[11px]">Tinción / Montaje:</span>
              <span className="font-bold text-indigo-800">{stageB.stainUsed}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block text-[11px]">Muestra de elección:</span>
              <span className="font-bold text-slate-900">{stageB.clinicalSpecimen}</span>
            </div>
          </div>

          {/* Observable Findings Checklist */}
          <div>
            <span className="font-bold text-slate-900 block mb-1">Criterios Morfológicos al Microscopio:</span>
            <ul className="space-y-1 text-slate-700 text-[11px]">
              {stageB.specificMicroscopicFindings.map((f, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Differential Key */}
          <div className="p-3 rounded-lg border border-indigo-100 bg-indigo-50/60 text-[11px] text-slate-700">
            <span className="font-bold text-indigo-950 block mb-0.5">Clave de Diagnóstico Diferencial:</span>
            <p className="leading-snug">{stageB.differentialCharacteristics[0]}</p>
          </div>
        </div>

      </div>

      {/* Comparative Analytical Matrix Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs text-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <span className="font-bold text-slate-900 uppercase tracking-wide">
            Matriz Comparativa de Criterios Diagnósticos
          </span>
          <span className="text-[11px] text-slate-500 font-medium">
            Rigor de Laboratorio Clínico
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] text-slate-700">
                <th className="p-3 font-bold w-1/4">Parámetro</th>
                <th className="p-3 font-bold w-3/8 text-sky-900">{stageA.scientificName}</th>
                <th className="p-3 font-bold w-3/8 text-indigo-900">{stageB.scientificName}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-bold text-slate-500">Estadio Biológico</td>
                <td className="p-3 text-slate-900 capitalize font-medium">{stageA.stageType} ({stageA.stageName})</td>
                <td className="p-3 text-slate-900 capitalize font-medium">{stageB.stageType} ({stageB.stageName})</td>
              </tr>
              <tr className="bg-slate-50/40">
                <td className="p-3 font-bold text-slate-500">Rol en el Ciclo</td>
                <td className="p-3 text-slate-700">
                  {stageA.isDiagnosticStage && <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded mr-1">Diagnóstico</span>}
                  {stageA.isInfectiveStage && <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">Infectante</span>}
                </td>
                <td className="p-3 text-slate-700">
                  {stageB.isDiagnosticStage && <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded mr-1">Diagnóstico</span>}
                  {stageB.isInfectiveStage && <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded">Infectante</span>}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Tamaño Aprox.</td>
                <td className="p-3 font-mono font-bold text-slate-900">{stageA.approximateDimensions ?? 'No aplica'}</td>
                <td className="p-3 font-mono font-bold text-slate-900">{stageB.approximateDimensions ?? 'No aplica'}</td>
              </tr>
              <tr className="bg-slate-50/40">
                <td className="p-3 font-bold text-slate-500">Muestra Clínica</td>
                <td className="p-3 text-slate-900 font-semibold">{stageA.clinicalSpecimen}</td>
                <td className="p-3 text-slate-900 font-semibold">{stageB.clinicalSpecimen}</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Tinción de Elección</td>
                <td className="p-3 text-sky-800 font-semibold">{stageA.stainUsed}</td>
                <td className="p-3 text-indigo-800 font-semibold">{stageB.stainUsed}</td>
              </tr>
              <tr className="bg-slate-50/40">
                <td className="p-3 font-bold text-slate-500">Regla de Oro Diferencial</td>
                <td className="p-3 text-slate-700 text-[11px] leading-relaxed">
                  {stageA.differentialCharacteristics[0]}
                </td>
                <td className="p-3 text-slate-700 text-[11px] leading-relaxed">
                  {stageB.differentialCharacteristics[0]}
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-500">Enfermedad Asociada</td>
                <td className="p-3 text-slate-900 font-semibold">{stageA.associatedDisease}</td>
                <td className="p-3 text-slate-900 font-semibold">{stageB.associatedDisease}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
