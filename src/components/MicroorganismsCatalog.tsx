import { ReferenceCatalogPanel } from './ReferenceCatalogPanel';
import React, { useState } from 'react';
import { Microorganism, MicroorganismCategory, ParasiteTaxonGroup } from '../types/microorganism';
import { MicroorganismCard } from './MicroorganismCard';
import { Search, Filter, Microscope, RotateCcw } from 'lucide-react';

interface MicroorganismsCatalogProps {
  microorganisms: Microorganism[];
  onSelectOrganism: (organism: Microorganism) => void;
  onToggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  onAddToCompare: (organism: Microorganism) => void;
  initialCategory?: MicroorganismCategory | 'all';
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onAddReferences: () => number;
  onExportBackup: () => Promise<void>;
}

export const MicroorganismsCatalog: React.FC<MicroorganismsCatalogProps> = ({
  microorganisms,
  onSelectOrganism,
  onToggleBookmark,
  isBookmarked,
  onAddToCompare,
  initialCategory = 'all',
  searchQuery,
  onSearchChange,
  onAddReferences,
  onExportBackup,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MicroorganismCategory | 'all'>(initialCategory);
  const [selectedParasiteGroup, setSelectedParasiteGroup] = useState<ParasiteTaxonGroup | 'all'>('all');
  const [onlyGuatemalaPriority, setOnlyGuatemalaPriority] = useState<boolean>(false);

  // Filter microorganisms based on category, search, and priority
  const filteredMicroorganisms = microorganisms.filter((m) => {
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesParasiteGroup = selectedParasiteGroup === 'all' || m.parasiteGroup === selectedParasiteGroup;
    const matchesPriority = !onlyGuatemalaPriority || m.guatemalaRelevance.priorityLevel === 'Alta';

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory && matchesParasiteGroup && matchesPriority;

    const matchesSearch = 
      m.scientificName.toLowerCase().includes(q) ||
      (m.commonName && m.commonName.toLowerCase().includes(q)) ||
      m.taxonomy.family.toLowerCase().includes(q) ||
      (m.vector && m.vector.toLowerCase().includes(q)) ||
      m.associatedDiseases.some(d => 
        d.name.toLowerCase().includes(q) || 
        d.description.toLowerCase().includes(q) || 
        d.clinicalPresentation.some(cp => cp.toLowerCase().includes(q))
      ) ||
      m.signsAndSymptoms.some(s => s.toLowerCase().includes(q)) ||
      m.complications.some(c => c.toLowerCase().includes(q)) ||
      m.morphology.shape.toLowerCase().includes(q) ||
      (m.morphology.gramStain && m.morphology.gramStain.toLowerCase().includes(q)) ||
      m.transmissionRoute.some(t => t.toLowerCase().includes(q)) ||
      (m.parasiticStages && m.parasiticStages.some(st => st.name.toLowerCase().includes(q) || st.stageType.toLowerCase().includes(q))) ||
      m.guatemalaRelevance.departmentsWithHighPrevalence.some(dept => dept.toLowerCase().includes(q));

    return matchesCategory && matchesParasiteGroup && matchesPriority && matchesSearch;
  });

  const categoryCounts = {
    all: microorganisms.length,
    bacteria: microorganisms.filter(m => m.category === 'bacteria').length,
    virus: microorganisms.filter(m => m.category === 'virus').length,
    parasito: microorganisms.filter(m => m.category === 'parasito').length,
    hongo: microorganisms.filter(m => m.category === 'hongo').length,
  };

  return (
    <div className="space-y-6">
      {/* Catalog Header */}
      <div className="rounded-xl border border-sky-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
          <Microscope className="h-4 w-4" />
          <span>Taxonomía y Microbiología Médica</span>
        </div>
        <h2 className="mt-1 text-2xl font-black text-slate-900 tracking-tight">
          Catálogo Sistemático de Microorganismos
        </h2>
        <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed">
          Base de datos estructurada con fichas técnicas completas, estadios biológicos parasitológicos, guías diagnósticas y consideraciones terapéuticas basadas en evidencia.
        </p>
      </div>

      <ReferenceCatalogPanel organisms={microorganisms} onSelect={onSelectOrganism} onAdd={onAddReferences} onBackup={onExportBackup} />

      {/* Filter and Search Controls (Segmented buttons - clean anti-slop style) */}
      <div className="space-y-3">
        {/* Category Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1 p-1 bg-slate-200/80 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => { setSelectedCategory('all'); setSelectedParasiteGroup('all'); }}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({categoryCounts.all})
            </button>

            <button
              type="button"
              onClick={() => { setSelectedCategory('bacteria'); setSelectedParasiteGroup('all'); }}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                selectedCategory === 'bacteria'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bacterias ({categoryCounts.bacteria})
            </button>

            <button
              type="button"
              onClick={() => { setSelectedCategory('virus'); setSelectedParasiteGroup('all'); }}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                selectedCategory === 'virus'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Virus ({categoryCounts.virus})
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('parasito')}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                selectedCategory === 'parasito'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Parásitos ({categoryCounts.parasito})
            </button>

            <button
              type="button"
              onClick={() => { setSelectedCategory('hongo'); setSelectedParasiteGroup('all'); }}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                selectedCategory === 'hongo'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hongos ({categoryCounts.hongo})
            </button>
          </div>

          {/* High Priority Guatemala Checkbox */}
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyGuatemalaPriority}
              onChange={(e) => setOnlyGuatemalaPriority(e.target.checked)}
              className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
            />
            <span>Solo Alta Prioridad en Guatemala</span>
          </label>
        </div>

        {/* Parasite Subclassification (Protozoos, Céstodos, Nematodos, Tremátodos) */}
        {selectedCategory === 'parasito' && (
          <div className="flex items-center gap-2 p-2 bg-emerald-50 rounded-lg border border-emerald-100 text-xs">
            <span className="font-bold text-emerald-950 text-[11px] uppercase tracking-wide">
              Subgrupo Parasitario:
            </span>
            <div className="flex flex-wrap gap-1">
              {(['all', 'protozoo', 'cestodo', 'nematodo', 'trematodo', 'filaria'] as const).map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setSelectedParasiteGroup(group)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors capitalize ${
                    selectedParasiteGroup === group
                      ? 'bg-emerald-800 text-white'
                      : 'bg-white text-emerald-800 hover:bg-emerald-100/70 border border-emerald-200'
                  }`}
                >
                  {group === 'all' ? 'Todos los grupos' : group}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search query feedback */}
        {searchQuery && (
          <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-100 px-3 py-2 rounded-lg">
            <div>
              Resultados para: <span className="font-bold text-slate-800">"{searchQuery}"</span> ({filteredMicroorganisms.length} registros)
            </div>
            <button
              onClick={() => onSearchChange('')}
              className="text-sky-700 hover:text-sky-900 font-semibold"
            >
              Borrar filtro
            </button>
          </div>
        )}
      </div>

      {/* Microorganisms Cards Grid */}
      {filteredMicroorganisms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMicroorganisms.map((m) => (
            <MicroorganismCard
              key={m.id}
              organism={m}
              onSelect={onSelectOrganism}
              onToggleBookmark={onToggleBookmark}
              isBookmarked={isBookmarked(m.id)}
              onAddToCompare={onAddToCompare}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-12 text-center text-xs text-slate-500 space-y-3">
          <Microscope className="mx-auto h-8 w-8 text-slate-400" />
          <div className="font-bold text-slate-700 text-sm">
            No se encontraron microorganismos con los criterios seleccionados
          </div>
          <p className="max-w-md mx-auto text-slate-500">
            Intenta restablecer los filtros de categoría o buscar por otro término morfológico o geográfico.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSelectedParasiteGroup('all');
              setOnlyGuatemalaPriority(false);
              onSearchChange('');
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-1.5 font-semibold text-white shadow-xs hover:bg-slate-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Restablecer Filtros</span>
          </button>
        </div>
      )}
    </div>
  );
};
