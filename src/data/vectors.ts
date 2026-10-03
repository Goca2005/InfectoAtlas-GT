import { MedicalVector } from '../types/vector';

export const MEDICAL_VECTORS: MedicalVector[] = [
  {
    id: 'aedes-aegypti',
    scientificName: 'Aedes aegypti',
    commonName: 'Zancudo de las patas blancas',
    taxonomicClass: 'Insecta',
    orderTaxon: 'Diptera',
    family: 'Culicidae',
    transmittedPathogens: [
      { pathogenId: 'virus-del-dengue', scientificName: 'Dengue virus (DENV 1-4)', disease: 'Dengue' },
      { pathogenId: 'chikungunya-virus', scientificName: 'Chikungunya virus (CHIKV)', disease: 'Fiebre Chikungunya' },
      { pathogenId: 'zika-virus', scientificName: 'Zika virus (ZIKV)', disease: 'Fiebre por virus Zika / Síndrome congénito' },
      { pathogenId: 'yellow-fever', scientificName: 'Yellow fever virus', disease: 'Fiebre Amarilla urbana' }
    ],
    biologicalCycle: 'Metamorfosis completa (holometábolo): Huevo -> 4 estadios larvarios (L1-L4) -> Pupa -> Adulto. El ciclo acuático tarda de 7 a 10 días a temperaturas tropicales de 28-30 °C. Los huevos pueden resistir desecación durante más de 6 a 12 meses.',
    habitatAndBehavior: 'Estrictamente antropofílico y doméstico. Cría en recipientes artificiales con agua limpia (pilas, toneles, llantas, floreros). Hembras hematófagas pican de día (picos de actividad al amanecer y atardecer). Pican repetidamente a varias personas para completar una sola comida sanguínea.',
    guatemalaDistribution: {
      regions: ['Costa Sur', 'Nororiente', 'Suroriente', 'Norte', 'Petén', 'Valle de Guatemala'],
      elevationLimitMeters: 1800,
      peakSeason: 'Temporada de lluvias (mayo a noviembre) con rezago en época seca en recipientes almacenados',
      endemicDepartments: ['Escuintla', 'Suchitepéquez', 'Retalhuleu', 'Santa Rosa', 'Chiquimula', 'Zacapa', 'Petén', 'Izabal', 'Guatemala']
    },
    controlMeasures: [
      'Lavado y cepillado semanal de pilas y depósitos de agua (eliminar huevos en bordes)',
      'Tapadera hermética en toneles y tanques',
      'Aplicación de larvicida temefos o BTI (Bacillus thuringiensis israelensis) por brigadas de vectores del MSPAS',
      'Nebulización térmica espacial durante brotes'
    ],
    morphologyHighlights: 'Cuerpo oscuro con diseño característico en forma de lira o arpa blanca en el dorso del tórax y bandas blancas anulares en las articulaciones tarsales de las patas.'
  },
  {
    id: 'triatoma-dimidiata',
    scientificName: 'Triatoma dimidiata',
    commonName: 'Chinche picuda / Talaje',
    taxonomicClass: 'Insecta',
    orderTaxon: 'Hemiptera',
    family: 'Reduviidae (Subfamilia Triatominae)',
    transmittedPathogens: [
      { pathogenId: 'trypanosoma-cruzi', scientificName: 'Trypanosoma cruzi', disease: 'Enfermedad de Chagas (Tripanosomiasis americana)' }
    ],
    biologicalCycle: 'Metamorfosis incompleta (hemimetábolo): Huevo -> 5 estadios ninfales (N1-N5) hematófagos obligados -> Adulto alado. Ciclo largo de 6 a 12 meses. Ambos sexos y todas las ninfas se alimentan de sangre de mamíferos.',
    habitatAndBehavior: 'Nocturno. Coloniza grietas de paredes de adobe, bahareque, techos de paja o teja, y detrás de cuadros en viviendas rurales precarias. Pica sin dolor en zonas descubiertas (frecuentemente rostro) y defeca inmediatamente; el huésped se rasca e introduce las deyecciones con tripomastigotes metacíclicos en la herida o conjuntiva ocular (signo de Romaña).',
    guatemalaDistribution: {
      regions: ['Nororiente', 'Suroriente', 'Central'],
      elevationLimitMeters: 1600,
      peakSeason: 'Todo el año con mayor actividad en meses cálidos y secos (febrero a mayo)',
      endemicDepartments: ['Chiquimula', 'Zacapa', 'Jutiapa', 'Jalapa', 'Santa Rosa', 'El Progreso']
    },
    controlMeasures: [
      'Mejoramiento de vivienda: revoque y encalado de paredes de adobe para eliminar grietas',
      'Rociamiento residual intradomiciliario con piretroides (deltametrina, lambdacialotrina) por el MSPAS',
      'Alejamiento de corrales de aves, leña y perros fuera de la casa de habitación'
    ],
    morphologyHighlights: 'Insecto grande (2.5 a 3.5 cm), color café amarillento a castaño oscuro, conexivo lateral con manchas amarillas/anaranjadas alternadas, cabeza alargada con probóscide recta rígida.'
  },
  {
    id: 'anopheles-albimanus',
    scientificName: 'Anopheles albimanus',
    commonName: 'Mosquito transmisor del paludismo',
    taxonomicClass: 'Insecta',
    orderTaxon: 'Diptera',
    family: 'Culicidae',
    transmittedPathogens: [
      { pathogenId: 'plasmodium-vivax', scientificName: 'Plasmodium vivax', disease: 'Paludismo por P. vivax (terciana benigna)' },
      { pathogenId: 'plasmodium-falciparum', scientificName: 'Plasmodium falciparum', disease: 'Paludismo por P. falciparum (terciana maligna)' }
    ],
    biologicalCycle: 'Huevos depositados individualmente con flotadores laterales en la superficie del agua -> 4 estadios larvarios (sin sifón respiratorio, flotan paralelos a la superficie) -> Pupa -> Adulto.',
    habitatAndBehavior: 'Crepuscular y nocturno. Cría en acumulaciones naturales de agua dulce o salobre expuestas al sol (pantanos, arrozales, lagunas, esteros, huellas de ganado en lodo). Las hembras descansan en vegetación periférica y pican tanto dentro como fuera de la vivienda.',
    guatemalaDistribution: {
      regions: ['Costa Sur', 'Costa Atlántica / Izabal', 'Petén'],
      elevationLimitMeters: 800,
      peakSeason: 'Final de temporada de lluvias y principio de la época seca cuando se forman charcas estables',
      endemicDepartments: ['Escuintla', 'Suchitepéquez', 'Izabal', 'Petén', 'Retalhuleu', 'Alta Verapaz']
    },
    controlMeasures: [
      'Mosquiteros tratados con insecticida de acción prolongada (MILD) donados en comunidades endémicas',
      'Drenaje y canalización de charcas y zanjas estancadas',
      'Diagnóstico temprano y tratamiento radical con cloroquina + primaquina para cortar el reservorio humano'
    ],
    morphologyHighlights: 'Posición de reposo distintiva: el cuerpo forma un ángulo de 45° a 90° con la superficie sobre la que se posa. Tarsos posteriores con segmentos apicales blancos característicos.'
  }
];
