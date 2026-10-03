export type LiveTopic = 'all' | 'diagnosis' | 'treatment' | 'resistance' | 'epidemiology' | 'vaccines';
export interface LiveArticle {
  pmid: string;
  doi: string | null;
  title: string;
  authors: string[];
  journal: string | null;
  publicationDate: string | null;
  electronicPublicationDate: string | null;
  publicationTypes: string[];
  abstracts: { label: string | null; text: string }[];
  pubmedUrl: string;
  retrievedAt: string;
  source: string;
  verificationStatus: 'Publicación científica recuperada';
  relatedOrganismIds?: string[];
}
export interface LiveSearchInput {
  q: string;
  organism: string;
  topic: LiveTopic;
  from: string;
  to: string;
  offset: number;
}
export interface LiveSearchResult {
  articles: LiveArticle[];
  total: number;
  offset: number;
  pageSize: number;
  hasMore: boolean;
  query: LiveSearchInput & { term: string };
  translatedQuery: string;
  retrievedAt: string;
  servedAt: string;
  cacheHit: boolean;
  source: string;
  sourceSearchUrl: string;
}
export interface LiveHistoryEntry {
  id: string;
  attemptedAt: string;
  success: boolean;
  term: string;
  retrievedAt?: string;
  records: number;
  newRecords: number;
  cacheHit: boolean;
  error?: string;
}
export interface LiveState {
  version: 1;
  followedIds: string[];
  articles: LiveArticle[];
  history: LiveHistoryEntry[];
}
