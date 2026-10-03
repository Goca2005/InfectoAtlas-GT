import type {AcademicDocument,ExtractionProposal,FieldToModify} from '../types/academicLibrary';
import type {Microorganism} from '../types/microorganism';
import {buildDocumentAtlas,documentBlocks,sectionOfText} from './documentAtlas';
const fields:Partial<Record<ReturnType<typeof sectionOfText>,FieldToModify>>={morphology:'Morfología microscópica',cycle:'Ciclo biológico y estadios',diagnosis:'Método de identificación',treatment:'Tratamiento y manejo',prevention:'Prevención y control',epidemiology:'Epidemiología y datos Guatemala'};
/** Local, deterministic indexing. Original text and page survive every proposal. */
export async function analyzeAcademicDocument(doc:AcademicDocument,existing:Microorganism[]):Promise<ExtractionProposal[]> {
  const atlas=buildDocumentAtlas([doc],existing),proposals:ExtractionProposal[]=[];
  for(const organism of atlas.organisms){const pages=atlas.links.get(organism.id)??[];if(!pages.length)continue;
    const newOrganism=!!organism.documentIndexed;
    for(const page of newOrganism?pages.slice(0,1):pages){
      const blocks=newOrganism?[{text:page.text,section:sectionOfText(page.text),start:0}]:documentBlocks(page.text);
      for(const block of blocks){
        const field=newOrganism?'Nueva ficha de microorganismo':fields[block.section];if(!field)continue;
        const snippet=block.text.trim();const contextual=page.association==='heading'||page.mentionedNames.length>1;
        proposals.push({id:`prop-v3-${doc.id}-p${page.pageNumber}-${organism.id}-${field}-${block.start}`,documentId:doc.id,documentTitle:doc.title,sourceTier:doc.sourceTier,sourcePage:page.pageNumber,sourceSnippet:snippet.slice(0,260),originalSnippet:snippet,isExplicitFact:!contextual,targetMicroorganismId:newOrganism?'new-'+organism.id.replace(/^document-index-/,''):organism.id,targetMicroorganismName:organism.scientificName,isNewOrganism:newOrganism,proposedCategory:organism.category,field,previousValue:field==='Morfología microscópica'?organism.morphology.shape:null,proposedValue:snippet,potentialContradiction:contextual?'Revisar atribución: la página menciona varios agentes o continúa un epígrafe anterior. No todo el texto necesariamente corresponde a esta especie.':null,verificationStatus:doc.sourceTier==='Apunte universitario'?'Información procedente de apunte universitario (Requiere comprobación)':'En proceso de validación',status:'pendiente'});
      }
    }
  }
  return proposals;
}
