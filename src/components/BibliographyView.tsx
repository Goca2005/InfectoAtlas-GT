import React, { useState } from 'react';
import { OFFICIAL_BIBLIOGRAPHY } from '../data/bibliography';
import { BookOpen, CheckCircle, ShieldCheck, FileText, ExternalLink, Filter } from 'lucide-react';

export const BibliographyView: React.FC = () => {
  const [selectedOrgFilter, setSelectedOrgFilter] = useState<string>('all');

  const organizations = [
    'MSPAS Guatemala',
    'OPS / OMS',
    'CDC',
    'Literatura Médica Académica'
  ];

  const filteredSources = selectedOrgFilter === 'all'
    ? OFFICIAL_BIBLIOGRAPHY
    : OFFICIAL_BIBLIOGRAPHY.filter(s => s.organization === selectedOrgFilter);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-sky-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
          <BookOpen className="h-4 w-4" />
          <span>Rigor Científico y Criterios Editoriales</span>
        </div>
        <h2 className="mt-1 text-2xl font-black text-slate-900 tracking-tight">
          Fuentes Bibliográficas e Institucionales
        </h2>
        <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed">
          Toda la información microbiológica, terapéutica y epidemiológica contenida en InfectoAtlas GT proviene exclusivamente de normativas ministeriales oficiales, organismos multilaterales de salud y tratados médicos universitarios consolidados.
        </p>
      </div>

      {/* Scientific Integrity Disclaimers & Ethics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Verificación Oficial MSPAS</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Los protocolos de manejo de tuberculosis, dengue y malaria se rigen por las Guías Clínicas Nacionales del Ministerio de Salud Pública de Guatemala.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <CheckCircle className="h-4 w-4 text-sky-600" />
            <span>Doble Chequeo Taxonómico</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            La nomenclatura y jerarquía taxonómica está validada con los catálogos del CDC DPDx y el Comité Internacional de Taxonomía de Virus (ICTV).
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <FileText className="h-4 w-4 text-amber-600" />
            <span>Trazabilidad de Imágenes</span>
          </div>
          <p className="text-slate-600 leading-relaxed text-[11px]">
            Se clasifica explícitamente cada recurso visual en microfotografía real, esquema morfológico o ilustración científica con sus respectivos créditos.
          </p>
        </div>
      </div>

      {/* Organization Filters */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-200/80 rounded-lg text-xs w-fit">
        <button
          type="button"
          onClick={() => setSelectedOrgFilter('all')}
          className={`px-3 py-1 font-medium rounded-md transition-colors ${
            selectedOrgFilter === 'all'
              ? 'bg-white text-slate-900 shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Todas las Fuentes ({OFFICIAL_BIBLIOGRAPHY.length})
        </button>
        {organizations.map(org => (
          <button
            key={org}
            type="button"
            onClick={() => setSelectedOrgFilter(org)}
            className={`px-3 py-1 font-medium rounded-md transition-colors ${
              selectedOrgFilter === org
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {org}
          </button>
        ))}
      </div>

      {/* Bibliography Items List */}
      <div className="space-y-3">
        {filteredSources.map((source) => (
          <div 
            key={source.id} 
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-2 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
                {source.organization} · {source.type}
              </span>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  source.status === 'Verificado' 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' 
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {source.status === 'Verificado' ? '✓ Guía Oficial Verificada' : 'Texto Académico de Referencia'}
                </span>
                <span className="font-mono text-slate-400 text-[11px]">
                  Año: {source.year}
                </span>
              </div>
            </div>

            <h3 className="text-base font-extrabold text-slate-900">
              {source.title}
            </h3>

            <div className="text-slate-700 font-medium">
              Autores / Institución: {source.institutionOrAuthors}
            </div>

            <div className="text-slate-500 font-mono text-[11px]">
              Cita / Referencia: {source.urlOrCitation}
            </div>

            <p className="text-slate-600 bg-slate-50 p-3 rounded leading-relaxed border border-slate-100">
              <span className="font-semibold text-slate-800">Alcance clínico: </span>
              {source.notes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
