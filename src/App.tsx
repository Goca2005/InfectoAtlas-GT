import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { buildDocumentAtlas } from './services/documentAtlas';
const MicrobeLab = lazy(() => import('./components/MicrobeLab'));
import { Sidebar, ActiveNavSection } from './components/Sidebar';
import { Header } from './components/Header';
import { HomeDashboard } from './components/HomeDashboard';
import { saveMissingReferences, normalizeScientificName } from './services/catalogExpansion';
import { createOrganismFromProposal } from './services/proposalOrganism';
import { MicroorganismsCatalog } from './components/MicroorganismsCatalog';
import { VectorGallery } from './components/VectorGallery';
import { DiseasesView } from './components/DiseasesView';
import { DiagnosticsAtlas } from './components/DiagnosticsAtlas';
import { AcademicLibrary } from './components/AcademicLibrary';
import { ReviewExtractedInfoModal } from './components/ReviewExtractedInfoModal';
import { GuatemalaExplorer } from './components/GuatemalaExplorer';
import { EpidemiologyView } from './components/EpidemiologyView';
import { StudyHub } from './components/StudyHub';
import { BibliographyView } from './components/BibliographyView';
import { ComparatorView } from './components/ComparatorView';
import { MicroorganismDetailModal } from './components/MicroorganismDetailModal';
import { ComparatorModal } from './components/ComparatorModal';
import { storageService } from './services/storageService';
import type { BackupData, BackupImportMode, BackupImportPlan } from './types/backup';
import { epidemiologyService } from './services/epidemiologyService';
import { InfectoAtlasLive } from './components/InfectoAtlasLive';
import { LIVE_EVENT } from './services/liveService';
import { appendBulletinToLibrary, OfficialBulletinRepository } from './services/officialBulletins';
import type { OfficialBulletin } from './types/officialBulletin';
import { Microorganism, MicroorganismCategory } from './types/microorganism';
import { 
  AcademicDocument, 
  ExtractionProposal, 
  AuditLogEntry 
} from './types/academicLibrary';
import { 
  INITIAL_ACADEMIC_DOCUMENTS, 
  INITIAL_EXTRACTION_PROPOSALS, 
  INITIAL_AUDIT_LOGS 
} from './data/initialAcademicLibrary';

export default function App() {
  const [currentSection, setCurrentSection] = useState<ActiveNavSection>('inicio');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  
  // Data State
  const [microorganisms, setMicroorganisms] = useState<Microorganism[]>([]);
  const [selectedOrganism, setSelectedOrganism] = useState<Microorganism | null>(null);
  const [catalogInitialCategory, setCatalogInitialCategory] = useState<MicroorganismCategory | 'all'>('all');
  
  // Academic Library & Intelligent Extraction State
  const [academicDocuments, setAcademicDocuments] = useState<AcademicDocument[]>(INITIAL_ACADEMIC_DOCUMENTS);
  const [extractionProposals, setExtractionProposals] = useState<ExtractionProposal[]>(INITIAL_EXTRACTION_PROPOSALS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [reviewDocFilter, setReviewDocFilter] = useState<string | null>(null);

  // Modals & Comparator
  const [isComparatorOpen, setIsComparatorOpen] = useState<boolean>(false);
  const [comparatorInitialOrganism, setComparatorInitialOrganism] = useState<Microorganism | null>(null);

  // Bookmarks reactive state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [backupImportPreview, setBackupImportPreview] = useState<(BackupImportPlan & { fileName: string }) | null>(null);
  const [backupImportError, setBackupImportError] = useState<string | null>(null);
  const [isApplyingBackup, setIsApplyingBackup] = useState(false);
  const documentAtlas=useMemo(()=>buildDocumentAtlas(academicDocuments,microorganisms,extractionProposals),[academicDocuments,microorganisms,extractionProposals]);
  const displayMicroorganisms=documentAtlas.organisms;

  const getCurrentBackupData = (): Promise<BackupData> => storageService.getBackupData({
    microorganisms,
    academicDocuments,
    extractionProposals,
    auditLogs,
    bookmarks: bookmarkedIds
  });

  // Load initial microorganisms & bookmarks from persistent storage
  useEffect(() => {
    storageService.getMicroorganisms().then((list) => {
      setMicroorganisms(list);
    });
    setAcademicDocuments(storageService.getAcademicDocuments());
    setExtractionProposals(storageService.getExtractionProposals());
    setAuditLogs(storageService.getAuditLogs());
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

  // Academic Library Actions with Persistent Storage Sync
  const handleSendOfficialToLibrary = (record: OfficialBulletin) => {
    const current = new OfficialBulletinRepository(localStorage).read().bulletins.find(item => item.id === record.id);
    if (!current) throw new Error('El documento ya no está en el registro.');
    const result = appendBulletinToLibrary(localStorage, current, storageService.getAcademicDocuments());
    if (!result.added) return 'Este PDF ya está en la Biblioteca Académica.';
    setAcademicDocuments(result.documents);
    return 'PDF incorporado a la Biblioteca Académica. Sus propuestas clínicas siguen pendientes de revisión.';
  };
  const handleAddAcademicDocument = (newDoc: AcademicDocument) => {
    setAcademicDocuments(prev => {
      const updated = [newDoc, ...prev];
      storageService.saveAcademicDocuments(updated);
      return updated;
    });
  };

  const handleDeleteAcademicDocument = (docId: string) => {
    setAcademicDocuments(prev => {
      const updated = prev.filter(d => d.id !== docId);
      storageService.saveAcademicDocuments(updated);
      return updated;
    });
    // Also remove pending proposals belonging to this document
    setExtractionProposals(prev => {
      const updated = prev.filter(p => p.documentId !== docId || p.status !== 'pendiente');
      storageService.saveExtractionProposals(updated);
      return updated;
    });
  };

  const handleUpdateDocumentStatus = (
    docId: string, 
    status: AcademicDocument['processingStatus'], 
    proposalsCount?: number
  ) => {
    setAcademicDocuments(prev => {
      const updated = prev.map(d => {
        if (d.id === docId) {
          return {
            ...d,
            processingStatus: status,
            extractedProposalsCount: proposalsCount !== undefined ? proposalsCount : d.extractedProposalsCount
          };
        }
        return d;
      });
      storageService.saveAcademicDocuments(updated);
      return updated;
    });
  };

  const handleUpdateDocumentPageText = (docId: string, pageNumber: number, newText: string) => {
    setAcademicDocuments(prev => {
      const updated = prev.map(d => {
        if (d.id === docId) {
          const updatedPages = d.pages.map(p => {
            if (p.pageNumber === pageNumber) {
              return {
                ...p,
                textContent: newText,
                hasExtractableText: newText.trim().length > 15,
                charCount: newText.length
              };
            }
            return p;
          });
          const unextractable = updatedPages.filter(p => !p.hasExtractableText).length;
          return { ...d, pages: updatedPages, unextractablePagesCount: unextractable };
        }
        return d;
      });
      storageService.saveAcademicDocuments(updated);
      return updated;
    });
  };

  const handleAddProposals = (newProps: ExtractionProposal[]) => {
    setExtractionProposals(prev => {
      const existingIds=new Set(prev.map(p=>p.id));
      const updated = [...newProps.filter(p=>!existingIds.has(p.id)), ...prev];
      storageService.saveExtractionProposals(updated);
      return updated;
    });
  };

  const handleOpenReviewModal = (docIdFilter?: string) => {
    setReviewDocFilter(docIdFilter || null);
    setIsReviewModalOpen(true);
  };

  const handleExportBackup = async () => {
    try {
      const jsonStr = await storageService.exportBackupJSON({
        microorganisms,
        academicDocuments,
        extractionProposals,
        auditLogs,
        bookmarks: bookmarkedIds
      });
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `InfectoAtlas_GT_Respaldo_${new Date().toISOString().split('T')[0]}.json`;
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      window.alert(`No se pudo crear el respaldo: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  const handleImportBackup = async (file: File) => {
    try {
      setBackupImportError(null);
      const text = await file.text();
      const currentData = await getCurrentBackupData();
      const plan = await storageService.inspectBackupJSON(text, currentData);
      setBackupImportPreview({ ...plan, fileName: file.name });
    } catch (error) {
      setBackupImportError(error instanceof Error ? error.message : 'No se pudo leer el archivo de respaldo.');
    }
  };

  const handleConfirmBackupImport = async (mode: BackupImportMode) => {
    if (!backupImportPreview) return;
    setIsApplyingBackup(true);
    setBackupImportError(null);
    try {
      const currentData = await getCurrentBackupData();
      const nextData = await storageService.applyBackupImport(backupImportPreview, mode, currentData);
      setMicroorganisms(nextData.microorganisms);
      setAcademicDocuments(nextData.academicDocuments);
      setExtractionProposals(nextData.extractionProposals);
      setAuditLogs(nextData.auditLogs);
      setBookmarkedIds(nextData.bookmarks);
      window.dispatchEvent(new Event(LIVE_EVENT));
      setBackupImportPreview(null);
    } catch (error) {
      setBackupImportError(error instanceof Error ? error.message : 'No se pudo aplicar el respaldo.');
    } finally {
      setIsApplyingBackup(false);
    }
  };

  const handleCancelBackupImport = () => {
    setBackupImportPreview(null);
    setBackupImportError(null);
  };

  const handleClearDemoData = () => {
    storageService.clearDemoData();
    setAcademicDocuments([]);
    setExtractionProposals([]);
    setAuditLogs([]);
  };

  // Proposal Quality Approval: applies change to real Microorganism state & logs audit
  const handleApproveProposal = (proposalId: string, customText?: string) => {
    const proposal = extractionProposals.find(p => p.id === proposalId);
    if (!proposal || proposal.status !== 'pendiente') return;
    if (proposal.isNewOrganism) {
      if (microorganisms.some(org => org.id === proposal.targetMicroorganismId || normalizeScientificName(org.scientificName) === normalizeScientificName(proposal.targetMicroorganismName))) {
        window.alert('Esta especie ya existe. Conservamos su ficha; revisa propuestas de actualización para ella.');
        return;
      }
      try { createOrganismFromProposal(proposal, proposal.proposedValue); } catch(error) { window.alert(error instanceof Error ? error.message : 'Categoría no documentada.'); return; }
    }

    const finalProposedValue = customText !== undefined ? customText : proposal.proposedValue;
    const isCustomEdited = customText !== undefined && customText !== proposal.proposedValue;

    const bibStatus: 'Verificado' | 'Fuentes pendientes de revisión' | 'Revisado' =
      proposal.verificationStatus === 'Verificado con literatura científica' ||
      proposal.verificationStatus === 'Guía oficial MSPAS (Normativa nacional)'
        ? 'Verificado'
        : 'Fuentes pendientes de revisión';

    // Apply change to target microorganism
    setMicroorganisms(prevList => {
      let updatedList: Microorganism[];
      // If it's a proposal for a brand new microorganism
      if (proposal.isNewOrganism) {
        if (prevList.some(org => org.id === proposal.targetMicroorganismId || normalizeScientificName(org.scientificName) === normalizeScientificName(proposal.targetMicroorganismName))) return prevList;
        const newOrg = createOrganismFromProposal(proposal, finalProposedValue, academicDocuments.find(doc => doc.id === proposal.documentId)?.yearOrEdition);
        updatedList = [newOrg, ...prevList];
      } else {
        // Existing microorganism modification
        updatedList = prevList.map(org => {
          if (org.id === proposal.targetMicroorganismId) {
            const updated = { ...org };
            if (proposal.field === 'Morfología microscópica') {
              updated.morphology = {
                ...updated.morphology,
                shape: `${updated.morphology.shape} [Incorporado de ${proposal.documentTitle} Pág. ${proposal.sourcePage}: ${finalProposedValue}]`
              };
            } else if (proposal.field === 'Método de identificación') {
              updated.diagnosticMethods = [
                ...updated.diagnosticMethods,
                {
                  method: `Método documentado (Pág. ${proposal.sourcePage}): ${proposal.documentTitle.slice(0, 30)}`,
                  standardRole: 'Tamizaje',
                  keyFindings: finalProposedValue
                }
              ];
            } else if (proposal.field === 'Tratamiento y manejo') {
              updated.treatment = {
                ...updated.treatment,
                firstLine: [...updated.treatment.firstLine, `[Doc Pág. ${proposal.sourcePage}]: ${finalProposedValue}`]
              };
            } else if (proposal.field === 'Epidemiología y datos Guatemala') {
              updated.guatemalaRelevance = {
                ...updated.guatemalaRelevance,
                officialNotes: `${updated.guatemalaRelevance.officialNotes} — [Actualización Pág. ${proposal.sourcePage}]: ${finalProposedValue}`
              };
            }

            // Append source to bibliography
            updated.bibliography = [
              ...updated.bibliography,
              {
                source: proposal.documentTitle,
                title: `Fragmento extraído de Pág. ${proposal.sourcePage}: ${finalProposedValue.slice(0, 80)}...`,
                year: academicDocuments.find(doc => doc.id === proposal.documentId)?.yearOrEdition || 'No informada',
                status: bibStatus
              }
            ];

            return updated;
          }
          return org;
        });
      }

      storageService.saveMicroorganisms(updatedList);
      return updatedList;
    });

    // Update proposal status
    setExtractionProposals(prev => {
      const updated = prev.map(p => {
        if (p.id === proposalId) {
          return {
            ...p,
            status: isCustomEdited ? 'editado_y_aprobado' as const : 'aprobado' as const,
            proposedValue: finalProposedValue,
            userEditedSnippet: isCustomEdited ? finalProposedValue : undefined,
            reviewedAt: new Date().toISOString()
          };
        }
        return p;
      });
      storageService.saveExtractionProposals(updated);
      return updated;
    });

    // Record Audit Log
    const newLog: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toLocaleString('es-GT'),
      documentTitle: proposal.documentTitle,
      sourcePage: proposal.sourcePage,
      microorganismId: proposal.targetMicroorganismId,
      microorganismName: proposal.targetMicroorganismName,
      field: proposal.field,
      previousValue: proposal.previousValue,
      newValue: finalProposedValue,
      originalExtractedSnippet: proposal.originalSnippet || proposal.sourceSnippet,
      editedByReviewer: isCustomEdited,
      action: isCustomEdited ? 'editado' : 'aprobado'
    };

    setAuditLogs(prev => {
      const updated = [newLog, ...prev];
      storageService.saveAuditLogs(updated);
      return updated;
    });
  };

  const handleDiscardProposal = (proposalId: string, reason?: string) => {
    // Note: Discarding a proposal NEVER modifies any microorganism record!
    setExtractionProposals(prev => {
      const updated = prev.map(p => {
        if (p.id === proposalId) {
          return {
            ...p,
            status: 'descartado' as const,
            discardReason: reason || 'Descartado por el revisor',
            reviewedAt: new Date().toISOString()
          };
        }
        return p;
      });
      storageService.saveExtractionProposals(updated);
      return updated;
    });
  };

  const handleRevertAuditLog = (logId: string) => {
    const log = auditLogs.find(l => l.id === logId);
    if (!log) return;

    // Revert microorganism state if previous value exists
    if (log.previousValue) {
      setMicroorganisms(prevList => {
        const reverted = prevList.map(org => {
          if (org.id === log.microorganismId) {
            const updated = { ...org };
            if (log.field === 'Morfología microscópica') {
              updated.morphology = { ...updated.morphology, shape: log.previousValue! };
            }
            return updated;
          }
          return org;
        });
        storageService.saveMicroorganisms(reverted);
        return reverted;
      });
    }

    setAuditLogs(prev => {
      const updated = prev.filter(l => l.id !== logId);
      storageService.saveAuditLogs(updated);
      return updated;
    });
  };

  const sectionTitles: Record<ActiveNavSection, string> = {
    'inicio': 'Panel General',
    'live': 'InfectoAtlas LIVE',
    'laboratorio-3d': 'Laboratorio virtual · muestras y estructuras',
    'microorganismos': 'Catálogo de Microorganismos',
    'vectores': 'Vectores Artrópodos en Guatemala',
    'enfermedades': 'Enfermedades Infecciosas',
    'atlas-diagnostico': 'Atlas Diagnóstico & Microscopía',
    'biblioteca-academica': 'Biblioteca Académica & Extracción Inteligente',
    'epidemiologia': 'Vigilancia Epidemiológica',
    'guatemala': 'Vigilancia en los 22 Departamentos',
    'estudiar': 'Módulo de Estudio & Flashcards',
    'comparador': 'Comparador de Patógenos',
    'fuentes': 'Fuentes Científicas y Bibliografía'
  };

  const pendingProposalsCount = extractionProposals.filter(p => p.status === 'pendiente').length;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Persistent Desktop & Responsive Mobile Sidebar */}
      <Sidebar
        currentSection={currentSection}
        onSelectSection={handleSelectSection}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        microorganismCount={displayMicroorganisms.length}
        academicDocCount={academicDocuments.length}
        pendingProposalsCount={pendingProposalsCount}
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
          {currentSection === 'laboratorio-3d' && <Suspense fallback={<p role="status">Preparando laboratorio 3D…</p>}><MicrobeLab microorganisms={displayMicroorganisms} onSelectOrganism={setSelectedOrganism}/></Suspense>}
          {currentSection === 'live' && <InfectoAtlasLive microorganisms={displayMicroorganisms} onSelectOrganism={setSelectedOrganism} onSendToLibrary={handleSendOfficialToLibrary} />}
          {currentSection === 'inicio' && (
            <HomeDashboard
              microorganisms={displayMicroorganisms}
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
              microorganisms={displayMicroorganisms}
              onSelectOrganism={(org) => setSelectedOrganism(org)}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={(id) => bookmarkedIds.includes(id)}
              onAddToCompare={handleOpenComparatorWithOrganism}
              initialCategory={catalogInitialCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onExportBackup={handleExportBackup}
              onAddReferences={() => { const result = saveMissingReferences(window.localStorage, microorganisms); setMicroorganisms(result.organisms); return result.added; }}
            />
          )}

          {currentSection === 'atlas-diagnostico' && (
            <DiagnosticsAtlas
              microorganisms={displayMicroorganisms}
              onSelectOrganism={(org) => setSelectedOrganism(org)}
            />
          )}

          {currentSection === 'biblioteca-academica' && (
            <AcademicLibrary
              documents={academicDocuments}
              onAddDocument={handleAddAcademicDocument}
              onDeleteDocument={handleDeleteAcademicDocument}
              onUpdateDocumentStatus={handleUpdateDocumentStatus}
              onUpdateDocumentPageText={handleUpdateDocumentPageText}
              proposals={extractionProposals}
              onAddProposals={handleAddProposals}
              onOpenReviewModal={handleOpenReviewModal}
              microorganisms={microorganisms}
              onSelectOrganism={(org) => setSelectedOrganism(org)}
              onExportBackup={handleExportBackup}
              onImportBackup={handleImportBackup}
              backupImportPreview={backupImportPreview}
              backupImportError={backupImportError}
              isApplyingBackup={isApplyingBackup}
              onConfirmBackupImport={handleConfirmBackupImport}
              onCancelBackupImport={handleCancelBackupImport}
              onClearDemoData={handleClearDemoData}
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
              microorganisms={displayMicroorganisms}
              onSelectOrganism={(org) => setSelectedOrganism(org)}
            />
          )}

          {currentSection === 'epidemiologia' && (
            <EpidemiologyView
              onGoToGuatemala={() => setCurrentSection('guatemala')}
              microorganisms={displayMicroorganisms}
              onSelectOrganism={setSelectedOrganism}
              onSendToLibrary={handleSendOfficialToLibrary}
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
              microorganisms={displayMicroorganisms}
              onSelectOrganism={(org) => setSelectedOrganism(org)}
            />
          )}

          {currentSection === 'comparador' && (
            <ComparatorView
              microorganisms={displayMicroorganisms}
              onSelectOrganismForDetail={(org) => setSelectedOrganism(org)}
              initialOrganismAId={comparatorInitialOrganism?.id}
            />
          )}

          {currentSection === 'fuentes' && (
            <BibliographyView />
          )}
        </main>
      </div>

      {/* Review Extracted Information Modal (REVISAR INFORMACIÓN EXTRAÍDA) */}
      <ReviewExtractedInfoModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        proposals={extractionProposals}
        onApproveProposal={handleApproveProposal}
        onDiscardProposal={handleDiscardProposal}
        auditLogs={auditLogs}
        onRevertAuditLog={handleRevertAuditLog}
        microorganisms={microorganisms}
        onSelectOrganism={(org) => {
          setSelectedOrganism(org);
          setIsReviewModalOpen(false);
        }}
        initialDocumentIdFilter={reviewDocFilter}
      />

      {/* Microorganism Detail Modal (Resumen Rápido & Ficha Completa) */}
      <MicroorganismDetailModal
        key={selectedOrganism?.id ?? 'closed'}
        organism={selectedOrganism&&(displayMicroorganisms.find(o=>o.id===selectedOrganism.id)??selectedOrganism)}
        documentPages={selectedOrganism?documentAtlas.links.get(selectedOrganism.id)??[]:[]}
        documentProposals={extractionProposals}
        onReviewDocument={id=>{setSelectedOrganism(null);handleOpenReviewModal(id);}}
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
