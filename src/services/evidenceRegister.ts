import type { StorageAdapter } from './storageService';
export const EVIDENCE_COUNTRIES=['Guatemala','México','Belice','Honduras','El Salvador','Nicaragua','Costa Rica','Panamá','Regional / internacional'] as const;
export type EvidenceKind='amr'|'treatment';
export type EvidenceInput={kind:EvidenceKind;organism:string;country:string;title:string;sourceUrl:string;publisher:string;sourceDate:string;sourceLocator:string;population:string;summary:string;drug?:string;specimen?:string;periodStart?:string;periodEnd?:string;standard?:string;standardVersion?:string;tested?:number;resistant?:number;version?:string;supersedes?:string};
export type EvidenceRecord=EvidenceInput&{id:string;addedAt:string;review:'pending'|'accepted'|'rejected';reviews:{decision:'accepted'|'rejected';reviewer:string;note:string;at:string}[]};
const KEY='infectoatlas_user_settings_v1', NAMESPACE='evidenceRegisterV1';
const record=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==='object'&&!Array.isArray(v);
const text=(v:unknown,label:string,max=700)=>{if(typeof v!=='string'||!v.trim()||v.trim().length>max)throw new Error(`${label}: completa el campo (máximo ${max} caracteres).`);return v.trim();};
function date(v:unknown,label:string){const s=text(v,label,10);if(!/^\d{4}-\d{2}-\d{2}$/.test(s)||new Date(`${s}T00:00:00Z`).toISOString().slice(0,10)!==s)throw new Error(`${label}: fecha inválida.`);return s;}
export function validateEvidence(value:unknown):EvidenceInput {
  if(!record(value)||!['amr','treatment'].includes(String(value.kind)))throw new Error('Tipo de registro inválido.');
  const kind=value.kind as EvidenceKind;
  const allowed=['kind','organism','country','title','sourceUrl','publisher','sourceDate','sourceLocator','population','summary',...(kind==='amr'?['drug','specimen','periodStart','periodEnd','standard','standardVersion','tested','resistant']:['version','supersedes'])];
  if(Object.keys(value).some(k=>!allowed.includes(k)))throw new Error('El registro contiene campos desconocidos. Importa datos agregados sin nombres, identificadores ni información de pacientes.');
  const url=new URL(text(value.sourceUrl,'Enlace de la fuente',1200));
  if(url.protocol!=='https:'||url.username||url.password)throw new Error('La fuente necesita un enlace HTTPS sin credenciales.');
  const country=text(value.country,'País',50);if(!(EVIDENCE_COUNTRIES as readonly string[]).includes(country))throw new Error('Selecciona el país de la fuente.');
  const result:EvidenceInput={kind,organism:text(value.organism,'Microorganismo',120),country,title:text(value.title,'Título',240),sourceUrl:url.href,publisher:text(value.publisher,'Institución / autores',180),sourceDate:date(value.sourceDate,'Fecha de la fuente'),sourceLocator:text(value.sourceLocator,'Página, tabla o sección',150),population:text(value.population,'Población y contexto',350),summary:text(value.summary,'Síntesis',700)};
  if(kind==='amr'){
    for(const [field,label] of [['drug','Antimicrobiano'],['specimen','Tipo de muestra'],['standard','Método y norma'],['standardVersion','Versión de la norma']] as const)result[field]=text(value[field],label,180);
    result.periodStart=date(value.periodStart,'Inicio del periodo');result.periodEnd=date(value.periodEnd,'Fin del periodo');
    if(result.periodStart>result.periodEnd)throw new Error('El periodo de vigilancia está invertido.');
    if(!Number.isSafeInteger(value.tested)||Number(value.tested)<1||Number(value.tested)>1e9||!Number.isSafeInteger(value.resistant)||Number(value.resistant)<0||Number(value.resistant)>Number(value.tested))throw new Error('El total debe ser un entero positivo; resistentes debe estar entre 0 y el total.');
    result.tested=Number(value.tested);result.resistant=Number(value.resistant);
  }else{result.version=text(value.version,'Versión / edición',100);if(value.supersedes)result.supersedes=text(value.supersedes,'Versión anterior',100);}
  return result;
}
export function resistancePercent(record:EvidenceInput){return record.kind==='amr'&&record.tested?100*(record.resistant??0)/record.tested:null;}
function fingerprint(input:EvidenceInput){return JSON.stringify(Object.entries(input).sort(([a],[b])=>a.localeCompare(b)));}
const inputFromRecord=({id,addedAt,review,reviews,...input}:EvidenceRecord)=>input;
export class EvidenceRegister {
  constructor(private storage:StorageAdapter=globalThis.localStorage){}
  private settings(){const raw=this.storage.getItem(KEY);if(raw===null)return {};const settings:unknown=JSON.parse(raw);if(!record(settings))throw new Error('Los ajustes guardados no tienen un formato válido. Exporta tu respaldo antes de repararlos.');return settings;}
  read():EvidenceRecord[]{
    const raw=this.settings()[NAMESPACE];if(raw===undefined)return [];
    if(!record(raw)||raw.schemaVersion!==1||!Array.isArray(raw.records)||raw.records.length>200)throw new Error('El registro de evidencia guardado no es válido; no se reemplazó.');
    const ids=new Set<string>();
    return raw.records.map(v=>{if(!record(v)||typeof v.id!=='string'||!v.id||ids.has(v.id)||typeof v.addedAt!=='string'||!Number.isFinite(Date.parse(v.addedAt))||!['pending','accepted','rejected'].includes(String(v.review))||!Array.isArray(v.reviews)||v.reviews.length>20)throw new Error('Registro de evidencia dañado; no se reemplazó.');ids.add(v.id);
      const {id,addedAt,review,reviews,...input}=v;
      const validated=validateEvidence(input);
      const history=reviews.map(r=>{if(!record(r)||!['accepted','rejected'].includes(String(r.decision))||typeof r.at!=='string'||!Number.isFinite(Date.parse(r.at)))throw new Error('Historial de revisión dañado.');return {decision:r.decision as 'accepted'|'rejected',reviewer:text(r.reviewer,'Revisor',120),note:text(r.note,'Nota de revisión',700),at:r.at};});
      if((review==='pending'&&history.length)||(review!=='pending'&&history.at(-1)?.decision!==review))throw new Error('Estado e historial de revisión inconsistentes.');
      return {...validated,id,addedAt,review:review as EvidenceRecord['review'],reviews:history};});
  }
  private write(records:EvidenceRecord[]){if(records.length>200)throw new Error('Límite de 200 registros. Exporta y archiva antes de agregar más.');this.storage.setItem(KEY,JSON.stringify({...this.settings(),[NAMESPACE]:{schemaVersion:1,records}}));}
  add(values:unknown[],now=new Date().toISOString()){
    if(!Array.isArray(values)||!values.length||values.length>100)throw new Error('Importa entre 1 y 100 registros.');
    const inputs=values.map(validateEvidence),records=this.read(),keys=new Set(records.map(r=>fingerprint(inputFromRecord(r))));
    let added=0;for(const input of inputs){const key=fingerprint(input);if(keys.has(key))continue;
      if(input.supersedes&&!records.some(r=>r.id===input.supersedes&&r.kind==='treatment'&&r.organism.toLowerCase()===input.organism.toLowerCase()&&r.country===input.country))throw new Error('La versión anterior debe existir para el mismo microorganismo y país.');
      keys.add(key);records.push({...input,id:crypto.randomUUID(),addedAt:now,review:'pending',reviews:[]});added++;}
    if(added)this.write(records);return {added,duplicates:values.length-added};
  }
  review(id:string,decision:'accepted'|'rejected',reviewer:string,note:string,now=new Date().toISOString()){
    if(!['accepted','rejected'].includes(decision))throw new Error('Decisión inválida.');
    const event={decision,reviewer:text(reviewer,'Nombre del revisor',120),note:text(note,'Nota de revisión',700),at:now};
    const records=this.read(), index=records.findIndex(r=>r.id===id);if(index<0)throw new Error('Registro no encontrado.');
    if(records[index].reviews.length>=20)throw new Error('Límite de revisiones de este registro.');
    records[index]={...records[index],review:decision,reviews:[...records[index].reviews,event]};this.write(records);
  }
  exportInputs(kind:EvidenceKind){return this.read().filter(r=>r.kind===kind).map(r=>{const {supersedes,...input}=inputFromRecord(r);return input;});}
}
