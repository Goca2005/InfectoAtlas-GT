import { lazy, Suspense, useState } from 'react';
import { MODEL_PROFILES } from '../data/modelProfiles';
const MicrobeScene = lazy(()=>import('./MicrobeScene'));
export default function MicrobeLab({initialKind='bacteria'}:{initialKind?:string}) {
  const [kind,setKind]=useState(initialKind);
  const profile=MODEL_PROFILES.find(p=>p.kind===kind)??MODEL_PROFILES[0];
  return <div className="space-y-4"><h2 className="text-2xl font-bold">Laboratorio de microorganismos en 3D</h2><p className="text-sm text-slate-600">Elige la forma biológica que quieres estudiar. Cada modelo indica su alcance; las microfotografías reales están en la galería de cada ficha.</p>
    <label className="block text-sm font-semibold">Modelo educativo<select className="block mt-1 w-full rounded-lg border border-slate-300 bg-white p-3" value={kind} onChange={e=>setKind(e.target.value)}>{MODEL_PROFILES.map(p=><option key={p.kind} value={p.kind}>{p.title}</option>)}</select></label>
    <Suspense fallback={<p role="status">Preparando laboratorio…</p>}><MicrobeScene key={profile.kind} profile={profile}/></Suspense>
  </div>;
}
