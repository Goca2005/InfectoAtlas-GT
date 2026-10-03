import type { Microorganism, MicroorganismCategory } from '../types/microorganism';
import type { ExtractionProposal } from '../types/academicLibrary';
import { normalizeScientificName } from './catalogExpansion';
const legacyCategories: Record<string, MicroorganismCategory> = {
  'toxoplasma gondii': 'parasito', 'schistosoma mansoni': 'parasito',
  'shigella dysenteriae': 'bacteria', 'campylobacter jejuni': 'bacteria',
  'histoplasma capsulatum': 'hongo', 'zika virus': 'virus'
};
export function createOrganismFromProposal(proposal: ExtractionProposal, text: string, sourceYear?: string): Microorganism {
  const category = proposal.proposedCategory ?? legacyCategories[normalizeScientificName(proposal.targetMicroorganismName)];
  if (!['bacteria', 'virus', 'hongo', 'parasito'].includes(category)) throw new Error('La propuesta no tiene una categoría documentada. Vuelve a analizar el documento.');
  return {
    id: proposal.targetMicroorganismId, scientificName: proposal.targetMicroorganismName, category,
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: { genus: proposal.targetMicroorganismName.split(' ')[0], species: proposal.targetMicroorganismName, family: 'Pendiente de taxonomía completa' },
    morphology: { shape: 'Pendiente de revisión; mención documental: ' + text, size: 'No documentado', specialStructures: [] },
    microbiologyCharacteristics: {}, externalAndInternalStructures: [], virulenceFactors: [], reservoir: [], transmissionRoute: [],
    associatedDiseases: [], signsAndSymptoms: [], complications: [], clinicalSpecimens: [], diagnosticMethods: [], labFindings: [],
    treatment: { disclaimer: 'No se ha extraído ni validado un protocolo terapéutico para esta nueva ficha.', firstLine: [], alternatives: [] }, prevention: [],
    guatemalaRelevance: { endemicStatus: 'No documentado en esta ficha', priorityLevel: 'No evaluada', departmentsWithHighPrevalence: [], officialNotes: 'Pendiente de evidencia nacional y revisión clínica.' }, imagery: [],
    bibliography: [{ source: proposal.documentTitle, title: `Mención documental en página ${proposal.sourcePage}`, year: sourceYear || 'No informada', status: 'Fuentes pendientes de revisión' }],
    lastReviewedDate: new Date().toISOString().slice(0, 10)
  };
}
