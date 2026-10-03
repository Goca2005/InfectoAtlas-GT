import { ParasiteTaxonGroup, ParasiticStageType } from './microorganism';

export type ClinicalSampleCategory =
  | 'Heces formadas / pastosas'
  | 'Heces diarreicas con moco y sangre'
  | 'Sangre capilar periférica (Gota gruesa y frotis)'
  | 'Cinta adhesiva perianal (Técnica de Graham)'
  | 'Esputo / Lavado broncoalveolar'
  | 'Aspirado duodenal / Célula de enterotest'
  | 'Orina centrifugada'
  | 'Líquido cefalorraquídeo'
  | 'Biopsia tisular / Músculo'
  | 'Heces o fragmentos expulsados espontáneamente'
  | 'Fragmento móvil expulsado por el ano / Heces';

export interface MicroscopyImage {
  imageUrl?: string;
  hasRealImage: boolean;
  caption: string;
  sourceName: string; // e.g. "CDC DPDx Parasite Image Library", "MSPAS LNS", "World Health Organization"
  sourceLicenseOrPermit: string;
  magnificationOrScale?: string; // e.g. "1000x bajo inmersión en aceite", "400x campo claro", "100x rastreo"
  observationMethod: string; // e.g. "Microscopía óptica de campo claro", "Contraste de fases"
}

export interface AtlasParasiteStage {
  id: string;
  microorganismId: string;
  scientificName: string;
  commonName?: string;
  parasiteGroup: ParasiteTaxonGroup;
  specificTaxonDetail?: string; // e.g. "Apicomplexa intraeritrocítico", "Geohelminto nematodo", "Céstodo taeniidae"
  stageType: ParasiticStageType;
  stageName: string;
  biologicalRole: string;
  isInfectiveStage: boolean;
  isDiagnosticStage: boolean;
  detailedMorphology: string;
  differentialCharacteristics: string[];
  approximateDimensions?: string;
  clinicalSpecimen: ClinicalSampleCategory;
  diagnosticMethod: string;
  stainUsed: string; // e.g. "Tinción de Giemsa", "Lugol parasitológico", "Solución salina isotónica al 0.9%", "Tricrómica de Wheatley"
  specificMicroscopicFindings: string[]; // Qué se observa específicamente al microscopio
  associatedDisease: string;
  microscopyImage?: MicroscopyImage;
  bibliographicReference: string;
}

export interface DiagnosticPracticeQuestion {
  id: string;
  questionTitle: string;
  clinicalScenario: string;
  microscopicObservedFeatures: string;
  clinicalSample: string;
  diagnosticMethod: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  differentialKeyPearl: string;
  relatedStageId?: string;
}
