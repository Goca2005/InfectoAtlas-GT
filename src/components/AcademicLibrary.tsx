import React, { useState } from 'react';
import { 
  AcademicDocument, 
  AcademicSubject, 
  SourceTier, 
  ExtractionProposal,
  ExtractedPage
} from '../types/academicLibrary';
import { Microorganism } from '../types/microorganism';
import { extractTextFromPDF } from '../utils/pdfExtractor';
import { analyzeAcademicDocument } from '../services/aiDocumentAnalyzer';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Eye, 
  BookOpen, 
  CloudOff, 
  X, 
  Clock, 
  Building2, 
  Calendar, 
  AlertTriangle, 
  FileCheck,
  Download,
  FolderSync,
  Edit2,
  Check,
  HelpCircle,
  FileCode
} from 'lucide-react';

interface AcademicLibraryProps {
  documents: AcademicDocument[];
  onAddDocument: (doc: AcademicDocument) => void;
  onDeleteDocument: (docId: string) => void;
  onUpdateDocumentStatus: (docId: string, status: AcademicDocument['processingStatus'], proposalsCount?: number) => void;
  onUpdateDocumentPageText?: (docId: string, pageNumber: number, newText: string) => void;
  proposals: ExtractionProposal[];
  onAddProposals: (newProps: ExtractionProposal[]) => void;
  onOpenReviewModal: (docIdFilter?: string) => void;
  microorganisms: Microorganism[];
  onSelectOrganism?: (org: Microorganism) => void;
  onExportBackup?: () => void;
  onImportBackup?: (file: File) => void;
  onClearDemoData?: () => void;
}

export const AcademicLibrary: React.FC<AcademicLibraryProps> = ({
  documents,
  onAddDocument,
  onDeleteDocument,
  onUpdateDocumentStatus,
  onUpdateDocumentPageText,
  proposals,
  onAddProposals,
  onOpenReviewModal,
  microorganisms,
  onSelectOrganism,
  onExportBackup,
  onImportBackup,
  onClearDemoData
}) => {
  // Filters & Search
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('todas');
  const [selectedTier, setSelectedTier] = useState<string>('todos');

  // Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [docTitle, setDocTitle] = useState<string>('');
  const [docSubject, setDocSubject] = useState<AcademicSubject>('Parasitología');
  const [docAuthor, setDocAuthor] = useState<string>('');
  const [docYear, setDocYear] = useState<string>(new Date().getFullYear().toString());
  const [docTier, setDocTier] = useState<SourceTier>('Apunte universitario');
  const [isExtractingPDF, setIsExtractingPDF] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Manual Page Transcriber State inside Viewer
  const [viewingDoc, setViewingDoc] = useState<AcademicDocument | null>(null);
  const [activeViewerPage, setActiveViewerPage] = useState<number>(1);
  const [isEditingPageText, setIsEditingPageText] = useState<boolean>(false);
  const [pageTextDraft, setPageTextDraft] = useState<string>('');

  // Document Deletion Confirmation
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);

  // Analyzing status per document ID
  const [analyzingDocId, setAnalyzingDocId] = useState<string | null>(null);

  // Backup restore file input ref
  const backupInputRef = React.useRef<HTMLInputElement | null>(null);

  // Handle Drag & Drop / File Input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const name = file.name.toLowerCase();
      if (!name.endsWith('.pdf') && !name.endsWith('.txt') && !name.endsWith('.md')) {
        setUploadError('Por el momento el sistema admite archivos PDF mecanografiados, o notas en TXT/Markdown. El soporte directo para PPTX se encuentra en desarrollo.');
        return;
      }
      setUploadedFile(file);
      setUploadError(null);
      if (!docTitle) {
        setDocTitle(file.name.replace(/\.[a-z0-9]+$/i, '').replace(/[-_]/g, ' '));
      }
    }
  };

  const handleSaveAndUploadDocument = async () => {
    if (!docTitle.trim()) {
      setUploadError('Por favor ingresa el título o nombre del documento.');
      return;
    }

    setIsExtractingPDF(true);
    setUploadError(null);

    try {
      let pages: ExtractedPage[] = [];
      let pageCount = 1;
      let unextractableCount = 0;
      let fileSizeBytes = 1500000;

      if (uploadedFile) {
        fileSizeBytes = uploadedFile.size;
        const extraction = await extractTextFromPDF(uploadedFile);
        pages = extraction.pages;
        pageCount = extraction.pageCount;
        unextractableCount = extraction.unextractablePagesCount;
      } else {
        // Fallback placeholder page for manual note upload
        pages = [
          {
            pageNumber: 1,
            textContent: `Documento registrado manualmente: ${docTitle}. Asignatura: ${docSubject}. Autor: ${docAuthor || 'No especificado'}.`,
            hasExtractableText: true,
            charCount: 150,
            detectedMicroorganisms: []
          }
        ];
      }

      const newDoc: AcademicDocument = {
        id: `doc-user-${Date.now()}`,
        title: docTitle.trim(),
        subject: docSubject,
        authorOrInstitution: docAuthor.trim() || 'No documentado',
        yearOrEdition: docYear.trim() || new Date().getFullYear().toString(),
        sourceTier: docTier,
        uploadDate: new Date().toISOString().split('T')[0],
        pageCount,
        fileName: uploadedFile ? uploadedFile.name : `${docTitle.slice(0, 20)}.pdf`,
        fileSizeBytes,
        processingStatus: 'Sin procesar',
        pages,
        unextractablePagesCount: unextractableCount,
        extractedProposalsCount: 0
      };

      onAddDocument(newDoc);
      setIsUploadModalOpen(false);
      resetUploadForm();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Error al procesar el archivo');
    } finally {
      setIsExtractingPDF(false);
    }
  };

  const resetUploadForm = () => {
    setUploadedFile(null);
    setDocTitle('');
    setDocAuthor('');
    setDocSubject('Parasitología');
    setDocTier('Apunte universitario');
    setDocYear(new Date().getFullYear().toString());
    setUploadError(null);
  };

  // Trigger Intelligent AI Document Analysis
  const handleAnalyzeDocument = async (doc: AcademicDocument) => {
    setAnalyzingDocId(doc.id);
    onUpdateDocumentStatus(doc.id, 'Procesando con IA...');

    try {
      const generatedProposals = await analyzeAcademicDocument(doc, microorganisms);
      
      onAddProposals(generatedProposals);
      onUpdateDocumentStatus(
        doc.id, 
        'Extracción completada', 
        generatedProposals.length
      );
      
      // Auto open review modal for immediate convenience
      onOpenReviewModal(doc.id);
    } catch (err) {
      console.error('Error analyzing document:', err);
      onUpdateDocumentStatus(doc.id, 'Error en lectura');
    } finally {
      setAnalyzingDocId(null);
    }
  };

  // Save manually edited or transcribed page text
  const handleSavePageText = (docId: string, pageNum: number) => {
    if (onUpdateDocumentPageText) {
      onUpdateDocumentPageText(docId, pageNum, pageTextDraft);
    }
    if (viewingDoc) {
      const updatedPages = viewingDoc.pages.map(p => {
        if (p.pageNumber === pageNum) {
          return {
            ...p,
            textContent: pageTextDraft,
            hasExtractableText: pageTextDraft.trim().length > 10,
            charCount: pageTextDraft.length
          };
        }
        return p;
      });
      setViewingDoc({ ...viewingDoc, pages: updatedPages });
    }
    setIsEditingPageText(false);
  };

  // Filtered documents
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.authorOrInstitution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSubject = selectedSubject === 'todas' || doc.subject === selectedSubject;
    const matchesTier = selectedTier === 'todos' || doc.sourceTier === selectedTier;

    return matchesSearch && matchesSubject && matchesTier;
  });

  const totalProposalsPending = proposals.filter(p => p.status === 'pendiente').length;
  const hasDemoDocuments = documents.some(d => d.id.includes('demo'));

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Academic Library Presentation */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white shadow-xs">
                <BookOpen className="h-4 w-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Biblioteca Académica & Extracción Científica
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
              Plataforma para cargar apuntes universitarios y guías clínicas en formato PDF. El motor extrae información de morfología, muestras, métodos diagnósticos y tratamientos página por página, manteniéndola en cuarentena hasta su aprobación médica.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {totalProposalsPending > 0 && (
              <button
                type="button"
                onClick={() => onOpenReviewModal()}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition-all"
              >
                <Sparkles className="h-4 w-4" />
                <span>Revisar {totalProposalsPending} Propuestas</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-sky-700 transition-all"
            >
              <Upload className="h-4 w-4" />
              <span>Subir Documento PDF</span>
            </button>
          </div>
        </div>

        {/* Engine Transparency and Local Persistence Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] text-slate-600">
          <div className="flex items-center gap-2">
            <CloudOff className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>
              <strong>Almacenamiento Local Activo:</strong> Los documentos y propuestas persisten en este navegador (localStorage).
            </span>
          </div>

          {/* Backup and Clean Demo Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {onExportBackup && (
              <button
                type="button"
                onClick={onExportBackup}
                className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-200 transition-colors"
                title="Descargar archivo JSON de respaldo de toda la biblioteca y fichas"
              >
                <Download className="h-3 w-3 text-slate-500" />
                <span>Exportar Respaldo JSON</span>
              </button>
            )}

            {onImportBackup && (
              <>
                <input
                  type="file"
                  accept=".json,application/json"
                  ref={backupInputRef}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      onImportBackup(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => backupInputRef.current?.click()}
                  className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-200 transition-colors"
                  title="Restaurar copia de seguridad previa"
                >
                  <FolderSync className="h-3 w-3 text-slate-500" />
                  <span>Restaurar Respaldo</span>
                </button>
              </>
            )}

            {hasDemoDocuments && onClearDemoData && (
              <button
                type="button"
                onClick={onClearDemoData}
                className="inline-flex items-center gap-1 rounded border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] font-bold text-rose-700 hover:bg-rose-100 transition-colors"
                title="Eliminar los ejemplos didácticos de prueba y dejar la biblioteca en blanco"
              >
                <Trash2 className="h-3 w-3" />
                <span>Limpiar Ejemplos de Demostración</span>
              </button>
            )}
          </div>
        </div>

        {/* Engine Rigor Disclaimer */}
        <div className="mt-2.5 bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-[11px] text-slate-600 flex items-start gap-2">
          <HelpCircle className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-800">Motor de Clasificación Científica:</strong> Analizador determinista local con reglas de concordancia taxonómica y patrones microbiológicos. No requiere claves API de pago ni envía información a servidores de terceros. Toda la extracción conserva el fragmento textual original y la página exacta para su corroboración.
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por título, autor o contenido..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:bg-white focus:outline-hidden"
            />
          </div>

          {/* Subject Filter */}
          <div className="md:col-span-4 flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:border-sky-500 focus:bg-white focus:outline-hidden"
            >
              <option value="todas">Todas las materias</option>
              <option value="Parasitología">Parasitología</option>
              <option value="Bacteriología">Bacteriología</option>
              <option value="Virología">Virología</option>
              <option value="Micología">Micología</option>
              <option value="Infectología">Infectología</option>
              <option value="Epidemiología">Epidemiología</option>
              <option value="Otra">Otra</option>
            </select>
          </div>

          {/* Source Tier Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:border-sky-500 focus:bg-white focus:outline-hidden"
            >
              <option value="todos">Todos los tipos de fuente</option>
              <option value="Apunte universitario">Apuntes universitarios</option>
              <option value="Guía oficial MSPAS / OPS">Guías oficiales MSPAS / OPS</option>
              <option value="Publicación científica indexada">Publicaciones científicas</option>
              <option value="Material docente">Material docente de demostración</option>
            </select>
          </div>

        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-12 text-center space-y-3">
          <BookOpen className="h-10 w-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">No hay documentos registrados</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Sube tu primer PDF universitario con el botón superior para extraer automáticamente sus microorganismos y estadios.
          </p>
          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-sky-700"
          >
            <Upload className="h-4 w-4" />
            <span>Subir Documento Ahora</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocuments.map((doc) => {
            const docProposals = proposals.filter(p => p.documentId === doc.id);
            const pendingDocProposals = docProposals.filter(p => p.status === 'pendiente').length;
            const isAnalyzing = analyzingDocId === doc.id;
            const isDemo = doc.id.includes('demo');

            return (
              <div 
                key={doc.id}
                className={`flex flex-col justify-between rounded-xl border p-5 shadow-xs transition-all ${
                  isDemo 
                    ? 'border-amber-200 bg-amber-50/20' 
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Header: Subject & Source Tier */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="rounded-md bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-800 border border-sky-200">
                      {doc.subject}
                    </span>
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                      isDemo ? 'bg-amber-100 text-amber-800 font-bold border border-amber-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isDemo ? 'DATO FICTICIO DE DEMO' : doc.sourceTier}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-black text-slate-900 tracking-tight leading-snug line-clamp-2">
                    {doc.title}
                  </h3>

                  {/* Meta details */}
                  <div className="mt-3 space-y-1.5 text-[11px] text-slate-600 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="h-3 w-3 text-slate-400 shrink-0" />
                      <span className="truncate">Institución: <strong>{doc.authorOrInstitution}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3 text-slate-400 shrink-0" />
                      <span>Edición: <strong>{doc.yearOrEdition}</strong> • {doc.pageCount} páginas</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText className="h-3 w-3 text-slate-400 shrink-0" />
                      <span className="font-mono text-[10px] truncate">{doc.fileName}</span>
                    </div>
                  </div>

                  {/* Processing Status Badge */}
                  <div className="mt-3">
                    {doc.processingStatus === 'Extracción completada' && (
                      <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-2 text-[11px] text-emerald-900 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Extracción completada</span>
                        </div>
                        <span className="font-mono text-[10px] font-bold text-emerald-700">
                          {docProposals.length} propuestas
                        </span>
                      </div>
                    )}

                    {doc.processingStatus === 'Sin procesar' && (
                      <div className="rounded-lg bg-slate-100 border border-slate-200 p-2 text-[11px] text-slate-700 flex items-center gap-1.5 font-bold">
                        <Clock className="h-3.5 w-3.5 text-slate-500" />
                        <span>Sin analizar todavía</span>
                      </div>
                    )}

                    {doc.processingStatus === 'Procesando con IA...' && (
                      <div className="rounded-lg bg-sky-50 border border-sky-200 p-2 text-[11px] text-sky-900 flex items-center gap-1.5 font-bold animate-pulse">
                        <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                        <span>Extrayendo información por páginas...</span>
                      </div>
                    )}

                    {doc.unextractablePagesCount > 0 && (
                      <div className="mt-1 text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 shrink-0" />
                        <span>{doc.unextractablePagesCount} pág(s) sin capa OCR</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  
                  {/* Primary Button: ANALIZAR DOCUMENTO or REVISAR PROPUESTAS */}
                  {doc.processingStatus === 'Sin procesar' ? (
                    <button
                      type="button"
                      disabled={isAnalyzing}
                      onClick={() => handleAnalyzeDocument(doc)}
                      className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                      <span>{isAnalyzing ? 'Analizando páginas...' : 'ANALIZAR DOCUMENTO'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenReviewModal(doc.id)}
                      className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-sky-600 px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-sky-700 transition-colors"
                    >
                      <FileCheck className="h-3.5 w-3.5" />
                      <span>
                        REVISAR INFORMACIÓN EXTRAÍDA ({pendingDocProposals})
                      </span>
                    </button>
                  )}

                  {/* Secondary Actions: Ver páginas y Eliminar */}
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setViewingDoc(doc);
                        setActiveViewerPage(1);
                        setIsEditingPageText(false);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Ver {doc.pageCount} páginas</span>
                    </button>

                    {deletingDocId === doc.id ? (
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] text-rose-700 font-bold">¿Eliminar?</span>
                        <button
                          type="button"
                          onClick={() => {
                            onDeleteDocument(doc.id);
                            setDeletingDocId(null);
                          }}
                          className="rounded bg-rose-600 text-white px-2 py-0.5 text-[10px] font-bold"
                        >
                          Sí
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingDocId(null)}
                          className="rounded bg-slate-200 text-slate-700 px-2 py-0.5 text-[10px] font-bold"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeletingDocId(doc.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Eliminar documento"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4 text-xs animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white">
                  <Upload className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Subir Documento Universitario
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Formatos admitidos: PDF, notas en TXT o Markdown
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsUploadModalOpen(false);
                  resetUploadForm();
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {uploadError && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-[11px] text-rose-800 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{uploadError}</span>
              </div>
            )}

            {/* File Dropzone */}
            <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-5 text-center hover:border-sky-500 transition-colors">
              <input
                type="file"
                id="pdf-upload"
                accept=".pdf,application/pdf,.txt,.md"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="pdf-upload" className="cursor-pointer block space-y-2">
                <FileText className="h-8 w-8 text-sky-600 mx-auto" />
                <div className="font-bold text-slate-800">
                  {uploadedFile ? uploadedFile.name : 'Haz clic para seleccionar o arrastra tu archivo PDF'}
                </div>
                <div className="text-[11px] text-slate-500">
                  {uploadedFile 
                    ? `Tamaño: ${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Listo para extraer texto página por página` 
                    : 'Apuntes de cátedra, guías clínicas o resúmenes de estudio'}
                </div>
              </label>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Nombre o Título del Documento *
                </label>
                <input
                  type="text"
                  placeholder="Ej: Cátedra de Parasitología: Nematodos y Protozoos"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2 text-xs focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Asignatura *
                  </label>
                  <select
                    value={docSubject}
                    onChange={(e) => setDocSubject(e.target.value as AcademicSubject)}
                    className="w-full rounded-lg border border-slate-300 p-2 text-xs focus:border-sky-500 focus:outline-hidden"
                  >
                    <option value="Parasitología">Parasitología</option>
                    <option value="Bacteriología">Bacteriología</option>
                    <option value="Virología">Virología</option>
                    <option value="Micología">Micología</option>
                    <option value="Infectología">Infectología</option>
                    <option value="Epidemiología">Epidemiología</option>
                    <option value="Otra">Otra</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Tipo de Fuente *
                  </label>
                  <select
                    value={docTier}
                    onChange={(e) => setDocTier(e.target.value as SourceTier)}
                    className="w-full rounded-lg border border-slate-300 p-2 text-xs focus:border-sky-500 focus:outline-hidden"
                  >
                    <option value="Apunte universitario">Apunte universitario (Requiere comprobación)</option>
                    <option value="Guía oficial MSPAS / OPS">Guía oficial MSPAS / OPS</option>
                    <option value="Publicación científica indexada">Publicación científica indexada</option>
                    <option value="Material docente">Material docente</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Autor o Institución
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: USAC, MSPAS, OMS o docente..."
                    value={docAuthor}
                    onChange={(e) => setDocAuthor(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-2 text-xs focus:border-sky-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Año o Edición
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 2024"
                    value={docYear}
                    onChange={(e) => setDocYear(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-2 text-xs focus:border-sky-500 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsUploadModalOpen(false);
                  resetUploadForm();
                }}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={isExtractingPDF}
                onClick={handleSaveAndUploadDocument}
                className="px-4 py-2 rounded-lg bg-sky-600 text-white font-bold hover:bg-sky-700 transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>{isExtractingPDF ? 'Extrayendo páginas del PDF...' : 'Incorporar a la Biblioteca'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Document Page Viewer Drawer */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
          <div className="relative flex flex-col w-full max-w-4xl max-h-[85vh] rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden text-xs">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
              <div>
                <span className="rounded bg-sky-500/20 text-sky-300 border border-sky-400/30 px-2 py-0.5 text-[10px] font-bold">
                  {viewingDoc.subject} • {viewingDoc.sourceTier}
                </span>
                <h3 className="text-base font-black text-white mt-1">
                  {viewingDoc.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Page Selector Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-200 bg-slate-50 px-6 py-2">
              <span className="text-slate-500 font-bold mr-2 text-[11px]">Páginas:</span>
              {viewingDoc.pages.map((p) => (
                <button
                  key={p.pageNumber}
                  type="button"
                  onClick={() => {
                    setActiveViewerPage(p.pageNumber);
                    setIsEditingPageText(false);
                  }}
                  className={`px-3 py-1 rounded font-mono text-[11px] font-bold transition-colors ${
                    activeViewerPage === p.pageNumber
                      ? 'bg-sky-600 text-white shadow-xs'
                      : p.hasExtractableText
                      ? 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  Pág. {p.pageNumber} {!p.hasExtractableText && '(Sin OCR)'}
                </button>
              ))}
            </div>

            {/* Page Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {(() => {
                const currentPage = viewingDoc.pages.find(p => p.pageNumber === activeViewerPage) || viewingDoc.pages[0];
                if (!currentPage) return null;

                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-800 text-sm">
                        Contenido Extraído — Página {currentPage.pageNumber} de {viewingDoc.pageCount}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-slate-500">
                          {currentPage.charCount} caracteres
                        </span>
                        {!isEditingPageText && (
                          <button
                            type="button"
                            onClick={() => {
                              setPageTextDraft(currentPage.textContent);
                              setIsEditingPageText(true);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-1 rounded hover:bg-sky-100 transition-colors"
                          >
                            <Edit2 className="h-3 w-3" />
                            <span>Editar / Transcribir Texto</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {isEditingPageText ? (
                      <div className="space-y-3">
                        <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                          Puedes ingresar o corregir la transcripción de esta página. Esto resulta muy útil para páginas escaneadas como imagen sin OCR.
                        </div>
                        <textarea
                          value={pageTextDraft}
                          onChange={(e) => setPageTextDraft(e.target.value)}
                          rows={12}
                          className="w-full rounded-xl border border-sky-400 p-3 font-mono text-xs text-slate-800 focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                          placeholder="Pega o escribe aquí el texto correspondiente a esta página..."
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setIsEditingPageText(false)}
                            className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-bold hover:bg-slate-300"
                          >
                            Cancelar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSavePageText(viewingDoc.id, currentPage.pageNumber)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 flex items-center gap-1"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>Guardar Texto en Página</span>
                          </button>
                        </div>
                      </div>
                    ) : !currentPage.hasExtractableText ? (
                      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center text-amber-900 space-y-3">
                        <AlertTriangle className="h-8 w-8 text-amber-600 mx-auto" />
                        <h4 className="font-bold text-sm">
                          Página sin capa de texto OCR extraíble
                        </h4>
                        <p className="text-xs text-amber-800 max-w-md mx-auto">
                          Esta página contiene esquemas, imágenes escaneadas o fotografías sin texto mecanografiado legible. La aplicación no inventa información.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setPageTextDraft('');
                            setIsEditingPageText(true);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-700 shadow-xs"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                          <span>Ingresar Transcripción Manual</span>
                        </button>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                        {currentPage.textContent}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Archivo: {viewingDoc.fileName}
              </span>
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800"
              >
                Cerrar Visor
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
