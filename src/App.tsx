import React, { useState, useEffect } from 'react';
import { Sidebar, ActiveNavSection } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeDashboard } from './components/HomeDashboard';
import { MicroorganismsCatalog } from './components/MicroorganismsCatalog';
import { VectorGallery } from './components/VectorGallery';
import { DiseasesView } from './components/DiseasesView';
import { DiagnosticsAtlas } from './components/DiagnosticsAtlas';
import { GuatemalaExplorer } from './components/GuatemalaExplorer';
import { EpidemiologyView } from './components/EpidemiologyView';
import { StudyHub } from './components/StudyHub';
import { BibliographyView } from './components/BibliographyView';
import { ComparatorView } from './components/ComparatorView';
import { MicroorganismDetailModal } from './components/MicroorganismDetailModal';
import { ComparatorModal } from './components/ComparatorModal';
import { storageService } from './services/storageService';
import { epidemiologyService } from './services/epidemiologyService';
import { Microorganism, MicroorganismCategory } from './types/microorganism';

export default function App() {
  const [currentSection, setCurrentSection] = useState<ActiveNavSection>('inicio');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  
  // Data State
  const [microorganisms, setMicroorganisms] = useState<Microorganism[]>([]);
  const [selectedOrganism, setSelectedOrganism] = useState<Microorganism | null>(null);
  const [catalogInitialCategory, setCatalogInitialCategory] = useState<MicroorganismCategory | 'all'>('all');
  
  // Modals & Comparator
  const [isComparatorOpen, setIsComparatorOpen] = useState<boolean>(false);
  const [comparatorInitialOrganism, setComparatorInitialOrganism] = useState<Microorganism | null>(null);

  // Bookmarks reactive state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // Load initial microorganisms & bookmarks
  useEffect(() => {
    storageService.getMicroorganisms().then((list) => {
      setMicroorganisms(list);
    });
    setBookmarkedIds(storageService.getBookmarks());
  }, []);

  const handleToggleBookmark = (id: string) => {
    storageService.toggleBookmark(id);
    setBookmarkedIds(storageService.getBookmarks());
  };

  const handleSelectSection = (section: ActiveNavSection, categoryFilter?: MicroorganismCategory) => {
    if (categoryFilter) {
      setCatalogInitialCategory(categoryFilter);
    } else {
      setCatalogInitialCategory('all');
    }

    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenComparatorWithOrganism = (organism: Microorganism) => {
    setComparatorInitialOrganism(organism);
    setIsComparatorOpen(true);
  };

  const sectionTitles: Record<ActiveNavSection, string> = {
    'inicio': 'Panel General',
    'microorganismos': 'Catálogo de Microorganismos',
    'vectores': 'Vectores Artrópodos en Guatemala',
    'enfermedades': 'Enfermedades Infecciosas',
    'atlas-diagnostico': 'Atlas Diagnóstico & Microscopía',
    'epidemiologia': 'Vigilancia Epidemiológica Oficial',
    'guatemala': 'Vigilancia en los 22 Departamentos',
    'estudiar': 'Módulo de Estudio & Flashcards',
    'comparador': 'Comparador de Patógenos',
    'fuentes': 'Fuentes Científicas y Bibliografía'
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Persistent Desktop & Responsive Mobile Sidebar */}
      <Sidebar
        currentSection={currentSection}
        onSelectSection={handleSelectSection}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        microorganismCount={microorganisms.length}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <Header
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (q && currentSection === 'inicio') {
              setCurrentSection('microorganismos');
            }
          }}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenQuickComparator={() => setIsComparatorOpen(true)}
          activeSectionTitle={sectionTitles[currentSection]}
          totalAlertsCount={epidemiologyService.getReports().length}
          onViewAlerts={() => setCurrentSection('epidemiologia')}
        />

        {/* Dynamic Section Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentSection === 'inicio' && (
            <HomeDashboard
              microorganisms={microorganisms}
              onNavigateSection={handleSelectSection}
              onSelectOrganism={(org) => setSelectedOrganism(org)}
              onOpenComparator={() => setIsComparatorOpen(true)}
              searchQuery={searchQuery}
              onSearchChange={(q) => {
                setSearchQuery(q);
                setCurrentSection('microorganismos');
              }}
            />
          )}

          {currentSection === 'microorganismos' && (
            <MicroorganismsCatalog
              microorganisms={microorganisms}
              onSelectOrganism={(org) => setSelectedOrganism(org)}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={(id) => bookmarkedIds.includes(id)}
              onAddToCompare={handleOpenComparatorWithOrganism}
              initialCategory={catalogInitialCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}

          {currentSection === 'vectores' && (
            <VectorGallery
              onSelectPathogen={(pathogenId) => {
                const found = microorganisms.find(m => m.id === pathogenId);
                if (found) setSelectedOrganism(found);
              }}
            />
          )}

          {currentSection === 'enfermedades' && (
            <DiseasesView
              microorganisms={microorganisms}
              onSelectOrganism={(org) => setSelectedOrganism(org)}
            />
          )}

          {currentSection === 'atlas-diagnostico' && (
            <DiagnosticsAtlas />
          )}

          {currentSection === 'epidemiologia' && (
            <EpidemiologyView
              onGoToGuatemala={() => setCurrentSection('guatemala')}
            />
          )}

          {currentSection === 'guatemala' && (
            <GuatemalaExplorer
              onSelectPathogenBySearch={(term) => {
                setSearchQuery(term);
                setCurrentSection('microorganismos');
              }}
            />
          )}

          {currentSection === 'estudiar' && (
            <StudyHub
              microorganisms={microorganisms}
              onSelectOrganism={(org) => setSelectedOrganism(org)}
            />
          )}

          {currentSection === 'comparador' && (
            <ComparatorView
              microorganisms={microorganisms}
              onSelectOrganismForDetail={(org) => setSelectedOrganism(org)}
              initialOrganismAId={comparatorInitialOrganism?.id}
            />
          )}

          {currentSection === 'fuentes' && (
            <BibliographyView />
          )}
        </main>
      </div>

      {/* Microorganism Detail Modal (Resumen Rápido & Ficha Completa) */}
      <MicroorganismDetailModal
        organism={selectedOrganism}
        onClose={() => setSelectedOrganism(null)}
        onAddToCompare={handleOpenComparatorWithOrganism}
      />

      {/* Side-by-Side Comparator Modal */}
      <ComparatorModal
        microorganisms={microorganisms}
        initialOrganismA={comparatorInitialOrganism}
        isOpen={isComparatorOpen}
        onClose={() => setIsComparatorOpen(false)}
      />
    </div>
  );
}
