import { BibliographicSource } from '../types/diagnostics';

export const OFFICIAL_BIBLIOGRAPHY: BibliographicSource[] = [
  {
    id: 'mspas-tuberculosis-2023',
    title: 'Manual de Normas de Atención para la Prevención y Control de la Tuberculosis en Guatemala',
    institutionOrAuthors: 'Ministerio de Salud Pública y Asistencia Social (MSPAS) - Programa Nacional de Tuberculosis',
    type: 'Guía Clínica Oficial',
    year: '2023',
    organization: 'MSPAS Guatemala',
    status: 'Verificado',
    urlOrCitation: 'MSPAS Guatemala, Ciudad de Guatemala, 2023.',
    notes: 'Lineamientos técnicos oficiales de diagnóstico molecular por GeneXpert, esquema TAES/DOTS acortado y manejo de coinfección TB/VIH.'
  },
  {
    id: 'mspas-dengue-2023',
    title: 'Guía Clínica para el Diagnóstico y Manejo del Paciente con Dengue en Guatemala',
    institutionOrAuthors: 'MSPAS - Dirección de Epidemiología y Gestión de Riesgo',
    type: 'Guía Clínica Oficial',
    year: '2023',
    organization: 'MSPAS Guatemala',
    status: 'Verificado',
    urlOrCitation: 'Dirección del Sistema Integral de Atención en Salud (SIAS) / MSPAS.',
    notes: 'Clasificación clínica de la OPS (sin signos de alarma, con signos de alarma, dengue grave), esquemas de rehidratación endovenosa por etapas y contraindicación de AINES.'
  },
  {
    id: 'ops-malaria-2021',
    title: 'Plan Estratégico Nacional para la Eliminación de la Malaria en Guatemala 2021-2025',
    institutionOrAuthors: 'Organización Panamericana de la Salud (OPS/OMS) y MSPAS de Guatemala',
    type: 'Boletín Epidemiológico',
    year: '2021',
    organization: 'OPS / OMS',
    status: 'Verificado',
    urlOrCitation: 'Iniciativa regional E-2025 para la eliminación de la transmisión autóctona de Plasmodium.',
    notes: 'Estratificación de focos endémicos en Escuintla, Izabal, Alta Verapaz y Petén; pautas de Cloroquina + Primaquina para cura radical.'
  },
  {
    id: 'cdc-dpdx-parasitology',
    title: 'DPDx - Laboratory Identification of Parasites of Public Health Concern',
    institutionOrAuthors: 'Centers for Disease Control and Prevention (CDC) - Division of Parasitic Diseases and Malaria',
    type: 'Guía Clínica Oficial',
    year: '2024',
    organization: 'CDC',
    status: 'Revisado',
    urlOrCitation: 'CDC DPDx Resource Center, Atlanta, GA, USA.',
    notes: 'Referencia morfológica microscópica para estadios diagnósticos de protozoos (Entamoeba, Plasmodium, Giardia) y helmintos (Taenia, Ascaris).'
  },
  {
    id: 'murray-microbiology-9th',
    title: 'Medical Microbiology (9th Edition)',
    institutionOrAuthors: 'Patrick R. Murray, Ken S. Rosenthal, Michael A. Pfaller',
    type: 'Libro de Texto Universitario',
    year: '2021',
    organization: 'Literatura Médica Académica',
    status: 'Revisado',
    urlOrCitation: 'Elsevier Health Sciences, ISBN 978-0323611794.',
    notes: 'Texto estándar de bacteriología médica, factores de virulencia, tinción de Gram, metabolismo y mecanismos de resistencia microbiana.'
  },
  {
    id: 'botero-parasitologia-6th',
    title: 'Parasitosis Humanas (6ª Edición)',
    institutionOrAuthors: 'David Botero, Marcos Restrepo',
    type: 'Libro de Texto Universitario',
    year: '2019',
    organization: 'Literatura Médica Académica',
    status: 'Revisado',
    urlOrCitation: 'Corporación para Investigaciones Biológicas (CIB), Medellín, Colombia.',
    notes: 'Tratado clásico latinoamericano de protozoología y helmintología médica, ciclos biológicos, morfología de estadios y parasitismo en Centroamérica.'
  },
  {
    id: 'mandell-infectious-diseases-9th',
    title: 'Mandell, Douglas, and Bennett’s Principles and Practice of Infectious Diseases (9th Edition)',
    institutionOrAuthors: 'John E. Bennett, Raphael Dolin, Martin J. Blaser',
    type: 'Libro de Texto Universitario',
    year: '2020',
    organization: 'Literatura Médica Académica',
    status: 'Revisado',
    urlOrCitation: 'Elsevier, 2 Volúmenes, ISBN 978-0323482554.',
    notes: 'Tratado cumbre de infectología clínica para dosificación antimicrobiana, guías IDSA y diagnóstico diferencial de patógenos complejos.'
  }
];
