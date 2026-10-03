export type AcademicSubject =
  | 'Parasitología'
  | 'Bacteriología'
  | 'Virología'
  | 'Micología'
  | 'Infectología'
  | 'Epidemiología'
  | 'Otra';

export type SourceTier =
  | 'Apunte universitario'
  | 'Guía oficial MSPAS / OPS'
  | 'Boletín o alerta oficial MSPAS / OPS / OMS'
  | 'Publicación científica indexada'
  | 'Material docente';

export type DocumentProcessingStatus =
  | 'Sin procesar'
  | 'Procesando con IA...'
  | 'Extracción completada'
  | 'Aprobado parcialmente'
  | 'Aprobado totalmente'
  | 'Error en lectura';

export type FieldToModify =
  | 'Morfología microscópica'
  | 'Ciclo biológico y estadios'
  | 'Muestra diagnóstica'
  | 'Método de identificación'
  | 'Tratamiento y manejo'
  | 'Epidemiología y datos Guatemala'
  | 'Prevención y control'
  | 'Nueva ficha de microorganismo';

export interface ExtractedPage {
  pageNumber: number;
  textContent: string;
  hasExtractableText: boolean;
  charCount: number;
  detectedMicroorganisms: string[];
}

export interface AcademicDocument {
  id: string;
  title: string;
  subject: AcademicSubject;
  authorOrInstitution: string;
  yearOrEdition: string;
  sourceTier: SourceTier;
  uploadDate: string;
  pageCount: number;
  fileName: string;
  fileSizeBytes: number;
  processingStatus: DocumentProcessingStatus;
  pages: ExtractedPage[];
  unextractablePagesCount: number;
  extractedProposalsCount: number;
  summaryNotes?: string;
  officialSource?: {
    bulletinId: string; sourceId: 'mspas' | 'paho' | 'who'; url: string;
    publicationDate: string | null; sha256: string | null; reviewedAt: string | null;
    excerpt: string; evidenceMode: 'pdf' | 'transcribed';
  };
}

export interface ExtractionProposal {
  id: string;
  documentId: string;
  documentTitle: string;
  sourceTier: SourceTier;
  sourcePage: number;
  sourceSnippet: string;
  originalSnippet?: string;
  userEditedSnippet?: string;
  isExplicitFact?: boolean;
  targetMicroorganismId: string;
  targetMicroorganismName: string;
  isNewOrganism: boolean;
  field: FieldToModify;
  previousValue: string | null;
  proposedValue: string;
  potentialContradiction: string | null;
  verificationStatus: 
    | 'Verificado con literatura científica'
    | 'Información procedente de apunte universitario (Requiere comprobación)'
    | 'Guía oficial MSPAS (Normativa nacional)'
    | 'En proceso de validación';
  status: 'pendiente' | 'aprobado' | 'editado_y_aprobado' | 'descartado';
  reviewedAt?: string;
  discardReason?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  documentTitle: string;
  sourcePage: number;
  microorganismId: string;
  microorganismName: string;
  field: FieldToModify;
  previousValue: string | null;
  newValue: string;
  originalExtractedSnippet?: string;
  editedByReviewer?: boolean;
  action: 'aprobado' | 'editado' | 'revertido';
  statusBefore?: string;
}
