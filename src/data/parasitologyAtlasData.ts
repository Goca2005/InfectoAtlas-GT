import { AtlasParasiteStage } from '../types/microscopyAtlas';

export const PARASITOLOGY_ATLAS_STAGES: AtlasParasiteStage[] = [
  // ==========================================
  // 1. PLASMODIUM VIVAX (Protozoo - Apicomplexa)
  // ==========================================
  {
    id: 'pv-stage-ring',
    microorganismId: 'plasmodium-vivax',
    scientificName: 'Plasmodium vivax',
    commonName: 'Paludismo / Malaria terciana',
    parasiteGroup: 'protozoo',
    specificTaxonDetail: 'Apicomplexa hemoflagelado intraeritrocítico',
    stageType: 'trofozoito',
    stageName: 'Trofozoíto joven en anillo',
    biologicalRole: 'Fase intraeritrocítica inicial que invade selectivamente reticulocitos y metaboliza hemoglobina',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Citoplasma fino teñido de azul en forma de anillo con un núcleo prominente de cromatina rojo/púrpura excéntrico. Ocupa aproximadamente 1/3 del eritrocito hospedero.',
    differentialCharacteristics: [
      'Eritrocito parasitado aumentado de tamaño (reticulocito) en comparación con hematíes no parasitados contiguos',
      'Desarrollo gradual del punteado eosinófilo de Schüffner en el estroma del hematíe',
      'A diferencia de P. falciparum, generalmente se observa un solo parásito por eritrocito y rara vez anillos con doble cromatina'
    ],
    approximateDimensions: '1.5 - 2.5 µm de diámetro',
    clinicalSpecimen: 'Sangre capilar periférica (Gota gruesa y frotis)',
    diagnosticMethod: 'Frotis delgado y gota gruesa fijada y teñida',
    stainUsed: 'Tinción de Giemsa (amortiguador pH 7.2)',
    specificMicroscopicFindings: [
      'Anillo citoplasmático azul celeste con punto de cromatina rojo rubí bien definido',
      'Reticulocito hospedero pálido y claramente hipertrofiado',
      'Finos gránulos rosados de Schüffner visibles con tinción óptima a 1000x'
    ],
    associatedDisease: 'Malaria / Paludismo terciario benigno',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Trofozoíto en anillo de Plasmodium vivax dentro de un reticulocito agrandado con punteado incipiente.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público / Uso educativo gubernamental CDC',
      magnificationOrScale: '1000x inmersión en aceite',
      observationMethod: 'Microscopía óptica de campo claro con tinción de Giemsa'
    },
    bibliographicReference: 'CDC DPDx - Laboratory Identification of Parasites: Malaria (Plasmodium vivax), 2024.'
  },
  {
    id: 'pv-stage-ameboid',
    microorganismId: 'plasmodium-vivax',
    scientificName: 'Plasmodium vivax',
    commonName: 'Paludismo / Malaria terciana',
    parasiteGroup: 'protozoo',
    specificTaxonDetail: 'Apicomplexa hemoflagelado intraeritrocítico',
    stageType: 'trofozoito',
    stageName: 'Trofozoíto maduro ameboide',
    biologicalRole: 'Forma vegetativa de alta actividad fagocítica que deforma el eritrocito y acumula pigmento hemozoína',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Citoplasma intensamente irregular, pleomórfico y con abundantes prolongaciones ameboides móviles en vida. Contiene gránulos de pigmento malárico (hemozoína) pardo-dorado.',
    differentialCharacteristics: [
      'Aspecto ameboide muy deshilachado característico y patognomónico de P. vivax',
      'Eritrocito parasitado muy agrandado y pálido con punteado de Schüffner manifiesto y abundante',
      'P. falciparum NO suele presentar trofozoítos ameboides maduros en sangre periférica por secuestro vascular profundo'
    ],
    approximateDimensions: 'Ocupa de 1/2 a 2/3 del eritrocito distendido (6 - 8 µm)',
    clinicalSpecimen: 'Sangre capilar periférica (Gota gruesa y frotis)',
    diagnosticMethod: 'Frotis de sangre periférica',
    stainUsed: 'Tinción de Giemsa o Wright',
    specificMicroscopicFindings: [
      'Citoplasma azul extendido en lazos ameboides irregulares dentro del hematíe',
      'Pigmento hemozoína marrón oscuro agrupado en finos gránulos dispersos',
      'Punteado de Schüffner denso tiñéndose de color rojo/rosa en todo el citoplasma del hematíe'
    ],
    associatedDisease: 'Malaria por Plasmodium vivax',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Trofozoíto ameboide maduro de Plasmodium vivax con vacuolas y pigmento malárico en frotis delgado.',
      sourceName: 'CDC DPDx / Dr. Mae Melvin',
      sourceLicenseOrPermit: 'Dominio público institucional',
      magnificationOrScale: '1000x',
      observationMethod: 'Microscopía de inmersión en aceite'
    },
    bibliographicReference: 'Botero D, Restrepo M. Parasitosis Humanas (6ª Ed.) - Malaria, 2019.'
  },
  {
    id: 'pv-stage-schizont',
    microorganismId: 'plasmodium-vivax',
    scientificName: 'Plasmodium vivax',
    commonName: 'Paludismo / Malaria terciana',
    parasiteGroup: 'protozoo',
    specificTaxonDetail: 'Apicomplexa hemoflagelado intraeritrocítico',
    stageType: 'esquizonte',
    stageName: 'Esquizonte maduro segmentado',
    biologicalRole: 'Estadio de esquizogonia eritrocitaria cuya rotura sincrónica libera merozoítos provocando el paroxismo febril',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Masa multinucleada que contiene de 12 a 24 merozoítos individuales (en promedio 16), cada uno compuesto por un punto de cromatina rojo y citoplasma azul, con pigmento de hemozoína condensado en una o dos masas centrales.',
    differentialCharacteristics: [
      'Contiene entre 12 y 24 merozoítos (P. malariae suele contener de 6 a 12 dispuestos en roseta o margarita regular)',
      'Eritrocito parasitado muy distendido y casi invisible en su borde'
    ],
    approximateDimensions: '9 - 10 µm de diámetro',
    clinicalSpecimen: 'Sangre capilar periférica (Gota gruesa y frotis)',
    diagnosticMethod: 'Gota gruesa y frotis delgado con Giemsa',
    stainUsed: 'Tinción de Giemsa',
    specificMicroscopicFindings: [
      'Conglomerado de 12 a 24 núcleos purpúreos rodeados de halo citoplasmático azul',
      'Masa de pigmento hemozoína pardo oscuro compactada en el centro o periferia del esquizonte'
    ],
    associatedDisease: 'Paroxismo palúdico agudo terciario',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Esquizonte maduro de Plasmodium vivax con merozoítos completamente formados y masa central de pigmento.',
      sourceName: 'CDC Public Health Image Library (PHIL)',
      sourceLicenseOrPermit: 'Uso libre educativo gubernamental',
      magnificationOrScale: '1000x',
      observationMethod: 'Microscopía óptica de inmersión'
    },
    bibliographicReference: 'MSPAS Guatemala - Departamento de Epidemiología / Plan Malaria 2021-2025.'
  },

  // ==========================================
  // 2. PLASMODIUM FALCIPARUM (Protozoo - Apicomplexa)
  // ==========================================
  {
    id: 'pf-stage-ring',
    microorganismId: 'plasmodium-falciparum',
    scientificName: 'Plasmodium falciparum',
    commonName: 'Paludismo por falciparum / Malaria terciana maligna',
    parasiteGroup: 'protozoo',
    specificTaxonDetail: 'Apicomplexa hemoflagelado intraeritrocítico',
    stageType: 'trofozoito',
    stageName: 'Trofozoíto en anillo delicado',
    biologicalRole: 'Forma circulante inicial con alta parasitemia e invasión de eritrocitos de todas las edades',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Anillos muy pequeños, delgados y delicados (ocupan apenas 1/5 o 1/6 del eritrocito). Frecuentemente presentan dos núcleos de cromatina (doble cromatina o "anillo con audífonos") y formas marginales o adosadas a la membrana (formes appliquées).',
    differentialCharacteristics: [
      'Eritrocito parasitado de tamaño NORMAL (no está agrandado)',
      'Alta parasitemia con frecuencia de poli-infección (múltiples anillos en un solo hematíe: 2 a 4 anillos)',
      'Ausencia total de punteado de Schüffner; en frotis bien teñidos pueden observarse manchas basófilas irregulares llamadas hendiduras de Maurer',
      'En sangre periférica sólo se observan anillos jóvenes y gametocitos; los esquizontes están secuestrados en la microvasculatura profunda'
    ],
    approximateDimensions: '1.0 - 1.5 µm de diámetro',
    clinicalSpecimen: 'Sangre capilar periférica (Gota gruesa y frotis)',
    diagnosticMethod: 'Frotis sanguíneo delgado y gota gruesa con Giemsa',
    stainUsed: 'Tinción de Giemsa (pH 7.2)',
    specificMicroscopicFindings: [
      'Múltiples anillos finos y tenues dispersos en hematíes de tamaño normal',
      'Puntos de cromatina dobles en una proporción significativa de los anillos',
      'Formas aplicadas en el borde celular eritrocitario'
    ],
    associatedDisease: 'Malaria grave por P. falciparum / Malaria cerebral',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Trofozoítos en anillo delicados de Plasmodium falciparum con presencia de poli-infección en eritrocitos de tamaño normal.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '1000x',
      observationMethod: 'Microscopía de campo claro con Giemsa'
    },
    bibliographicReference: 'World Health Organization (WHO) - Guidelines for malaria, 2023.'
  },
  {
    id: 'pf-stage-gametocyte',
    microorganismId: 'plasmodium-falciparum',
    scientificName: 'Plasmodium falciparum',
    commonName: 'Paludismo por falciparum',
    parasiteGroup: 'protozoo',
    specificTaxonDetail: 'Apicomplexa hemoflagelado intraeritrocítico',
    stageType: 'gametocito',
    stageName: 'Gametocito en semiluna (Crescéntico)',
    biologicalRole: 'Estadio sexual maduro infeccioso para el mosquito vector Anopheles durante la hematofagia',
    isInfectiveStage: true,
    isDiagnosticStage: true,
    detailedMorphology: 'Forma patognomónica extraordinariamente característica en semiluna, hoz, salchicha o plátano. El eritrocito hospedero se deforma y queda como una membrana tenue apenas visible en el borde cóncavo.',
    differentialCharacteristics: [
      'Forma semilunar o falciforme única entre los parásitos maláricos humanos (todos los demás Plasmodium tienen gametocitos esféricos)',
      'Macrogametocito (femenino): más alargado y delgado, cromatina compacta central y pigmento agrupado',
      'Microgametocito (masculino): más grueso con extremos más redondeados, cromatina y pigmento más dispersos'
    ],
    approximateDimensions: '9 - 14 µm de longitud por 2 - 3 µm de ancho',
    clinicalSpecimen: 'Sangre capilar periférica (Gota gruesa y frotis)',
    diagnosticMethod: 'Frotis de sangre periférica y gota gruesa',
    stainUsed: 'Tinción de Giemsa',
    specificMicroscopicFindings: [
      'Célula falciforme incurvada con citoplasma azul celeste y masa central de cromatina roja',
      'Gránulos de hemozoína condensados de color café oscuro alrededor del núcleo',
      'Resto membranoso del eritrocito acompañando la concavidad del parásito'
    ],
    associatedDisease: 'Malaria por P. falciparum (transmisibilidad vectorial)',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Gametocito en semiluna característico de Plasmodium falciparum en frotis de sangre periférica.',
      sourceName: 'CDC DPDx / Dr. Mae Melvin',
      sourceLicenseOrPermit: 'Dominio público institucional',
      magnificationOrScale: '1000x',
      observationMethod: 'Tinción de Giemsa en frotis fino'
    },
    bibliographicReference: 'CDC DPDx - Plasmodium falciparum, Laboratory Identification, 2024.'
  },

  // ==========================================
  // 3. ENTAMOEBA HISTOLYTICA (Protozoo - Ameba)
  // ==========================================
  {
    id: 'eh-stage-cyst',
    microorganismId: 'entamoeba-histolytica',
    scientificName: 'Entamoeba histolytica',
    commonName: 'Amiba disentérica',
    parasiteGroup: 'protozoo',
    specificTaxonDetail: 'Ameba entérica parásita invasora',
    stageType: 'quiste',
    stageName: 'Quiste tetranucleado maduro',
    biologicalRole: 'Forma de resistencia ambiental e infectante para el ser humano transmitida por vía fecal-oral',
    isInfectiveStage: true,
    isDiagnosticStage: true,
    detailedMorphology: 'Quiste esférico u ovalado con pared quística delgada refringente. El quiste maduro contiene exactamente 4 núcleos pequeños. Cada núcleo posee un cariosoma diminuto estrictamente central y cromatina periférica fina distribuida uniformemente.',
    differentialCharacteristics: [
      'El quiste maduro posee hasta 4 núcleos (Entamoeba coli tiene quistes más grandes con hasta 8 núcleos y cariosoma excéntrico)',
      'Presencia de cuerpos cromatoidales con extremos romos redondeados en forma de cigarro o habano en quistes jóvenes (E. coli los tiene astillados en aguja)',
      'NOTA CRÍTICA DE LABORATORIO: La microscopía óptica NO distingue Entamoeba histolytica de la especie no patógena Entamoeba dispar ni de E. moshkovskii (requiere PCR o ELISA de antígeno fecal Gal/GalNAc)'
    ],
    approximateDimensions: '10 - 15 µm de diámetro',
    clinicalSpecimen: 'Heces formadas / pastosas',
    diagnosticMethod: 'Examen coproparasitoscópico de concentración con Lugol',
    stainUsed: 'Solución de Lugol parasitológico / Hematoxilina férrica',
    specificMicroscopicFindings: [
      'Esfera perfecta amarillenta con pared refringente',
      '1 a 4 núcleos visibles con enfoque micrométrico alternante',
      'Cariosoma puntual perfectamente central y cromatina periférica delicada en anillo regular'
    ],
    associatedDisease: 'Amebiasis intestinal asintomática o colonizadora',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Quiste de Entamoeba histolytica/dispar teñido con Lugol mostrando los núcleos característicos con cariosoma central.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '1000x',
      observationMethod: 'Microscopía óptica de campo claro con Lugol'
    },
    bibliographicReference: 'Botero D, Restrepo M. Parasitosis Humanas (6ª Ed.) - Amebiasis, 2019.'
  },
  {
    id: 'eh-stage-trophozoite',
    microorganismId: 'entamoeba-histolytica',
    scientificName: 'Entamoeba histolytica',
    commonName: 'Amiba disentérica',
    parasiteGroup: 'protozoo',
    specificTaxonDetail: 'Ameba entérica parásita invasora',
    stageType: 'trofozoito',
    stageName: 'Trofozoíto invasor con eritrofagocitosis',
    biologicalRole: 'Estadio móvil invasor de la pared cólica causante de las úlceras en botón de camisa y absceso hepático',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Célula ameboide pleomórfica de gran actividad locomotora unidireccional mediada por pseudópodos digitiformes hialinos transparentes (ectoplasma). Citoplasma granular con un único núcleo y glóbulos rojos fagocitados.',
    differentialCharacteristics: [
      'ERITROFAGOCITOSIS: Presencia de eritrocitos fagocitados en el endoplasma, criterio PATOGNOMÓNICO que permite diferenciar con certeza microscópica E. histolytica de la comensal E. dispar en frotis directo',
      'Un único núcleo con cariosoma central y cromatina fina regular',
      'Muestra de heces debe examinarse antes de 30-45 minutos tras la emisión para observar la motilidad'
    ],
    approximateDimensions: '20 - 40 µm (forma magna invasiva)',
    clinicalSpecimen: 'Heces diarreicas con moco y sangre',
    diagnosticMethod: 'Examen directo en fresco con solución salina al 0.9% a 37 °C',
    stainUsed: 'Solución salina fisiológica al 0.9% y tinción tricrómica',
    specificMicroscopicFindings: [
      'Movilidad activa y direccional con emisión rápida de pseudópodos claros',
      'Inclusiones esféricas intracitoplasmáticas correspondientes a hematíes digeridos de color amarillento a rosado',
      'Fondo microscópico con abundantes glóbulos rojos libres y escasos leucocitos intactos (lisis leucocitaria)'
    ],
    associatedDisease: 'Disentería amebiana aguda / Colitis amebiana invasora',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Trofozoíto de Entamoeba histolytica con múltiples eritrocitos ingeridos en su endoplasma en muestra disentérica.',
      sourceName: 'CDC Public Health Image Library',
      sourceLicenseOrPermit: 'Dominio público',
      magnificationOrScale: '1000x',
      observationMethod: 'Microscopía directa en fresco y tinción tricrómica'
    },
    bibliographicReference: 'CDC DPDx - Amebiasis, Laboratory Diagnosis, 2024.'
  },

  // ==========================================
  // 4. GIARDIA DUODENALIS (Protozoo - Flagelado)
  // ==========================================
  {
    id: 'gd-stage-cyst',
    microorganismId: 'giardia-duodenalis',
    scientificName: 'Giardia duodenalis',
    commonName: 'Giardia / Giardia lamblia',
    parasiteGroup: 'protozoo',
    specificTaxonDetail: 'Flagelado intestinal diplomonádido',
    stageType: 'quiste',
    stageName: 'Quiste ovalado maduro',
    biologicalRole: 'Forma infectante ambiental de resistencia transmitida por agua o alimentos contaminados',
    isInfectiveStage: true,
    isDiagnosticStage: true,
    detailedMorphology: 'Quiste ovalado o elipsoidal con pared quística gruesa, lisa y muy refringente. El quiste maduro contiene 4 núcleos vesiculares pequeños agrupados frecuentemente en uno de los polos. En el citoplasma se observan restos de axonemas longitudinales en forma de filamentos curvados ("S" o "V") y cuerpos parabasales.',
    differentialCharacteristics: [
      'Forma netamente ovalada (no esférica como Entamoeba)',
      'Presencia de axonemas internos que cruzan el quiste longitudinalmente',
      'Pared quística separada del citoplasma por un halo claro característico por retracción fijativa'
    ],
    approximateDimensions: '8 - 12 µm de longitud por 7 - 10 µm de ancho',
    clinicalSpecimen: 'Heces formadas / pastosas',
    diagnosticMethod: 'Examen coproparasitoscópico seriado por concentración con Lugol',
    stainUsed: 'Lugol parasitológico',
    specificMicroscopicFindings: [
      'Estructuras ovaladas de color amarillo parduzco con pared nítida brillante',
      '4 núcleos visibles mediante enfoque fino',
      'Línea media fibrilar refractaria correspondiente al axonema'
    ],
    associatedDisease: 'Giardiasis intestinal crónica / Síndrome de mala absorción',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Quiste ovalado de Giardia duodenalis teñido con Lugol mostrando los núcleos y filamentos flagelares internos.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '1000x',
      observationMethod: 'Microscopía de campo claro con Lugol'
    },
    bibliographicReference: 'Botero D, Restrepo M. Parasitosis Humanas (6ª Ed.) - Giardiasis, 2019.'
  },
  {
    id: 'gd-stage-trophozoite',
    microorganismId: 'giardia-duodenalis',
    scientificName: 'Giardia duodenalis',
    commonName: 'Giardia lamblia',
    parasiteGroup: 'protozoo',
    specificTaxonDetail: 'Flagelado intestinal diplomonádido',
    stageType: 'trofozoito',
    stageName: 'Trofozoíto piriforme en cometa',
    biologicalRole: 'Forma vegetativa móvil que se adhiere mediante su disco suctorio ventral a las microvellosidades del duodeno y yeyuno',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Forma piriforme en gota o cometa, aplanada dorsoventralmente, convexa en dorso y cóncava ventralmente donde se ubica el disco suctorio. Posee simetría bilateral estricta, 2 núcleos ovoides simétricos con cariosoma central (apariencia de ojos o gafas), axostilo medial y 4 pares de flagelos.',
    differentialCharacteristics: [
      'Morfología sumamente característica con aspecto de "cara de payaso" o "máscara"',
      'Motilidad en examen en fresco: movimiento rotatorio oscilante y lento "en caída de hoja seca"',
      'Solo se encuentra en heces líquidas diarreicas recién emitidas o aspirado duodenal; se destruye rápidamente en el medio ambiente'
    ],
    approximateDimensions: '10 - 15 µm de largo por 6 - 8 µm de ancho',
    clinicalSpecimen: 'Heces diarreicas con moco y sangre',
    diagnosticMethod: 'Examen directo en fresco con solución salina y aspirado duodenal (Enterotest)',
    stainUsed: 'Solución salina isotónica al 0.9% / Tinción de Giemsa',
    specificMicroscopicFindings: [
      'Célula piriforme que rota sobre su eje longitudinal en frotis fresco',
      'Dos núcleos prominentes visibles a cada lado de la línea media',
      'Ausencia de fagocitosis de hematíes (absorbe nutrientes por pinocitosis en microvellosidades)'
    ],
    associatedDisease: 'Diarrea esteatorreica aguda / Giardiasis aguda',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Trofozoíto de Giardia duodenalis mostrando el disco ventral y los dos núcleos simétricos característicos.',
      sourceName: 'CDC Public Health Image Library / Dr. Stan Erlandsen',
      sourceLicenseOrPermit: 'Dominio público',
      magnificationOrScale: '1000x',
      observationMethod: 'Microscopía de campo claro'
    },
    bibliographicReference: 'CDC DPDx - Giardiasis, Laboratory Identification, 2024.'
  },

  // ==========================================
  // 5. ASCARIS LUMBRICOIDES (Helminto - Nematodo)
  // ==========================================
  {
    id: 'al-stage-fertilized-egg',
    microorganismId: 'ascaris-lumbricoides',
    scientificName: 'Ascaris lumbricoides',
    commonName: 'Lombriz intestinal / Ascaris',
    parasiteGroup: 'nematodo',
    specificTaxonDetail: 'Geohelminto nematodo intestinal grande',
    stageType: 'huevo',
    stageName: 'Huevo fecundado mamelonado',
    biologicalRole: 'Estadio de resistencia ambiental que madura en suelo húmedo y sombreado hasta convertirse en huevo larvado L2/L3 infectante',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Huevo redondeado u ovoide con una gruesa cubierta protectora formada por tres capas: externa albuminoide muy mamelonada / festoneada de color pardo dorado (teñida por pigmentos biliares), capa media hialina quitinosa gruesa y membrana vitelina interna. En su interior alberga una masa ovular indivisa esférica.',
    differentialCharacteristics: [
      'Aspecto mamelonado externo irregular muy prominente',
      'Pueden presentarse huevos "decorticados" que han perdido la capa albuminoide externa mamelonada, viéndose lisos y transparentes pero con pared gruesa',
      'Huevo fecundado esférico/ovoide a diferencia del infecundo que es más alargado y asimétrico'
    ],
    approximateDimensions: '45 - 75 µm de longitud por 35 - 50 µm de ancho',
    clinicalSpecimen: 'Heces formadas / pastosas',
    diagnosticMethod: 'Examen coproparasitoscópico directo y de concentración (Faust o Ritchie)',
    stainUsed: 'Solución salina o Lugol parasitológico',
    specificMicroscopicFindings: [
      'Cáscara exterior intensamente marrón dorada con mamelones globosos',
      'Capa media refringente incolora muy nítida',
      'Masa de células germinales centrales densa y redondeada no segmentada'
    ],
    associatedDisease: 'Ascariasis intestinal / Malnutrición / Obstrucción intestinal mecánica',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Huevo fecundado mamelonado típico de Ascaris lumbricoides en preparación coprológica directa.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '400x',
      observationMethod: 'Microscopía óptica de campo claro'
    },
    bibliographicReference: 'Botero D, Restrepo M. Parasitosis Humanas (6ª Ed.) - Ascariasis, 2019.'
  },
  {
    id: 'al-stage-unfertilized-egg',
    microorganismId: 'ascaris-lumbricoides',
    scientificName: 'Ascaris lumbricoides',
    commonName: 'Ascaris lumbricoides',
    parasiteGroup: 'nematodo',
    specificTaxonDetail: 'Geohelminto nematodo intestinal grande',
    stageType: 'huevo',
    stageName: 'Huevo infecundo (No embrionado)',
    biologicalRole: 'Huevo eliminado por hembras no fecundadas en ausencia de machos o al inicio de la oviposición; no evoluciona a estadio infectante',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Huevo notablemente más largo, estrecho y alargado que el fecundado. Pared mucho más delgada con mamelones pequeños e irregulares. El contenido interior está completamente lleno de gránulos refringentes amorfos y desorganizados.',
    differentialCharacteristics: [
      'Forma alargada elipsoide y tamaño considerablemente mayor que el huevo fecundado',
      'Contenido granular amorfo sin masa celular esférica organizada',
      'No tiene capacidad biológica para infectar ni madurar en tierra'
    ],
    approximateDimensions: '85 - 95 µm de longitud por 40 - 45 µm de ancho',
    clinicalSpecimen: 'Heces formadas / pastosas',
    diagnosticMethod: 'Examen coproparasitoscópico de sedimentación',
    stainUsed: 'Lugol parasitológico',
    specificMicroscopicFindings: [
      'Silueta alargada y a menudo incurvada',
      'Cáscara irregular con mamelones aplanados o escasos',
      'Relleno interno de glóbulos refringentes sin espacio semilunar perivitelino'
    ],
    associatedDisease: 'Ascariasis intestinal monosexual femenina',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Huevo infecundo de Ascaris lumbricoides con forma alargada y contenido granular amorfo.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '400x',
      observationMethod: 'Microscopía de campo claro'
    },
    bibliographicReference: 'CDC DPDx - Ascariasis, Laboratory Diagnosis, 2024.'
  },

  // ==========================================
  // 6. ENTEROBIUS VERMICULARIS (Helminto - Nematodo)
  // ==========================================
  {
    id: 'ev-stage-egg',
    microorganismId: 'enterobius-vermicularis',
    scientificName: 'Enterobius vermicularis',
    commonName: 'Oxiuro / Pidulle / Lombriz infantil',
    parasiteGroup: 'nematodo',
    specificTaxonDetail: 'Nematodo oxiúrido perianal',
    stageType: 'huevo',
    stageName: 'Huevo plano-convexo embrionado en forma de "D"',
    biologicalRole: 'Estadio infectante casi inmediato (madura en 4 a 6 horas en la región perianal oxigenada) transmitido por vía fecal-oral o fómites',
    isInfectiveStage: true,
    isDiagnosticStage: true,
    detailedMorphology: 'Huevo característicamente asimétrico con una cara aplanada y la otra marcadamente convexa, otorgándole un perfil inconfundible en forma de letra "D". Cáscara lisa, doble, delgada, incolora y transparente. En el momento de la puesta contiene una larva casi completamente formada (larva giriniforme).',
    differentialCharacteristics: [
      'Forma asimétrica plano-convexa en "D" patognomónica',
      'Cáscara perfectamente transparente y lisa (a diferencia de Ascaris que es rugosa y parda)',
      'MUESTRA DE ELECCIÓN OBLIGATORIA: Técnica de Graham (cinta adhesiva perianal transparente al despertar sin aseo previo). En coprológico rutinario de heces el rendimiento es < 5-10% porque las hembras migran a depositar los huevos en los márgenes del ano'
    ],
    approximateDimensions: '50 - 60 µm de longitud por 20 - 30 µm de ancho',
    clinicalSpecimen: 'Cinta adhesiva perianal (Técnica de Graham)',
    diagnosticMethod: 'Técnica de la cinta engomada transparente de Graham montada sobre portaobjetos',
    stainUsed: 'Ninguna (preparación transparente con una gota de xilol o tolueno si hay burbujas)',
    specificMicroscopicFindings: [
      'Estructuras elípticas en "D" transparentes adheridas a la cinta adhesiva',
      'Doble membrana lisa nítida refringente',
      'Larva replegada visible en el interior de la mayoría de los huevos'
    ],
    associatedDisease: 'Oxiuriasis / Enterobiasis (Prurito anal y nasal nocturno, insomnio, bruxismo)',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Huevo en forma de "D" plano-convexo de Enterobius vermicularis obtenido mediante cinta adhesiva perianal.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '400x',
      observationMethod: 'Cinta engomada directa bajo microscopio de campo claro'
    },
    bibliographicReference: 'Botero D, Restrepo M. Parasitosis Humanas (6ª Ed.) - Oxiuriasis, 2019.'
  },

  // ==========================================
  // 7. TAENIA SOLIUM & TAENIA SAGINATA (Helmintos - Cestodos)
  // ==========================================
  {
    id: 'ts-stage-egg-general',
    microorganismId: 'taenia-solium',
    scientificName: 'Taenia solium / Taenia saginata',
    commonName: 'Huevo de Tenia / Solitaria',
    parasiteGroup: 'cestodo',
    specificTaxonDetail: 'Céstodo taeniidae de humanos y ganado',
    stageType: 'huevo',
    stageName: 'Huevo embrionado con corteza radiada (Taenia sp.)',
    biologicalRole: 'Estadio de resistencia infectante para el cerdo/humano (T. solium: causa cisticercosis) o para el vacuno (T. saginata)',
    isInfectiveStage: true,
    isDiagnosticStage: true,
    detailedMorphology: 'Huevo esférico o ligeramente ovalado provisto de una gruesa cubierta externa o embrióforo castaño-amarillento intensamente estriado de forma radial en empalizada. En el centro alberga una oncosfera o embrión hexacanto dotado de tres pares de ganchos refringentes.',
    differentialCharacteristics: [
      'ALERTA CLÍNICA Y DE LABORATORIO: La microscopía convencional NO permite distinguir los huevos de Taenia solium de los de Taenia saginata. El reporte de laboratorio DEBE emitirse estrictamente como "Huevos de Taenia sp."',
      'La diferenciación de especie exige examinar el escólex o contar las ramas uterinas de las proglótides grávidas maduras expulsadas',
      'Si se trata de Taenia solium, el huevo es directamente infectante para el humano si se ingiere por vía fecal-oral, pudiendo producir NEUROCISTICERCOSIS'
    ],
    approximateDimensions: '31 - 43 µm de diámetro',
    clinicalSpecimen: 'Heces formadas / pastosas',
    diagnosticMethod: 'Examen coproparasitoscópico de sedimentación o técnica de Graham',
    stainUsed: 'Lugol parasitológico o solución salina',
    specificMicroscopicFindings: [
      'Esfera gruesa parda con estriaciones radiales perfectamente definidas',
      'Embrióforo en rueda de carreta o empalizada',
      'Tres pares de ganchillos quitinosos refringentes en el embrión hexacanto central'
    ],
    associatedDisease: 'Teniasis intestinal humana / Riesgo de Cisticercosis en T. solium',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Huevo de Taenia sp. con embrióforo estriado radialmente y embrión hexacanto interno.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '400x',
      observationMethod: 'Microscopía óptica de campo claro'
    },
    bibliographicReference: 'Garcia HH, et al. Guidelines for the Management of Neurocysticercosis: IDSA / ASTMH, 2018.'
  },
  {
    id: 'ts-stage-proglottid-solium',
    microorganismId: 'taenia-solium',
    scientificName: 'Taenia solium',
    commonName: 'Tenia armada del cerdo',
    parasiteGroup: 'cestodo',
    specificTaxonDetail: 'Céstodo ciclifílido con escólex armado',
    stageType: 'proglotide',
    stageName: 'Proglótide grávida de Taenia solium',
    biologicalRole: 'Segmento maduro terminal estrobilar que almacena entre 30,000 y 50,000 huevos que se desprende pasivamente en las heces',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Segmento aplanado rectangular más largo que ancho (10-12 mm de largo por 5-6 mm de ancho), con útero longitudinal central y de 7 a 12 ramas uterinas principales a cada lado del tronco central, con escasa ramificación secundaria.',
    differentialCharacteristics: [
      'CRITERIO DIFERENCIAL CRÍTICO: Presenta de 7 a 12 ramas uterinas primarias por lado (a diferencia de Taenia saginata que presenta de 15 a 30 ramas finas dicotómicas)',
      'Se eliminan habitualmente en cadenas pasivas de 4 a 6 proglótides con las heces (no migran activamente fuera del esfínter anal)',
      'Poro genital lateral irregularmente alternado'
    ],
    approximateDimensions: '10 - 12 mm de largo por 5 - 6 mm de ancho',
    clinicalSpecimen: 'Heces o fragmentos expulsados espontáneamente',
    diagnosticMethod: 'Aclaramiento y compresión entre dos portaobjetos e inyección uterina de tinta china o hematoxilina',
    stainUsed: 'Inyección retrógrada del poro genital con tinta china o fijación con ácido acético',
    specificMicroscopicFindings: [
      'Tronco uterino central visible con tinta china',
      'Conteo exacto de ramas primarias entre 7 y 12 a cada lado del tallo',
      'Ramas uterinas más gruesas y espaciadas que en T. saginata'
    ],
    associatedDisease: 'Teniasis por Taenia solium',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Proglótide grávida de Taenia solium inyectada con tinta china evidenciando menos de 12 ramas uterinas principales por lado.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: 'Estereomicroscopía / 10x lupa',
      observationMethod: 'Inyección con tinta china entre portaobjetos'
    },
    bibliographicReference: 'Botero D, Restrepo M. Parasitosis Humanas (6ª Ed.) - Teniasis, 2019.'
  },
  {
    id: 'ts-stage-proglottid-saginata',
    microorganismId: 'taenia-saginata',
    scientificName: 'Taenia saginata',
    commonName: 'Tenia inerme del ganado vacuno',
    parasiteGroup: 'cestodo',
    specificTaxonDetail: 'Céstodo ciclifílido con escólex inerme',
    stageType: 'proglotide',
    stageName: 'Proglótide grávida de Taenia saginata',
    biologicalRole: 'Segmento terminal grávido con gran musculatura que migra activamente a través del ano y libera huevos en pastizales',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Segmento rectangular alargado (16-20 mm de largo por 5-7 mm de ancho), con tronco uterino medial densamente ramificado que emite de 15 a 30 ramas primarias por lado, profusamente dicotómicas y finas.',
    differentialCharacteristics: [
      'CRITERIO DIFERENCIAL CLAVE: Presenta de 15 a 30 ramas uterinas principales a cada lado del tronco central (más del doble que T. solium)',
      'Posee movilidad activa: frecuentemente se desprende de forma individual y repta activamente a través del esfínter anal hacia la ropa interior o ropa de cama',
      'NO produce cisticercosis en seres humanos (los humanos no son hospedero intermediario de T. saginata)'
    ],
    approximateDimensions: '16 - 20 mm de largo por 5 - 7 mm de ancho',
    clinicalSpecimen: 'Fragmento móvil expulsado por el ano / Heces',
    diagnosticMethod: 'Aclaramiento y compresión entre dos láminas portaobjetos e inyección con tinta china',
    stainUsed: 'Inyección con tinta china o fijación con formol-ácido acético',
    specificMicroscopicFindings: [
      'Árbol uterino sumamente denso con más de 15 ramificaciones primarias por hemisferio',
      'Ramificaciones dicotómicas delgadas que ocupan casi todo el parénquima',
      'Poro genital lateral prominente'
    ],
    associatedDisease: 'Teniasis por Taenia saginata (infección intestinal benigna)',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Proglótide grávida de Taenia saginata inyectada con tinta china mostrando más de 20 ramas uterinas delgadas dicotómicas.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: 'Estereomicroscopio 10x',
      observationMethod: 'Inyección con tinta china'
    },
    bibliographicReference: 'CDC DPDx - Taeniasis, Laboratory Identification, 2024.'
  },

  // ==========================================
  // 8. STRONGYLOIDES STERCORALIS (Helminto - Nematodo)
  // ==========================================
  {
    id: 'ss-stage-rhabditiform-larva',
    microorganismId: 'strongyloides-stercoralis',
    scientificName: 'Strongyloides stercoralis',
    commonName: 'Estrongiloide / Hilo de tierra',
    parasiteGroup: 'nematodo',
    specificTaxonDetail: 'Nematodo intestinal con ciclo libre y autoinfección',
    stageType: 'larva',
    stageName: 'Larva rabditiforme L1',
    biologicalRole: 'Estadio diagnóstico emitido en la luz intestinal tras la eclosión rápida de huevos en la mucosa yeyunal',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Larva móvil alargada y translúcida. Presenta vestíbulo bucal CORTO (menor que la anchura del extremo anterior de la larva), esófago rabditoide característico (con cuerpo anterior, istmo estrecho y bulbo posterior prominente), y un primordio genital prominente ovoide visible a la mitad del cuerpo.',
    differentialCharacteristics: [
      'HALLAZGO CRÍTICO EN HECES FRESCAS: A diferencia de las uncinarias (Necator americanus y Ancylostoma duodenale) que eliminan HUEVOS en heces recién emitidas, Strongyloides stercoralis elimina LARVAS RABDITIFORMES L1 vivas móviles',
      'Diferenciación con larva rabditiforme de uncinarias (en heces viejas retenidas): la larva de Strongyloides tiene vestíbulo bucal CORTO y primordio genital GRANDE, mientras que la de uncinarias tiene vestíbulo bucal LARGO y primordio genital diminuto e imperceptible'
    ],
    approximateDimensions: '200 - 250 µm de longitud por 16 µm de ancho',
    clinicalSpecimen: 'Heces formadas / pastosas',
    diagnosticMethod: 'Examen coproparasitoscópico directo, método de concentración de Baermann o cultivo en placa de agar',
    stainUsed: 'Lugol parasitológico o montaje directo en solución salina',
    specificMicroscopicFindings: [
      'Larva muy activa reptante en muestra recién evacuada',
      'Canal bucal corto visible a 400x que mide menos de la mitad del ancho de la cabeza',
      'Esófago muscular con doble dilatación (rabditoide)',
      'Primordio genital denso visible a mitad del trayecto intestinal'
    ],
    associatedDisease: 'Estrongiloidiasis intestinal / Diarrea crónica / Síndrome de malabsorción',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Larva rabditiforme L1 de Strongyloides stercoralis mostrando vestíbulo bucal corto y primordio genital prominente.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '400x',
      observationMethod: 'Microscopía óptica directa en solución salina'
    },
    bibliographicReference: 'Botero D, Restrepo M. Parasitosis Humanas (6ª Ed.) - Estrongiloidiasis, 2019.'
  },
  {
    id: 'ss-stage-filariform-larva',
    microorganismId: 'strongyloides-stercoralis',
    scientificName: 'Strongyloides stercoralis',
    commonName: 'Estrongiloide',
    parasiteGroup: 'nematodo',
    specificTaxonDetail: 'Nematodo intestinal con ciclo libre y autoinfección',
    stageType: 'larva',
    stageName: 'Larva filariforme L3 infectante',
    biologicalRole: 'Estadio altamente infectante que penetra activamente la piel intacta del ser humano y media el ciclo de autoinfección interna/externa',
    isInfectiveStage: true,
    isDiagnosticStage: true,
    detailedMorphology: 'Larva muy esbelta y alargada. Presenta esófago filariforme largo y recto que ocupa casi el 40-50% de la longitud corporal total. Su extremo caudal posterior termina en una MUESCA O ESCOTADURA BIFURCADA patognomónica (cola mellada o bífida).',
    differentialCharacteristics: [
      'COLA MELLADA O MUESCA CAUDAL: Característica morfológica reina que la distingue de la larva filariforme de uncinarias (cuya cola termina en punta aguda lisa sin bifurcación)',
      'Esófago largo sin bulbo que abarca la mitad del cuerpo',
      'Puede hallarse en esputo o lavado broncoalveolar en pacientes con síndrome de hiperinfección o estrongiloidiasis diseminada por corticoterapia'
    ],
    approximateDimensions: '500 - 600 µm de longitud por 16 - 20 µm de ancho',
    clinicalSpecimen: 'Esputo / Lavado broncoalveolar',
    diagnosticMethod: 'Microscopía directa de esputo, aspirado duodenal o cultivo de Baermann en heces',
    stainUsed: 'Tinción de Gram, Lugol o solución salina directa',
    specificMicroscopicFindings: [
      'Cuerpo cilíndrico alargado sin vaina envolvente',
      'Esófago cilíndrico uniforme que se extiende hasta la mitad de la larva',
      'Extremo caudal distal bifurcado con muesca nítida visible a 400x'
    ],
    associatedDisease: 'Síndrome de hiperinfección por Strongyloides / Estrongiloidiasis diseminada en inmunodeprimidos',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Extremo caudal de larva filariforme L3 de Strongyloides stercoralis con muesca bifurcada característica.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '1000x',
      observationMethod: 'Microscopía óptica de campo claro'
    },
    bibliographicReference: 'CDC DPDx - Strongyloidiasis, Laboratory Diagnosis, 2024.'
  },

  // ==========================================
  // 9. TRICHURIS TRICHIURA (Helminto - Nematodo)
  // ==========================================
  {
    id: 'tt-stage-egg',
    microorganismId: 'trichuris-trichiura',
    scientificName: 'Trichuris trichiura',
    commonName: 'Tricocéfalo / Gusano látigo',
    parasiteGroup: 'nematodo',
    specificTaxonDetail: 'Geohelminto nematodo adenofóreo intestinal',
    stageType: 'huevo',
    stageName: 'Huevo en barril con tapones polares mucosos',
    biologicalRole: 'Estadio de dispersión y resistencia que madura en suelo sombreado y húmedo hasta formar larva infectante L1',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Huevo elipsoidal de contorno perfectamente simétrico en forma de barril, barrilete o limón. Presenta doble cáscara lisa y gruesa de color castaño-dorado debido a pigmentos biliares, y dos prominentes tapones polares mucosos hialinos, transparentes y refringentes en cada extremo.',
    differentialCharacteristics: [
      'Forma en barril o limón con dos tapones mucosos bipolares hialinos patognomónica e inconfundible',
      'Cáscara doble lisa y marrón amarillenta',
      'En infecciones masivas crónicas infantiles en el área rural de Guatemala produce prolapso rectal, disentería crónica y anemia microcítica'
    ],
    approximateDimensions: '50 - 55 µm de longitud por 22 - 25 µm de ancho',
    clinicalSpecimen: 'Heces formadas / pastosas',
    diagnosticMethod: 'Examen coproparasitoscópico por concentración o frotis directo con Lugol',
    stainUsed: 'Lugol parasitológico o solución salina isotónica',
    specificMicroscopicFindings: [
      'Estructura ovalada simétrica de tonalidad ámbar brillante',
      'Dos protuberancias polares claras refringentes en los extremos longitudinales',
      'Masa germinal densa e indivisa no segmentada en el interior'
    ],
    associatedDisease: 'Tricuriasis / Prolapso rectal / Anemia ferropénica en niños',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Huevo en forma de barril con dos tapones mucosos hialinos de Trichuris trichiura.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '400x',
      observationMethod: 'Microscopía óptica de campo claro con Lugol'
    },
    bibliographicReference: 'Botero D, Restrepo M. Parasitosis Humanas (6ª Ed.) - Tricocefalosis, 2019.'
  },

  // ==========================================
  // 10. TRYPANOSOMA CRUZI (Protozoo - Kinetoplastea)
  // ==========================================
  {
    id: 'tc-stage-trypomastigote',
    microorganismId: 'trypanosoma-cruzi',
    scientificName: 'Trypanosoma cruzi',
    commonName: 'Tripanosoma americano / Mal de Chagas',
    parasiteGroup: 'protozoo',
    specificTaxonDetail: 'Kinetoplastea hemoflagelado tisular',
    stageType: 'tripomastigote',
    stageName: 'Tripomastigote sanguíneo en "C" o "S"',
    biologicalRole: 'Estadio circulante no replicativo en sangre periférica que invade miocardiocitos y células del sistema fagocítico mononuclear',
    isInfectiveStage: true,
    isDiagnosticStage: true,
    detailedMorphology: 'Parásito alargado y fusiforme con una membrana ondulante ancha que recorre el borde celular y un flagelo libre anterior. Presenta un núcleo central ovalado y un CINETOPLASTO subterminal posterior extraordinariamente voluminoso y oscuro. Al fijarse en frotis suele adoptar una silueta clásica en forma de "C", "S" o interrogación.',
    differentialCharacteristics: [
      'Cinetoplasto subterminal MUY GRANDE y prominente (mayor que en Trypanosoma rangeli, parásito no patógeno frecuente en Centroamérica cuyo cinetoplasto es diminuto)',
      'Forma en "C" característica en preparaciones teñidas con Giemsa',
      'Se observa en sangre durante la fase aguda de la Enfermedad de Chagas o reactivación en inmunodeprimidos'
    ],
    approximateDimensions: '20 µm de longitud (rango 16 - 22 µm)',
    clinicalSpecimen: 'Sangre capilar periférica (Gota gruesa y frotis)',
    diagnosticMethod: 'Microscopía directa de frotis fino, gota gruesa teñida con Giemsa o micrométodo de Strout',
    stainUsed: 'Tinción de Giemsa o Wright',
    specificMicroscopicFindings: [
      'Cuerpo azul celeste incurvado en "C" entre los eritrocitos',
      'Núcleo central púrpura rojizo',
      'Gran botón de cinetoplasto teñido de púrpura intenso en el extremo posterior',
      'Membrana ondulante con ribete flagelar libre'
    ],
    associatedDisease: 'Enfermedad de Chagas aguda (Signo de Romaña, chagoma de inoculación)',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Tripomastigote de Trypanosoma cruzi en frotis sanguíneo delgado con cinetoplasto posterior prominente.',
      sourceName: 'CDC Public Health Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '1000x inmersión',
      observationMethod: 'Tinción de Giemsa en frotis fino'
    },
    bibliographicReference: 'MSPAS Guatemala - Programa Nacional de Chagas / OPS Chagas en Centroamérica, 2023.'
  },
  {
    id: 'tc-stage-amastigote',
    microorganismId: 'trypanosoma-cruzi',
    scientificName: 'Trypanosoma cruzi',
    commonName: 'Mal de Chagas',
    parasiteGroup: 'protozoo',
    specificTaxonDetail: 'Kinetoplastea hemoflagelado tisular',
    stageType: 'amastigote',
    stageName: 'Amastigote intracelular en nidos tisulares',
    biologicalRole: 'Estadio replicativo intracelular obligado por fisión binaria en miocardiocitos, músculo liso digestivo y neuronas ganglionares',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Forma esférica u ovalada diminuta carente de flagelo libre visible. En el citoplasma se diferencian con claridad un núcleo esférico y un cinetoplasto en bastoncillo adyacente. Se agrupan densamente en cúmulos intracelulares denominados "nidos de amastigotes".',
    differentialCharacteristics: [
      'Presencia de cinetoplasto en barra que lo diferencia de Toxoplasma gondii o Histoplasma capsulatum',
      'Tropismo estricto por fibras miocárdicas (miocarditis chagásica con arritmias y aneurisma apical) y plexos mientéricos de Auerbach (megacolon, megaesófago)',
      'Requiere biopsia o necropsia; raramente biopsia endomiocárdica'
    ],
    approximateDimensions: '2 - 4 µm de diámetro',
    clinicalSpecimen: 'Biopsia tisular / Músculo',
    diagnosticMethod: 'Corte histológico de miocardio o aspirado tisular teñido con Hematoxilina-Eosina o Giemsa',
    stainUsed: 'Tinción de Hematoxilina y Eosina (H&E) o Giemsa histológico',
    specificMicroscopicFindings: [
      'Fibras miocárdicas distendidas con desorganización de miofibrillas',
      'Nido intracitoplasmático que contiene decenas de pequeños corpúsculos ovoides azulados',
      'Núcleo y cinetoplasto paralelos visibles a 1000x'
    ],
    associatedDisease: 'Miocardiopatía chagásica crónica / Aneurisma ventricular apical',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Nido de amastigotes de Trypanosoma cruzi en fibra cardíaca humana en corte teñido con H&E.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '1000x',
      observationMethod: 'Histopatología con tinción de H&E'
    },
    bibliographicReference: 'American Heart Association (AHA) - Chagas Cardiomyopathy Clinical Statement, 2018.'
  },

  // ==========================================
  // 11. LEISHMANIA SPP. (Protozoo - Kinetoplastea)
  // ==========================================
  {
    id: 'leish-stage-amastigote',
    microorganismId: 'leishmania-braziliensis',
    scientificName: 'Leishmania braziliensis / L. mexicana',
    commonName: 'Leishmaniasis / Úlcera de los chicleros',
    parasiteGroup: 'protozoo',
    specificTaxonDetail: 'Kinetoplastea flagelado intracelular',
    stageType: 'amastigote',
    stageName: 'Amastigote intracelular (Cuerpos de Leishman-Donovan)',
    biologicalRole: 'Estadio replicativo asexual obligado que parasita y prolifera dentro de los fagolisosomas de los macrófagos dérmicos y mucosos',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Corpúsculos redondeados u ovoides sumamente pequeños. Presentan un núcleo redondo y un cinetoplasto en bastón o barra orientado perpendicularmente hacia el núcleo. Se observan empaquetados en gran número dentro del citoplasma de macrófagos o libres tras la rotura celular.',
    differentialCharacteristics: [
      'Presencia simultánea de núcleo y cinetoplasto en forma de bastón (criterio patognomónico que descarta Histoplasma capsulatum, el cual carece de cinetoplasto y se tiñe intensamente con plata de Grocott)',
      'Localización intra e intercelular en frotis por raspado del borde activo de la úlcera cutánea'
    ],
    approximateDimensions: '2 - 3 µm de diámetro',
    clinicalSpecimen: 'Biopsia tisular / Músculo',
    diagnosticMethod: 'Frotis por raspado del borde activo de la úlcera o impronta de biopsia teñida con Giemsa',
    stainUsed: 'Tinción de Giemsa o Wright',
    specificMicroscopicFindings: [
      'Macrófagos tisulares repletos de diminutos cuerpos redondeados con halo claro pericelular',
      'A 1000x se identifica con nitidez el núcleo rojizo y la corta barra de cinetoplasto púrpura oscuro',
      'Infiltrado inflamatorio linfohistiocitario circundante'
    ],
    associatedDisease: 'Leishmaniasis cutánea localizada / Leishmaniasis mucocutánea (espundia en Petén y Alta Verapaz)',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Amastigotes de Leishmania dentro del citoplasma de un macrófago en impronta de úlcera cutánea.',
      sourceName: 'CDC Public Health Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '1000x',
      observationMethod: 'Tinción de Giemsa en frotis directo'
    },
    bibliographicReference: 'MSPAS Guatemala - Manual de Normas y Procedimientos para la Vigilancia y Control de las Leishmaniasis, 2022.'
  },

  // ==========================================
  // 12. UNCINARIAS (Necator americanus & Ancylostoma duodenale)
  // ==========================================
  {
    id: 'unc-stage-egg',
    microorganismId: 'necator-americanus',
    scientificName: 'Necator americanus / Ancylostoma duodenale',
    commonName: 'Uncinarias / Anquilostoma',
    parasiteGroup: 'nematodo',
    specificTaxonDetail: 'Geohelminto nematodo intestinal hematófago',
    stageType: 'huevo',
    stageName: 'Huevo segmentado con blastómeros en cáscara delgada',
    biologicalRole: 'Estadio de dispersión eliminado en heces que eclosiona en tierra sombreada liberando la larva rabditiforme',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Huevo elíptico u ovalado con polos ampliamente redondeados. Cubierta excepcionalmente delgada, lisa, translúcida e incolora. En heces frescas presenta un espacio claro conspicuo entre la cáscara y la masa embrionaria, la cual se encuentra típicamente segmentada en 4 a 8 blastómeros esféricos.',
    differentialCharacteristics: [
      'Cáscara sumamente delgada y transparente que parece dibujada con un lápiz fino',
      'Presencia de blastómeros lobulados visibles (a diferencia del huevo de Ascaris cuya masa es única indivisa y cáscara gruesa mamelonada)',
      'Diferenciación de especie entre Necator y Ancylostoma es imposible por el huevo: se reporta como "Huevos de Uncinaria"'
    ],
    approximateDimensions: '60 - 75 µm de longitud por 35 - 40 µm de ancho',
    clinicalSpecimen: 'Heces formadas / pastosas',
    diagnosticMethod: 'Examen coproparasitoscópico directo con Lugol y técnica cuantitativa de Kato-Katz',
    stainUsed: 'Lugol parasitológico o montaje con solución salina',
    specificMicroscopicFindings: [
      'Óvalo translúcido con pared finísima birrefringente',
      'Espacio libre subcapsular evidente',
      'Racimo central de 4 a 8 células embrionarias redondeadas claras'
    ],
    associatedDisease: 'Uncinariasis / Anemia ferropénica grave hipocrómica microcítica por hematofagia intestinal',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Huevo de uncinaria con cáscara delgada hialina y blastómeros en heces frescas.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '400x',
      observationMethod: 'Microscopía óptica de campo claro'
    },
    bibliographicReference: 'Botero D, Restrepo M. Parasitosis Humanas (6ª Ed.) - Uncinariasis, 2019.'
  },

  // ==========================================
  // 13. HYMENOLEPIS NANA (Helminto - Cestodo)
  // ==========================================
  {
    id: 'hn-stage-egg',
    microorganismId: 'hymenolepis-nana',
    scientificName: 'Hymenolepis nana',
    commonName: 'Tenia enana',
    parasiteGroup: 'cestodo',
    specificTaxonDetail: 'Céstodo ciclifílido de ciclo directo e indirecto',
    stageType: 'huevo',
    stageName: 'Huevo esférico con filamentos polares refringentes',
    biologicalRole: 'Estadio inmediatamente infectante por ingestión fecal-oral que puede desencadenar autoinfección interna en el íleon',
    isInfectiveStage: true,
    isDiagnosticStage: true,
    detailedMorphology: 'Huevo esférico o ligeramente ovalado provisto de dos membranas envolventes: una cáscara externa delgada, lisa e incolora, y una membrana interna o embrióforo que protege a la oncosfera (embrión con 6 ganchos). De los dos mamelones o botones en los polos de la membrana interna nacen de 4 a 8 filamentos polares ondulantes que se extienden por el espacio intermembranoso.',
    differentialCharacteristics: [
      'FILAMENTOS POLARES INTERMEMBRANOSOS: Criterio morfológico patognomónico que lo distingue de Hymenolepis diminuta (el cual es más grande y carece de filamentos polares)',
      'Embrión hexacanto central con 6 ganchos quitinosos nítidos',
      'Céstodo más común en niños en edad escolar en Guatemala'
    ],
    approximateDimensions: '30 - 47 µm de diámetro',
    clinicalSpecimen: 'Heces formadas / pastosas',
    diagnosticMethod: 'Examen coproparasitoscópico directo con Lugol y método de Faust (flotación con sulfato de zinc)',
    stainUsed: 'Lugol parasitológico',
    specificMicroscopicFindings: [
      'Esfera transparente y hialina de doble contorno',
      'Espacio intermembranoso amplio cruzado por delgados filamentos filiformes',
      'Oncósfera central con tres pares de ganchos refringentes en abanico'
    ],
    associatedDisease: 'Himenolepiasis (dolor periumbilical, meteorismo, diarrea periódica y eosinofilia)',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Huevo esférico de Hymenolepis nana mostrando filamentos polares y ganchos de la oncosfera.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '400x',
      observationMethod: 'Microscopía óptica de campo claro'
    },
    bibliographicReference: 'CDC DPDx - Hymenolepiasis, Laboratory Diagnosis, 2024.'
  },

  // ==========================================
  // 14. FASCIOLA HEPATICA (Helminto - Trematodo)
  // ==========================================
  {
    id: 'fh-stage-egg',
    microorganismId: 'fasciola-hepatica',
    scientificName: 'Fasciola hepatica',
    commonName: 'Duela del hígado / Pirigüey',
    parasiteGroup: 'trematodo',
    specificTaxonDetail: 'Trematodo digeneo hermafrodita biliar',
    stageType: 'huevo',
    stageName: 'Huevo elipsoidal gigante operculado',
    biologicalRole: 'Estadio diagnóstico eliminado por vía biliar hacia las heces que requiere madurar en agua dulce para liberar el miracidio',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Huevo de dimensiones excepcionalmente grandes (uno de los huevos helmínticos más voluminosos de la medicina humana). Posee forma elipsoidal u ovoide simétrica con una cáscara lisa teñida de color pardo-dorado amarillento por pigmentos biliares. En uno de los polos presenta un opérculo o tapadera nítida delimitada por una línea de fractura transversal.',
    differentialCharacteristics: [
      'Tamaño gigante (130-150 µm) que supera con creces a cualquier huevo de nematodo o cestodo',
      'Presencia de OPÉRCULO polar evidente (frecuentemente entreabierto o desprendido)',
      'Masa interna celular amarillenta no segmentada al momento de la evacuación',
      'PRECAUCIÓN DE LABORATORIO: Descartar "fascioliasis espuria" por ingestión previa de hígado de res o carnero parasitado (repetir examen tras 3 días de dieta estricta sin vísceras)'
    ],
    approximateDimensions: '130 - 150 µm de longitud por 60 - 90 µm de ancho',
    clinicalSpecimen: 'Heces formadas / pastosas',
    diagnosticMethod: 'Examen coproparasitoscópico de sedimentación rápida (técnica de Lumbreras) o sondaje duodenal',
    stainUsed: 'Solución salina o tinción con verde de malaquita en Kato-Katz',
    specificMicroscopicFindings: [
      'Estructura gigante dorada que abarca gran parte del campo a 100x',
      'Línea de corte del opérculo claramente visible en uno de los extremos adelgazados',
      'Contenido granular uniforme homogéneo'
    ],
    associatedDisease: 'Fascioliasis hepática / Colangitis obstructiva / Cirrosis biliar secundaria',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Huevo gigante operculado de Fasciola hepatica con cáscara marrón dorada.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '100x rastreo / 400x detalle',
      observationMethod: 'Microscopía de sedimentación en campo claro'
    },
    bibliographicReference: 'World Health Organization (WHO) - Foodborne trematodiases, 2023.'
  },

  // ==========================================
  // 15. ONCHOCERCA VOLVULUS (Helminto - Nematodo / Filaria)
  // ==========================================
  {
    id: 'ov-stage-microfilaria',
    microorganismId: 'onchocerca-volvulus',
    scientificName: 'Onchocerca volvulus',
    commonName: 'Filaria de la ceguera de los ríos',
    parasiteGroup: 'nematodo',
    specificTaxonDetail: 'Nematodo tisular filaroideo (Filaria sin vaina)',
    stageType: 'microfilaria',
    stageName: 'Microfilaria dérmica sin vaina',
    biologicalRole: 'Estadio diagnóstico móvil que migra activamente por el estroma dérmico y cámara anterior del ojo; ingerido por el jején Simulium',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Microfilaria esbelta, alargada y translúcida. Carece por completo de vaina envolvente. Posee una columna de núcleos somáticos purpúreos que NO llegan al extremo terminal de la cola (el extremo caudal posterior es libre de núcleos, afilado y ligeramente incurvado).',
    differentialCharacteristics: [
      'Ausencia de vaina perilarval (filaria desnuda)',
      'LOCALIZACIÓN CUTÁNEA ESTRICTA: Se encuentra en la dermis superficial (NO en sangre periférica como Wuchereria bancrofti o Mansonella ozzardi)',
      'Técnica diagnóstica obligatoria: Biopsia cutánea superficial sin sangre ("skin snip") con aguja y bisturí, sumergida en solución salina',
      'HITO HISTÓRICO DE GUATEMALA: Enfoque pionero del Dr. Rodolfo Robles en 1915; Guatemala fue certificada por la OMS en 2016 como el 4º país del mundo en eliminar la oncocercosis'
    ],
    approximateDimensions: '220 - 360 µm de longitud por 5 - 9 µm de ancho',
    clinicalSpecimen: 'Biopsia tisular / Músculo',
    diagnosticMethod: 'Biopsia dérmica por corte tangencial superficial (Skin snip) o lámpara de hendidura en córnea',
    stainUsed: 'Incubación en solución salina fisiológica al 0.9% y frotis con tinción de Giemsa',
    specificMicroscopicFindings: [
      'Microfilaria activa reptando fuera del fragmento de piel colocado en microplaca',
      'Columna nuclear somática compacta con espacio cefálico y extremo caudal puntiagudo anucleado',
      'Ausencia de vaina refringente exterior'
    ],
    associatedDisease: 'Oncocercosis / Enfermedad de Robles (Dermatitis oncocercosa, fascies leonina, ceguera de los ríos)',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Microfilaria dérmica de Onchocerca volvulus sin vaina emergente de biopsia cutánea.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '400x',
      observationMethod: 'Microscopía directa en solución salina'
    },
    bibliographicReference: 'OMS / OEPA - Verificación de la eliminación de la oncocercosis en Guatemala, 2016.'
  },

  // ==========================================
  // 16. SARCOPTES SCABIEI (Ectoparásito - Ácaro)
  // ==========================================
  {
    id: 'sscab-stage-adult',
    microorganismId: 'sarcoptes-scabiei',
    scientificName: 'Sarcoptes scabiei var. hominis',
    commonName: 'Ácaro de la sarna / Escabiosis',
    parasiteGroup: 'ectoparasito',
    specificTaxonDetail: 'Arácnido ácaro microscópico de la epidermis',
    stageType: 'adulto',
    stageName: 'Ácaro adulto hembra ovígera',
    biologicalRole: 'Estadio patógeno que labra surcos o túneles en el estrato córneo epidérmico depositando heces y huevos altamente alergénicos',
    isInfectiveStage: true,
    isDiagnosticStage: true,
    detailedMorphology: 'Cuerpo globoso, semiesférico, ovalado y aplanado ventralmente ("aspecto de caparazón de tortuga diminuto"). Superficie dorsal convexa provista de pliegues transversales, cerdas puntiagudas y espinas triangulares quitinosas. Presenta 4 pares de patas cortas y robustas (los dos pares anteriores terminan en ventosas ambulacrales con pedúnculo largo y no articulado).',
    differentialCharacteristics: [
      'Morfología ovalada compacta con espinas dorsales características',
      'Patas rudimentarias anteriores con ventosas alargadas',
      'HALLAZGO DIAGNÓSTICO: En el raspado cutáneo con bisturí impregnado en aceite mineral se confirma con el ácaro adulto, sus huevos ovalados o sus escíbalos (bolitas fecales pardas)'
    ],
    approximateDimensions: '300 - 450 µm de longitud (hembra)',
    clinicalSpecimen: 'Biopsia tisular / Músculo',
    diagnosticMethod: 'Raspado epidérmico de surco acarino con hoja de bisturí humedecida en aceite mineral (Prueba de Müller)',
    stainUsed: 'Montaje directo en aceite mineral o KOH al 10% para aclaramiento de queratina',
    specificMicroscopicFindings: [
      'Ácaro translúcido amarillento visible a 100x y 400x',
      'Espinas cónicas prominentes en el dorso',
      'Presencia concomitante de huevos ovalados embrionados y pellets fecales oscuros en el estrato córneo'
    ],
    associatedDisease: 'Escabiosis / Sarna humana (Prurito intratable de predominio nocturno, surcos interdigitales y muñecas)',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Ácaro hembra adulto de Sarcoptes scabiei var. hominis obtenido en raspado de surco dérmico.',
      sourceName: 'CDC Public Health Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '100x / 400x',
      observationMethod: 'Montaje en aceite mineral con microscopía de campo claro'
    },
    bibliographicReference: 'CDC DPDx - Scabies, Laboratory Diagnosis, 2024.'
  },

  // ==========================================
  // 17. PEDICULUS HUMANUS (Ectoparásito - Insecto Anopluro)
  // ==========================================
  {
    id: 'ph-stage-nit-egg',
    microorganismId: 'pediculus-humanus',
    scientificName: 'Pediculus humanus capitis / corporis',
    commonName: 'Piojo humano / Liendre',
    parasiteGroup: 'ectoparasito',
    specificTaxonDetail: 'Insecto anopluro hematófago obligado ectoparásito',
    stageType: 'huevo',
    stageName: 'Liendre (Huevo operculado adherido al cabello)',
    biologicalRole: 'Estadio de anclaje resistente adherido firmemente a la vaina del cabello mediante un cemento insoluble de quitina',
    isInfectiveStage: false,
    isDiagnosticStage: true,
    detailedMorphology: 'Huevo alargado, ovoide y translúcido de color blanco nacarado o amarillento. Posee un opérculo apical provisto de poros respiratorios o aerópilos. Su polo inferior está firmemente rodeado por un manguito o cilindro de cemento adhesivo insoluble que envuelve concéntricamente el tallo del cabello humano a menos de 6 mm del cuero cabelludo.',
    differentialCharacteristics: [
      'Adherencia fija e indestructible al cabello (no se desprende al soplar o sacudir como la caspa o cilindros de sebo)',
      'Presencia de opérculo apical perforado',
      'Distancia a la raíz capilar indica tiempo de evolución: si está a > 1 cm la liendre suele estar vacía y la infestación es antigua'
    ],
    approximateDimensions: '0.8 mm de longitud por 0.3 mm de ancho',
    clinicalSpecimen: 'Biopsia tisular / Músculo',
    diagnosticMethod: 'Inspección directa con lupa y examen microscópico del cabello montado entre lámina y laminilla',
    stainUsed: 'Montaje directo en seco o con una gota de agua/glicerina',
    specificMicroscopicFindings: [
      'Cápsula ovoide brillante cementada al cilindro capilar',
      'Opérculo visible en el extremo distal libre',
      'Ninfa en desarrollo replegada en el interior en liendres viables'
    ],
    associatedDisease: 'Pediculosis capitis / Pediculosis corporis (Vector de Rickettsia prowazekii y Borrelia recurrentis)',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Liendre de Pediculus humanus adherida fuertemente a la cutícula del cabello mediante manguito de queratina.',
      sourceName: 'CDC Public Health Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '100x',
      observationMethod: 'Estereomicroscopía y campo claro'
    },
    bibliographicReference: 'Botero D, Restrepo M. Parasitosis Humanas (6ª Ed.) - Artrópodos y Ectoparásitos, 2019.'
  },

  // ==========================================
  // 18. CRYPTOSPORIDIUM PARVUM (Protozoo - Apicomplexa)
  // ==========================================
  {
    id: 'cp-stage-oocyst',
    microorganismId: 'cryptosporidium-parvum',
    scientificName: 'Cryptosporidium parvum / C. hominis',
    commonName: 'Criptosporidio',
    parasiteGroup: 'protozoo',
    specificTaxonDetail: 'Apicomplexa coccidio intestinal oportunista',
    stageType: 'ooquiste',
    stageName: 'Ooquiste esférico ácido-alcohol resistente',
    biologicalRole: 'Forma esporulada infectante inmediatamente eliminada en heces que resiste a la cloración del agua potable',
    isInfectiveStage: true,
    isDiagnosticStage: true,
    detailedMorphology: 'Ooquiste diminuto perfectamente esférico u ovalado. Contiene 4 esporozoítos desnudos y un cuerpo residual de gránulos densos. Presenta una pared quística trilaminar rica en lípidos que le confiere una propiedad tintorial CRÍTICA: es ÁCIDO-ALCOHOL RESISTENTE.',
    differentialCharacteristics: [
      'ÁCIDO-ALCOHOL RESISTENCIA POSITIVA (BAAR fecal): se tiñe de color fucsia/rojo brillante sobre fondo verde o azul en la tinción de Kinyoun o Ziehl-Neelsen modificada',
      'Tamaño diminuto (4-5 µm), que permite diferenciarlo de Cyclospora cayetanensis (8-10 µm) y Cystoisospora belli (20-30 µm ovalado)',
      'En tinción con Lugol convencional NO se tiñe y pasa completamente desapercibido como levaduras'
    ],
    approximateDimensions: '4.0 - 5.0 µm de diámetro',
    clinicalSpecimen: 'Heces formadas / pastosas',
    diagnosticMethod: 'Frotis fecal delgado teñido con tinción de Ziehl-Neelsen modificada (Kinyoun) o fluorescencia',
    stainUsed: 'Tinción ácido-alcohol resistente de Kinyoun modificada (fucsia básica y azul de metileno)',
    specificMicroscopicFindings: [
      'Discos o esferas de color rojo magenta fucsia brillante',
      'Fondo citológico teñido uniformemente de azul claro',
      'Estructuras internas y gránulos excéntricos visibles a 1000x'
    ],
    associatedDisease: 'Criptosporidiosis / Diarrea secretora acuosa masiva e intratable en pacientes con VIH/SIDA',
    microscopyImage: {
      hasRealImage: true,
      caption: 'Ooquistes ácido-alcohol resistentes de Cryptosporidium teñidos de fucsia en frotis fecal con tinción de Kinyoun.',
      sourceName: 'CDC DPDx Parasite Image Library',
      sourceLicenseOrPermit: 'Dominio público CDC',
      magnificationOrScale: '1000x inmersión',
      observationMethod: 'Tinción de Kinyoun modificada de campo claro'
    },
    bibliographicReference: 'CDC DPDx - Cryptosporidiosis, Laboratory Diagnosis, 2024.'
  }
];
