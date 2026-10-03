import type { AcademicDocument, AuditLogEntry, ExtractionProposal } from './academicLibrary';
import type { Microorganism } from './microorganism';
import type { BibliographicSource } from './diagnostics';

export type BackupImportMode = 'restore' | 'merge';

export interface BackupData {
  microorganisms: Microorganism[];
  academicDocuments: AcademicDocument[];
  extractionProposals: ExtractionProposal[];
  auditLogs: AuditLogEntry[];
  bookmarks: string[];
  bibliographyReferences: BibliographicSource[];
  userSettings: Record<string, unknown>;
}

export type BackupCollectionName =
  | 'microorganisms'
  | 'academicDocuments'
  | 'extractionProposals'
  | 'auditLogs'
  | 'bookmarks'
  | 'bibliographyReferences';

export type BackupSummaryName = BackupCollectionName | 'userSettings';

export interface BackupIntegrity {
  algorithm: 'SHA-256';
  digest: string;
}

export interface BackupFileManifest {
  originalFileBytesIncluded: false;
  omittedOriginalFiles: Array<{
    fileName: string;
    sizeBytes: number;
  }>;
  notice: string;
}

export interface InfectoAtlasBackupV1 {
  format: 'infectoatlas-gt-backup';
  schemaVersion: 1;
  appName: 'InfectoAtlas GT';
  appVersion: string;
  exportedAt: string;
  data: BackupData;
  files: BackupFileManifest;
  integrity: BackupIntegrity;
}

export type BackupIntegrityStatus = 'verified' | 'legacy-unverified' | 'invalid';

export interface BackupCollectionSummary {
  backupCount: number;
  currentCount: number;
  duplicateCount: number;
}

export interface BackupImportPlan {
  valid: boolean;
  sourceFormat: 'infectoatlas-v1' | 'legacy-ai-studio' | 'unknown';
  sourceAppName?: string;
  sourceAppVersion?: string;
  exportedAt?: string;
  integrityStatus: BackupIntegrityStatus;
  data: Partial<BackupData>;
  counts: Partial<Record<BackupSummaryName, BackupCollectionSummary>>;
  duplicatesInBackup: Partial<Record<BackupCollectionName, string[]>>;
  duplicatesWithCurrent: Partial<Record<BackupCollectionName, string[]>>;
  warnings: string[];
  errors: string[];
  omittedOriginalFiles: string[];
}