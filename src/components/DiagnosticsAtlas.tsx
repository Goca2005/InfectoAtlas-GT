import React, { useState, useMemo } from 'react';
import { DIAGNOSTIC_TECHNIQUES } from '../data/diagnostics';
import { PARASITOLOGY_ATLAS_STAGES } from '../data/parasitologyAtlasData';
import { AtlasParasiteStage, ClinicalSampleCategory } from '../types/microscopyAtlas';
import { Microorganism, ParasiteTaxonGroup, ParasiticStageType } from '../types/microorganism';
import { MicroscopicStageVisualizer } from './MicroscopicStageVisualizer';
import { MicroscopicStageDetailModal } from './MicroscopicStageDetailModal';
import { MicroscopeStructureComparator } from './MicroscopeStructureComparator';
import { DiagnosticQuizModule } from './DiagnosticQuizModule';
import { 
  Microscope, 
  Search, 
  Filter, 
  Eye, 
  GitCompare, 
  Layers, 
  Clock, 
  Hospital, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  ExternalLink,
  BookOpen,
  HelpCircle,
  FileQuestion,
  ChevronRight,
  Maximize2,
  FileText
} from 'lucide-react';

interface DiagnosticsAtlasProps {
  microorganisms?: Microorganism[];
  onSelectOrganism?: (organism: Microorganism) => void;
  initialTab?: 'asistente' | 'galeria' | 'comparador' | 'taller' | 'tecnicas';
}

type AtlasTab = 'asistente' | 'galeria' | 'comparador' | 'taller' | 'tecnicas';

export const DiagnosticsAtlas: React.FC<DiagnosticsAtlasProps> = ({
  microorganisms = [],
  onSelectOrganism,
  initialTab = 'asistente'
}) => {
  const [activeTab, setActiveTab] = useState<AtlasTab>(initialTab);

  // Selected stage for expanded detail modal
  const [selectedStageForModal, setSelectedStageForModal] = useState<AtlasParasiteStage | null>(null);

  // Preselected stage for comparator
  const [stageToCompare, setStageToCompare] = useState<AtlasParasiteStage | undefined>(undefined);

  // ==========================================
  // TAB 1: ASISTENTE INTERACTIVO "¿QUÉ ESTOY VIENDO?"
  // ==========================================
  const [assistantSampleFilter, setAssistantSampleFilter] = useState<string>('all');
  const [assistantMorphologyFilter, setAssistantMorphologyFilter] = useState<string>('all');
  const [assistantStainFilter, setAssistantStainFilter] = useState<string>('all');
  const [assistantSearchQuery, setAssistantSearchQuery] = useState<string>('');

  // Quick helper finding tags
  const QUICK_FINDING_TAGS = [
    { label: 'Anillos con doble cromatina', query: 'doble cromatina' },
    { label: 'Gametocito en semiluna', query: 'semiluna' },
    { label: 'Punteado de Schüffner', query: 'Schüffner' },
    { label: 'Quiste con 4 núcleos', query: '4 núcleos' },
    { label: 'Eritrofagocitosis activa', query: 'eritrofagocitosis' },
    { label: 'Disco suctorio ventral', query: 'disco suctorio' },
    { label: 'Huevo mamelonado pardo', query: 'mamelonado' },
    { label: 'Huevo asimétrico en "D"', query: 'plano-convexo' },
    { label: 'Tapones polares mucosos', query: 'tapones polares' },
    { label: 'Embrióforo estriado radial', query: 'estriado radial' },
    { label: 'Larva viva vestíbulo corto', query: 'vestíbulo bucal corto' },
    { label: 'Tripomastigote en "C"', query: 'cinetoplasto' },
    { label: 'Ooquiste Kinyoun fucsia', query: 'ácido-alcohol' }
  ];

  const filteredAssistantStages = useMemo(() => {
    return PARASITOLOGY_ATLAS_STAGES.filter((stage) => {
      // Sample filter
      if (assistantSampleFilter !== 'all' && !stage.clinicalSpecimen.toLowerCase().includes(assistantSampleFilter.toLowerCase())) {
        return false;
      }
      // Morphology filter
      if (assistantMorphologyFilter !== 'all' && stage.stageType !== assistantMorphologyFilter) {
        return false;
      }
      // Stain filter
      if (assistantStainFilter !== 'all' && !stage.stainUsed.toLowerCase().includes(assistantStainFilter.toLowerCase())) {
        return false;
      }
      // Search query
      if (assistantSearchQuery.trim()) {
        const q = assistantSearchQuery.toLowerCase();
        const matchesName = stage.scientificName.toLowerCase().includes(q) || stage.stageName.toLowerCase().includes(q);
        const matchesMorph = stage.detailedMorphology.toLowerCase().includes(q);
        const matchesFindings = stage.specificMicroscopicFindings.some(f => f.toLowerCase().includes(q));
        const matchesDiff = stage.differentialCharacteristics.some(d => d.toLowerCase().includes(q));
        const matchesDisease = stage.associatedDisease.toLowerCase().includes(q);
        return matchesName || matchesMorph || matchesFindings || matchesDiff || matchesDisease;
      }
      return true;
    });
  }, [assistantSampleFilter, assistantMorphologyFilter, assistantStainFilter, assistantSearchQuery]);

  // ==========================================
  // TAB 2: GALERÍA DE ESTADIOS DIAGNÓSTICOS
  // ==========================================
  const [gallerySearchQuery, setGallerySearchQuery] = useState<string>('');
  const [galleryGroupFilter, setGalleryGroupFilter] = useState<ParasiteTaxonGroup | 'all'>('all');
  const [galleryStageTypeFilter, setGalleryStageTypeFilter] = useState<ParasiticStageType | 'all'>('all');
  const [galleryRoleFilter, setGalleryRoleFilter] = useState<'all' | 'diagnostic' | 'infective' | 'both'>('all');

  const filteredGalleryStages = useMemo(() => {
    return PARASITOLOGY_ATLAS_STAGES.filter((stage) => {
      // Group filter (Protozoos, Nematodos, Cestodos, Trematodos, Ectoparásitos)
      if (galleryGroupFilter !== 'all' && stage.parasiteGroup !== galleryGroupFilter) {
        return false;
      }
      // Stage type filter (Huevo, Quiste, Trofozoíto, Larva, etc.)
      if (galleryStageTypeFilter !== 'all' && stage.stageType !== galleryStageTypeFilter) {
        return false;
      }
      // Role filter
      if (galleryRoleFilter === 'diagnostic' && !stage.isDiagnosticStage) return false;
      if (galleryRoleFilter === 'infective' && !stage.isInfectiveStage) return false;
      if (galleryRoleFilter === 'both' && (!stage.isDiagnosticStage || !stage.isInfectiveStage)) return false;

      // Text query
      if (gallerySearchQuery.trim()) {
        const q = gallerySearchQuery.toLowerCase();
        const matchesName = stage.scientificName.toLowerCase().includes(q) || stage.stageName.toLowerCase().includes(q);
        const matchesCommon = stage.commonName?.toLowerCase().includes(q) ?? false;
        const matchesFindings = stage.specificMicroscopicFindings.some(f => f.toLowerCase().includes(q));
        const matchesDiff = stage.differentialCharacteristics.some(d => d.toLowerCase().includes(q));
        const matchesDisease = stage.associatedDisease.toLowerCase().includes(q);
        return matchesName || matchesCommon || matchesFindings || matchesDiff || matchesDisease;
      }
      return true;
    });
  }, [galleryGroupFilter, galleryStageTypeFilter, galleryRoleFilter, gallerySearchQuery]);

  // ==========================================
  // TAB 5: TÉCNICAS Y PROTOCOLOS
  // ==========================================
  const [selectedTechId, setSelectedTechId] = useState<string>(DIAGNOSTIC_TECHNIQUES[0]?.id ?? '');
  const selectedTechnique = DIAGNOSTIC_TECHNIQUES.find(t => t.id === selectedTechId) ?? DIAGNOSTIC_TECHNIQUES[0];

  const handleOpenComparatorWithStage = (stage: AtlasParasiteStage) => {
    setStageToCompare(stage);
    setSelectedStageForModal(null);
    setActiveTab('comparador');
  };

  const handleOpenMicroorganismFullDossier = (organismId: string) => {
    const org = microorganisms.find(m => m.id === organismId);
    if (org && onSelectOrganism) {
      onSelectOrganism(org);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="rounded-2xl border border-sky-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
              <Microscope className="h-4 w-4" />
              <span>Microscopía Clínica & Parasitología Médica</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Atlas Diagnóstico Microscópico
            </h2>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Módulo integral interactivo para el reconocimiento morfológico celular, estadios biológicos, muestras clínicas, tinciones y diagnóstico diferencial en Guatemala.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-sky-800 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100">
              {PARASITOLOGY_ATLAS_STAGES.length} Estadios Catalogados
            </span>
          </div>
        </div>

        {/* Navigation Tabs Header */}
        <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-100 pt-4">
          {[
            { id: 'asistente', label: '¿Qué estoy viendo en el microscopio?', icon: Eye },
            { id: 'galeria', label: 'Galería de Estadios Diagnósticos', icon: Microscope },
            { id: 'comparador', label: 'Comparador de Estructuras', icon: GitCompare },
            { id: 'taller', label: 'Desafío Diagnóstico (Casos Reales)', icon: FileQuestion },
            { id: 'tecnicas', label: 'Técnicas y Protocolos de Laboratorio', icon: Layers }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AtlasTab)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-sky-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: ¿QUÉ ESTOY VIENDO EN EL MICROSCOPIO?               */}
      {/* ======================================================== */}
      {activeTab === 'asistente' && (
        <div className="space-y-6">
          
          {/* Interactive Guided Finder Box */}
          <div className="rounded-xl border border-sky-300 bg-linear-to-r from-sky-50/80 via-white to-sky-50/80 p-5 sm:p-6 shadow-xs space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800">
                <Eye className="h-4 w-4" />
                <span>Asistente de Identificación Rápida</span>
              </div>
              <h3 className="text-xl font-black text-slate-950 tracking-tight mt-0.5">
                ¿Qué estoy viendo en el microscopio?
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Filtre por tipo de muestra, forma microscópica observada o escriba un hallazgo clave para identificar el patógeno.
              </p>
            </div>

            {/* Keyword Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={assistantSearchQuery}
                onChange={(e) => setAssistantSearchQuery(e.target.value)}
                placeholder="Describa el hallazgo: ej. 'semiluna', 'tapones polares', 'eritrofagocitosis', '4 núcleos', 'mamelonado'..."
                className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-sky-600 focus:outline-none shadow-xs"
              />
              {assistantSearchQuery && (
                <button
                  type="button"
                  onClick={() => setAssistantSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Quick Keyword Pills */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Hallazgos visuales patognomónicos frecuentes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_FINDING_TAGS.map((tag, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAssistantSearchQuery(tag.query)}
                    className="px-2 py-1 rounded-md text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:border-sky-500 hover:bg-sky-50 transition-colors shadow-2xs"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Guided Selector Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-sky-100 text-xs">
              
              {/* Sample */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  1. Muestra Clínica:
                </label>
                <select
                  value={assistantSampleFilter}
                  onChange={(e) => setAssistantSampleFilter(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs font-medium text-slate-800 focus:border-sky-600 focus:outline-none"
                >
                  <option value="all">Todas las muestras</option>
                  <option value="Heces formadas">Heces formadas / pastosas</option>
                  <option value="Heces diarreicas">Heces diarreicas / moco y sangre</option>
                  <option value="Sangre capilar">Sangre periférica / Gota gruesa</option>
                  <option value="Cinta adhesiva">Cinta perianal (Graham)</option>
                  <option value="Biopsia tisular">Biopsia de piel / tisular</option>
                  <option value="Esputo">Esputo / Lavado bronquial</option>
                </select>
              </div>

              {/* Morphology / Stage Type */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  2. Morfología que observa:
                </label>
                <select
                  value={assistantMorphologyFilter}
                  onChange={(e) => setAssistantMorphologyFilter(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs font-medium text-slate-800 focus:border-sky-600 focus:outline-none"
                >
                  <option value="all">Cualquier morfología</option>
                  <option value="quiste">Quiste esférico / ovalado</option>
                  <option value="trofozoito">Trofozoíto ameboide / anular / piriforme</option>
                  <option value="huevo">Huevo (mamelonado, estriado, con tapones, en D)</option>
                  <option value="larva">Larva móvil (rabditiforme o filariforme)</option>
                  <option value="gametocito">Gametocito (semilunar o esférico)</option>
                  <option value="esquizonte">Esquizonte multinucleado</option>
                  <option value="tripomastigote">Tripomastigote flagelado en "C"</option>
                  <option value="amastigote">Amastigote intracelular en nidos</option>
                  <option value="proglotide">Proglótide segmentada con útero</option>
                  <option value="ooquiste">Ooquiste ácido-alcohol resistente</option>
                  <option value="adulto">Ácaro / Insecto adulto</option>
                </select>
              </div>

              {/* Stain */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  3. Tinción o Preparación:
                </label>
                <select
                  value={assistantStainFilter}
                  onChange={(e) => setAssistantStainFilter(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs font-medium text-slate-800 focus:border-sky-600 focus:outline-none"
                >
                  <option value="all">Cualquier tinción / montaje</option>
                  <option value="Giemsa">Tinción de Giemsa / Wright</option>
                  <option value="Lugol">Lugol parasitológico</option>
                  <option value="salina">Solución salina al 0.9% en fresco</option>
                  <option value="Kinyoun">Tinción de Kinyoun (BAAR fecal)</option>
                  <option value="tinta china">Inyección con tinta china</option>
                  <option value="aceite mineral">Aceite mineral (Prueba de Müller)</option>
                </select>
              </div>

            </div>

            {/* Reset Filters */}
            {(assistantSampleFilter !== 'all' || assistantMorphologyFilter !== 'all' || assistantStainFilter !== 'all' || assistantSearchQuery) && (
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setAssistantSampleFilter('all');
                    setAssistantMorphologyFilter('all');
                    setAssistantStainFilter('all');
                    setAssistantSearchQuery('');
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-800 hover:text-sky-950"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Restablecer criterios del asistente</span>
                </button>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Coincidencias diagnósticas encontradas: ({filteredAssistantStages.length})
            </span>
            <span className="text-[11px] text-slate-500">
              Haga clic en cualquier tarjeta para abrir el visor microscópico ampliado
            </span>
          </div>

          {/* Results Cards Grid */}
          {filteredAssistantStages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAssistantStages.map((stage) => (
                <div
                  key={stage.id}
                  onClick={() => setSelectedStageForModal(stage)}
                  className="group rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-1 text-[10px]">
                      <span className="font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                        {stage.parasiteGroup.toUpperCase()} • {stage.stageType.toUpperCase()}
                      </span>
                      {stage.isDiagnosticStage && (
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                          Diagnóstico
                        </span>
                      )}
                    </div>

                    {/* Scientific Title */}
                    <div>
                      <h4 className="font-black text-slate-900 text-sm italic group-hover:text-sky-800 transition-colors">
                        {stage.scientificName}
                      </h4>
                      <p className="text-xs font-semibold text-slate-700">{stage.stageName}</p>
                    </div>

                    {/* Centered Optical Field Eyepiece */}
                    <div className="flex justify-center p-2.5 bg-slate-900 rounded-lg">
                      <MicroscopicStageVisualizer stage={stage} size="sm" showAnnotations={false} />
                    </div>

                    {/* Key Dimensions & Sample */}
                    <div className="space-y-1 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <div>
                        <span className="font-semibold text-slate-500">Tamaño: </span>
                        <span className="font-mono font-bold text-slate-900">{stage.approximateDimensions ?? 'Ver ficha'}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-500">Muestra: </span>
                        <span className="font-medium text-slate-900">{stage.clinicalSpecimen}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-slate-500">Tinción: </span>
                        <span className="font-bold text-sky-800">{stage.stainUsed}</span>
                      </div>
                    </div>

                    {/* Primary Differential Characteristic */}
                    <div className="text-[11px] text-slate-700 leading-snug line-clamp-2">
                      <strong className="text-slate-900">Hallazgo clave: </strong>
                      {stage.specificMicroscopicFindings[0]}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700 group-hover:text-sky-900">
                    <span className="flex items-center gap-1">
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Examinar en visor</span>
                    </span>
                    <ChevronRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white p-8 text-center space-y-3">
              <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">
                No se encontraron estadios con los filtros seleccionados
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Intente utilizar un término más general o haga clic en restablecer los criterios del asistente.
              </p>
              <button
                type="button"
                onClick={() => {
                  setAssistantSampleFilter('all');
                  setAssistantMorphologyFilter('all');
                  setAssistantStainFilter('all');
                  setAssistantSearchQuery('');
                }}
                className="px-4 py-2 rounded-lg bg-sky-700 text-xs font-bold text-white hover:bg-sky-800 transition-colors"
              >
                Ver todos los estadios
              </button>
            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: GALERÍA DE ESTADIOS DIAGNÓSTICOS                  */}
      {/* ======================================================== */}
      {activeTab === 'galeria' && (
        <div className="space-y-6">
          
          {/* Gallery Filters Bar */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={gallerySearchQuery}
                onChange={(e) => setGallerySearchQuery(e.target.value)}
                placeholder="Buscar por microorganismo, estadio, estructura o enfermedad (ej. Plasmodium, quiste, Giardia, Graham)..."
                className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-sky-600 focus:outline-none shadow-xs"
              />
            </div>

            {/* Classification Tabs (Protozoos, Nematodos, Cestodos, Trematodos, Ectoparásitos) */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                Clasificación Parasitológica:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'Todos los Grupos' },
                  { id: 'protozoo', label: 'Protozoos (Amebas, Flagelados, Apicomplexa)' },
                  { id: 'nematodo', label: 'Nematodos (incluye Filarias)' },
                  { id: 'cestodo', label: 'Cestodos (Tenias, Hymenolepis)' },
                  { id: 'trematodo', label: 'Trematodos (Fasciola)' },
                  { id: 'ectoparasito', label: 'Ectoparásitos (Ácaros, Piojos)' }
                ].map((grp) => {
                  const isActive = galleryGroupFilter === grp.id;
                  return (
                    <button
                      key={grp.id}
                      type="button"
                      onClick={() => setGalleryGroupFilter(grp.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-sky-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {grp.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stage Type & Role Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Filtrar por Estadio Biológico:
                </label>
                <select
                  value={galleryStageTypeFilter}
                  onChange={(e) => setGalleryStageTypeFilter(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs font-semibold text-slate-800 focus:border-sky-600 focus:outline-none"
                >
                  <option value="all">Todos los estadios</option>
                  <option value="huevo">Huevo</option>
                  <option value="quiste">Quiste</option>
                  <option value="trofozoito">Trofozoíto</option>
                  <option value="larva">Larva</option>
                  <option value="ooquiste">Ooquiste</option>
                  <option value="gametocito">Gametocito</option>
                  <option value="esquizonte">Esquizonte</option>
                  <option value="amastigote">Amastigote</option>
                  <option value="tripomastigote">Tripomastigote</option>
                  <option value="microfilaria">Microfilaria</option>
                  <option value="proglotide">Proglótide</option>
                  <option value="adulto">Adulto</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Rol Biológico en el Ciclo:
                </label>
                <select
                  value={galleryRoleFilter}
                  onChange={(e) => setGalleryRoleFilter(e.target.value as any)}
                  className="w-full rounded-lg border border-slate-300 bg-white p-2 text-xs font-semibold text-slate-800 focus:border-sky-600 focus:outline-none"
                >
                  <option value="all">Cualquier rol</option>
                  <option value="diagnostic">Solo Estadio Diagnóstico</option>
                  <option value="infective">Solo Estadio Infectante</option>
                  <option value="both">Ambos (Diagnóstico e Infectante simultáneamente)</option>
                </select>
              </div>
            </div>

          </div>

          {/* Gallery Count */}
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span className="font-bold text-slate-900">
              Mostrando {filteredGalleryStages.length} de {PARASITOLOGY_ATLAS_STAGES.length} estadios parasitológicos
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGalleryStages.map((stage) => (
              <div
                key={stage.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs hover:border-sky-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  
                  {/* Taxonomy header */}
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                        {stage.parasiteGroup.toUpperCase()}
                      </span>
                      <h4 className="text-base font-black text-slate-900 italic mt-1">
                        {stage.scientificName}
                      </h4>
                      <p className="text-xs font-bold text-slate-700">{stage.stageName}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {stage.isDiagnosticStage && (
                        <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                          Diagnóstico
                        </span>
                      )}
                      {stage.isInfectiveStage && (
                        <span className="text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                          Infectante
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Microscope Optical Preview */}
                  <div 
                    onClick={() => setSelectedStageForModal(stage)}
                    className="flex justify-center p-3 bg-slate-900 rounded-xl cursor-pointer hover:ring-2 hover:ring-sky-500 transition-all"
                    title="Clic para ampliar visor"
                  >
                    <MicroscopicStageVisualizer stage={stage} size="md" showAnnotations={true} />
                  </div>

                  {/* Technical Summary */}
                  <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-600">
                    <div>
                      <span className="font-semibold text-slate-500">Muestra: </span>
                      <span className="font-medium text-slate-900">{stage.clinicalSpecimen}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">Tinción: </span>
                      <span className="font-bold text-sky-800">{stage.stainUsed}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">Enfermedad: </span>
                      <span className="font-medium text-slate-900">{stage.associatedDisease}</span>
                    </div>
                  </div>

                  {/* Key Finding */}
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {stage.detailedMorphology}
                  </p>

                </div>

                {/* Bottom Actions Buttons */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedStageForModal(stage)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-700 text-xs font-bold text-white hover:bg-sky-800 transition-colors shadow-2xs"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>Visor Ampliado</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenComparatorWithStage(stage)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Comparar morfología"
                  >
                    <GitCompare className="h-3.5 w-3.5 text-sky-600" />
                    <span>Comparar</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: COMPARADOR DE ESTRUCTURAS                         */}
      {/* ======================================================== */}
      {activeTab === 'comparador' && (
        <MicroscopeStructureComparator
          initialStageA={stageToCompare}
          onSelectStageForDetail={(st) => setSelectedStageForModal(st)}
        />
      )}

      {/* ======================================================== */}
      {/* TAB 4: DESAFÍO DIAGNÓSTICO (CASOS REALES)                */}
      {/* ======================================================== */}
      {activeTab === 'taller' && (
        <DiagnosticQuizModule
          onOpenStageInModal={(st) => setSelectedStageForModal(st)}
        />
      )}

      {/* ======================================================== */}
      {/* TAB 5: TÉCNICAS Y PROTOCOLOS DE LABORATORIO              */}
      {/* ======================================================== */}
      {activeTab === 'tecnicas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Tabs (Techniques List) */}
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
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" />
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
      )}

      {/* ======================================================== */}
      {/* EXPANDED MICROSCOPIC STAGE DETAIL MODAL                  */}
      {/* ======================================================== */}
      <MicroscopicStageDetailModal
        stage={selectedStageForModal}
        onClose={() => setSelectedStageForModal(null)}
        onOpenMicroorganismDetail={handleOpenMicroorganismFullDossier}
        onOpenComparatorWithStage={handleOpenComparatorWithStage}
        microorganisms={microorganisms}
      />

    </div>
  );
};
