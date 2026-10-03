export type DiagnosticTechniqueCategory =
  | 'Tinciones microbiológicas'
  | 'Examen coproparasitoscópico'
  | 'Frotis y gota gruesa'
  | 'Cultivos y pruebas bioquímicas'
  | 'Pruebas moleculares (PCR)'
  | 'Inmunoserología y ELISA';

export interface DiagnosticTechnique {
  id: string;
  name: string;
  category: DiagnosticTechniqueCategory;
  principle: string;
  clinicalIndications: string[];
  reagentsAndProcedureSummary: string[];
  whatYouSeeUnderMicroscope: {
    magnification: string;
    keyObservableFeatures: string[];
    typicalInterpretation: string;
    frequentArtifactsOrPitfalls: string[];
  };
  applicabilityInGuatemala: {
    availableLevel: 'Centro de Salud (Nivel 1)' | 'Hospital Distrital (Nivel 2)' | 'Hospital Regional/Nacional (Nivel 3)' | 'Laboratorio Nacional de Salud (LNS)';
    turnaroundTime: string;
  };
}

export interface BibliographicSource {
  id: string;
  title: string;
  institutionOrAuthors: string;
  type: 'Guía Clínica Oficial' | 'Boletín Epidemiológico' | 'Libro de Texto Universitario' | 'Artículo Científico';
  year: string;
  organization: 'MSPAS Guatemala' | 'OPS / OMS' | 'CDC' | 'NIH / NLM' | 'Literatura Médica Académica';
  status: 'Verificado' | 'Revisado';
  urlOrCitation: string;
  notes: string;
}
