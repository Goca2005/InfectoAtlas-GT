import type { Microorganism } from '../types/microorganism';
import type { LiveArticle, LiveSearchInput, LiveSearchResult, LiveState } from '../types/live';
import { getOrganismTerms } from '../../shared/organismTerms.mjs';
import { pubmedSearchUrl } from '../../shared/pubmedUrl.mjs';
import { ALERTS_KEY, readAlerts, collectAlerts } from './liveAlerts';

export const emptyLiveState = (): LiveState => ({ version: 1, followedIds: [], articles: [], history: [] });
export const LIVE_EVENT = 'infectoatlas-live-change';
const SETTINGS_KEY = 'infectoatlas_user_settings_v1';
const LIVE_KEY = 'infectoAtlasLiveV1';
const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value);
export function isLiveArticle(value: unknown): value is LiveArticle {
  if (!isObject(value)) return false;
  return typeof value.pmid === 'string' && /^\d+$/.test(value.pmid) && typeof value.title === 'string'
    && value.pubmedUrl === `https://pubmed.ncbi.nlm.nih.gov/${value.pmid}/`
    && typeof value.retrievedAt === 'string' && Number.isFinite(Date.parse(value.retrievedAt))
    && (value.doi === null || typeof value.doi === 'string')
    && (value.journal === null || typeof value.journal === 'string')
    && (value.publicationDate === null || typeof value.publicationDate === 'string')
    && Array.isArray(value.authors) && value.authors.every(item => typeof item === 'string')
    && Array.isArray(value.publicationTypes) && value.publicationTypes.every(item => typeof item === 'string')
    && Array.isArray(value.abstracts) && value.abstracts.every(item => isObject(item) && typeof item.text === 'string' && (item.label === null || typeof item.label === 'string'))
    && (value.relatedOrganismIds === undefined || Array.isArray(value.relatedOrganismIds) && value.relatedOrganismIds.every(id => typeof id === 'string'));
}
const doiKey = (article: LiveArticle) => article.doi?.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '').trim().toLowerCase();
export function mergeArticles(current: LiveArticle[], incoming: LiveArticle[]) {
  const articles = current.map(article => ({ ...article }));
  let newRecords = 0;
  for (const article of incoming) {
    const doi = doiKey(article);
    const index = articles.findIndex(existing => existing.pmid === article.pmid || Boolean(doi && doiKey(existing) === doi));
    if (index < 0) { articles.unshift(article); newRecords++; }
    else {
      const previous = articles[index];
      const relatedOrganismIds = [...new Set([...(previous.relatedOrganismIds ?? []), ...(article.relatedOrganismIds ?? [])])];
      articles[index] = { ...article, relatedOrganismIds };
    }
  }
  return { articles: articles.slice(0, 100), newRecords };
}

// Store alongside preferences so the existing SHA-256 backup includes LIVE.
export class LiveRepository {
  constructor(private readonly storage: Pick<Storage, 'getItem' | 'setItem'>) {}
  private settings(): Record<string, unknown> {
    const raw = this.storage.getItem(SETTINGS_KEY);
    const settings: unknown = raw === null ? {} : JSON.parse(raw);
    if (!isObject(settings)) throw new Error('Las preferencias locales no son válidas. Exporta o revisa tu respaldo antes de guardar LIVE.');
    return settings;
  }
  read(): LiveState {
    const live = this.settings()[LIVE_KEY];
    if (live === undefined) return emptyLiveState();
    if (!isObject(live) || live.version !== 1 || !Array.isArray(live.followedIds) || !live.followedIds.every(id => typeof id === 'string')
      || !Array.isArray(live.articles) || !live.articles.every(isLiveArticle) || !Array.isArray(live.history)
      || !live.history.every(entry => isObject(entry) && typeof entry.id === 'string' && typeof entry.success === 'boolean' && typeof entry.term === 'string' && typeof entry.attemptedAt === 'string' && Number.isFinite(Date.parse(entry.attemptedAt)) && typeof entry.records === 'number' && typeof entry.newRecords === 'number' && typeof entry.cacheHit === 'boolean'
        && (entry.error === undefined || typeof entry.error === 'string') && (entry.retrievedAt === undefined || typeof entry.retrievedAt === 'string' && Number.isFinite(Date.parse(entry.retrievedAt))))) {
      throw new Error('El historial local LIVE no es válido. Revisa el respaldo antes de guardar cambios.');
    }
    return live as unknown as LiveState;
  }
  save(live: LiveState) {
    this.read(); // A damaged state must never be silently replaced.
    this.storage.setItem(SETTINGS_KEY, JSON.stringify({ ...this.settings(), [LIVE_KEY]: live }));
  }
  readAlerts() { return readAlerts(this.settings()[ALERTS_KEY], this.read().articles); }
  markAlertsRead(ids: string[], read = true) {
    const state = this.readAlerts();
    const now = new Date().toISOString();
    const alerts = state.alerts.map(alert => ids.includes(alert.id) ? { ...alert, readAt: read ? alert.readAt ?? now : null } : alert);
    this.storage.setItem(SETTINGS_KEY, JSON.stringify({ ...this.settings(), [ALERTS_KEY]: { ...state, alerts } }));
  }
  toggleFollow(id: string) {
    const live = this.read();
    this.save({ ...live, followedIds: live.followedIds.includes(id) ? live.followedIds.filter(value => value !== id) : [...live.followedIds, id] });
  }
  recordSuccess(result: LiveSearchResult, attemptedAt: string, microorganisms: Microorganism[], selectedId?: string) {
    const live = this.read();
    const previousAlerts = this.readAlerts();
    const incoming = result.articles.map(article => {
      const text = `${article.title} ${article.abstracts.map(section => section.text).join(' ')}`.toLowerCase();
      const matches = microorganisms.filter(organism => {
        return getOrganismTerms(organism).some(term => {
          const name = term.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          return new RegExp(`(^|[^a-z])${name}($|[^a-z])`, 'i').test(text);
        });
      }).map(organism => organism.id);
      return { ...article, relatedOrganismIds: [...new Set([...matches, ...(selectedId ? [selectedId] : [])])] };
    });
    const merged = mergeArticles(live.articles, incoming);
    const alerts = collectAlerts(previousAlerts, incoming, live.followedIds, result, attemptedAt);
    const next = { ...live, articles: merged.articles, history: [{
      id: crypto.randomUUID(), attemptedAt, success: true, term: result.query.term,
      retrievedAt: result.retrievedAt, records: result.articles.length, newRecords: merged.newRecords, cacheHit: result.cacheHit,
    }, ...live.history].slice(0, 50) };
    // One write commits the article history and alert ledger together, including on quota errors.
    this.storage.setItem(SETTINGS_KEY, JSON.stringify({ ...this.settings(), [LIVE_KEY]: next, [ALERTS_KEY]: alerts }));
    return { newRecords: merged.newRecords, articles: incoming, newAlerts: alerts.alerts.filter(alert => !previousAlerts.alerts.some(old => old.id === alert.id)).length };
  }
  recordFailure(term: string, attemptedAt: string, error: string) {
    const live = this.read();
    this.save({ ...live, history: [{ id: crypto.randomUUID(), attemptedAt, success: false, term, records: 0, newRecords: 0, cacheHit: false, error }, ...live.history].slice(0, 50) });
  }
}

export class LiveSearchError extends Error {
  constructor(message: string, public readonly status: number) { super(message); }
}

export async function searchPubmed(input: LiveSearchInput, signal: AbortSignal): Promise<LiveSearchResult> {
  const params = new URLSearchParams(['q', 'organism', 'topic', 'from', 'to', 'offset'].map(key => [key, String(input[key as keyof LiveSearchInput])]));
  const response = await fetch(`/api/live/pubmed?${params}`, { signal, headers: { Accept: 'application/json' } });
  let data: unknown;
  try { data = await response.json(); } catch { throw new Error('El servidor de PubMed no está disponible. Inicia la aplicación con su servidor incluido.'); }
  if (!response.ok) throw new LiveSearchError(isObject(data) && typeof data.error === 'string' ? data.error : 'Falló la consulta a PubMed.', response.status);
  if (!isObject(data) || !Array.isArray(data.articles) || !data.articles.every(isLiveArticle) || !isObject(data.query)
    || typeof data.total !== 'number' || !Number.isSafeInteger(data.total) || data.total < 0
    || typeof data.retrievedAt !== 'string' || !Number.isFinite(Date.parse(data.retrievedAt))
    || typeof data.servedAt !== 'string' || !Number.isFinite(Date.parse(data.servedAt))
    || typeof data.cacheHit !== 'boolean' || typeof data.hasMore !== 'boolean' || typeof data.offset !== 'number' || data.pageSize !== 20
    || typeof data.query.term !== 'string' || typeof data.query.organism !== 'string' || typeof data.query.from !== 'string' || typeof data.query.to !== 'string'
    || data.sourceSearchUrl !== pubmedSearchUrl(data.query.term, data.query.from, data.query.to)) {
    throw new Error('La respuesta de PubMed no tiene el formato esperado.');
  }
  return data as unknown as LiveSearchResult;
}
