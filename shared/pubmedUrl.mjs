export function pubmedSearchUrl(term, from = '', to = '') {
  // Date limits are part of the original-source link as well as the API call.
  const range = from || to ? ` AND ("${(from || '1000-01-01').replaceAll('-', '/')}"[Date - Publication] : "${(to || '3000-12-31').replaceAll('-', '/')}"[Date - Publication])` : '';
  return `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(term + range)}`;
}
