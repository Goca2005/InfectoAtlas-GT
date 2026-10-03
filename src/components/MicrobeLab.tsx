import {lazy,Suspense,useState} from 'react';
import {MODEL_PROFILES} from '../data/modelProfiles';
import type {Microorganism} from '../types/microorganism';
import {SpecimenLab} from './SpecimenLab';
import {ExperimentalLab} from './ExperimentalLab';
import {ObservationPractice} from './ObservationPractice';
const MicrobeScene=lazy(()=>import('./MicrobeScene'));
export default function MicrobeLab({initialKind='bacteria',microorganisms=[],onSelectOrganism,initialView='specimens'}:{initialKind?:string;microorganisms?:Microorganism[];onSelectOrganism?:(o:Microorganism)=>void;initialView?:'specimens'|'experimental'|'schematic'|'practice'}){
  const [kind,setKind]=useState(initialKind),[view,setView]=useState(initialView);
  const profile=MODEL_PROFILES.find(p=>p.kind===kind)??MODEL_PROFILES[0];
  return <div className="space-y-5"><nav aria-label="Modalidades del laboratorio" className="flex flex-wrap gap-2">{([['specimens','Muestras reales'],['practice','Práctica de observación'],['experimental','3D experimental'],['schematic','Esquemas de anatomía']] as const).map(([id,title])=><button key={id} onClick={()=>setView(id)} aria-current={view===id?'page':undefined} className={`rounded-xl px-4 py-3 text-sm font-semibold ${view===id?'bg-slate-900 text-white':'border border-slate-200 bg-white text-slate-600'}`}>{title}</button>)}</nav>
    {view==='specimens'&&<SpecimenLab microorganisms={microorganisms} onSelectOrganism={onSelectOrganism}/>}
    {view==='practice'&&<ObservationPractice microorganisms={microorganisms} onSelectOrganism={onSelectOrganism}/>}
    {view==='experimental'&&<ExperimentalLab/>}
    {view==='schematic'&&<section className="space-y-4"><h2 className="text-xl font-semibold">Anatomía esquemática</h2><p className="text-sm leading-7 text-slate-600">Formas didácticas para estudiar estructuras generales. Las muestras reales y las coordenadas experimentales están en las otras modalidades del laboratorio.</p><label className="block text-sm font-semibold">Modelo educativo<select className="mt-2 block w-full rounded-xl border border-slate-300 bg-white p-3" value={kind} onChange={e=>setKind(e.target.value)}>{MODEL_PROFILES.map(p=><option key={p.kind} value={p.kind}>{p.title}</option>)}</select></label><Suspense fallback={<p role="status">Preparando esquema…</p>}><MicrobeScene key={profile.kind} profile={profile}/></Suspense></section>}
  </div>;
}
