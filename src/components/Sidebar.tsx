import React from 'react';
import { 
  Home, 
  Microscope, 
  Bug, 
  Activity, 
  Layers, 
  TrendingUp, 
  MapPin, 
  GraduationCap, 
  GitCompare, 
  BookOpen, 
  Library,
  X,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { MicroorganismCategory } from '../types/microorganism';

export type ActiveNavSection = 
  | 'inicio'
  | 'live'
  | 'laboratorio-3d'
  | 'microorganismos'
  | 'vectores'
  | 'enfermedades'
  | 'atlas-diagnostico'
  | 'atlas-visual'
  | 'biblioteca-academica'
  | 'epidemiologia'
  | 'guatemala'
  | 'estudiar'
  | 'comparador'
  | 'fuentes';

interface SidebarProps {
  currentSection: ActiveNavSection;
  onSelectSection: (section: ActiveNavSection, categoryFilter?: MicroorganismCategory) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  microorganismCount: number;
  academicDocCount?: number;
  pendingProposalsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  isOpenMobile,
  onCloseMobile,
  microorganismCount,
  academicDocCount = 3,
  pendingProposalsCount = 0,
}) => {
  const navItems = [
    { id: 'inicio' as ActiveNavSection, label: 'Inicio', icon: Home, count: null },
    { id: 'live' as ActiveNavSection, label: 'InfectoAtlas LIVE', icon: Activity, count: null },
    { id: 'laboratorio-3d' as ActiveNavSection, label: 'Laboratorio virtual', icon: Microscope, count: null },
    { id: 'microorganismos' as ActiveNavSection, label: 'Microorganismos', icon: Microscope, count: microorganismCount },
    { id: 'atlas-visual' as ActiveNavSection, label: 'Atlas visual', icon: Layers, count: null },
    { id: 'atlas-diagnostico' as ActiveNavSection, label: 'Atlas Diagnóstico', icon: Layers, count: 5 },
    { id: 'biblioteca-academica' as ActiveNavSection, label: 'Biblioteca Académica', icon: Library, count: academicDocCount, highlight: pendingProposalsCount > 0 },
    { id: 'vectores' as ActiveNavSection, label: 'Vectores Artrópodos', icon: Bug, count: 3 },
    { id: 'enfermedades' as ActiveNavSection, label: 'Enfermedades Infecciosas', icon: Activity, count: 7 },
    { id: 'epidemiologia' as ActiveNavSection, label: 'Vigilancia Epidemiológica', icon: TrendingUp, count: null },
    { id: 'guatemala' as ActiveNavSection, label: 'Guatemala (22 Deptos)', icon: MapPin, count: 22 },
    { id: 'estudiar' as ActiveNavSection, label: 'Módulo de Estudio', icon: GraduationCap, count: null },
    { id: 'comparador' as ActiveNavSection, label: 'Comparador de Especies', icon: GitCompare, count: null },
    { id: 'fuentes' as ActiveNavSection, label: 'Fuentes Científicas', icon: BookOpen, count: null },
  ];

  const handleNavClick = (id: ActiveNavSection) => {
    onSelectSection(id);
    onCloseMobile();
  };

  const handleCategoryQuickFilter = (cat: MicroorganismCategory, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectSection('microorganismos', cat);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-slate-900 text-slate-100 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white font-black text-sm tracking-wider shadow-sm">
              GT
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                InfectoAtlas GT
              </div>
              <div className="text-[11px] text-slate-400 font-normal">
                Infectología & Microbiología
              </div>
            </div>
          </div>

          <button 
            type="button" 
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Cerrar barra lateral"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Priority national banner */}
        <div className="mx-3 mt-3 rounded-lg border border-sky-900/60 bg-sky-950/40 p-2.5 text-xs text-sky-200">
          <div className="flex items-center gap-1.5 font-semibold text-sky-300">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400"></span>
            Enfoque Geográfico: Guatemala
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-sky-200/80">
            Plataforma educativa independiente para estudiantes de Medicina con prioridad epidemiológica en Guatemala y Centroamérica.
          </p>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 text-xs">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <div key={item.id} className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-600/20 text-sky-400 font-semibold border-l-2 border-sky-400 pl-2.5'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.count !== null && (
                    <span className={`text-[10px] tabular-nums px-1.5 py-0.5 rounded font-bold ${
                      item.highlight 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                        : 'text-slate-400'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>

                {/* Subcategories under Microorganismos */}
                {item.id === 'microorganismos' && (
                  <div className="ml-7 space-y-0.5 border-l border-slate-800 pl-2.5 pt-0.5">
                    <button
                      type="button"
                      onClick={(e) => handleCategoryQuickFilter('bacteria', e)}
                      className="block w-full py-1 text-left text-[11px] text-slate-400 hover:text-sky-300"
                    >
                      Bacterias
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleCategoryQuickFilter('virus', e)}
                      className="block w-full py-1 text-left text-[11px] text-slate-400 hover:text-sky-300"
                    >
                      Virus
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleCategoryQuickFilter('hongo', e)}
                      className="block w-full py-1 text-left text-[11px] text-slate-400 hover:text-sky-300"
                    >
                      Hongos
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleCategoryQuickFilter('parasito', e)}
                      className="flex items-center justify-between w-full py-1 text-left text-[11px] font-medium text-emerald-400 hover:text-emerald-300"
                    >
                      <span>Parásitos (Estadios)</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer info: academic disclaimer */}
        <div className="border-t border-slate-800 p-3.5 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
            <span>Fase 4C: Catálogo e imágenes</span>
          </div>
          <p className="mt-1 text-[10px] leading-tight text-slate-500">
            Atlas de referencia para educación médica. Datos farmacológicos sujetos a sensibilidad local y antibiograma.
          </p>
        </div>
      </aside>
    </>
  );
};
