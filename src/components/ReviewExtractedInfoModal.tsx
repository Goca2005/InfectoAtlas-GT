import React, { useState } from 'react';
import { ExtractionProposal, AuditLogEntry, FieldToModify } from '../types/academicLibrary';
import { Microorganism } from '../types/microorganism';
import { 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  AlertTriangle, 
  FileText, 
  X, 
  ExternalLink, 
  Check, 
  History, 
  Filter, 
  Sparkles,
  BookOpen,
  Info
} from 'lucide-react';

interface ReviewExtractedInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposals: ExtractionProposal[];
  onApproveProposal: (proposalId: string, customText?: string) => void;
  onDiscardProposal: (proposalId: string, reason?: string) => void;
  auditLogs: AuditLogEntry[];
  onRevertAuditLog?: (logId: string) => void;
  microorganisms: Microorganism[];
  onSelectOrganism?: (org: Microorganism) => void;
  initialDocumentIdFilter?: string | null;
}

export const ReviewExtractedInfoModal: React.FC<ReviewExtractedInfoModalProps> = ({
  isOpen,
  onClose,
  proposals,
  onApproveProposal,
  onDiscardProposal,
  auditLogs,
  onRevertAuditLog,
  microorganisms,
  onSelectOrganism,
  initialDocumentIdFilter = null
}) => {
  const [activeTab, setActiveTab] = useState<'proposals' | 'history'>('proposals');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'pendiente' | 'aprobado' | 'descartado'>('pendiente');
  const [organismFilter, setOrganismFilter] = useState<string>('todos');
  
  // State for editing a proposal inline before approving
  const [editingProposalId, setEditingProposalId] = useState<string | null>(null);
  const [editedProposedText, setEditedProposedText] = useState<string>('');

  // State for discarding with reason
  const [discardingProposalId, setDiscardingProposalId] = useState<string | null>(null);
  const [discardReason, setDiscardReason] = useState<string>('');

  if (!isOpen) return null;

  // Filter proposals
  const filteredProposals = proposals.filter((p) => {
    if (initialDocumentIdFilter && p.documentId !== initialDocumentIdFilter) {
      return false;
    }
    if (statusFilter !== 'todos' && p.status !== statusFilter) {
      return false;
    }
    if (organismFilter !== 'todos' && p.targetMicroorganismId !== organismFilter) {
      return false;
    }
    return true;
  });

  const pendingCount = proposals.filter(p => p.status === 'pendiente').length;
  const approvedCount = proposals.filter(p => p.status === 'aprobado' || p.status === 'editado_y_aprobado').length;
  const discardedCount = proposals.filter(p => p.status === 'descartado').length;

  const startEditing = (p: ExtractionProposal) => {
    setEditingProposalId(p.id);
    setEditedProposedText(p.proposedValue);
  };

  const saveEditedAndApprove = (proposalId: string) => {
    onApproveProposal(proposalId, editedProposedText);
    setEditingProposalId(null);
    setEditedProposedText('');
  };

  const handleConfirmDiscard = (proposalId: string) => {
    onDiscardProposal(proposalId, discardReason || 'Descartado por criterio del revisor');
    setDiscardingProposalId(null);
    setDiscardReason('');
  };

  const getVerificationBadge = (status: ExtractionProposal['verificationStatus']) => {
    switch (status) {
      case 'Guía oficial MSPAS (Normativa nacional)':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-teal-50 px-2 py-0.5 text-[10px] font-bold text-teal-800 border border-teal-200">
            <Check className="h-3 w-3" /> Guía Oficial MSPAS
          </span>
        );
      case 'Verificado con literatura científica':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-800 border border-sky-200">
            <Check className="h-3 w-3" /> Literatura Científica Indexada
          </span>
        );
      case 'Información procedente de apunte universitario (Requiere comprobación)':
        return (
          <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
            <AlertTriangle className="h-3 w-3" /> Apunte Universitario (Requiere corroboración)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 border border-slate-200">
            <Info className="h-3 w-3" /> En Validación
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 sm:p-6 backdrop-blur-xs overflow-y-auto">
      <div className="relative flex flex-col w-full max-w-5xl rounded-2xl bg-white shadow-2xl border border-slate-200 max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight text-white">
                  REVISAR INFORMACIÓN EXTRAÍDA
                </h3>
                <span className="rounded-full bg-sky-500/20 px-2.5 py-0.5 text-[10px] font-bold text-sky-300 border border-sky-400/30">
                  Control de Calidad Científico
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Auditoría humana obligatoria antes de incorporar cualquier dato a las fichas clínicas de InfectoAtlas GT.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            title="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab & Stats Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-2.5 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('proposals')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTab === 'proposals'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Propuestas Extraídas ({pendingCount} pendientes)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-colors ${
                activeTab === 'history'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <History className="h-3.5 w-3.5" />
              <span>Historial de Auditoría ({auditLogs.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold">
              {pendingCount} Pendientes
            </span>
            <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
              {approvedCount} Aprobadas
            </span>
            <span className="text-slate-600 bg-slate-200 border border-slate-300 px-2 py-0.5 rounded font-bold">
              {discardedCount} Descartadas
            </span>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {activeTab === 'proposals' && (
            <>
              {/* Filter controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5 text-slate-500" />
                  <span className="font-bold text-slate-700">Estado:</span>
                  {(['todos', 'pendiente', 'aprobado', 'descartado'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`px-2 py-1 rounded capitalize font-semibold transition-all ${
                        statusFilter === st
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">Microorganismo:</span>
                  <select
                    value={organismFilter}
                    onChange={(e) => setOrganismFilter(e.target.value)}
                    className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 font-medium focus:border-sky-500 focus:outline-hidden"
                  >
                    <option value="todos">Todos los microorganismos</option>
                    {Array.from(new Set(proposals.map(p => p.targetMicroorganismName))).map((name) => {
                      const match = proposals.find(p => p.targetMicroorganismName === name);
                      return (
                        <option key={match?.targetMicroorganismId || name} value={match?.targetMicroorganismId}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Proposals List */}
              {filteredProposals.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-2 opacity-80" />
                  <h4 className="text-sm font-bold text-slate-800">
                    No hay propuestas en esta categoría
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                    Todas las propuestas para los filtros seleccionados han sido procesadas o no se encontraron coincidencias.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProposals.map((proposal) => {
                    const isEditing = editingProposalId === proposal.id;
                    const isDiscarding = discardingProposalId === proposal.id;
                    const matchedOrganism = microorganisms.find(m => m.id === proposal.targetMicroorganismId);

                    return (
                      <div 
                        key={proposal.id}
                        className={`rounded-xl border p-4 sm:p-5 transition-all text-xs ${
                          proposal.status === 'aprobado' || proposal.status === 'editado_y_aprobado'
                            ? 'border-emerald-200 bg-emerald-50/20'
                            : proposal.status === 'descartado'
                            ? 'border-slate-200 bg-slate-50/60 opacity-60'
                            : 'border-slate-200 bg-white shadow-xs hover:border-slate-300'
                        }`}
                      >
                        {/* Top row: Organism name, field, origin badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-black text-slate-900 text-sm italic">
                              {proposal.targetMicroorganismName}
                            </span>
                            {proposal.isNewOrganism ? (
                              <span className="rounded bg-purple-50 text-purple-700 border border-purple-200 px-1.5 py-0.5 text-[10px] font-bold">
                                ✨ Nuevo Organismo Propuesto
                              </span>
                            ) : (
                              <span className="rounded bg-sky-50 text-sky-700 border border-sky-200 px-1.5 py-0.5 text-[10px] font-bold">
                                Ficha Existente
                              </span>
                            )}
                            <span className="rounded bg-slate-100 text-slate-700 px-2 py-0.5 text-[10px] font-bold">
                              Campo: {proposal.field}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {getVerificationBadge(proposal.verificationStatus)}
                            <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              Pág. {proposal.sourcePage}
                            </span>
                          </div>
                        </div>

                        {/* Document Source Reference */}
                        <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                          <BookOpen className="h-3 w-3 text-slate-400 shrink-0" />
                          <span>Fuente: <strong className="text-slate-700">{proposal.documentTitle}</strong> ({proposal.sourceTier})</span>
                        </div>

                        {/* Potential Contradiction Warning */}
                        {proposal.potentialContradiction && (
                          <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-2.5 text-[11px] text-amber-900">
                            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-bold">Alerta de discrepancia científica:</strong>{' '}
                              <span>{proposal.potentialContradiction}</span>
                            </div>
                          </div>
                        )}

                        {/* Side by Side Diff: Previous vs Proposed */}
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Previous Value */}
                          <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                              Información actual en la ficha:
                            </div>
                            <div className="text-slate-600 leading-relaxed italic">
                              {proposal.previousValue ? (
                                proposal.previousValue
                              ) : (
                                <span className="text-slate-400 not-italic">
                                  Sin información previa registrada (campo nuevo)
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Proposed Value */}
                          <div className="rounded-lg border border-sky-200 bg-sky-50/40 p-3">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-sky-800 mb-1 flex items-center justify-between">
                              <span>Información propuesta para incorporar:</span>
                              <span className="text-[10px] text-sky-700 font-bold bg-sky-100 px-1.5 py-0.5 rounded">
                                Extracción Heurística
                              </span>
                            </div>
                            
                            {isEditing ? (
                              <div className="space-y-2">
                                <div className="text-[10px] text-slate-500 bg-white p-2 rounded border border-slate-200">
                                  <strong className="text-slate-700 block">Texto original extraído (inalterable):</strong>
                                  <span className="italic">«{proposal.originalSnippet || proposal.sourceSnippet}»</span>
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-700 mb-0.5">
                                    Texto corregido por el docente / estudiante:
                                  </label>
                                  <textarea
                                    value={editedProposedText}
                                    onChange={(e) => setEditedProposedText(e.target.value)}
                                    rows={4}
                                    className="w-full rounded-lg border border-sky-400 bg-white p-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500 font-sans"
                                  />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setEditingProposalId(null)}
                                    className="px-2.5 py-1 rounded bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold text-[11px]"
                                  >
                                    Cancelar
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => saveEditedAndApprove(proposal.id)}
                                    className="px-2.5 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-[11px] flex items-center gap-1"
                                  >
                                    <Check className="h-3 w-3" />
                                    <span>Guardar Corrección y Aprobar</span>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-1.5">
                                <div className="text-slate-900 font-medium leading-relaxed">
                                  {proposal.proposedValue}
                                </div>
                                {proposal.userEditedSnippet && (
                                  <div className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                                    ✓ Corregido manualmente por el revisor
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Source Quote / Snippet (Original verbatim text) */}
                        <div className="mt-2.5 rounded bg-slate-100/90 px-3 py-1.5 text-[11px] text-slate-600 border border-slate-200">
                          <span className="font-bold text-slate-700">Texto original extraído de Pág. {proposal.sourcePage}:</span>{' '}
                          <span className="italic">«{proposal.originalSnippet || proposal.sourceSnippet}»</span>
                        </div>

                        {/* Action Buttons: APROBAR / EDITAR / DESCARTAR */}
                        {proposal.status === 'pendiente' && !isEditing && (
                          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                            {matchedOrganism && onSelectOrganism && (
                              <button
                                type="button"
                                onClick={() => onSelectOrganism(matchedOrganism)}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-700 hover:text-sky-900 transition-colors"
                              >
                                <ExternalLink className="h-3 w-3" />
                                <span>Ver ficha actual completa</span>
                              </button>
                            )}

                            {isDiscarding ? (
                              <div className="flex items-center gap-2 w-full sm:w-auto">
                                <input
                                  type="text"
                                  placeholder="Motivo del descarte (opcional)..."
                                  value={discardReason}
                                  onChange={(e) => setDiscardReason(e.target.value)}
                                  className="rounded border border-slate-300 px-2 py-1 text-xs w-60"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleConfirmDiscard(proposal.id)}
                                  className="px-2.5 py-1 rounded bg-rose-600 text-white font-bold hover:bg-rose-700"
                                >
                                  Confirmar Descarte
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDiscardingProposalId(null)}
                                  className="px-2 py-1 rounded bg-slate-200 text-slate-700 font-bold hover:bg-slate-300"
                                >
                                  Cancelar
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 ml-auto">
                                <button
                                  type="button"
                                  onClick={() => setDiscardingProposalId(proposal.id)}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300 bg-white px-3 py-1.5 font-bold text-rose-700 hover:bg-rose-50 transition-colors"
                                  title="Descartar esta propuesta"
                                >
                                  <XCircle className="h-3.5 w-3.5" />
                                  <span>DESCARTAR</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => startEditing(proposal)}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                                  title="Modificar redacción o datos antes de guardar"
                                >
                                  <Edit3 className="h-3.5 w-3.5" />
                                  <span>EDITAR</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => onApproveProposal(proposal.id)}
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-1.5 font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
                                  title="Aprobar e incorporar a la ficha oficial"
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                  <span>APROBAR</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        {proposal.status !== 'pendiente' && (
                          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <span className="font-bold text-slate-500">
                              Estado actual:{' '}
                              <strong className={
                                proposal.status === 'aprobado' || proposal.status === 'editado_y_aprobado' 
                                  ? 'text-emerald-700' 
                                  : 'text-rose-700'
                              }>
                                {proposal.status.toUpperCase()}
                              </strong>
                              {proposal.discardReason && ` (${proposal.discardReason})`}
                            </span>
                            {matchedOrganism && onSelectOrganism && (
                              <button
                                type="button"
                                onClick={() => onSelectOrganism(matchedOrganism)}
                                className="inline-flex items-center gap-1 font-bold text-sky-700 hover:text-sky-900"
                              >
                                <ExternalLink className="h-3 w-3" />
                                <span>Ver ficha actualizada</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* Tab 2: Audit History Log */}
          {activeTab === 'history' && (
            <div className="space-y-4 text-xs">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <History className="h-4 w-4 text-sky-600" />
                  <span>Historial de Auditoría Científica (Trazabilidad Permanente)</span>
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Registro completo de todas las modificaciones aprobadas en InfectoAtlas GT. Permite corroborar el documento origen, la página y la versión anterior para cada microorganismo.
                </p>
              </div>

              {auditLogs.length === 0 ? (
                <div className="text-center py-10 text-slate-400 italic">
                  Aún no se han registrado modificaciones aprobadas en esta sesión.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-4 space-y-2 hover:bg-slate-50/50 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 italic">
                            {log.microorganismName}
                          </span>
                          <span className="rounded bg-sky-50 text-sky-800 px-1.5 py-0.5 text-[10px] font-bold border border-sky-200">
                            {log.field}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 font-mono text-[10px]">
                          <span>{log.timestamp}</span>
                          <span className="rounded bg-slate-100 px-1.5 py-0.2 text-slate-600 font-bold">
                            Pág. {log.sourcePage}
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500">
                        Documento origen: <strong className="text-slate-700">{log.documentTitle}</strong>
                        {log.editedByReviewer && (
                          <span className="ml-2 text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded font-bold">
                            Modificado y corregido antes de aprobar
                          </span>
                        )}
                      </div>

                      {log.originalExtractedSnippet && (
                        <div className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                          <strong className="text-slate-700">Texto original del documento (Pág. {log.sourcePage}):</strong>{' '}
                          <span className="italic">«{log.originalExtractedSnippet}»</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                        <div className="rounded bg-slate-50 p-2 border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Versión Anterior en Ficha:</span>
                          <span className="text-slate-600 italic">{log.previousValue || '(Sin valor anterior)'}</span>
                        </div>
                        <div className="rounded bg-emerald-50/50 p-2 border border-emerald-200">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase block">Versión Incorporada Oficial:</span>
                          <span className="text-slate-900 font-medium">{log.newValue}</span>
                        </div>
                      </div>

                      {onRevertAuditLog && (
                        <div className="pt-1 flex justify-end">
                          <button
                            type="button"
                            onClick={() => onRevertAuditLog(log.id)}
                            className="text-[10px] font-bold text-rose-600 hover:text-rose-800 transition-colors"
                          >
                            Revertir modificación a versión anterior
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-700">InfectoAtlas GT:</span>
            <span>Rigor científico docente • Citas y páginas verificadas</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-1.5 font-bold text-white hover:bg-slate-800 transition-colors"
          >
            Cerrar Panel
          </button>
        </div>

      </div>
    </div>
  );
};
