import { Microorganism } from '../types/microorganism';

export const INITIAL_MICROORGANISMS: Microorganism[] = [
  {
    id: 'staphylococcus-aureus',
    scientificName: 'Staphylococcus aureus',
    commonName: 'Estafilococo dorado',
    category: 'bacteria',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Bacillota (Firmicutes)',
      classTaxon: 'Bacilli',
      orderTaxon: 'Bacillales',
      family: 'Staphylococcaceae',
      genus: 'Staphylococcus',
      species: 'S. aureus'
    },
    morphology: {
      shape: 'Cocos esféricos',
      size: '0.8 - 1.0 µm de diámetro',
      arrangement: 'Racimos irregulares similares a uvas',
      gramStain: 'Gram positiva',
      specialStructures: ['Cápsula de polisacárido (microcápsula serotipos 5 y 8)', 'Pared gruesa de peptidoglucano', 'Ácido teicoico']
    },
    microbiologyCharacteristics: {
      metabolism: 'Anaerobio facultativo, catalasa positiva, coagulasa positiva',
      cultureMedia: ['Agar sangre de carnero (beta-hemólisis completa)', 'Agar manitol salado (fermentador, colonias amarillas)'],
      optimalTemp: '37 °C (rango 15-45 °C)',
      growthTime: '18-24 horas',
      keyBiochemicalTests: ['Catalasa: Positiva (+)', 'Coagulasa en tubo: Positiva (+)', 'Resistencia a novobiocina: Sensible', 'DNAsa: Positiva (+)']
    },
    externalAndInternalStructures: [
      'Proteína A (unión a la fracción Fc de IgG bloqueando opsonización)',
      'Peptidoglucano con puentes de pentaglicina',
      'Membrana plasmática rica en carotenoides (pigmento dorado estafiloxantina)'
    ],
    virulenceFactors: [
      { name: 'Toxina-1 del Síndrome de Shock Tóxico (TSST-1)', mechanism: 'Superantígeno que estimula liberación masiva de IL-1, IL-2 y TNF-alfa' },
      { name: 'Enterotoxinas A-E', mechanism: 'Termorresistentes, termoestables; estimulan el centro del vómito vía nervio vago (intoxicación alimentaria)' },
      { name: 'Toxinas exfoliativas (ETA, ETB)', mechanism: 'Desmogleína-1 serina proteasas causantes del Síndrome de la Piel Escaldada (SSSS)' },
      { name: 'Leucocidina de Panton-Valentine (PVL)', mechanism: 'Citotoxina formadora de poros asociada a neumonía necrotizante y cepas comunitarias virulentas (CA-MRSA)' },
      { name: 'Coagulasa libre y ligada', mechanism: 'Convierte fibrinógeno en fibrina formando un coágulo protector alrededor de la bacteria' }
    ],
    reservoir: ['Seres humanos (narinas anteriores en 20-30% de portadores sanos, pliegues cutáneos, perineo)', 'Ambiente intrahospitalario'],
    transmissionRoute: ['Contacto directo piel a piel', 'Fómites contaminados', 'Inoculación traumática', 'Ingestión de alimentos con toxina preformada'],
    associatedDiseases: [
      {
        name: 'Infecciones de piel y tejidos blandos (SSTI)',
        description: 'Foliculitis, forúnculos, ántrax estafilocócico, celulitis, impétigo ampolloso y abscesos profundos.',
        clinicalPresentation: ['Eritema caliente', 'Pústula o fluctuación central purulenta', 'Dolor local']
      },
      {
        name: 'Bacteriemia y Endocarditis Infecciosa aguda',
        description: 'Siembra hematógena con tropismo por válvula aórtica o mitral nativa o protésica, así como válvula tricúspide en usuarios de drogas endovenosas.',
        clinicalPresentation: ['Fiebre en picos', 'Soplos cardíacos nuevos', 'Embolias sépticas distales', 'Lesiones de Janeway y nódulos de Osler']
      },
      {
        name: 'Osteomielitis aguda hematógena',
        description: 'Causa bacteriana #1 en niños (metáfisis de huesos largos) y adultos (espondilodiscitis vertebral).',
        clinicalPresentation: ['Dolor óseo localizado intenso', 'Impotencia funcional', 'Fiebre y reactantes de fase aguda elevados']
      }
    ],
    signsAndSymptoms: ['Fiebre', 'Supuración purulenta amarillo-dorada', 'Eritema indurado', 'Dolor pulsátil en sitio de infección'],
    complications: ['Choque séptico refractario', 'Embolismos sépticos pulmonares', 'Artritis séptica destructiva', 'Fascitis necrotizante'],
    clinicalSpecimens: ['Aspirado de absceso purulento', 'Hemocultivos seriados (mínimo 2 botellas de sitios diferentes)', 'Esputo o lavado broncoalveolar', 'Líquido sinovial'],
    diagnosticMethods: [
      { method: 'Tinción de Gram en muestra directa', standardRole: 'Tamizaje', keyFindings: 'Cocos Gram positivos en racimos intracelulares o extracelulares junto a polimorfonucleares abundantes' },
      { method: 'Cultivo bacteriológico y antibiograma automatizado (VITEK / Kirby-Bauer)', standardRole: 'Gold Standard', keyFindings: 'Aislamiento de colonias beta-hemolíticas coagulasa positivas con prueba de difusión de cefoxitina para detección de mecA (MRSA)' },
      { method: 'PCR molecular para gen mecA', standardRole: 'Confirmatorio', keyFindings: 'Detección de proteína PBP2a con baja afinidad por betalactámicos' }
    ],
    labFindings: ['Leucocitosis con neutrofilia y desviación a la izquierda', 'Proteína C Reactiva (PCR) y Procalcitonina marcadamente elevadas', 'Trombocitopenia en sepsis severa'],
    treatment: {
      disclaimer: 'El tratamiento empírico depende del patrón de resistencia local (antibiograma del hospital) y si la cepa es sensible (MSSA) o resistente a meticilina (MRSA).',
      firstLine: [
        'MSSA (Sensible a meticilina): Cefazolina 2g IV c/8h o Oxacilina 2g IV c/4h',
        'MRSA (Resistente a meticilina): Vancomicina 15-20 mg/kg IV c/8-12h (monitorizar niveles valle 15-20 mcg/mL) o Daptomicina 8-10 mg/kg IV c/24h (no usar daptomicina en pulmón)'
      ],
      alternatives: [
        'Linezolid 600 mg IV/VO c/12h (excelente penetración pulmonar y en tejidos blandos)',
        'Ceftarolina 600 mg IV c/12h (cefalosporina de 5ª generación activa contra MRSA)',
        'Trimetoprima-Sulfametoxazol (TMP-SMX) o Clindamicina en infecciones cutáneas comunitarias no graves'
      ],
      resistanceNotes: 'Creciente prevalencia de MRSA en hospitales nacionales de referencia de Guatemala (Hospital Roosevelt y Hospital General San Juan de Dios), superando el 35-45% de los aislamientos hospitalarios.'
    },
    prevention: ['Higiene estricta de manos con base alcohólica', 'Descolonización con mupirocina nasal y baños con clorhexidina en pacientes quirúrgicos o UCI', 'Técnica aséptica en catéteres venosos centrales'],
    guatemalaRelevance: {
      endemicStatus: 'Vigilancia activa',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Guatemala (Centros de 3er nivel)', 'Quetzaltenango', 'Escuintla'],
      officialNotes: 'Patógeno bacteriano intrahospitalario crítico sujeto a vigilancia de resistencia antimicrobiana por el Laboratorio Nacional de Salud (LNS) del MSPAS.',
      notificationGroup: 'Vigilancia Centinela'
    },
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Tinción de Gram de secreción purulenta: cocos Gram positivos esféricos agrupados en racimos típicos.',
        stainOrModality: 'Tinción de Gram (Microscopio óptico 1000x bajo inmersión)',
        creditOrSource: 'CDC Public Health Image Library (PHIL)'
      }
    ],
    bibliography: [
      { source: 'Murray PR, Rosenthal KS, Pfaller MA', title: 'Medical Microbiology (9th Ed.) - Staphylococcus', year: '2021', status: 'Revisado' },
      { source: 'Mandell, Douglas, and Bennett', title: 'Principles and Practice of Infectious Diseases (9th Ed.)', year: '2020', status: 'Revisado' },
      { source: 'MSPAS Guatemala - Laboratorio Nacional de Salud', title: 'Boletín Epidemiológico de Resistencia Antimicrobiana en Bacterias Nosocomiales', year: '2023', status: 'Fuentes pendientes de revisión' }
    ],
    lastReviewedDate: '2026-03-15'
  },

  {
    id: 'mycobacterium-tuberculosis',
    scientificName: 'Mycobacterium tuberculosis',
    commonName: 'Bacilo de Koch',
    category: 'bacteria',
    reviewStatus: 'Fuentes verificadas',
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Actinomycetota',
      classTaxon: 'Actinomycetes',
      orderTaxon: 'Mycobacteriales',
      family: 'Mycobacteriaceae',
      genus: 'Mycobacterium',
      species: 'M. tuberculosis complex'
    },
    morphology: {
      shape: 'Bacilo delgado, ligeramente curvado o recto',
      size: '0.2 - 0.6 µm de ancho por 1 - 4 µm de longitud',
      arrangement: 'Bacilos aislados o en pequeños cúmulos formando cordones (factor cuerda)',
      gramStain: 'Ácido-alcohol resistente',
      specialStructures: ['Pared celular extraordinariamente rica en lípidos (60% del peso seco)', 'Ácidos micólicos (cadenas de 70-90 carbonos)', 'Lipoarabinomanano (LAM)', 'Glucolípidos fenólicos']
    },
    microbiologyCharacteristics: {
      metabolism: 'Aerobio estricto, catalasa positiva, reducción de nitratos positiva, niacina positiva',
      cultureMedia: ['Medio sólido Löwenstein-Jensen (base huevo, colonias rugosas en coliflor a las 3-8 semanas)', 'Sistemas automatizados líquidos MGIT (Middlebrook 7H9)'],
      optimalTemp: '37 °C (no crece a menos de 30 °C ni a más de 40 °C)',
      growthTime: 'Crecimiento muy lento (tiempo de duplicación 15-20 horas)',
      keyBiochemicalTests: ['Ácido-alcohol resistencia (Zielh-Neelsen / Kinyoun)', 'Acumulación de niacina: Positiva', 'Sensibilidad al calor de catalasa a 68 °C: Negativa']
    },
    externalAndInternalStructures: [
      'Factor cuerda (trehalosa 6,6-dimicolato): inhibe la migración leucocitaria y causa toxicidad mitocondrial',
      'Sulfátidos: inhiben la fusión fagosoma-lisosoma en el macrófago alveolar',
      'Arabinogalactano y peptidoglucano covalentemente unidos a ácidos micólicos'
    ],
    virulenceFactors: [
      { name: 'Inhibición de la maduración del fagosoma', mechanism: 'Fosfatasas micobacterianas y lípidos previenen la fusión fago-lisosoma permitiendo replicación intracelular en macrófagos' },
      { name: 'Factor Cuerda (Trehalosa dimicolato)', mechanism: 'Provoca agregación en cordones paralelos y estimula la formación de granulomas caseificantes' },
      { name: 'ESX-1 sistema de secreción tipo VII', mechanism: 'Secreta proteínas ESAT-6 y CFP-10 que inducen disrupción de membrana y muerte celular' },
      { name: 'Superóxido dismutasa y catalasa-peroxidasa (KatG)', mechanism: 'Neutralizan radicales libres de oxígeno dentro del fagosoma macrófago' }
    ],
    reservoir: ['Exclusivamente el ser humano con enfermedad pulmonar activa'],
    transmissionRoute: ['Inhalación de núcleos de gotitas microscópicas de Wells (1-5 µm) expulsadas al toser, estornudar o hablar'],
    associatedDiseases: [
      {
        name: 'Tuberculosis Pulmonar Primaria y Posprimaria (Reactivación)',
        description: 'Lesiones cavitarias crónicas predominantemente en lóbulos superiores (segmentos apicales y posteriores) con necrosis de caseificación central.',
        clinicalPresentation: ['Tos persistente productiva > 15 días (Sintomático Respiratorio)', 'Hemoptisis', 'Fiebre vespertina', 'Sudoración nocturna profusa', 'Pérdida de peso involuntaria']
      },
      {
        name: 'Tuberculosis Extrapulmonar',
        description: 'Afectación de ganglios linfáticos (escrófula cervical), pleura, meninges (meningitis tuberculosa grave), columna vertebral (Mal de Pott) o diseminación hematógena (Tuberculosis Miliar).',
        clinicalPresentation: ['Adenopatías crónicas induradas fistulizantes', 'Cefalea subaguda y rigidez de nuca', 'Dolor dorsal e impotencia funcional']
      }
    ],
    signsAndSymptoms: ['Tos con expectoración mucopurulenta o hemoptoica', 'Fiebre y diaforesis nocturna', 'Astenia y adinamia', 'Emaciación y caquexia'],
    complications: ['Fallo respiratorio hipoxémico crónico', 'Bronquiectasias secundarias y colonización por Aspergillus (aspergiloma)', 'Meningitis tuberculosa con secuelas neurológicas permanentes'],
    clinicalSpecimens: ['Esputo seriado matutino (mínimo 2 muestras para baciloscopía)', 'Lavado broncoalveolar', 'Líquido cefalorraquídeo (aspecto en velo de novia)', 'Biopsia ganglionar o pleural'],
    diagnosticMethods: [
      { method: 'GeneXpert MTB/RIF (Prueba Molecular en Tiempo Real)', standardRole: 'Gold Standard', keyFindings: 'Detección simultánea de ADN del complejo M. tuberculosis y mutaciones en gen rpoB de resistencia a Rifampicina en < 2 horas' },
      { method: 'Baciloscopía seriada por tinción de Ziehl-Neelsen / Fluorescencia con Auramina-Rodamina', standardRole: 'Tamizaje', keyFindings: 'Identificación de bacilos ácido-alcohol resistentes (BAAR) delgados de color fucsia sobre fondo azul' },
      { method: 'Cultivo en medio líquido (MGIT) y sólido (Löwenstein-Jensen)', standardRole: 'Confirmatorio', keyFindings: 'Aislamiento para pruebas de susceptibilidad a drogas de 1ª y 2ª línea' }
    ],
    labFindings: ['Linfocitosis en LCR con pleocitosis moderada, hipoglucorraquia y proteínas muy altas', 'Anemia de enfermedad crónica (normocítica normocrómica)', 'Velocidad de sedimentación globular (VSG) muy acelerada'],
    treatment: {
      disclaimer: 'Esquema estrictamente normado por el Programa Nacional de Tuberculosis del MSPAS de Guatemala bajo estrategia TAES/DOTS (Tratamiento Acortado Estrictamente Supervisado).',
      firstLine: [
        'Fase Intensiva (2 meses, diario HRZE): Isoniazida (H) + Rifampicina (R) + Pirazinamida (Z) + Etambutol (E) en dosis fija combinada',
        'Fase de Continuación (4 meses, 3 veces por semana o diario HR): Isoniazida (H) + Rifampicina (R)'
      ],
      alternatives: [
        'Tuberculosis Farmacorresistente (TB-MDR / TB-RR): Esquemas orales acortados con Bedaquilina, Pretomanid, Linezolid y Moxifloxacino según pautas OMS/MSPAS'
      ],
      resistanceNotes: 'Monitoreo obligatorio de resistencia a Isoniazida y Rifampicina mediante GeneXpert y prueba fenotípica en el Laboratorio Nacional de Salud.'
    },
    prevention: ['Vacuna BCG (Bacilo de Calmette-Guérin) al nacer para prevenir formas graves (miliar y meníngea)', 'Estudio y tratamiento preventivo de contactos con Isoniazida o Rifapentina (TPT)', 'Control de infecciones con ventilación natural y uso de mascarillas N95'],
    guatemalaRelevance: {
      endemicStatus: 'Endémico',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Escuintla', 'Guatemala', 'Suchitepéquez', 'Retalhuleu', 'Izabal', 'San Marcos'],
      officialNotes: 'Prioridad epidemiológica de salud pública en Guatemala. Mayor concentración de casos en la Costa Sur y en áreas urbanas marginadas.',
      notificationGroup: 'Notificación Inmediata'
    },
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Tinción de Ziehl-Neelsen en muestra de esputo: bacilos ácido-alcohol resistentes (BAAR) de color fucsia brillante.',
        stainOrModality: 'Ziehl-Neelsen (1000x inmersión en aceite)',
        creditOrSource: 'CDC/Dr. George P. Kubica'
      }
    ],
    bibliography: [
      { source: 'MSPAS Guatemala - Programa Nacional de Tuberculosis', title: 'Manual de Normas de Atención para la Prevención y Control de la Tuberculosis en Guatemala', year: '2023', status: 'Verificado' },
      { source: 'Organización Panamericana de la Salud (OPS)', title: 'Directrices de la OMS sobre la tuberculosis: Pruebas de diagnóstico molecular', year: '2022', status: 'Verificado' }
    ],
    lastReviewedDate: '2026-03-20'
  },

  {
    id: 'virus-del-dengue',
    scientificName: 'Dengue virus (DENV 1, 2, 3, 4)',
    commonName: 'Virus del Dengue',
    category: 'virus',
    reviewStatus: 'Fuentes verificadas',
    taxonomy: {
      domain: 'Riboviria',
      phylum: 'Kitrinoviricota',
      classTaxon: 'Flasuviricetes',
      orderTaxon: 'Amarillovirales',
      family: 'Flaviviridae',
      genus: 'Orthoflavivirus (antes Flavivirus)',
      species: 'Orthoflavivirus denguei'
    },
    morphology: {
      shape: 'Partícula icosaédrica esférica con envoltura lipídica derivada de la célula huésped',
      size: 'Aproximadamente 50 nm de diámetro',
      arrangement: 'Virión individual encapsulado',
      gramStain: 'No aplica',
      specialStructures: ['Genoma de ARN monocatenario de sentido positivo (+ssRNA) de ~11 kilobases', 'Glicoproteína de envoltura E (dímeros orientados en superficie lisa)', 'Proteína de membrana M', 'Proteína de la cápside C']
    },
    microbiologyCharacteristics: {
      metabolism: 'Parásito intracelular estricto. Replicación en citoplasma de células dendríticas, macrófagos y monocitos',
      cultureMedia: ['Cultivo celular en líneas de mosquito C6/36 o células de mamífero Vero (uso en virología de referencia)'],
      optimalTemp: '28-37 °C',
      growthTime: 'Período de incubación extrínseca en el mosquito: 8-12 días; intrínseca en humanos: 4-10 días',
      keyBiochemicalTests: ['Detección de antígeno no estructural NS1 por ELISA o prueba rápida inmunocromatográfica', 'RT-qPCR específica de serotipo', 'Serología IgM / IgG por MAC-ELISA']
    },
    externalAndInternalStructures: [
      'Glicoproteína E: media la unión al receptor celular (DC-SIGN, heparán sulfato) y la fusión mediada por pH ácido',
      'Proteína no estructural 1 (NS1): secretada como hexámero soluble al torrente sanguíneo, activa el complemento e induce fuga endotelial',
      'Polimerasa NS5: ARN polimerasa dependiente de ARN y metiltransferasa'
    ],
    virulenceFactors: [
      { name: 'Antígeno soluble NS1', mechanism: 'Se une al glicocáliz endotelial activando la vía de degradación por heparanasa, induciendo extravasación plasmática e hiperpermeabilidad vascular directa' },
      { name: 'Potenciación dependiente de anticuerpos (ADE)', mechanism: 'Infección secundaria heteróloga con otro serotipo: anticuerpos no neutralizantes facilitan la entrada del virus a macrófagos vía receptores FcγR, multiplicando exponencialmente la carga viral' },
      { name: 'Tormenta de citocinas', mechanism: 'Liberación masiva de TNF-alfa, IL-6, IL-8, IFN-gamma que colapsan la barrera vascular' }
    ],
    reservoir: ['Humanos (en ciclo urbano epidémico)', 'Mosquitos vectores Aedes aegypti y Aedes albopictus'],
    transmissionRoute: ['Picadura de hembras infectadas de mosquito Aedes aegypti (predominante en Guatemala)', 'Transmisión vertical congénita (menos frecuente)', 'Transfusión sanguínea (rara)'],
    vector: 'Aedes aegypti',
    associatedDiseases: [
      {
        name: 'Dengue sin signos de alarma (DSSA)',
        description: 'Fiebre alta súbita acompañada de cefalea holocraneana, dolor retroocular y mialgias intensas.',
        clinicalPresentation: ['Fiebre de 39-40 °C de 2 a 7 días de duración', 'Dolor retroorbitario que empeora con el movimiento ocular', 'Mialgias y artralgias intensas ("fiebre quebrantahuesos")', 'Exantema maculopapular ("islas blancas en mar rojo")']
      },
      {
        name: 'Dengue con signos de alarma (DCSA)',
        description: 'Transición hacia la fase crítica (al caer la fiebre entre los días 3 y 7) con evidencia de extravasación de plasma y sufrimiento hemodinámico temprano.',
        clinicalPresentation: ['Dolor abdominal intenso continuo o a la palpación', 'Vómitos persistentes (> 3 en 1 hora o > 4 en 6 horas)', 'Acumulación clínica de líquidos (ascitis, derrame pleural)', 'Sangrado de mucosas', 'Letargia o irritabilidad extrema', 'Hepatomegalia > 2 cm', 'Aumento progresivo del hematocrito concurrente con descenso de plaquetas']
      },
      {
        name: 'Dengue grave (DG)',
        description: 'Fuga plasmática severa que conduce a choque hipovolémico, sangrado profuso o compromiso orgánico mayor (miocarditis, encefalitis, hepatitis fulminante).',
        clinicalPresentation: ['Choque por dengue (pulso filiforme, frialdad distal, llenado capilar > 2 segundos, presión de pulso <= 20 mmHg)', 'Hemorragias graves espontáneas (hematemesis, melena)', 'AST o ALT >= 1000 UI/L']
      }
    ],
    signsAndSymptoms: ['Fiebre bifásica', 'Cefalea intensa', 'Dolor retroocular', 'Mialgias/Artralgias', 'Náuseas', 'Petequias o prueba de torniquete positiva'],
    complications: ['Choque hipovolémico prolongado con acidosis láctica y falla multiorgánica', 'Coagulación intravascular diseminada (CID)', 'Encefalitis o cerebelitis viral aguda'],
    clinicalSpecimens: ['Suero o plasma sanguíneo (días 1 a 5: para NS1 y RT-PCR; día 6 en adelante: para IgM)'],
    diagnosticMethods: [
      { method: 'Antígeno NS1 en suero (ELISA o Inmunocromatografía)', standardRole: 'Tamizaje', keyFindings: 'Positivo en los primeros 1 a 5 días desde el inicio de la fiebre (fase virémica)' },
      { method: 'RT-PCR en tiempo real para serotipificación (DENV 1, 2, 3, 4)', standardRole: 'Gold Standard', keyFindings: 'Identificación genómica del serotipo circulante (crítico para vigilancia de DENV-2 y DENV-3)' },
      { method: 'Serología IgM (MAC-ELISA)', standardRole: 'Confirmatorio', keyFindings: 'Seroconversión o títulos positivos a partir del 5º o 6º día de iniciados los síntomas' }
    ],
    labFindings: ['Hemoconcentración (elevación del hematocrito >= 20% sobre valor basal)', 'Trombocitopenia marcada (< 100,000 / mm³)', 'Leucopenia con linfocitosis relativa y linfocitos reactivos', 'Elevación de transaminasas hepáticas'],
    treatment: {
      disclaimer: 'NO existen antivirales específicos aprobados. El tratamiento es fundamentalmente soporte hemodinámico guiado por protocolos clínicos de la OPS/MSPAS. ¡CONTRAINDICADO EL USO DE AINES Y ASPIRINA!',
      firstLine: [
        'Dengue sin signos de alarma: Hidratación oral abundante con Sales de Rehidratación Oral (SRO) o líquidos caseros + Paracetamol (Acetaminofén) 500-1000 mg c/6h VO (máx 3-4g/día en adultos, 10-15 mg/kg en niños)',
        'Dengue con signos de alarma: Hospitalización inmediata y reposición intravenosa calculada con Cristaloides isotónicos (Lactato de Ringer o Solución Salina al 0.9%) a 10 mL/kg en 1 hora, reevaluando gasto urinario y hematocrito',
        'Choque por dengue: Resucitación agresiva con cristaloides a 20 mL/kg en 15-30 minutos; si no responde tras 2-3 bolos, infundir coloides o paquete globular si hay sangrado'
      ],
      alternatives: [
        'Solución Hartmman / Ringer Lactato preferida para evitar acidosis hiperclorémica con volúmenes masivos'
      ],
      resistanceNotes: 'Contraindicación absoluta: Ibuprofeno, Diclofenaco, Ketorolaco, Naproxeno y Ácido Acetilsalicílico por alto riesgo de hemorragia gastrointestinal y síndrome de Reye.'
    },
    prevention: ['Eliminación física de criaderos de mosquitos (chatarra, llantas, recipientes con agua estancada)', 'Aplicación de larvicidas biológicos (BTI) y abate en pilas y toneles', 'Uso de repelentes que contengan DEET o Icaridina y mosquiteros tratados'],
    guatemalaRelevance: {
      endemicStatus: 'Hiperendémico',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Escuintla', 'Chiquimula', 'Zacapa', 'Petén', 'Suchitepéquez', 'Santa Rosa', 'Jutiapa', 'Izabal', 'Guatemala'],
      officialNotes: 'Evento de notificación epidemiológica obligatoria inmediata en el Sistema de Información Gerencial de Salud (SIGSA) del MSPAS. Co-circulación histórica de los cuatro serotipos.',
      notificationGroup: 'Notificación Inmediata'
    },
    imagery: [
      {
        type: 'ilustracion_cientifica',
        caption: 'Estructura molecular del virión de Dengue mostrando la disposición geométrica de la glicoproteína E en superficie.',
        stainOrModality: 'Reconstrucción por Criomicroscopía Electrónica (Cryo-EM)',
        creditOrSource: 'PDB Protein Data Bank'
      }
    ],
    bibliography: [
      { source: 'MSPAS Guatemala - Dirección de Epidemiología y Gestión de Riesgo', title: 'Guía Clínica para el Diagnóstico y Manejo del Paciente con Dengue en Guatemala', year: '2023', status: 'Verificado' },
      { source: 'Organización Panamericana de la Salud (OPS/OMS)', title: 'Dengue: Guías para la atención de enfermos en la Región de las Américas (2ª Ed.)', year: '2022', status: 'Verificado' }
    ],
    lastReviewedDate: '2026-03-22'
  },

  {
    id: 'candida-albicans',
    scientificName: 'Candida albicans',
    commonName: 'Candida / Muguet oral',
    category: 'hongo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      kingdom: 'Fungi',
      phylum: 'Ascomycota',
      classTaxon: 'Saccharomycetes',
      orderTaxon: 'Saccharomycetales',
      family: 'Saccharomycetaceae',
      genus: 'Candida',
      species: 'C. albicans'
    },
    morphology: {
      shape: 'Hongo dimórfico / polimórfico (levaduras ovoides, pseudohifas con constricciones e hifas verdaderas septadas)',
      size: 'Levaduras de 4 - 6 µm de diámetro; filamentos de longitud variable',
      arrangement: 'Levaduras gemantes (blastoconidios) con gemación holoblástica',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Tubo germinal (formación a 37 °C en suero en 2-3 horas)', 'Clamidosporas terminales de pared gruesa en agar harina de maíz', 'Pared celular con mananos, beta-glucanos (1,3 y 1,6) y quitina']
    },
    microbiologyCharacteristics: {
      metabolism: 'Aerobio facultativo, fermentador y asimilador de glucosa y maltosa',
      cultureMedia: ['Agar dextrosa Sabouraud (colonias blanco-cremosas pastosas con olor a panadería levaduriforme)', 'CHROMagar Candida (colonias verde esmeralda distintivas)'],
      optimalTemp: '30 - 37 °C',
      growthTime: '24 a 48 horas',
      keyBiochemicalTests: ['Prueba del tubo germinal positiva a las 2 horas en suero humano', 'Formación de clamidosporas en Agar Harina de Maíz Tween 80', 'Asimilación de carbohidratos (Auxonograma)']
    },
    externalAndInternalStructures: [
      'Pared fúngica compuesta por red interna de beta-1,3-glucano y quitina, cubierta por una capa externa densa de manoproteínas',
      'Ergosterol como esterol principal de la membrana celular (blanco de los polienos y azoles)'
    ],
    virulenceFactors: [
      { name: 'Transición levadura-hifa (Dimorfismo fenotípico)', mechanism: 'La forma de levadura favorece la diseminación hematógena y colonización; las hifas invaden activamente tejidos y perforan membranas de neutrófilos' },
      { name: 'Adhesinas de superficie (familia Als y Hwp1)', mechanism: 'Facilitan unión firme a células epiteliales humanas, endotelio vascular y plásticos de catéteres' },
      { name: 'Secreción de proteasas aspárticas (Saps 1-10) y fosfolipasas', mechanism: 'Digieren colágeno, laminina y membrana celular facilitando penetración tisular' },
      { name: 'Candidalisina (toxina peptídica citolítica)', mechanism: 'Péptido secretado por la hifa que perfora la membrana de los enterocitos induciendo inflamación' }
    ],
    reservoir: ['Microbiota comensal habitual humana en tracto gastrointestinal, cavidad oral y mucosa vaginal (30-50% de la población sana)'],
    transmissionRoute: ['Endógena principalmente (disrupción de la barrera mucosa o alteración del microbioma)', 'Contacto directo de mucosas', 'Transmisión nosocomial a través de manos de personal o catéteres intravenosos'],
    associatedDiseases: [
      {
        name: 'Candidiasis orofaríngea (Muguet o Algodoncillo)',
        description: 'Placas blanquecinas pseudomembranosas confluentes sobre la mucosa yugal, lengua o paladar que se desprenden al raspado dejando base eritematosa sangrante.',
        clinicalPresentation: ['Placas blancas adheridas', 'Disfagia o ardor bucal', 'Ageusia o disgeusia']
      },
      {
        name: 'Candidiasis vulvovaginal',
        description: 'Infección mucosa frecuente asociada a uso previo de antibióticos, embarazo o diabetes mellitus no controlada.',
        clinicalPresentation: ['Prurito vulvar intenso y eritema', 'Dispareunia y disuria externa', 'Flujo blanquecino espeso grumoso similar a requesón sin olor fétido']
      },
      {
        name: 'Candidemia y Candidiasis invasiva sistémica',
        description: 'Infección hematógena grave en pacientes en UCI, con nutrición parenteral, neutropenia profunda o catéteres venosos centrales prolongados.',
        clinicalPresentation: ['Fiebre persistente que no responde a antibióticos de amplio espectro', 'Hepatomegalia y esplenomegalia con microabscesos', 'Endoftalmitis candidiásica con lesiones retinianas algodonosas']
      }
    ],
    signsAndSymptoms: ['Ardor mucoso', 'Prurito intenso', 'Lesiones blanquecinas desprendibles', 'Fiebre persistente de foco desconocido en pacientes inmunodeprimidos'],
    complications: ['Endoftalmitis con pérdida irreversible de visión', 'Endocarditis candidiásica sobre válvulas protésicas', 'Choque séptico de origen fúngico'],
    clinicalSpecimens: ['Raspado de mucosa oral o vaginal para examen en fresco', 'Hemocultivos seriados con botellas para hongos (sistema lisis-centrifugación o frascos automatizados estándar)', 'Muestra de orina o cepillado esofágico'],
    diagnosticMethods: [
      { method: 'Examen directo con Hidróxido de Potasio al 10% (KOH) o Tinción de Gram', standardRole: 'Tamizaje', keyFindings: 'Levaduras gemantes y pseudohifas abundantes (Gram positivas)' },
      { method: 'Hemocultivo seriado e incubación prolongada', standardRole: 'Gold Standard', keyFindings: 'Aislamiento de levaduras en pacientes con sospecha de candidiasis sistémica' },
      { method: 'Prueba del Tubo Germinal en suero', standardRole: 'Confirmatorio', keyFindings: 'Extensión filamentosa que nace de la levadura sin constricción basal antes de 3 horas (positivo para C. albicans y C. dubliniensis)' },
      { method: 'Detección de 1,3-beta-D-glucano en suero', standardRole: 'Monitoreo', keyFindings: 'Marcador panfúngico útil en sospecha de infección fúngica invasiva oculta' }
    ],
    labFindings: ['Presencia de blastoconidios y pseudohifas en examen directo en fresco', 'Fondo inflamatorio neutrofílico'],
    treatment: {
      disclaimer: 'La selección antifúngica debe distinguir entre infección mucocutánea localizada e infección sistémica o candidemia.',
      firstLine: [
        'Candidiasis orofaríngea: Nistatina en suspensión oral (100,000 UI/mL) 4-6 mL 4 veces al día o Fluconazol 100-200 mg VO diario por 7-14 días',
        'Candidiasis vulvovaginal: Fluconazol 150 mg VO dosis única o Clotrimazol vaginal en crema/óvulos',
        'Candidemia / Candidiasis Invasiva: Equinocandina de primera elección (Caspofungina 70 mg de carga y luego 50 mg/día IV; o Anidulafungina 200 mg de carga y 100 mg/día IV)'
      ],
      alternatives: [
        'Fluconazol 800 mg carga luego 400 mg/día IV (si paciente está hemodinámicamente estable y sin exposición previa a azoles)',
        'Anfotericina B liposomal 3-5 mg/kg/día IV (en endoftalmitis, SNC o refractariedad)'
      ],
      resistanceNotes: 'C. albicans suele conservar alta sensibilidad a fluconazol, pero emergen especies no-albicans resistentes (ej. C. glabrata y C. auris en vigilancia hospitalaria).'
    },
    prevention: ['Retiro oportuno de líneas venosas centrales innecesarias', 'Control glucémico estricto en diabéticos', 'Uso racional de antibióticos de amplio espectro', 'Higiene del personal de salud'],
    guatemalaRelevance: {
      endemicStatus: 'Vigilancia activa',
      priorityLevel: 'Media',
      departmentsWithHighPrevalence: ['Guatemala (UCI adultos y neonatales)', 'Quetzaltenango', 'Escuintla'],
      officialNotes: 'Causa principal de fungemia en unidades de cuidados intensivos del país. Vigilancia activa para despistaje de Candida auris emergente por el Laboratorio Nacional de Salud.',
      notificationGroup: 'Vigilancia Centinela'
    },
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Microscopía directa: blastoconidios gemantes y pseudohifas de Candida albicans bajo tinción de Gram.',
        stainOrModality: 'Microscopio de campo claro con tinción de Gram (1000x)',
        creditOrSource: 'CDC Public Health Image Library'
      }
    ],
    bibliography: [
      { source: 'Pappas PG, et al. (Infectious Diseases Society of America)', title: 'Clinical Practice Guideline for the Management of Candidiasis: 2016 Update by IDSA', year: '2016', status: 'Revisado' },
      { source: 'Arenas R.', title: 'Micología Médica Ilustrada (6ª Ed.)', year: '2019', status: 'Fuentes pendientes de revisión' }
    ],
    lastReviewedDate: '2026-03-10'
  },

  {
    id: 'plasmodium-vivax',
    scientificName: 'Plasmodium vivax',
    commonName: 'Parásito del Paludismo / Malaria terciaria benigna',
    category: 'parasito',
    parasiteGroup: 'protozoo',
    reviewStatus: 'Fuentes verificadas',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Apicomplexa',
      classTaxon: 'Aconoidasida',
      orderTaxon: 'Haemosporida',
      family: 'Plasmodiidae',
      genus: 'Plasmodium',
      species: 'P. vivax'
    },
    morphology: {
      shape: 'Protozoo apicomplejo intracelular; eritrocitos infectados típicamente agrandados, pálidos y con punteado de Schüffner',
      size: 'Trofozoíto en anillo: 1.5 - 2.5 µm (1/3 del diámetro del hematíe); esquizonte: 9 - 10 µm conteniendo 12 a 24 merozoítos',
      arrangement: 'Intraeritrocitario / Hepatocitario',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Complejo apical (roptrias, micronemas, anillo polar para invasión celular)', 'Apicoplasto', 'Punteado eosinofílico de Schüffner en el citoplasma del eritrocito hospedero']
    },
    microbiologyCharacteristics: {
      metabolism: 'Microaerofílico; degrada la hemoglobina eritrocitaria en aminoácidos y polimeriza el grupo hemo tóxico en hemozoína (pigmento malárico)',
      cultureMedia: ['No se cultiva rutinariamente en laboratorios clínicos estándar'],
      optimalTemp: '25 - 37 °C',
      growthTime: 'Ciclo eritrocitario sincrónico de 48 horas (provoca fiebre cada tercer día: terciana)',
      keyBiochemicalTests: ['Invasión restringida a reticulocitos jóvenes que expresan el antígeno del grupo sanguíneo Duffy (Fy)']
    },
    externalAndInternalStructures: [
      'Proteína circunsporozoítica (CSP) en superficie del esporozoíto',
      'Proteína de unión a Duffy (PvDBP) imprescindible para la invasión del reticulocito humano',
      'Pigmento hemozoína insoluble de color pardo-dorado oscuro'
    ],
    virulenceFactors: [
      { name: 'Hipnozoítos hepáticos', mechanism: 'Formas hepáticas latentes que permanecen silentes durante meses o años reactivándose y generando recaídas clínicas' },
      { name: 'Tropismo por reticulocitos mediado por Duffy', mechanism: 'Invasión mediada por receptor Fy; individuos Duffy negativos son naturalmente resistentes a la infección por P. vivax' },
      { name: 'Citoquinas pirogénicas y lisis eritrocitaria', mechanism: 'La ruptura sincronizada del esquizonte libera hemozoína y merozoítos provocando picos paroxísticos masivos de TNF-alfa e IL-1' }
    ],
    reservoir: ['Seres humanos infectados'],
    transmissionRoute: ['Picadura de la hembra del mosquito vector Anopheles (principalmente Anopheles albimanus y An. pseudopunctipennis en Guatemala)', 'Transfusión de hemoderivados infectados', 'Transmisión vertical transplacentaria (poco común)'],
    vector: 'Anopheles albimanus / Anopheles pseudopunctipennis',
    associatedDiseases: [
      {
        name: 'Paludismo / Malaria Terziana Benigna',
        description: 'Infección parasitaria sistémica caracterizada por paroxismos febriles periódicos cada 48 horas precedidos por escalofríos intensos y seguidos de diaforesis profusa.',
        clinicalPresentation: ['Fase de frío: Escalofríos violentos incontrolables con castañeo de dientes (15-60 min)', 'Fase de calor: Fiebre súbita de 39-41 °C con cefalea pulsátil intensa, vómitos (2-6 horas)', 'Fase de sudoración: Diaforesis copiosa con caída térmica brusca, sed intensa y somnolencia profunda']
      }
    ],
    signsAndSymptoms: ['Paroxismos febriles cada 48 horas', 'Esplenomegalia palpable dolorosa', 'Hepatomegalia leve', 'Palidez mucocutánea e ictericia leve'],
    complications: ['Rotura esplénica espontánea o traumática (emergencia quirúrgica)', 'Anemia grave normocítica normocrómica', 'Malaria severa por P. vivax con distrés respiratorio o trombocitopenia profunda'],
    clinicalSpecimens: ['Sangre capilar obtenida por punción digital durante o inmediatamente después del pico febril'],
    diagnosticMethods: [
      { method: 'Gota Gruesa teñida con Giemsa o Wright', standardRole: 'Gold Standard', keyFindings: 'Método de concentración de alta sensibilidad: visualización de trofozoítos ameboides, esquizontes con 12-24 merozoítos y gametocitos redondeados' },
      { method: 'Frotis de Sangre Periférica delgado', standardRole: 'Confirmatorio', keyFindings: 'Permite diferenciar la especie: eritrocitos parasitados notablemente agrandados, punteado de Schüffner y trofozoítos ameboides activos' },
      { method: 'Pruebas de Diagnóstico Rápido (PDR) inmunocromatográficas para antígeno pan-malárico (LDH)', standardRole: 'Tamizaje', keyFindings: 'Detección cualitativa rápida en áreas rurales remotas de Guatemala sin acceso a microscopía' }
    ],
    labFindings: ['Trombocitopenia moderada a severa', 'Anemia hemolítica con hiperbilirrubinemia indirecta y aumento de LDH', 'Leucopenia o recuento leucocitario normal durante los accesos'],
    treatment: {
      disclaimer: 'Tratamiento normado por el Programa Nacional de Enfermedades Transmitidas por Vectores del MSPAS. Esencial erradicar los hipnozoítos hepáticos con primaquina para evitar recaídas.',
      firstLine: [
        'Cloroquina base: 10 mg/kg el día 1, seguido de 7.5 mg/kg a las 24 y 48 horas (esquema de 3 días para estadio eritrocitario)',
        'Primaquina base: 0.25-0.50 mg/kg/día VO durante 14 días (o pauta supervisada de 0.50 mg/kg/semana por 8 semanas) para erradicar hipnozoítos hepáticos'
      ],
      alternatives: [
        'Tafenoquina (en adultos seleccionados con niveles normales verificados de Glucosa-6-Fosfato Deshidrogenasa)',
        'Arteméter-Lumefantrina en caso de resistencia documentada a cloroquina'
      ],
      resistanceNotes: 'ADVERTENCIA CRÍTICA: La Primaquina puede provocar hemólisis masiva aguda en pacientes con deficiencia de Glucosa-6-Fosfato Deshidrogenasa (G6PD). Contraindicada en mujeres embarazadas y lactantes menores de 6 meses.'
    },
    prevention: ['Uso de mosquiteros impregnados con insecticidas de larga duración (MILD)', 'Rociamiento residual intradomiciliario en comunidades endémicas', 'Drenaje de acumulaciones hídricas donde anida Anopheles'],
    guatemalaRelevance: {
      endemicStatus: 'Endémico',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Escuintla', 'Alta Verapaz', 'Suchitepéquez', 'Petén', 'Izabal', 'Huehuetenango'],
      officialNotes: 'Guatemala se encuentra en la iniciativa regional de eliminación de la malaria de la OPS (E-2025). Plasmodium vivax representa > 90% de los casos autóctonos del país.',
      notificationGroup: 'Notificación Inmediata'
    },
    parasiticStages: [
      {
        id: 'pv-sporozoite',
        stageType: 'esporozoito',
        name: 'Esporozoíto',
        biologicalRole: 'Estadio infectante para el ser humano inoculado por la saliva de la hembra de Anopheles',
        isInfectiveStage: true,
        isDiagnosticStage: false,
        morphologyDescription: 'Forma fusiforme y alargada, con extremo agudo y complejo apical desarrollado para invasión del hepatocito.',
        keyDimensions: '10 - 15 µm de largo por 1 µm de ancho',
        differentialCharacteristics: ['Se encuentra en glándulas salivales del mosquito', 'Migra por sangre al hígado en menos de 30-60 minutos', 'No se observa en frotis diagnóstico rutinario'],
        primaryClinicalSpecimen: 'Glándulas salivales de mosquito vector / Tejido hepático',
        identificationMethod: 'Inmunofluorescencia o disección de vector',
        visualRepresentationType: 'esquema_morfologico'
      },
      {
        id: 'pv-ring-trophozoite',
        stageType: 'trofozoito',
        name: 'Trofozoíto joven en anillo',
        biologicalRole: 'Estadio invasivo inicial en el reticulocito eritrocitario que degrada hemoglobina',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Aspecto clásico de anillo de sello con citoplasma azul fino y un núcleo de cromatina rojo/púrpura excéntrico prominente.',
        keyDimensions: 'Ocupa aproximadamente 1/3 del diámetro eritrocitario',
        differentialCharacteristics: ['Reticulocito infectado visiblemente aumentado de tamaño en comparación con hematíes no parasitados adyacentes', 'Desarrollo progresivo del punteado de Schüffner'],
        primaryClinicalSpecimen: 'Frotis de sangre periférica teñido con Giemsa',
        identificationMethod: 'Microscopía óptica de inmersión 100x',
        visualRepresentationType: 'microfotografia_real'
      },
      {
        id: 'pv-ameboid-trophozoite',
        stageType: 'trofozoito',
        name: 'Trofozoíto maduro ameboide',
        biologicalRole: 'Forma de crecimiento intraeritrocitario de gran actividad fagocítica de hemoglobina',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Citoplasma muy irregular y polimorfo, con prolongaciones ameboides prominentes, vacuolas y finos gránulos de pigmento hemozoína pardo.',
        keyDimensions: 'Ocupa casi 2/3 del eritrocito agrandado',
        differentialCharacteristics: ['Aspecto ameboide muy irregular patognomónico de P. vivax (a diferencia de P. falciparum que rara vez muestra trofozoítos maduros periféricos)', 'Punteado de Schüffner claramente evidente'],
        primaryClinicalSpecimen: 'Frotis de sangre periférica y gota gruesa',
        identificationMethod: 'Tinción con Giemsa / Wright',
        visualRepresentationType: 'microfotografia_real'
      },
      {
        id: 'pv-schizont',
        stageType: 'esquizonte',
        name: 'Esquizonte maduro',
        biologicalRole: 'Estadio de esquizogonia eritrocitaria que se segmenta para liberar merozoítos y causar el paroxismo febril',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Masa esférica multinucleada grande que contiene entre 12 y 24 núcleos (merozoítos individuales) organizados con cúmulos de hemozoína agrupada centralmente.',
        keyDimensions: '9 - 10 µm de diámetro (llena casi por completo el hematíe deformado)',
        differentialCharacteristics: ['Contiene 12 a 24 merozoítos (P. malariae suele contener 6-12 en roseta; P. falciparum rara vez circula en sangre periférica)', 'Hematíe parasitado muy deformado y descolorido'],
        primaryClinicalSpecimen: 'Gota gruesa y frotis sanguíneo',
        identificationMethod: 'Tinción de Giemsa',
        visualRepresentationType: 'microfotografia_real'
      },
      {
        id: 'pv-gametocyte',
        stageType: 'gametocito',
        name: 'Gametocito (Macrogametocito y Microgametocito)',
        biologicalRole: 'Estadio sexual maduro que infecta al mosquito Anopheles cuando succiona sangre para continuar el ciclo esporogónico',
        isInfectiveStage: true,
        isDiagnosticStage: true,
        morphologyDescription: 'Forma esférica u ovalada grande con cromatina densa compacta y pigmento hemozoína finamente repartido en todo el citoplasma azul.',
        keyDimensions: '10 - 11 µm',
        differentialCharacteristics: ['Forma redonda u ovoide (a diferencia de los gametocitos en forma de semiluna o plátano característicos de P. falciparum)', 'Ocupa prácticamente todo el eritrocito distendido'],
        primaryClinicalSpecimen: 'Sangre periférica',
        identificationMethod: 'Gota gruesa y frotis',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Trofozoíto ameboide maduro de Plasmodium vivax en frotis delgado: obsérvese el eritrocito agrandado con fino punteado de Schüffner.',
        stainOrModality: 'Tinción de Giemsa (1000x bajo inmersión)',
        creditOrSource: 'CDC DPDx Parasitology'
      }
    ],
    bibliography: [
      { source: 'Botero D, Restrepo M.', title: 'Parasitosis Humanas (6ª Ed.) - Malaria o Paludismo', year: '2019', status: 'Verificado' },
      { source: 'MSPAS Guatemala - Departamento de Epidemiología', title: 'Plan Estratégico Nacional para la Eliminación de la Malaria en Guatemala 2021-2025', year: '2021', status: 'Verificado' }
    ],
    lastReviewedDate: '2026-03-18'
  },

  {
    id: 'entamoeba-histolytica',
    scientificName: 'Entamoeba histolytica',
    commonName: 'Amiba disentérica',
    category: 'parasito',
    parasiteGroup: 'protozoo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Amoebozoa',
      classTaxon: 'Archamoebea',
      orderTaxon: 'Mastigamoebida',
      family: 'Entamoebidae',
      genus: 'Entamoeba',
      species: 'E. histolytica'
    },
    morphology: {
      shape: 'Trofozoíto pleomórfico activo con pseudópodos digitiformes; quiste esférico de pared refringente',
      size: 'Trofozoíto: 20 - 40 µm; Quiste maduro: 10 - 15 µm',
      arrangement: 'Unicelular ameboide',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Cariosoma central puntiforme pequeño', 'Cromatina periférica fina distribuida uniformemente en el borde nuclear', 'Cuerpos cromatoidales con extremos romos redondeados (en quistes inmaduros)', 'Ausencia de mitocondrias clásicas (poseen mitosomas)']
    },
    microbiologyCharacteristics: {
      metabolism: 'Anaerobio o microaerófilo; fagocita activamente eritrocitos humanos y restos tisulares mediante lectina Gal/GalNAc',
      cultureMedia: ['Medio de Robinson o bifásico de Boeck-Drbohlav (reservado para investigación)'],
      optimalTemp: '37 °C',
      growthTime: 'Se multiplica en la luz del colon por fisión binaria simple',
      keyBiochemicalTests: ['Diferenciación antigénica y molecular obligatoria frente a la especie comensal no patógena Entamoeba dispar']
    },
    externalAndInternalStructures: [
      'Lectina Galactosa/N-acetilgalactosamina (Gal/GalNAc): adhesina clave a mucina colónica',
      'Amebaporos (A, B, C): péptidos citolíticos formadores de canales que destruyen membranas celulares blanco',
      'Cisteína proteinasas (EhCPs): degradan colágeno, elastina, IgA y la matriz extracelular'
    ],
    virulenceFactors: [
      { name: 'Adhesión por lectina Gal/GalNAc', mechanism: 'Se une a receptores glucosilados en los enterocitos del colon permitiendo el contacto íntimo y la citólisis' },
      { name: 'Amebaporos (péptidos líticos formadores de poros)', mechanism: 'Despolarizan y lisan neutrófilos, eritrocitos y enterocitos humanos mediante inserción transmembrana' },
      { name: 'Eritrofagocitosis activa', mechanism: 'Fagocita glóbulos rojos (hallazgo patognomónico que distingue E. histolytica de E. dispar en microscopía directa)' }
    ],
    reservoir: ['Seres humanos infectados (portadores asintomáticos que eliminan millones de quistes en heces)'] ,
    transmissionRoute: ['Fecal-oral: ingestión de agua de bebida o vegetales crudos contaminados con quistes maduros', 'Contaminación por manipuladores de alimentos', 'Transmisión sexual (prácticas oro-anales)'],
    associatedDiseases: [
      {
        name: 'Disentería amebiana / Colitis amebiana invasiva',
        description: 'Invasión de la mucosa y submucosa del colon con formación de úlceras en "botón de camisa" o cuello de botella.',
        clinicalPresentation: ['Evacuaciones diarreicas sanguinolentas frecuentes con moco abundante', 'Pujo y tenesmo rectal intenso', 'Dolor cólico abdominal en marco cólico']
      },
      {
        name: 'Absceso hepático amebiano (AHA)',
        description: 'Diseminación hematógena vía circulación portal hacia el parénquima hepático (típicamente lóbulo derecho único) formando cavidad con líquido necrótico "en pasta de anchoas".',
        clinicalPresentation: ['Fiebre de inicio insidioso', 'Dolor constante sordo en hipocondrio derecho irradiado a hombro ipsilateral', 'Hepatomegalia dolorosa a la percusión', 'Diaforesis y astenia']
      }
    ],
    signsAndSymptoms: ['Evacuaciones disentéricas (moco y sangre)', 'Tenesmo rectal', 'Dolor abdominal cólico', 'Fiebre moderada'],
    complications: ['Perforación intestinal con peritonitis fecal', 'Megacolon tóxico amebiano', 'Ruptura del absceso hepático hacia pleura, pericardio o cavidad peritoneal'],
    clinicalSpecimens: ['Heces diarreicas frescas examinadas antes de 30 minutos (para trofozoítos móviles)', 'Heces formadas en solución conservadora (para quistes)', 'Punción aspirativa de absceso hepático (líquido achocolatado sin olor)'],
    diagnosticMethods: [
      { method: 'Coproparasitoscópico seriado (3 muestras) por concentración y frotis teñido con Lugol / Hematoxilina férrica', standardRole: 'Tamizaje', keyFindings: 'Identificación de quistes tetranucleados con cuerpos cromatoidales de bordes romos' },
      { method: 'Examen directo en fresco con solución salina al 0.9% en heces recién emitidas', standardRole: 'Confirmatorio', keyFindings: 'Trofozoítos con movilidad direccional unidireccional y presencia de eritrocitos fagocitados en su citoplasma (eritrofagocitosis patognomónica)' },
      { method: 'Detección de antígeno fecal de E. histolytica por ELISA / PCR en tiempo real', standardRole: 'Gold Standard', keyFindings: 'Distingue de forma definitiva la patógena E. histolytica de la no patógena e idéntica en microscopio Entamoeba dispar' }
    ],
    labFindings: ['Presencia de eritrocitos y escasos neutrófilos enteros en frotis fecal (citólisis de leucocitos)', 'Leucocitosis con neutrofilia en absceso hepático', 'Fosfatasa alcalina elevada en AHA'],
    treatment: {
      disclaimer: 'El tratamiento requiere un agente tisular (para erradicar la forma invasiva) seguido obligatoriamente de un agente luminal (para eliminar quistes y prevenir recidiva y transmisión).',
      firstLine: [
        'Amebiasis invasiva (Colitis / Absceso Hepático): Metronidazol 500-750 mg VO o IV c/8h por 7 a 10 días (o Tinidazol 2g VO diario por 3 a 5 días)',
        'Seguido SIEMPRE de agente luminal: Furoato de Diloxanida 500 mg c/8h por 10 días o Paramomicina 25-35 mg/kg/día dividido en 3 dosis por 7 días'
      ],
      alternatives: [
        'Nitazoxanida 500 mg VO c/12h por 3 días (en infecciones intestinales leves)',
        'Drenaje percutáneo guiado por ultrasonido de absceso hepático reservado para: lesiones > 10 cm, riesgo inminente de ruptura o falta de respuesta clínica a las 72h'
      ],
      resistanceNotes: 'Efecto disulfiram (antabús) severo con ingesta de alcohol durante el tratamiento con metronidazol o tinidazol.'
    },
    prevention: ['Hervir el agua de consumo humano durante al menos 1 minuto (los quistes resisten la cloración convencional del agua)', 'Lavado riguroso de manos con agua y jabón', 'Saneamiento ambiental y adecuada disposición de excretas'],
    guatemalaRelevance: {
      endemicStatus: 'Hiperendémico',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Guatemala (áreas periféricas sin agua potable)', 'Alta Verapaz', 'Chiquimula', 'Quiché', 'Escuintla', 'San Marcos'],
      officialNotes: 'Causa sumamente frecuente de consulta por diarrea disentérica y absceso hepático en hospitales de la red nacional del MSPAS.',
      notificationGroup: 'Notificación Semanal'
    },
    parasiticStages: [
      {
        id: 'eh-cyst',
        stageType: 'quiste',
        name: 'Quiste tetranucleado maduro',
        biologicalRole: 'Estadio de resistencia ambiental e infectante para el ser humano vía fecal-oral',
        isInfectiveStage: true,
        isDiagnosticStage: true,
        morphologyDescription: 'Estructura esférica con pared quística delgada refringente. El quiste maduro posee exactamente 4 núcleos con cariosoma central diminuto y fino anillo de cromatina periférica.',
        keyDimensions: '10 - 15 µm de diámetro',
        differentialCharacteristics: ['Presenta 1 a 4 núcleos (Entamoeba coli tiene quistes más grandes con hasta 8 núcleos y cariosoma excéntrico)', 'Cuerpos cromatoidales con extremos redondeados en forma de habano (bastones romos)', 'Resiste jugos gástricos y cloración convencional'],
        primaryClinicalSpecimen: 'Heces formadas o pastosas',
        identificationMethod: 'Examen coproparasitoscópico con tinción de Lugol o Hematoxilina férrica',
        visualRepresentationType: 'microfotografia_real'
      },
      {
        id: 'eh-trophozoite',
        stageType: 'trofozoito',
        name: 'Trofozoíto invasor (Forma magna)',
        biologicalRole: 'Estadio móvil vegetativo invasor de la pared colónica y causante de la citopatología y necrosis tisular',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Célula ameboide pleomórfica activa que emite pseudópodos hialinos digitiformes unidireccionales (ectoplasma claro). Citoplasma granular que contiene eritrocitos digeridos.',
        keyDimensions: '20 - 40 µm de diámetro',
        differentialCharacteristics: ['Eritrofagocitosis: presencia de glóbulos rojos englobados en el endoplasma (criterio patognomónico que descarta E. dispar)', 'Un único núcleo esférico con cariosoma diminuto estrictamente central', 'Se destruye rápidamente en el medio ambiente exterior'],
        primaryClinicalSpecimen: 'Heces recién emitidas con moco y sangre / Aspirado de úlcera colónica',
        identificationMethod: 'Examen directo en fresco a 37 °C dentro de los 30 minutos de recolectada la muestra',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Trofozoíto de Entamoeba histolytica con eritrocitos fagocitados en citoplasma granular (criterio patognomónico de especie invasiva).',
        stainOrModality: 'Microscopía de campo claro con tinción tricrómica (1000x)',
        creditOrSource: 'CDC/Dr. Mae Melvin'
      }
    ],
    bibliography: [
      { source: 'Botero D, Restrepo M.', title: 'Parasitosis Humanas (6ª Ed.) - Amebiasis Intestinal y Tisular', year: '2019', status: 'Revisado' },
      { source: 'World Health Organization (WHO)', title: 'Amoebiasis: Weekly Epidemiological Record', year: '2018', status: 'Fuentes pendientes de revisión' }
    ],
    lastReviewedDate: '2026-03-12'
  },

  {
    id: 'taenia-solium',
    scientificName: 'Taenia solium',
    commonName: 'Solitaria del cerdo / Tenia armada',
    category: 'parasito',
    parasiteGroup: 'cestodo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Platyhelminthes',
      classTaxon: 'Cestoda',
      orderTaxon: 'Cyclophyllidea',
      family: 'Taeniidae',
      genus: 'Taenia',
      species: 'T. solium'
    },
    morphology: {
      shape: 'Gusano plano segmentado en forma de cinta (cestoideo). Posee escólex, cuello y estróbilo compuesto por cientos de proglótides',
      size: 'Adulto: 2 a 7 metros de longitud; Cisticerco: 0.5 a 1.5 cm; Huevo: 30 a 40 µm',
      arrangement: 'Segmentación seriada estrobilar',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Escólex armado con rostelo prominente y doble corona de ganchos (22 a 32)', 'Cuatro ventosas en copa', 'Ausencia total de tubo digestivo (absorbe nutrientes por tegumento microtrico)']
    },
    microbiologyCharacteristics: {
      metabolism: 'Anaerobio facultativo; absorción activa de carbohidratos simples a través de la superficie tegumentaria',
      cultureMedia: ['No aplica (helminto pluricelular)'],
      optimalTemp: '37 °C en el tracto intestinal',
      growthTime: 'El parásito adulto vive de 2 a 5 años (o más) fijado a la mucosa del yeyuno',
      keyBiochemicalTests: ['Diferenciación de huevos con T. saginata indistinguible morfológicamente; distinción por ramas uterinas de proglótides grávidas']
    },
    externalAndInternalStructures: [
      'Tegumento sincitial metabólicamente activo cubierto de microtricos similares a microvellosidades',
      'Estróbilo con proglótides inmaduras, maduras (hermafroditas con órganos masculinos y femeninos) y grávidas llenas de huevos'
    ],
    virulenceFactors: [
      { name: 'Rostelo con corona de ganchos quitinosos', mechanism: 'Permite anclaje mecánico firme a la pared de la mucosa del intestino delgado evitando la expulsión por peristaltismo' },
      { name: 'Mimetismo inmunológico y modulación por cisticerco', mechanism: 'La larva (Cysticercus cellulosae) secreta paramiosina, taeniaestatina y sulfato de dextrano que inhiben el complemento y la respuesta Th1 del huésped' }
    ],
    reservoir: ['Ser humano (único hospedero definitivo del adulto)', 'Cerdo doméstico (hospedero intermediario que alberga cisticercos en músculos)'],
    transmissionRoute: [
      'Para Teniasis intestinal: Ingestión de carne de cerdo insuficientemente cocida con cisticercos viables',
      'Para Cisticercosis / Neurocisticercosis humana: Ingestión accidental de HUEVOS de Taenia solium procedentes de heces humanas (vía fecal-oral o autoinfección)'
    ],
    associatedDiseases: [
      {
        name: 'Teniasis Intestinal Humana',
        description: 'Colonización de la luz del intestino delgado por el gusano adulto tras la ingesta de cisticercos viables en carne de cerdo.',
        clinicalPresentation: ['Generalmente asintomática o síntomas digestivos leves', 'Molestia epigástrica inespecífica o sensación de hambre dolorosa', 'Eliminación pasiva de cadenas cortas de proglótides en heces']
      },
      {
        name: 'Neurocisticercosis (NCC)',
        description: 'La parasitosis más grave del sistema nervioso central en países en desarrollo: el humano actúa como hospedero intermediario accidental al ingerir huevos de Taenia solium.',
        clinicalPresentation: ['Crisis epilépticas de inicio tardío (primera causa de epilepsia adquirida en el adulto en Guatemala)', 'Cefalea intensa crónica con signos de hipertensión intracraneal', 'Déficits neurológicos focales', 'Hidrocefalia por quistes ventriculares o aracnoiditis basilar (forma racemosa)']
      }
    ],
    signsAndSymptoms: ['Expulsión de proglótides en evacuaciones', 'Epilepsia de nueva aparición en adultos', 'Cefalea persistente progresiva', 'Déficit motor focal'],
    complications: ['Estado epiléptico refractario', 'Hidrocefalia obstructiva que requiere colocación de derivación ventriculoperitoneal', 'Cisticercosis ocular con desprendimiento de retina'],
    clinicalSpecimens: ['Heces frescas para tamizaje de proglótides grávidas y huevos', 'Resonancia Magnética (RMN) o Tomografía Computarizada (TC) cerebral para neurocisticercosis', 'Líquido cefalorraquídeo para inmunodiagnóstico (Western Blot)'],
    diagnosticMethods: [
      { method: 'Observación macroscópica de proglótides grávidas inyectadas con tinta china', standardRole: 'Confirmatorio', keyFindings: 'Identificación de 7 a 12 ramas uterinas principales a cada lado del tronco central (T. saginata tiene de 15 a 30)' },
      { method: 'Técnica de Graham (cinta adhesiva perianal) y examen coproparasitoscópico', standardRole: 'Tamizaje', keyFindings: 'Huevos esféricos con corteza radiada gruesa conteniendo la oncosfera con 6 ganchillos (oncosfera hexacanto)' },
      { method: 'Neuroimagen cerebral (Resonancia Magnética y TC contrastada)', standardRole: 'Gold Standard', keyFindings: 'Visualización de cisticercos en diferentes fases evolutivas: vesicular (quiste con nódulo mural correspondiente al escólex), coloidal, granular-nodular y calcificado' },
      { method: 'Western Blot (Electroinmunotransferencia EITB) con antígenos purificados', standardRole: 'Confirmatorio', keyFindings: 'Mayor especificidad (>99%) para confirmar neurocisticercosis activa' }
    ],
    labFindings: ['Eosinofilia periférica moderada (en fases de invasión tisular o ruptura de quistes)', 'Pleocitosis mononuclear en LCR con hiperproteinorraquia'],
    treatment: {
      disclaimer: 'El tratamiento de la Teniasis intestinal es farmacológico simple. El manejo de la Neurocisticercosis es complejo y requiere HOSPITALIZACIÓN, administración previa de CORTICOESTEROIDES y evaluación estricta por Neurología.',
      firstLine: [
        'Teniasis intestinal: Praziquantel 5 a 10 mg/kg VO dosis única; o Niclosamida 2 g masticados en ayunas',
        'Neurocisticercosis con quistes vesiculares viables: Albendazol 15 mg/kg/día dividido en 2 tomas por 10 a 14 días + Dexametasona 0.1 mg/kg/día iniciada 1-2 días antes del antiparasitario para mitigar la inflamación reactiva'
      ],
      alternatives: [
        'Praziquantel combinado con Albendazol en neurocisticercosis con múltiples quistes viables parenquimatosos',
        'Fármacos antiepilépticos (Levetiracetam, Carbamazepina) mantenidos a largo plazo para control de crisis convulsivas',
        'Extracción neuroquirúrgica o endoscópica en cisticercosis intraventricular o subaracnoidea'
      ],
      resistanceNotes: 'ADVERTENCIA GRAVE: Nunca iniciar antiparasitarios cisticidas en pacientes con hipertensión intracraneal no controlada o cisticercosis ocular activa sin protección esteroidea estricta.'
    },
    prevention: ['Inspección sanitaria estricta de carne de cerdo en rastros y mataderos', 'Cocción completa de la carne de cerdo (temperatura interna > 65-70 °C)', 'Lavado meticuloso de manos para prevenir fecalismo e ingestión de huevos', 'Tratamiento de todos los portadores humanos de tenia adulta'],
    guatemalaRelevance: {
      endemicStatus: 'Endémico',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Chimaltenango', 'Quiché', 'Totonicapán', 'San Marcos', 'Huehuetenango', 'Alta Verapaz', 'Jalapa'],
      officialNotes: 'Endémica en áreas rurales con crianza doméstica de cerdos en traspatio ("cerdos de corral"). Causa frecuente de internamiento por epilepsia en el Hospital Roosevelt y San Juan de Dios.',
      notificationGroup: 'Notificación Semanal'
    },
    parasiticStages: [
      {
        id: 'ts-egg',
        stageType: 'huevo',
        name: 'Huevo embrionado con oncosfera',
        biologicalRole: 'Estadio infectante para el cerdo (causa cisticercosis porcina) y para el ser humano (causa neurocisticercosis humana accidental)',
        isInfectiveStage: true,
        isDiagnosticStage: true,
        morphologyDescription: 'Forma esférica con cubierta externa o embrióforo muy grueso de color pardo amarillento, estriado radialmente en empalizada. En el interior contiene un embrión hexacanto con 3 pares de ganchos refringentes.',
        keyDimensions: '31 - 43 µm de diámetro',
        differentialCharacteristics: ['Embrióforo con estrías radiales birrefringentes muy marcadas', 'Indistinguible al microscopio del huevo de Taenia saginata (se reporta como "Huevos de Taenia sp.")', 'Extremadamente resistente a factores ambientales externos'],
        primaryClinicalSpecimen: 'Heces humanas o raspado perianal con cinta engomada',
        identificationMethod: 'Examen coproparasitoscópico de sedimentación o flotación y técnica de Graham',
        visualRepresentationType: 'microfotografia_real'
      },
      {
        id: 'ts-cysticercus',
        stageType: 'cisticerco',
        name: 'Cisticerco (Cysticercus cellulosae)',
        biologicalRole: 'Estadio larvario tisular vesicular infectante para el ser humano al ingerir carne de cerdo; estadio patológico causante de neurocisticercosis',
        isInfectiveStage: true,
        isDiagnosticStage: true,
        morphologyDescription: 'Vesícula membranosa translúcida llena de líquido claro que contiene un único escólex invaginado provisto de ventosas y ganchos.',
        keyDimensions: '0.5 a 1.5 cm de diámetro (en parénquima cerebral; puede medir varios centímetros en su forma racemosa ventricular)',
        differentialCharacteristics: ['Contiene un escólex armado invaginado con ganchos', 'Visualizable en neuroimagen como quiste con "punto mural" (escólex blanco hiperdenso en anillo)'],
        primaryClinicalSpecimen: 'Músculo estriado porcino / Biopsia quirúrgica de SNC / Resonancia Magnética cerebral',
        identificationMethod: 'Inspección de carnes en rastro o neuroimagen por RMN y TC',
        visualRepresentationType: 'microfotografia_real'
      },
      {
        id: 'ts-scolex',
        stageType: 'escolex',
        name: 'Escólex armado de Taenia solium',
        biologicalRole: 'Órgano de fijación cefálico del parásito adulto que se ancla a la mucosa intestinal del huésped definitivo',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Estructura cuadrangular o piriforme provista de cuatro ventosas circulares prominentes y un rostelo apical armado con una doble corona de 22 a 32 ganchos quitinosos.',
        keyDimensions: 'Aproximadamente 1 mm de diámetro',
        differentialCharacteristics: ['Presencia de rostelo y doble corona de ganchos (T. saginata carece de rostelo y ganchos, es inerme)', 'Cuatro ventosas esféricas laterales'],
        primaryClinicalSpecimen: 'Evacuación postratamiento antihelmíntico',
        identificationMethod: 'Examen estereoscópico o microscópico directo tras tamizado de heces',
        visualRepresentationType: 'microfotografia_real'
      },
      {
        id: 'ts-proglottid',
        stageType: 'proglotide',
        name: 'Proglótide grávida madura',
        biologicalRole: 'Segmento terminal estrobilar repleto de miles de huevos embrionados que se desprende pasivamente en las heces',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Segmento aplanado rectangular más largo que ancho, con poro genital lateral irregularmente alternado y útero central con pocas ramificaciones primarias dicotómicas.',
        keyDimensions: '10 - 12 mm de largo por 5 - 6 mm de ancho',
        differentialCharacteristics: ['Presenta de 7 a 12 ramas uterinas principales a cada lado del tallo central (característica distintiva crítica frente a Taenia saginata que presenta de 15 a 30 ramas finas dicotómicas)', 'Se eliminan habitualmente en cadenas pasivas de 4 a 6 proglótides con las heces (no migran activamente fuera del esfínter anal como T. saginata)'],
        primaryClinicalSpecimen: 'Heces o fragmentos expulsados espontáneamente',
        identificationMethod: 'Compresión entre dos portaobjetos e inyección uterina de tinta china o hematoxilina',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Huevo esférico característico de Taenia sp. con pared gruesa radiada en empalizada y embrión hexacanto interno.',
        stainOrModality: 'Microscopía directa en solución salina con objetivo 40x',
        creditOrSource: 'CDC DPDx Parasite Image Library'
      }
    ],
    bibliography: [
      { source: 'Botero D, Restrepo M.', title: 'Parasitosis Humanas (6ª Ed.) - Cestodiasis: Teniasis y Cisticercosis', year: '2019', status: 'Revisado' },
      { source: 'Garcia HH, et al. (Neurocysticercosis Working Group in Peru)', title: 'Clinical Practice Guideline for the Management of Neurocysticercosis: 2017 IDSA / ASTMH', year: '2018', status: 'Fuentes pendientes de revisión' }
    ],
    lastReviewedDate: '2026-03-25'
  },

  {
    id: 'plasmodium-falciparum',
    scientificName: 'Plasmodium falciparum',
    commonName: 'Paludismo por falciparum / Malaria terciana maligna',
    category: 'parasito',
    parasiteGroup: 'protozoo',
    reviewStatus: 'Fuentes verificadas',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Apicomplexa',
      classTaxon: 'Aconoidasida',
      orderTaxon: 'Haemosporida',
      family: 'Plasmodiidae',
      genus: 'Plasmodium',
      species: 'P. falciparum'
    },
    morphology: {
      shape: 'Protozoo apicomplejo intraeritrocítico; hematíes parasitados de TAMAÑO NORMAL (no hipertrofiados), sin punteado de Schüffner. Pueden presentar hendiduras de Maurer.',
      size: 'Trofozoíto en anillo: 1.0 - 1.5 µm (1/5 del diámetro del hematíe); Gametocito en semiluna: 9 - 14 µm',
      arrangement: 'Intraeritrocitario / Citoadherente endotelial profundo',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Proteína de membrana eritrocitaria 1 (PfEMP-1) mediadora de citoadherencia y formación de "rosetas"', 'Complejo apical invasor', 'Ausencia de hipnozoítos hepáticos']
    },
    microbiologyCharacteristics: {
      metabolism: 'Microaerófilo; degrada hemoglobina de hematíes de todas las edades (reticulocitos y maduros), generando parasitemias muy elevadas (> 5-10%)',
      cultureMedia: ['Cultivo continuo in vitro en medio RPMI 1640 con suero humano (método de Trager-Jensen)'],
      optimalTemp: '37 °C',
      growthTime: 'Ciclo eritrocitario de 48 horas (fiebre terciana irregular)',
      keyBiochemicalTests: ['Detección de proteína rica en histidina II (HRP-2) en pruebas rápidas']
    },
    externalAndInternalStructures: [
      'Protuberancias ("knobs") en la superficie del eritrocito parasitado con PfEMP-1',
      'Hendiduras de Maurer: vesículas de transporte en el citoplasma del hematíe',
      'Pigmento hemozoína condensado'
    ],
    virulenceFactors: [
      { name: 'Citoadherencia y secuestro microvascular (PfEMP-1)', mechanism: 'Se une a receptores endoteliales (CD36, ICAM-1, EPCR) causando secuestro capilar en cerebro, riñón y pulmón, evitando el paso por el bazo' },
      { name: 'Invasión no restringida de eritrocitos', mechanism: 'Invade hematíes de cualquier edad, provocando anemia hemolítica fulminante y parasitemias potencialmente letales' },
      { name: 'Formación de rosetas y rigidez eritrocitaria', mechanism: 'Hematíes parasitados agrupan hematíes no parasitados obstruyendo el flujo microvascular' }
    ],
    reservoir: ['Seres humanos infectados'],
    transmissionRoute: ['Picadura de hembras infectadas de mosquito Anopheles', 'Transfusiones sanguíneas', 'Transmisión vertical congénita'],
    vector: 'Anopheles albimanus / Anopheles pseudopunctipennis',
    associatedDiseases: [
      {
        name: 'Malaria Grave y Complicada por P. falciparum',
        description: 'Emergencia médica caracterizada por malaria cerebral (coma), distrés respiratorio agudo, acidosis metabólica severa, falla renal aguda y anemia grave.',
        clinicalPresentation: ['Fiebre maligna continua o en picos irregulares', 'Alteración del estado de conciencia o convulsiones (Malaria cerebral)', 'Ictericia y coluria intensa (Fiebre hemoglobinúrica)', 'Hiperlactatemia y respiración acidótica de Kussmaul']
      }
    ],
    signsAndSymptoms: ['Fiebre alta irregular', 'Cefalea intensa y mialgias', 'Ictericia cutaneomucosa', 'Postración extrema', 'Vómitos biliosos'],
    complications: ['Malaria cerebral con edema cerebral y herniación', 'Edema pulmonar no cardiogénico', 'Insuficiencia renal aguda por necrosis tubular', 'Acidosis láctica letal'],
    clinicalSpecimens: ['Sangre capilar periférica por punción digital inmediata'],
    diagnosticMethods: [
      { method: 'Gota Gruesa y Frotis Delgado con Giemsa', standardRole: 'Gold Standard', keyFindings: 'Anillos muy pequeños y delicados con formas con doble cromatina, alta parasitemia y gametocitos en semiluna; ausencia de esquizontes en sangre periférica' },
      { method: 'Pruebas de Diagnóstico Rápido (PDR) basadas en Antígeno HRP-2', standardRole: 'Tamizaje', keyFindings: 'Sensibilidad > 95% para P. falciparum en áreas rurales remotas de Guatemala' }
    ],
    labFindings: ['Parasitemia > 2-5% de hematíes parasitados', 'Trombocitopenia severa (< 50,000/µL)', 'Hipoglucemia grave', 'Elevación de creatinina sérica y bilirrubina total'],
    treatment: {
      disclaimer: 'Tratamiento normado por el MSPAS/OPS. P. falciparum en Centroamérica suele mantener sensibilidad a Cloroquina, pero la malaria grave exige Terapia Combinada con Derivados de Artemisinina (TCA).',
      firstLine: [
        'Malaria no complicada: Cloroquina base 25 mg/kg dividida en 3 días (10 mg/kg día 1 y 2, 5 mg/kg día 3) + Dosis única de Primaquina 0.75 mg/kg el día 1 como gametocida (para cortar la transmisión vectorial)',
        'Malaria grave: Artesunato intravenoso 2.4 mg/kg a las 0, 12 y 24 horas, y luego diario hasta tolerar vía oral'
      ],
      alternatives: [
        'Arteméter-Lumefantrina (TCA oral) en caso de sospecha de resistencia o importación de cepas sudamericanas/africanas',
        'Quinina intravenosa + Doxiciclina como alternativa si no hay artesunato'
      ],
      resistanceNotes: 'P. falciparum NO forma hipnozoítos en el hígado, por lo que NO requiere esquema de 14 días de primaquina, sino únicamente dosis única gametocitocida.'
    },
    prevention: ['Uso de mosquiteros tratados con insecticida (MILD)', 'Diagnóstico y tratamiento oportuno en menos de 24-48 horas', 'Vigilancia de casos en áreas endémicas del Caribe (Izabal)'],
    guatemalaRelevance: {
      endemicStatus: 'Vigilancia activa',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Izabal', 'Petén', 'Escuintla (esporádico)'],
      officialNotes: 'Representa menos del 5-10% de los casos de malaria en Guatemala (dominada por P. vivax), pero es responsable de las formas clínicas de mayor gravedad y letalidad.',
      notificationGroup: 'Notificación Inmediata'
    },
    parasiticStages: [
      {
        id: 'pf-stage-ring-micro',
        stageType: 'trofozoito',
        name: 'Trofozoíto en anillo delicado',
        biologicalRole: 'Forma circulante periférica inicial con alta parasitemia e invasión eritrocitaria masiva',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Anillo citoplasmático muy delgado (1/5 del diámetro del hematíe) con uno o dos puntos de cromatina roja y formas aplicadas a la membrana.',
        keyDimensions: '1.0 - 1.5 µm',
        differentialCharacteristics: ['Hematíes parasitados de tamaño normal', 'Frecuente doble cromatina y poli-infección', 'Ausencia de punteado de Schüffner'],
        primaryClinicalSpecimen: 'Frotis de sangre periférica',
        identificationMethod: 'Tinción con Giemsa a 1000x',
        visualRepresentationType: 'microfotografia_real'
      },
      {
        id: 'pf-stage-gametocyte-micro',
        stageType: 'gametocito',
        name: 'Gametocito en semiluna',
        biologicalRole: 'Estadio sexual maduro infeccioso para el mosquito Anopheles',
        isInfectiveStage: true,
        isDiagnosticStage: true,
        morphologyDescription: 'Forma patognomónica falciforme en semiluna, banana o salchicha con cromatina y pigmento condensados en el centro.',
        keyDimensions: '9 - 14 µm de longitud por 2 - 3 µm de ancho',
        differentialCharacteristics: ['Único Plasmodium humano con gametocitos alargados falciformes (todos los demás son esféricos)'],
        primaryClinicalSpecimen: 'Gota gruesa y frotis sanguíneo',
        identificationMethod: 'Tinción de Giemsa',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Trofozoítos en anillo delicados y gametocito en semiluna patognomónico de Plasmodium falciparum en frotis sanguíneo.',
        stainOrModality: 'Microscopía de inmersión teñida con Giemsa (1000x)',
        creditOrSource: 'CDC DPDx Parasite Image Library'
      }
    ],
    bibliography: [
      { source: 'MSPAS Guatemala - Departamento de Epidemiología', title: 'Plan Estratégico Nacional para la Eliminación de la Malaria en Guatemala 2021-2025', year: '2021', status: 'Verificado' },
      { source: 'Organización Mundial de la Salud (OMS)', title: 'Directrices de la OMS para la malaria', year: '2023', status: 'Verificado' }
    ],
    lastReviewedDate: '2026-03-20'
  },

  {
    id: 'giardia-duodenalis',
    scientificName: 'Giardia duodenalis',
    commonName: 'Giardia lamblia / Giardia intestinalis',
    category: 'parasito',
    parasiteGroup: 'protozoo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Metamonada',
      classTaxon: 'Trepomonadea',
      orderTaxon: 'Diplomonadida',
      family: 'Hexamitidae',
      genus: 'Giardia',
      species: 'G. duodenalis'
    },
    morphology: {
      shape: 'Trofozoíto piriforme en cometa con disco suctorio ventral y aspecto de máscara/payaso; quiste ovalado con 4 núcleos y axonemas internos.',
      size: 'Trofozoíto: 10 - 15 µm; Quiste: 8 - 12 µm de longitud',
      arrangement: 'Unicelular flagelado con simetría bilateral',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Disco suctorio ventral cóncavo (ventosa mecánica)', 'Axostilo medial', '4 pares de flagelos (anterior, posterior, ventral y caudal)', '2 núcleos simétricos']
    },
    microbiologyCharacteristics: {
      metabolism: 'Microaerófilo o anaerobio; absorbe nutrientes por pinocitosis en la superficie de las microvellosidades intestinales sin penetrar la lámina propia',
      cultureMedia: ['Medio TYI-S-33 axénico (exclusivo para investigación)'],
      optimalTemp: '37 °C',
      growthTime: 'Multiplicación por fisión binaria longitudinal cada 9-12 horas',
      keyBiochemicalTests: ['Detección de coproantígenos por ELISA o inmunocromatografía']
    },
    externalAndInternalStructures: [
      'Disco suctorio compuesto por microtúbulos de tubulina y giardinas',
      'Proteínas variables de superficie (VSP) que median evasión inmune por variación antigénica',
      'Pared quística formada por filamentos de carbohidratos (GalNAc) y proteínas ricas en cisteína'
    ],
    virulenceFactors: [
      { name: 'Adhesión por disco suctorio mecánico', mechanism: 'Adhesión firme al ribete en cepillo del enterocito en duodeno y yeyuno, causando aplanamiento de vellosidades y déficit de disacaridasas' },
      { name: 'Variación antigénica de VSP', mechanism: 'Expresión alternante de un repertorio de más de 150 genes VSP para evadir la respuesta de anticuerpos IgA secretora' },
      { name: 'Inducción de apoptosis enterocítica e hiperpermeabilidad', mechanism: 'Disrupción de las uniones ocluyentes (claudinas y zonula occludens-1) favoreciendo la diarrea osmótica y esteatorrea' }
    ],
    reservoir: ['Seres humanos infectados', 'Mamíferos domésticos y silvestres (perros, gatos, castores: zoonosis potencial)'],
    transmissionRoute: ['Fecal-oral: ingestión de agua de bebida contaminada con quistes viables (resisten cloración convencional)', 'Alimentos crudos lavados con agua contaminada', 'Transmisión directa persona a persona en guarderías y hogares'],
    associatedDiseases: [
      {
        name: 'Giardiasis Intestinal Crónica / Síndrome de Malabsorción',
        description: 'Infección duodeno-yeyunal que causa esteatorrea, pérdida de peso, déficit de lactasa con intolerancia secundaria a la lactosa y retardo en el crecimiento infantil.',
        clinicalPresentation: ['Diarrea pastosa o líquida de olor fétido sin moco ni sangre', 'Meteorismo intenso y distensión abdominal', 'Eructos fétidos con olor a azufre o huevo podrido', 'Pérdida de peso progresiva']
      }
    ],
    signsAndSymptoms: ['Diarrea esteatorreica flotante', 'Distensión abdominal', 'Dolor epigástrico', 'Anorexia y flatulencia'],
    complications: ['Desnutrición calórico-proteica crónica en niños', 'Intolerancia persistente a la lactosa posgiardiasis', 'Déficit de vitaminas liposolubles (A, D, E, K)'],
    clinicalSpecimens: ['Heces seriadas (3 muestras en días alternos) para búsqueda de quistes', 'Heces líquidas frescas o aspirado duodenal para trofozoítos móviles'],
    diagnosticMethods: [
      { method: 'Examen coproparasitoscópico seriado de concentración (Faust o Ritchie)', standardRole: 'Tamizaje', keyFindings: 'Identificación de quistes ovalados de 8-12 µm con 2 a 4 núcleos y axonemas internos en "S"' },
      { method: 'Detección de antígeno de Giardia en heces por ELISA / Inmunocromatografía', standardRole: 'Gold Standard', keyFindings: 'Sensibilidad > 95% para descartar infección activa sin depender de la eliminación intermitente de quistes' }
    ],
    labFindings: ['Presencia de grasa no absorbida en heces (esteatorrea en Sudán III)', 'Ausencia de leucocitos fecales ni sangre oculta (diarrea no inflamatoria)'],
    treatment: {
      disclaimer: 'Tratamiento de elección con 5-nitroimidazoles o nitazoxanida. Se debe evaluar a los convivientes para tratamiento simultáneo si hay síntomas.',
      firstLine: [
        'Metronidazol: 250-500 mg VO c/8h por 5 a 7 días (en niños: 15 mg/kg/día dividido en 3 dosis)',
        'Tinidazol: 2 g VO dosis única en adultos (en niños > 3 años: 50 mg/kg dosis única, máx 2 g)'
      ],
      alternatives: [
        'Nitazoxanida: 500 mg VO c/12h por 3 días (en niños: 100-200 mg c/12h)',
        'Albendazol: 400 mg VO diario por 5 días'
      ],
      resistanceNotes: 'Frecuente intolerancia gastrointestinal transitoria a la lactosa tras la curación parasitológica que no debe confundirse con fracaso terapéutico.'
    },
    prevention: ['Hervir el agua de consumo durante al menos 1 minuto (los quistes son resistentes a la cloración estándar)', 'Filtración de agua con poros < 1 µm', 'Lavado estricto de manos con agua y jabón'],
    guatemalaRelevance: {
      endemicStatus: 'Hiperendémico',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Guatemala', 'Sololá', 'Quiché', 'Alta Verapaz', 'Totonicapán', 'Chimaltenango'],
      officialNotes: 'Causa primaria de parasitosis entérica en escolares y preescolares en todo el Altiplano y áreas rurales con agua de pozo o entubada sin filtración.',
      notificationGroup: 'Notificación Semanal'
    },
    parasiticStages: [
      {
        id: 'gd-stage-cyst-micro',
        stageType: 'quiste',
        name: 'Quiste ovalado maduro',
        biologicalRole: 'Estadio de resistencia ambiental e infectante fecal-oral',
        isInfectiveStage: true,
        isDiagnosticStage: true,
        morphologyDescription: 'Quiste netamente ovalado (8-12 µm) con pared lisa y refringente, 4 núcleos agrupados y restos de axonemas flagelares en "S" o "V".',
        keyDimensions: '8 - 12 µm de largo por 7 - 10 µm de ancho',
        differentialCharacteristics: ['Forma ovalada nítida', 'Axonemas internos visibles con Lugol', 'Halo claro por retracción fijativa'],
        primaryClinicalSpecimen: 'Heces formadas / pastosas',
        identificationMethod: 'Coproparasitoscópico de concentración con Lugol',
        visualRepresentationType: 'microfotografia_real'
      },
      {
        id: 'gd-stage-trophozoite-micro',
        stageType: 'trofozoito',
        name: 'Trofozoíto piriforme con disco suctorio',
        biologicalRole: 'Forma vegetativa móvil adherente a la mucosa duodenal',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Forma piriforme en gota con disco suctorio ventral, 2 núcleos vesiculares laterales (apariencia de ojos o payaso) y motilidad en caída de hoja.',
        keyDimensions: '10 - 15 µm',
        differentialCharacteristics: ['Aspecto de cara de payaso bilateralmente simétrico', 'Motilidad en caída de hoja en frotis fresco a 37 °C'],
        primaryClinicalSpecimen: 'Heces líquidas recién emitidas / Líquido duodenal',
        identificationMethod: 'Microscopía directa en solución salina al 0.9%',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Quiste de Giardia duodenalis con tinción de Lugol y trofozoíto piriforme flagelado.',
        stainOrModality: 'Microscopio óptico de campo claro (1000x)',
        creditOrSource: 'CDC DPDx Parasite Image Library'
      }
    ],
    bibliography: [
      { source: 'Botero D, Restrepo M.', title: 'Parasitosis Humanas (6ª Ed.) - Giardiasis', year: '2019', status: 'Revisado' },
      { source: 'CDC DPDx', title: 'Laboratory Identification of Parasites: Giardiasis', year: '2024', status: 'Revisado' }
    ],
    lastReviewedDate: '2026-03-25'
  },

  {
    id: 'ascaris-lumbricoides',
    scientificName: 'Ascaris lumbricoides',
    commonName: 'Lombriz intestinal grande',
    category: 'parasito',
    parasiteGroup: 'nematodo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Nematoda',
      classTaxon: 'Secernentea / Chromadorea',
      orderTaxon: 'Ascaridida',
      family: 'Ascarididae',
      genus: 'Ascaris',
      species: 'A. lumbricoides'
    },
    morphology: {
      shape: 'Nematodo cilíndrico de gran tamaño (20 a 35 cm); huevos fecundados ovoides con cubierta externa gruesa muy mamelonada de color pardo.',
      size: 'Adulto hembra: 20 - 35 cm; macho: 15 - 30 cm; Huevo fecundado: 45 - 75 µm',
      arrangement: 'Gusano cilíndrico dioico no segmentado con cutícula estriada',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Boca anterior con tres labios prominentes denticulados', 'Cutícula externa gruesa resistente a enzimas gástricas', 'Cubierta mamelonada albuminoide del huevo teñida de biliar']
    },
    microbiologyCharacteristics: {
      metabolism: 'Anaerobio facultativo en la luz del yeyuno; metaboliza glucógeno mediante glucólisis y fermentación',
      cultureMedia: ['No aplica (helminto macroscópico)'],
      optimalTemp: '37 °C en el huésped; maduración de huevos en suelo a 20-30 °C con humedad',
      growthTime: 'Período prepatente de 2 meses desde la ingestión del huevo larvado L2/L3',
      keyBiochemicalTests: ['Identificación de huevos en heces por técnica de Kato-Katz cuantitativa']
    },
    externalAndInternalStructures: [
      'Tubo digestivo completo con boca trilabiada, esófago cilíndrico e intestino recto',
      'Aparato genital femenino doble tubular (hasta 200,000 huevos por hembra por día)',
      'Espículas copuladoras en el extremo posterior curvo del macho'
    ],
    virulenceFactors: [
      { name: 'Carga de masa mecánica obstructiva', mechanism: 'Ovillos de decenas de vermes adultos pueden causar oclusión intestinal mecánica del íleon terminal, invadir el colédoco (obstrucción biliar/pancreática) o el apéndice cecal' },
      { name: 'Migración larvaria pulmonar (Ciclo de Löffler)', mechanism: 'Ruptura capilar alveolar al migrar de la circulación hacia los bronquios, provocando neumonitis eosinofílica con tos y sibilancias' },
      { name: 'Expoliación nutricional', mechanism: 'Compite activamente con el huésped por nutrientes, carbohidratos y vitamina A en niños desnutridos' }
    ],
    reservoir: ['Exclusivamente el ser humano'],
    transmissionRoute: ['Fecal-oral: ingestión de HUEVOS EMBRIONADOS que han madurado en tierra durante 2 a 3 semanas (geohelmintiasis)', 'Geofagia (pica) en niños', 'Hortalizas crudas contaminadas con aguas residuales'],
    associatedDiseases: [
      {
        name: 'Ascariasis Intestinal y Obstrucción Mecánica',
        description: 'Colonización de la luz del intestino delgado; en cargas masivas causa dolor cólico recurrente, distensión, suboclusión u oclusión intestinal en niños.',
        clinicalPresentation: ['Eliminación espontánea de gusanos por ano, boca o nariz', 'Dolor abdominal periumbilical cólico', 'Masa abdominal palpable pastosa ("madeja de fideos")']
      },
      {
        name: 'Síndrome de Löffler (Fase migratoria larvaria)',
        description: 'Tránsito de las larvas a través de los alvéolos pulmonares hacia las vías aéreas superiores.',
        clinicalPresentation: ['Tos seca irritativa', 'Disnea y sibilancias', 'Infiltrados pulmonares transitorios migratorios en radiografía', 'Eosinofilia marcada en sangre periférica (> 20-40%)']
      }
    ],
    signsAndSymptoms: ['Expulsión de vermes adultos', 'Dolor abdominal cólico', 'Retardo del crecimiento pondoestatural', 'Tos seca y sibilancias en fase larvaria'],
    complications: ['Obstrucción intestinal completa que requiere laparotomía quirúrgica', 'Migración aberrante al conducto colédoco con colangitis piógena o pancreatitis aguda', 'Perforación intestinal'],
    clinicalSpecimens: ['Heces formadas / pastosas para huevos', 'Expulsión macroscópica espontánea de vermes adultos', 'Esputo (raro, durante fase de Löffler)'],
    diagnosticMethods: [
      { method: 'Examen coproparasitoscópico directo y de concentración cuantitativa (Kato-Katz)', standardRole: 'Gold Standard', keyFindings: 'Identificación de huevos fecundados mamelonados pardos de 45-75 µm y huevos infecundos alargados' },
      { method: 'Inspección macroscópica del gusano adulto', standardRole: 'Confirmatorio', keyFindings: 'Gusano cilíndrico rosado de 20-35 cm con tres labios en el extremo cefálico anterior' }
    ],
    labFindings: ['Eosinofilia periférica muy alta durante la fase pulmonar de Löffler', 'Anemia microcítica hipocrómica por desnutrición secundaria'],
    treatment: {
      disclaimer: 'Tratamiento antihelmíntico altamente eficaz. En caso de suboclusión intestinal, se recomienda desparasitación supervisada o sonda nasogástrica.',
      firstLine: [
        'Albendazol: 400 mg VO dosis única (en niños > 1-2 años: 400 mg dosis única)',
        'Mebendazol: 500 mg VO dosis única o 100 mg c/12h por 3 días'
      ],
      alternatives: [
        'Pamoato de Pirantel: 11 mg/kg dosis única (máx 1 g) — produce parálisis espástica del verme',
        'Ivermectina: 200 mcg/kg VO dosis única'
      ],
      resistanceNotes: 'En caso de sospecha de obstrucción mecánica por ovillo de vermes, se debe monitorizar al paciente; los benzimidazoles producen parálisis flácida lenta.'
    },
    prevention: ['Lavado riguroso de manos tras manipular tierra', 'Desparasitación masiva escolar semestral con Albendazol según directriz del MSPAS', 'Lavado cuidadoso de vegetales crudos', 'Adecuada disposición de excretas y letrinización rural'],
    guatemalaRelevance: {
      endemicStatus: 'Hiperendémico',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Totonicapán', 'Alta Verapaz', 'Quiché', 'Huehuetenango', 'Chimaltenango', 'San Marcos'],
      officialNotes: 'Geohelmintiasis más prevalente en Guatemala. Sujeta a campañas nacionales periódicas de desparasitación infantil del MSPAS en coordinación con el MINEDUC.',
      notificationGroup: 'Notificación Semanal'
    },
    parasiticStages: [
      {
        id: 'al-stage-fertilized-egg-micro',
        stageType: 'huevo',
        name: 'Huevo fecundado mamelonado',
        biologicalRole: 'Estadio diagnóstico eliminado en heces que madura en suelo hasta ser infectante',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Huevo ovalado o esférico (45-75 µm) con cubierta externa gruesa muy mamelonada teñida de biliar pardo-dorado y masa celular indivisa central.',
        keyDimensions: '45 - 75 µm por 35 - 50 µm',
        differentialCharacteristics: ['Mamelones prominentes característicos', 'Masa germinal densa esférica', 'Pueden existir huevos decorticados lisos'],
        primaryClinicalSpecimen: 'Heces formadas / pastosas',
        identificationMethod: 'Coproparasitoscópico directo con Lugol y método Kato-Katz',
        visualRepresentationType: 'microfotografia_real'
      },
      {
        id: 'al-stage-unfertilized-egg-micro',
        stageType: 'huevo',
        name: 'Huevo infecundo alargado',
        biologicalRole: 'Huevo puesto por hembras no fertilizadas que no tiene capacidad de madurar en tierra',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Huevo alargado asimétrico (85-95 µm) con mamelones irregulares escasos y relleno interno granular amorfo sin embrión.',
        keyDimensions: '85 - 95 µm por 40 - 45 µm',
        differentialCharacteristics: ['Forma más alargada que el huevo fecundado', 'Contenido granular desorganizado'],
        primaryClinicalSpecimen: 'Heces formadas / pastosas',
        identificationMethod: 'Examen coproparasitoscópico de sedimentación',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Huevo fecundado mamelonado de Ascaris lumbricoides teñido con sales biliares.',
        stainOrModality: 'Microscopía de campo claro a 400x',
        creditOrSource: 'CDC DPDx Parasite Image Library'
      }
    ],
    bibliography: [
      { source: 'Botero D, Restrepo M.', title: 'Parasitosis Humanas (6ª Ed.) - Ascariasis', year: '2019', status: 'Revisado' },
      { source: 'MSPAS Guatemala', title: 'Guía de Desparasitación Masiva Escolar en Comunidades Endémicas', year: '2022', status: 'Verificado' }
    ],
    lastReviewedDate: '2026-03-22'
  },

  {
    id: 'enterobius-vermicularis',
    scientificName: 'Enterobius vermicularis',
    commonName: 'Oxiuro / Pidulle',
    category: 'parasito',
    parasiteGroup: 'nematodo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Nematoda',
      classTaxon: 'Secernentea / Chromadorea',
      orderTaxon: 'Rhabditida / Oxyurida',
      family: 'Oxyuridae',
      genus: 'Enterobius',
      species: 'E. vermicularis'
    },
    morphology: {
      shape: 'Nematodo pequeño blanquecino fusiforme; hembra con cola muy puntiaguda como aguja; huevos asimétricos plano-convexos transparentes en forma de "D".',
      size: 'Hembra adulta: 8 - 13 mm; macho: 2 - 5 mm; Huevo: 50 - 60 µm de largo por 20 - 30 µm de ancho',
      arrangement: 'Nematodo de luz cecal con aletas cuticulares cefálicas',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Aletas cuticulares alares en el extremo cefálico anterior', 'Bulbo esofágico posterior esférico prominente', 'Extremo caudal extremadamente aguzado en la hembra']
    },
    microbiologyCharacteristics: {
      metabolism: 'Microaerófilo en la luz del ciego y apéndice cecal; se alimenta de bacterias y contenido colónico',
      cultureMedia: ['No aplica (helminto macroscópico)'],
      optimalTemp: '37 °C en el tracto digestivo; los huevos maduran en 4 a 6 horas en la región perianal oxigenada',
      growthTime: 'Ciclo biológico completo de 2 a 6 semanas',
      keyBiochemicalTests: ['Identificación microscópica directa mediante impronta perianal con cinta engomada']
    },
    externalAndInternalStructures: [
      'Cutícula transparente lisa con estriaciones transversales finas',
      'Esófago con doble dilatación (cuerpo cilíndrico y bulbo esférico muy marcado)',
      'Útero de la hembra grávida repleto con más de 10,000 huevos embrionados'
    ],
    virulenceFactors: [
      { name: 'Migración perianal nocturna de la hembra', mechanism: 'La hembra atraviesa el esfínter anal estimulada por el descenso térmico nocturno para depositar huevos pegajosos en los pliegues perianales' },
      { name: 'Sustancia pruriginosa de adherencia ovular', mechanism: 'Provoca prurito anal intenso que induce rascado compulsivo, acumulando miles de huevos en lechos subungueales para re-infección continua (ciclo ano-mano-boca)' },
      { name: 'Migración aberrante a tracto genital femenino', mechanism: 'Puede migrar hacia vulva, vagina, útero y trompas de Falopio en niñas, simulando vulvovaginitis o causando salpingitis granulomatosa' }
    ],
    reservoir: ['Exclusivamente el ser humano (parasitosis de grupo familiar y hacinamiento)'],
    transmissionRoute: [
      'Fecal-oral directa: ciclo ano-mano-boca por rascado de la región perianal',
      'Inhalación e ingestión de polvo con huevos flotantes al sacudir ropa de cama',
      'Retroinfección: eclosión de larvas en los márgenes perianales que reingresan activamente por el ano hacia el colon'
    ],
    associatedDiseases: [
      {
        name: 'Oxiuriasis / Enterobiasis Infantil',
        description: 'Infección parasitaria más frecuente en áreas urbanas de climas templados y fríos; genera alteraciones del sueño, bruxismo y vulvovaginitis.',
        clinicalPresentation: ['Prurito perianal y perineal de predominio nocturno', 'Insomnio, terrores nocturnos y bruxismo (rechinar de dientes)', 'Excoriaciones perianales por rascado con sobreinfección bacteriana', 'Prurito vulvar y flujo vaginal en niñas pequeñas']
      }
    ],
    signsAndSymptoms: ['Prurito anal nocturno intenso', 'Irritabilidad e insomnio', 'Prurito nasal reflejo', 'Visualización de pequeños hilos blancos móviles en la región anal al despertar'],
    complications: ['Vulvovaginitis en niñas', 'Apendicitis verminosa por impactación del verme en la luz apendicular (infrecuente)', 'Salpingitis o granulomas pélvicos peritoneales'],
    clinicalSpecimens: ['Cinta adhesiva transparente aplicada en la región perianal al despertar (Técnica de Graham). NOTA: NO solicitar coprológico en heces (rendimiento < 5%)'],
    diagnosticMethods: [
      { method: 'Técnica de la Cinta Engomada Transparente de Graham', standardRole: 'Gold Standard', keyFindings: 'Identificación de huevos incoloros plano-convexos en forma de "D" con larva en su interior adheridos a la cinta de celofán (realizar 3 mañanas consecutivas)' },
      { method: 'Inspección macroscópica directa de la zona perianal de noche', standardRole: 'Tamizaje', keyFindings: 'Observación visual directa de la hembra blanca de 1 cm reptando en los pliegues anales' }
    ],
    labFindings: ['Rara vez se observa eosinofilia (no es un parásito invasor tisular, la eosinofilia suele ser normal)'],
    treatment: {
      disclaimer: 'REGLA DE TRATAMIENTO OBLIGATORIA: Se DEBE tratar simultáneamente a TODOS los miembros del núcleo familiar conviviente y REPETIR la dosis a los 14 días para erradicar las larvas nacidas de huevos re-ingeridos.',
      firstLine: [
        'Mebendazol: 100 mg VO dosis única, REPETIR obligatoriamente a los 14 días (para toda la familia)',
        'Albendazol: 400 mg VO dosis única (en niños > 2 años: 400 mg; de 1-2 años: 200 mg), REPETIR a los 14 días'
      ],
      alternatives: [
        'Pamoato de Pirantel: 11 mg/kg dosis única (máx 1 g), repetir a las 2 semanas'
      ],
      resistanceNotes: 'Ningún antihelmíntico destruye los huevos ya depositados en el entorno; la segunda dosis a los 14 días es indispensable para eliminar los vermes juveniles antes de que alcancen la madurez sexual.'
    },
    prevention: ['Tratamiento de todos los convivientes del hogar al mismo tiempo', 'Corte y cepillado riguroso de uñas en niños', 'Lavado con agua caliente de ropa interior, pijamas y sábanas sin sacudirlas para no dispersar huevos al aire', 'Baño matutino para eliminar huevos depositados de noche'],
    guatemalaRelevance: {
      endemicStatus: 'Endémico',
      priorityLevel: 'Media',
      departmentsWithHighPrevalence: ['Guatemala (asentamientos urbanos y guarderías)', 'Quetzaltenango', 'Sacatepéquez', 'Chimaltenango'],
      officialNotes: 'Muy común en escuelas primarias y guarderías del área metropolitana y centros urbanos de Guatemala. Alta tasa de recurrencia por falta de tratamiento a los contactos familiares.',
      notificationGroup: 'Vigilancia Centinela'
    },
    parasiticStages: [
      {
        id: 'ev-stage-egg-micro',
        stageType: 'huevo',
        name: 'Huevo plano-convexo en forma de "D"',
        biologicalRole: 'Estadio infectante casi inmediato que madura en horas al contacto con el oxígeno perianal',
        isInfectiveStage: true,
        isDiagnosticStage: true,
        morphologyDescription: 'Huevo asimétrico plano-convexo con perfil en letra "D" (50-60 µm), cáscara lisa transparente incolora delgada y larva casi completamente formada en su interior.',
        keyDimensions: '50 - 60 µm por 20 - 30 µm',
        differentialCharacteristics: ['Perfil asimétrico plano-convexo patognomónico', 'Cáscara incolora transparente', 'Recolección exclusiva mediante técnica de Graham'],
        primaryClinicalSpecimen: 'Cinta adhesiva perianal (Técnica de Graham)',
        identificationMethod: 'Cinta de Graham montada sobre portaobjetos a 100x y 400x',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Huevo transparente plano-convexo en "D" de Enterobius vermicularis en cinta de Graham.',
        stainOrModality: 'Microscopía directa de cinta adhesiva (400x)',
        creditOrSource: 'CDC DPDx Parasite Image Library'
      }
    ],
    bibliography: [
      { source: 'Botero D, Restrepo M.', title: 'Parasitosis Humanas (6ª Ed.) - Oxiuriasis', year: '2019', status: 'Revisado' },
      { source: 'CDC DPDx', title: 'Laboratory Identification of Parasites: Enterobiasis', year: '2024', status: 'Revisado' }
    ],
    lastReviewedDate: '2026-03-24'
  },

  {
    id: 'taenia-saginata',
    scientificName: 'Taenia saginata',
    commonName: 'Tenia inerme del ganado vacuno / Solitaria',
    category: 'parasito',
    parasiteGroup: 'cestodo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Platyhelminthes',
      classTaxon: 'Cestoda',
      orderTaxon: 'Cyclophyllidea',
      family: 'Taeniidae',
      genus: 'Taenia',
      species: 'T. saginata'
    },
    morphology: {
      shape: 'Gusano plano cestoideo de gran longitud (4 a 12 metros); escólex cuadrangular inerme sin ganchos con 4 ventosas; proglótides grávidas con más de 15 ramas uterinas dicotómicas por lado.',
      size: 'Adulto: 4 a 10 metros; Proglótide grávida: 16 - 20 mm; Huevo: 31 - 43 µm',
      arrangement: 'Segmentación seriada estrobilar de 1,000 a 2,000 proglótides',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Escólex inerme (sin rostelo ni corona de ganchos)', 'Cuatro ventosas prominentes', 'Proglótides con potente musculatura propia capaces de reptar activamente']
    },
    microbiologyCharacteristics: {
      metabolism: 'Anaerobio facultativo en yeyuno; absorbe glucosa y carbohidratos a través de microtricos tegumentarios',
      cultureMedia: ['No aplica (helminto macroscópico)'],
      optimalTemp: '37 °C',
      growthTime: 'El parásito adulto puede vivir más de 10 a 25 años en el intestino humano',
      keyBiochemicalTests: ['Diferenciación de proglótides grávidas mediante inyección uterina de tinta china']
    },
    externalAndInternalStructures: [
      'Escólex piriforme de 1.5 a 2 mm provisto de 4 ventosas en copa sin rostelo',
      'Estróbilo con proglótides grávidas muy alargadas con poro genital alternado',
      'Útero central que emite entre 15 y 30 ramas primarias dicotómicas finas'
    ],
    virulenceFactors: [
      { name: 'Adhesión por ventosas musculares', mechanism: 'Se fija a la mucosa yeyunal mediante 4 ventosas potentes sin generar úlcera profunda' },
      { name: 'Expoliación de nutrientes', mechanism: 'Absorbe nutrientes intraluminales a lo largo de varios metros de estróbilo microtrico' }
    ],
    reservoir: ['Seres humanos (único hospedero definitivo del adulto)', 'Ganado vacuno (hospedero intermediario que alberga Cysticercus bovis en carne)'],
    transmissionRoute: [
      'Ingestión de carne de res cruda o insuficientemente cocida ("término medio", carpaccio) que contenga cisticercos viables (Cysticercus bovis)',
      'NOTA CRÍTICA: La ingestión de huevos de T. saginata NO produce cisticercosis en el ser humano (el humano no es hospedero intermediario de T. saginata)'
    ],
    associatedDiseases: [
      {
        name: 'Teniasis Intestinal por T. saginata',
        description: 'Colonización benigna del intestino delgado caracterizada principalmente por la expulsión activa y alarmante de proglótides a través del ano.',
        clinicalPresentation: ['Sensación de cuerpo extraño o reptación en el esfínter anal', 'Hallazgo de proglótides móviles individuales en ropa interior o cama', 'Molestias digestivas vagas, sensación de hambre dolorosa o náuseas leves']
      }
    ],
    signsAndSymptoms: ['Salida activa espontánea de proglótides móviles por el ano', 'Sensación de hormigueo anal', 'Leve dolor epigástrico inespecífico'],
    complications: ['Obstrucción apendicular por migración de proglótides (muy rara)', 'Impacto psicológico y ansiedad intensa ante la expulsión del parásito'],
    clinicalSpecimens: ['Proglótides grávidas expulsadas espontáneamente en ropa o heces', 'Heces para búsqueda de huevos de Taenia sp.'],
    diagnosticMethods: [
      { method: 'Aclaramiento y compresión de proglótide grávida con tinta china', standardRole: 'Gold Standard', keyFindings: 'Identificación de 15 a 30 ramas uterinas principales a cada lado del tronco central con profusa ramificación dicotómica fina' },
      { method: 'Observación del escólex tras tratamiento', standardRole: 'Confirmatorio', keyFindings: 'Escólex inerme provisto de 4 ventosas sin rostelo ni ganchos' }
    ],
    labFindings: ['Huevos idénticos e indistinguibles de T. solium en examen coprológico directo (reportar como Taenia sp.)', 'Eosinofilia periférica leve a moderada'],
    treatment: {
      disclaimer: 'Tratamiento farmacológico de dosis única muy eficaz. La niclosamida o praziquantel son de elección.',
      firstLine: [
        'Praziquantel: 5 a 10 mg/kg VO dosis única en ayunas',
        'Niclosamida: 2 g masticados en ayunas en una sola toma (en niños: 50 mg/kg dosis única)'
      ],
      alternatives: [
        'Albendazol: 400 mg VO diario por 3 días consecutivos'
      ],
      resistanceNotes: 'T. saginata NO causa cisticercosis humana, por lo que no existe riesgo de neurocisticercosis por la destrucción del estróbilo.'
    },
    prevention: ['Cocción completa de la carne de res (> 60-65 °C interna)', 'Inspección veterinaria en rastros para decomiso de carnes con cisticercosis bovina', 'Tratamiento de humanos portadores para evitar contaminación de pastizales'],
    guatemalaRelevance: {
      endemicStatus: 'Endémico',
      priorityLevel: 'Media',
      departmentsWithHighPrevalence: ['Escuintla', 'Santa Rosa', 'Jutiapa', 'Petén', 'Guatemala'],
      officialNotes: 'Presente en regiones ganaderas del sur y oriente del país. Menos peligrosa que T. solium al no causar neurocisticercosis.',
      notificationGroup: 'Notificación Semanal'
    },
    parasiticStages: [
      {
        id: 'tsag-stage-proglottid-micro',
        stageType: 'proglotide',
        name: 'Proglótide grávida madura de T. saginata',
        biologicalRole: 'Segmento estrobilar dotado de motilidad activa que repta por el ano para liberar huevos en pastizales',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Segmento alargado (16-20 mm x 5-7 mm) con tronco uterino medial y de 15 a 30 ramas primarias dicotómicas finas por lado.',
        keyDimensions: '16 - 20 mm por 5 - 7 mm',
        differentialCharacteristics: ['Más de 15 ramas uterinas principales por lado (T. solium tiene menos de 12)', 'Motilidad activa con reptación espontánea fuera del ano'],
        primaryClinicalSpecimen: 'Proglótide móvil expulsada por el ano / Ropa interior',
        identificationMethod: 'Inyección uterina de tinta china y conteo de ramas a 10x',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Proglótide grávida de Taenia saginata inyectada con tinta china evidenciando más de 20 ramas uterinas principales dicotómicas.',
        stainOrModality: 'Inyección con tinta china a 10x',
        creditOrSource: 'CDC DPDx Parasite Image Library'
      }
    ],
    bibliography: [
      { source: 'Botero D, Restrepo M.', title: 'Parasitosis Humanas (6ª Ed.) - Teniasis', year: '2019', status: 'Revisado' },
      { source: 'CDC DPDx', title: 'Laboratory Identification of Parasites: Taeniasis', year: '2024', status: 'Revisado' }
    ],
    lastReviewedDate: '2026-03-25'
  },

  {
    id: 'strongyloides-stercoralis',
    scientificName: 'Strongyloides stercoralis',
    commonName: 'Estrongiloide / Hilo del suelo',
    category: 'parasito',
    parasiteGroup: 'nematodo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Nematoda',
      classTaxon: 'Secernentea / Chromadorea',
      orderTaxon: 'Rhabditida',
      family: 'Strongyloididae',
      genus: 'Strongyloides',
      species: 'S. stercoralis'
    },
    morphology: {
      shape: 'Nematodo minúsculo filiforme; larva rabditiforme L1 con vestíbulo bucal corto; larva filariforme L3 con cola bifurcada / escotada patognomónica.',
      size: 'Larva rabditiforme L1: 200 - 250 µm; Larva filariforme L3: 500 - 600 µm; Hembra parasitaria: 2 - 2.5 mm',
      arrangement: 'Nematodo cilíndrico microscópico con capacidad de ciclo de vida libre en suelo y ciclo parasitario',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Vestíbulo bucal corto en L1', 'Esófago filariforme largo que abarca el 40-50% del cuerpo en L3', 'Extremo caudal bífido / escotado en L3']
    },
    microbiologyCharacteristics: {
      metabolism: 'Hembra partenogenética parásita que vive enterrada en las criptas glandulares de la mucosa duodenal y yeyunal',
      cultureMedia: ['Cultivo en placa de agar nutritivo (aparición de huellas bacterianas sinuosas trazadas por la larva al reptar)'],
      optimalTemp: '37 °C en humano; ciclo libre en suelos cálidos tropicales a 25-30 °C',
      growthTime: 'Capacidad de multiplicarse indefinidamente en el mismo hospedero durante décadas mediante autoinfección interna',
      keyBiochemicalTests: ['Método de concentración de Baermann por termotropismo e hidrotropismo positivo']
    },
    externalAndInternalStructures: [
      'Cutícula lisa y transparente sumamente delgada',
      'Esófago cilíndrico largo en L3 sin bulbo distal',
      'Primordio genital grande y manifiesto en la mitad ventral de la larva L1'
    ],
    virulenceFactors: [
      { name: 'Ciclo de autoinfección interna y externa', mechanism: 'Las larvas L1 pueden madurar a L3 infectantes dentro de la propia luz intestinal o en la piel perianal, penetrando de nuevo la pared y perpetuando la infección por 30 a 50 años' },
      { name: 'Síndrome de Hiperinfección y diseminación masiva', mechanism: 'En pacientes con inmunosupresión (corticoterapia sistémica, infección por HTLV-1, neoplasias), la autoinfección se descontrola; millones de larvas invaden pulmón, SNC y transportan enterobacterias a sangre' },
      { name: 'Penetración cutánea activa mediante metaloproteasas', mechanism: 'Secreta enzimas histolíticas que degradan queratina y colágeno para penetrar piel intacta de pies descalzos' }
    ],
    reservoir: ['Seres humanos infectados', 'Primates y cánidos en zonas tropicales'],
    transmissionRoute: [
      'Penetración percutánea activa de larvas filariformes L3 del suelo a través de la piel descalza',
      'Autoinfección interna (las larvas L1 se transforman en L3 en el colon y penetran la mucosa)',
      'Autoinfección externa (larvas en márgenes perianales penetran la piel de nalgas o muslos: larva currens)'
    ],
    associatedDiseases: [
      {
        name: 'Estrongiloidiasis Crónica No Complicada',
        description: 'Infección persistente silente o con dolor epigástrico similar a úlcera péptica, diarrea acuosa intermitente y erupción serpiginosa pruriginosa perianal rápida (larva currens).',
        clinicalPresentation: ['Larva currens: cordón serpiginoso eritematoso muy pruriginoso que avanza varios centímetros por hora', 'Dolor abdominal epigástrico sordo', 'Diarrea acuosa postprandial y pirosis', 'Eosinofilia fluctuante pero persistente']
      },
      {
        name: 'Síndrome de Hiperinfección y Estrongiloidiasis Diseminada',
        description: 'Catástrofe clínica desencadenada típicamente tras el uso de CORTICOESTEROIDES (dexametasona, prednisona), con diseminación masiva de larvas y bacteriemia recurrente por bacilos Gram negativos.',
        clinicalPresentation: ['Fiebre héctica y choque séptico refractario', 'Insuficiencia respiratoria aguda con hemoptisis e infiltrados difusos', 'Meningitis recurrente por enterobacterias (E. coli, Klebsiella)', 'Íleo paralítico severo']
      }
    ],
    signsAndSymptoms: ['Larva currens en glúteos y muslos', 'Dolor epigástrico', 'Diarrea acuosa crónica', 'Tos y disnea en hiperinfección'],
    complications: ['Sepsis y choque séptico recurrente por enterobacterias transportadas por larvas', 'Meningitis bacteriana por translocación', 'Distrés respiratorio agudo por hemorragia intraalveolar masiva'],
    clinicalSpecimens: ['Heces frescas para larvas L1', 'Esputo o lavado broncoalveolar en hiperinfección para larvas L3', 'Líquido duodenal'],
    diagnosticMethods: [
      { method: 'Método de Baermann o Cultivo en Placa de Agar', standardRole: 'Gold Standard', keyFindings: 'Concentración térmica: visualización de larvas rabditiformes L1 vivas de 200 µm con vestíbulo bucal corto y surcos bacterianos en agar' },
      { method: 'Examen coproparasitoscópico seriado (5 a 7 muestras)', standardRole: 'Tamizaje', keyFindings: 'Identificación de larvas L1 (sensibilidad < 30% en una sola muestra coprológica por eliminación irregular)' },
      { method: 'Serología IgG por ELISA', standardRole: 'Confirmatorio', keyFindings: 'Excelente para despistaje en pacientes antes de iniciar corticoterapia o inmunosupresores' }
    ],
    labFindings: ['Eosinofilia marcada (15-40%) en forma crónica; puede DESAPARECER (eosinopenia) en hiperinfección severa (signo de mal pronóstico)', 'Hallazgo de larvas filariformes en esputo en pacientes en UCI'],
    treatment: {
      disclaimer: 'La Ivermectina es el tratamiento de primera línea indiscutible con tasas de curación superiores al 90-95%. Los benzimidazoles son inferiores.',
      firstLine: [
        'Estrongiloidiasis no complicada: Ivermectina 200 mcg/kg VO diario durante 2 días consecutivos (repetir a las 2 semanas)',
        'Hiperinfección / Estrongiloidiasis diseminada: Ivermectina 200 mcg/kg VO diario hasta que las muestras respiratorias y fecales sean negativas por al menos 2 semanas + Antibióticos de amplio espectro para cubrir bacteriemia entérica'
      ],
      alternatives: [
        'Albendazol: 400 mg VO c/12h durante 7 días (menos eficaz que la ivermectina, reservado si hay contraindicación absoluta)'
      ],
      resistanceNotes: 'REGLA CLÍNICA OBLIGATORIA: En todo paciente de zona endémica que vaya a recibir tratamiento inmunosupresor o corticoterapia prolongada se debe descartar y tratar profilácticamente Strongyloides para evitar el síndrome de hiperinfección mortal.'
    },
    prevention: ['Uso de calzado cerrado para evitar contacto directo de piel con suelo húmedo', 'Descarte serológico o parasitológico obligatorio antes de iniciar corticoterapia en pacientes de áreas endémicas', 'Saneamiento ambiental'],
    guatemalaRelevance: {
      endemicStatus: 'Endémico',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Escuintla', 'Suchitepéquez', 'Santa Rosa', 'Izabal', 'Retalhuleu', 'Petén'],
      officialNotes: 'Endémica en la Costa Sur y zonas cálidas húmedas. Gran relevancia médica en hospitales de tercer nivel (Roosevelt y San Juan de Dios) donde desencadena hiperinfección en pacientes lúpicos o hematológicos tratados con esteroides.',
      notificationGroup: 'Vigilancia Centinela'
    },
    parasiticStages: [
      {
        id: 'ss-stage-rhabditiform-micro',
        stageType: 'larva',
        name: 'Larva rabditiforme L1 de heces frescas',
        biologicalRole: 'Estadio diagnóstico emitido en heces con vestíbulo bucal corto',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Larva móvil (200-250 µm) con vestíbulo bucal muy corto (menor que el ancho cefálico), esófago rabditoide y primordio genital prominente en tercio medio.',
        keyDimensions: '200 - 250 µm por 16 µm',
        differentialCharacteristics: ['Vestíbulo bucal corto patognomónico frente a uncinarias', 'Eliminada como larva viva en heces recién emitidas (no como huevo)'],
        primaryClinicalSpecimen: 'Heces formadas / pastosas',
        identificationMethod: 'Técnica de Baermann y examen directo en solución salina',
        visualRepresentationType: 'microfotografia_real'
      },
      {
        id: 'ss-stage-filariform-micro',
        stageType: 'larva',
        name: 'Larva filariforme L3 infectante',
        biologicalRole: 'Estadio infectante que penetra piel y media autoinfección',
        isInfectiveStage: true,
        isDiagnosticStage: true,
        morphologyDescription: 'Larva esbelta (500-600 µm) con esófago filariforme que ocupa casi el 50% del cuerpo y extremo caudal posterior con muesca o escotadura bifurcada.',
        keyDimensions: '500 - 600 µm',
        differentialCharacteristics: ['Cola bifurcada con muesca terminal patognomónica (la larva de uncinarias termina en punta lisa sin muesca)', 'Esófago largo'],
        primaryClinicalSpecimen: 'Esputo / Lavado broncoalveolar',
        identificationMethod: 'Microscopía directa en solución salina a 400x',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Larva rabditiforme L1 de Strongyloides stercoralis en heces y extremo caudal bífido de larva L3.',
        stainOrModality: 'Microscopía óptica de campo claro (400x y 1000x)',
        creditOrSource: 'CDC DPDx Parasite Image Library'
      }
    ],
    bibliography: [
      { source: 'Botero D, Restrepo M.', title: 'Parasitosis Humanas (6ª Ed.) - Estrongiloidiasis', year: '2019', status: 'Revisado' },
      { source: 'World Health Organization (WHO)', title: 'Strongyloidiasis: Report of a WHO Strategic and Technical Advisory Group', year: '2023', status: 'Revisado' }
    ],
    lastReviewedDate: '2026-03-24'
  },

  {
    id: 'salmonella-enterica-typhi',
    scientificName: 'Salmonella enterica subsp. enterica serovar Typhi',
    commonName: 'Bacilo de Eberth / Fiebre Tifoidea',
    category: 'bacteria',
    reviewStatus: 'Fuentes verificadas',
    taxonomy: {
      domain: 'Bacteria',
      phylum: 'Pseudomonadota (Proteobacteria)',
      classTaxon: 'Gammaproteobacteria',
      orderTaxon: 'Enterobacterales',
      family: 'Enterobacteriaceae',
      genus: 'Salmonella',
      species: 'S. enterica subsp. enterica serovar Typhi'
    },
    morphology: {
      shape: 'Bacilo Gram negativo recto de extremos redondeados, móvil por flagelos peritricos.',
      size: '2 - 3 µm de longitud por 0.5 - 0.7 µm de ancho',
      arrangement: 'Aislado o en pares dispersos',
      gramStain: 'Gram negativa',
      specialStructures: ['Antígeno capsular Vi (polisacárido de virulencia)', 'Antígeno somático O (LPS endotóxico)', 'Antígeno flagelar H', 'Flagelos peritricos']
    },
    microbiologyCharacteristics: {
      metabolism: 'Anaerobio facultativo, oxidasa negativa, catalasa positiva, no fermentador de lactosa, productor discreto de H2S (sulfuro de hidrógeno)',
      cultureMedia: ['Agar MacConkey (colonias incoloras no fermentadoras de lactosa)', 'Agar Salmonella-Shigella (SS) (colonias transparentes con centro negro tenue)', 'Agar XLD', 'Caldo selenito de enriquecimiento'],
      optimalTemp: '37 °C (rango 15-42 °C)',
      growthTime: '24-48 horas',
      keyBiochemicalTests: ['Oxidasa: Negativa', 'Glucosa: Fermentador sin producción apreciable de gas', 'Lactosa: Negativa', 'Indol: Negativo', 'Ureasa: Negativa', 'Citrato de Simmons: Negativo']
    },
    externalAndInternalStructures: [
      'Antígeno capsular Vi que previene la fagocitosis mediada por complemento',
      'Lipopolisacárido (LPS): lípido A responsable de la fiebre alta en meseta y endotoxemia',
      'Islas de patogenicidad SPI-1 y SPI-2 que codifican sistemas de secreción tipo III (T3SS)'
    ],
    virulenceFactors: [
      { name: 'Antígeno Vi (polisacárido capsular)', mechanism: 'Inhibe la fijación de C3b y la opsonofagocitosis por neutrófilos y macrófagos tisulares' },
      { name: 'Supervivencia intramacrofágica sistémica', mechanism: 'SPI-2 T3SS impide la fusión fagolisosómica permitiendo la diseminación por el sistema reticuloendotelial' },
      { name: 'Endotoxina LPS', mechanism: 'Induce fiebre sostenida en meseta, vasodilatación esplácnica, leucopenia y shock séptico' }
    ],
    reservoir: ['Exclusivamente seres humanos (enfermos clínicos y portadores crónicos biliares)'],
    transmissionRoute: ['Vía fecal-oral indirecta por agua y alimentos contaminados con excretas humanas', 'Fómites y manos sucias de manipuladores de alimentos'],
    associatedDiseases: [
      {
        name: 'Fiebre Tifoidea (Fiebre Entérica)',
        description: 'Enfermedad febril sistémica prolongada con bacteriemia inicial, proliferación reticuloendotelial y afectación de placas de Peyer ileales.',
        clinicalPresentation: ['Fiebre escalonada que se torna continua en meseta (39-40 °C)', 'Cefalea frontal intensa y letargo apático (tifos)', 'Bradicardia relativa (signo de Faget)', 'Dolor abdominal periumbilical difuso y esplenomegalia', 'Roséola tifoidea macular eritematosa en tórax y abdomen en la 2ª semana']
      }
    ],
    signsAndSymptoms: ['Fiebre continua en meseta', 'Cefalea intensa', 'Constipación inicial que evoluciona a diarrea en "sopa de guisantes"', 'Dolor abdominal y hepatoesplenomegalia'],
    complications: ['Perforación intestinal ileal (3ª semana) con peritonitis aguda letal', 'Hemorragia digestiva baja masiva', 'Colecistitis aguda y estado de portador biliar crónico', 'Encefalopatía tifoidea'],
    clinicalSpecimens: ['Hemocultivo (positivo en 70-90% durante la 1ª semana)', 'Mielocultivo (aspirado de médula ósea, Gold Standard con > 90% sensibilidad)', 'Coprocultivo (positivo a partir de la 2ª y 3ª semana)', 'Urocultivo'],
    diagnosticMethods: [
      { method: 'Hemocultivo seriado (1ª semana)', standardRole: 'Confirmatorio', keyFindings: 'Aislamiento de bacilo Gram negativo oxidasa negativo, no fermentador de lactosa en agar selectivo' },
      { method: 'Mielocultivo (aspirado de médula ósea)', standardRole: 'Gold Standard', keyFindings: 'Método diagnóstico más sensible, permanece positivo aún con antibioticoterapia previa' },
      { method: 'Reacción de Widal (aglutinación en tubo)', standardRole: 'Tamizaje', keyFindings: 'Prueba serológica tradicional con baja especificidad y alto índice de falsos positivos en áreas endémicas; requiere títulos O y H ≥ 1:160 o cuadruplicación pareada' }
    ],
    labFindings: ['Leucopenia con neutropenia o recuento leucocitario normal a pesar de fiebre muy alta', 'Agranulocitosis relativa y desviación a la izquierda', 'Trombocitopenia moderada', 'Transaminasas hepáticas discretamente elevadas'],
    treatment: {
      disclaimer: 'El tratamiento antimicrobiano debe ajustarse según los patrones locales de susceptibilidad informados por el Laboratorio Nacional de Salud (LNS) de Guatemala, debido a cepas MDR.',
      firstLine: [
        'Ceftriaxona intravenosa 2 g/día (niños: 50-75 mg/kg/día) por 10-14 días en enfermedad moderada a severa',
        'Azitromicina oral 1 g el día 1, luego 500 mg/día por 7 días (niños: 20 mg/kg/día) como opción de primera línea ambulatoria en casos no complicados'
      ],
      alternatives: [
        'Ciprofloxacina oral 500 mg c/12h por 7-10 días (únicamente si el antibiograma descarta resistencia a fluoroquinolonas)',
        'Meropenem en cepas con sospecha de BLEE o resistencia extrema'
      ],
      resistanceNotes: 'Cepas con resistencia a ampicilina, cloranfenicol y cotrimoxazol (MDR) y resistencia emergente a fluoroquinolonas notificadas en la región.'
    },
    prevention: ['Acceso a agua potable y saneamiento básico', 'Control higiénico riguroso de manipuladores de alimentos', 'Vacunación tifoidea (vacuna de polisacárido Vi o vacuna conjugada TCV) en zonas de alto riesgo'],
    guatemalaRelevance: {
      endemicStatus: 'Endémico',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Guatemala (áreas periurbanas)', 'San Marcos', 'Quiché', 'Huehuetenango', 'Alta Verapaz'],
      officialNotes: 'Enfermedad de vigilancia epidemiológica semanal obligatoria. Los brotes están estrechamente ligados a contaminación fecal de fuentes de agua de consumo y alimentos callejeros.',
      notificationGroup: 'Notificación Semanal'
    },
    imagery: [
      {
        type: 'ilustracion_cientifica',
        caption: 'Morfología bacilar Gram negativa de Salmonella enterica con flagelos peritricos y antígeno capsular Vi.',
        stainOrModality: 'Microscopía óptica con tinción de Gram (1000x)',
        creditOrSource: 'CDC Public Health Image Library (PHIL)'
      }
    ],
    bibliography: [
      { source: 'MSPAS Guatemala - Departamento de Epidemiología', title: 'Protocolo de Vigilancia Epidemiológica de Enfermedades Transmitidas por Agua y Alimentos (ETA)', year: '2022', status: 'Verificado' },
      { source: 'World Health Organization (WHO)', title: 'Typhoid vaccines: WHO position paper', year: '2019', status: 'Verificado' }
    ],
    lastReviewedDate: '2026-03-22'
  },

  {
    id: 'trichuris-trichiura',
    scientificName: 'Trichuris trichiura',
    commonName: 'Tricocéfalo / Gusano látigo',
    category: 'parasito',
    parasiteGroup: 'nematodo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Nematoda',
      classTaxon: 'Enoplea / Adenophorea',
      orderTaxon: 'Trichocephalida',
      family: 'Trichuridae',
      genus: 'Trichuris',
      species: 'T. trichiura'
    },
    morphology: {
      shape: 'Nematodo con morfología en látigo (3/5 anteriores filiformes y 2/5 posteriores engrosados); huevos en forma de barril con dos tapones mucosos bipolares hialinos.',
      size: 'Adulto: 3 a 5 cm; Huevo: 50 - 55 µm de largo por 22 - 25 µm de ancho',
      arrangement: 'Verme en látigo enterrado en la mucosa cecal mediante su extremo filiforme',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Esticosoma anterior (hileras de células glandulares o esticocitos)', 'Tapones polares mucosos hialinos en ambos extremos del huevo', 'Espícula copuladora con vaina espinosa en el macho']
    },
    microbiologyCharacteristics: {
      metabolism: 'Anaerobio facultativo en la mucosa del ciego y colon ascendente; hematófago e histiófago',
      cultureMedia: ['No aplica (helminto macroscópico)'],
      optimalTemp: '37 °C; huevos embrionan en tierra húmeda y cálida a 25-30 °C',
      growthTime: 'Período prepatente de 60 a 90 días',
      keyBiochemicalTests: ['Examen coproparasitoscópico de concentración con Lugol']
    },
    externalAndInternalStructures: [
      'Extremo anterior capilar muy delgado que se enhebra en la mucosa colónica',
      'Extremo posterior engrosado que cuelga libremente en la luz del ciego',
      'Huevo simétrico amarillento con doble cubierta lisa teñida de biliar'
    ],
    virulenceFactors: [
      { name: 'Enclavamiento mucoso y microtraumatismo capilar crónico', mechanism: 'El tercio anterior filiforme se inserta profundamente en el epitelio del ciego provocando microulceraciones, pérdida hemática continua (0.005 mL/gusano/día) y colitis' },
      { name: 'Estimulación del plexo nervioso entérico y tenesmo', mechanism: 'La inflamación rectal intensa en hiperinfecciones causa tenesmo continuo y esfuerzo defecatorio con prolapso rectal en niños malnutridos' }
    ],
    reservoir: ['Seres humanos'],
    transmissionRoute: ['Fecal-oral: ingestión de huevos embrionados con larva L1 procedente de tierra contaminada (geohelmintiasis)', 'Geofagia y hortalizas crudas mal lavadas'],
    associatedDiseases: [
      {
        name: 'Tricuriasis / Tricocefalosis Infantil Severa',
        description: 'Infección colónica crónica; en cargas helmínticas masivas produce disentería crónica, tenesmo severo, prolapso rectal infantil y retraso marcado del crecimiento.',
        clinicalPresentation: ['Diarrea crónica muco-sanguinolenta y dolor cólico', 'Tenesmo y pujo rectal intenso', 'Prolapso de la mucosa rectal al defecar con parásitos visibles', 'Anemia ferropénica severa microcítica e hipocrómica', 'Dedos en palillo de tambor (acropaquia) en tricuriasis de larga evolución']
      }
    ],
    signsAndSymptoms: ['Dolor en fosa ilíaca derecha y marco colónico', 'Diarrea disentérica crónica', 'Prolapso rectal en niños', 'Palidez mucocutánea por anemia'],
    complications: ['Prolapso rectal recurrente irreductible', 'Anemia grave refractaria', 'Desnutrición calórico-proteica grave', 'Apendicitis verminosa'],
    clinicalSpecimens: ['Heces formadas o disentéricas'],
    diagnosticMethods: [
      { method: 'Examen coproparasitoscópico por concentración o técnica cuantitativa de Kato-Katz', standardRole: 'Gold Standard', keyFindings: 'Identificación de huevos pardos en barril con dos tapones polares mucosos hialinos característicos' },
      { method: 'Rectosigmoidoscopia o colonoscopia', standardRole: 'Confirmatorio', keyFindings: 'Visualización directa de vermes en látigo enhebrados en la mucosa rectal edematosa hiperémica' }
    ],
    labFindings: ['Anemia microcítica hipocrómica por deficiencia de hierro', 'Eosinofilia moderada (5-15%)', 'Hipoalbuminemia en niños desnutridos'],
    treatment: {
      disclaimer: 'Requiere esquemas antihelmínticos de varios días debido a la localización mucosa profunda del nematodo.',
      firstLine: [
        'Mebendazol: 100 mg VO c/12h por 3 días consecutivos (o 500 mg dosis única)',
        'Albendazol: 400 mg VO diario durante 3 días consecutivos (en tricuriasis severa la dosis única tiene menor eficacia curativa)'
      ],
      alternatives: [
        'Oxantel + Pamoato de Pirantel: muy eficaz frente a Trichuris',
        'Ivermectina: 200 mcg/kg VO diario por 3 días combinada con albendazol'
      ],
      resistanceNotes: 'La dosis única de albendazol tiene una tasa de curación de solo 30-50% para Trichuris; por ello se recomiendan 3 días consecutivos de tratamiento.'
    },
    prevention: ['Disposición sanitaria de excretas y letrinización', 'Lavado estricto de manos antes de comer y tras contacto con tierra', 'Lavado y desinfección de verduras y frutas de tallo corto'],
    guatemalaRelevance: {
      endemicStatus: 'Hiperendémico',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Alta Verapaz', 'Quiché', 'Huehuetenango', 'Chimaltenango', 'Suchitepéquez', 'Izabal'],
      officialNotes: 'Geohelminto de alta frecuencia en el área rural indígena de Guatemala. El prolapso rectal por tricuriasis es una complicación pediátrica clásica observada en hospitales departamentales.',
      notificationGroup: 'Notificación Semanal'
    },
    parasiticStages: [
      {
        id: 'tt-stage-egg-micro',
        stageType: 'huevo',
        name: 'Huevo en barril con dos tapones polares mucosos',
        biologicalRole: 'Estadio diagnóstico eliminado en heces que madura en tierra',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Huevo simétrico elipsoidal en forma de barril con dos tapones mucosos bipolares hialinos y cáscara doble lisa castaño-dorada.',
        keyDimensions: '50 - 55 µm por 22 - 25 µm',
        differentialCharacteristics: ['Forma patognomónica en barril o limón con tapones polares nítidos refringentes'],
        primaryClinicalSpecimen: 'Heces formadas / pastosas',
        identificationMethod: 'Coproparasitoscópico con Lugol y Kato-Katz',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Huevo simétrico en forma de barril con dos tapones polares de Trichuris trichiura.',
        stainOrModality: 'Microscopía óptica de campo claro (400x)',
        creditOrSource: 'CDC DPDx Parasite Image Library'
      }
    ],
    bibliography: [
      { source: 'Botero D, Restrepo M.', title: 'Parasitosis Humanas (6ª Ed.) - Tricocefalosis', year: '2019', status: 'Revisado' },
      { source: 'MSPAS Guatemala', title: 'Guía de Desparasitación Masiva Escolar en Comunidades Endémicas', year: '2022', status: 'Verificado' }
    ],
    lastReviewedDate: '2026-03-24'
  },

  {
    id: 'trypanosoma-cruzi',
    scientificName: 'Trypanosoma cruzi',
    commonName: 'Mal de Chagas / Tripanosomiasis americana',
    category: 'parasito',
    parasiteGroup: 'protozoo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Euglenozoa',
      classTaxon: 'Kinetoplastea',
      orderTaxon: 'Trypanosomatida',
      family: 'Trypanosomatidae',
      genus: 'Trypanosoma',
      species: 'T. cruzi'
    },
    morphology: {
      shape: 'Kinetoplastea hemoflagelado tisular; tripomastigote sanguíneo móvil en forma de "C" con membrana ondulante y cinetoplasto posterior muy grande; amastigote intracelular esférico.',
      size: 'Tripomastigote: 20 µm (16-22 µm); Amastigote: 2 - 4 µm de diámetro',
      arrangement: 'Tripomastigotes libres en sangre; amastigotes en nidos intracitoplasmáticos densos',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Cinetoplasto voluminoso subterminal', 'Membrana ondulante ancha con flagelo anterior', 'Glucoproteínas mucinas de superficie (cruzipaína)']
    },
    microbiologyCharacteristics: {
      metabolism: 'Utiliza glucosa y prolina; fosforilación oxidativa activa',
      cultureMedia: ['Medio NNN (Novy-MacNeal-Nicolle) o medio LIT (aparición de epimastigotes flagelados)'],
      optimalTemp: '37 °C en mamífero; 26-28 °C en vector triatomino',
      growthTime: 'Doble tiempo de generación de amastigotes tisulares de 12-24 horas',
      keyBiochemicalTests: ['Serología pareada por dos técnicas distintas (ELISA Chagas + IFI / HAI)']
    },
    externalAndInternalStructures: [
      'Tripomastigote con silueta clásica curvada en "C" o "S"',
      'Cinetoplasto subterminal púrpura prominente',
      'Amastigote con núcleo esférico y cinetoplasto en bastoncillo adyacente'
    ],
    virulenceFactors: [
      { name: 'Tropismo e invasión miocárdica y neuronal mientérica', mechanism: 'Cruzipaína y trans-sialidasa median la adhesión celular y escape del fagosoma hacia el citosol donde prolifera el amastigote' },
      { name: 'Destrucción progresiva de los plexos nerviosos de Meissner y Auerbach', mechanism: 'Provoca aperistalsis, dilatación colónica y esofágica irreversible (megacolon y megaesófago chagásicos)' },
      { name: 'Respuesta autoinmune por mimetismo molecular y daño microvascular', mechanism: 'Desencadena miocardiopatía fibrótica difusa con arritmias ventriculares letales, bloqueo de rama derecha y aneurisma apical del ventrículo izquierdo' }
    ],
    reservoir: ['Triatominos hematófagos (Triatoma dimidiata en Guatemala)', 'Mamíferos silvestres y peridomésticos (zarigüeyas / tacuazines, perros, gatos, roedores)', 'Seres humanos'],
    transmissionRoute: [
      'Vectorial: deyección de heces contaminadas con tripomastigotes metacíclicos por chinches triatominas (chinche picuda / Triatoma dimidiata) tras la hematofagia, rascadas hacia la herida o conjuntiva ocular',
      'Oral: ingestión de jugos de frutas (caña, açaí) contaminados con heces o chinches trituradas (brotes agudos)',
      'Congénita transplacentaria de madre infectada al feto',
      'Transfusión sanguínea o trasplante de órganos no tamizados'
    ],
    associatedDiseases: [
      {
        name: 'Enfermedad de Chagas Aguda',
        description: 'Fase inicial inmediatamente posterior a la picadura; con frecuencia oligosintomática salvo por el complejo oftalmoganglionar clásico.',
        clinicalPresentation: ['Signo de Romaña: edema bipalpebral unilateral indoloro con adenopatía preauricular y dacriocistitis', 'Chagoma de inoculación: nódulo eritematoso indurado en sitio de deyección', 'Fiebre persistente, hepatoesplenomegalia y miocarditis aguda']
      },
      {
        name: 'Cardiopatía Chagásica Crónica',
        description: 'Manifestación tardía (10 a 30 años posinfección) en el 20-30% de los infectados crónicos; principal causa de muerte cardiovascular parasitaria en Latinoamérica.',
        clinicalPresentation: ['Bloqueo completo de rama derecha del haz de His (BCRDHH) + hemibloqueo anterior izquierdo', 'Arritmias ventriculares malignas y muerte súbita', 'Insuficiencia cardíaca congestiva dilatada refractaria', 'Aneurisma apical del ventrículo izquierdo con trombosis mural y cardioembolismo']
      }
    ],
    signsAndSymptoms: ['Signo de Romaña unilateral', 'Palpitaciones y síncope', 'Disnea de esfuerzo y edemas maleolares', 'Disfagia progresiva (megaesófago) y estreñimiento crónico severo (megacolon)'],
    complications: ['Muerte súbita por fibrilación ventricular', 'Aneurisma ventricular roto o trombosante', 'ACV cardioembólico', 'Acalasia chagásica con broncoaspiración'],
    clinicalSpecimens: ['Sangre capilar / venosa para microhematocrito y Strout en fase aguda', 'Suero para serología en fase crónica'],
    diagnosticMethods: [
      { method: 'Frotis fino y Gota Gruesa con Giemsa / Micrométodo de Strout', standardRole: 'Gold Standard', keyFindings: 'Identificación de tripomastigotes sanguíneos móviles con gran cinetoplasto posterior en fase aguda' },
      { method: 'Pruebas Serológicas Combinadas (ELISA + Inmunofluorescencia Indirecta)', standardRole: 'Confirmatorio', keyFindings: 'Para el diagnóstico de la fase crónica se exige la concordancia positiva de DOS pruebas serológicas con principios antigénicos diferentes' }
    ],
    labFindings: ['ECG alterado: BCRDHH, extrasístoles ventriculares polimórficas', 'Ecocardiograma: hipoquinesia o acinesia apical ventricular con aneurisma sacular'],
    treatment: {
      disclaimer: 'El tratamiento etiológico es curativo en fase aguda, congénita y niños pequeños; en adultos con fase crónica avanzada sin cardiopatía frena la progresión.',
      firstLine: [
        'Benznidazol: 5 a 7 mg/kg/día VO dividido en 2 dosis diarias durante 60 días (en niños: 5-10 mg/kg/día)',
        'Nifurtimox: 8 a 10 mg/kg/día VO dividido en 3 dosis diarias durante 60 a 90 días'
      ],
      alternatives: [
        'Manejo cardiológico específico: marcapasos definitivo para bloqueos AV, desfibrilador automático implantable (DAI) para arritmias ventriculares, anticoagulación para aneurisma apical'
      ],
      resistanceNotes: 'Frecuentes reacciones adversas a benznidazol (dermatitis por hipersensibilidad, polineuropatía periférica y leucopenia) que exigen monitorización estrecha.'
    },
    prevention: ['Mejoramiento de vivienda rural (repello de paredes de adobe y techos de paja donde anida Triatoma dimidiata)', 'Rociamiento residual intradomiciliar con insecticidas piretroides por el MSPAS', 'Tamizaje serológico estricto de sangre en todos los bancos de sangre del país'],
    guatemalaRelevance: {
      endemicStatus: 'Endémico',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Chiquimula', 'Jalapa', 'Jutiapa', 'Zacapa', 'El Progreso', 'Santa Rosa'],
      officialNotes: 'Endémico en el Corredor Oriental. Triatoma dimidiata es el vector autóctono primario en Guatemala. El país cuenta con el Programa Nacional de Vigilancia y Control de Enfermedad de Chagas del MSPAS con certificación OPS.',
      notificationGroup: 'Notificación Semanal'
    },
    parasiticStages: [
      {
        id: 'tc-stage-trypomastigote-micro',
        stageType: 'tripomastigote',
        name: 'Tripomastigote sanguíneo en "C"',
        biologicalRole: 'Forma circulante no multiplicativa en sangre que invade células',
        isInfectiveStage: true,
        isDiagnosticStage: true,
        morphologyDescription: 'Célula flagelada fusiforme curvada en "C" con membrana ondulante y cinetoplasto subterminal extraordinariamente voluminoso.',
        keyDimensions: '20 µm',
        differentialCharacteristics: ['Gran tamaño del cinetoplasto posterior (mucho mayor que T. rangeli)', 'Silueta en "C" en frotis Giemsa'],
        primaryClinicalSpecimen: 'Sangre capilar periférica (Gota gruesa y frotis)',
        identificationMethod: 'Tinción de Giemsa o micrométodo de Strout',
        visualRepresentationType: 'microfotografia_real'
      },
      {
        id: 'tc-stage-amastigote-micro',
        stageType: 'amastigote',
        name: 'Amastigote intracelular en nidos tisulares',
        biologicalRole: 'Estadio replicativo por fisión binaria en miocardiocitos',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Corpúsculos ovoides diminutos (2-4 µm) con núcleo y cinetoplasto en bastón agrupados en nidos dentro de fibras musculares cardíacas.',
        keyDimensions: '2 - 4 µm',
        differentialCharacteristics: ['Presencia de cinetoplasto en barra que lo diferencia de Toxoplasma gondii y de Histoplasma capsulatum'],
        primaryClinicalSpecimen: 'Biopsia tisular / Músculo',
        identificationMethod: 'Histopatología con tinción de Hematoxilina-Eosina o Giemsa',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Tripomastigote de Trypanosoma cruzi en sangre periférica y nido de amastigotes en fibra miocárdica.',
        stainOrModality: 'Tinción de Giemsa / H&E (1000x)',
        creditOrSource: 'CDC DPDx Parasite Image Library'
      }
    ],
    bibliography: [
      { source: 'MSPAS Guatemala - Departamento de Epidemiología', title: 'Norma Técnica para la Vigilancia Epidemiológica de la Enfermedad de Chagas', year: '2023', status: 'Verificado' },
      { source: 'American Heart Association (AHA)', title: 'Chagas Cardiomyopathy Clinical Statement', year: '2018', status: 'Verificado' }
    ],
    lastReviewedDate: '2026-03-26'
  },

  {
    id: 'leishmania-braziliensis',
    scientificName: 'Leishmania braziliensis / L. mexicana',
    commonName: 'Leishmaniasis / Úlcera de los chicleros',
    category: 'parasito',
    parasiteGroup: 'protozoo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Euglenozoa',
      classTaxon: 'Kinetoplastea',
      orderTaxon: 'Trypanosomatida',
      family: 'Trypanosomatidae',
      genus: 'Leishmania',
      species: 'L. braziliensis'
    },
    morphology: {
      shape: 'Amastigote intracelular inmóvil esférico/ovoide en fagolisosomas de macrófagos; promastigote alargado flagelado en vector Lutzomyia.',
      size: 'Amastigote: 2 - 3 µm; Promastigote: 15 - 20 µm',
      arrangement: 'Agrupados densamente en el citoplasma de macrófagos',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Cinetoplasto en bastoncillo perpendicular al núcleo', 'Lipotetrasacárido (LPG) y metaloproteasa gp63 para evasión de la lisis del complemento']
    },
    microbiologyCharacteristics: {
      metabolism: 'Resiste el ambiente ácido y oxidativo del fagolisosoma del macrófago',
      cultureMedia: ['Medio bifásico NNN a 24-26 °C'],
      optimalTemp: '37 °C en hospedero mamífero; 24-26 °C en cultivo/vector',
      growthTime: 'Multiplicación por fisión binaria cada 24 horas',
      keyBiochemicalTests: ['Prueba cutánea de Montenegro (Leishmanina) de hipersensibilidad retardada']
    },
    externalAndInternalStructures: [
      'Amastigote con núcleo redondeado rojo y cinetoplasto púrpura oscuro',
      'Membrana celular externa rica en LPG',
      'Promastigote con flagelo anterior libre largo'
    ],
    virulenceFactors: [
      { name: 'gp63 y lipofosfoglucano (LPG)', mechanism: 'Inhiben el estallido respiratorio oxidativo del macrófago y degradan enzimas lisosómicas' },
      { name: 'Metástasis mucosa linfohematógena (L. braziliensis)', mechanism: 'Meses o años tras la úlcera primaria, los amastigotes migran hacia la mucosa nasal y orofaríngea destruyendo el tabique cartilaginoso (espundia)' }
    ],
    reservoir: ['Roedores selváticos, zarigüeyas y perros', 'Vectores flebótomos (Lutzomyia spp., conocidos en Guatemala como papalotillas o mosca chiclera)'],
    transmissionRoute: ['Picadura de hembras infectadas de flebótomos del género Lutzomyia en zonas boscosas y cafetaleras'],
    associatedDiseases: [
      {
        name: 'Leishmaniasis Cutánea Localizada (Úlcera de los Chicleros)',
        description: 'Úlcera indolora de bordes violáceos elevados e indurados con fondo granulomatoso limpio en pabellón auricular o extremidades.',
        clinicalPresentation: ['Pápula eritematosa inicial que se ulcera en semanas', 'Úlcera crateriforme indolora "en volcán"', 'Linfangitis satélite y adenopatía regional']
      },
      {
        name: 'Leishmaniasis Mucocutánea (Espundia)',
        description: 'Destrucción progresiva destructiva del cartílago nasal ("nariz de tapir") y perforación palatina por L. braziliensis.',
        clinicalPresentation: ['Congestión y epistaxis nasal crónica', 'Perforación del tabique nasal cartilaginoso', 'Destrucción de úvula, faringe y laringe']
      }
    ],
    signsAndSymptoms: ['Úlcera indolora de lenta cicatrización', 'Deformidad nasal o auricular', 'Costra central en zonas expuestas'],
    complications: ['Mutilación de la pirámide nasal y paladar', 'Sobreinfección bacteriana secundaria', 'Dificultad respiratoria por obstrucción laríngea'],
    clinicalSpecimens: ['Frotis por raspado del borde activo de la úlcera', 'Biopsia dérmica'],
    diagnosticMethods: [
      { method: 'Frotis por raspado del borde de la lesión teñido con Giemsa', standardRole: 'Gold Standard', keyFindings: 'Identificación de amastigotes (cuerpos de Leishman-Donovan) dentro de macrófagos tisulares con núcleo y cinetoplasto' },
      { method: 'Biopsia de piel y PCR de kinetoplasto', standardRole: 'Confirmatorio', keyFindings: 'Diferenciación de subgénero Viannia (L. braziliensis vs L. mexicana)' }
    ],
    labFindings: ['Intradermorreacción de Montenegro positiva en leishmaniasis cutánea'],
    treatment: {
      disclaimer: 'El tratamiento de primera línea oficial en el MSPAS son los antimoniales pentavalentes bajo supervisión médica.',
      firstLine: [
        'Antimoniato de Meglumina (Glucantime): 20 mg Sb5+/kg/día IM o IV lento durante 20 días continuos (en mucocutánea por 30 días)'
      ],
      alternatives: [
        'Miltefosina: 2.5 mg/kg/día VO durante 28 días',
        'Anfotericina B liposomal: para casos refractarios o con toxicidad antimonial'
      ],
      resistanceNotes: 'Monitorizar función cardíaca (prolongación de QTc) y enzimas hepáticas/pancreáticas durante el uso de Glucantime.'
    },
    prevention: ['Uso de repelente con DEET y ropa de manga larga en selvas y cafetales', 'Uso de mosquiteros de malla fina (menor poro que los de malaria)', 'Diagnóstico y tratamiento temprano de úlceras en trabajadores agrícolas'],
    guatemalaRelevance: {
      endemicStatus: 'Hiperendémico',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Petén', 'Alta Verapaz', 'Izabal', 'Quiché (Ixcán)', 'Huehuetenango (norte)'],
      officialNotes: 'Hiperendémico en el bosque húmedo tropical. Enfermedad ligada históricamente a recolectores de chicle y madera en la Reserva de la Biosfera Maya (Petén). El MSPAS distribuye Glucantime en áreas de salud endémicas.',
      notificationGroup: 'Notificación Semanal'
    },
    parasiticStages: [
      {
        id: 'leish-stage-amastigote-micro',
        stageType: 'amastigote',
        name: 'Amastigote intracelular (Cuerpos de Leishman-Donovan)',
        biologicalRole: 'Forma replicativa asexual en fagolisosomas de macrófagos dérmicos',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Corpúsculos esféricos u ovoides (2-3 µm) con núcleo esférico rojizo y cinetoplasto en barra púrpura perpendicular.',
        keyDimensions: '2 - 3 µm',
        differentialCharacteristics: ['Presencia de cinetoplasto que descarta Histoplasma capsulatum en frotis'],
        primaryClinicalSpecimen: 'Biopsia tisular / Músculo',
        identificationMethod: 'Frotis de raspado de borde ulceroso con Giemsa a 1000x',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Amastigotes de Leishmania en el citoplasma de un macrófago dérmico en frotis teñido con Giemsa.',
        stainOrModality: 'Microscopía de inmersión en aceite (1000x)',
        creditOrSource: 'CDC Public Health Image Library'
      }
    ],
    bibliography: [
      { source: 'MSPAS Guatemala', title: 'Manual de Normas y Procedimientos para la Vigilancia y Control de las Leishmaniasis en Guatemala', year: '2022', status: 'Verificado' }
    ],
    lastReviewedDate: '2026-03-25'
  },

  {
    id: 'necator-americanus',
    scientificName: 'Necator americanus / Ancylostoma duodenale',
    commonName: 'Uncinarias / Anquilostoma',
    category: 'parasito',
    parasiteGroup: 'nematodo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Nematoda',
      classTaxon: 'Secernentea',
      orderTaxon: 'Strongylida',
      family: 'Ancylostomatidae',
      genus: 'Necator / Ancylostoma',
      species: 'N. americanus'
    },
    morphology: {
      shape: 'Nematodo cilíndrico curvo de 1 cm; cápsula bucal armada (placas cortantes semilunares en Necator; dientes quitinosos en Ancylostoma); huevos ovalados de cáscara muy delgada y transparente.',
      size: 'Adulto: 9 - 11 mm; Huevo: 60 - 75 µm por 35 - 40 µm',
      arrangement: 'Fijados con avidez a las vellosidades del duodeno y yeyuno',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Cápsula bucal con placas cortantes (Necator)', 'Bolsa copulatriz membranosa en el macho', 'Secreción de péptidos anticoagulantes']
    },
    microbiologyCharacteristics: {
      metabolism: 'Hematófago estricto intraluminal; ingiere sangre activamente del lecho capilar velloso',
      cultureMedia: ['Cultivo de Harada-Mori para eclosión y recuperación de larvas'],
      optimalTemp: '37 °C en intestino; maduración larvaria en suelo arenoso húmedo a 25-30 °C',
      growthTime: 'Período prepatente de 5 a 7 semanas tras penetración dérmica',
      keyBiochemicalTests: ['Técnica cuantitativa de Kato-Katz']
    },
    externalAndInternalStructures: [
      'Cuerpo incurvado en "S" o "C"',
      'Cápsula bucal profundamente esclerosada',
      'Huevo de cubierta hialina finísima con 4 a 8 blastómeros embrionarios'
    ],
    virulenceFactors: [
      { name: 'Hematofagia voraz activa y anticoagulantes salivales', mechanism: 'Necator expolia 0.03 mL de sangre/día y Ancylostoma hasta 0.2 mL/día, macerando la mucosa y dejando sangrado residual por secreción de factor Xa y antiplaquetarios' },
      { name: 'Penetración percutánea activa por larvas L3', mechanism: 'Metaloproteasas degradan la dermis interdigital provocando prurito intenso ("comezón de la tierra")' }
    ],
    reservoir: ['Seres humanos'],
    transmissionRoute: ['Penetración percutánea de larvas filariformes L3 del suelo contaminado al caminar descalzo en áreas agrícolas y cafetaleras'],
    associatedDiseases: [
      {
        name: 'Uncinariasis y Anemia Ferropénica Severa',
        description: 'Geohelmintiasis hematófaga crónica; causa clásica de anemia microcítica grave ("anemia de los cafetales") y retardo del neurodesarrollo infantil.',
        clinicalPresentation: ['Dermatitis pruriginosa en pies con pápulas y vesículas ("picazón de suelo")', 'Síndrome de Löffler pulmonar transitorio', 'Palidez mucocutánea cérea intensa, astenia marcada y soplos cardíacos funcionales', 'Pica (geofagia en niños anémicos)']
      }
    ],
    signsAndSymptoms: ['Palidez intensa y cansancio fácil', 'Prurito interdigital en pies', 'Dolor epigástrico que mejora al comer', 'Edemas maleolares por hipoalbuminemia'],
    complications: ['Insuficiencia cardíaca de alto gasto por anemia severa (Hb < 5 g/dL)', 'Retraso del crecimiento físico y cognitivo escolar'],
    clinicalSpecimens: ['Heces formadas / pastosas'],
    diagnosticMethods: [
      { method: 'Examen coproparasitoscópico directo con Lugol y método de Kato-Katz', standardRole: 'Gold Standard', keyFindings: 'Identificación de huevos ovalados de cáscara finísima transparente con blastómeros en heces frescas' }
    ],
    labFindings: ['Anemia microcítica hipocrómica severa con ferritina baja', 'Eosinofilia moderada a alta'],
    treatment: {
      disclaimer: 'El tratamiento etiológico debe acompañarse de suplementación obligatoria con sulfato ferroso para corregir la anemia ferropénica.',
      firstLine: [
        'Albendazol: 400 mg VO dosis única (en niños > 2 años: 400 mg; de 1-2 años: 200 mg)',
        'Mebendazol: 100 mg VO c/12h por 3 días o 500 mg dosis única'
      ],
      alternatives: [
        'Pamoato de Pirantel: 11 mg/kg VO diario durante 3 días',
        'Sulfato Ferroso: 3-6 mg Fe elemental/kg/día por al menos 3 meses tras normalizar hemoglobina'
      ],
      resistanceNotes: 'Albendazol presenta mayor eficacia ovicida y vermicida frente a uncinarias que mebendazol.'
    },
    prevention: ['Uso sistemático de calzado o botas de hule en fincas cafetaleras y agrícolas', 'Letrinización rural y saneamiento básico', 'Campañas semestrales de desparasitación escolar del MSPAS'],
    guatemalaRelevance: {
      endemicStatus: 'Hiperendémico',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['San Marcos', 'Suchitepéquez', 'Escuintla', 'Santa Rosa', 'Alta Verapaz', 'Chimaltenango'],
      officialNotes: 'Hiperendémico en la región cafetalera y costa sur. Históricamente denominada "anemia de los cafetales" en Guatemala. Alta prevalencia en jornaleros y cortadores de café que laboran descalzos o con calzado deteriorado en suelos húmedos.',
      notificationGroup: 'Notificación Semanal'
    },
    parasiticStages: [
      {
        id: 'unc-stage-egg-micro',
        stageType: 'huevo',
        name: 'Huevo segmentado con blastómeros en cáscara delgada',
        biologicalRole: 'Estadio diagnóstico en heces que eclosiona en tierra',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Huevo ovalado transparente con cáscara delgadísima hialina y espacio claro subcapsular que rodea a 4-8 blastómeros centrales.',
        keyDimensions: '60 - 75 µm por 35 - 40 µm',
        differentialCharacteristics: ['Cáscara sumamente fina y transparente', 'Contenido segmentado en blastómeros'],
        primaryClinicalSpecimen: 'Heces formadas / pastosas',
        identificationMethod: 'Examen coproparasitoscópico directo con Lugol a 400x',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Huevo de uncinaria con cáscara delgada transparente y masa de blastómeros.',
        stainOrModality: 'Microscopía óptica de campo claro (400x)',
        creditOrSource: 'CDC DPDx Parasite Image Library'
      }
    ],
    bibliography: [
      { source: 'Botero D, Restrepo M.', title: 'Parasitosis Humanas (6ª Ed.) - Uncinariasis', year: '2019', status: 'Revisado' },
      { source: 'MSPAS Guatemala', title: 'Guía de Manejo Clínico de las Parasitosis Intestinales', year: '2022', status: 'Verificado' }
    ],
    lastReviewedDate: '2026-03-24'
  },

  {
    id: 'hymenolepis-nana',
    scientificName: 'Hymenolepis nana',
    commonName: 'Tenia enana',
    category: 'parasito',
    parasiteGroup: 'cestodo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Platyhelminthes',
      classTaxon: 'Cestoda',
      orderTaxon: 'Cyclophyllidea',
      family: 'Hymenolepididae',
      genus: 'Hymenolepis',
      species: 'H. nana'
    },
    morphology: {
      shape: 'Céstodo pequeño de 2 a 4 cm; escólex con rostelo armado retráctil con corona de ganchos y 4 ventosas; huevo esférico con filamentos polares refringentes.',
      size: 'Adulto: 2 - 4 cm; Huevo: 30 - 47 µm de diámetro',
      arrangement: 'Estróbilo delicado transparente de 200 proglótides más anchas que largas',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Rostelo armado con corona única de 20 a 30 ganchos', 'Cuatro ventosas en copa', 'Filamentos polares intermembranosos del huevo']
    },
    microbiologyCharacteristics: {
      metabolism: 'Absorbe glucosa a través de microtricos tegumentarios en la mucosa del íleon',
      cultureMedia: ['No aplica (helminto macroscópico)'],
      optimalTemp: '37 °C',
      growthTime: 'Ciclo biológico muy rápido de 2 a 3 semanas',
      keyBiochemicalTests: ['Examen coproparasitoscópico de concentración con Lugol']
    },
    externalAndInternalStructures: [
      'Escólex diminuto de 0.3 mm armado',
      'Huevo esférico transparente con doble membrana',
      'Membrana interna con mamelones polares de los que emergen 4 a 8 filamentos'
    ],
    virulenceFactors: [
      { name: 'Ciclo directo y autoinfección interna en el hospedero', mechanism: 'Único céstodo humano que NO requiere hospedero intermediario obligatorio; los huevos pueden eclosionar en el propio íleon penetrando las vellosidades intestinales (fase de cisticercoide) y generando miles de adultos' },
      { name: 'Descamación epitelial y enteritis catarral por cisticercoides', mechanism: 'La invasión tisular de las vellosidades por larvas cisticercoides desencadena inflamación local y mala absorción' }
    ],
    reservoir: ['Seres humanos (particularmente niños en edad preescolar y escolar)', 'Roedores (ratones y ratas)'],
    transmissionRoute: ['Fecal-oral directa (mano-boca) por ingestión de huevos infectantes', 'Autoinfección interna en la luz del íleon', 'Ingestión accidental de coleópteros de harina contaminados con cisticercoides'],
    associatedDiseases: [
      {
        name: 'Himenolepiasis Pediátrica',
        description: 'Infección por céstodos más común en niños guatemaltecos; cursa con dolor periumbilical, meteorismo, diarrea intermitente y retraso en la ganancia ponderal.',
        clinicalPresentation: ['Dolor abdominal difuso recurrente de tipo cólico', 'Meteorismo, distensión abdominal y anorexia', 'Diarreas pastosas periódicas sin sangre', 'Cefalea, mareos e irritabilidad']
      }
    ],
    signsAndSymptoms: ['Dolor periumbilical', 'Diarrea recurrente', 'Prurito nasal y anal leve', 'Meteorismo'],
    complications: ['Hiperinfección masiva con síndrome de malabsorción intestinal en niños desnutridos'],
    clinicalSpecimens: ['Heces formadas / pastosas'],
    diagnosticMethods: [
      { method: 'Examen coproparasitoscópico directo con Lugol y método de Faust (sulfato de zinc)', standardRole: 'Gold Standard', keyFindings: 'Identificación de huevos esféricos hialinos con filamentos polares nítidos entre las dos membranas y embrión hexacanto' }
    ],
    labFindings: ['Eosinofilia leve a moderada (5-10%)'],
    treatment: {
      disclaimer: 'El praziquantel es el fármaco de elección indiscutible con dosis ligeramente superior a la teniasis para erradicar cisticercoides tisulares.',
      firstLine: [
        'Praziquantel: 25 mg/kg VO dosis única en ayunas (en niños y adultos)',
        'Nitazoxanida: 500 mg VO c/12h por 3 días (en niños de 1-3 años: 100 mg c/12h; de 4-11 años: 200 mg c/12h)'
      ],
      alternatives: [
        'Niclosamida: 2 g el día 1, seguido de 1 g diario por 6 días más (7 días de tratamiento continuo para cubrir eclosión de cisticercoides)'
      ],
      resistanceNotes: 'Debido a la autoinfección interna, se recomienda realizar examen coprológico de control a las 2 y 4 semanas tras el tratamiento.'
    },
    prevention: ['Lavado estricto de manos antes de ingerir alimentos', 'Corte y aseo de uñas en escolares', 'Control de plagas de roedores en graneros y despensas de alimentos'],
    guatemalaRelevance: {
      endemicStatus: 'Hiperendémico',
      priorityLevel: 'Media',
      departmentsWithHighPrevalence: ['Guatemala', 'Chimaltenango', 'Quiché', 'Totonicapán', 'San Marcos'],
      officialNotes: 'Hiperendémico en población infantil escolar. Es el céstodo diagnosticado con mayor frecuencia en laboratorios clínicos y centros de salud de Guatemala en exámenes coproparasitoscópicos rutinarios de niños.',
      notificationGroup: 'Notificación Semanal'
    },
    parasiticStages: [
      {
        id: 'hn-stage-egg-micro',
        stageType: 'huevo',
        name: 'Huevo esférico con filamentos polares refringentes',
        biologicalRole: 'Estadio inmediatamente infectante por ingestión fecal-oral',
        isInfectiveStage: true,
        isDiagnosticStage: true,
        morphologyDescription: 'Huevo esférico transparente (30-47 µm) con doble envoltura; membrana interna con dos mamelones de donde nacen de 4 a 8 filamentos polares ondulantes y embrión hexacanto.',
        keyDimensions: '30 - 47 µm',
        differentialCharacteristics: ['Filamentos polares patognomónicos en el espacio intermembranoso (ausentes en Hymenolepis diminuta)'],
        primaryClinicalSpecimen: 'Heces formadas / pastosas',
        identificationMethod: 'Coproparasitoscópico directo con Lugol a 400x',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Huevo esférico transparente de Hymenolepis nana con filamentos polares y ganchos del embrión hexacanto.',
        stainOrModality: 'Microscopía óptica de campo claro (400x)',
        creditOrSource: 'CDC DPDx Parasite Image Library'
      }
    ],
    bibliography: [
      { source: 'Botero D, Restrepo M.', title: 'Parasitosis Humanas (6ª Ed.) - Himenolepiasis', year: '2019', status: 'Revisado' },
      { source: 'CDC DPDx', title: 'Laboratory Identification of Parasites: Hymenolepiasis', year: '2024', status: 'Revisado' }
    ],
    lastReviewedDate: '2026-03-25'
  },

  {
    id: 'fasciola-hepatica',
    scientificName: 'Fasciola hepatica',
    commonName: 'Duela del hígado / Pirigüey',
    category: 'parasito',
    parasiteGroup: 'trematodo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Platyhelminthes',
      classTaxon: 'Trematoda',
      orderTaxon: 'Echinostomida / Plagiorchiida',
      family: 'Fasciolidae',
      genus: 'Fasciola',
      species: 'F. hepatica'
    },
    morphology: {
      shape: 'Trematodo aplanado foliáceo en forma de hoja lanceolada con cono cefálico anterior prominente; huevos gigantes elipsoidales operculados pardo-dorados.',
      size: 'Adulto: 2 a 3 cm de largo por 1 a 1.5 cm de ancho; Huevo: 130 - 150 µm de largo por 60 - 90 µm de ancho',
      arrangement: 'Alojado en los canalículos biliares intra y extrahepáticos',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Cono cefálico cónico anterior', 'Dos ventosas cercanas (oral y ventral/acetábulo)', 'Tegumento espinoso con escamas cuticulares dirigidas hacia atrás', 'Opérculo polar en el huevo']
    },
    microbiologyCharacteristics: {
      metabolism: 'Anaerobio facultativo en bilis; hematófago e histiófago biliar',
      cultureMedia: ['No aplica (helminto macroscópico)'],
      optimalTemp: '37 °C; miracidios maduran en agua dulce a 20-25 °C',
      growthTime: 'Período prepatente de 3 a 4 meses hasta oviposición biliar',
      keyBiochemicalTests: ['ELISA de Fasciola para detección de anticuerpos séricos específicos']
    },
    externalAndInternalStructures: [
      'Tegumento revestido de abundantes espinas quitinosas curvadas',
      'Ciegos intestinales densamente ramificados que recorren todo el cuerpo',
      'Útero anterior repleto de huevos gigantes operculados'
    ],
    virulenceFactors: [
      { name: 'Migración transperitoneal y transhepática destructiva', mechanism: 'Las duelas juveniles perforan la cápsula de Glisson y tunelizan el parénquima hepático durante 6 a 8 semanas secretando catepsinas L (cisteína proteasas) que destruyen hepatocitos y causan hematomas subcapsulares y necrosis' },
      { name: 'Obstrucción mecánica biliar y fibrosis colangítica', mechanism: 'Los vermes adultos en colédoco y conductos hepáticos inducen hiperplasia glandular, estasis biliar, colangitis esclerosante secundaria y litiasis biliar' }
    ],
    reservoir: ['Ganado ovino, caprino y bovino', 'Seres humanos como hospederos accidentales', 'Caracoles de agua dulce de la familia Lymnaeidae (hospederos intermediarios obligados)'],
    transmissionRoute: [
      'Ingestión de plantas acuáticas crudas contaminadas con metacercarias enquistadas viables (principalmente BERROS de agua dulce — Nasturtium officinale — de fuentes o riachuelos donde abreva ganado)',
      'Ingestión de agua no tratada de manantiales o acequias con metacercarias flotantes'
    ],
    associatedDiseases: [
      {
        name: 'Fascioliasis Aguda (Fase Invasiva Hepática)',
        description: 'Tránsito de duelas jóvenes a través del parénquima hepático; síndrome febril prolongado con eosinofilia extrema y dolor en hipocondrio derecho.',
        clinicalPresentation: ['Fiebre alta en agujas continua o remitente', 'Hepatomegalia dolorosa a la palpación y dolor en cuadrante superior derecho', 'Urticaria alérgica generalizada y diaforesis', 'HIPEREOSINOFILIA MASIVA en sangre periférica (frecuentemente > 50-80% del total de leucocitos)']
      },
      {
        name: 'Fascioliasis Crónica (Fase Biliar Obstructiva)',
        description: 'Establecimiento de las duelas adultas en los conductos biliares;',
        clinicalPresentation: ['Cólicos biliares recidivantes similares a colelitiasis', 'Ictericia fluctuante de patrón obstructivo', 'Colangitis aguda bacteriana sobreagregada']
      }
    ],
    signsAndSymptoms: ['Fiebre y dolor en hipocondrio derecho', 'Hepatomegalia dolorosa', 'Ictericia y coluria', 'Urticaria pruriginosa en fase aguda'],
    complications: ['Cirrosis biliar secundaria', 'Abscesos hepáticos necróticos', 'Hematoma subcapsular hepático roto con hemoperitoneo', 'Localizaciones ectópicas (pulmón, pared abdominal, ojo)'],
    clinicalSpecimens: ['Heces de sedimentación para huevos gigantes', 'Bilis obtenida por sondaje duodenal o CPRE', 'Suero para ELISA'],
    diagnosticMethods: [
      { method: 'Examen coproparasitoscópico de sedimentación rápida (técnica de Lumbreras)', standardRole: 'Gold Standard', keyFindings: 'Identificación de huevos gigantes operculados amarillo-dorados de 130-150 µm (solo positivo en fase crónica tras 3-4 meses)' },
      { method: 'ELISA de Fasciola (anticuerpos anti-Fasciola)', standardRole: 'Confirmatorio', keyFindings: 'Prueba de elección en la fase aguda invasiva temprana antes de que comience la oviposición biliar' }
    ],
    labFindings: ['HIPEREOSINOFILIA marcada (> 5,000-10,000 eosinófilos/µL)', 'Fosfatasa alcalina y GGT elevadas en fase biliar', 'Tomografía hepática: trayectos lineales o serpiginosos hipodensos ramificados en el parénquima hepático ("túneles de Fasciola")'],
    treatment: {
      disclaimer: 'ALERTA TERAPÉUTICA CRÍTICA: El praziquantel y albendazol tienen muy baja eficacia frente a Fasciola hepatica. El fármaco de elección es el Triclabendazol.',
      firstLine: [
        'Triclabendazol (Egaten): 10 mg/kg VO dosis única administrada tras una comida grasa (en infecciones severas: 20 mg/kg dividido en dos tomas con intervalo de 12 horas)'
      ],
      alternatives: [
        'Nitazoxanida: 500 mg VO c/12h durante 7 días consecutivos (eficacia intermedia si no se dispone de triclabendazol)'
      ],
      resistanceNotes: 'El Triclabendazol es el único fármaco activo tanto contra las formas inmaduras migratorias hepáticas como contra los adultos biliares.'
    },
    prevention: ['Evitar estrictamente el consumo de berros silvestres crudos o sin cocer procedentes de fuentes no controladas', 'Hervir el agua de bebida en áreas ganaderas', 'Control y tratamiento del ganado ovino y bovino con fasciolicidas veterinarios'],
    guatemalaRelevance: {
      endemicStatus: 'Endémico',
      priorityLevel: 'Media',
      departmentsWithHighPrevalence: ['Chimaltenango (Patzún, Tecpán)', 'Quetzaltenango', 'Totonicapán', 'San Marcos', 'Huehuetenango'],
      officialNotes: 'Endémico en el Altiplano Central y Occidental. Ligada a la tradición de recolectar berros silvestres en nacimientos de agua donde pastan ovejas en comunidades del altiplano guatemalteco. Causa importante de hipereosinofilia febril en pediatría.',
      notificationGroup: 'Notificación Semanal'
    },
    parasiticStages: [
      {
        id: 'fh-stage-egg-micro',
        stageType: 'huevo',
        name: 'Huevo gigante operculado elipsoidal',
        biologicalRole: 'Estadio diagnóstico eliminado por bilis hacia heces',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Huevo elipsoidal voluminoso gigante (130-150 µm) de color castaño-dorado con un opérculo nítido en uno de sus polos.',
        keyDimensions: '130 - 150 µm por 60 - 90 µm',
        differentialCharacteristics: ['Tamaño gigante patognomónico que supera ampliamente cualquier huevo de nematodo', 'Presencia de opérculo polar'],
        primaryClinicalSpecimen: 'Heces formadas / pastosas',
        identificationMethod: 'Sedimentación coprológica rápida (técnica de Lumbreras) a 100x',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Huevo gigante operculado de Fasciola hepatica en muestra biliar coprológica.',
        stainOrModality: 'Microscopía óptica de campo claro (100x y 400x)',
        creditOrSource: 'CDC DPDx Parasite Image Library'
      }
    ],
    bibliography: [
      { source: 'World Health Organization (WHO)', title: 'Foodborne trematodiases: Fascioliasis', year: '2023', status: 'Verificado' },
      { source: 'Botero D, Restrepo M.', title: 'Parasitosis Humanas (6ª Ed.) - Fascioliasis', year: '2019', status: 'Revisado' }
    ],
    lastReviewedDate: '2026-03-25'
  },

  {
    id: 'onchocerca-volvulus',
    scientificName: 'Onchocerca volvulus',
    commonName: 'Filaria de la ceguera de los ríos / Enfermedad de Robles',
    category: 'parasito',
    parasiteGroup: 'nematodo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Nematoda',
      classTaxon: 'Secernentea',
      orderTaxon: 'Spirurida',
      family: 'Onchocercidae',
      genus: 'Onchocerca',
      species: 'O. volvulus'
    },
    morphology: {
      shape: 'Nematodo tisular filariforme largo; adultos ovovivíparos agrupados en nódulos subcutáneos fibrosos (oncocercomas); microfilarias desnudas dérmicas sin vaina.',
      size: 'Hembra adulta: 30 a 50 cm; Macho: 2 a 4 cm; Microfilaria dérmica: 220 - 360 µm de largo por 5 - 9 µm de ancho',
      arrangement: 'Adultos enrollados en nódulos subcutáneos; microfilarias libres en dermis superficial y globo ocular',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Ausencia de vaina perilarval en microfilaria', 'Cola afilada desprovista de núcleos en el extremo distal', 'Endosimbionte bacteriano intracelular Wolbachia pipientis']
    },
    microbiologyCharacteristics: {
      metabolism: 'Dependencia metabólica y reproductiva de la bacteria endosimbionte Wolbachia',
      cultureMedia: ['No aplica (parásito tisular humano)'],
      optimalTemp: '37 °C',
      growthTime: 'Los gusanos adultos pueden vivir y liberar microfilarias durante 10 a 15 años dentro de los oncocercomas',
      keyBiochemicalTests: ['Prueba de reacción en cadena de la polimerasa (PCR O-150) en biopsias de piel']
    },
    externalAndInternalStructures: [
      'Microfilaria desnuda sin vaina con columna nuclear somática',
      'Extremo cefálico con espacio transparente',
      'Nódulo subcutáneo esclerosado con vasos sanguíneos y estroma colágeno'
    ],
    virulenceFactors: [
      { name: 'Muerte y lisis de microfilarias en la córnea y cámara anterior ocular', mechanism: 'La liberación masiva de antígenos del parásito y de la endotoxina de Wolbachia desencadena queratitis punteada, queratitis esclerosante difusa, iridociclitis crónica, sinequias y ceguera bilateral irreversible' },
      { name: 'Dermatitis oncocercosa crónica (Enfermedad de Robles)', mechanism: 'Reacción inflamatoria cutánea con prúrigo intenso, liquenificación, atrofia epidérmica precoz ("piel de lagarto" o "piel de anciano") y despigmentación en moteado ("piel de leopardo")' }
    ],
    reservoir: ['Exclusivamente los seres humanos'],
    transmissionRoute: ['Picadura diurna de jejenes hematófagos del género Simulium (Simulium metallicum / Simulium ochraceum en Guatemala) que se reproducen en ríos torrentosos de montaña'],
    associatedDiseases: [
      {
        name: 'Oncocercosis / Ceguera de los Ríos (Enfermedad de Robles)',
        description: 'Hito histórico de la medicina guatemalteca; parasitosis eliminada formalmente en Guatemala en 2016 tras un programa nacional integral de nodulectomías e ivermectina.',
        clinicalPresentation: ['Oncocercomas: nódulos subcutáneos indoloros firmes en cuero cabelludo y prominencias óseas craneales', 'Dermatitis papular pruriginosa severa y facies leonina', 'Queratitis esclerosante y pérdida progresiva del campo visual hasta la ceguera completa bilateral']
      }
    ],
    signsAndSymptoms: ['Nódulos palpables en la cabeza', 'Prurito cutáneo intratable', 'Fotofobia y disminución progresiva de agudeza visual', 'Manchas acrómicas en piel'],
    complications: ['Ceguera bilateral irreversible', 'Caquexia oncocercosa y depresión severa'],
    clinicalSpecimens: ['Biopsia cutánea superficial tangencial sin sangrado ("skin snip")', 'Examen oftalmológico con lámpara de hendidura'],
    diagnosticMethods: [
      { method: 'Biopsia superficial de piel (Skin snip) incubada en solución salina', standardRole: 'Gold Standard', keyFindings: 'Observación a 100x y 400x de microfilarias desnudas activas emergiendo del tejido cutáneo hacia la solución fisiológica' },
      { method: 'Biomicroscopía con lámpara de hendidura', standardRole: 'Confirmatorio', keyFindings: 'Visualización directa de microfilarias móviles nadando en el humor acuoso de la cámara anterior del ojo' }
    ],
    labFindings: ['Eosinofilia periférica marcada (20-40%)', 'Prueba de Mazzotti positiva (reacción alérgica aguda febril con rash y adenitis tras dosis baja de dietilcarbamazina; HOY EN DESUSO POR RIESGO DE COLAPSO)']
    ,
    treatment: {
      disclaimer: 'HITO HISTÓRICO GUATEMALTECO: Gracias al tratamiento semestral masivo con Ivermectina (Mectizan) durante más de dos décadas, GUATEMALA FUE CERTIFICADA LIBRE DE ONCOCERCOSIS POR LA OMS EN 2016.',
      firstLine: [
        'Ivermectina: 150 mcg/kg VO cada 6 meses (mata microfilarias e inhibe temporalmente la fecundidad de hembras adultas)',
        'Doxiciclina: 100 a 200 mg/día VO durante 6 semanas (elimina Wolbachia endosimbionte, provocando la esterilización definitiva y muerte de los gusanos adultos)'
      ],
      alternatives: [
        'Extirpación quirúrgica de los oncocercomas (Técnica del Dr. Rodolfo Robles de nodulectomía sistemática)'
      ],
      resistanceNotes: 'La ivermectina es microfilaricida pero NO mata a los gusanos adultos de forma inmediata; por ello se requirieron rondas semestrales durante 15 años hasta agotar la vida media del verme.'
    },
    prevention: ['Vigilancia epidemiológica post-eliminación certificada por OMS/OPS', 'Uso de ropa protectora en zonas ribereñas montañosas'],
    guatemalaRelevance: {
      endemicStatus: 'Raro / Controlado',
      priorityLevel: 'Baja',
      departmentsWithHighPrevalence: ['Histórico: Chimaltenango (Pochuta, Yepocapa), Escuintla, Sololá, Suchitepéquez, Santa Rosa, Huehuetenango'],
      officialNotes: 'HITO NACIONAL DE SALUD PÚBLICA: En 1915 el Dr. Rodolfo Robles descubrió en Guatemala la etiología filárica de la oncocercosis, la localización craneal de los nódulos y su vínculo con la ceguera ("Enfermedad de Robles"). En 2016 Guatemala recibió la certificación oficial de la OMS como el cuarto país del mundo en eliminar totalmente la transmisión de la oncocercosis.',
      notificationGroup: 'Notificación Inmediata'
    },
    parasiticStages: [
      {
        id: 'ov-stage-microfilaria-micro',
        stageType: 'microfilaria',
        name: 'Microfilaria dérmica desnuda sin vaina',
        biologicalRole: 'Estadio diagnóstico móvil en estroma dérmico y humor acuoso',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Microfilaria esbelta (220-360 µm x 5-9 µm) sin vaina exterior con extremos afilados y columna nuclear que no alcanza el extremo de la cola.',
        keyDimensions: '220 - 360 µm',
        differentialCharacteristics: ['Ausencia de vaina perilarval', 'Localización estrictamente dérmica y ocular (no se halla en frotis de sangre periférica)'],
        primaryClinicalSpecimen: 'Biopsia tisular / Músculo',
        identificationMethod: 'Biopsia superficial de piel (skin snip) en solución salina',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Microfilaria dérmica de Onchocerca volvulus desprovista de vaina emergiendo de biopsia cutánea.',
        stainOrModality: 'Microscopía óptica directa (400x)',
        creditOrSource: 'CDC DPDx Parasite Image Library'
      }
    ],
    bibliography: [
      { source: 'Organización Mundial de la Salud (OMS) / OEPA', title: 'Verificación de la eliminación de la oncocercosis en Guatemala: Informe de la Comisión Internacional', year: '2016', status: 'Verificado' },
      { source: 'Robles R.', title: 'Enfermedad de Robles: Oncocercosis humana en Guatemala', year: '1919', status: 'Verificado' }
    ],
    lastReviewedDate: '2026-03-20'
  },

  {
    id: 'sarcoptes-scabiei',
    scientificName: 'Sarcoptes scabiei var. hominis',
    commonName: 'Ácaro de la sarna / Escabiosis',
    category: 'parasito',
    parasiteGroup: 'ectoparasito',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Arthropoda',
      classTaxon: 'Arachnida',
      orderTaxon: 'Sarcoptiformes / Astigmata',
      family: 'Sarcoptidae',
      genus: 'Sarcoptes',
      species: 'S. scabiei'
    },
    morphology: {
      shape: 'Ácaro microscópico globoso aplanado ventralmente y convexo dorsalmente con espinas triangulares cuticulares; 4 pares de patas cortas (las anteriores con ventosas pedunculadas no articuladas).',
      size: 'Hembra adulta: 300 - 450 µm de largo por 250 µm de ancho; Macho: 200 µm; Huevo: 150 µm',
      arrangement: 'Intraepidérmico en túneles del estrato córneo',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Espinas cónicas triangulares dorsales', 'Gnatosoma con quelíceros cortantes', 'Ventosas ambulacrales pedunculadas']
    },
    microbiologyCharacteristics: {
      metabolism: 'Degrada y digiere queratina del estrato córneo mediante proteasas salivales',
      cultureMedia: ['No aplica (parásito obligado)'],
      optimalTemp: '37 °C; a temperatura ambiente sobrevive fuera del cuerpo 24 a 48 horas',
      growthTime: 'Ciclo biológico completo de huevo a adulto en 10 a 14 días',
      keyBiochemicalTests: ['Examen microscópico directo de raspado de surco acarino']
    },
    externalAndInternalStructures: [
      'Caparazón quitinoso globoso semiesférico',
      'Pliegues transversales y cerdas rígidas sensoriales',
      'Heces en pelotillas ovaladas oscuras (escíbalos)'
    ],
    virulenceFactors: [
      { name: 'Excavación de túneles en el estrato córneo', mechanism: 'La hembra fertilizada avanza de 0.5 a 5 mm diarios labrando surcos serpiginosos donde deposita de 2 a 3 huevos al día y heces' },
      { name: 'Hipersensibilidad retardada tipo IV al ácaro, huevos y escíbalos', mechanism: 'Provoca prurito intratable generalizado que empeora de noche por el calor de las sábanas, desencadenando excoriaciones y sobreinfección bacteriana por S. aureus y S. pyogenes' }
    ],
    reservoir: ['Exclusivamente los seres humanos'],
    transmissionRoute: [
      'Contacto físico directo prolongado piel con piel (frecuente transmisión intrafamiliar y sexual)',
      'Fómites contaminados (ropa interior, sábanas, toallas) en albergues, cárceles, asilos y guarderías'
    ],
    associatedDiseases: [
      {
        name: 'Escabiosis Clásica (Sarna)',
        description: 'Dermatosis pruriginosa altamente contagiosa caracterizada por surcos acarinos y prurito nocturno intolerable.',
        clinicalPresentation: ['Surco acarino (línea serpiginosa blanquecina de 5-15 mm terminada en eminencia acarina)', 'Pápulas eritematosas y vesículas perláceas', 'Topografía electiva: espacios interdigitales de manos, muñecas (cara anterior), codos, axilas, areolas mamarias, ombligo y surco subglúteo; en varones respeta genitales (chancro escabiótico en glande y escroto)', 'Respeta cara y cuero cabelludo en adultos (en lactantes sí puede comprometer cara, palmas y plantas)']
      },
      {
        name: 'Sarna Costrosa o Noruega',
        description: 'Forma masiva hiperqueratósica en pacientes inmunocomprometidos (VIH, desnutrición, uso crónico de esteroides); millones de ácaros proliferan sin control con placas psoriasiformes descamativas gruesas y poco prurito.',
        clinicalPresentation: ['Placas queratósicas gruesas fisuradas hiperqueratósicas', 'Costras amarillentas adherentes en palmas, plantas y cuero cabelludo', 'Extraordinariamente contagiosa (millones de ácaros en las escamas)']
      }
    ],
    signsAndSymptoms: ['Prurito intolerable de predominio nocturno', 'Lesiones interdigitales excoriadas', 'Varios miembros de la misma familia con prurito simultáneo'],
    complications: ['Sobreinfección bacteriana secundaria (impétigo, celulitis, glomerulonefritis postestreptocócica por S. pyogenes)'],
    clinicalSpecimens: ['Raspado del fondo del surco acarino con hoja de bisturí humedecida en aceite mineral (Prueba de Müller)'],
    diagnosticMethods: [
      { method: 'Microscopía directa de raspado cutáneo con aceite mineral (Prueba de Müller)', standardRole: 'Gold Standard', keyFindings: 'Identificación del ácaro hembra adulto (300 µm con patas cortas), huevos embrionados o escíbalos (bolitas fecales oscuras)' },
      { method: 'Dermatoscopia (signo del ala delta o del avión a reacción)', standardRole: 'Tamizaje', keyFindings: 'Visualización de la cabeza y patas anteriores triangulares oscuras del ácaro al final del surco' }
    ],
    labFindings: ['Eosinofilia moderada e IgE total sérica elevada'],
    treatment: {
      disclaimer: 'REGLA DE TRATAMIENTO ABSOLUTA: Se DEBE tratar simultáneamente a TODOS los convivientes del hogar aunque no tengan síntomas, y lavar la ropa a > 60 °C.',
      firstLine: [
        'Permetrina al 5% en crema tópica: aplicar desde el cuello hasta la punta de los pies (en lactantes incluir cabeza), dejar actuar durante 8 a 14 horas y enjuagar; REPETIR obligatoriamente a los 7 días',
        'Ivermectina oral: 200 mcg/kg VO dosis única con alimentos, REPETIR a los 7-14 días (de elección en brotes institucionales o sarna costrosa)'
      ],
      alternatives: [
        'Azufre precipitado al 6-10% en vaselina: aplicar 3 noches consecutivas (fármaco de elección en recién nacidos < 2 meses y mujeres embarazadas)'
      ],
      resistanceNotes: 'El prurito puede persistir por 2 a 4 semanas tras el tratamiento exitoso ("prurito post-escabiótico") debido a la hipersensibilidad residual a los restos antigénicos.'
    },
    prevention: ['Tratamiento simultáneo de todos los contactos cercanos', 'Lavado de ropa de vestir y sábanas con agua caliente y secado al sol o planchado', 'Aislamiento de prendas no lavables en bolsas plásticas cerradas herméticamente durante 72 horas'],
    guatemalaRelevance: {
      endemicStatus: 'Hiperendémico',
      priorityLevel: 'Media',
      departmentsWithHighPrevalence: ['Guatemala (asentamientos urbanos)', 'Escuintla', 'Quiché', 'Alta Verapaz', 'Huehuetenango'],
      officialNotes: 'Hiperendémico en condiciones de hacinamiento y pobreza extrema. Muy prevalente en comunidades rurales con hacinamiento y viviendas de una sola habitación. En niños indígenas del área rural suele sobreinfectarse con estreptococo con riesgo de glomerulonefritis aguda.',
      notificationGroup: 'Vigilancia Centinela'
    },
    parasiticStages: [
      {
        id: 'sscab-stage-adult-micro',
        stageType: 'adulto',
        name: 'Ácaro adulto hembra ovígera',
        biologicalRole: 'Forma patógena que labra surcos epidérmicos depositando huevos y heces',
        isInfectiveStage: true,
        isDiagnosticStage: true,
        morphologyDescription: 'Cuerpo globoso semiesférico ovalado (300-450 µm) con espinas triangulares en dorso convexo y 4 pares de patas cortas.',
        keyDimensions: '300 - 450 µm',
        differentialCharacteristics: ['Morfología compacta en tortuga diminuta con espinas dorsales características'],
        primaryClinicalSpecimen: 'Biopsia tisular / Músculo',
        identificationMethod: 'Raspado con aceite mineral (Müller) a 100x y 400x',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Ácaro adulto de Sarcoptes scabiei obtenido mediante raspado de surco acarino con aceite mineral.',
        stainOrModality: 'Microscopía óptica de campo claro (100x)',
        creditOrSource: 'CDC Public Health Image Library'
      }
    ],
    bibliography: [
      { source: 'CDC DPDx', title: 'Laboratory Identification of Parasites: Scabies', year: '2024', status: 'Revisado' },
      { source: 'Botero D, Restrepo M.', title: 'Parasitosis Humanas (6ª Ed.) - Escabiosis', year: '2019', status: 'Revisado' }
    ],
    lastReviewedDate: '2026-03-24'
  },

  {
    id: 'pediculus-humanus',
    scientificName: 'Pediculus humanus capitis / corporis',
    commonName: 'Piojo de la cabeza / Piojo del cuerpo / Liendres',
    category: 'parasito',
    parasiteGroup: 'ectoparasito',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Arthropoda',
      classTaxon: 'Insecta',
      orderTaxon: 'Psocodea / Phthiraptera / Anoplura',
      family: 'Pediculidae',
      genus: 'Pediculus',
      species: 'P. humanus'
    },
    morphology: {
      shape: 'Insecto anopluro áptero aplanado dorsoventralmente con 3 pares de patas terminadas en uñas prensiles garfiformes adaptadas al cabello; liendre ovoide operculada adherida al pelo.',
      size: 'Adulto: 2 a 3.5 mm de largo; Liendre: 0.8 mm de largo por 0.3 mm de ancho',
      arrangement: 'Fijado al tallo piloso capilar o costuras de ropa',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Garras tarsales prensiles adaptadas al diámetro del pelo humano', 'Piezas bucales perforadoras retráctiles', 'Opérculo poroso en la liendre y cemento quitinoso']
    },
    microbiologyCharacteristics: {
      metabolism: 'Hematófago obligado estricto; se alimenta de sangre capilar varias veces al día',
      cultureMedia: ['No aplica'],
      optimalTemp: '30-32 °C cerca del cuero cabelludo; muere en menos de 48 horas sin sangre a temperatura ambiente',
      growthTime: 'De liendre a adulto en 7 a 10 días tras 3 estadios ninfales',
      keyBiochemicalTests: ['Examen macroscópico con peine lendrero y microscopía óptica de la liendre']
    },
    externalAndInternalStructures: [
      'Cuerpo translúcido segmentado en cabeza, tórax fusionado y abdomen',
      'Tubo digestivo visible que se llena de sangre roja tras alimentarse',
      'Manguito de queratocemento transparente que une la liendre al cabello'
    ],
    virulenceFactors: [
      { name: 'Picadura hematófaga e inyección salival irritante', mechanism: 'Inyecta saliva anticoagulante y vasodilatadora provocando pápulas eritematosas muy pruriginosas en nuca y región retroauricular' },
      { name: 'Vector biológico de agentes infecciosos letales (P. humanus corporis)', mechanism: 'El piojo del cuerpo es el vector biológico de Rickettsia prowazekii (tifus epidémico exantemático), Borrelia recurrentis (fiebre recurrente epidémica) y Bartonella quintana (fiebre de las trincheras)' }
    ],
    reservoir: ['Exclusivamente los seres humanos'],
    transmissionRoute: [
      'Contacto directo cabeza con cabeza (juegos entre niños en edad escolar)',
      'Fómites: peines, cepillos, gorros, bufandas y almohadas compartidas'
    ],
    associatedDiseases: [
      {
        name: 'Pediculosis Capitis Infantil',
        description: 'Ectoparasitosis más frecuente en escolares de 3 a 11 años; genera prurito intenso en nuca y región occipital.',
        clinicalPresentation: ['Prurito persistente del cuero cabelludo de predominio occipital y retroauricular', 'Excoriaciones por rascado y eccema retroauricular', 'Visualización de liendres adheridas firmemente a menos de 6 mm del cuero cabelludo', 'Adenopatías cervicales posteriores inflamatorias reactivas']
      }
    ],
    signsAndSymptoms: ['Rascado compulsivo de la cabeza', 'Sensación de cosquilleo en el cabello', 'Adenopatías occipitales dolorosas'],
    complications: ['Sobreinfección bacteriana secundaria (impétigo del cuero cabelludo por S. aureus)', 'Plaga del cuerpo: transmisión de tifus epidémico en situaciones de guerra o campamentos de refugiados'],
    clinicalSpecimens: ['Cabello con liendres adheridas montado en portaobjetos', 'Recolección de piojos con peine fino'],
    diagnosticMethods: [
      { method: 'Peinado húmedo con peine fino lendrero (dientes separados por < 0.2 mm)', standardRole: 'Gold Standard', keyFindings: 'Método 4 veces más sensible que la inspección visual para detectar ninfas y piojos adultos móviles' },
      { method: 'Examen microscópico del cabello con liendre montado en lámina portaobjetos', standardRole: 'Confirmatorio', keyFindings: 'Identificación de la cápsula ovoide operculada adherida al tallo con ninfa viable' }
    ],
    labFindings: ['No requiere exámenes de laboratorio clínico complementarios'],
    treatment: {
      disclaimer: 'El tratamiento pediculicida químico debe combinarse obligatoriamente con el peinado diario con peine fino lendrero para retirar mecánicamente las liendres.',
      firstLine: [
        'Permetrina al 1% en loción: aplicar en cabello seco y limpio durante 10 minutos y enjuagar con agua; REPETIR obligatoriamente a los 7 a 9 días para matar ninfas recién eclosionadas',
        'Retiro mecánico sistemático con peine fino de dientes metálicos (lendrera)'
      ],
      alternatives: [
        'Dimeticona al 4% en loción (asfixia física por bloqueo de los espiráculos respiratorios sin generar resistencia química)',
        'Ivermectina oral: 200 mcg/kg dosis única, repetir a los 7 días (para casos refractarios o comunitarios)'
      ],
      resistanceNotes: 'Resistencia mutacional en canales de sodio a piretroides en aumento mundial; en casos resistentes la dimeticona o ivermectina son superiores.'
    },
    prevention: ['No compartir peines, cepillos, toallas ni accesorios capilares', 'Revisión periódica semanal del cuero cabelludo en niños escolares', 'Sumergir peines y cepillos en agua caliente (> 60 °C) durante 10 minutos'],
    guatemalaRelevance: {
      endemicStatus: 'Hiperendémico',
      priorityLevel: 'Media',
      departmentsWithHighPrevalence: ['Guatemala', 'Quetzaltenango', 'Sacatepéquez', 'Escuintla', 'Alta Verapaz'],
      officialNotes: 'Hiperendémico en escuelas y comunidades. Problema de salud escolar masivo en Guatemala. Las brigadas del MSPAS y programas de salud escolar coordinan desparasitaciones y jornadas de revisión.',
      notificationGroup: 'Vigilancia Centinela'
    },
    parasiticStages: [
      {
        id: 'ph-stage-nit-micro',
        stageType: 'huevo',
        name: 'Liendre (Huevo operculado cementado al cabello)',
        biologicalRole: 'Estadio de anclaje de resistencia adherido a la cutícula pilosa',
        isInfectiveStage: false,
        isDiagnosticStage: true,
        morphologyDescription: 'Huevo ovoide nacarado translúcido (0.8 mm) con opérculo apical provisto de poros respiratorios y cementado al tallo capilar.',
        keyDimensions: '0.8 mm por 0.3 mm',
        differentialCharacteristics: ['Adhesión fija con cemento insoluble que no se desprende al soplar (a diferencia de caspa o sebo)', 'Opérculo apical'],
        primaryClinicalSpecimen: 'Biopsia tisular / Músculo',
        identificationMethod: 'Estereomicroscopía o microscopio a 100x',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Liendre de Pediculus humanus con ninfa interior cementada al tallo piloso.',
        stainOrModality: 'Microscopía de campo claro a 100x',
        creditOrSource: 'CDC Public Health Image Library'
      }
    ],
    bibliography: [
      { source: 'American Academy of Pediatrics (AAP)', title: 'Clinical Report: Head Lice', year: '2022', status: 'Verificado' },
      { source: 'Botero D, Restrepo M.', title: 'Parasitosis Humanas (6ª Ed.) - Pediculosis', year: '2019', status: 'Revisado' }
    ],
    lastReviewedDate: '2026-03-24'
  },

  {
    id: 'cryptosporidium-parvum',
    scientificName: 'Cryptosporidium parvum / C. hominis',
    commonName: 'Criptosporidio / Criptosporidiosis',
    category: 'parasito',
    parasiteGroup: 'protozoo',
    reviewStatus: 'Fuentes pendientes de revisión',
    taxonomy: {
      domain: 'Eukaryota',
      phylum: 'Apicomplexa',
      classTaxon: 'Conoidasida',
      orderTaxon: 'Eucoccidiorida',
      family: 'Cryptosporidiidae',
      genus: 'Cryptosporidium',
      species: 'C. parvum'
    },
    morphology: {
      shape: 'Apicomplexa coccidio de localización intracelular pero extracitoplasmática en el borde en cepillo de enterocitos; ooquistes esféricos diminutos ácido-alcohol resistentes.',
      size: 'Ooquiste maduro: 4.0 - 5.0 µm de diámetro',
      arrangement: 'Ooquistes esporulados libres en materia fecal',
      gramStain: 'Tinciones especiales',
      specialStructures: ['Pared ooquística trilaminar rica en lípidos', 'Complejo apical invasivo', 'Propiedad tintorial Ácido-Alcohol Resistente (BAAR fecal)']
    },
    microbiologyCharacteristics: {
      metabolism: 'Reside en una vacuola parasitófora epicelular sobre la membrana apical de los enterocitos',
      cultureMedia: ['No aplica (parásito intracelular obligado)'],
      optimalTemp: '37 °C; ooquistes sobreviven meses en agua fría clorada a 4-15 °C',
      growthTime: 'Multiplicación esquizogónica y gametogónica rápida',
      keyBiochemicalTests: ['Tinción de Ziehl-Neelsen modificada (Kinyoun) o antígeno fecal por ELISA']
    },
    externalAndInternalStructures: [
      'Pared ooquística gruesa resistente al cloro comercial',
      'Cuatro esporozoítos filiformes desnudos en su interior',
      'Cuerpo residual granular central'
    ],
    virulenceFactors: [
      { name: 'Destrucción de microvellosidades intestinales y atrofia', mechanism: 'Provoca acortamiento y atrofia de vellosidades intestinales con hiperplasia de criptas, alterando la absorción osmótica de solutos y agua' },
      { name: 'Activación de secreción activa de cloruro mediada por prostaglandinas', mechanism: 'Induce diarrea secretora masiva similar al cólera, con pérdidas de hasta 10 a 15 litros diarios en pacientes con inmunodeficiencia celular grave (VIH con CD4 < 100/µL)' }
    ],
    reservoir: ['Seres humanos (C. hominis y C. parvum)', 'Ganado vacuno y terneros neonatos (C. parvum reservorio zoonótico primario)'],
    transmissionRoute: [
      'Fecal-oral indirecta: agua potable contaminada o piscinas recreativas (los ooquistes son completamente RESISTENTES A LA CLORACIÓN estándar)',
      'Fecal-oral directa: persona a persona en guarderías y contacto con terneros infectados',
      'Alimentos y ensaladas regadas con aguas residuales'
    ],
    associatedDiseases: [
      {
        name: 'Criptosporidiosis Intestinal en Pacientes Inmunodeprimidos (VIH/SIDA)',
        description: 'Enfermedad definitoria de SIDA (conteo CD4 < 100/µL); causa diarrea acuosa masiva coleriforme intratable con emaciación y deshidratación refractaria.',
        clinicalPresentation: ['Diarrea acuosa profusa no sanguinolenta (hasta 10-15 L/día)', 'Dolor cólico abdominal intenso y náuseas', 'Pérdida ponderal severa y síndrome de desgaste (wasting syndrome)', 'Colangiopatía esclerosante asociada a SIDA (dolor en hipocondrio derecho y fosfatasa alcalina elevada)']
      },
      {
        name: 'Gastroenteritis Aguda Autolimitada en Inmunocompetentes',
        description: 'Diarrea del viajero o brote en guarderías que dura de 10 a 14 días con resolución espontánea.',
        clinicalPresentation: ['Diarrea acuosa autolimitada de 1 a 2 semanas', 'Fiebre de bajo grado y dolor periumbilical']
      }
    ],
    signsAndSymptoms: ['Diarrea acuosa masiva', 'Deshidratación severa y sed intensa', 'Dolor abdominal cólico', 'Caquexia en pacientes con VIH'],
    complications: ['Choque hipovolémico por deshidratación masiva', 'Colangitis esclerosante alitiásica', 'Desnutrición extrema'],
    clinicalSpecimens: ['Heces formadas o líquidas'],
    diagnosticMethods: [
      { method: 'Tinción de Ziehl-Neelsen modificada de Kinyoun en frotis fecal', standardRole: 'Gold Standard', keyFindings: 'Identificación de ooquistes esféricos pequeños de 4-5 µm de color rojo fucsia brillante sobre fondo azul celeste (BAAR fecal positivo)' },
      { method: 'ELISA de antígeno fecal o Inmunofluorescencia directa', standardRole: 'Confirmatorio', keyFindings: 'Mayor sensibilidad (> 95%) que la microscopía óptica convencional' }
    ],
    labFindings: ['Hiponatremia, hipopotasemia y acidosis metabólica por pérdidas fecales', 'Recuento de linfocitos CD4 < 100 células/µL en pacientes con VIH'],
    treatment: {
      disclaimer: 'En pacientes con VIH, la medida terapéutica más eficaz para la cura definitiva de la criptosporidiosis es la restitución inmune mediante TARGA (Terapia Antirretroviral de Gran Actividad).',
      firstLine: [
        'En pacientes con VIH: Inicio o reconstitución inmediata del TARGA para elevar el recuento de CD4 > 100-200/µL + Hidratación agresiva oral o IV con reposición electrolítica',
        'Nitazoxanida: 500 mg VO c/12h por 3 días (en inmunocompetentes) o por 14-28 días (en inmunodeprimidos)'
      ],
      alternatives: [
        'Paromomicina: 500 mg VO c/6h por 14 a 21 días (aminoglucósido luminal no absorbible con actividad parcial)'
      ],
      resistanceNotes: 'La nitazoxanida tiene eficacia modesta en pacientes con recuentos de CD4 inferiores a 50 células/µL sin TARGA.'
    },
    prevention: ['Filtración de agua con filtros de poro absoluto < 1 µm o ebullición del agua de beber durante al menos 1 minuto (la cloración NO destruye los ooquistes)', 'Evitar tragar agua en piscinas o parques acuáticos', 'Uso de guantes al manipular heces de terneros y animales de granja'],
    guatemalaRelevance: {
      endemicStatus: 'Endémico',
      priorityLevel: 'Alta',
      departmentsWithHighPrevalence: ['Guatemala (Clínica Familiar Luis Ángel García del Hospital General San Juan de Dios y Unidad de VIH del Hospital Roosevelt)', 'Escuintla', 'Quetzaltenango', 'Izabal'],
      officialNotes: 'Endémico y oportunista mayor en unidades de atención integral a personas con VIH. Causa primaria de diarrea crónica de ingreso hospitalario en pacientes con diagnóstico tardío de VIH/SIDA en Guatemala.',
      notificationGroup: 'Notificación Semanal'
    },
    parasiticStages: [
      {
        id: 'cp-stage-oocyst-micro',
        stageType: 'ooquiste',
        name: 'Ooquiste esférico ácido-alcohol resistente (BAAR fecal)',
        biologicalRole: 'Forma esporulada infectante ambiental eliminada en heces resistente al cloro',
        isInfectiveStage: true,
        isDiagnosticStage: true,
        morphologyDescription: 'Ooquiste diminuto esférico (4-5 µm) teñido de rojo fucsia magenta brillante con pared quística lipídica refractaria sobre fondo azul.',
        keyDimensions: '4.0 - 5.0 µm',
        differentialCharacteristics: ['Ácido-alcohol resistencia positiva que lo diferencia de levaduras y otros parásitos entéricos', 'Tamaño de 4-5 µm (Cyclospora mide 8-10 µm)'],
        primaryClinicalSpecimen: 'Heces formadas / pastosas',
        identificationMethod: 'Tinción de Kinyoun modificada a 1000x',
        visualRepresentationType: 'microfotografia_real'
      }
    ],
    imagery: [
      {
        type: 'microfotografia_real',
        caption: 'Ooquistes ácido-alcohol resistentes de Cryptosporidium teñidos de fucsia en frotis fecal con Kinyoun.',
        stainOrModality: 'Tinción de Kinyoun modificada (1000x)',
        creditOrSource: 'CDC DPDx Parasite Image Library'
      }
    ],
    bibliography: [
      { source: 'CDC DPDx', title: 'Laboratory Identification of Parasites: Cryptosporidiosis', year: '2024', status: 'Revisado' },
      { source: 'Mandell, Douglas, and Bennett’s', title: 'Principles and Practice of Infectious Diseases (9th Ed.) - Cryptosporidiosis', year: '2020', status: 'Revisado' }
    ],
    lastReviewedDate: '2026-03-24'
  }
];

