import { AcademicDocument, ExtractionProposal, AuditLogEntry } from '../types/academicLibrary';

export const INITIAL_ACADEMIC_DOCUMENTS: AcademicDocument[] = [
  {
    id: 'doc-demo-parasitologia',
    title: '[DEMOSTRACIÓN DOCENTE] Ejemplo Simulado: Parasitología Médica (Helmintos)',
    subject: 'Parasitología',
    authorOrInstitution: 'Material ficticio para pruebas del sistema (No es documento oficial USAC)',
    yearOrEdition: '2024 (Ejemplo didáctico)',
    sourceTier: 'Material docente',
    uploadDate: '2026-03-28',
    pageCount: 3,
    fileName: 'DEMO_Simulacion_Parasitologia.pdf',
    fileSizeBytes: 1200000,
    processingStatus: 'Extracción completada',
    unextractablePagesCount: 1,
    extractedProposalsCount: 2,
    summaryNotes: 'DATOS FICTICIOS DE DEMOSTRACIÓN: Documento pedagógico simulado para verificar la extracción por páginas, el emparejamiento con el catálogo y la detección de contradicciones.',
    pages: [
      {
        pageNumber: 1,
        charCount: 980,
        hasExtractableText: true,
        detectedMicroorganisms: ['Taenia solium', 'Taenia saginata'],
        textContent: `[DATOS FICTICIOS DE DEMOSTRACIÓN DOCENTE PARA PRUEBAS DEL ANALIZADOR]
TEMA: CESTODIASIS INTESTINALES (TENIASIS)
En el estudio de cestodiasis, dos especies frecuentes en el diagnóstico diferencial son Taenia solium y Taenia saginata.
CRITERIOS DE IDENTIFICACIÓN MORFOLÓGICA:
1. Huevos: Ambas especies producen huevos esféricos (31 a 43 µm) con embrióforo radiado y oncosfera con 3 pares de ganchos. En microscopía óptica convencional los huevos son indistinguibles entre especies; el reporte correcto normado de laboratorio debe ser "Huevos de Taenia sp."
2. Proglótides grávidas: Para diferenciar la especie se realiza clarificación con ácido acético o lactofenol:
- Taenia solium: Presenta entre 7 y 13 ramificaciones uterinas principales a cada lado del tronco central (distribución dendrítica o poco ramificada).
- Taenia saginata: Presenta entre 15 y 30 ramificaciones uterinas finas dicotómicas a cada lado.`
      },
      {
        pageNumber: 2,
        charCount: 860,
        hasExtractableText: true,
        detectedMicroorganisms: ['Strongyloides stercoralis'],
        textContent: `[DATOS FICTICIOS DE DEMOSTRACIÓN DOCENTE PARA PRUEBAS DEL ANALIZADOR]
TEMA: STRONGYLOIDES STERCORALIS - DIAGNÓSTICO DE LABORATORIO
A diferencia de otros nematodos cuyos huevos se excretan en la materia fecal, en heces frescas de Strongyloides stercoralis el hallazgo diagnóstico habitual es la LARVA RABDITOIDE L1.
Morfología de la larva rabditoide L1:
- Tamaño aproximado: 200 a 300 µm de largo por 15 a 18 µm de diámetro.
- Cavidad bucal corta (menor a la mitad del diámetro del extremo anterior).
- Primordio genital prominente en el tercio posterior del cuerpo.
Métodos de concentración recomendados: Método de Baermann y cultivo en placa de agar de Koga.`
      },
      {
        pageNumber: 3,
        charCount: 0,
        hasExtractableText: false,
        detectedMicroorganisms: [],
        textContent: `[Página de microfotografías esquemáticas sin texto mecanografiado extraíble. Ejemplo didáctico para verificar la detección de páginas escaneadas sin OCR].`
      }
    ]
  },
  {
    id: 'doc-demo-chagas',
    title: '[DEMOSTRACIÓN DOCENTE] Ejemplo Simulado: Protocolo de Chagas',
    subject: 'Epidemiología',
    authorOrInstitution: 'Guía didáctica simulada para pruebas (No es norma oficial MSPAS)',
    yearOrEdition: '2023 (Ejemplo didáctico)',
    sourceTier: 'Material docente',
    uploadDate: '2026-03-27',
    pageCount: 2,
    fileName: 'DEMO_Simulacion_Protocolo_Chagas.pdf',
    fileSizeBytes: 950000,
    processingStatus: 'Extracción completada',
    unextractablePagesCount: 0,
    extractedProposalsCount: 2,
    summaryNotes: 'DATOS FICTICIOS DE DEMOSTRACIÓN: Guía pedagógica simulada para evaluar la extracción de datos epidemiológicos y esquemas terapéuticos de Trypanosoma cruzi.',
    pages: [
      {
        pageNumber: 1,
        charCount: 920,
        hasExtractableText: true,
        detectedMicroorganisms: ['Trypanosoma cruzi'],
        textContent: `[DATOS FICTICIOS DE DEMOSTRACIÓN DOCENTE PARA PRUEBAS DEL ANALIZADOR]
EPIDEMIOLOGÍA Y VIGILANCIA DE TRYPANOSOMA CRUZI:
Trypanosoma cruzi es el agente causal de la Enfermedad de Chagas.
Vector domiciliario principal en Centroamérica: Triatoma dimidiata ("chinche picuda").
Manifestaciones de la fase aguda: Signo de Romaña (complejo oftalmoganglionar unilateral con edema bipalpebral indoloro) y chagoma de inoculación.
Diagnóstico en fase aguda: Métodos directos parasitológicos por alta parasitemia (frotis y gota gruesa con Giemsa, microhematocrito, método de Strout).`
      },
      {
        pageNumber: 2,
        charCount: 890,
        hasExtractableText: true,
        detectedMicroorganisms: ['Trypanosoma cruzi'],
        textContent: `[DATOS FICTICIOS DE DEMOSTRACIÓN DOCENTE PARA PRUEBAS DEL ANALIZADOR]
TRATAMIENTO ANTIPARASITARIO DE TRYPANOSOMA CRUZI:
Fármaco de primera línea habitual: Benznidazol a dosis de 5 mg/kg/día por vía oral dividido en 2 tomas diarias durante 60 días continuos (dosis pediátrica: 5 a 10 mg/kg/día; dosis máxima: 300 mg/día).
Fármaco alternativo: Nifurtimox a dosis de 8 a 10 mg/kg/día durante 60 a 90 días.
Monitoreo clínico: Control hematológico y de transaminasas a los 20 y 40 días de tratamiento para vigilar toxicidad cutánea o hematológica.`
      }
    ]
  }
];

export const INITIAL_EXTRACTION_PROPOSALS: ExtractionProposal[] = [
  {
    id: 'prop-demo-taenia-01',
    documentId: 'doc-demo-parasitologia',
    documentTitle: '[DEMOSTRACIÓN DOCENTE] Ejemplo Simulado: Parasitología Médica (Helmintos)',
    sourceTier: 'Material docente',
    sourcePage: 1,
    sourceSnippet: 'Proglótides grávidas: Taenia solium presenta entre 7 y 13 ramificaciones uterinas principales a cada lado del tronco central (distribución dendrítica o poco ramificada). Taenia saginata presenta entre 15 y 30 ramificaciones.',
    targetMicroorganismId: 'taenia-solium',
    targetMicroorganismName: 'Taenia solium',
    isNewOrganism: false,
    field: 'Método de identificación',
    previousValue: 'Conteo de ramas uterinas en proglótides grávidas tras clarificación con ácido acético o tinta china.',
    proposedValue: 'Clarificación de proglótides grávidas con ácido acético o lactofenol: T. solium presenta entre 7 y 13 ramificaciones uterinas principales a cada lado del tronco central. Criterio clave: Los huevos son estrictamente indistinguibles entre Taenia solium y T. saginata por microscopía óptica convencional.',
    potentialContradiction: 'Regla diagnóstica esencial: Los huevos de T. solium y T. saginata son morfológicamente idénticos por microscopía de luz. Nunca deben reportarse con especie únicamente por examen coprológico de huevos.',
    verificationStatus: 'Información procedente de apunte universitario (Requiere comprobación)',
    status: 'pendiente'
  },
  {
    id: 'prop-demo-chagas-02',
    documentId: 'doc-demo-chagas',
    documentTitle: '[DEMOSTRACIÓN DOCENTE] Ejemplo Simulado: Protocolo de Chagas',
    sourceTier: 'Material docente',
    sourcePage: 2,
    sourceSnippet: 'Benznidazol a dosis de 5 mg/kg/día por vía oral dividido en 2 tomas diarias durante 60 días continuos (dosis pediátrica: 5 a 10 mg/kg/día; dosis máxima: 300 mg/día).',
    targetMicroorganismId: 'trypanosoma-cruzi',
    targetMicroorganismName: 'Trypanosoma cruzi',
    isNewOrganism: false,
    field: 'Tratamiento y manejo',
    previousValue: 'Benznidazol 5 mg/kg/día por 60 días. Alternativa: Nifurtimox 8-10 mg/kg/día.',
    proposedValue: 'Benznidazol 5 mg/kg/día VO dividido en 2 tomas diarias (cada 12 h) por 60 días (pediátrico 5-10 mg/kg/día; máximo 300 mg/día). Monitoreo de hemograma completo, función hepática y renal a los 20 y 40 días.',
    potentialContradiction: null,
    verificationStatus: 'Información procedente de apunte universitario (Requiere comprobación)',
    status: 'pendiente'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-demo-01',
    timestamp: '2026-03-27 10:15:00',
    documentTitle: '[DEMOSTRACIÓN DOCENTE] Ejemplo Simulado: Protocolo de Chagas',
    sourcePage: 1,
    microorganismId: 'trypanosoma-cruzi',
    microorganismName: 'Trypanosoma cruzi',
    field: 'Método de identificación',
    previousValue: 'Serología convencional',
    newValue: 'Diagnóstico en fase aguda: Métodos directos parasitológicos por alta parasitemia (frotis y gota gruesa con Giemsa, microhematocrito, método de Strout).',
    action: 'aprobado'
  }
];
