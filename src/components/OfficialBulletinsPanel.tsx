import React, { useEffect, useRef, useState } from 'react';
import { FileText, ExternalLink, Loader2 } from 'lucide-react';
import type { Microorganism } from '../types/microorganism';
import type { BulletinInput, OfficialBulletin, OfficialSourceId } from '../types/officialBulletin';
import type { ExtractedPage } from '../types/academicLibrary';
import { OfficialBulletinRepository, OFFICIAL_EVENT, validateBulletinInput } from '../services/officialBulletins';
import { LIVE_EVENT } from '../services/liveService';
import { OFFICIAL_SOURCES } from '../../shared/officialSources.mjs';
import { GUATEMALA_DEPARTMENTS } from '../data/guatemalaDepartments';
import { extractTextFromPDF } from '../utils/pdfExtractor';
import { liveTime } from './LiveArticleCard';

const field = 'mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm';
const statusLabels = { pending: 'Pendiente de revisión', reviewed: 'Procedencia revisada por usuario', discarded: 'Descartado' };
function BulletinCard({ record, microorganisms, onSelectOrganism, onSendToLibrary, changed }: {
  record: OfficialBulletin; microorganisms: Microorganism[]; onSelectOrganism?: (organism: Microorganism) => void;
  onSendToLibrary?: (record: OfficialBulletin) => string; changed: () => void;
}) {
  const [reviewer, setReviewer] = useState(''); const [note, setNote] = useState(''); const [confirmed, setConfirmed] = useState(false); const [message, setMessage] = useState('');
  const review = (action: OfficialBulletin['status']) => {
    try { new OfficialBulletinRepository(localStorage).review(record.id, action, reviewer, note, confirmed); setMessage('Revisión registrada.'); setConfirmed(false); changed(); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'No se guardó la revisión.'); }
  };
  return <article className="space-y-3 rounded-xl border border-slate-200 bg-white p-5">
    <div className="flex flex-wrap gap-2 text-xs font-bold"><span className="rounded bg-slate-100 px-2 py-1">{OFFICIAL_SOURCES.find(source => source.id === record.sourceId)?.name}</span><span className={`rounded px-2 py-1 ${record.status === 'reviewed' ? 'bg-cyan-50 text-cyan-900' : 'bg-amber-50 text-amber-900'}`}>{statusLabels[record.status]}</span></div>
    <h4 className="text-base font-bold">{record.title}</h4>
    <p className="text-xs text-slate-600">Tipo declarado: {record.kind === 'alert' ? 'Alerta' : record.kind === 'update' ? 'Actualización' : 'Boletín'} · Publicación: {record.publicationDate ?? 'No consta'} · Territorio declarado: {record.territory} · Período: {record.referencePeriod || 'No consta'}</p>
    {!!record.departmentIds.length && <p className="text-xs text-slate-600">Departamentos declarados: {GUATEMALA_DEPARTMENTS.filter(department => record.departmentIds.includes(department.departmentId)).map(department => department.departmentName).join(', ')}</p>}
    <p className="text-xs text-slate-500">Incorporado: {liveTime(record.importedAt)} (Guatemala). Metadatos ingresados por el usuario; el dominio del enlace no verifica por sí mismo el archivo adjunto.</p>
    <a href={record.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 break-all text-xs text-sky-800 underline">Abrir fuente oficial <ExternalLink className="h-3 w-3 shrink-0" /></a>
    <blockquote className="whitespace-pre-wrap break-words rounded-lg border-l-4 border-cyan-600 bg-slate-50 p-3 text-sm">{record.evidence.excerpt}</blockquote>
    <p className="text-xs text-slate-500">{record.evidence.mode === 'pdf' ? `Texto extraído · Página ${record.evidence.page} · Archivo local: ${record.evidence.fileName}` : 'Fragmento transcrito por el usuario · Sin PDF adjunto'}</p>
    <details className="text-xs text-slate-600"><summary className="cursor-pointer">Trazabilidad y revisión</summary>
      <p className="mt-2 break-all">{record.sourceUrl}</p>
      {record.evidence.sha256 && <p className="mt-2 break-all">SHA-256 del PDF adjunto: {record.evidence.sha256}. Identifica los bytes locales; no certifica su autoría.</p>}
      {record.reviews.map(entry => <p key={entry.id} className="mt-2 break-words">{liveTime(entry.at)} · {entry.reviewer} (revisor declarado) · {statusLabels[entry.action]}: {entry.note}</p>)}
      {!record.reviews.length && <p className="mt-2">Todavía no hay revisión registrada.</p>}
    </details>
    <div className="flex flex-wrap gap-3 text-xs">{microorganisms.filter(organism => record.relatedOrganismIds.includes(organism.id)).map(organism => <button key={organism.id} type="button" onClick={() => onSelectOrganism?.(organism)} className="text-sky-800 underline">Abrir ficha: {organism.scientificName}</button>)}{record.status === 'reviewed' && record.evidence.mode === 'pdf' && onSendToLibrary && <button type="button" onClick={() => { try { setMessage(onSendToLibrary(record)); } catch (error) { setMessage(error instanceof Error ? error.message : 'No se pudo enviar.'); } }} className="text-sky-800 underline">Enviar PDF a Biblioteca Académica</button>}</div>
    <details className="rounded-lg border border-slate-200 p-3 text-xs"><summary className="cursor-pointer font-bold">{record.status === 'pending' ? 'Revisar documento' : 'Reabrir revisión'}</summary>
      <p className="mt-3 text-slate-500">Compara título, fecha, territorio y fragmento con la publicación enlazada. Esta revisión documenta la procedencia; las propuestas clínicas siguen necesitando aprobación en la biblioteca.</p>
      <label className="mt-3 block">Nombre del revisor<input maxLength={100} value={reviewer} onChange={event => setReviewer(event.target.value)} className={field} /></label>
      <label className="mt-3 block">Motivo y comprobaciones realizadas<textarea maxLength={1500} value={note} onChange={event => setNote(event.target.value)} className={field} /></label>
      <label className="mt-3 flex items-start gap-2"><input type="checkbox" checked={confirmed} onChange={event => setConfirmed(event.target.checked)} />He comparado estos datos con la publicación original y dejo constancia de las diferencias o limitaciones.</label>
      <div className="mt-3 flex flex-wrap gap-3">{record.status === 'pending' ? <><button type="button" onClick={() => review('reviewed')} className="rounded bg-slate-900 px-3 py-2 text-white">Registrar procedencia revisada</button><button type="button" onClick={() => review('discarded')} className="rounded border border-slate-300 px-3 py-2">Descartar documento</button></> : <button type="button" onClick={() => review('pending')} className="rounded border border-slate-300 px-3 py-2">Reabrir como pendiente</button>}</div>
    </details>
    {message && <p role="status" className="text-xs text-sky-800">{message}</p>}
  </article>;
}

export function OfficialBulletinsPanel({ mode = 'guatemala', microorganisms, onSelectOrganism, onSendToLibrary }: {
  mode?: 'guatemala' | 'global'; microorganisms: Microorganism[];
  onSelectOrganism?: (organism: Microorganism) => void; onSendToLibrary?: (record: OfficialBulletin) => string;
}) {
  const sources = OFFICIAL_SOURCES.filter(source => mode === 'guatemala' ? source.id === 'mspas' : source.id !== 'mspas');
  const [records, setRecords] = useState<OfficialBulletin[]>([]); const [storageError, setStorageError] = useState('');
  const [sourceId, setSourceId] = useState<OfficialSourceId>(mode === 'guatemala' ? 'mspas' : 'paho');
  const [title, setTitle] = useState(''); const [url, setUrl] = useState(''); const [publicationDate, setDate] = useState('');
  const [period, setPeriod] = useState(''); const [territory, setTerritory] = useState(''); const [departmentIds, setDepartments] = useState<string[]>([]); const [organismIds, setOrganisms] = useState<string[]>([]);
  const [kind, setKind] = useState<BulletinInput['kind']>('bulletin'); const [evidenceMode, setMode] = useState<'pdf' | 'transcribed'>('pdf');
  const [pdf, setPdf] = useState<{ fileName: string; fileSize: number; sha256: string; pages: ExtractedPage[] } | null>(null);
  const [pageNumber, setPage] = useState(1); const [excerpt, setExcerpt] = useState(''); const [busy, setBusy] = useState(false);
  const [preview, setPreview] = useState<BulletinInput | null>(null); const [message, setMessage] = useState(''); const [filter, setFilter] = useState('all'); const [search, setSearch] = useState('');
  const importId = useRef(0); const formRef = useRef<HTMLFormElement>(null);
  const refresh = () => { try { setRecords(new OfficialBulletinRepository(localStorage).read().bulletins); setStorageError(''); } catch (error) { setStorageError(error instanceof Error ? error.message : 'No se pudo leer.'); } };
  const changed = () => window.dispatchEvent(new Event(OFFICIAL_EVENT));
  useEffect(() => { refresh(); window.addEventListener(OFFICIAL_EVENT, refresh); window.addEventListener(LIVE_EVENT, refresh); window.addEventListener('storage', refresh); return () => { importId.current++; window.removeEventListener(OFFICIAL_EVENT, refresh); window.removeEventListener(LIVE_EVENT, refresh); window.removeEventListener('storage', refresh); }; }, []);
  const loadPdf = async (file?: File) => {
    const id = ++importId.current; setPdf(null); setPreview(null); setExcerpt(''); setMessage('');
    if (!file) { setBusy(false); return; } setBusy(true);
    try {
      if (!/\.pdf$/i.test(file.name) || file.size > 10 * 1024 * 1024 || file.name.length > 250) throw new Error('Adjunta un PDF de hasta 10 MiB.');
      const bytes = await file.arrayBuffer(); if (new TextDecoder().decode(bytes.slice(0, 5)) !== '%PDF-') throw new Error('El archivo no tiene una cabecera PDF válida.');
      const hash = [...new Uint8Array(await crypto.subtle.digest('SHA-256', bytes))].map(byte => byte.toString(16).padStart(2, '0')).join('');
      const extraction = await extractTextFromPDF(bytes, { maxPages: 200, maxCharacters: 200000 });
      if (id !== importId.current) return;
      if (extraction.pages.length > 200 || extraction.totalCharacters > 200000) throw new Error('El registro admite hasta 200 páginas y 200000 caracteres por documento.');
      const page = extraction.pages.find(item => item.hasExtractableText);
      if (!page) throw new Error('El PDF no contiene texto extraíble. Usa una transcripción manual y declara esta limitación.');
      setPdf({ fileName: file.name, fileSize: file.size, sha256: hash, pages: extraction.pages }); setPage(page.pageNumber);
      setMessage(`PDF leído: ${extraction.pageCount} páginas, ${extraction.totalCharacters} caracteres. Selecciona un fragmento literal de la página.`);
    } catch (error) { if (id === importId.current) setMessage(error instanceof Error ? error.message : 'No se pudo leer el PDF.'); }
    finally { if (id === importId.current) setBusy(false); }
  };
  const createPreview = () => {
    try {
      const input: BulletinInput = { sourceId, sourceUrl: url, title, publicationDate: publicationDate || null, referencePeriod: period, territory, departmentIds, relatedOrganismIds: organismIds, kind,
        evidence: evidenceMode === 'pdf' && pdf ? { mode: 'pdf', page: pageNumber, excerpt, ...pdf } : { mode: 'transcribed', page: null, excerpt, fileName: null, fileSize: null, sha256: null, pages: [] } };
      if (evidenceMode === 'pdf' && !pdf) throw new Error('Adjunta el PDF o elige transcripción manual.');
      // Validate the preview without persisting anything.
      validateBulletinInput(input);
      setPreview(input); setMessage('Vista previa lista. Revisa los datos antes de guardar como pendiente.');
    } catch (error) { setPreview(null); setMessage(error instanceof Error ? error.message : 'Revisa los datos.'); }
  };
  const visible = records.filter(record => sources.some(source => source.id === record.sourceId) && (filter === 'all' || record.status === filter) && `${record.title} ${record.territory} ${record.referencePeriod}`.toLowerCase().includes(search.toLowerCase()));
  const selectedPage = pdf?.pages.find(page => page.pageNumber === pageNumber);
  return <section className="space-y-5">
    <h3 className="flex items-center gap-2 text-xl font-bold"><FileText className="h-5 w-5 text-cyan-700" />{mode === 'guatemala' ? 'Guatemala Sentinel · Documentos MSPAS' : 'Global Watch · Documentos OMS / OPS'}</h3>
    <p className="text-sm text-slate-600">Incorpora un boletín, alerta o actualización con su enlace, fecha, territorio y evidencia. La obtención es manual; no hay vigilancia continua. El registro empieza pendiente y la revisión no modifica cifras departamentales ni fichas clínicas.</p>
    <div className="flex flex-wrap gap-3 rounded-xl bg-slate-900 p-4 text-xs text-cyan-200">{sources.flatMap(source => source.links).map(link => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="underline">{link.label} ↗</a>)}</div>
    {storageError && <p role="alert" className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{storageError}</p>}
    <details className="rounded-xl border border-slate-200 bg-white p-4"><summary className="cursor-pointer text-sm font-bold">Incorporar documento oficial</summary>
      <form ref={formRef} onSubmit={event => { event.preventDefault(); createPreview(); }} onChange={() => setPreview(null)} className="mt-4 space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs">Institución<select value={sourceId} onChange={event => setSourceId(event.target.value as OfficialSourceId)} className={field}>{sources.map(source => <option key={source.id} value={source.id}>{source.name}</option>)}</select></label>
          <label className="text-xs">Tipo de publicación<select value={kind} onChange={event => setKind(event.target.value as BulletinInput['kind'])} className={field}><option value="bulletin">Boletín</option><option value="alert">Alerta emitida por la fuente</option><option value="update">Actualización</option></select></label>
          <label className="text-xs sm:col-span-2">Título original<input required maxLength={300} value={title} onChange={event => setTitle(event.target.value)} className={field} /></label>
          <label className="text-xs sm:col-span-2">Enlace de la publicación oficial<input required type="url" maxLength={2000} value={url} onChange={event => setUrl(event.target.value)} placeholder="https://epidemiologia.mspas.gob.gt/…" className={field} /></label>
          <label className="text-xs">Fecha que consta en la publicación<input type="date" value={publicationDate} onChange={event => setDate(event.target.value)} className={field} /><span className="text-slate-500">Déjala vacía si no consta; no uses la fecha de descarga.</span></label>
          <label className="text-xs">Período / semana epidemiológica<input maxLength={120} value={period} onChange={event => setPeriod(event.target.value)} placeholder="Transcribir únicamente si aparece" className={field} /></label>
          <label className="text-xs sm:col-span-2">Territorio indicado en la publicación<input required maxLength={200} value={territory} onChange={event => setTerritory(event.target.value)} placeholder="Ej.: Guatemala, ámbito nacional; o No consta" className={field} /></label>
          <label className="text-xs">Departamentos mencionados (opcional)<select multiple value={departmentIds} onChange={event => setDepartments([...event.target.selectedOptions].map(option => option.value))} className={field}>{GUATEMALA_DEPARTMENTS.map(department => <option key={department.departmentId} value={department.departmentId}>{department.departmentName}</option>)}</select></label>
          <label className="text-xs">Vincular fichas (selección preliminar)<select multiple value={organismIds} onChange={event => setOrganisms([...event.target.selectedOptions].map(option => option.value))} className={field}>{microorganisms.map(organism => <option key={organism.id} value={organism.id}>{organism.scientificName}</option>)}</select></label>
        </div>
        <label className="block text-xs">Evidencia<select value={evidenceMode} onChange={event => { importId.current++; setMode(event.target.value as 'pdf' | 'transcribed'); setPdf(null); setExcerpt(''); setBusy(false); }} className={field}><option value="pdf">PDF local con texto extraído</option><option value="transcribed">Fragmento transcrito manualmente de la publicación</option></select></label>
        {evidenceMode === 'pdf' && <div className="space-y-3">
          <label className="block text-xs">Adjuntar PDF (hasta 10 MiB)<input type="file" accept="application/pdf,.pdf" onChange={event => void loadPdf(event.target.files?.[0])} className={field} /></label>
          {busy && <p role="status" className="flex items-center gap-2 text-xs"><Loader2 className="h-4 w-4 animate-spin" />Leyendo PDF…</p>}
          {pdf && <><label className="block text-xs">Página del fragmento<select value={pageNumber} onChange={event => { setPage(Number(event.target.value)); setExcerpt(''); }} className={field}>{pdf.pages.filter(page => page.hasExtractableText).map(page => <option key={page.pageNumber} value={page.pageNumber}>Página {page.pageNumber}</option>)}</select></label>
            <details open className="text-xs"><summary>Texto original extraído de la página</summary><p className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded bg-slate-50 p-3">{selectedPage?.textContent}</p></details></>}
        </div>}
        <label className="block text-xs">Fragmento literal para citar (30–3000 caracteres)<textarea required minLength={30} maxLength={3000} rows={4} value={excerpt} onChange={event => setExcerpt(event.target.value)} className={field} /><span className="text-slate-500">Para PDF, copia una parte exacta del texto de la página seleccionada. Para transcripción, compara con la publicación original.</span></label>
        <button type="submit" disabled={busy || Boolean(storageError)} className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-bold text-white disabled:opacity-40">Preparar vista previa</button>
      </form>
      {preview && <div className="mt-4 space-y-2 rounded-lg border border-cyan-300 bg-cyan-50 p-4 text-xs"><h4 className="font-bold">Vista previa · Aún sin guardar</h4><p>{preview.title} · {preview.publicationDate ?? 'Fecha no consta'} · {preview.territory}</p><p className="break-all">{preview.sourceUrl}</p><p className="whitespace-pre-wrap">{preview.evidence.excerpt}</p><p>Quedará pendiente de revisión. Conservarás el PDF original aparte.</p>
        <button type="button" onClick={() => { try { new OfficialBulletinRepository(localStorage).add(preview); changed(); setPreview(null); setTitle(''); setUrl(''); setExcerpt(''); setPdf(null); setDate(''); setPeriod(''); setTerritory(''); setDepartments([]); setOrganisms([]); setKind('bulletin'); setMode('pdf'); setPage(1); formRef.current?.reset(); setMessage('Documento guardado como pendiente de revisión.'); } catch (error) { setMessage(error instanceof Error ? error.message : 'No se pudo guardar.'); } }} className="rounded bg-slate-900 px-3 py-2 font-bold text-white">Guardar como pendiente</button>
      </div>}
      {message && <p role="status" className="mt-3 text-xs text-sky-800">{message}</p>}
    </details>
    <div className="grid gap-3 sm:grid-cols-2"><label className="text-xs">Buscar documento o territorio<input value={search} onChange={event => setSearch(event.target.value)} className={field} /></label><label className="text-xs">Estado documental<select value={filter} onChange={event => setFilter(event.target.value)} className={field}><option value="all">Todos</option>{Object.entries(statusLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label></div>
    <p className="text-xs text-slate-500">{visible.length} documentos en este registro. Hasta 50 documentos; texto y revisión incluidos en el respaldo JSON. Los bytes del PDF no se conservan en el respaldo.</p>
    {!visible.length && <p className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">No hay documentos para estos filtros. Abre una fuente oficial e incorpora una publicación concreta para revisarla.</p>}
    {visible.map(record => <BulletinCard key={record.id} record={record} microorganisms={microorganisms} onSelectOrganism={onSelectOrganism} onSendToLibrary={onSendToLibrary} changed={changed} />)}
  </section>;
}
