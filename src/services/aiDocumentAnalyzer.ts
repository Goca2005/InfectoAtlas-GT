import { AcademicDocument, ExtractionProposal, FieldToModify } from '../types/academicLibrary';
import { normalizeScientificName } from './catalogExpansion';
import { Microorganism, MicroorganismCategory } from '../types/microorganism';

/**
 * Intelligent Document Analyzer for University Medical Documents & Clinical Guidelines.
 * Extracts structured clinical facts page by page, matches with existing catalog,
 * proposes additions or modifications, and flags potential contradictions.
 */
export async function analyzeAcademicDocument(
  doc: AcademicDocument,
  existingMicroorganisms: Microorganism[]
): Promise<ExtractionProposal[]> {
  // Deterministic text rules; proposals still need human review.

  const proposals: ExtractionProposal[] = [];
  const knownOrganismsMap = new Map<string, Microorganism>();

  // Map known scientific names and common names for fast matching
  existingMicroorganisms.forEach((m) => {
    knownOrganismsMap.set(m.scientificName.toLowerCase(), m);
    if (m.commonName) {
      knownOrganismsMap.set(m.commonName.toLowerCase(), m);
    }
    // Also map genus + species abbreviated (e.g., T. cruzi, P. vivax)
    const parts = m.scientificName.split(' ');
    if (parts.length >= 2) {
      const abbr = `${parts[0][0]}. ${parts[1]}`.toLowerCase();
      knownOrganismsMap.set(abbr, m);
    }
  });

  // Candidate external microorganisms not currently in the base 24 catalog
  const existingNames = new Set(existingMicroorganisms.map(org => normalizeScientificName(org.scientificName)));
  const potentialNewOrganisms: { name: string; genus: string; category: MicroorganismCategory }[] = [
    { name: 'Toxoplasma gondii', genus: 'Toxoplasma', category: 'parasito' },
    { name: 'Schistosoma mansoni', genus: 'Schistosoma', category: 'parasito' },
    { name: 'Shigella dysenteriae', genus: 'Shigella', category: 'bacteria' },
    { name: 'Campylobacter jejuni', genus: 'Campylobacter', category: 'bacteria' },
    { name: 'Histoplasma capsulatum', genus: 'Histoplasma', category: 'hongo' },
    { name: 'Zika virus', genus: 'Flavivirus', category: 'virus' }
  ];

  doc.pages.forEach((page) => {
    if (!page.hasExtractableText || !page.textContent.trim()) {
      return;
    }

    const text = page.textContent;

    // 1. Detect matching existing organisms in page text
    existingMicroorganisms.forEach((org) => {
      const sciNameRegex = new RegExp(`\\b${org.scientificName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      const genusSpeciesAbbr = org.scientificName.split(' ').length >= 2
        ? `${org.scientificName.split(' ')[0][0]}\\.\\s+${org.scientificName.split(' ')[1]}`
        : null;
      const abbrRegex = genusSpeciesAbbr ? new RegExp(`\\b${genusSpeciesAbbr}\\b`, 'i') : null;

      const isMentioned = sciNameRegex.test(text) || (abbrRegex && abbrRegex.test(text));

      if (isMentioned) {
        // Look for Morphological findings
        if (/morfolog[ií]a|huevo|larva|quiste|trofozo[ií]to|progl[oó]tide|esc[oó]lex|anillo|gametocito|esquizonte|bacilo|coco/i.test(text)) {
          const sentences = text.split(/(?<=[.!?])\s+/);
          const relevantSentence = sentences.find((s) =>
            /morfolog[ií]a|huevo|larva|quiste|trofozo[ií]to|ramificaci|esf[eé]rico|patognom[oó]nico/i.test(s)
          ) || sentences[0];

          if (relevantSentence && relevantSentence.length > 30) {
            let contradictionNotice: string | null = null;
            if (/huevo.*taenia.*indistinguible/i.test(text)) {
              contradictionNotice = 'Regla diagnóstica clave: Los huevos de T. solium y T. saginata son indistinguibles por microscopía óptica convencional. No deben reportarse con especie en coprológico directo.';
            }

            proposals.push({
              id: `prop-${doc.id}-p${page.pageNumber}-${org.id}-morph`,
              documentId: doc.id,
              documentTitle: doc.title,
              sourceTier: doc.sourceTier,
              sourcePage: page.pageNumber,
              sourceSnippet: relevantSentence.slice(0, 260) + (relevantSentence.length > 260 ? '...' : ''),
              originalSnippet: relevantSentence.trim(),
              isExplicitFact: true,
              targetMicroorganismId: org.id,
              targetMicroorganismName: org.scientificName,
              isNewOrganism: false,
              field: 'Morfología microscópica',
              previousValue: org.morphology.shape + (org.morphology.size ? ` (${org.morphology.size})` : ''),
              proposedValue: `Extracción documental (Pág. ${page.pageNumber}): ${relevantSentence.trim()}`,
              potentialContradiction: contradictionNotice,
              verificationStatus:
                doc.sourceTier === 'Guía oficial MSPAS / OPS'
                  ? 'Guía oficial MSPAS (Normativa nacional)'
                  : doc.sourceTier === 'Publicación científica indexada'
                  ? 'Verificado con literatura científica'
                  : 'Información procedente de apunte universitario (Requiere comprobación)',
              status: 'pendiente'
            });
          }
        }

        // Look for Diagnostic Methods
        if (/diagn[oó]stico|muestra|coprol[oó]gico|giemsa|gota gruesa|strout|elisa|baermann|koga|tac|rmn|western blot/i.test(text)) {
          const sentences = text.split(/(?<=[.!?])\s+/);
          const diagSentence = sentences.find((s) =>
            /diagn[oó]stico|baermann|koga|serolog|strout|elisa|gota gruesa|progl[oó]tide|tamizado/i.test(s)
          ) || sentences[0];

          if (diagSentence && diagSentence.length > 35) {
            proposals.push({
              id: `prop-${doc.id}-p${page.pageNumber}-${org.id}-diag`,
              documentId: doc.id,
              documentTitle: doc.title,
              sourceTier: doc.sourceTier,
              sourcePage: page.pageNumber,
              sourceSnippet: diagSentence.slice(0, 260) + (diagSentence.length > 260 ? '...' : ''),
              originalSnippet: diagSentence.trim(),
              isExplicitFact: true,
              targetMicroorganismId: org.id,
              targetMicroorganismName: org.scientificName,
              isNewOrganism: false,
              field: 'Método de identificación',
              previousValue: org.diagnosticMethods.map((d) => `${d.method} (${d.standardRole})`).join('; '),
              proposedValue: `Protocolo extraído (Pág. ${page.pageNumber}): ${diagSentence.trim()}`,
              potentialContradiction: null,
              verificationStatus:
                doc.sourceTier === 'Guía oficial MSPAS / OPS'
                  ? 'Guía oficial MSPAS (Normativa nacional)'
                  : 'Información procedente de apunte universitario (Requiere comprobación)',
              status: 'pendiente'
            });
          }
        }

        // Look for Treatment & Management
        if (/tratamiento|benznidazol|nifurtimox|praziquantel|albendazol|ivermectina|cloroquina|artem/i.test(text)) {
          const sentences = text.split(/(?<=[.!?])\s+/);
          const txSentence = sentences.find((s) =>
            /tratamiento|dosis|mg\/kg|benznidazol|nifurtimox|praziquantel|esquema/i.test(s)
          ) || sentences[0];

          if (txSentence && txSentence.length > 30) {
            proposals.push({
              id: `prop-${doc.id}-p${page.pageNumber}-${org.id}-tx`,
              documentId: doc.id,
              documentTitle: doc.title,
              sourceTier: doc.sourceTier,
              sourcePage: page.pageNumber,
              sourceSnippet: txSentence.slice(0, 260) + (txSentence.length > 260 ? '...' : ''),
              originalSnippet: txSentence.trim(),
              isExplicitFact: true,
              targetMicroorganismId: org.id,
              targetMicroorganismName: org.scientificName,
              isNewOrganism: false,
              field: 'Tratamiento y manejo',
              previousValue: org.treatment.firstLine.join(' | '),
              proposedValue: `Esquema farmacológico extraído (Pág. ${page.pageNumber}): ${txSentence.trim()}`,
              potentialContradiction: null,
              verificationStatus:
                doc.sourceTier === 'Guía oficial MSPAS / OPS'
                  ? 'Guía oficial MSPAS (Normativa nacional)'
                  : 'Información procedente de apunte universitario (Requiere comprobación)',
              status: 'pendiente'
            });
          }
        }

        // Look for Guatemala Epidemiology Relevance
        if (/guatemala|chiquimula|zacapa|jutiapa|escuintla|pet[eé]n|departamento|mspas|triatoma|rhodnius/i.test(text)) {
          const sentences = text.split(/(?<=[.!?])\s+/);
          const epiSentence = sentences.find((s) =>
            /guatemala|departamento|end[eé]mico|vector|rhodnius|triatoma/i.test(s)
          ) || sentences[0];

          if (epiSentence && epiSentence.length > 30) {
            proposals.push({
              id: `prop-${doc.id}-p${page.pageNumber}-${org.id}-epi`,
              documentId: doc.id,
              documentTitle: doc.title,
              sourceTier: doc.sourceTier,
              sourcePage: page.pageNumber,
              sourceSnippet: epiSentence.slice(0, 260) + (epiSentence.length > 260 ? '...' : ''),
              originalSnippet: epiSentence.trim(),
              isExplicitFact: true,
              targetMicroorganismId: org.id,
              targetMicroorganismName: org.scientificName,
              isNewOrganism: false,
              field: 'Epidemiología y datos Guatemala',
              previousValue: org.guatemalaRelevance.officialNotes,
              proposedValue: `Dato epidemiológico nacional (Pág. ${page.pageNumber}): ${epiSentence.trim()}`,
              potentialContradiction: null,
              verificationStatus:
                doc.sourceTier === 'Guía oficial MSPAS / OPS'
                  ? 'Guía oficial MSPAS (Normativa nacional)'
                  : 'Información procedente de apunte universitario (Requiere comprobación)',
              status: 'pendiente'
            });
          }
        }
      }
    });

    // 2. Detect potential novel organisms not currently in database
    potentialNewOrganisms.forEach((candidate) => {
      const candRegex = new RegExp(`\\b${candidate.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (!existingNames.has(normalizeScientificName(candidate.name)) && candRegex.test(text)) {
        const sentences = text.split(/(?<=[.!?])\s+/);
        const candSentence = sentences.find((s) => candRegex.test(s)) || sentences[0];

        proposals.push({
          id: `prop-${doc.id}-p${page.pageNumber}-new-${candidate.name.toLowerCase().replace(/\s+/g, '-')}`,
          documentId: doc.id,
          documentTitle: doc.title,
          sourceTier: doc.sourceTier,
          sourcePage: page.pageNumber,
          sourceSnippet: candSentence.slice(0, 260),
          targetMicroorganismId: `new-${candidate.name.toLowerCase().replace(/\s+/g, '-')}`,
          targetMicroorganismName: candidate.name,
          isNewOrganism: true,
          proposedCategory: candidate.category,
          originalSnippet: candSentence.trim(),
          isExplicitFact: true,
          field: 'Nueva ficha de microorganismo',
          previousValue: null,
          proposedValue: `Crear nueva ficha clínica para ${candidate.name} clasificado preliminarmente como ${candidate.category}. Mención documental en Pág. ${page.pageNumber}: "${candSentence.trim()}"`,
          potentialContradiction: null,
          verificationStatus: 'En proceso de validación',
          status: 'pendiente'
        });
      }
    });
  });

  // Remove duplicate proposals on the exact same field and organism
  const seenKeys = new Set<string>();
  const uniqueProposals = proposals.filter((p) => {
    const key = `${p.targetMicroorganismId}-${p.field}-${p.isNewOrganism ? 'new' : p.sourcePage}`;
    if (seenKeys.has(key)) return false;
    seenKeys.add(key);
    return true;
  });

  return doc.sourceTier === 'Boletín o alerta oficial MSPAS / OPS / OMS'
    ? uniqueProposals.map(proposal => ({ ...proposal, verificationStatus: 'En proceso de validación' as const }))
    : uniqueProposals;
}
