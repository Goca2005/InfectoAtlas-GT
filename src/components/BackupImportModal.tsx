import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import type { BackupImportMode, BackupImportPlan } from '../types/backup';

export interface BackupImportPreview extends BackupImportPlan {
  fileName: string;
}

interface BackupImportModalProps {
  preview: BackupImportPreview;
  error?: string | null;
  busy?: boolean;
  onConfirm: (mode: BackupImportMode) => void;
  onCancel: () => void;
}

const COLLECTION_LABELS: Record<string, string> = {
  microorganisms: 'Microorganismos y fichas clínicas',
  academicDocuments: 'Documentos y texto extraído',
  extractionProposals: 'Propuestas científicas',
  auditLogs: 'Historial de auditoría',
  bookmarks: 'Favoritos y marcadores',
  bibliographyReferences: 'Referencias bibliográficas',
  userSettings: 'Preferencias del usuario'
};

export const BackupImportModal: React.FC<BackupImportModalProps> = ({
  preview,
  error,
  busy = false,
  onConfirm,
  onCancel
}) => {
  const [confirmRestore, setConfirmRestore] = useState(false);
  useEffect(() => setConfirmRestore(false), [preview]);

  const integrityLabel = preview.integrityStatus === 'verified'
    ? 'Integridad SHA-256 verificada'
    : preview.integrityStatus === 'legacy-unverified'
      ? 'Respaldo antiguo: sin firma verificable'
      : 'Integridad no verificada';
  const dataPreview: Array<{ label: string; values: string[] }> = [
    {
      label: 'Microorganismos',
      values: (preview.data.microorganisms ?? []).map(item => item.scientificName)
    },
    {
      label: 'Documentos',
      values: (preview.data.academicDocuments ?? []).map(item => item.title)
    },
    {
      label: 'Propuestas científicas',
      values: (preview.data.extractionProposals ?? []).map(item => `${item.targetMicroorganismName}: ${item.field}`)
    },
    {
      label: 'Referencias',
      values: (preview.data.bibliographyReferences ?? []).map(item => item.title)
    },
    {
      label: 'Marcadores',
      values: preview.data.bookmarks ?? []
    }
  ].filter(section => section.values.length > 0);
  const currentDuplicateDetails = Object.entries(preview.duplicatesWithCurrent)
    .filter(([, ids]) => ids?.length)
    .map(([key, ids]) => `${COLLECTION_LABELS[key] || key}: ${ids?.slice(0, 5).join(', ')}${(ids?.length ?? 0) > 5 ? ', …' : ''}`);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="backup-preview-title"
        className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h2 id="backup-preview-title" className="text-base font-black text-slate-900">
                Revisar respaldo antes de importar
              </h2>
              <p className="mt-1 break-all text-xs text-slate-500">{preview.fileName}</p>
            </div>
          </div>
          <button type="button" onClick={onCancel} aria-label="Cancelar importación" className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="max-h-[calc(90vh-190px)] space-y-4 overflow-y-auto p-5 text-xs">
          <div className={`flex items-start gap-2 rounded-lg border p-3 ${preview.valid ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-rose-200 bg-rose-50 text-rose-900'}`}>
            {preview.valid ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />}
            <div>
              <strong>{integrityLabel}</strong>
              <div className="mt-1 text-[11px]">
                {preview.sourceAppName || 'Origen no indicado'}
                {preview.sourceAppVersion ? ` · versión ${preview.sourceAppVersion}` : ''}
                {preview.exportedAt ? ` · exportado ${preview.exportedAt}` : ''}
              </div>
            </div>
          </div>

          {Object.keys(preview.counts).length > 0 && (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="grid grid-cols-[minmax(0,1fr)_70px_70px_90px] gap-2 bg-slate-50 px-3 py-2 font-bold text-slate-600">
                <span>Sección</span><span className="text-right">Archivo</span><span className="text-right">Actual</span><span className="text-right">Conflictos</span>
              </div>
              {Object.entries(preview.counts).map(([key, count]) => (
                <div key={key} className="grid grid-cols-[minmax(0,1fr)_70px_70px_90px] gap-2 border-t border-slate-100 px-3 py-2 text-slate-700">
                  <span>{COLLECTION_LABELS[key] || 'Preferencias'}</span>
                  <span className="text-right tabular-nums">{count.backupCount}</span>
                  <span className="text-right tabular-nums">{count.currentCount}</span>
                  <span className={`text-right tabular-nums ${count.duplicateCount ? 'font-bold text-amber-700' : ''}`}>{count.duplicateCount}</span>
                </div>
              ))}
            </div>
          )}

          {dataPreview.length > 0 && (
            <div className="space-y-2 rounded-xl border border-slate-200 p-3 text-slate-700">
              <strong>Vista previa de registros incluidos</strong>
              {dataPreview.map(section => (
                <div key={section.label}>
                  <span className="font-bold">{section.label}:</span>{' '}
                  {section.values.slice(0, 4).join(' · ')}
                  {section.values.length > 4 ? ` · y ${section.values.length - 4} más` : ''}
                </div>
              ))}
            </div>
          )}

          {currentDuplicateDetails.length > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-950">
              <strong>Ids ya presentes en este navegador</strong>
              <ul className="mt-2 list-disc space-y-1 pl-4">{currentDuplicateDetails.map((detail, index) => <li key={index}>{detail}</li>)}</ul>
              <p className="mt-1">Al fusionar, se conservarán los registros actuales con esos ids.</p>
            </div>
          )}

          {preview.errors.length > 0 && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-900">
              <strong>No se puede importar este archivo:</strong>
              <ul className="mt-2 list-disc space-y-1 pl-4">{preview.errors.map((item, index) => <li key={index}>{item}</li>)}</ul>
            </div>
          )}

          {preview.warnings.length > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-950">
              <strong>Información y limitaciones</strong>
              <ul className="mt-2 list-disc space-y-1 pl-4">{preview.warnings.map((item, index) => <li key={index}>{item}</li>)}</ul>
            </div>
          )}

          {preview.omittedOriginalFiles.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-700">
              <strong>Archivos originales no incluidos ({preview.omittedOriginalFiles.length})</strong>
              <p className="mt-1 break-words">{preview.omittedOriginalFiles.slice(0, 8).join(', ')}{preview.omittedOriginalFiles.length > 8 ? ', …' : ''}</p>
              <p className="mt-1 text-slate-500">El texto extraído y los metadatos sí se conservan cuando están presentes en el JSON.</p>
            </div>
          )}

          {error && <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-900">{error}</div>}

          {preview.valid && (
            <div className="space-y-3 rounded-lg border border-slate-200 p-3 text-slate-700">
              <p><strong>Fusionar:</strong> añade registros nuevos; si un id ya existe, conserva la versión actual y omite la del archivo.</p>
              <p><strong>Restaurar:</strong> reemplaza las secciones incluidas en el respaldo. Las secciones ausentes en respaldos antiguos se conservan.</p>
              <label className="flex items-start gap-2 border-t border-slate-100 pt-3">
                <input type="checkbox" checked={confirmRestore} onChange={event => setConfirmRestore(event.target.checked)} className="mt-0.5 accent-sky-600" />
                <span>Confirmo que quiero reemplazar las secciones incluidas al elegir «Restaurar».</span>
              </label>
            </div>
          )}
        </div>

        <footer className="flex flex-wrap justify-end gap-2 border-t border-slate-100 bg-slate-50 p-4">
          <button type="button" onClick={onCancel} disabled={busy} className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-50">
            Cancelar
          </button>
          <button type="button" onClick={() => onConfirm('merge')} disabled={!preview.valid || busy} className="rounded-lg border border-sky-300 bg-white px-3 py-2 font-bold text-sky-800 hover:bg-sky-50 disabled:opacity-50">
            {busy ? 'Aplicando…' : 'Fusionar'}
          </button>
          <button type="button" onClick={() => onConfirm('restore')} disabled={!preview.valid || !confirmRestore || busy} className="rounded-lg bg-sky-700 px-3 py-2 font-bold text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-50">
            Restaurar y reemplazar
          </button>
        </footer>
      </section>
    </div>
  );
};