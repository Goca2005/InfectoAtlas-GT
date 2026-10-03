import { buildSpecimenCollection, type SpecimenImage, type SpecimenKind } from './specimenLab';
import type { Microorganism } from '../types/microorganism';
export const PRACTICE_KINDS: SpecimenKind[] = ['blood', 'stool', 'tissue', 'culture'];
/** Exercises ask about the documented preparation, never infer a diagnosis from pixels. */
export function observationSession(organisms: Microorganism[], offset = 0, size = 6): SpecimenImage[] {
  const pool = buildSpecimenCollection(organisms);
  const groups = PRACTICE_KINDS.map(kind => pool.filter(i => i.specimen === kind));
  const result: SpecimenImage[] = [], seen = new Set<string>();
  const start = Math.max(0, Math.trunc(offset));
  for (let step = 0; step < pool.length * 4 && result.length < Math.min(20, Math.max(1, size)); step++) {
    const group = groups[step % groups.length];
    if (!group.length) continue;
    const entry = group[(start + Math.floor(step / groups.length)) % group.length];
    if (!seen.has(entry.id)) { seen.add(entry.id); result.push(entry); }
  }
  return result;
}
