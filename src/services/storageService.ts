import { Microorganism } from '../types/microorganism';
import { INITIAL_MICROORGANISMS } from '../data/microorganisms';
import { AcademicDocument, ExtractionProposal, AuditLogEntry } from '../types/academicLibrary';
import { 
  INITIAL_ACADEMIC_DOCUMENTS, 
  INITIAL_EXTRACTION_PROPOSALS, 
  INITIAL_AUDIT_LOGS 
} from '../data/initialAcademicLibrary';

export interface AppletBackupPayload {
  version: string;
  exportedAt: string;
  appletName: string;
  academicDocuments: AcademicDocument[];
  extractionProposals: ExtractionProposal[];
  auditLogs: AuditLogEntry[];
  microorganisms: Microorganism[];
  bookmarks: string[];
}

/**
 * Storage Service with LocalStorage persistence.
 * Prepared for future seamless migration to Firebase Firestore & Storage.
 */
class LocalStorageRepository {
  private readonly MICROORGANISMS_KEY = 'infectoatlas_microorganisms_v3';
  private readonly ACADEMIC_DOCS_KEY = 'infectoatlas_academic_docs_v3';
  private readonly PROPOSALS_KEY = 'infectoatlas_proposals_v3';
  private readonly AUDIT_LOGS_KEY = 'infectoatlas_audit_logs_v3';
  private readonly BOOKMARKS_KEY = 'infectoatlas_bookmarks_v3';

  // --- Microorganisms ---
  async getMicroorganisms(): Promise<Microorganism[]> {
    try {
      const raw = localStorage.getItem(this.MICROORGANISMS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading microorganisms from localStorage:', e);
    }
    // Default to INITIAL_MICROORGANISMS (24 validated clinical species)
    return [...INITIAL_MICROORGANISMS];
  }

  async saveMicroorganisms(list: Microorganism[]): Promise<void> {
    try {
      localStorage.setItem(this.MICROORGANISMS_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Error saving microorganisms to localStorage:', e);
    }
  }

  // --- Academic Documents ---
  getAcademicDocuments(): AcademicDocument[] {
    try {
      const raw = localStorage.getItem(this.ACADEMIC_DOCS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading academic documents from localStorage:', e);
    }
    return [...INITIAL_ACADEMIC_DOCUMENTS];
  }

  saveAcademicDocuments(docs: AcademicDocument[]): void {
    try {
      localStorage.setItem(this.ACADEMIC_DOCS_KEY, JSON.stringify(docs));
    } catch (e) {
      console.error('Error saving academic documents to localStorage:', e);
    }
  }

  // --- Extraction Proposals ---
  getExtractionProposals(): ExtractionProposal[] {
    try {
      const raw = localStorage.getItem(this.PROPOSALS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading extraction proposals from localStorage:', e);
    }
    return [...INITIAL_EXTRACTION_PROPOSALS];
  }

  saveExtractionProposals(props: ExtractionProposal[]): void {
    try {
      localStorage.setItem(this.PROPOSALS_KEY, JSON.stringify(props));
    } catch (e) {
      console.error('Error saving extraction proposals to localStorage:', e);
    }
  }

  // --- Audit Logs ---
  getAuditLogs(): AuditLogEntry[] {
    try {
      const raw = localStorage.getItem(this.AUDIT_LOGS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading audit logs from localStorage:', e);
    }
    return [...INITIAL_AUDIT_LOGS];
  }

  saveAuditLogs(logs: AuditLogEntry[]): void {
    try {
      localStorage.setItem(this.AUDIT_LOGS_KEY, JSON.stringify(logs));
    } catch (e) {
      console.error('Error saving audit logs to localStorage:', e);
    }
  }

  // --- Bookmarks ---
  getBookmarks(): string[] {
    try {
      const raw = localStorage.getItem(this.BOOKMARKS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  toggleBookmark(id: string): boolean {
    try {
      const current = this.getBookmarks();
      const exists = current.includes(id);
      const updated = exists ? current.filter(x => x !== id) : [...current, id];
      localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(updated));
      return !exists;
    } catch {
      return false;
    }
  }

  isBookmarked(id: string): boolean {
    return this.getBookmarks().includes(id);
  }

  // --- Export and Import Backup ---
  exportBackupJSON(): string {
    const backup: AppletBackupPayload = {
      version: '3.1.0',
      exportedAt: new Date().toISOString(),
      appletName: 'InfectoAtlas GT',
      academicDocuments: this.getAcademicDocuments(),
      extractionProposals: this.getExtractionProposals(),
      auditLogs: this.getAuditLogs(),
      microorganisms: INITIAL_MICROORGANISMS, // Will be overridden if saved
      bookmarks: this.getBookmarks()
    };
    return JSON.stringify(backup, null, 2);
  }

  importBackupJSON(rawJson: string): boolean {
    try {
      const parsed = JSON.parse(rawJson) as AppletBackupPayload;
      if (!parsed || typeof parsed !== 'object') return false;

      if (Array.isArray(parsed.academicDocuments)) {
        this.saveAcademicDocuments(parsed.academicDocuments);
      }
      if (Array.isArray(parsed.extractionProposals)) {
        this.saveExtractionProposals(parsed.extractionProposals);
      }
      if (Array.isArray(parsed.auditLogs)) {
        this.saveAuditLogs(parsed.auditLogs);
      }
      if (Array.isArray(parsed.microorganisms) && parsed.microorganisms.length > 0) {
        this.saveMicroorganisms(parsed.microorganisms);
      }
      if (Array.isArray(parsed.bookmarks)) {
        localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(parsed.bookmarks));
      }
      return true;
    } catch (e) {
      console.error('Error importing backup JSON:', e);
      return false;
    }
  }

  // --- Reset to clean slate (Keep only empty or default) ---
  clearDemoData(): void {
    localStorage.removeItem(this.ACADEMIC_DOCS_KEY);
    localStorage.removeItem(this.PROPOSALS_KEY);
    localStorage.removeItem(this.AUDIT_LOGS_KEY);
  }
}

export const storageService = new LocalStorageRepository();
