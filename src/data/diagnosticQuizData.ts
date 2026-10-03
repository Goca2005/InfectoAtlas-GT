import { DiagnosticPracticeQuestion } from '../types/microscopyAtlas';

export const DIAGNOSTIC_PRACTICE_QUESTIONS: DiagnosticPracticeQuestion[] = [
  {
    id: 'quiz-01-ameba',
    questionTitle: 'Diferenciación de Amebas en Muestra Fecal Disentérica',
    clinicalScenario: 'Paciente de 28 años procedente de Escuintla acude a la emergencia con dolor cólico intenso, pujo, tenesmo y evacuaciones diarreicas sanguinolentas con abundante moco (disentería). Se realiza examen coproparasitoscópico directo en fresco a los 20 minutos de recolectada la muestra.',
    microscopicObservedFeatures: 'Se observan células ameboides pleomórficas de 25-35 µm con motilidad direccional activa mediante pseudópodos hialinos claros. En el endoplasma granular se aprecian múltiples inclusiones esféricas rosado-amarillentas correspondientes a glóbulos rojos englobados. El núcleo esférico único posee un cariosoma diminuto estrictamente central.',
    clinicalSample: 'Heces diarreicas frescas con moco y sangre (examen en fresco antes de 30 min)',
    diagnosticMethod: 'Microscopía óptica de campo claro con solución salina al 0.9% a 37 °C',
    options: [
      {
        id: 'opt-a',
        text: 'Entamoeba histolytica (Trofozoíto invasor con eritrofagocitosis)',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'Entamoeba dispar (Trofozoíto comensal no invasor)',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'Entamoeba coli (Trofozoíto comensal)',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Balantioides coli (Trofozoíto ciliado)',
        isCorrect: false
      }
    ],
    explanation: 'La presencia de ERITROFAGOCITOSIS (glóbulos rojos ingeridos en el endoplasma de trofozoítos ameboides) es el criterio morfológico microscópico patognomónico que permite confirmar con certeza la invasión tisular por Entamoeba histolytica y distinguirla de la especie comensal idéntica Entamoeba dispar. Entamoeba coli posee cariosoma excéntrico y cromatina irregular.',
    differentialKeyPearl: 'Regla de oro de microscopía: En quistes es imposible distinguir E. histolytica de E. dispar por microscopía óptica convencional. Solo el trofozoíto con eritrofagocitosis en heces disentéricas frescas permite diagnóstico morfológico de certeza de amebiasis invasora.',
    relatedStageId: 'eh-stage-trophozoite'
  },
  {
    id: 'quiz-02-oxiuro',
    questionTitle: 'Prurito Anal Nocturno Infantil y Técnica Diagnóstica de Elección',
    clinicalScenario: 'Niño de 6 años es llevado a la consulta médica en Chimaltenango por intenso prurito perianal de predominio nocturno, irritabilidad, insomnio y bruxismo. La madre refiere haber observado pequeños filamentos blancos móviles en la región anal durante la noche.',
    microscopicObservedFeatures: 'En el microscopio se observan huevos hialinos perfectamente transparentes, asimétricos, con una cara aplanada y la otra convexa en forma de letra "D" nítida (55 x 25 µm), con cáscara delgada y lisa conteniendo una larva casi madura plegada en su interior.',
    clinicalSample: 'Impronta con cinta adhesiva transparente sobre márgenes perianales (Técnica de Graham)',
    diagnosticMethod: 'Técnica de Graham montada sobre portaobjetos sin tinción',
    options: [
      {
        id: 'opt-a',
        text: 'Enterobius vermicularis (Huevo embrionado plano-convexo en "D")',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'Ascaris lumbricoides (Huevo decorticado)',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'Ancylostoma duodenale (Huevo de uncinaria)',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Trichuris trichiura (Huevo en barril con tapones polares)',
        isCorrect: false
      }
    ],
    explanation: 'Los huevos de Enterobius vermicularis son inconfundibles por su morfología plano-convexa en forma de "D", cáscara lisa transparente y presencia de larva interna. El método de recolección obligatorio es la cinta adhesiva perianal (Graham) realizada por la mañana antes de que el niño defeque o sea bañado; el coproparasitoscópico estándar en heces suele ser falsamente negativo en más del 90% de los casos.',
    differentialKeyPearl: 'La hembra grávida de Enterobius migra de noche a través del esfínter anal hacia los pliegues perianales donde deposita los huevos y muere, liberando la sustancia pruriginosa causante del rascado y ciclo ano-mano-boca.',
    relatedStageId: 'ev-stage-egg'
  },
  {
    id: 'quiz-03-larva-heces',
    questionTitle: 'Larva Móvil en Heces Recién Emitidas',
    clinicalScenario: 'Agricultor de 45 años de Suchitepéquez presenta dolor epigástrico posprandial, diarrea acuosa recurrente y eosinofilia periférica del 18%. El laboratorio recibe una muestra de heces recién evacuada (menos de 20 minutos de recolectada).',
    microscopicObservedFeatures: 'Al examen microscópico directo con solución salina se observa una larva móvil activa de aproximadamente 220 µm de largo por 15 µm de ancho. A 400x se identifica con claridad un vestíbulo bucal CORTO (menor que la anchura cefálica), esófago rabditoide con bulbo posterior y un primordio genital prominente en el tercio medio.',
    clinicalSample: 'Heces recién emitidas (examen coprológico inmediato)',
    diagnosticMethod: 'Microscopía directa en solución salina al 0.9% / Método de Baermann',
    options: [
      {
        id: 'opt-a',
        text: 'Strongyloides stercoralis (Larva rabditiforme L1)',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'Necator americanus (Larva rabditiforme)',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'Ascaris lumbricoides (Larva L2 libre)',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Trichinella spiralis (Larva enquistada)',
        isCorrect: false
      }
    ],
    explanation: 'Strongyloides stercoralis es el ÚNICO helminto que se elimina habitualmente como LARVA RABDITIFORME L1 en heces recién emitidas en el ser humano, debido a que los huevos eclosionan de inmediato en la mucosa intestinal. Las uncinarias (Necator/Ancylostoma) eliminan HUEVOS que solo eclosionan a larvas tras permanecer varios días en el suelo exterior (o heces muy viejas retenidas por más de 24 horas, en cuyo caso tendrían vestíbulo bucal largo).',
    differentialKeyPearl: 'Diferencial clave: Larva con vestíbulo bucal corto y primordio genital grande = Strongyloides stercoralis. Larva con vestíbulo bucal largo y primordio genital imperceptible = Uncinarias.',
    relatedStageId: 'ss-stage-rhabditiform-larva'
  },
  {
    id: 'quiz-04-malaria-falc',
    questionTitle: 'Frotis Delgado en Síndrome Febril Agudo de la Costa Sur',
    clinicalScenario: 'Viajero procedente de una zona endémica costera presenta fiebre maligna irregular alta, postración, ictericia y confusión mental. Se toma frotis de sangre periférica y gota gruesa durante el acceso febril.',
    microscopicObservedFeatures: 'El frotis muestra alta parasitemia intraeritrocitaria. Se aprecian abundantes anillos delgados muy pequeños con presencia frecuente de dos puntos de cromatina en un mismo anillo y hematíes poli-infectados con 2 o 3 parásitos. Los hematíes parasitados tienen tamaño NORMAL y carecen de punteado de Schüffner. Adicionalmente se observa un parásito alargado en forma de semiluna o plátano con pigmento central.',
    clinicalSample: 'Sangre capilar periférica obtenida por punción digital',
    diagnosticMethod: 'Frotis fino teñido con Giemsa amortiguado pH 7.2',
    options: [
      {
        id: 'opt-a',
        text: 'Plasmodium falciparum (Trofozoítos en anillo delicados y gametocito en semiluna)',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'Plasmodium vivax (Trofozoítos ameboides)',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'Plasmodium malariae (Esquizontes en roseta)',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Babesia microti (Cruces de Malta)',
        isCorrect: false
      }
    ],
    explanation: 'Los anillos delicados pequeños con doble cromatina en eritrocitos de tamaño normal, junto al gametocito patognomónico en semiluna o plátano, confirman infección por Plasmodium falciparum. En P. vivax los eritrocitos estarían visiblemente agrandados, presentarían punteado de Schüffner y trofozoítos ameboides maduros.',
    differentialKeyPearl: 'En malaria no complicada por P. falciparum prácticamente nunca se observan esquizontes en sangre periférica, porque la citoadherencia mediada por PfEMP-1 secuestra los estadios maduros en el endotelio capilar de órganos vitales (cerebro, riñón, placenta).',
    relatedStageId: 'pf-stage-gametocyte'
  },
  {
    id: 'quiz-05-taenia-diferencial',
    questionTitle: 'Diferenciación de Teniasis y Limitación Diagnóstica del Huevo',
    clinicalScenario: 'Un laboratorista examina una muestra coprológica de un paciente rural que consume carne de cerdo y de res de mataderos clandestinos. Encuentra huevos esféricos de 35 µm con corteza gruesa de color castaño estriada radialmente en empalizada y embrión hexacanto con 6 ganchos.',
    microscopicObservedFeatures: 'El médico tratante pregunta si el laboratorista puede asegurar mediante ese huevo si el paciente tiene Taenia solium o Taenia saginata para evaluar el riesgo de autoinfección y neurocisticercosis.',
    clinicalSample: 'Heces formadas',
    diagnosticMethod: 'Examen coproparasitoscópico de sedimentación',
    options: [
      {
        id: 'opt-a',
        text: 'No es posible diferenciarlos morfológicamente; se debe informar como "Huevos de Taenia sp." y esperar la expulsión de proglótides para contar las ramas uterinas.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'Es Taenia solium con certeza porque los huevos de Taenia saginata son ovalados sin estriaciones radiales.',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'Es Taenia saginata con certeza porque sus huevos son más grandes que 80 µm.',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'La tinción de Gram permite diferenciar ambas especies tiñendo de azul el embrióforo de T. solium.',
        isCorrect: false
      }
    ],
    explanation: 'Los huevos de Taenia solium y Taenia saginata son morfológicamente IDÉNTICOS e indistinguibles por microscopía óptica estándar. El laboratorio debe reportar formalmente "Huevos de Taenia sp.". La diferenciación de especie exige examinar las proglótides grávidas expulsadas (7-12 ramas primarias en T. solium vs 15-30 ramas dicotómicas en T. saginata) o el escólex (armado con ganchos en T. solium vs inerme en T. saginata).',
    differentialKeyPearl: 'Importancia médica: Si el paciente tiene Taenia solium existe riesgo grave de neurocisticercosis por autoinfección fecal-oral o por movimientos antiperistálticos que lleven huevos al estómago.',
    relatedStageId: 'ts-stage-egg-general'
  },
  {
    id: 'quiz-06-giardia-disco',
    questionTitle: 'Diarrea Lientérica y Motilidad en Caída de Hoja',
    clinicalScenario: 'Preescolar de 4 años acude por diarrea pastosa fétida, esteatorrea, meteorismo y flatulencia abundante con distensión abdominal. En el laboratorio se coloca una gota de heces líquidas frescas en solución salina isotónica.',
    microscopicObservedFeatures: 'Se visualiza una célula piriforme en forma de cometa o pera cortada longitudinalmente (12-14 µm), aplanada, con dos núcleos laterales simétricos a manera de gafas o máscara, un disco ventralcóncavo y movimiento oscilatorio errático y ondulante similar a una "hoja seca al caer".',
    clinicalSample: 'Heces diarreicas recién emitidas / Líquido duodenal',
    diagnosticMethod: 'Examen directo en fresco con solución salina al 0.9%',
    options: [
      {
        id: 'opt-a',
        text: 'Giardia duodenalis (Trofozoíto piriforme con disco suctorio)',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'Trichomonas hominis (Trofozoíto flagelado con membrana ondulante)',
        isCorrect: false
      },
      {
        id: 'opt-c',
        text: 'Chilomastix mesnili (Trofozoíto piriforme con citostoma)',
        isCorrect: false
      },
      {
        id: 'opt-d',
        text: 'Dientamoeba fragilis (Trofozoíto binucleado ameboide)',
        isCorrect: false
      }
    ],
    explanation: 'La morfología piriforme con dos núcleos vesiculares simétricos, disco suctorio ventral y la característica motilidad rotatoria oscilante "en caída de hoja" son exclusivas del trofozoíto de Giardia duodenalis (G. lamblia).',
    differentialKeyPearl: 'El disco suctorio de Giardia actúa como una ventosa mecánica sobre el ribete en cepillo del enterocito en duodeno y yeyuno, causando atrofia vellositaria y malabsorción de grasas y vitaminas liposolubles sin invadir la submucosa ni causar sangrado.',
    relatedStageId: 'gd-stage-trophozoite'
  }
];
