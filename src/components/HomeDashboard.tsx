import { useMemo } from 'react';
import { ArrowRight, Images, Microscope, BookOpen, Activity, MapPin, GitCompare, Search, CheckCircle2 } from 'lucide-react';
import type { Microorganism, MicroorganismCategory } from '../types/microorganism';
import type { ActiveNavSection } from './Sidebar';
import { curatedImages } from '../services/learningAtlas';
import { buildVisualAtlas, visualCoverage } from '../services/visualAtlas';
import { PUBLIC_REFERENCE_CATALOG } from '../services/publicCatalog';
import { OrganismThumbnail } from './OrganismThumbnail';
import { ACADEMIC_PROFILES, ACADEMIC_SOURCES, academicProfile } from '../services/academicContent';

interface HomeDashboardProps {
  microorganisms: Microorganism[];
  onNavigateSection: (section: ActiveNavSection, categoryFilter?: MicroorganismCategory) => void;
  onSelectOrganism: (organism: Microorganism) => void;
  onOpenComparator: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  documentCount: number;
  unreadablePages: number;
}
const groups: {category:MicroorganismCategory;title:string;description:string;featured:string}[] = [
  {category:'bacteria',title:'Bacterias',description:'Microscopía, cultivos y diagnóstico',featured:'Staphylococcus aureus'},
  {category:'virus',title:'Virus',description:'Estructuras y manifestaciones clínicas',featured:'Dengue'},
  {category:'hongo',title:'Hongos',description:'Levaduras, hifas y micosis',featured:'Candida albicans'},
  {category:'parasito',title:'Parásitos',description:'Estadios, muestras y ciclos CDC',featured:'Plasmodium vivax'},
];

export function HomeDashboard({ microorganisms, onNavigateSection, onSelectOrganism, onOpenComparator, searchQuery, onSearchChange, documentCount, unreadablePages }: HomeDashboardProps) {
  const entries = useMemo(() => buildVisualAtlas(microorganisms), [microorganisms]);
  const coverage = useMemo(() => visualCoverage(microorganisms), [microorganisms]);
  const references = useMemo(() => buildVisualAtlas(PUBLIC_REFERENCE_CATALOG), []);
  const featured = ['Plasmodium vivax','Corynebacterium diphtheriae','Measles virus','Histoplasma capsulatum'].map(name => microorganisms.find(o => o.scientificName === name)).filter((o): o is Microorganism => !!o);
  const expandedReferences = PUBLIC_REFERENCE_CATALOG.filter(o=>academicProfile(o.scientificName)).length;
  return <div className="space-y-8">
    <section className="relative overflow-hidden rounded-2xl border border-sky-900 bg-slate-950 text-white">
      <div className="grid lg:grid-cols-[1.45fr_1fr]">
        <div className="p-6 sm:p-9 space-y-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">Educación médica universitaria · Guatemala</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">Comprende la infección.<span className="block text-sky-200">Observa la evidencia.</span></h2>
          <p className="max-w-xl text-sm leading-7 text-slate-300">InfectoAtlas GT reúne fichas académicas, muestras auténticas y fuentes de consulta. Estudia el microorganismo, sus manifestaciones y el proceso de identificación desde una misma plataforma.</p>
          <label className="block max-w-xl"><span className="sr-only">Buscar microorganismo en el catálogo</span><div className="relative"><Search size={18} className="absolute left-4 top-3.5 text-sky-300"/><input value={searchQuery} onChange={e => onSearchChange(e.target.value)} placeholder="Busca un microorganismo para estudiar…" className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 pl-11 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"/></div></label>
          <div className="flex flex-wrap gap-3"><button onClick={() => onNavigateSection('atlas-visual')} className="flex items-center gap-2 rounded-lg bg-sky-400 px-4 py-3 text-sm font-bold text-slate-950 hover:bg-sky-300"><Images size={17}/>Explorar el atlas visual<ArrowRight size={16}/></button><button onClick={() => onNavigateSection('laboratorio-3d')} className="flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-3 text-sm text-slate-200 hover:bg-slate-800"><Microscope size={17}/>Abrir laboratorio</button></div>
        </div>
        <div className="grid grid-cols-2 gap-px bg-slate-800 border-t lg:border-t-0 lg:border-l border-slate-800">
          {groups.map(g => { const o = microorganisms.find(o => o.scientificName.includes(g.featured)); return <button key={g.category} onClick={() => onNavigateSection('microorganismos',g.category)} className="group relative min-h-40 sm:min-h-48 overflow-hidden bg-slate-900 text-left"><OrganismThumbnail organism={o} className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"/><div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"/><div className="relative flex h-full flex-col justify-end p-4 sm:p-5"><p className="text-base font-bold">{g.title}<span className="ml-2 text-xs text-sky-200">{microorganisms.filter(o => o.category === g.category).length}</span></p><p className="mt-1 text-[11px] text-slate-300">{g.description}</p>{o&&<p className="mt-2 text-[10px] text-slate-400">Referencia: <i>{o.scientificName}</i> · {curatedImages(o)[0]?.creditOrSource}</p>}</div></button>; })}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800 bg-slate-900/70 px-6 sm:px-9 py-5">
        {[['Entradas disponibles', microorganisms.length],['Fotografías distintas', entries.length],['Con signos clínicos de referencia',coverage.clinicalProfiles],['Con ciclos de vida CDC',coverage.cycles]].map(([label,n]) => <div key={label}><p className="text-2xl font-bold text-white tabular-nums">{n}</p><p className="mt-1 text-[11px] text-slate-400">{label}</p></div>)}
      </div>
    </section>

    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
        {section:'atlas-visual' as const,icon:Images,title:'De la imagen a la ficha',text:'Filtra microscopía, cultivos, clínica y vectores. Amplía el original y consulta sus créditos.'},
        {section:'biblioteca-academica' as const,icon:BookOpen,title:'Tus documentos, organizados',text:`${documentCount} documentos en este navegador. Texto por página, vínculos a fichas y revisión de propuestas.`},
        {section:'live' as const,icon:Activity,title:'Literatura desde PubMed',text:'Busca publicaciones reales por tema o microorganismo y conserva su identificador y procedencia.'},
        {section:'guatemala' as const,icon:MapPin,title:'Enfoque en Guatemala',text:'Contexto por departamento y referencias internacionales identificadas. Datos oficiales aún por completar.'},
      ].map(item => <button key={item.section} onClick={() => onNavigateSection(item.section)} className="rounded-xl border border-slate-200 bg-white p-5 text-left hover:border-sky-400 hover:shadow-sm transition"><item.icon className="text-sky-700" size={21}/><h3 className="mt-3 font-bold text-slate-900 text-sm">{item.title}</h3><p className="mt-2 text-xs leading-6 text-slate-600">{item.text}</p><ArrowRight className="mt-3 text-sky-700" size={16}/></button>)}
    </section>

    <section className="rounded-xl border border-sky-200 bg-sky-50 p-5 sm:p-6"><p className="text-[11px] font-semibold uppercase tracking-widest text-sky-700">Ampliación académica</p><h3 className="mt-2 text-lg font-bold text-slate-900">{expandedReferences} fichas con nueva información organizada</h3><p className="mt-2 text-sm leading-7 text-slate-600">{ACADEMIC_PROFILES.reduce((n,p)=>n+p.sections.length,0)} apartados con enlaces a {ACADEMIC_SOURCES.length} fuentes. Clínica, muestras, interpretación diagnóstica y principios de manejo se integran con tus documentos. Revisión clínica independiente en curso.</p><div className="mt-4 flex flex-wrap gap-2">{['Clostridium tetani','Parvovirus B19','Trichophyton mentagrophytes','Cyclospora cayetanensis'].map(name=>{const o=microorganisms.find(o=>o.scientificName===name);return o&&<button key={o.id} onClick={()=>onSelectOrganism(o)} className="rounded-lg border border-sky-200 bg-white px-3 py-2 text-xs font-semibold italic text-sky-900 hover:bg-sky-100">{name} →</button>;})}</div></section>
    <section className="space-y-4"><div className="flex flex-wrap justify-between gap-3 items-end"><div><p className="text-[11px] uppercase tracking-widest text-sky-700 font-semibold">Selección para estudiar</p><h3 className="mt-1 text-xl font-bold">Morfología, clínica y procedencia</h3></div><button onClick={() => onNavigateSection('microorganismos')} className="text-sm font-semibold text-sky-800 underline">Ver catálogo completo</button></div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{featured.map(o => <button key={o.id} onClick={() => onSelectOrganism(o)} className="rounded-xl overflow-hidden border border-slate-200 bg-white text-left hover:border-sky-400 transition"><OrganismThumbnail organism={o} className="h-36 w-full object-contain bg-slate-950"/><div className="p-4"><p className="text-[11px] text-sky-800 capitalize">{o.category} · {curatedImages(o).length} imágenes</p><h4 className="mt-1 text-sm font-bold italic">{o.scientificName}</h4><p className="mt-2 text-xs leading-6 text-slate-500">{o.documentPageCount ? `${o.documentPageCount} páginas de tus documentos vinculadas` : 'Fuentes de referencia disponibles en la ficha'}</p><p className="mt-3 text-xs font-bold text-sky-800">Abrir ficha académica →</p></div></button>)}</div>
    </section>

    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6"><div className="flex flex-wrap justify-between gap-3"><div><p className="text-[11px] uppercase tracking-widest text-slate-500">Estado del contenido · antes de publicar</p><h3 className="mt-2 text-lg font-bold">Avance visible, revisión en curso</h3></div><CheckCircle2 className="text-sky-700" size={22}/></div>
      <div className="mt-5 grid gap-5 md:grid-cols-3 text-sm">
        <div><p className="font-bold text-slate-900">Colección incluida</p><p className="mt-2 text-xs leading-6 text-slate-600">{PUBLIC_REFERENCE_CATALOG.length} referencias públicas y {references.length} fotografías distintas referenciadas se incluyen con el código. Las imágenes se cargan desde su fuente. Algunas fichas son referencias iniciales; su amplitud y revisión se indican al abrirlas.</p></div>
        <div><p className="font-bold text-slate-900">Imágenes por completar</p><p className="mt-2 text-xs leading-6 text-slate-600">{coverage.atLeastEight} de {microorganisms.length} entradas tienen ocho o más imágenes. {coverage.withoutImages} todavía no tienen imágenes documentadas. La cifra incluye tus entradas documentales.</p></div>
        <div><p className="font-bold text-slate-900">Biblioteca personal</p><p className="mt-2 text-xs leading-6 text-slate-600">Los PDF y notas se guardan en este navegador. {unreadablePages} páginas sin texto extraíble. Publicar el código no publica esta biblioteca; las páginas escaneadas requieren transcripción u OCR.</p></div>
      </div><div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-xs"><button onClick={() => onNavigateSection('biblioteca-academica')} className="text-sky-800 font-semibold underline">Revisar biblioteca y respaldos</button><button onClick={onOpenComparator} className="flex items-center gap-1 text-sky-800 font-semibold"><GitCompare size={14}/>Comparar microorganismos</button></div>
    </section>
  </div>;
}
