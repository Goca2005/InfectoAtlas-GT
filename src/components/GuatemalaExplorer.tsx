import React, { useState } from 'react';
import { GUATEMALA_DEPARTMENTS } from '../data/guatemalaDepartments';
import { DepartmentEpidemiologicalData, GuatemalaRegion } from '../types/guatemala';
import { epidemiologyService } from '../services/epidemiologyService';
import { 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Calendar, 
  Search, 
  Layers, 
  Bell,
  ExternalLink,
  Info
} from 'lucide-react';

interface GuatemalaExplorerProps {
  onSelectPathogenBySearch?: (query: string) => void;
}

export const GuatemalaExplorer: React.FC<GuatemalaExplorerProps> = ({
  onSelectPathogenBySearch,
}) => {
  const [selectedDeptId, setSelectedDeptId] = useState<string>('gt-esc');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [reports] = useState(epidemiologyService.getReports());

  const regions: GuatemalaRegion[] = [
    'Metropolitana',
    'Norte',
    'Nororiente',
    'Suroriente',
    'Central',
    'Suroccidente',
    'Noroccidente',
    'Petén'
  ];

  const filteredDepartments = GUATEMALA_DEPARTMENTS.filter(d => {
    const matchesRegion = regionFilter === 'all' || d.region === regionFilter;
    const matchesSearch = d.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.cabecera.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.registeredEndemicDiseases.some(dis => dis.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  const selectedDepartment = GUATEMALA_DEPARTMENTS.find(d => d.departmentId === selectedDeptId) ?? GUATEMALA_DEPARTMENTS[0];
  const deptReports = reports.filter(r => r.departmentId === selectedDepartment.departmentId);

  return (
    <div className="space-y-6">
      {/* Top Banner / Academic Orientation */}
      <div className="rounded-xl border border-sky-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
              <MapPin className="h-4 w-4" />
              <span>Sección Prioritaria · República de Guatemala</span>
            </div>
            <h2 className="mt-1 text-2xl font-black text-slate-900 tracking-tight">
              Vigilancia Epidemiológica Departamental
            </h2>
            <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed">
              Monitoreo estructurado de los 22 departamentos de Guatemala conforme a los lineamientos del Sistema de Información Gerencial de Salud (SIGSA) y el Centro Nacional de Epidemiología (MSPAS).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-right">
              <div className="text-[11px] font-semibold text-slate-500">Departamentos Integrados</div>
              <div className="text-lg font-black text-slate-900 font-mono">22 / 22</div>
            </div>
            <div className="rounded-lg border border-sky-200 bg-sky-50 px-3.5 py-2 text-right">
              <div className="text-[11px] font-semibold text-sky-700">Alertas Activas</div>
              <div className="text-lg font-black text-sky-900 font-mono">{reports.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Alerts Notification Bar */}
      {reports.length > 0 && (
        <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-950 uppercase tracking-wide">
              <Bell className="h-4 w-4 text-amber-600 animate-bounce" />
              <span>Boletines de Vigilancia y Alertas en Tiempo Real (MSPAS / CNE)</span>
            </div>
            <span className="text-[11px] text-amber-800 font-medium">Actualizado recientemente</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
            {reports.map((rep) => (
              <div key={rep.id} className="rounded-md border border-amber-200 bg-white p-2.5 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="font-bold text-amber-800">{rep.referenceWeek}</span>
                  <span>{rep.verifiedStatus}</span>
                </div>
                <div className="font-bold text-slate-900 line-clamp-1">{rep.pathogenScientificName}</div>
                <p className="text-[11px] text-slate-600 line-clamp-2">{rep.eventDescription}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Region Tabs (Functional Buttons) */}
        <div className="flex flex-wrap gap-1 p-1 bg-slate-200/80 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setRegionFilter('all')}
            className={`px-3 py-1 font-medium rounded-md transition-colors ${
              regionFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Todas las Regiones (22)
          </button>
          {regions.map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRegionFilter(r)}
              className={`px-2.5 py-1 font-medium rounded-md transition-colors ${
                regionFilter === r
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Department Quick Search */}
        <div className="relative sm:w-64">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar departamento o enfermedad..."
            className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-sky-600 focus:outline-none focus:ring-1 focus:ring-sky-600"
          />
        </div>
      </div>

      {/* Main 2-Panel Layout: Department List (Left) & Epidemiological Sheet (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 22 Department Selector */}
        <div className="lg:col-span-5 space-y-2 max-h-[640px] overflow-y-auto pr-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Selecciona un Departamento ({filteredDepartments.length}):
          </div>

          <div className="space-y-1.5">
            {filteredDepartments.map((dept) => {
              const isSelected = dept.departmentId === selectedDepartment.departmentId;
              const hasAlert = reports.some(r => r.departmentId === dept.departmentId);
              return (
                <button
                  key={dept.departmentId}
                  type="button"
                  onClick={() => setSelectedDeptId(dept.departmentId)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50/80 shadow-xs ring-1 ring-sky-500'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{dept.departmentName}</span>
                      <span className="text-[11px] text-slate-500">({dept.cabecera})</span>
                      {hasAlert && (
                        <span className="h-2 w-2 rounded-full bg-red-600" title="Alerta activa"></span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Región: <span className="font-medium text-slate-700">{dept.region}</span> · {dept.altitudeMeters} msnm
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {dept.officialDataStatus === 'Verificado MSPAS' ? 'MSPAS Oficial' : 'Pendiente incorporación'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Department Epidemiological Sheet */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
            
            {/* Header of the Selected Department */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
                  Región {selectedDepartment.region} · República de Guatemala
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {selectedDepartment.departmentName}
                </h3>
                <div className="text-xs text-slate-500 mt-0.5">
                  Cabecera departamental: <span className="font-semibold text-slate-800">{selectedDepartment.cabecera}</span> · Altitud: <span className="font-semibold text-slate-800">{selectedDepartment.altitudeMeters} msnm</span>
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 border border-slate-200 p-2.5 text-xs text-right">
                <span className="text-slate-500 block">Zona bioclimática:</span>
                <span className="font-bold text-slate-800">{selectedDepartment.climateZone}</span>
              </div>
            </div>

            {/* Official Data Status Box (Enforces Strict Rule: No invented stats) */}
            {selectedDepartment.statistics ? (
              <div className="rounded-lg border border-sky-100 bg-sky-50/50 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-sky-950">
                    <ShieldCheck className="h-4 w-4 text-sky-700" />
                    <span>Datos Epidemiológicos Reportados</span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">
                    Año Ref: {selectedDepartment.statistics.referenceYear}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {selectedDepartment.statistics.reportedCases && (
                    <div className="bg-white p-2.5 rounded border border-slate-100">
                      <span className="text-slate-500 text-[11px] block">Casos Notificados:</span>
                      <span className="text-base font-extrabold text-slate-900 font-mono">
                        {selectedDepartment.statistics.reportedCases.toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="bg-white p-2.5 rounded border border-slate-100">
                    <span className="text-slate-500 text-[11px] block">Tendencia Epidemiológica:</span>
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                      {selectedDepartment.statistics.trend === 'En aumento' && <TrendingUp className="h-3.5 w-3.5 text-rose-600" />}
                      {selectedDepartment.statistics.trend === 'En descenso' && <TrendingDown className="h-3.5 w-3.5 text-emerald-600" />}
                      {selectedDepartment.statistics.trend === 'Estable' && <Minus className="h-3.5 w-3.5 text-sky-600" />}
                      {selectedDepartment.statistics.trend}
                    </span>
                  </div>

                  {selectedDepartment.statistics.populationReference && (
                    <div className="bg-white p-2.5 rounded border border-slate-100">
                      <span className="text-slate-500 text-[11px] block">Población de Referencia:</span>
                      <span className="text-sm font-bold text-slate-900 font-mono">
                        {selectedDepartment.statistics.populationReference.toLocaleString()} hab.
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between border-t border-sky-100 pt-2">
                  <span>Fuente: {selectedDepartment.statistics.officialSource}</span>
                  <span>Corte: {selectedDepartment.statistics.lastUpdated}</span>
                </div>
              </div>
            ) : (
              /* Strictly enforced notice when official data not yet linked */
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 flex items-start gap-3">
                <Info className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-slate-800">
                    Datos epidemiológicos oficiales pendientes de incorporación
                  </div>
                  <p className="mt-1 leading-relaxed text-slate-500 text-[11px]">
                    Conforme al protocolo de rigor científico del proyecto, no se proyectan cifras estadísticas simuladas. La información cuantitativa de casos e incidencias para {selectedDepartment.departmentName} se cargará en la siguiente fase en coordinación con los boletines oficiales de SIGSA / MSPAS.
                  </p>
                </div>
              </div>
            )}

            {/* Endemic Diseases in this Department */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Patologías Infecciosas Registradas en Vigilancia:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDepartment.registeredEndemicDiseases.map((dis, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectPathogenBySearch && onSelectPathogenBySearch(dis.split(' ')[0])}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-800 hover:border-sky-300 hover:bg-sky-50 transition-colors"
                  >
                    {dis}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Vector Risks */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Riesgo Vectorial Asociado:
              </h4>
              <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3 text-xs text-slate-700">
                {selectedDepartment.primaryVectorRisks.length > 0 ? (
                  <ul className="list-disc list-inside space-y-1">
                    {selectedDepartment.primaryVectorRisks.map((vec, idx) => (
                      <li key={idx} className="font-medium text-slate-800">
                        {vec}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-slate-500">Riesgo vectorial bajo o nulo por altitud.</span>
                )}
              </div>
            </div>

            {/* Context Notes */}
            <div className="space-y-1.5 border-t border-slate-100 pt-3">
              <span className="text-xs font-bold text-slate-800">Notas de Campo y Relevancia Regional:</span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedDepartment.officialNotes}
              </p>
            </div>

            {/* Future Interactive Map Placeholder / Architecture Anchor */}
            <div className="rounded-lg border border-dashed border-sky-300 bg-sky-50/30 p-4 text-center text-xs text-sky-900">
              <div className="font-bold flex items-center justify-center gap-1.5">
                <Layers className="h-4 w-4 text-sky-700" />
                <span>Espacio Preparado para Mapa Epidemiológico Interactivo GeoJSON</span>
              </div>
              <p className="mt-1 text-[11px] text-sky-700/80">
                La arquitectura del componente está lista para renderizar capas vectoriales con polígonos departamentales y tasas en tiempo real.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
