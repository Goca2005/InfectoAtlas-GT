import type { Microorganism } from '../types/microorganism';
import type { LiveSearchInput, LiveSearchResult } from '../types/live';
import { organismSearchTerm } from '../../shared/organismTerms.mjs';
import { LiveRepository, LiveSearchError, searchPubmed } from './liveService';

export interface RefreshProgress { organismId: string; name: string; success: boolean; records: number; newAlerts: number; error?: string }
export async function refreshFollowed(options: {
  organisms: Microorganism[]; from: string; to: string; signal: AbortSignal; repository: LiveRepository;
  catalogue: Microorganism[]; onProgress: (progress: RefreshProgress) => void;
  search?: (input: LiveSearchInput, signal: AbortSignal) => Promise<LiveSearchResult>;
}) {
  const ids = options.organisms.map(organism => organism.id);
  if (!ids.length || ids.length > 10 || new Set(ids).size !== ids.length) throw new Error('Elige entre uno y diez microorganismos diferentes.');
  if (!ids.every(id => options.repository.read().followedIds.includes(id))) throw new Error('Solo puedes consultar microorganismos seguidos.');
  const validDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date) && Number.isFinite(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date;
  if (!validDate(options.from) || !validDate(options.to) || options.from > options.to) throw new Error('Revisa las fechas del intervalo.');
  const outcomes: RefreshProgress[] = [];
  for (const organism of options.organisms) {
    if (options.signal.aborted) break;
    if (!options.repository.read().followedIds.includes(organism.id)) continue;
    const attemptedAt = new Date().toISOString();
    const input: LiveSearchInput = { q: '', organism: organismSearchTerm(organism), topic: 'all', from: options.from, to: options.to, offset: 0 };
    let stop = false;
    let progress: RefreshProgress;
    try {
      const requestSignal = AbortSignal.any([options.signal, AbortSignal.timeout(55000)]);
      const result = await (options.search ?? searchPubmed)(input, requestSignal);
      if (options.signal.aborted) break;
      if (requestSignal.aborted) throw new Error('La consulta agotó el tiempo de espera. Intenta nuevamente.');
      const saved = options.repository.recordSuccess(result, attemptedAt, options.catalogue, organism.id);
      progress = { organismId: organism.id, name: organism.scientificName, success: true, records: result.articles.length, newAlerts: saved.newAlerts };
    } catch (failure) {
      if (options.signal.aborted) break;
      const error = failure instanceof Error && failure.name === 'TimeoutError' ? 'La consulta agotó el tiempo de espera. Intenta nuevamente.' : failure instanceof Error ? failure.message : 'No se pudo consultar.';
      try { options.repository.recordFailure(input.organism, attemptedAt, error); } catch { stop = true; }
      progress = { organismId: organism.id, name: organism.scientificName, success: false, records: 0, newAlerts: 0, error };
      // Do not keep retrying a batch when the backend or upstream is unavailable/limited.
      stop ||= !(failure instanceof LiveSearchError) || failure.status === 429 || failure.status >= 500;
    }
    outcomes.push(progress);
    options.onProgress(progress);
    if (stop) break;
  }
  return outcomes;
}
