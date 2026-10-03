import React, { useState } from 'react';
import { epidemiologyService } from '../services/epidemiologyService';
import { GUATEMALA_DEPARTMENTS } from '../data/guatemalaDepartments';
import { TrendingUp, AlertTriangle, ShieldCheck, Bell, MapPin, Activity, Calendar } from 'lucide-react';

interface EpidemiologyViewProps {
  onGoToGuatemala: () => void;
}

export const EpidemiologyView: React.FC<EpidemiologyViewProps> = ({
  onGoToGuatemala,
}) => {
  const [reports, setReports] = useState(epidemiologyService.getReports());

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-sky-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
          <TrendingUp className="h-4 w-4" />
          <span>Salud Pública y Vigilancia Epidemiológica</span>
        </div>
        <h2 className="mt-1 text-2xl font-black text-slate-900 tracking-tight">
          Sistema de Alerta Temprana y Vigilancia Epidemiológica
        </h2>
        <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed">
          Estructura de notificación obligatoria y análisis de tendencias para el control oportuno de brotes, arbovirosis y enfermedades emergentes en Guatemala.
        </p>
      </div>

      {/* Surveillance Groups Classification */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-black text-rose-900 uppercase tracking-wide">
              Grupo A: Notificación Inmediata
            </span>
            <span className="h-2 w-2 rounded-full bg-rose-600 animate-ping"></span>
          </div>
          <p className="text-rose-800 text-[11px] leading-relaxed">
            Notificación obligatoria en las primeras 24 horas por vía telefónica o electrónica ante sospecha clínica: Dengue Grave, Cólera, Rabia humana, Parálisis Flácida Aguda (Polio / Guillain-Barré), Fiebre Amarilla.
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-black text-amber-900 uppercase tracking-wide">
              Grupo B: Notificación Semanal
            </span>
            <span className="h-2 w-2 rounded-full bg-amber-500"></span>
          </div>
          <p className="text-amber-800 text-[11px] leading-relaxed">
            Consolidado por semana epidemiológica (SE): Malaria por P. vivax, Tuberculosis activa, Enfermedad de Chagas, Leishmaniasis, Sífilis congénita y diarreas agudas.
          </p>
        </div>

        <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-black text-sky-900 uppercase tracking-wide">
              Vigilancia Centinela
            </span>
            <span className="h-2 w-2 rounded-full bg-sky-500"></span>
          </div>
          <p className="text-sky-800 text-[11px] leading-relaxed">
            Red de hospitales nacionales para monitoreo de resistencia bacteriana (MRSA, enterobacterias productoras de carbapenemasas) y vigilancia genómica de virus respiratorios.
          </p>
        </div>
      </div>

      {/* Live Event Stream / Bulletin Feed */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Boletines y Reportes Epidemiológicos Oficiales
            </h3>
            <p className="text-xs text-slate-500">
              Integración de comunicados del MSPAS en desarrollo; no hay vigilancia automática conectada.
            </p>
          </div>

          <button
            type="button"
            onClick={onGoToGuatemala}
            className="flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-900"
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>Ver mapa de los 22 departamentos →</span>
          </button>
        </div>

        <div className="space-y-3">
          {reports.length === 0 && <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600">Aún no se han incorporado boletines oficiales verificados. Consulta los comunicados en <a href="https://epidemiologia.mspas.gob.gt/" target="_blank" rel="noopener noreferrer" className="text-sky-700 underline">Epidemiología del MSPAS</a>.</p>}
          {reports.map((rep) => {
            const dept = GUATEMALA_DEPARTMENTS.find(d => d.departmentId === rep.departmentId);
            return (
              <div 
                key={rep.id} 
                className="rounded-lg border border-slate-200 p-4 bg-slate-50/50 space-y-2 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 uppercase">{rep.syndromeCategory}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-sky-800">{dept?.departmentName ?? 'Guatemala'}</span>
                  </div>
                  <div className="font-mono flex items-center gap-1 text-slate-400">
                    <Calendar className="h-3 w-3" />
                    <span>{rep.referenceWeek}</span>
                  </div>
                </div>

                <div className="font-bold text-slate-900 text-sm">
                  {rep.pathogenScientificName}
                </div>

                <p className="text-slate-600 leading-relaxed">
                  {rep.eventDescription}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px]">
                  <span className="text-slate-500">Fuente: <span className="font-semibold text-slate-700">{rep.source}</span></span>
                  <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                    {rep.verifiedStatus}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
