import { useMemo, useState } from 'react';
import type { Microorganism } from '../types/microorganism';
import { observationSession, PRACTICE_KINDS } from '../services/observationPractice';
import { SPECIMEN_LABELS, type SpecimenKind } from '../services/specimenLab';
import { ImageCard } from './SourceImageGallery';

export function ObservationPractice({ microorganisms, onSelectOrganism }: { microorganisms: Microorganism[]; onSelectOrganism?: (o: Microorganism) => void }) {
  const [offset, setOffset] = useState(0), [index, setIndex] = useState(0), [answers, setAnswers] = useState<SpecimenKind[]>([]), [failed, setFailed] = useState('');
  const session = useMemo(() => observationSession(microorganisms, offset), [microorganisms, offset]);
  const current = session[index], answer = answers[index];
  const finished = index >= session.length;
  const correct = answers.filter((answer, i) => answer === session[i]?.specimen).length;
  const restart = () => { setOffset(n => n + 2); setIndex(0); setAnswers([]); };
  return <section className="space-y-5">
    <header className="rounded-2xl bg-slate-950 p-6 text-white border border-sky-900"><p className="text-xs uppercase tracking-widest text-sky-300">Laboratorio · práctica de observación</p><h2 className="mt-2 text-2xl font-bold">De la preparación a su contexto</h2><p className="mt-3 text-sm leading-7 text-slate-300">Observa una fotografía auténtica y elige el grupo de muestra o preparación al que corresponde su registro. Al responder verás la técnica, el organismo atribuido y la fuente. Es un ejercicio de lectura de imágenes de referencia.</p></header>
    {!session.length ? <p>No hay preparaciones documentadas para este ejercicio.</p> : finished ? <div className="rounded-xl border border-sky-200 bg-white p-6 space-y-4"><h3 className="text-xl font-bold">Sesión completada</h3><p>{correct} de {session.length} respuestas coinciden con la clasificación documental.</p><p className="text-xs leading-6 text-slate-600">La puntuación evalúa este ejercicio; no mide capacidad diagnóstica ni identifica muestras de pacientes.</p><button onClick={restart} className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Practicar con otras imágenes</button></div> : <>
      <p role="status" className="text-sm font-semibold text-sky-900">Preparación {index + 1} de {session.length} · {correct} respuestas coinciden con el registro</p>
      <div className="grid gap-5 lg:grid-cols-2">
        <div>{answer ? <ImageCard key={current.id} image={current.image}/> : <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-700">{failed !== current.id ? <img src={current.image.url} alt="Fotografía del ejercicio; la descripción y la técnica se muestran al responder" className="h-80 sm:h-96 w-full object-contain" referrerPolicy="no-referrer" onError={() => setFailed(current.id)}/> : <p className="p-8 text-slate-200">Esta imagen no está disponible. Puedes continuar a la siguiente preparación.</p>}</div>}</div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4"><h3 className="text-lg font-bold">¿A qué grupo corresponde la preparación?</h3><p className="text-xs leading-6 text-slate-600">Observa el fondo, la distribución del material y la escala aparente. El registro original determina la respuesta del ejercicio.</p><div className="grid gap-2">{PRACTICE_KINDS.map(kind => <button disabled={!!answer} key={kind} onClick={() => setAnswers(prev => [...prev, kind])} className={`rounded-lg border p-3 text-left text-sm ${answer && kind === current.specimen ? 'border-emerald-400 bg-emerald-50 text-emerald-950' : answer === kind ? 'border-amber-300 bg-amber-50' : 'border-slate-200 hover:border-sky-400'} disabled:cursor-default`}>{SPECIMEN_LABELS[kind]}</button>)}</div>
          {answer && <div className="rounded-lg bg-slate-50 p-4 space-y-3 text-sm"><p className="font-semibold">{answer === current.specimen ? 'Coincide con el registro.' : 'Revisa la preparación documentada.'}</p><p>{current.image.stainOrModality}</p><p className="text-xs leading-6">{current.classificationNote} La agrupación se basa en metadatos, no en análisis automático de píxeles.</p>{onSelectOrganism && <button className="text-sky-800 font-semibold underline" onClick={() => onSelectOrganism(current.organism)}>Estudiar la ficha de {current.organism.scientificName}</button>}</div>}
          {(answer || failed === current.id) && <button className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white" onClick={() => { if (!answer) setAnswers(prev => [...prev, 'other']); setIndex(n => n + 1); }}>{index + 1 === session.length ? 'Ver resumen de la sesión' : 'Siguiente preparación'}</button>}
        </div>
      </div>
    </>}
  </section>;
}
