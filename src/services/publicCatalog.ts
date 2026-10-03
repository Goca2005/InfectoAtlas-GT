import { INITIAL_MICROORGANISMS } from '../data/microorganisms';
import { REFERENCE_MICROORGANISMS } from '../data/referenceMicroorganisms';
import { DOCUMENT_TAXA } from '../data/documentTaxa';
import { CLINICAL_PATTERNS, clinicalPatterns } from './clinicalPatterns';
import { normalizeScientificName } from './catalogExpansion';
import { learningSupplement } from './learningAtlas';
import type { Microorganism } from '../types/microorganism';

export function catalogIdentity(name: string) {
  const normalized = normalizeScientificName(name);
  const taxon = DOCUMENT_TAXA.find(t => t.aliases.some(a => normalizeScientificName(a) === normalized));
  return normalizeScientificName(taxon?.name ?? learningSupplement({ scientificName: name })?.scientificName ?? name);
}

function clinicalReference(name: string): Microorganism | undefined {
  const taxon = DOCUMENT_TAXA.find(t => catalogIdentity(t.name) === catalogIdentity(name));
  const patterns = clinicalPatterns(name);
  if (!taxon || !patterns.length) return undefined;
  return {
    id: `public-reference-${catalogIdentity(name).replace(/[^a-z0-9]+/g, '-')}`,
    scientificName: taxon.name, category: taxon.category, publicReference: true,
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: { family: 'Taxonomía completa pendiente', genus: 'No informado en esta ficha', species: taxon.name },
    morphology: { shape: 'Referencia clínica inicial. Morfología y laboratorio pendientes de ampliar.', size: 'No informado en esta ficha', specialStructures: [] },
    microbiologyCharacteristics: {}, externalAndInternalStructures: [], virulenceFactors: [], reservoir: [], transmissionRoute: [],
    associatedDiseases: [], signsAndSymptoms: patterns.flatMap(p => p.manifestations), complications: [],
    clinicalSpecimens: [], diagnosticMethods: [], labFindings: [],
    treatment: { disclaimer: 'Esta referencia inicial no contiene un protocolo terapéutico. Revisar una guía vigente y su aplicación local.', firstLine: [], alternatives: [] },
    prevention: [], guatemalaRelevance: { endemicStatus: 'No documentado en esta ficha', priorityLevel: 'No evaluada', departmentsWithHighPrevalence: [], officialNotes: 'Referencia internacional para estudio en Guatemala. No aporta incidencia ni confirma circulación nacional.' },
    imagery: [], bibliography: patterns.map(p => ({ source: 'CDC', title: p.title, url: p.sourceUrl, year: 'Consultar fecha en la fuente', consultedAt: '2026-10-03', status: 'Fuentes pendientes de revisión' })),
    lastReviewedDate: 'Pendiente de revisión clínica independiente',
  };
}

function referenceCatalog(): Microorganism[] {
  const map = new Map<string, Microorganism>();
  for (const o of [...INITIAL_MICROORGANISMS, ...REFERENCE_MICROORGANISMS]) map.set(catalogIdentity(o.scientificName), { ...o, publicReference: true });
  for (const p of CLINICAL_PATTERNS) for (const name of p.names) {
    const key = catalogIdentity(name);
    if (!map.has(key)) { const reference = clinicalReference(name); if (reference) map.set(key, reference); }
  }
  return Array.from(map.values());
}

export const PUBLIC_REFERENCE_CATALOG = referenceCatalog();
/** Personal records win. New public references stay in memory and never enter backups automatically. */
export function buildPublicCatalog(saved: Microorganism[]): Microorganism[] {
  const known = new Set(saved.map(o => catalogIdentity(o.scientificName)));
  const ids = new Set(saved.map(o => o.id));
  const additions = PUBLIC_REFERENCE_CATALOG.filter(o => !known.has(catalogIdentity(o.scientificName))).map(o => {
    let id = o.id, suffix = 1;
    while (ids.has(id)) id = `public-${o.id}-${suffix++}`;
    ids.add(id);
    return id === o.id ? o : { ...o, id };
  });
  return [...saved, ...additions];
}
