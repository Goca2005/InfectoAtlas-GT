import React from 'react';
import { Microorganism, MicroorganismCategory } from '../types/microorganism';
import { 
  Microscope, 
  MapPin, 
  Layers, 
  GraduationCap, 
  Search, 
  GitCompare, 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  Sparkles,
  Bug,
  Bell
} from 'lucide-react';
import { ActiveNavSection } from './Sidebar';

interface HomeDashboardProps {
  microorganisms: Microorganism[];
  onNavigateSection: (section: ActiveNavSection, categoryFilter?: MicroorganismCategory) => void;
  onSelectOrganism: (organism: Microorganism) => void;
  onOpenComparator: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  microorganisms,
  onNavigateSection,
  onSelectOrganism,
  onOpenComparator,
  searchQuery,
  onSearchChange,
}) => {
  // Key featured organisms for quick clinical access
  const featuredIds = ['virus-del-dengue', 'mycobacterium-tuberculosis', 'plasmodium-vivax', 'taenia-solium'];
  const featuredOrganisms = microorganisms.filter(m => featuredIds.includes(m.id));

  return (
    <div className="space-y-8">
      {/* Hero Presentation */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 text-white p-6 sm:p-10 shadow-lg">
        {/* Subtle background mesh accent */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-40 -bottom-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
            <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-pulse"></span>
            <span>Plataforma educativa independiente para estudiantes de Medicina</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            InfectoAtlas GT
            <span className="block text-xl sm:text-2xl font-normal text-sky-200 mt-1">
              Atlas Médico de Infectología, Microbiología y Parasitología
            </span>
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Plataforma universitaria modular diseñada para el estudio sistemático de patógenos, morfología de laboratorio, estadios parasitarios, terapéutica de primera línea y vigilancia epidemiológica en los 22 departamentos de Guatemala y Centroamérica.
          </p>

          {/* Quick Search inside Hero */}
          <div className="pt-2">
            <div className="relative max-w-xl">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar patógeno (ej. Staphylococcus, Dengue, Plasmodium, Tenia)..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800/90 py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-400 focus:border-sky-400 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
          </div>
        </div>

        {/* Quick Metrics Bar at bottom of Hero */}
        <div className="relative z-10 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800 pt-6 text-xs">
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">{microorganisms.length}</div>
            <div className="text-slate-400 text-[11px] mt-0.5">Fichas y entradas documentales</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">22 / 22</div>
            <div className="text-slate-400 text-[11px] mt-0.5">Departamentos de Guatemala</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-sky-400 font-mono">
              {microorganisms.filter(m => m.reviewStatus === 'Fuentes verificadas').length} / {microorganisms.length}
            </div>
            <div className="text-slate-400 text-[11px] mt-0.5">
              Fuentes verificadas · {microorganisms.filter(m => m.reviewStatus === 'Fuentes pendientes de revisión').length} pendientes de revisión
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">2 Modos</div>
            <div className="text-slate-400 text-[11px] mt-0.5">Resumen Rápido / Ficha Completa</div>
          </div>
        </div>
      </div>

      {/* Main Category Jump Bars (Interactive Filter Controls) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-500">
            Exploración por Taxonomía Médica
          </span>
          <button
            type="button"
            onClick={() => onNavigateSection('microorganismos')}
            className="text-sky-700 font-bold hover:underline"
          >
            Ver catálogo completo ({microorganisms.length}) →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <button
            type="button"
            onClick={() => onNavigateSection('microorganismos', 'bacteria')}
            className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-sky-800 flex items-center justify-between">
              <span>Bacterias</span>
              <span className="text-slate-400 text-[11px] font-mono">
                {microorganisms.filter(m => m.category === 'bacteria').length}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Gram (+), Gram (-), Micobacterias, antibiogramas
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigateSection('microorganismos', 'virus')}
            className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-sky-800 flex items-center justify-between">
              <span>Virus</span>
              <span className="text-slate-400 text-[11px] font-mono">
                {microorganisms.filter(m => m.category === 'virus').length}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Arbovirus (Dengue), ARN/ADN, serología y PCR
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigateSection('microorganismos', 'parasito')}
            className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 text-left shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all group"
          >
            <div className="font-bold text-emerald-950 group-hover:text-emerald-900 flex items-center justify-between">
              <span>Parásitos (Estadios)</span>
              <span className="text-emerald-700 text-[11px] font-mono font-bold">
                {microorganisms.filter(m => m.category === 'parasito').length}
              </span>
            </div>
            <div className="text-[11px] text-emerald-800 mt-1">
              Protozoos, Céstodos, Nematodos, Quistes y Huevos
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigateSection('microorganismos', 'hongo')}
            className="rounded-xl border border-slate-200 bg-white p-4 text-left shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all group"
          >
            <div className="font-bold text-slate-900 group-hover:text-sky-800 flex items-center justify-between">
              <span>Hongos</span>
              <span className="text-slate-400 text-[11px] font-mono">
                {microorganisms.filter(m => m.category === 'hongo').length}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Levaduras (Candida), dimórficos y micosis
            </div>
          </button>
        </div>
      </div>

      {/* Featured Microorganisms Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-500">
            Selección de estudio del catálogo
          </span>
          <span className="text-slate-400 text-[11px]">Prioridad del catálogo local; cifras oficiales pendientes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredOrganisms.map((org) => (
            <div
              key={org.id}
              onClick={() => onSelectOrganism(org)}
              className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="text-sky-700 font-bold uppercase">{org.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{org.taxonomy.family}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-rose-700">
                    {org.guatemalaRelevance.endemicStatus}
                  </span>
                </div>

                <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-sky-800 transition-colors">
                  <span className="italic">{org.scientificName}</span>
                  {org.commonName && (
                    <span className="ml-2 text-xs font-normal text-slate-500 not-italic">
                      ({org.commonName})
                    </span>
                  )}
                </h3>

                <p className="mt-1 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {org.associatedDiseases[0]?.name}: {org.associatedDiseases[0]?.description}
                </p>

                {org.parasiticStages && org.parasiticStages.length > 0 && (
                  <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50 rounded p-1.5 border border-emerald-100">
                    <span className="font-bold">{org.parasiticStages.length} estadios biológicos documentados: </span>
                    {org.parasiticStages.map(s => s.name).join(', ')}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">
                  Transmisión: <span className="font-medium text-slate-700">{org.transmissionRoute[0]}</span>
                </span>
                <span className="font-bold text-sky-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>Abrir Ficha</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Hub Entry Points (Guatemala, Atlas, Study, Comparator) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Guatemala Explorer Card */}
        <div 
          onClick={() => onNavigateSection('guatemala')}
          className="cursor-pointer rounded-xl border border-sky-200 bg-sky-50/50 p-5 shadow-2xs hover:border-sky-400 hover:shadow-xs transition-all group"
        >
          <div className="flex items-center gap-2 font-bold text-sky-950 text-sm">
            <MapPin className="h-4 w-4 text-sky-700" />
            <span>Guatemala (22 Deptos)</span>
          </div>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
            Explora los 22 departamentos y el contexto educativo; consulta el estado de verificación de las fuentes.
          </p>
          <div className="mt-3 text-sky-700 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            <span>Abrir Módulo GT →</span>
          </div>
        </div>

        {/* Diagnostics Atlas Card */}
        <div 
          onClick={() => onNavigateSection('atlas-diagnostico')}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all group"
        >
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Layers className="h-4 w-4 text-sky-700" />
            <span>Atlas Diagnóstico</span>
          </div>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
            Tinciones Gram, Ziehl-Neelsen, Giemsa y "¿Qué estoy viendo en el microscopio?".
          </p>
          <div className="mt-3 text-sky-700 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            <span>Ver Microscopía →</span>
          </div>
        </div>

        {/* Study Hub Card */}
        <div 
          onClick={() => onNavigateSection('estudiar')}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all group"
        >
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <GraduationCap className="h-4 w-4 text-sky-700" />
            <span>Módulo de Estudio</span>
          </div>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
            Repaso activo con tarjetas flashcards de alta rentabilidad y hoja de ruta pedagógica.
          </p>
          <div className="mt-3 text-sky-700 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            <span>Iniciar Repaso →</span>
          </div>
        </div>

        {/* Species Comparator Card */}
        <div 
          onClick={onOpenComparator}
          className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all group"
        >
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <GitCompare className="h-4 w-4 text-sky-700" />
            <span>Comparador Clínico</span>
          </div>
          <p className="mt-1 text-xs text-slate-600 leading-relaxed">
            Compara dos patógenos frente a frente: morfología, vector, prueba de oro y 1ª línea terapéutica.
          </p>
          <div className="mt-3 text-sky-700 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            <span>Comparar Especies →</span>
          </div>
        </div>
      </div>
    </div>
  );
};
