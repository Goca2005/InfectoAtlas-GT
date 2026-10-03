import { officialSourceUrl, OFFICIAL_SOURCES } from '../../shared/officialSources.mjs';
import type { BulletinInput, BulletinStatus, OfficialBulletin, OfficialBulletinState } from '../types/officialBulletin';
import type { AcademicDocument } from '../types/academicLibrary';
import { GUATEMALA_DEPARTMENTS } from '../data/guatemalaDepartments';

export const OFFICIAL_EVENT = 'infectoatlas-official-change';
const SETTINGS = 'infectoatlas_user_settings_v1';
const KEY = 'infectoAtlasOfficialV1';
const object = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const text = (value: unknown, limit: number, min = 0): value is string => typeof value === 'string' && value.trim().length >= min && value.length <= limit;
const date = (value: unknown): value is string => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
const instant = (value: unknown): value is string => typeof value === 'string' && Number.isFinite(Date.parse(value));
const ids = (value: unknown): value is string[] => Array.isArray(value) && value.length <= 100 && value.every(id => text(id, 180, 1)) && new Set(value).size === value.length;
const statuses = ['pending', 'reviewed', 'discarded'];

export function validateBulletinInput(input: unknown): void {
  if (!object(input) || !text(input.title, 300, 3) || !text(input.territory, 200, 3) || !text(input.referencePeriod, 120)
    || !(input.publicationDate === null || date(input.publicationDate)) || !ids(input.departmentIds) || !ids(input.relatedOrganismIds)
    || !input.departmentIds.every(id => GUATEMALA_DEPARTMENTS.some(department => department.departmentId === id))
    || !['bulletin', 'alert', 'update'].includes(String(input.kind)) || !object(input.evidence)) throw new Error('Revisa el título, las fechas, el territorio y los vínculos del documento.');
  officialSourceUrl(input.sourceId, input.sourceUrl);
  const evidence = input.evidence;
  if (!text(evidence.excerpt, 3000, 30) || !Array.isArray(evidence.pages) || evidence.pages.length > 200
    || !evidence.pages.every((page, index) => object(page) && page.pageNumber === index + 1 && text(page.textContent, 200000)
      && typeof page.hasExtractableText === 'boolean' && Number.isSafeInteger(page.charCount) && page.charCount === page.textContent.length && ids(page.detectedMicroorganisms))
    || evidence.pages.reduce((total, page) => total + page.textContent.length, 0) > 200000) throw new Error('Se requiere un fragmento de 30 a 3000 caracteres y páginas válidas (máximo 200000 caracteres).');
  if (evidence.mode === 'pdf') {
    if (!text(evidence.fileName, 250, 1) || !Number.isSafeInteger(evidence.fileSize) || Number(evidence.fileSize) < 5 || Number(evidence.fileSize) > 10 * 1024 * 1024
      || typeof evidence.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(evidence.sha256) || !Number.isInteger(evidence.page)
      || !evidence.pages.some(page => page.pageNumber === evidence.page && page.hasExtractableText && page.textContent.includes(evidence.excerpt))) {
      throw new Error('El fragmento debe existir literalmente en la página seleccionada del PDF.');
    }
  } else if (evidence.mode !== 'transcribed' || evidence.page !== null || evidence.fileName !== null || evidence.fileSize !== null || evidence.sha256 !== null || evidence.pages.length) {
    throw new Error('La transcripción manual no puede presentarse como texto extraído de un PDF.');
  }
}

export class OfficialBulletinRepository {
  constructor(private readonly storage: Pick<Storage, 'getItem' | 'setItem'>) {}
  private settings() {
    const raw = this.storage.getItem(SETTINGS); const value: unknown = raw === null ? {} : JSON.parse(raw);
    if (!object(value)) throw new Error('Las preferencias están dañadas. Revisa tu respaldo antes de guardar documentos.');
    return value;
  }
  read(): OfficialBulletinState {
    const state = this.settings()[KEY];
    if (state === undefined) return { version: 1, bulletins: [] };
    try {
      if (!object(state) || state.version !== 1 || !Array.isArray(state.bulletins) || state.bulletins.length > 50) throw new Error();
      const recordIds = new Set<string>();
      for (const record of state.bulletins) {
        validateBulletinInput(record);
        if (!text(record.id, 100, 1) || recordIds.has(record.id) || !instant(record.importedAt) || !statuses.includes(record.status) || !Array.isArray(record.reviews) || record.reviews.length > 50
          || !record.reviews.every((review: unknown) => object(review) && text(review.id, 100, 1) && instant(review.at) && text(review.reviewer, 100, 2) && statuses.includes(String(review.action)) && text(review.note, 1500, 20))
          || (record.reviews.length ? record.reviews.at(-1).action !== record.status : record.status !== 'pending')) throw new Error();
        recordIds.add(record.id);
      }
      return state as unknown as OfficialBulletinState;
    } catch { throw new Error('El registro documental no es válido. Revisa tu respaldo antes de guardar cambios.'); }
  }
  private save(state: OfficialBulletinState) {
    this.read();
    this.storage.setItem(SETTINGS, JSON.stringify({ ...this.settings(), [KEY]: state }));
  }
  add(input: BulletinInput) {
    validateBulletinInput(input);
    const state = this.read();
    const sourceUrl = officialSourceUrl(input.sourceId, input.sourceUrl);
    if (state.bulletins.some(record => record.status !== 'discarded' && (record.sourceUrl === sourceUrl || (input.evidence.sha256 && record.evidence.sha256 === input.evidence.sha256)))) throw new Error('Este enlace o PDF ya está registrado. Revisa el documento existente.');
    if (state.bulletins.length >= 50) throw new Error('El registro conserva hasta 50 documentos. Exporta el respaldo antes de incorporar más.');
    const record: OfficialBulletin = { ...structuredClone(input), title: input.title.trim(), territory: input.territory.trim(), sourceUrl, id: crypto.randomUUID(), importedAt: new Date().toISOString(), status: 'pending', reviews: [] };
    this.save({ version: 1, bulletins: [record, ...state.bulletins] }); return record;
  }
  review(id: string, action: BulletinStatus, reviewer: string, note: string, confirmed: boolean) {
    const state = this.read(); const record = state.bulletins.find(item => item.id === id);
    if (!record || !statuses.includes(action) || !text(reviewer, 100, 2) || !text(note, 1500, 20) || !confirmed) throw new Error('Confirma la comparación con la fuente y escribe revisor y motivo (al menos 20 caracteres).');
    if (record.reviews.length >= 50) throw new Error('Este documento alcanzó el límite de 50 revisiones. Conserva su respaldo.');
    if (record.status === action) throw new Error('El documento ya tiene ese estado.');
    if (record.status !== 'pending' && action !== 'pending') throw new Error('Reabre el documento antes de realizar una nueva revisión.');
    if (action !== 'discarded' && state.bulletins.some(other => other.id !== id && other.status !== 'discarded' && (other.sourceUrl === record.sourceUrl || (record.evidence.sha256 && record.evidence.sha256 === other.evidence.sha256)))) throw new Error('Existe otra versión activa de este enlace o PDF. Conserva este registro descartado.');
    const updated = { ...record, status: action, reviews: [...record.reviews, { id: crypto.randomUUID(), at: new Date().toISOString(), action, reviewer: reviewer.trim(), note: note.trim() }] };
    this.save({ ...state, bulletins: state.bulletins.map(item => item.id === id ? updated : item) }); return updated;
  }
}

export function bulletinAcademicDocument(record: OfficialBulletin): AcademicDocument {
  validateBulletinInput(record);
  if (record.status !== 'reviewed' || record.evidence.mode !== 'pdf') throw new Error('Se requiere un PDF con su procedencia y fragmento revisados.');
  return {
    id: `official-${record.id}`, title: record.title, subject: 'Epidemiología', authorOrInstitution: OFFICIAL_SOURCES.find(source => source.id === record.sourceId)!.name,
    yearOrEdition: record.publicationDate ?? 'Fecha no informada', sourceTier: 'Boletín o alerta oficial MSPAS / OPS / OMS',
    uploadDate: record.importedAt, fileName: record.evidence.fileName ?? 'Transcripción manual (no PDF)', fileSizeBytes: record.evidence.fileSize ?? 0,
    pageCount: record.evidence.pages.length, pages: structuredClone(record.evidence.pages), unextractablePagesCount: record.evidence.pages.filter(page => !page.hasExtractableText).length,
    processingStatus: 'Sin procesar', extractedProposalsCount: 0,
    summaryNotes: `Procedencia revisada por el usuario, no aprobación clínica. ${record.sourceUrl}\nTerritorio: ${record.territory}\nPeríodo: ${record.referencePeriod || 'No informado'}\nFragmento: ${record.evidence.excerpt}`,
    officialSource: { bulletinId: record.id, sourceId: record.sourceId, url: record.sourceUrl, publicationDate: record.publicationDate, sha256: record.evidence.sha256, reviewedAt: record.reviews.at(-1)?.at ?? null, excerpt: record.evidence.excerpt, evidenceMode: record.evidence.mode },
  };
}

export function appendBulletinToLibrary(storage: Pick<Storage, 'getItem' | 'setItem'>, record: OfficialBulletin, initialDocuments: AcademicDocument[]) {
  const document = bulletinAcademicDocument(record);
  const key = 'infectoatlas_academic_docs_v3';
  const raw = storage.getItem(key);
  let documents: AcademicDocument[];
  try {
    const parsed: unknown = raw === null ? initialDocuments : JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(item => object(item) && typeof item.id === 'string' && typeof item.title === 'string' && Array.isArray(item.pages))) throw new Error();
    documents = parsed as AcademicDocument[];
  } catch { throw new Error('La biblioteca local no es válida. Revisa tu respaldo antes de incorporar documentos.'); }
  if (documents.some(item => item.id === document.id || (document.officialSource?.sha256 && item.officialSource?.sha256 === document.officialSource.sha256))) return { documents, added: false };
  const updated = [document, ...documents];
  // Report success only after persistence; a full quota leaves the prior library intact.
  storage.setItem(key, JSON.stringify(updated));
  return { documents: updated, added: true };
}
