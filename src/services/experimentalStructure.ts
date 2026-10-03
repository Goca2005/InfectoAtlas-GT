export const EXPERIMENTAL_STRUCTURE={id:'6VXX',title:'Spike de SARS-CoV-2 · estado cerrado',sourceUrl:'https://www.rcsb.org/structure/6VXX',coordinateUrl:'https://files.rcsb.org/download/6VXX.pdb',doi:'https://doi.org/10.2210/pdb6VXX/pdb',publication:'Walls et al. · Cell (2020)',publicationUrl:'https://doi.org/10.1016/j.cell.2020.02.058',method:'Microscopía electrónica / crio-EM',resolution:'2,80 Å',scope:'Ectodominio de la proteína Spike depositada en PDB 6VXX. El visor presenta la traza de carbonos alfa de las cadenas proteicas observadas: no reconstruye el virión completo, azúcares, átomos laterales ni residuos ausentes.',licenseUrl:'https://www.rcsb.org/pages/policies'};
export interface AlphaCarbon {chain:string;residue:number;insertion:string;name:string;x:number;y:number;z:number}
export interface ProteinTrace {chains:{id:string;segments:AlphaCarbon[][]}[];atomCount:number;sha256?:string;retrievedAt?:string}
/** First model, protein ATOM/CA records only. Gaps are never bridged into invented coordinates. */
export function parseAlphaCarbons(pdb:string):ProteinTrace{
  if(pdb.length>4_000_000)throw new Error('El archivo excede el límite de lectura.');
  const chains=new Map<string,AlphaCarbon[]>(),seen=new Set<string>();let started=false;
  for(const line of pdb.split(/\r?\n/)){
    if(line.startsWith('MODEL ')){if(started)break;started=true;continue;}
    if(line.startsWith('ENDMDL'))break;
    if(!line.startsWith('ATOM  ')||line.slice(12,16).trim()!=='CA'||![' ','A'].includes(line[16]))continue;
    const atom={chain:line[21]?.trim()||'_',residue:Number(line.slice(22,26)),insertion:line[26]?.trim()||'',name:line.slice(17,20).trim(),x:Number(line.slice(30,38)),y:Number(line.slice(38,46)),z:Number(line.slice(46,54))};
    if(![line.slice(22,26),line.slice(30,38),line.slice(38,46),line.slice(46,54)].every(v=>v.trim())||!Number.isInteger(atom.residue)||![atom.x,atom.y,atom.z].every(Number.isFinite)||!atom.name)throw new Error('Coordenadas inválidas en el archivo PDB.');
    const key=`${atom.chain}:${atom.residue}:${atom.insertion}`;if(seen.has(key))continue;seen.add(key);
    const list=chains.get(atom.chain)??[];list.push(atom);chains.set(atom.chain,list);
    if(seen.size>15000)throw new Error('Demasiados residuos para este visor.');
  }
  if(seen.size<2)throw new Error('No se encontraron coordenadas de una cadena proteica.');
  return {atomCount:seen.size,chains:Array.from(chains,([id,atoms])=>{const segments:AlphaCarbon[][]=[];for(const atom of atoms){const segment=segments.at(-1),previous=segment?.at(-1);const gap=previous&&(atom.residue-previous.residue>1||atom.residue<previous.residue||Math.hypot(atom.x-previous.x,atom.y-previous.y,atom.z-previous.z)>6);if(!segment||gap)segments.push([atom]);else segment.push(atom);}return {id,segments};})};
}
export async function loadExperimentalStructure(signal:AbortSignal):Promise<ProteinTrace>{
  const response=await fetch(EXPERIMENTAL_STRUCTURE.coordinateUrl,{signal,credentials:'omit',referrerPolicy:'no-referrer'});
  if(!response.ok)throw new Error(`RCSB no pudo entregar las coordenadas (${response.status}).`);
  if(Number(response.headers.get('content-length')??0)>4_000_000)throw new Error('El archivo excede el límite de lectura.');
  const reader=response.body?.getReader();if(!reader)throw new Error('El navegador no permite leer el archivo de coordenadas.');
  const decoder=new TextDecoder();let text='',size=0;
  try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>4_000_000)throw new Error('El archivo excede el límite de lectura.');text+=decoder.decode(value,{stream:true});}text+=decoder.decode();}finally{await reader.cancel().catch(()=>{});reader.releaseLock();}
  const parsed=parseAlphaCarbons(text),digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text));
  return {...parsed,sha256:Array.from(new Uint8Array(digest),v=>v.toString(16).padStart(2,'0')).join(''),retrievedAt:new Date().toISOString()};
}
