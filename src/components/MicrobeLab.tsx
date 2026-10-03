import {useState} from 'react';
import type {Microorganism} from '../types/microorganism';
import {SpecimenLab} from './SpecimenLab';
import {ObservationPractice} from './ObservationPractice';
export default function MicrobeLab({microorganisms=[],onSelectOrganism,initialView='specimens'}:{microorganisms?:Microorganism[];onSelectOrganism?:(o:Microorganism)=>void;initialView?:'specimens'|'practice'}){
  const [view,setView]=useState(initialView);
  return <div className="space-y-5"><nav aria-label="Modalidades del laboratorio" className="flex flex-wrap gap-2">{([['specimens','Muestras reales'],['practice','Práctica de observación']] as const).map(([id,title])=><button key={id} onClick={()=>setView(id)} aria-current={view===id?'page':undefined} className={`rounded-xl px-4 py-3 text-sm font-semibold ${view===id?'bg-slate-900 text-white':'border border-slate-200 bg-white text-slate-600'}`}>{title}</button>)}</nav>
    {view==='specimens'&&<SpecimenLab microorganisms={microorganisms} onSelectOrganism={onSelectOrganism}/>}
    {view==='practice'&&<ObservationPractice microorganisms={microorganisms} onSelectOrganism={onSelectOrganism}/>}
  </div>;
}
