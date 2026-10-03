import { DiagnosticTechnique } from '../types/diagnostics';

export const DIAGNOSTIC_TECHNIQUES: DiagnosticTechnique[] = [
  {
    id: 'tincion-gram',
    name: 'Tinción de Gram',
    category: 'Tinciones microbiológicas',
    principle: 'Tinción diferencial basada en la capacidad de la pared celular bacteriana para retener el complejo cristal violeta-yodo tras la decoloración con alcohol-acetona.',
    clinicalIndications: [
      'Líquido cefalorraquídeo en sospecha de meningitis bacteriana aguda',
      'Líquido sinovial, pleural o pericárdico purulento',
      'Aspirado de abscesos y secreciones cutáneas',
      'Esputo para evaluación de calidad (criterios de Murray-Washington) y etiología de neumonía'
    ],
    reagentsAndProcedureSummary: [
      '1. Cristal violeta (colorante primario, 1 minuto)',
      '2. Lugol / Solución de yodo (mordiente, 1 minuto)',
      '3. Alcohol-acetona (decolorante crítico, 10-15 segundos)',
      '4. Safranina o fucsina básica (colorante de contraste, 30 segundos)'
    ],
    whatYouSeeUnderMicroscope: {
      magnification: '1000x (Objetivo de inmersión en aceite 100x con ocular 10x)',
      keyObservableFeatures: [
        'Bacterias Gram positivas: Se tiñen de color violeta / azul oscuro intenso (ej. Staphylococcus aureus en racimos, Streptococcus en cadenas)',
        'Bacterias Gram negativas: Se tiñen de color rosado / rojo tenue (ej. Escherichia coli, Klebsiella, Pseudomonas)',
        'Células inflamatorias del huésped: Núcleos de polimorfonucleares de color rosado tenue'
      ],
      typicalInterpretation: 'Permite orientación antimicrobiana empírica inmediata en minutos sin esperar 48h de cultivo.',
      frequentArtifactsOrPitfalls: [
        'Decoloración excesiva: bacterias Gram positivas pueden verse falsamente rosadas (Gram negativas)',
        'Decoloración insuficiente: bacterias Gram negativas pueden retener cristal violeta',
        'Precipitados de colorante: pueden simular cocos si no se filtra el reactivo periódicamente'
      ]
    },
    applicabilityInGuatemala: {
      availableLevel: 'Centro de Salud (Nivel 1)',
      turnaroundTime: '15 a 30 minutos'
    }
  },
  {
    id: 'tincion-ziehl-neelsen',
    name: 'Tinción de Ziehl-Neelsen (Baciloscopía)',
    category: 'Tinciones microbiológicas',
    principle: 'Identificación de bacterias ácido-alcohol resistentes (BAAR) cuya pared celular rica en ácidos micólicos resiste la decoloración con una mezcla de ácido y alcohol tras calentamiento con fucsina fenicada.',
    clinicalIndications: [
      'Esputo seriado en todo paciente sintomático respiratorio (tos con flema > 15 días)',
      'Lavado broncoalveolar en sospecha de tuberculosis pulmonar',
      'Líquido cefalorraquídeo centrifugado o orina seriada para TB extrapulmonar'
    ],
    reagentsAndProcedureSummary: [
      '1. Fucsina fenicada concentrada con emisión de vapores suaves (no hervir) por 5 minutos',
      '2. Decoloración enérgica con Alcohol-Ácido clorhídrico al 3% hasta que no desprenda más colorante',
      '3. Azul de metileno como contraste durante 1 minuto'
    ],
    whatYouSeeUnderMicroscope: {
      magnification: '1000x bajo inmersión (examinar un mínimo de 100 campos microscópicos útiles)',
      keyObservableFeatures: [
        'Bacilos ácido-alcohol resistentes (BAAR): Bacilos delgados, rectos o ligeramente incurvados, a veces granulares, de color fucsia intenso / rojo magenta brillante',
        'Fondo celular: Leucocitos, células epiteliales y bacterias no ácido-alcohol resistentes teñidas de azul claro'
      ],
      typicalInterpretation: 'Positivo para Mycobacterium tuberculosis (o micobacterias no tuberculosas). Se cuantifica en cruces (+, ++, +++) según escala del MSPAS.',
      frequentArtifactsOrPitfalls: [
        'Sobrecalentamiento que precipita cristales de fucsina',
        'Fibras vegetales o de algodón que pueden ser ácido-resistentes y simular cordones'
      ]
    },
    applicabilityInGuatemala: {
      availableLevel: 'Centro de Salud (Nivel 1)',
      turnaroundTime: '45 minutos'
    }
  },
  {
    id: 'gota-gruesa-giemsa',
    name: 'Gota Gruesa y Frotis Delgado con Giemsa',
    category: 'Frotis y gota gruesa',
    principle: 'La gota gruesa deshemoglobiniza los hematíes para concentrar parásitos hemoflagelados e intraeritrocitarios (20 a 30 veces más sensible que el frotis delgado). El frotis delgado fija los eritrocitos intactos con metanol para identificar la especie.',
    clinicalIndications: [
      'Síndrome febril agudo en pacientes residentes o visitantes de áreas endémicas de paludismo',
      'Sospecha de fase aguda de Enfermedad de Chagas con parasitemia detectable'
    ],
    reagentsAndProcedureSummary: [
      '1. Punción capilar en dedo de la mano no dominante',
      '2. Colocación de gota gruesa desfibrinada y extensión en frotis delgado contiguo',
      '3. Fijación del frotis delgado únicamente con alcohol metílico absoluto (la gota gruesa NO se fija con metanol)',
      '4. Tinción con reactivo de Giemsa diluido al 10% en amortiguador pH 7.2 por 30 minutos'
    ],
    whatYouSeeUnderMicroscope: {
      magnification: '1000x (examinar al menos 200 campos en gota gruesa antes de declarar negativo)',
      keyObservableFeatures: [
        'Plasmodium vivax: Trofozoítos ameboides, esquizontes grandes de 12-24 merozoítos, punteado de Schüffner en hematíes agrandados del frotis delgado',
        'Trypanosoma cruzi: Tripomastigotes en forma de C o S con kinetoplasto subterminal grande y membrana ondulante'
      ],
      typicalInterpretation: 'Prueba estándar de confirmación para malaria y cálculo de parasitemia en el Laboratorio Nacional del MSPAS.',
      frequentArtifactsOrPitfalls: [
        'Plaquetas superpuestas sobre un eritrocito que pueden simular un trofozoíto en anillo',
        'pH ácido del agua de lavado que altera el color de la cromatina'
      ]
    },
    applicabilityInGuatemala: {
      availableLevel: 'Centro de Salud (Nivel 1)',
      turnaroundTime: '1 a 2 horas'
    }
  },
  {
    id: 'examen-coproparasitoscopico',
    name: 'Examen Coproparasitoscópico Directo y por Concentración',
    category: 'Examen coproparasitoscópico',
    principle: 'Detección microscópica de quistes, ooquistes, trofozoítos móviles de protozoos, así como huevos y larvas de helmintos mediante examen directo en solución salina al 0.9%, tinción con Lugol y métodos de sedimentación (Ritchie / formol-éter) o flotación (Faust).',
    clinicalIndications: [
      'Diarrea aguda disentérica o diarrea crónica con mala absorción',
      'Dolor abdominal crónico recurrente y sospecha de parasitismo',
      'Evaluación de desnutrición y anemia en población pediátrica'
    ],
    reagentsAndProcedureSummary: [
      '1. Montaje en fresco con solución salina isotónica para observar motilidad parasitaria',
      '2. Montaje paralelo con Lugol parasitológico para contrastar estructuras nucleares internas',
      '3. Concentración por centrifugación con formol-éter de Ritchie'
    ],
    whatYouSeeUnderMicroscope: {
      magnification: '100x para tamizaje y 400x para examen de detalle',
      keyObservableFeatures: [
        'Quistes de Entamoeba histolytica: 10-15 µm con 4 núcleos y cuerpos cromatoidales romos',
        'Huevos de Taenia solium: Esféricos con gruesa corteza estriada radialmente y oncosfera',
        'Huevos de Ascaris lumbricoides: Ovoides con gruesa capa mamelonada externa parda'
      ],
      typicalInterpretation: 'Detección e informe cuantitativo de enteroparásitos según lineamientos de laboratorio clínico.',
      frequentArtifactsOrPitfalls: [
        'Confusión de leucocitos fecales con trofozoítos de amibas',
        'Gotas de grasa o polen que simulan huevos de helmintos'
      ]
    },
    applicabilityInGuatemala: {
      availableLevel: 'Centro de Salud (Nivel 1)',
      turnaroundTime: '1 hora'
    }
  },
  {
    id: 'examen-koh-10',
    name: 'Examen Directo con Hidróxido de Potasio al 10-20% (KOH)',
    category: 'Tinciones microbiológicas',
    principle: 'El KOH es un agente queratolítico potente que digiere la queratina, restos de piel, uñas y moco, dejando intacta la pared celular de quitina y glucanos de los hongos, facilitando su visualización directa.',
    clinicalIndications: [
      'Raspado de piel y uñas en sospecha de dermatofitosis (tiñas)',
      'Exudado vaginal o raspado de mucosas en sospecha de candidiasis',
      'Secreciones respiratorias en sospecha de micosis profundas (histoplasmosis, aspergilosis)'
    ],
    reagentsAndProcedureSummary: [
      '1. Colocación de la muestra biológica sobre el portaobjetos',
      '2. Adición de 1 a 2 gotas de solución de KOH al 10-20%',
      '3. Colocación de cubreobjetos y calentamiento suave (sin hervir) para acelerar el aclaramiento queratolítico'
    ],
    whatYouSeeUnderMicroscope: {
      magnification: '100x para rastreo y 400x para confirmación',
      keyObservableFeatures: [
        'Candida albicans: Racimos de blastoconidios ovoides refringentes acompañados de pseudohifas alargadas',
        'Dermatofitos: Hifas hialinas tabicadas y ramificadas que atraviesan los queratinocitos aclarados'
      ],
      typicalInterpretation: 'Prueba rápida de cabecera fundamental en dermatología e infectología clínica.',
      frequentArtifactsOrPitfalls: [
        'Bordes de células epiteliales superpuestas ("mosaico")',
        'Fibras sintéticas de ropa o algodón'
      ]
    },
    applicabilityInGuatemala: {
      availableLevel: 'Centro de Salud (Nivel 1)',
      turnaroundTime: '15 minutos'
    }
  }
];
