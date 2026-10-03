import type { Microorganism } from '../types/microorganism';
import { REFERENCE_MICROORGANISMS } from '../data/referenceMicroorganisms';

export const normalizeScientificName = (name: string) => name.normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('en');
export function missingReferences(current: Microorganism[]) {
  const names = new Set(current.map(org => normalizeScientificName(org.scientificName)));
  const ids = new Set(current.map(org => org.id));
  return REFERENCE_MICROORGANISMS.filter(org => !names.has(normalizeScientificName(org.scientificName)) && !ids.has(org.id));
}
export function appendReferenceBatch(current: Microorganism[]) {
  return [...current, ...missingReferences(current).map(org => structuredClone(org))];
}
// Read the latest stored catalogue and write once. Failure must reach the UI.
export function saveMissingReferences(storage: Pick<Storage, 'getItem' | 'setItem'>, fallback: Microorganism[]) {
  const key = 'infectoatlas_microorganisms_v3';
  const raw = storage.getItem(key);
  const current: unknown = raw === null ? fallback : JSON.parse(raw);
  if (!Array.isArray(current) || current.some(org => !org || typeof org.id !== 'string' || typeof org.scientificName !== 'string')) {
    throw new Error('El catálogo guardado no es válido. Exporta el respaldo y revisa los datos antes de añadir fichas.');
  }
  const next = appendReferenceBatch(current);
  if (next.length !== current.length) storage.setItem(key, JSON.stringify(next));
  return { organisms: next, added: next.length - current.length };
}
