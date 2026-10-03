import type { Microorganism } from '../types/microorganism';

// Síntesis educativa consultada el 2026-10-03; requiere revisión clínica independiente.
export const REFERENCE_MICROORGANISMS: Microorganism[] = [
  {
    "id": "reference-campylobacter-jejuni",
    "scientificName": "Campylobacter jejuni",
    "commonName": "Campilobacteriosis",
    "category": "bacteria",
    "reviewStatus": "Fuentes pendientes de revisión",
    "taxonomy": {
      "family": "Campylobacteraceae",
      "genus": "Campylobacter",
      "species": "Campylobacter jejuni"
    },
    "morphology": {
      "shape": "Bacilos curvos; microorganismo microaerófilo.",
      "size": "No especificado en las fuentes seleccionadas",
      "gramStain": "Gram negativa",
      "specialStructures": []
    },
    "microbiologyCharacteristics": {},
    "externalAndInternalStructures": [],
    "virulenceFactors": [],
    "reservoir": [
      "Aves de corral y otros animales"
    ],
    "transmissionRoute": [
      "Alimentos, leche no pasteurizada o agua contaminados; contacto con heces animales"
    ],
    "associatedDiseases": [
      {
        "name": "Enteritis",
        "description": "Campilobacteriosis",
        "clinicalPresentation": [
          "Diarrea, a veces sanguinolenta",
          "Dolor abdominal",
          "Fiebre"
        ]
      }
    ],
    "signsAndSymptoms": [
      "Diarrea, a veces sanguinolenta",
      "Dolor abdominal",
      "Fiebre"
    ],
    "complications": [
      "Síndrome de Guillain-Barré",
      "Artritis reactiva"
    ],
    "clinicalSpecimens": [
      "Heces"
    ],
    "diagnosticMethods": [
      {
        "method": "Cultivo de heces",
        "standardRole": "Confirmatorio",
        "keyFindings": "Permite recuperar el aislamiento y estudiar sensibilidad."
      },
      {
        "method": "Prueba molecular o antigénica",
        "standardRole": "Confirmatorio",
        "keyFindings": "Las pruebas independientes de cultivo detectan la infección; no aportan por sí solas un antibiograma."
      }
    ],
    "labFindings": [],
    "treatment": {
      "disclaimer": "Síntesis educativa. Revisar la guía enlazada y el contexto clínico antes de aplicar un tratamiento. Pendiente de revisión clínica independiente.",
      "firstLine": [
        "Hidratación; muchos cuadros remiten sin antibiótico.",
        "En enfermedad grave o pacientes de riesgo puede indicarse azitromicina según valoración y susceptibilidad."
      ],
      "alternatives": []
    },
    "prevention": [
      "Cocinar completamente las aves",
      "Evitar leche no pasteurizada y contaminación cruzada"
    ],
    "guatemalaRelevance": {
      "endemicStatus": "No documentado en esta ficha",
      "priorityLevel": "No evaluada",
      "departmentsWithHighPrevalence": [],
      "officialNotes": "Estas fuentes no documentan tasas ni departamentos de Guatemala. Pendiente de evidencia MSPAS/OPS; no se asigna grupo de notificación."
    },
    "imagery": [
      {
        "type": "microfotografia_real",
        "caption": "Campylobacter jejuni: superficie bacteriana en microscopía electrónica de barrido.",
        "stainOrModality": "SEM; 11 734×",
        "creditOrSource": "CDC / Patricia Fields, Collette Fitzgerald; fotografía de Janice Haney Carr",
        "url": "https://wwwn.cdc.gov/phil/PHIL_Images/20040603/0fdb97609d174dc3a3b53bab9d203aa8/5778_lores.jpg",
        "sourceUrl": "https://wwwn.cdc.gov/phil/Details.aspx?pid=5778",
        "license": "Dominio público; atribución al CDC y autor conocido",
        "licenseUrl": "https://www.cdc.gov/other/agencymaterials.html",
        "imageId": "CDC PHIL 5778",
        "imageDate": "2004",
        "consultedAt": "2026-10-03",
        "interpretation": "Imagen de referencia morfológica. El diagnóstico clínico utiliza heces y pruebas de laboratorio; una SEM no es una prueba rutinaria."
      }
    ],
    "bibliography": [
      {
        "source": "CDC",
        "title": "Clinical Overview of Campylobacter",
        "year": "2026",
        "url": "https://www.cdc.gov/campylobacter/hcp/clinical-overview/index.html",
        "status": "Fuentes pendientes de revisión",
        "consultedAt": "2026-10-03"
      }
    ],
    "lastReviewedDate": "2026-10-03"
  },
  {
    "id": "reference-shigella-dysenteriae",
    "scientificName": "Shigella dysenteriae",
    "commonName": "Shigelosis; algunas cepas producen toxina Shiga",
    "category": "bacteria",
    "reviewStatus": "Fuentes pendientes de revisión",
    "taxonomy": {
      "family": "Pendiente de fuente taxonómica específica",
      "genus": "Shigella",
      "species": "Shigella dysenteriae"
    },
    "morphology": {
      "shape": "Morfología bacteriana pendiente de documentar con una fuente específica.",
      "size": "No especificado en las fuentes seleccionadas",
      "gramStain": "Gram negativa",
      "specialStructures": []
    },
    "microbiologyCharacteristics": {},
    "externalAndInternalStructures": [],
    "virulenceFactors": [],
    "reservoir": [
      "Personas infectadas"
    ],
    "transmissionRoute": [
      "Fecal-oral; alimentos, agua o contacto contaminados"
    ],
    "associatedDiseases": [
      {
        "name": "Shigelosis",
        "description": "Shigelosis; algunas cepas producen toxina Shiga",
        "clinicalPresentation": [
          "Diarrea acuosa o sanguinolenta",
          "Tenesmo",
          "Dolor abdominal",
          "Fiebre"
        ]
      }
    ],
    "signsAndSymptoms": [
      "Diarrea acuosa o sanguinolenta",
      "Tenesmo",
      "Dolor abdominal",
      "Fiebre"
    ],
    "complications": [
      "Síndrome urémico hemolítico en cepas productoras de toxina Shiga"
    ],
    "clinicalSpecimens": [
      "Heces"
    ],
    "diagnosticMethods": [
      {
        "method": "Cultivo o prueba independiente de cultivo",
        "standardRole": "Confirmatorio",
        "keyFindings": "Si una prueba independiente es positiva, confirmar por cultivo; estudiar susceptibilidad si se prevé usar antibiótico."
      }
    ],
    "labFindings": [],
    "treatment": {
      "disclaimer": "Síntesis educativa. Revisar la guía enlazada y el contexto clínico antes de aplicar un tratamiento. Pendiente de revisión clínica independiente.",
      "firstLine": [
        "Hidratación. Si se requiere antibiótico, elegirlo con el antibiograma o evidencia local de resistencia."
      ],
      "alternatives": []
    },
    "prevention": [
      "Lavado de manos y saneamiento",
      "Evitar preparar alimentos mientras se presenta diarrea"
    ],
    "guatemalaRelevance": {
      "endemicStatus": "No documentado en esta ficha",
      "priorityLevel": "No evaluada",
      "departmentsWithHighPrevalence": [],
      "officialNotes": "Estas fuentes no documentan tasas ni departamentos de Guatemala. Pendiente de evidencia MSPAS/OPS; no se asigna grupo de notificación."
    },
    "imagery": [],
    "bibliography": [
      {
        "source": "CDC",
        "title": "Clinical Overview of Shigellosis",
        "year": "2024",
        "url": "https://www.cdc.gov/shigella/hcp/clinical-overview/index.html",
        "status": "Fuentes pendientes de revisión",
        "consultedAt": "2026-10-03"
      }
    ],
    "lastReviewedDate": "2026-10-03"
  },
  {
    "id": "reference-toxoplasma-gondii",
    "scientificName": "Toxoplasma gondii",
    "commonName": "Toxoplasmosis",
    "category": "parasito",
    "reviewStatus": "Fuentes pendientes de revisión",
    "taxonomy": {
      "family": "Sarcocystidae",
      "genus": "Toxoplasma",
      "species": "Toxoplasma gondii"
    },
    "morphology": {
      "shape": "Taquizoíto arqueado; también forma quistes tisulares y ooquistes.",
      "size": "Taquizoítos: 4–8 × 2–3 µm (DPDx)",
      "gramStain": "Tinciones especiales",
      "specialStructures": []
    },
    "microbiologyCharacteristics": {},
    "externalAndInternalStructures": [],
    "virulenceFactors": [],
    "reservoir": [
      "Felinos: hospedadores definitivos",
      "Animales de sangre caliente: hospedadores intermediarios"
    ],
    "transmissionRoute": [
      "Carne con quistes tisulares",
      "Ingestión de ooquistes ambientales",
      "Transmisión congénita"
    ],
    "associatedDiseases": [
      {
        "name": "Toxoplasmosis",
        "description": "Toxoplasmosis",
        "clinicalPresentation": [
          "Puede ser asintomática",
          "Adenopatías",
          "Enfermedad ocular o neurológica según contexto"
        ]
      }
    ],
    "signsAndSymptoms": [
      "Puede ser asintomática",
      "Adenopatías",
      "Enfermedad ocular o neurológica según contexto"
    ],
    "complications": [
      "Encefalitis en inmunodeficiencia",
      "Daño ocular",
      "Toxoplasmosis congénita"
    ],
    "clinicalSpecimens": [
      "Suero",
      "Líquido amniótico cuando está indicado",
      "Tejido o LCR según síndrome"
    ],
    "diagnosticMethods": [
      {
        "method": "Serología",
        "standardRole": "Confirmatorio",
        "keyFindings": "Interpretar IgG/IgM con la historia; confirmar resultados que sugieren infección reciente."
      },
      {
        "method": "PCR y estudio tisular",
        "standardRole": "Confirmatorio",
        "keyFindings": "Seleccionar muestra y método según sospecha congénita, neurológica u otra presentación."
      }
    ],
    "labFindings": [],
    "treatment": {
      "disclaimer": "Síntesis educativa. Revisar la guía enlazada y el contexto clínico antes de aplicar un tratamiento. Pendiente de revisión clínica independiente.",
      "firstLine": [
        "El cuadro leve en inmunocompetentes puede no requerir tratamiento.",
        "Cuando está indicado, pirimetamina + sulfadiazina + ácido folínico es un esquema de referencia; embarazo, enfermedad ocular e inmunodeficiencia necesitan manejo específico."
      ],
      "alternatives": []
    },
    "prevention": [
      "Cocinar carne",
      "Lavar alimentos y manos",
      "Evitar exposición a heces de gato durante embarazo"
    ],
    "guatemalaRelevance": {
      "endemicStatus": "No documentado en esta ficha",
      "priorityLevel": "No evaluada",
      "departmentsWithHighPrevalence": [],
      "officialNotes": "Estas fuentes no documentan tasas ni departamentos de Guatemala. Pendiente de evidencia MSPAS/OPS; no se asigna grupo de notificación."
    },
    "imagery": [
      {
        "type": "microfotografia_real",
        "caption": "Taquizoítos de Toxoplasma en una reacción de inmunofluorescencia indirecta positiva.",
        "stainOrModality": "IFA; 570×",
        "creditOrSource": "CDC",
        "url": "https://wwwn.cdc.gov/phil/PHIL_Images/21106/21106_lores.jpg",
        "sourceUrl": "https://wwwn.cdc.gov/phil/Details.aspx?pid=21106",
        "license": "Dominio público; atribución al CDC y autor conocido",
        "licenseUrl": "https://www.cdc.gov/other/agencymaterials.html",
        "imageId": "CDC PHIL 21106",
        "imageDate": "No informada por PHIL",
        "consultedAt": "2026-10-03",
        "interpretation": "La fluorescencia periférica corresponde al ensayo para anticuerpos frente a T. gondii. El color procede de la técnica. No es un examen de heces humanas."
      }
    ],
    "bibliography": [
      {
        "source": "CDC",
        "title": "DPDx — Toxoplasmosis",
        "year": "Sin fecha editorial confirmada",
        "url": "https://www.cdc.gov/dpdx/toxoplasmosis/index.html",
        "status": "Fuentes pendientes de revisión",
        "consultedAt": "2026-10-03"
      },
      {
        "source": "CDC",
        "title": "Clinical Care of Toxoplasmosis",
        "year": "2026",
        "url": "https://www.cdc.gov/toxoplasmosis/hcp/clinical-care/index.html",
        "status": "Fuentes pendientes de revisión",
        "consultedAt": "2026-10-03"
      }
    ],
    "lastReviewedDate": "2026-10-03",
    "parasiteGroup": "protozoo"
  },
  {
    "id": "reference-histoplasma-capsulatum",
    "scientificName": "Histoplasma capsulatum",
    "commonName": "Histoplasmosis",
    "category": "hongo",
    "reviewStatus": "Fuentes pendientes de revisión",
    "taxonomy": {
      "family": "Pendiente de fuente taxonómica específica",
      "genus": "Histoplasma",
      "species": "Histoplasma capsulatum"
    },
    "morphology": {
      "shape": "Hongo dimórfico: forma filamentosa ambiental y levaduras en tejido.",
      "size": "No especificado en las fuentes seleccionadas",
      "gramStain": "Tinciones especiales",
      "specialStructures": []
    },
    "microbiologyCharacteristics": {},
    "externalAndInternalStructures": [],
    "virulenceFactors": [],
    "reservoir": [
      "Suelo, especialmente asociado a excrementos de aves o murciélagos"
    ],
    "transmissionRoute": [
      "Inhalación de microconidios tras alterar suelo contaminado"
    ],
    "associatedDiseases": [
      {
        "name": "Histoplasmosis",
        "description": "Histoplasmosis",
        "clinicalPresentation": [
          "Fiebre",
          "Tos",
          "Dolor torácico"
        ]
      }
    ],
    "signsAndSymptoms": [
      "Fiebre",
      "Tos",
      "Dolor torácico"
    ],
    "complications": [
      "Enfermedad diseminada, especialmente en inmunodeficiencia"
    ],
    "clinicalSpecimens": [
      "Orina o suero para antígeno",
      "Muestras respiratorias o tejido según presentación"
    ],
    "diagnosticMethods": [
      {
        "method": "Antígeno de Histoplasma",
        "standardRole": "Confirmatorio",
        "keyFindings": "En orina o suero; interpretar con el cuadro clínico y otras pruebas."
      },
      {
        "method": "Cultivo y microscopía",
        "standardRole": "Confirmatorio",
        "keyFindings": "La sensibilidad depende de la muestra; el cultivo puede tardar hasta seis semanas."
      }
    ],
    "labFindings": [],
    "treatment": {
      "disclaimer": "Síntesis educativa. Revisar la guía enlazada y el contexto clínico antes de aplicar un tratamiento. Pendiente de revisión clínica independiente.",
      "firstLine": [
        "Algunas formas pulmonares leves se resuelven espontáneamente.",
        "En enfermedad que requiere tratamiento se utilizan itraconazol o anfotericina B según gravedad y presentación."
      ],
      "alternatives": []
    },
    "prevention": [
      "Reducir exposición a polvo de sitios contaminados",
      "Protección apropiada al remover acumulaciones de excrementos"
    ],
    "guatemalaRelevance": {
      "endemicStatus": "No documentado en esta ficha",
      "priorityLevel": "No evaluada",
      "departmentsWithHighPrevalence": [],
      "officialNotes": "Estas fuentes no documentan tasas ni departamentos de Guatemala. Pendiente de evidencia MSPAS/OPS; no se asigna grupo de notificación."
    },
    "imagery": [
      {
        "type": "microfotografia_real",
        "caption": "Histoplasma capsulatum: macroconidios tuberculados y microconidios de la forma filamentosa.",
        "stainOrModality": "Microscopía óptica; 400×",
        "creditOrSource": "CDC / Libero Ajello",
        "url": "https://wwwn.cdc.gov/phil/PHIL_Images/10961/10961_lores.jpg",
        "sourceUrl": "https://wwwn.cdc.gov/phil/Details.aspx?pid=10961",
        "license": "Dominio público; atribución al CDC y autor conocido",
        "licenseUrl": "https://www.cdc.gov/other/agencymaterials.html",
        "imageId": "CDC PHIL 10961",
        "imageDate": "1974",
        "consultedAt": "2026-10-03",
        "interpretation": "Aislamiento de suelo de Israel. Esta es la fase filamentosa ambiental, no la forma de levadura en tejido humano ni un caso de Guatemala."
      }
    ],
    "bibliography": [
      {
        "source": "CDC",
        "title": "Clinical Overview of Histoplasmosis",
        "year": "2024",
        "url": "https://www.cdc.gov/histoplasmosis/hcp/clinical-overview/index.html",
        "status": "Fuentes pendientes de revisión",
        "consultedAt": "2026-10-03"
      }
    ],
    "lastReviewedDate": "2026-10-03"
  },
  {
    "id": "reference-escherichia-coli",
    "scientificName": "Escherichia coli",
    "commonName": "Enfoque de esta ficha: E. coli causante de diarrea",
    "category": "bacteria",
    "reviewStatus": "Fuentes pendientes de revisión",
    "taxonomy": {
      "family": "Pendiente de fuente taxonómica específica",
      "genus": "Escherichia",
      "species": "Escherichia coli"
    },
    "morphology": {
      "shape": "Morfología pendiente de una fuente microscópica específica.",
      "size": "No especificado en las fuentes seleccionadas",
      "gramStain": "Gram negativa",
      "specialStructures": []
    },
    "microbiologyCharacteristics": {},
    "externalAndInternalStructures": [],
    "virulenceFactors": [],
    "reservoir": [
      "Personas y animales, según patotipo"
    ],
    "transmissionRoute": [
      "Ingestión de material contaminado con heces"
    ],
    "associatedDiseases": [
      {
        "name": "Diarrea por E. coli",
        "description": "Enfoque de esta ficha: E. coli causante de diarrea",
        "clinicalPresentation": [
          "Diarrea",
          "Cólicos abdominales",
          "Diarrea sanguinolenta en algunos cuadros"
        ]
      }
    ],
    "signsAndSymptoms": [
      "Diarrea",
      "Cólicos abdominales",
      "Diarrea sanguinolenta en algunos cuadros"
    ],
    "complications": [
      "Síndrome urémico hemolítico en infección por STEC"
    ],
    "clinicalSpecimens": [
      "Heces"
    ],
    "diagnosticMethods": [
      {
        "method": "Cultivo para O157 y prueba de toxina Shiga o sus genes",
        "standardRole": "Confirmatorio",
        "keyFindings": "Combinar métodos para detectar STEC O157 y no-O157; enviar positivos a referencia cuando corresponda."
      }
    ],
    "labFindings": [],
    "treatment": {
      "disclaimer": "Síntesis educativa. Revisar la guía enlazada y el contexto clínico antes de aplicar un tratamiento. Pendiente de revisión clínica independiente.",
      "firstLine": [
        "Rehidratación. Si se sospecha STEC, los antibióticos pueden aumentar el riesgo de síndrome urémico hemolítico.",
        "Evitar fármacos que frenan la motilidad en STEC y diarrea sanguinolenta."
      ],
      "alternatives": []
    },
    "prevention": [
      "Agua y alimentos seguros",
      "Lavado de manos"
    ],
    "guatemalaRelevance": {
      "endemicStatus": "No documentado en esta ficha",
      "priorityLevel": "No evaluada",
      "departmentsWithHighPrevalence": [],
      "officialNotes": "Estas fuentes no documentan tasas ni departamentos de Guatemala. Pendiente de evidencia MSPAS/OPS; no se asigna grupo de notificación."
    },
    "imagery": [],
    "bibliography": [
      {
        "source": "CDC",
        "title": "Information for Clinicians — E. coli",
        "year": "2024",
        "url": "https://www.cdc.gov/ecoli/hcp/guidance/index.html",
        "status": "Fuentes pendientes de revisión",
        "consultedAt": "2026-10-03"
      }
    ],
    "lastReviewedDate": "2026-10-03"
  },
  {
    "id": "reference-streptococcus-pneumoniae",
    "scientificName": "Streptococcus pneumoniae",
    "commonName": "Neumococo",
    "category": "bacteria",
    "reviewStatus": "Fuentes pendientes de revisión",
    "taxonomy": {
      "family": "Pendiente de fuente taxonómica específica",
      "genus": "Streptococcus",
      "species": "Streptococcus pneumoniae"
    },
    "morphology": {
      "shape": "Bacteria de forma lanceolada; puede colonizar la nasofaringe.",
      "size": "No especificado en las fuentes seleccionadas",
      "gramStain": "Gram positiva",
      "specialStructures": []
    },
    "microbiologyCharacteristics": {},
    "externalAndInternalStructures": [],
    "virulenceFactors": [],
    "reservoir": [
      "Nasofaringe humana"
    ],
    "transmissionRoute": [
      "Contacto con secreciones respiratorias"
    ],
    "associatedDiseases": [
      {
        "name": "Enfermedad neumocócica",
        "description": "Neumococo",
        "clinicalPresentation": [
          "Neumonía",
          "Otitis",
          "Meningitis o bacteriemia según el foco"
        ]
      }
    ],
    "signsAndSymptoms": [
      "Neumonía",
      "Otitis",
      "Meningitis o bacteriemia según el foco"
    ],
    "complications": [
      "Enfermedad invasiva"
    ],
    "clinicalSpecimens": [
      "Sangre o LCR según foco",
      "Otras muestras indicadas clínicamente"
    ],
    "diagnosticMethods": [
      {
        "method": "Cultivo de sitio normalmente estéril",
        "standardRole": "Confirmatorio",
        "keyFindings": "Recuperación en sangre o LCR respalda enfermedad invasiva; no confundir colonización con infección."
      }
    ],
    "labFindings": [],
    "treatment": {
      "disclaimer": "Síntesis educativa. Revisar la guía enlazada y el contexto clínico antes de aplicar un tratamiento. Pendiente de revisión clínica independiente.",
      "firstLine": [
        "Antibiótico según síndrome, gravedad y susceptibilidad; ajustar al aislamiento cuando esté disponible."
      ],
      "alternatives": []
    },
    "prevention": [
      "Vacunación neumocócica según recomendaciones aplicables"
    ],
    "guatemalaRelevance": {
      "endemicStatus": "No documentado en esta ficha",
      "priorityLevel": "No evaluada",
      "departmentsWithHighPrevalence": [],
      "officialNotes": "Estas fuentes no documentan tasas ni departamentos de Guatemala. Pendiente de evidencia MSPAS/OPS; no se asigna grupo de notificación."
    },
    "imagery": [],
    "bibliography": [
      {
        "source": "CDC",
        "title": "Clinical Overview of Pneumococcal Disease",
        "year": "2026",
        "url": "https://www.cdc.gov/pneumococcal/hcp/clinical-overview/index.html",
        "status": "Fuentes pendientes de revisión",
        "consultedAt": "2026-10-03"
      },
      {
        "source": "CDC",
        "title": "Clinical Guidance for Pneumococcal Disease",
        "year": "2026",
        "url": "https://www.cdc.gov/pneumococcal/hcp/clinical-guidance/index.html",
        "status": "Fuentes pendientes de revisión",
        "consultedAt": "2026-10-03"
      }
    ],
    "lastReviewedDate": "2026-10-03"
  },
  {
    "id": "reference-cryptococcus-neoformans",
    "scientificName": "Cryptococcus neoformans",
    "commonName": "Criptococosis",
    "category": "hongo",
    "reviewStatus": "Fuentes pendientes de revisión",
    "taxonomy": {
      "family": "Pendiente de fuente taxonómica específica",
      "genus": "Cryptococcus",
      "species": "Cryptococcus neoformans"
    },
    "morphology": {
      "shape": "Levaduras visualizables mediante tinta china; especie distinta de C. gattii.",
      "size": "No especificado en las fuentes seleccionadas",
      "gramStain": "Tinciones especiales",
      "specialStructures": []
    },
    "microbiologyCharacteristics": {},
    "externalAndInternalStructures": [],
    "virulenceFactors": [],
    "reservoir": [
      "Suelo, madera en descomposición y excrementos de aves"
    ],
    "transmissionRoute": [
      "Inhalación de propágulos ambientales"
    ],
    "associatedDiseases": [
      {
        "name": "Criptococosis pulmonar o meningoencefalitis",
        "description": "Criptococosis",
        "clinicalPresentation": [
          "Tos o dolor torácico",
          "Cefalea, fiebre o cambios del estado mental"
        ]
      }
    ],
    "signsAndSymptoms": [
      "Tos o dolor torácico",
      "Cefalea, fiebre o cambios del estado mental"
    ],
    "complications": [
      "Daño neurológico",
      "Enfermedad diseminada"
    ],
    "clinicalSpecimens": [
      "LCR",
      "Suero o plasma",
      "Muestras para cultivo según foco"
    ],
    "diagnosticMethods": [
      {
        "method": "Antígeno criptocócico",
        "standardRole": "Confirmatorio",
        "keyFindings": "Detección rápida en LCR, suero o plasma; también útil en infección precoz en personas con VIH."
      },
      {
        "method": "Cultivo",
        "standardRole": "Gold Standard",
        "keyFindings": "Permite identificar Cryptococcus y distinguir especies."
      },
      {
        "method": "Tinta china",
        "standardRole": "Tamizaje",
        "keyFindings": "Visualización rápida en LCR; un resultado negativo no descarta por sí solo infección."
      }
    ],
    "labFindings": [],
    "treatment": {
      "disclaimer": "Síntesis educativa. Revisar la guía enlazada y el contexto clínico antes de aplicar un tratamiento. Pendiente de revisión clínica independiente.",
      "firstLine": [
        "El antifúngico depende del foco, gravedad y paciente.",
        "En enfermedad pulmonar grave o del SNC: anfotericina B con flucitosina como inducción, seguida de fluconazol según guía."
      ],
      "alternatives": []
    },
    "prevention": [
      "Evaluación de riesgo y manejo de inmunodeficiencia conforme a guías"
    ],
    "guatemalaRelevance": {
      "endemicStatus": "No documentado en esta ficha",
      "priorityLevel": "No evaluada",
      "departmentsWithHighPrevalence": [],
      "officialNotes": "Estas fuentes no documentan tasas ni departamentos de Guatemala. Pendiente de evidencia MSPAS/OPS; no se asigna grupo de notificación."
    },
    "imagery": [],
    "bibliography": [
      {
        "source": "CDC",
        "title": "Clinical Overview of Cryptococcosis",
        "year": "2024",
        "url": "https://www.cdc.gov/cryptococcosis/hcp/clinical-overview/index.html",
        "status": "Fuentes pendientes de revisión",
        "consultedAt": "2026-10-03"
      }
    ],
    "lastReviewedDate": "2026-10-03"
  },
  {
    "id": "reference-influenza-a-virus",
    "scientificName": "Influenza A virus",
    "commonName": "Virus de la influenza tipo A",
    "category": "virus",
    "reviewStatus": "Fuentes pendientes de revisión",
    "taxonomy": {
      "family": "Orthomyxoviridae",
      "genus": "Influenza",
      "species": "Influenza A virus"
    },
    "morphology": {
      "shape": "Viriones observables por microscopía electrónica; subtipos definidos por hemaglutinina y neuraminidasa.",
      "size": "No especificado en las fuentes seleccionadas",
      "gramStain": "No aplica",
      "specialStructures": []
    },
    "microbiologyCharacteristics": {},
    "externalAndInternalStructures": [],
    "virulenceFactors": [],
    "reservoir": [
      "Hospedadores variables según subtipo; esta ficha enfoca influenza humana"
    ],
    "transmissionRoute": [
      "Secreciones respiratorias en influenza humana"
    ],
    "associatedDiseases": [
      {
        "name": "Influenza",
        "description": "Virus de la influenza tipo A",
        "clinicalPresentation": [
          "Síndrome respiratorio febril"
        ]
      }
    ],
    "signsAndSymptoms": [
      "Síndrome respiratorio febril"
    ],
    "complications": [
      "Enfermedad respiratoria grave",
      "Exacerbación de enfermedades de base"
    ],
    "clinicalSpecimens": [
      "Muestra respiratoria apropiada al ensayo"
    ],
    "diagnosticMethods": [
      {
        "method": "Prueba molecular, incluida RT-PCR",
        "standardRole": "Confirmatorio",
        "keyFindings": "Las pruebas moleculares son más sensibles que los ensayos rápidos de antígeno; seleccionar método según contexto."
      }
    ],
    "labFindings": [],
    "treatment": {
      "disclaimer": "Síntesis educativa. Revisar la guía enlazada y el contexto clínico antes de aplicar un tratamiento. Pendiente de revisión clínica independiente.",
      "firstLine": [
        "En hospitalizados, enfermedad grave o personas con riesgo elevado, iniciar antiviral lo antes posible sin esperar confirmación de laboratorio.",
        "Oseltamivir es una opción de referencia; selección y duración dependen del paciente y guía vigente."
      ],
      "alternatives": []
    },
    "prevention": [
      "Vacunación anual según recomendaciones aplicables",
      "Higiene respiratoria"
    ],
    "guatemalaRelevance": {
      "endemicStatus": "No documentado en esta ficha",
      "priorityLevel": "No evaluada",
      "departmentsWithHighPrevalence": [],
      "officialNotes": "Estas fuentes no documentan tasas ni departamentos de Guatemala. Pendiente de evidencia MSPAS/OPS; no se asigna grupo de notificación."
    },
    "imagery": [
      {
        "type": "microfotografia_real",
        "caption": "Viriones de influenza A H1N1 de un aislamiento de 2009.",
        "stainOrModality": "TEM; sin colorización añadida",
        "creditOrSource": "CDC / Cynthia Goldsmith",
        "url": "https://wwwn.cdc.gov/phil/PHIL_Images/11746/11746_lores.jpg",
        "sourceUrl": "https://wwwn.cdc.gov/phil/Details.aspx?pid=11746",
        "license": "Dominio público; atribución al CDC y autor conocido",
        "licenseUrl": "https://www.cdc.gov/other/agencymaterials.html",
        "imageId": "CDC PHIL 11746",
        "imageDate": "2009",
        "consultedAt": "2026-10-03",
        "interpretation": "Imagen histórica de referencia. La TEM no es la prueba clínica rutinaria para influenza y no identifica la cepa que circula actualmente."
      }
    ],
    "bibliography": [
      {
        "source": "CDC",
        "title": "Types of Influenza Viruses",
        "year": "2025",
        "url": "https://www.cdc.gov/flu/about/viruses-types.html",
        "status": "Fuentes pendientes de revisión",
        "consultedAt": "2026-10-03"
      },
      {
        "source": "CDC",
        "title": "Overview of Influenza Testing Methods",
        "year": "2025",
        "url": "https://www.cdc.gov/flu/hcp/testing-methods/index.html",
        "status": "Fuentes pendientes de revisión",
        "consultedAt": "2026-10-03"
      },
      {
        "source": "CDC",
        "title": "Influenza Antiviral Medications: Summary for Clinicians",
        "year": "2026",
        "url": "https://www.cdc.gov/flu/hcp/antivirals/summary-clinicians.html",
        "status": "Fuentes pendientes de revisión",
        "consultedAt": "2026-10-03"
      }
    ],
    "lastReviewedDate": "2026-10-03"
  }
];
