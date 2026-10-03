// Future providers must return traced records and declare their retrieval mode.
// Registration alone never starts a fetch, schedule or paid service.
export const sourceAdapters = Object.freeze([
  { id: 'mspas', label: 'Guatemala Sentinel · MSPAS', status: 'planned', mode: 'official-link-or-document', url: 'https://epidemiologia.mspas.gob.gt/' },
  { id: 'pubmed', label: 'PubMed / NCBI E-utilities', status: 'implemented', mode: 'manual-api', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
  { id: 'who', label: 'OMS · Disease Outbreak News', status: 'planned', mode: 'official-link-or-document', url: 'https://www.who.int/emergencies/disease-outbreak-news' },
  { id: 'paho', label: 'OPS · Alertas y actualizaciones', status: 'planned', mode: 'official-link-or-document', url: 'https://www.paho.org/en/epidemiological-alerts-and-updates' },
]);
