import data from '../data/academicContent.json';
import { normalizeScientificName } from './catalogExpansion';
import type { FichaSectionId } from './academicFicha';
import type { Microorganism } from '../types/microorganism';

export interface AcademicSource {
  id: string; url: string; title: string; issuer: string; kind: string;
  consultedAt: string; published?: string;
}
export interface AcademicBlock {
  section: FichaSectionId; title: string; paragraphs: string[]; sourceIds: string[];
}
export interface AcademicProfile {
  scientificName: string; aliases: string[]; category: Microorganism['category'];
  subtitle: string; scope: string; newReference: boolean; sourceIds: string[]; sections: AcademicBlock[];
}
export const ACADEMIC_PROFILES = data.profiles as AcademicProfile[];
export const ACADEMIC_SOURCES = data.sources as AcademicSource[];
export const ACADEMIC_REVIEW_STATUS = data.reviewStatus;
export function academicProfile(name: string) {
  const key = normalizeScientificName(name);
  return ACADEMIC_PROFILES.find(p => p.aliases.some(a => normalizeScientificName(a) === key));
}
export function academicSources(ids: readonly string[]) {
  return ACADEMIC_SOURCES.filter(s => ids.includes(s.id));
}
export function academicSearchText(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim();
}
export function matchingAcademicBlocks(profile: AcademicProfile | undefined, section: FichaSectionId, query = '') {
  const key = academicSearchText(query);
  return (profile?.sections ?? []).filter(b => b.section === section && (!key || academicSearchText([
    b.title, ...b.paragraphs, ...academicSources(b.sourceIds).map(s => `${s.issuer} ${s.title}`),
  ].join(' ')).includes(key)));
}
/** Search only the corresponding saved section; never rewrite a personal record. */
export function savedSectionMatches(o: Microorganism, section: FichaSectionId, query: string) {
  const fields: Record<FichaSectionId, unknown> = {
    identity: [o.taxonomy, o.morphology, o.microbiologyCharacteristics, o.externalAndInternalStructures],
    clinical: [o.associatedDiseases, o.signsAndSymptoms, o.complications, o.virulenceFactors],
    diagnosis: [o.clinicalSpecimens, o.diagnosticMethods, o.labFindings],
    treatment: o.treatment, prevention: [o.reservoir, o.transmissionRoute, o.vector, o.prevention],
    cycle: o.parasiticStages, guatemala: o.guatemalaRelevance, sources: o.bibliography,
  };
  return !!query.trim() && academicSearchText(JSON.stringify(fields[section]) ?? '').includes(academicSearchText(query));
}
