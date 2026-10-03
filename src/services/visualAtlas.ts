import type { Microorganism, MicroorganismCategory } from '../types/microorganism';
import { curatedImages, learningSupplement } from './learningAtlas';
import { clinicalPatterns } from './clinicalPatterns';
import { catalogIdentity } from './publicCatalog';

export const IMAGE_TYPE_LABELS: Record<string, string> = { microfotografia_real: 'Microscopía', fotografia_cultivo: 'Cultivos', fotografia_clinica: 'Manifestaciones clínicas', fotografia_vector: 'Vectores', fotografia_entorno: 'Entorno' };
export interface VisualAtlasEntry { key: string; image: Microorganism['imagery'][number]; organisms: Microorganism[] }
export function buildVisualAtlas(organisms: Microorganism[]): VisualAtlasEntry[] {
  const urls = new Map<string, VisualAtlasEntry>(), ids = new Map<string, VisualAtlasEntry>();
  const entries: VisualAtlasEntry[] = [];
  for (const organism of organisms) for (const image of curatedImages(organism)) {
    if (!(image.type in IMAGE_TYPE_LABELS)) continue;
    const url = new URL(image.url!);
    const key = url.origin + url.pathname.replace(/\/{2,}/g, '/');
    const id = image.imageId?.trim().toLowerCase();
    const existing = urls.get(key) ?? (id ? ids.get(id) : undefined);
    if (existing) {
      if (!existing.organisms.some(o => o.id === organism.id)) existing.organisms.push(organism);
      urls.set(key, existing); if (id) ids.set(id, existing);
    } else {
      const entry = { key, image, organisms: [organism] }; entries.push(entry);
      urls.set(key, entry); if (id) ids.set(id, entry);
    }
  }
  return entries;
}
export function filterVisualAtlas(entries: VisualAtlasEntry[], filters: { category?: MicroorganismCategory | 'all'; type?: string; organismId?: string; organismKey?: string; query?: string }) {
  const q = filters.query?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase() ?? '';
  return entries.filter(e => (!filters.type || filters.type === 'all' || e.image.type === filters.type)
    && e.organisms.some(o => (!filters.category || filters.category === 'all' || o.category === filters.category) && (!filters.organismId || filters.organismId === 'all' || o.id === filters.organismId) && (!filters.organismKey || filters.organismKey === 'all' || catalogIdentity(o.scientificName) === filters.organismKey))
    && `${e.image.caption} ${e.image.stainOrModality} ${e.image.imageId ?? ''} ${e.organisms.map(o => o.scientificName).join(' ')}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(q));
}
export function visualCoverage(organisms: Microorganism[]) {
  const counts = organisms.map(o => curatedImages(o).length);
  return { withImages: counts.filter(n => n > 0).length, atLeastEight: counts.filter(n => n >= 8).length, withoutImages: counts.filter(n => n === 0).length,
    clinicalProfiles: organisms.filter(o => clinicalPatterns(o.scientificName).length > 0).length,
    cycles: organisms.filter(o => (learningSupplement(o)?.cycles.length ?? 0) > 0).length };
}
