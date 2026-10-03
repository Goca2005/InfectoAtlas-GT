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
  }
];
