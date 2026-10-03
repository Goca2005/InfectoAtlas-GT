export const OFFICIAL_SOURCES = Object.freeze([
  { id: 'mspas', name: 'MSPAS · Guatemala', hosts: ['epidemiologia.mspas.gob.gt', 'www.epidemiologia.mspas.gob.gt', 'www.mspas.gob.gt', 'mspas.gob.gt'],
    links: [{ label: 'Alertas epidemiológicas MSPAS', url: 'https://epidemiologia.mspas.gob.gt/informacion/vigilancia-epidemiologica/alertas-epidemiologicas' }, { label: 'Boletines MSPAS', url: 'https://epidemiologia.mspas.gob.gt/informacion/vigilancia-epidemiologica/boletin' }] },
  { id: 'paho', name: 'OPS / PAHO', hosts: ['www.paho.org', 'paho.org'], links: [{ label: 'Alertas y actualizaciones OPS', url: 'https://www.paho.org/en/epidemiological-alerts-and-updates' }] },
  { id: 'who', name: 'OMS / WHO', hosts: ['www.who.int', 'who.int'], links: [{ label: 'Disease Outbreak News OMS', url: 'https://www.who.int/emergencies/disease-outbreak-news' }] },
]);

// This validates the address only. It does not assert that an attached file came from it.
export function officialSourceUrl(sourceId, value) {
  const source = OFFICIAL_SOURCES.find(item => item.id === sourceId);
  if (!source || typeof value !== 'string' || value.length > 2000 || /[\x00-\x20\\]/.test(value)) throw new Error('El enlace oficial no es válido.');
  let url;
  try { url = new URL(value); } catch { throw new Error('Usa un enlace HTTPS completo.'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.port || !source.hosts.includes(url.hostname)) {
    throw new Error('El enlace debe pertenecer al dominio oficial de la institución seleccionada.');
  }
  url.hash = '';
  return url.href;
}
