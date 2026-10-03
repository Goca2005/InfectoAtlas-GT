// Search terms for grouped or annotated names in the existing catalogue.
// These aliases affect literature search only; no clinical record is changed.
/** @type {Record<string, string[]>} */
const aliases = {
  'virus-del-dengue': ['Dengue virus'],
  'leishmania-braziliensis': ['Leishmania braziliensis', 'Leishmania mexicana'],
  'necator-americanus': ['Necator americanus', 'Ancylostoma duodenale'],
  'cryptosporidium-parvum': ['Cryptosporidium parvum', 'Cryptosporidium hominis'],
  'pediculus-humanus': ['Pediculus humanus capitis', 'Pediculus humanus corporis'],
  'salmonella-enterica-typhi': ['Salmonella Typhi', 'Salmonella enterica serovar Typhi'],
};
export const getOrganismTerms = organism => aliases[organism.id] ?? [organism.scientificName];
export const organismSearchTerm = organism => getOrganismTerms(organism).join(' | ');
