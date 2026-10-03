import {lazy,Suspense,useEffect,useRef,useState} from 'react';
import {X,ArrowRightLeft,BookOpen,Images,Layers,Box,Radio,Files} from 'lucide-react';
import type {Microorganism} from '../types/microorganism';
import type {DocumentPageLink} from '../services/documentAtlas';
import type {ExtractionProposal} from '../types/academicLibrary';
import {learningSupplement} from '../services/learningAtlas';
import {AcademicFicha} from './AcademicFicha';
import {DocumentEvidencePanel} from './DocumentEvidencePanel';
import {SourceImageGallery} from './SourceImageGallery';
import {LifeCyclePanel} from './LifeCyclePanel';
import {LiveSearchPanel} from './LiveSearchPanel';
const MicrobeLab=lazy(()=>import('./MicrobeLab'));
type ViewMode='resumen'|'completa'|'imagenes'|'ciclo'|'modelo3d'|'actualizaciones'|'documentos';
interface Props {organism:Microorganism|null;onClose:()=>void;onAddToCompare:(organism:Microorganism)=>void;documentPages?:DocumentPageLink[];documentProposals?:ExtractionProposal[];onReviewDocument?:(id:string)=>void}
export function MicroorganismDetailModal({organism,onClose,onAddToCompare,documentPages=[],documentProposals=[],onReviewDocument}:Props){
  const [viewMode,setViewMode]=useState<ViewMode>('completa');
  const [galleryType,setGalleryType]=useState('all');
  const dialog=useRef<HTMLDivElement>(null),body=useRef<HTMLDivElement>(null);
  useEffect(()=>{setViewMode('completa');},[organism?.id]);
  useEffect(()=>{body.current?.scrollTo({top:0});},[viewMode,organism?.id]);
  useEffect(()=>{
    if(!organism)return;
    const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
    const overflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.current?.focus();
    const keyboard=(event:KeyboardEvent)=>{
      if(event.key==='Escape'){event.preventDefault();onClose();return;}
      if(event.key!=='Tab')return;
      const available=Array.from(dialog.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex="0"]')??[]).filter(el=>el.getClientRects().length&&!el.closest('[hidden]'));
      const first=available[0],last=available[available.length-1];
      if(!first){event.preventDefault();dialog.current?.focus();return;}
      if(event.shiftKey&&(document.activeElement===first||document.activeElement===dialog.current)){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&(document.activeElement===last||document.activeElement===dialog.current)){event.preventDefault();first.focus();}
    };
    document.addEventListener('keydown',keyboard);
    return()=>{document.removeEventListener('keydown',keyboard);document.body.style.overflow=overflow;previous?.focus();};
  },[organism?.id,onClose]);
  if(!organism)return null;
  const supplement=learningSupplement(organism),category=supplement?.category??organism.category;
  const categoryLabels={bacteria:'Bacteriología',virus:'Virología',hongo:'Micología',parasito:'Parasitología'};
  const initialModel=category==='virus'?'virus':category==='hongo'?'yeast':category==='bacteria'?(organism.scientificName.startsWith('Staphylococcus')?'cocci':'bacteria'):organism.parasiteGroup==='cestodo'?'cestode':organism.parasiteGroup==='trematodo'?'fluke':['nematodo','filaria'].includes(organism.parasiteGroup??'')?'nematode':organism.scientificName.startsWith('Sarcoptes')?'mite':organism.scientificName.startsWith('Pediculus')?'louse':'protozoan';
  const tabs:{id:ViewMode;title:string;icon:typeof BookOpen}[]=[{id:'completa',title:'Ficha académica',icon:BookOpen},{id:'resumen',title:'Guía de estudio',icon:BookOpen},{id:'imagenes',title:'Imágenes reales',icon:Images},...(supplement?.cycles.length?[{id:'ciclo' as const,title:'Ciclo CDC',icon:Layers}]:[]),{id:'modelo3d',title:'Modelo 3D',icon:Box},{id:'documentos',title:'Documentos',icon:Files},{id:'actualizaciones',title:'PubMed',icon:Radio}];
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-2 backdrop-blur-sm sm:p-5" onClick={onClose}>
    <div ref={dialog} tabIndex={-1} role="dialog" aria-modal="true" aria-label={`Ficha de ${organism.scientificName}`} className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-clip rounded-2xl border border-slate-300 bg-white shadow-2xl outline-none" onClick={e=>e.stopPropagation()}>
      <header className="relative shrink-0 bg-slate-950 px-5 py-5 text-white sm:px-8 sm:py-6"><div className="pr-20"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-sky-300">InfectoAtlas GT / {categoryLabels[category]}</p><h2 className="mt-2 break-words text-xl font-semibold tracking-tight sm:text-3xl"><span className="italic">{organism.scientificName}</span></h2>{organism.commonName&&<p className="mt-1 text-sm text-slate-300">{organism.commonName}</p>}<div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300"><span>{organism.taxonomy.family && !organism.taxonomy.family.toLowerCase().includes('pendiente') ? organism.taxonomy.family : 'Referencia académica'}</span><span className="inline-flex items-center gap-1.5"><span className={`h-1.5 w-1.5 rounded-full ${organism.reviewStatus==='Fuentes verificadas'?'bg-emerald-400':'bg-amber-400'}`}/>{organism.reviewStatus==='Fuentes verificadas'?'Ficha guardada: fuentes verificadas':'Atribución documental en revisión'}</span></div></div><div className="absolute right-3 top-4 flex gap-1 sm:right-6"><button aria-label="Comparar con otro patógeno" title="Comparar con otro patógeno" onClick={()=>onAddToCompare(organism)} className="rounded-lg p-2 text-slate-300 hover:bg-white/10"><ArrowRightLeft size={18}/></button><button aria-label="Cerrar modal" onClick={onClose} className="rounded-lg p-2 text-slate-300 hover:bg-white/10"><X size={20}/></button></div></header>
      <nav aria-label="Vistas de la ficha" className="flex shrink-0 gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 sm:px-6">{tabs.map(tab=>{const Icon=tab.icon;return <button key={tab.id} onClick={()=>{setGalleryType('all');setViewMode(tab.id);}} aria-current={viewMode===tab.id?'page':undefined} className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors ${viewMode===tab.id?'bg-sky-100 text-sky-900':'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={15}/>{tab.title}</button>;})}</nav>
      <div ref={body} data-ficha-scroll className="min-h-0 flex-1 overflow-y-auto bg-slate-100/70 p-4 sm:p-6">
        {['completa','resumen'].includes(viewMode)&&<AcademicFicha key={`${organism.id}-${viewMode}`} organism={organism} pages={documentPages} overview={viewMode==='resumen'} onOpen={mode=>{setGalleryType(mode==='clinicas'?'fotografia_clinica':'all');setViewMode(mode==='clinicas'?'imagenes':mode);}}/>}
        {viewMode==='documentos'&&<DocumentEvidencePanel key={organism.id} organism={organism} pages={documentPages} proposals={documentProposals} onReview={onReviewDocument}/>}
        {viewMode==='imagenes'&&<SourceImageGallery key={organism.id} organism={organism} initialType={galleryType}/>}
        {viewMode==='ciclo'&&<LifeCyclePanel key={organism.id} organism={organism}/>}
        {viewMode==='modelo3d'&&<div className="space-y-4"><p className="rounded-xl border border-sky-200 bg-white p-4 text-sm leading-6">Consulta muestras reales, estructuras experimentales y esquemas de anatomía. Cada vista identifica la especie o estructura representada y su fuente.</p><Suspense fallback={<p role="status">Preparando modelo…</p>}><MicrobeLab key={organism.id} initialKind={initialModel} initialView={organism.scientificName==='SARS-CoV-2'?'experimental':'schematic'} microorganisms={[organism]}/></Suspense></div>}
        {viewMode==='actualizaciones'&&<LiveSearchPanel key={organism.id} microorganisms={[organism]} fixedOrganism={organism}/>}
      </div>
      <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-white px-5 py-3 text-xs sm:px-8"><span className="text-slate-500">Estudio universitario · Guatemala</span><button onClick={onClose} className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800">Cerrar ficha</button></footer>
    </div>
  </div>;
}
