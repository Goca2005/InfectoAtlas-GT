import React, { useState } from 'react';
import { Search, Bell, Menu, Compass, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenMobileSidebar: () => void;
  onOpenQuickComparator: () => void;
  activeSectionTitle: string;
  totalAlertsCount: number;
  onViewAlerts: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenMobileSidebar,
  onOpenQuickComparator,
  activeSectionTitle,
  totalAlertsCount,
  onViewAlerts,
}) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6">
        {/* Left title & mobile hamburger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-baseline gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">Atlas Médico</span>
            <span className="text-slate-300 hidden sm:inline">/</span>
            <h1 className="text-base font-bold text-slate-900 tracking-tight sm:text-lg">
              {activeSectionTitle}
            </h1>
          </div>
        </div>

        {/* Center Search Input (Desktop & Tablet) */}
        <div className="mx-4 hidden max-w-md flex-1 md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por nombre científico, común, enfermedad o vector..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50/80 py-1.5 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-600"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile search toggle button */}
          <button
            type="button"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="Buscar"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Quick Comparator button */}
          <button
            type="button"
            onClick={onOpenQuickComparator}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 sm:px-3 text-xs font-medium text-slate-700 shadow-xs hover:border-sky-300 hover:bg-sky-50/50 hover:text-sky-800 transition-colors"
            title="Comparar dos microorganismos frente a frente"
          >
            <Compass className="h-3.5 w-3.5 text-sky-600" />
            <span className="hidden sm:inline">Comparar Especies</span>
          </button>

          {/* Real-time epidemiological notification bell */}
          <button
            type="button"
            onClick={onViewAlerts}
            className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Alertas epidemiológicas"
            title="Alertas de vigilancia"
          >
            <Bell className="h-4 w-4" />
            {totalAlertsCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-xs">
                {totalAlertsCount}
              </span>
            )}
          </button>

          {/* Independent educational badge */}
          <div className="hidden items-center gap-1 border-l border-slate-200 pl-3 xl:flex text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-sky-500"></span>
            <span>Vigilancia Epidemiológica GT</span>
          </div>
        </div>
      </div>

      {/* Mobile search drawer dropdown when opened */}
      {isMobileSearchOpen && (
        <div className="border-t border-slate-100 px-4 py-2 md:hidden bg-slate-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar microorganismo, enfermedad o vector..."
              className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-8 text-xs text-slate-900 placeholder-slate-400 focus:border-sky-600 focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
