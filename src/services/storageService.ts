import { INITIAL_MICROORGANISMS } from '../data/microorganisms';
import {
  INITIAL_ACADEMIC_DOCUMENTS,
  INITIAL_EXTRACTION_PROPOSALS,
  INITIAL_AUDIT_LOGS
} from '../data/initialAcademicLibrary';
import { OFFICIAL_BIBLIOGRAPHY } from '../data/bibliography';
import packageInfo from '../../package.json';
import type {
  AcademicDocument,
  AuditLogEntry,
  ExtractionProposal
} from '../types/academicLibrary';
import type { BibliographicSource } from '../types/diagnostics';
import type { Microorganism } from '../types/microorganism';
import type {
  BackupCollectionName,
  BackupData,
  BackupImportMode,
  BackupImportPlan,
  InfectoAtlasBackupV1
} from '../types/backup';

export type StorageAdapter = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const BACKUP_FORMAT = 'infectoatlas-gt-backup' as const;
const BACKUP_SCHEMA_VERSION = 1 as const;
const STORAGE_KEYS = {
  microorganisms: 'infectoatlas_microorganisms_v3',
  academicDocuments: 'infectoatlas_academic_docs_v3',
  extractionProposals: 'infectoatlas_proposals_v3',
  auditLogs: 'infectoatlas_audit_logs_v3',
  bookmarks: 'infectoatlas_bookmarks_v3',
  bibliographyReferences: 'infectoatlas_user_bibliography_v1',
  userSettings: 'infectoatlas_user_settings_v1'
} as const;

const ARRAY_COLLECTIONS: BackupCollectionName[] = [
  'microorganisms',
  'academicDocuments',
  'extractionProposals',
  'auditLogs',
  'bookmarks',
  'bibliographyReferences'
];

const REQUIRED_RECORD_FIELDS: Partial<Record<BackupCollectionName, string[]>> = {
  microorganisms: [
    'id', 'scientificName', 'category', 'reviewStatus', 'taxonomy', 'morphology',
    'microbiologyCharacteristics', 'externalAndInternalStructures', 'virulenceFactors',
    'reservoir', 'transmissionRoute', 'associatedDiseases', 'signsAndSymptoms',
    'complications', 'clinicalSpecimens', 'diagnosticMethods', 'labFindings',
    'treatment', 'prevention', 'guatemalaRelevance', 'imagery', 'bibliography',
    'lastReviewedDate'
  ],
  academicDocuments: [
    'id', 'title', 'subject', 'authorOrInstitution', 'yearOrEdition', 'sourceTier',
    'uploadDate', 'pageCount', 'fileName', 'fileSizeBytes', 'processingStatus',
    'pages', 'unextractablePagesCount', 'extractedProposalsCount'
  ],
  extractionProposals: [
    'id', 'documentId', 'documentTitle', 'sourceTier', 'sourcePage', 'sourceSnippet',
    'targetMicroorganismId', 'targetMicroorganismName', 'isNewOrganism', 'field',
    'previousValue', 'proposedValue', 'potentialContradiction', 'verificationStatus',
    'status'
  ],
  auditLogs: [
    'id', 'timestamp', 'documentTitle', 'sourcePage', 'microorganismId',
    'microorganismName', 'field', 'previousValue', 'newValue', 'action'
  ],
  bibliographyReferences: [
    'id', 'title', 'institutionOrAuthors', 'type', 'year', 'organization',
    'status', 'urlOrCitation', 'notes'
  ]
};

const REQUIRED_CHILD_FIELDS: Partial<Record<BackupCollectionName, Record<string, string[]>>> = {
  microorganisms: {
    taxonomy: ['family', 'genus', 'species'],
    morphology: ['shape', 'size', 'specialStructures'],
    treatment: ['disclaimer', 'firstLine', 'alternatives'],
    guatemalaRelevance: ['endemicStatus', 'priorityLevel', 'departmentsWithHighPrevalence', 'officialNotes']
  },
  academicDocuments: {
    pages: ['pageNumber', 'textContent', 'hasExtractableText', 'charCount', 'detectedMicroorganisms']
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function sha256(value: unknown): Promise<string> {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Este navegador no permite verificar respaldos con SHA-256.');
  }
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  return toHex(new Uint8Array(await globalThis.crypto.subtle.digest('SHA-256', bytes)));
}

function getIds(collection: BackupCollectionName, values: unknown[]): string[] {
  if (collection === 'bookmarks') {
    return values.filter((value): value is string => typeof value === 'string');
  }
  return values.flatMap(value =>
    isRecord(value) && typeof value.id === 'string' ? [value.id] : []
  );
}

function getDuplicateIds(collection: BackupCollectionName, values: unknown[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const id of getIds(collection, values)) {
    if (seen.has(id)) duplicates.add(id);
    seen.add(id);
  }
  return [...duplicates];
}

function mergeById<T extends { id: string }>(current: T[], incoming: T[]): T[] {
  const currentIds = new Set(current.map(item => item.id));
  return [...current, ...incoming.filter(item => !currentIds.has(item.id))];
}

function mergeUniqueStrings(current: string[], incoming: string[]): string[] {
  return [...new Set([...current, ...incoming])];
}

function createEmptyPlan(): BackupImportPlan {
  return {
    valid: false,
    sourceFormat: 'unknown',
    integrityStatus: 'invalid',
    data: {},
    counts: {},
    duplicatesInBackup: {},
    duplicatesWithCurrent: {},
    warnings: [],
    errors: [],
    omittedOriginalFiles: []
  };
}

export class LocalStorageRepository {
  constructor(private readonly storage: StorageAdapter = globalThis.localStorage) {}

  async getMicroorganisms(): Promise<Microorganism[]> {
    try {
      const raw = this.storage.getItem(STORAGE_KEYS.microorganisms);
      if (raw !== null) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed as Microorganism[];
      }
    } catch (error) {
      console.warn('Error reading microorganisms from localStorage:', error);
    }
    return [...INITIAL_MICROORGANISMS];
  }

  async saveMicroorganisms(list: Microorganism[]): Promise<void> {
    try {
      this.storage.setItem(STORAGE_KEYS.microorganisms, JSON.stringify(list));
    } catch (error) {
      console.error('Error saving microorganisms to localStorage:', error);
    }
  }

  getAcademicDocuments(): AcademicDocument[] {
    return this.readArray(STORAGE_KEYS.academicDocuments, INITIAL_ACADEMIC_DOCUMENTS);
  }

  saveAcademicDocuments(documents: AcademicDocument[]): void {
    this.writeArray(STORAGE_KEYS.academicDocuments, documents, 'academic documents');
  }

  getExtractionProposals(): ExtractionProposal[] {
    return this.readArray(STORAGE_KEYS.extractionProposals, INITIAL_EXTRACTION_PROPOSALS);
  }

  saveExtractionProposals(proposals: ExtractionProposal[]): void {
    this.writeArray(STORAGE_KEYS.extractionProposals, proposals, 'extraction proposals');
  }

  getAuditLogs(): AuditLogEntry[] {
    return this.readArray(STORAGE_KEYS.auditLogs, INITIAL_AUDIT_LOGS);
  }

  saveAuditLogs(logs: AuditLogEntry[]): void {
    this.writeArray(STORAGE_KEYS.auditLogs, logs, 'audit logs');
  }

  getBookmarks(): string[] {
    try {
      const raw = this.storage.getItem(STORAGE_KEYS.bookmarks);
      const parsed: unknown = raw === null ? [] : JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
    } catch (error) {
      console.warn('Error reading bookmarks from localStorage:', error);
      return [];
    }
  }

  toggleBookmark(id: string): boolean {
    try {
      const current = this.getBookmarks();
      const exists = current.includes(id);
      const updated = exists ? current.filter(item => item !== id) : [...current, id];
      this.storage.setItem(STORAGE_KEYS.bookmarks, JSON.stringify(updated));
      return !exists;
    } catch (error) {
      console.error('Error saving bookmarks to localStorage:', error);
      return false;
    }
  }

  isBookmarked(id: string): boolean {
    return this.getBookmarks().includes(id);
  }

  getUserBibliographyReferences(): BibliographicSource[] {
    return this.readArray(STORAGE_KEYS.bibliographyReferences, []);
  }

  getUserSettings(): Record<string, unknown> {
    try {
      const raw = this.storage.getItem(STORAGE_KEYS.userSettings);
      const parsed: unknown = raw === null ? {} : JSON.parse(raw);
      return isRecord(parsed) ? parsed : {};
    } catch (error) {
      console.warn('Error reading user settings from localStorage:', error);
      return {};
    }
  }

  async getBackupData(overrides: Partial<BackupData> = {}): Promise<BackupData> {
    const referenceMap = new Map<string, BibliographicSource>();
    [...this.getUserBibliographyReferences(), ...OFFICIAL_BIBLIOGRAPHY].forEach(reference => {
      if (reference && typeof reference.id === 'string') referenceMap.set(reference.id, reference);
    });
    return {
      microorganisms: overrides.microorganisms ?? await this.getMicroorganisms(),
      academicDocuments: overrides.academicDocuments ?? this.getAcademicDocuments(),
      extractionProposals: overrides.extractionProposals ?? this.getExtractionProposals(),
      auditLogs: overrides.auditLogs ?? this.getAuditLogs(),
      bookmarks: overrides.bookmarks ?? this.getBookmarks(),
      bibliographyReferences: overrides.bibliographyReferences ?? [...referenceMap.values()],
      userSettings: overrides.userSettings ?? this.getUserSettings()
    };
  }

  async exportBackupJSON(overrides: Partial<BackupData> = {}): Promise<string> {
    this.assertPersistedStateReadable();
    const data = await this.getBackupData(overrides);
    const unsignedBackup = {
      format: BACKUP_FORMAT,
      schemaVersion: BACKUP_SCHEMA_VERSION,
      appName: 'InfectoAtlas GT' as const,
      appVersion: packageInfo.version,
      exportedAt: new Date().toISOString(),
      data,
      files: {
        originalFileBytesIncluded: false as const,
        omittedOriginalFiles: data.academicDocuments.map(document => ({
          fileName: document.fileName || document.title,
          sizeBytes: Number.isFinite(document.fileSizeBytes) ? document.fileSizeBytes : 0
        })),
        notice: 'Se incluyen metadatos y texto extraído de las páginas. Los bytes de los archivos PDF/TXT/MD originales no se guardan en localStorage y no están incluidos.'
      }
    };
    const backup: InfectoAtlasBackupV1 = {
      ...unsignedBackup,
      integrity: {
        algorithm: 'SHA-256',
        digest: await sha256(unsignedBackup)
      }
    };
    return JSON.stringify(backup, null, 2);
  }

  async inspectBackupJSON(rawJson: string, currentData: BackupData): Promise<BackupImportPlan> {
    const plan = createEmptyPlan();
    let parsed: unknown;
    try {
      parsed = JSON.parse(rawJson);
    } catch {
      plan.errors.push('El archivo no contiene JSON válido.');
      return plan;
    }
    if (!isRecord(parsed)) {
      plan.errors.push('La raíz del respaldo debe ser un objeto JSON.');
      return plan;
    }

    const isCurrentFormat = parsed.format === BACKUP_FORMAT;
    if (typeof parsed.format === 'string' && !isCurrentFormat) {
      plan.errors.push(`Formato de respaldo no compatible: ${parsed.format}.`);
      return plan;
    }
    const sourceData: Record<string, unknown> | null = isCurrentFormat
      ? (isRecord(parsed.data) ? parsed.data : null)
      : (isRecord(parsed.data) ? parsed.data : parsed);

    if (isCurrentFormat) {
      plan.sourceFormat = 'infectoatlas-v1';
      plan.sourceAppName = typeof parsed.appName === 'string' ? parsed.appName : undefined;
      plan.sourceAppVersion = typeof parsed.appVersion === 'string' ? parsed.appVersion : undefined;
      plan.exportedAt = typeof parsed.exportedAt === 'string' ? parsed.exportedAt : undefined;
      if (parsed.appName !== 'InfectoAtlas GT') plan.errors.push('Falta el nombre de aplicación esperado.');
      if (typeof parsed.appVersion !== 'string' || !parsed.appVersion) plan.errors.push('Falta la versión de InfectoAtlas GT.');
      if (typeof parsed.exportedAt !== 'string' || !parsed.exportedAt) plan.errors.push('Falta la fecha de exportación.');
      if (parsed.schemaVersion !== BACKUP_SCHEMA_VERSION) {
        plan.errors.push(`Versión de esquema no compatible: ${String(parsed.schemaVersion)}.`);
      }
      if (!isRecord(parsed.integrity) || parsed.integrity.algorithm !== 'SHA-256' || typeof parsed.integrity.digest !== 'string') {
        plan.errors.push('Falta una huella SHA-256 válida.');
      } else {
        const { integrity: _integrity, ...unsignedBackup } = parsed;
        const actualDigest = await sha256(unsignedBackup);
        if (actualDigest !== parsed.integrity.digest) {
          plan.errors.push('La huella SHA-256 no coincide. El archivo pudo modificarse o dañarse; no se importará.');
        } else {
          plan.integrityStatus = 'verified';
        }
      }
      if (!isRecord(parsed.files) || parsed.files.originalFileBytesIncluded !== false) {
        plan.warnings.push('No se pudo verificar el manifiesto de archivos originales; no se afirmará que sus bytes estén incluidos.');
      } else if (Array.isArray(parsed.files.omittedOriginalFiles)) {
        plan.omittedOriginalFiles = parsed.files.omittedOriginalFiles.flatMap(file =>
          isRecord(file) && typeof file.fileName === 'string' ? [file.fileName] : []
        );
      }
    } else {
      const recognized = sourceData && ARRAY_COLLECTIONS.some(collection => {
        const aliases = collection === 'bibliographyReferences'
          ? ['bibliographyReferences', 'bibliography', 'references']
          : [collection];
        return aliases.some(key => Array.isArray(sourceData[key]));
      });
      if (!recognized) {
        plan.errors.push('El archivo no corresponde a un respaldo reconocido de InfectoAtlas GT.');
        return plan;
      }
      plan.sourceFormat = 'legacy-ai-studio';
      plan.sourceAppName = typeof parsed.appletName === 'string'
        ? parsed.appletName
        : (typeof parsed.appName === 'string' ? parsed.appName : undefined);
      plan.sourceAppVersion = typeof parsed.version === 'string'
        ? parsed.version
        : (typeof parsed.appVersion === 'string' ? parsed.appVersion : undefined);
      plan.exportedAt = typeof parsed.exportedAt === 'string' ? parsed.exportedAt : undefined;
      plan.integrityStatus = 'legacy-unverified';
      plan.warnings.push('El respaldo antiguo no incluye una huella criptográfica; se verificó su estructura, pero no se puede confirmar que no haya sido alterado.');
    }

    if (!sourceData) {
      plan.errors.push('Falta el objeto de datos del respaldo.');
      return plan;
    }

    const aliases: Partial<Record<BackupCollectionName, string[]>> = {
      bibliographyReferences: ['bibliographyReferences', 'bibliography', 'references']
    };
    for (const collection of ARRAY_COLLECTIONS) {
      const fieldAliases = aliases[collection] ?? [collection];
      const sourceKey = fieldAliases.find(key => Object.prototype.hasOwnProperty.call(sourceData, key));
      if (!sourceKey) {
        if (isCurrentFormat) {
          plan.errors.push(`Falta el campo obligatorio data.${collection}.`);
        } else {
          plan.warnings.push(`El respaldo antiguo no incluye "${collection}"; los datos actuales de esa sección se conservarán.`);
        }
        continue;
      }
      const values = sourceData[sourceKey];
      if (!Array.isArray(values)) {
        plan.errors.push(`El campo "${sourceKey}" debe ser una lista.`);
        continue;
      }
      if (collection === 'bookmarks' && values.some(value => typeof value !== 'string')) {
        plan.errors.push('La lista de marcadores contiene valores que no son texto.');
        continue;
      }
      if (collection !== 'bookmarks') {
        const invalidIndex = values.findIndex(value =>
          !isRecord(value) || typeof value.id !== 'string' || !value.id.trim()
        );
        if (invalidIndex >= 0) {
          plan.errors.push(`El elemento ${invalidIndex + 1} de "${sourceKey}" no tiene un id válido.`);
          continue;
        }
        const required = REQUIRED_RECORD_FIELDS[collection] ?? [];
        values.forEach((value, index) => {
          if (!isRecord(value)) return;
          const missing = required.filter(field => !(field in value));
          const missingChildren: string[] = [];
          const childRequirements = REQUIRED_CHILD_FIELDS[collection] ?? {};
          for (const [parent, childFields] of Object.entries(childRequirements)) {
            const child = value[parent];
            if (collection === 'academicDocuments' && parent === 'pages' && Array.isArray(child)) {
              child.forEach((page, pageIndex) => {
                if (!isRecord(page)) {
                  missingChildren.push(`pages[${pageIndex}]`);
                  return;
                }
                for (const field of childFields) {
                  if (!(field in page)) missingChildren.push(`pages[${pageIndex}].${field}`);
                }
              });
            } else if (!isRecord(child)) {
              missingChildren.push(parent);
            } else {
              for (const field of childFields) {
                if (!(field in child)) missingChildren.push(`${parent}.${field}`);
              }
            }
          }
          const missingFields = [...missing, ...missingChildren];
          if (missingFields.length) {
            plan.warnings.push(`${sourceKey}[${index}] no incluye: ${missingFields.join(', ')}. No se inventarán esos campos.`);
          }
        });
      }
      Object.assign(plan.data, { [collection]: values });

      const repeatedIds = getDuplicateIds(collection, values);
      if (repeatedIds.length) {
        plan.duplicatesInBackup[collection] = repeatedIds;
        plan.errors.push(`"${collection}" contiene ids duplicados (${repeatedIds.slice(0, 5).join(', ')}); corrige el archivo antes de importarlo.`);
      }
      const existing = currentData[collection] as unknown as unknown[];
      const currentIds = new Set(getIds(collection, existing));
      const collisions = [...new Set(getIds(collection, values).filter(id => currentIds.has(id)))];
      if (collisions.length) plan.duplicatesWithCurrent[collection] = collisions;
      plan.counts[collection] = {
        backupCount: values.length,
        currentCount: existing.length,
        duplicateCount: collisions.length
      };
    }

    if (Object.prototype.hasOwnProperty.call(sourceData, 'userSettings')) {
      if (!isRecord(sourceData.userSettings)) {
        plan.errors.push('El campo "userSettings" debe ser un objeto.');
      } else {
        plan.data.userSettings = sourceData.userSettings;
        plan.counts.userSettings = {
          backupCount: Object.keys(sourceData.userSettings).length,
          currentCount: Object.keys(currentData.userSettings).length,
          duplicateCount: Object.keys(sourceData.userSettings).filter(key => key in currentData.userSettings).length
        };
      }
    } else if (isCurrentFormat) {
      plan.errors.push('Falta el campo obligatorio data.userSettings.');
    } else {
      plan.warnings.push('El respaldo antiguo no incluye preferencias del usuario; no se crearán valores por defecto.');
    }

    if (!isCurrentFormat) {
      plan.omittedOriginalFiles = (plan.data.academicDocuments ?? []).flatMap(document =>
        typeof document.fileName === 'string' ? [document.fileName] : []
      );
    }
    if ((plan.data.academicDocuments?.length ?? 0) > 0) {
      plan.warnings.push('Se importarán metadatos y texto extraído; los archivos PDF/TXT/MD originales no están incluidos en este respaldo.');
    }
    if (plan.data.userSettings && Object.keys(plan.data.userSettings).length === 0) {
      plan.warnings.push('El proyecto no persiste preferencias de usuario actualmente; no hay ajustes que restaurar.');
    }

    plan.valid = plan.errors.length === 0;
    return plan;
  }

  async applyBackupImport(
    plan: BackupImportPlan,
    mode: BackupImportMode,
    currentData: BackupData
  ): Promise<BackupData> {
    if (!plan.valid) throw new Error('El respaldo no pasó la validación y no se puede importar.');

    const next: BackupData = {
      microorganisms: [...currentData.microorganisms],
      academicDocuments: [...currentData.academicDocuments],
      extractionProposals: [...currentData.extractionProposals],
      auditLogs: [...currentData.auditLogs],
      bookmarks: [...currentData.bookmarks],
      bibliographyReferences: [...currentData.bibliographyReferences],
      userSettings: { ...currentData.userSettings }
    };
    const mergeRecords = <T extends { id: string }>(
      key: Exclude<BackupCollectionName, 'bookmarks'>,
      current: T[]
    ): T[] => {
      const incoming = plan.data[key] as T[] | undefined;
      if (!incoming) return current;
      return mode === 'restore' ? [...incoming] : mergeById(current, incoming);
    };

    next.microorganisms = mergeRecords('microorganisms', next.microorganisms);
    next.academicDocuments = mergeRecords('academicDocuments', next.academicDocuments);
    next.extractionProposals = mergeRecords('extractionProposals', next.extractionProposals);
    next.auditLogs = mergeRecords('auditLogs', next.auditLogs);
    next.bibliographyReferences = mergeRecords('bibliographyReferences', next.bibliographyReferences);
    if (Array.isArray(plan.data.bookmarks)) {
      next.bookmarks = mode === 'restore'
        ? [...plan.data.bookmarks]
        : mergeUniqueStrings(next.bookmarks, plan.data.bookmarks);
    }
    if (plan.data.userSettings) {
      next.userSettings = mode === 'restore'
        ? { ...plan.data.userSettings }
        : { ...plan.data.userSettings, ...next.userSettings };
    }

    const bundledReferenceIds = new Set(OFFICIAL_BIBLIOGRAPHY.map(reference => reference.id));
    const customReferences = next.bibliographyReferences.filter(reference => !bundledReferenceIds.has(reference.id));
    const valuesByCollection: Partial<Record<BackupCollectionName, unknown[]>> = {
      microorganisms: next.microorganisms,
      academicDocuments: next.academicDocuments,
      extractionProposals: next.extractionProposals,
      auditLogs: next.auditLogs,
      bookmarks: next.bookmarks,
      bibliographyReferences: customReferences
    };
    const writeEntries: Array<[string, string]> = [];
    for (const collection of ARRAY_COLLECTIONS) {
      if (Object.prototype.hasOwnProperty.call(plan.data, collection)) {
        writeEntries.push([
          STORAGE_KEYS[collection],
          JSON.stringify(valuesByCollection[collection])
        ]);
      }
    }
    if (Object.prototype.hasOwnProperty.call(plan.data, 'userSettings')) {
      writeEntries.push([STORAGE_KEYS.userSettings, JSON.stringify(next.userSettings)]);
    }

    const previousValues = writeEntries.map(([key]) => [key, this.storage.getItem(key)] as const);
    try {
      for (const [key, value] of writeEntries) this.storage.setItem(key, value);
    } catch (error) {
      let rollbackFailed = false;
      for (const [key, previousValue] of [...previousValues].reverse()) {
        try {
          if (previousValue === null) this.storage.removeItem(key);
          else this.storage.setItem(key, previousValue);
        } catch {
          rollbackFailed = true;
        }
      }
      const reason = error instanceof Error ? error.message : 'Error de almacenamiento';
      throw new Error(rollbackFailed
        ? `Falló la escritura (${reason}) y el navegador no permitió restaurar todo el estado anterior. Descarga el respaldo original y no cierres esta pestaña.`
        : `No se aplicó el respaldo porque el navegador rechazó el almacenamiento (${reason}). Los datos anteriores fueron restaurados.`);
    }
    return next;
  }

  clearDemoData(): void {
    this.storage.removeItem(STORAGE_KEYS.academicDocuments);
    this.storage.removeItem(STORAGE_KEYS.extractionProposals);
    this.storage.removeItem(STORAGE_KEYS.auditLogs);
  }

  private readArray<T>(key: string, fallback: T[]): T[] {
    try {
      const raw = this.storage.getItem(key);
      if (raw !== null) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed as T[];
      }
    } catch (error) {
      console.warn(`Error reading ${key} from localStorage:`, error);
    }
    return [...fallback];
  }

  private writeArray<T>(key: string, value: T[], label: string): void {
    try {
      this.storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${label} to localStorage:`, error);
    }
  }

  private assertPersistedStateReadable(): void {
    const arrayKeys = [
      STORAGE_KEYS.microorganisms,
      STORAGE_KEYS.academicDocuments,
      STORAGE_KEYS.extractionProposals,
      STORAGE_KEYS.auditLogs,
      STORAGE_KEYS.bookmarks,
      STORAGE_KEYS.bibliographyReferences
    ];
    for (const key of arrayKeys) {
      const raw = this.storage.getItem(key);
      if (raw === null) continue;
      let parsed: unknown;
      try {
        parsed = JSON.parse(raw);
      } catch {
        throw new Error(`No se exportó el respaldo: el dato local "${key}" no es JSON válido.`);
      }
      if (!Array.isArray(parsed)) {
        throw new Error(`No se exportó el respaldo: el dato local "${key}" no es una lista válida.`);
      }
    }
    const settings = this.storage.getItem(STORAGE_KEYS.userSettings);
    if (settings !== null) {
      let parsed: unknown;
      try {
        parsed = JSON.parse(settings);
      } catch {
        throw new Error('No se exportó el respaldo: las preferencias locales no son JSON válido.');
      }
      if (!isRecord(parsed)) {
        throw new Error('No se exportó el respaldo: las preferencias locales no tienen un formato válido.');
      }
    }
  }
}

export const storageService = new LocalStorageRepository();