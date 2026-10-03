import React, { useState } from 'react';
import { DIAGNOSTIC_TECHNIQUES } from '../data/diagnostics';
import { DiagnosticTechnique } from '../types/diagnostics';
import { 
  Microscope, 
  Layers, 
  CheckCircle, 
  AlertTriangle, 
  HelpCircle, 
  Clock, 
  Hospital,
  Eye
} from 'lucide-react';

export const DiagnosticsAtlas: React.FC = () => {
  const [selectedTechId, setSelectedTechId] = useState<string>(DIAGNOSTIC_TECHNIQUES[0]?.id ?? '');
  const [microscopeHelperQuery, setMicroscopeHelperQuery] = useState<string>('');

  const selectedTechnique = DIAGNOSTIC_TECHNIQUES.find(t => t.id === selectedTechId) ?? DIAGNOSTIC_TECHNIQUES[0];

  // "¿Qué estoy viendo en el microscopio?" quick diagnostic guide rules
  const microscopeScenarios = [
    {
      observed: 'Cocos violetas agrupados en racimos irregulares como uvas',
      diagnosis: 'Compatible con Staphylococcus aureus (o estafilococo coagulasa negativa)',
      action: 'Realizar prueba de catalasa (+), coagulasa en tubo y prueba de cefoxitina para despistaje de MRSA.',
      category: 'Bacteriología'
    },
    {
      observed: 'Bacilos fucsias brillantes delgados sobre fondo azul claro tras decoloración ácida',
      diagnosis: 'Bacilos Ácido-Alcohol Resistentes (BAAR) compatibles con Mycobacterium tuberculosis',
      action: 'Cuantificar cruces (+ a +++), solicitar prueba rápida GeneXpert MTB/RIF y notificar de inmediato al Programa de TB.',
      category: 'Micobacteriología'
    },
    {
      observed: 'Quiste esférico refringente con exactamente 4 núcleos y cuerpos cromatoidales con extremos romos',
      diagnosis: 'Entamoeba histolytica / dispar (quiste maduro tetranucleado)',
      action: 'Si el paciente tiene disentería o síntomas invasivos, confirmar por antígeno o iniciar esquema tisular + luminal.',
      category: 'Parasitología'
    },
    {
      observed: 'Quiste esférico grande (15-30 µm) con 5 a 8 núcleos y cariosoma excéntrico',
      diagnosis: 'Entamoeba coli (comensal no patógeno)',
      action: 'NO requiere tratamiento antiparasitario amebicida. No confundir con E. histolytica.',
      category: 'Parasitología'
    },
    {
      observed: 'Eritrocitos agrandados con punteado de Schüffner y trofozoítos ameboides activos con hemozoína',
      diagnosis: 'Plasmodium vivax (Paludismo terciario)',
      action: 'Iniciar Cloroquina inmediata y pauta supervisada de Primaquina para erradicar hipnozoítos.',
      category: 'Parasitología sanguínea'
    },
    {
      observed: 'Huevo esférico con cubierta gruesa estriada radialmente en empalizada y embrión hexacanto',
      diagnosis: 'Huevos de Taenia sp. (Taenia solium / Taenia saginata)',
      action: 'Advertir riesgo de neurocisticercosis por autoinfección fecal-oral si se trata de T. solium. Tratar con Praziquantel.',
      category: 'Helmintología'
    }
  ];

  const filteredScenarios = microscopeHelperQuery
    ? microscopeScenarios.filter(s => 
        s.observed.toLowerCase().includes(microscopeHelperQuery.toLowerCase()) ||
        s.diagnosis.toLowerCase().includes(microscopeHelperQuery.toLowerCase())
      )
    : microscopeScenarios;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-sky-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
          <Microscope className="h-4 w-4" />
          <span>Microscopía y Laboratorio Clínico</span>
        </div>
        <h2 className="mt-1 text-2xl font-black text-slate-900 tracking-tight">
          Atlas Diagnóstico Microbiológico y Parasitológico
        </h2>
        <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed">
          Guía técnica y visual para interpretación de frotis, tinciones diferenciales y coproanálisis disponibles en la red de servicios de salud de Guatemala.
        </p>
      </div>

      {/* SPECIAL SECTION: ¿Qué estoy viendo en el microscopio? */}
      <div className="rounded-xl border border-sky-300 bg-linear-to-r from-sky-50 via-white to-sky-50 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-700 text-white shadow-xs">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-950">
                ¿Qué estoy viendo en el microscopio?
              </h3>
              <p className="text-xs text-slate-600">
                Asistente diferencial de alta especificidad para el estudiante en el laboratorio y la guardia médica
              </p>
            </div>
          </div>

          <div className="sm:w-72">
            <input
              type="text"
              value={microscopeHelperQuery}
              onChange={(e) => setMicroscopeHelperQuery(e.target.value)}
              placeholder="Describa el hallazgo: ej. cocos, fucsia, quiste..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:border-sky-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Diagnostic Helper Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredScenarios.map((sc, i) => (
            <div key={i} className="rounded-lg border border-slate-200 bg-white p-3.5 space-y-2 text-xs shadow-2xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-sky-800">
                {sc.category}
              </div>
              <div>
                <span className="font-semibold text-slate-500 block text-[11px]">Hallazgo visual:</span>
                <span className="font-bold text-slate-900 block leading-snug">{sc.observed}</span>
              </div>
              <div className="pt-1 border-t border-slate-100">
                <span className="font-semibold text-slate-500 block text-[11px]">Interpretación clínica:</span>
                <span className="font-bold text-sky-800 block">{sc.diagnosis}</span>
              </div>
              <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded leading-relaxed">
                <span className="font-semibold text-slate-700">Conducta: </span>
                {sc.action}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Diagnostic Techniques Browser */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Tabs (Techniques) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Técnicas Diagnósticas Fundamentales ({DIAGNOSTIC_TECHNIQUES.length}):
          </div>

          <div className="space-y-1.5">
            {DIAGNOSTIC_TECHNIQUES.map((tech) => {
              const isSelected = tech.id === selectedTechnique.id;
              return (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => setSelectedTechId(tech.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-sky-600 bg-sky-50/80 shadow-xs ring-1 ring-sky-600'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="font-bold text-slate-900 text-xs">{tech.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{tech.category}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="lg:col-span-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-5 text-xs">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-sky-700">
                  {selectedTechnique.category}
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedTechnique.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                  <Clock className="h-3 w-3 text-slate-500" />
                  <span>{selectedTechnique.applicabilityInGuatemala.turnaroundTime}</span>
                </div>
                <div className="flex items-center gap-1 rounded bg-sky-50 px-2 py-1 text-[11px] font-medium text-sky-800 border border-sky-100">
                  <Hospital className="h-3 w-3 text-sky-600" />
                  <span>{selectedTechnique.applicabilityInGuatemala.availableLevel}</span>
                </div>
              </div>
            </div>

            {/* Principle */}
            <div className="space-y-1">
              <span className="font-bold text-slate-800 block text-xs">Fundamento Bioquímico:</span>
              <p className="text-slate-600 leading-relaxed">{selectedTechnique.principle}</p>
            </div>

            {/* Clinical Indications & Reagents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3.5 space-y-1.5">
                <span className="font-bold text-slate-900 block">Indicaciones Clínicas:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {selectedTechnique.clinicalIndications.map((ind, i) => (
                    <li key={i}>{ind}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3.5 space-y-1.5">
                <span className="font-bold text-slate-900 block">Reactivos y Protocolo Resumido:</span>
                <ul className="list-decimal list-inside space-y-1 text-slate-600">
                  {selectedTechnique.reagentsAndProcedureSummary.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What you see under the microscope section */}
            <div className="rounded-lg border border-sky-200 bg-sky-50/40 p-4 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sky-950 text-xs uppercase tracking-wide">
                <Microscope className="h-4 w-4 text-sky-700" />
                <span>Criterios Morfológicos al Microscopio ({selectedTechnique.whatYouSeeUnderMicroscope.magnification})</span>
              </div>

              <ul className="space-y-1.5 text-slate-700">
                {selectedTechnique.whatYouSeeUnderMicroscope.keyObservableFeatures.map((feat, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-sky-100 text-slate-600">
                <span className="font-bold text-slate-800">Interpretación diagnóstica: </span>
                {selectedTechnique.whatYouSeeUnderMicroscope.typicalInterpretation}
              </div>

              {/* Pitfalls and artifacts */}
              <div className="pt-2 border-t border-sky-100">
                <div className="flex items-center gap-1 font-bold text-amber-800 mb-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                  <span>Artefactos y Errores Frecuentes de Interpretación:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
                  {selectedTechnique.whatYouSeeUnderMicroscope.frequentArtifactsOrPitfalls.map((pit, i) => (
                    <li key={i}>{pit}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
