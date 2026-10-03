export type GuatemalaRegion =
  | 'Metropolitana'
  | 'Norte'
  | 'Nororiente'
  | 'Suroriente'
  | 'Central'
  | 'Suroccidente'
  | 'Noroccidente'
  | 'Petén';

export interface DepartmentEpidemiologicalData {
  departmentId: string;
  departmentName: string;
  cabecera: string;
  region: GuatemalaRegion;
  altitudeMeters: number;
  climateZone: string;
  registeredEndemicDiseases: string[];
  primaryVectorRisks: string[];
  
  // Official Status enforcement
  officialDataStatus: 'Datos epidemiológicos oficiales pendientes de incorporación' | 'Parcialmente verificado MSPAS' | 'Verificado MSPAS';
  
  // Official statistics when available
  statistics?: {
    referenceYear: number;
    epidemiologicalWeek?: number;
    reportedCases?: number;
    incidencePer100k?: number;
    mortalityRatePer100k?: number;
    lethalityPercentage?: number;
    trend: 'En aumento' | 'Estable' | 'En descenso' | 'Indeterminado';
    officialSource: string;
    lastUpdated: string;
    populationReference?: number;
  };
  
  officialNotes: string;
}

export interface EpidemiologicalNotificationReport {
  id: string;
  timestamp: string;
  source: 'MSPAS_SIGSA' | 'CNE_Vigilancia' | 'Hospital_Nacional' | 'Laboratorio_Nacional_Salud';
  departmentId: string;
  diseaseId: string;
  pathogenScientificName: string;
  syndromeCategory: 'Febril Agudo / Arbovirosis' | 'Respiratorio Agudo' | 'Enfermedad Diarreica Aguda' | 'Zoonosis / Vectorial' | 'Infección Intrahospitalaria';
  eventDescription: string;
  verifiedStatus: 'Oficial Confirmado' | 'En Investigación' | 'Alerta Epidemiológica';
  referenceWeek: string;
}
