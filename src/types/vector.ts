export interface MedicalVector {
  id: string;
  scientificName: string;
  commonName: string;
  taxonomicClass: 'Insecta' | 'Arachnida';
  orderTaxon: string;
  family: string;
  transmittedPathogens: {
    pathogenId: string;
    scientificName: string;
    disease: string;
  }[];
  biologicalCycle: string;
  habitatAndBehavior: string;
  guatemalaDistribution: {
    regions: string[];
    elevationLimitMeters: number;
    peakSeason: string;
    endemicDepartments: string[];
  };
  controlMeasures: string[];
  morphologyHighlights: string;
}
