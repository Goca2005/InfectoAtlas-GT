import type { LiveArticle, LiveSearchResult } from '../types/live';

export interface ScientificAlert {
  id: string;
  pmid: string;
  doi: string | null;
  title: string;
  pubmedUrl: string;
  organismIds: string[];
  detectedAt: string;
  retrievedAt: string;
  publicationDate: string | null;
  electronicPublicationDate?: string | null;
  query: string;
  sourceSearchUrl: string;
  readAt: string | null;
}
export interface LiveAlertsState { version: 1; alerts: ScientificAlert[]; seenKeys: string[] }
export const ALERTS_KEY = 'infectoAtlasAlertsV1';
export const articleKeys = (article: Pick<LiveArticle, 'pmid' | 'doi'>) => [
  `pmid:${article.pmid}`,
  ...(article.doi?.trim() ? [`doi:${article.doi.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '').trim().toLowerCase()}`] : []),
];
const validDate = (value: unknown) => typeof value === 'string' && Number.isFinite(Date.parse(value));
const strings = (value: unknown): value is string[] => Array.isArray(value) && value.every(item => typeof item === 'string');

export function readAlerts(value: unknown, existing: LiveArticle[]): LiveAlertsState {
  if (value === undefined) return { version: 1, alerts: [], seenKeys: [...new Set(existing.flatMap(articleKeys))].slice(0, 1000) };
  const state = value as LiveAlertsState;
  if (!state || state.version !== 1 || !strings(state.seenKeys) || state.seenKeys.length > 1000
    || !Array.isArray(state.alerts) || state.alerts.length > 100 || !state.alerts.every(alert => alert && typeof alert.id === 'string'
      && typeof alert.pmid === 'string' && /^\d+$/.test(alert.pmid) && typeof alert.title === 'string' && (alert.doi === null || typeof alert.doi === 'string')
      && alert.pubmedUrl === `https://pubmed.ncbi.nlm.nih.gov/${alert.pmid}/` && strings(alert.organismIds)
      && validDate(alert.detectedAt) && validDate(alert.retrievedAt) && (alert.readAt === null || validDate(alert.readAt))
      && (alert.publicationDate === null || typeof alert.publicationDate === 'string') && typeof alert.query === 'string'
      && (alert.electronicPublicationDate === undefined || alert.electronicPublicationDate === null || typeof alert.electronicPublicationDate === 'string')
      && typeof alert.sourceSearchUrl === 'string' && alert.sourceSearchUrl.startsWith('https://pubmed.ncbi.nlm.nih.gov/?term='))) {
    throw new Error('La bandeja de alertas no es válida. Revisa tu respaldo antes de guardar cambios.');
  }
  return state;
}

// A recovered publication is a literature notification, never an outbreak or clinical recommendation.
export function collectAlerts(state: LiveAlertsState, articles: LiveArticle[], followedIds: string[], result: LiveSearchResult, detectedAt: string): LiveAlertsState {
  const alerts = state.alerts.map(alert => ({ ...alert, organismIds: [...alert.organismIds] }));
  const seen = new Set(state.seenKeys);
  for (const article of articles) {
    const keys = articleKeys(article);
    const known = keys.some(key => seen.has(key));
    const matched = (article.relatedOrganismIds ?? []).filter(id => followedIds.includes(id));
    const previous = alerts.find(alert => articleKeys(alert).some(key => keys.includes(key)));
    if (previous) previous.organismIds = [...new Set([...previous.organismIds, ...matched])];
    if (!known && !previous && matched.length) alerts.unshift({
      id: crypto.randomUUID(), pmid: article.pmid, doi: article.doi, title: article.title, pubmedUrl: article.pubmedUrl,
      organismIds: [...new Set(matched)], detectedAt, retrievedAt: result.retrievedAt, publicationDate: article.publicationDate,
      electronicPublicationDate: article.electronicPublicationDate,
      query: result.query.term, sourceSearchUrl: result.sourceSearchUrl, readAt: null,
    });
    // Refresh recency even for a cached/repeated result; do not reset its read status.
    for (const key of keys) { seen.delete(key); seen.add(key); }
  }
  return { version: 1, alerts: alerts.slice(0, 100), seenKeys: [...seen].slice(-1000) };
}
