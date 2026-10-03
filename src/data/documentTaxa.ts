import type {MicroorganismCategory} from '../types/microorganism';
export interface DocumentTaxon {name:string;category:MicroorganismCategory;aliases:string[];group?:boolean}
// Recognition vocabulary, not clinical fichas or a claim about circulation in Guatemala.
// Historical names remain searchable when that is the name used by the uploaded document.
export const TAXONOMY_INDEX_SOURCES=['https://www.ncbi.nlm.nih.gov/books/NBK7627/toc/','https://www.cdc.gov/dpdx/az.html','https://www.cdc.gov/fungal/about/types-of-fungal-diseases.html'];
const groups:Record<Exclude<MicroorganismCategory,'virus'>,string>={
  bacteria:'Staphylococcus aureus;Staphylococcus epidermidis;Staphylococcus saprophyticus;Streptococcus pyogenes;Streptococcus agalactiae;Streptococcus pneumoniae;Streptococcus mutans;Enterococcus faecalis;Enterococcus faecium;Neisseria gonorrhoeae;Neisseria meningitidis;Moraxella catarrhalis;Bacillus anthracis;Bacillus cereus;Clostridium tetani;Clostridium botulinum;Clostridium perfringens;Clostridioides difficile;Corynebacterium diphtheriae;Listeria monocytogenes;Lactobacillus acidophilus;Escherichia coli;Klebsiella pneumoniae;Klebsiella oxytoca;Enterobacter cloacae;Serratia marcescens;Citrobacter freundii;Proteus mirabilis;Proteus vulgaris;Morganella morganii;Providencia stuartii;Salmonella enterica;Salmonella Typhi;Salmonella Paratyphi;Shigella dysenteriae;Shigella flexneri;Shigella sonnei;Shigella boydii;Yersinia enterocolitica;Yersinia pestis;Pseudomonas aeruginosa;Acinetobacter baumannii;Stenotrophomonas maltophilia;Burkholderia cepacia;Vibrio cholerae;Vibrio parahaemolyticus;Vibrio vulnificus;Campylobacter jejuni;Campylobacter coli;Helicobacter pylori;Haemophilus influenzae;Haemophilus ducreyi;Bordetella pertussis;Bordetella parapertussis;Brucella abortus;Brucella melitensis;Brucella suis;Francisella tularensis;Pasteurella multocida;Legionella pneumophila;Mycobacterium tuberculosis;Mycobacterium leprae;Mycobacterium avium;Mycobacterium kansasii;Mycobacterium marinum;Mycoplasma pneumoniae;Mycoplasma hominis;Mycoplasma genitalium;Ureaplasma urealyticum;Treponema pallidum;Leptospira interrogans;Borrelia burgdorferi;Borrelia recurrentis;Chlamydia trachomatis;Chlamydia pneumoniae;Chlamydia psittaci;Rickettsia rickettsii;Rickettsia prowazekii;Rickettsia typhi;Coxiella burnetii;Nocardia asteroides;Nocardia brasiliensis;Actinomyces israelii;Cutibacterium acnes',
  hongo:'Candida albicans;Candida tropicalis;Candida parapsilosis;Candida glabrata;Candida krusei;Cryptococcus neoformans;Cryptococcus gattii;Histoplasma capsulatum;Coccidioides immitis;Coccidioides posadasii;Blastomyces dermatitidis;Paracoccidioides brasiliensis;Sporothrix schenckii;Aspergillus fumigatus;Aspergillus flavus;Aspergillus niger;Pneumocystis jirovecii;Trichophyton rubrum;Trichophyton mentagrophytes;Trichophyton tonsurans;Microsporum canis;Microsporum gypseum;Epidermophyton floccosum;Malassezia furfur;Hortaea werneckii;Piedraia hortae;Trichosporon asahii;Fonsecaea pedrosoi;Cladophialophora carrionii;Madurella mycetomatis;Rhizopus arrhizus;Mucor circinelloides;Talaromyces marneffei',
  parasito:'Entamoeba histolytica;Entamoeba dispar;Entamoeba coli;Entamoeba hartmanni;Endolimax nana;Iodamoeba buetschlii;Giardia duodenalis;Trichomonas vaginalis;Balantidium coli;Dientamoeba fragilis;Chilomastix mesnili;Blastocystis hominis;Naegleria fowleri;Acanthamoeba castellanii;Balamuthia mandrillaris;Toxoplasma gondii;Cryptosporidium parvum;Cryptosporidium hominis;Cyclospora cayetanensis;Cystoisospora belli;Sarcocystis hominis;Sarcocystis suihominis;Plasmodium vivax;Plasmodium falciparum;Plasmodium malariae;Plasmodium ovale;Plasmodium knowlesi;Trypanosoma cruzi;Trypanosoma brucei;Leishmania braziliensis;Leishmania mexicana;Leishmania donovani;Leishmania infantum;Ascaris lumbricoides;Enterobius vermicularis;Trichuris trichiura;Strongyloides stercoralis;Ancylostoma duodenale;Necator americanus;Trichinella spiralis;Toxocara canis;Toxocara cati;Wuchereria bancrofti;Brugia malayi;Onchocerca volvulus;Loa loa;Mansonella perstans;Dracunculus medinensis;Taenia solium;Taenia saginata;Hymenolepis nana;Hymenolepis diminuta;Diphyllobothrium latum;Echinococcus granulosus;Echinococcus multilocularis;Dipylidium caninum;Fasciola hepatica;Schistosoma mansoni;Schistosoma haematobium;Schistosoma japonicum;Paragonimus westermani;Clonorchis sinensis;Opisthorchis viverrini;Sarcoptes scabiei;Pediculus humanus;Pthirus pubis',
};
const aliases:Record<string,string[]>={
  'Giardia duodenalis':['Giardia lamblia','Giardia intestinalis'],
  'Clostridioides difficile':['Clostridium difficile'],
  'Salmonella Typhi':['Salmonella typhi','Salmonella enterica serovar Typhi','Salmonella enterica subsp. enterica serovar Typhi'],
  'Salmonella Paratyphi':['Salmonella paratyphi','Salmonella enterica serovar Paratyphi'],
  'Balantidium coli':['Balantioides coli'],
  'Cystoisospora belli':['Isospora belli'],
  'Diphyllobothrium latum':['Dibothriocephalus latus'],
  'Cutibacterium acnes':['Propionibacterium acnes'],
  'Talaromyces marneffei':['Penicillium marneffei'],
};
const viruses:[string,string[]][]=[
  ['Parvovirus B19',['Human parvovirus B19','parvovirus humano B19']],
  ['Herpes simplex virus 1',['HSV-1','HSV 1','VHS-1','VHS 1','herpes simple tipo 1','herpes simplex tipo 1','virus del herpes simple 1','virus herpes tipo 1']],
  ['Herpes simplex virus 2',['HSV-2','HSV 2','VHS-2','VHS 2','herpes simple tipo 2','herpes simplex tipo 2','virus del herpes simple 2','virus herpes tipo 2']],
  ['Varicella-zoster virus',['virus varicela zoster','virus de la varicela','VVZ','VZV']],
  ['Epstein-Barr virus',['virus de Epstein-Barr','virus Epstein Barr','VEB','EBV']],
  ['Cytomegalovirus',['citomegalovirus','CMV']],
  ['Human herpesvirus 6',['herpesvirus humano 6','HHV-6','VHH-6']],
  ['Human herpesvirus 7',['herpesvirus humano 7','HHV-7','VHH-7']],
  ['Human herpesvirus 8',['herpesvirus humano 8','HHV-8','VHH-8']],
  ['Hepatitis A virus',['virus de la hepatitis A','hepatitis A','VHA','HAV']],
  ['Hepatitis B virus',['virus de la hepatitis B','hepatitis B','VHB','HBV']],
  ['Hepatitis C virus',['virus de la hepatitis C','hepatitis C','VHC','HCV']],
  ['Hepatitis D virus',['virus de la hepatitis D','hepatitis D','VHD','HDV']],
  ['Hepatitis E virus',['virus de la hepatitis E','hepatitis E','VHE','HEV']],
  ['Virus de la inmunodeficiencia humana (grupo)',['virus de la inmunodeficiencia humana','VIH','HIV']],
  ['Human papillomavirus (grupo)',['papilomavirus humano','virus del papiloma humano','VPH','HPV']],
  ['Influenza A virus',['virus de influenza A','influenza A']],
  ['Influenza B virus',['virus de influenza B','influenza B']],
  ['Respiratory syncytial virus',['virus sincitial respiratorio','virus respiratorio sincitial','VRS','RSV']],
  ['Human metapneumovirus',['metapneumovirus humano','hMPV']],
  ['SARS-CoV-2',['SARS CoV 2']],
  ['Dengue virus (DENV 1, 2, 3, 4)',['Dengue virus','virus del dengue','DENV']],
  ['Zika virus',['virus del Zika','virus Zika']],
  ['Chikungunya virus',['virus Chikungunya','virus del Chikungunya']],
  ['Rabies virus',['virus de la rabia']],
  ['Measles virus',['virus del sarampion','virus del sarampión']],
  ['Mumps virus',['virus de la parotiditis','virus de las paperas']],
  ['Rubella virus',['virus de la rubeola','virus de la rubéola']],
  ['Poliovirus (grupo)',['poliovirus']],
  ['Rotavirus (grupo)',['rotavirus']],
  ['Norovirus (grupo)',['norovirus']],
  ['Adenovirus (grupo)',['adenovirus']],
  ['Rhinovirus (grupo)',['rinovirus','rhinovirus']],
  ['Parainfluenza virus (grupo)',['parainfluenza']],
];
const species=Object.entries(groups).flatMap(([category,names])=>names.split(';').map(name=>({name,category:category as MicroorganismCategory,aliases:[name,...(aliases[name]??[])]})));
const genusGroups=Array.from(new Map(species.map(t=>[t.name.split(' ')[0],{name:`${t.name.split(' ')[0]} spp. (grupo)`,category:t.category,aliases:[t.name.split(' ')[0]],group:true}])).values());
export const DOCUMENT_TAXA:DocumentTaxon[]=[...species,...genusGroups,...viruses.map(([name,other])=>({name,category:'virus' as const,aliases:[name,...other],group:name.includes('(grupo)')}))];
