export type MicroorganismCategory = 'bacteria' | 'virus' | 'hongo' | 'parasito';

export type ParasiteTaxonGroup = 
  | 'protozoo' 
  | 'nematodo' 
  | 'cestodo' 
  | 'trematodo' 
  | 'filaria' 
  | 'ectoparasito';

export type ParasiticStageType =
  | 'huevo'
  | 'larva'
  | 'adulto'
  | 'quiste'
  | 'ooquiste'
  | 'trofozoito'
  | 'proglotide'
  | 'escolex'
  | 'microfilaria'
  | 'amastigote'
  | 'promastigote'
  | 'tripomastigote'
  | 'epimastigote'
  | 'gametocito'
  | 'esquizonte'
  | 'merozoito'
  | 'esporozoito'
  | 'cisticerco'
  | 'otro';

export interface ParasiticStage {
  id: string;
  stageType: ParasiticStageType;
  name: string;
  biologicalRole: string; // e.g. "Estadio infectante para el hospedero definitivo", "Forma invasiva tisular"
  isInfectiveStage: boolean;
  isDiagnosticStage: boolean;
  morphologyDescription: string;
  keyDimensions?: string; // e.g. "12-15 µm", "30-40 µm de diámetro"
  differentialCharacteristics: string[];
  primaryClinicalSpecimen: string; // e.g. "Heces formadas", "Frotis sanguíneo periférico", "Líquido cefalorraquídeo"
  identificationMethod: string; // e.g. "Examen coproparasitoscópico por concentración", "Tincion de Giemsa"
  visualRepresentationType: 'microfotografia_real' | 'esquema_morfologico' | 'modelo_educativo';
  imageUrl?: string;
  imageCaption?: string;
}

export interface VirulenceFactor {
  name: string;
  mechanism: string;
}

export interface AssociatedDisease {
  name: string;
  description: string;
  typicalIncubation?: string;
  clinicalPresentation: string[];
}

export interface DiagnosticMethod {
  method: string;
  standardRole: 'Gold Standard' | 'Tamizaje' | 'Confirmatorio' | 'Monitoreo';
  keyFindings: string;
  turnaroundTime?: string;
}

export interface TreatmentProtocol {
  disclaimer: string;
  firstLine: string[];
  alternatives: string[];
  contraindicationsOrAlerts?: string[];
  resistanceNotes?: string;
}

export interface GuatemalaEpidemiology {
  endemicStatus: 'Endémico' | 'Hiperendémico' | 'Brote esporádico' | 'Vigilancia activa' | 'Raro / Controlado' | 'No documentado en esta ficha';
  priorityLevel: 'Alta' | 'Media' | 'Baja' | 'No evaluada';
  departmentsWithHighPrevalence: string[];
  officialNotes: string;
  notificationGroup?: 'Notificación Inmediata' | 'Notificación Semanal' | 'Vigilancia Centinela';
}

export interface Microorganism {
  id: string;
  scientificName: string;
  commonName?: string;
  category: MicroorganismCategory;
  parasiteGroup?: ParasiteTaxonGroup;
  reviewStatus: 'Fuentes verificadas' | 'Fuentes pendientes de revisión';
  
  taxonomy: {
    domain?: string;
    kingdom?: string;
    phylum?: string;
    classTaxon?: string;
    orderTaxon?: string;
    family: string;
    genus: string;
    species: string;
  };

  morphology: {
    shape: string;
    size: string;
    arrangement?: string;
    gramStain?: 'Gram positiva' | 'Gram negativa' | 'Ácido-alcohol resistente' | 'No aplica' | 'Tinciones especiales';
    specialStructures: string[];
  };

  microbiologyCharacteristics: {
    metabolism?: string;
    cultureMedia?: string[];
    optimalTemp?: string;
    growthTime?: string;
    keyBiochemicalTests?: string[];
  };

  externalAndInternalStructures: string[];
  virulenceFactors: VirulenceFactor[];
  reservoir: string[];
  transmissionRoute: string[];
  vector?: string;

  associatedDiseases: AssociatedDisease[];
  signsAndSymptoms: string[];
  complications: string[];

  clinicalSpecimens: string[];
  diagnosticMethods: DiagnosticMethod[];
  labFindings: string[];

  treatment: TreatmentProtocol;
  prevention: string[];
  guatemalaRelevance: GuatemalaEpidemiology;

  parasiticStages?: ParasiticStage[];

  imagery: {
    type: 'microfotografia_real' | 'ilustracion_cientifica' | 'modelo_educativo_3d';
    caption: string;
    stainOrModality: string;
    creditOrSource: string;
    url?: string;
    sourceUrl?: string;
    license?: string;
    licenseUrl?: string;
    imageId?: string;
    imageDate?: string;
    consultedAt?: string;
    interpretation?: string;
  }[];

  bibliography: {
    source: string;
    title: string;
    year: string;
    url?: string;
    consultedAt?: string;
    status: 'Verificado' | 'Fuentes pendientes de revisión' | 'Revisado';
  }[];

  lastReviewedDate: string;
}
