import React, { useEffect, useState } from 'react';
import { OfficialBulletinRepository, OFFICIAL_EVENT } from '../services/officialBulletins';
import { LIVE_EVENT } from '../services/liveService';
import type { OfficialBulletin } from '../types/officialBulletin';

export function OfficialBulletinLinks({ organismId }: { organismId: string }) {
  const [records, setRecords] = useState<OfficialBulletin[]>([]); const [error, setError] = useState('');
  useEffect(() => {
    const refresh = () => { try { setRecords(new OfficialBulletinRepository(localStorage).read().bulletins.filter(record => record.status !== 'discarded' && record.relatedOrganismIds.includes(organismId))); setError(''); } catch (failure) { setError(failure instanceof Error ? failure.message : 'No se pudo leer el registro.'); } };
    refresh(); window.addEventListener(OFFICIAL_EVENT, refresh); window.addEventListener(LIVE_EVENT, refresh); window.addEventListener('storage', refresh);
    return () => { window.removeEventListener(OFFICIAL_EVENT, refresh); window.removeEventListener(LIVE_EVENT, refresh); window.removeEventListener('storage', refresh); };
  }, [organismId]);
  return <div className="space-y-2 rounded-lg border border-slate-200 p-3 text-xs"><h4 className="font-bold">Documentos oficiales vinculados</h4>
    <p className="text-slate-500">Selección documental del usuario. La vinculación y la revisión de procedencia no aprueban cambios clínicos.</p>
    {error && <p role="alert">{error}</p>}
    {!error && !records.length && <p className="text-slate-500">Aún no hay documentos vinculados. Incorpóralos en Guatemala Sentinel o Global Watch.</p>}
    {records.map(record => <div key={record.id} className="space-y-1"><a href={record.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sky-800 underline">{record.title}</a><p>{record.status === 'reviewed' ? 'Procedencia revisada por usuario' : 'Pendiente de revisión'} · {record.publicationDate ?? 'Fecha no consta'} · {record.territory}</p></div>)}
  </div>;
}
