import React, { useState } from 'react';
import { Microorganism } from '../types/microorganism';
import { 
  GraduationCap, 
  RotateCw, 
  Check, 
  X, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  Clock, 
  FileQuestion
} from 'lucide-react';

interface StudyHubProps {
  microorganisms: Microorganism[];
  onSelectOrganism: (organism: Microorganism) => void;
}

export const StudyHub: React.FC<StudyHubProps> = ({
  microorganisms,
  onSelectOrganism,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [studyFilter, setStudyFilter] = useState<string>('all');

  // Generate flashcards from verified organisms
  const flashcards = microorganisms
    .filter(m => studyFilter === 'all' || m.category === studyFilter)
    .map(m => ({
      id: m.id,
      organism: m,
      question: `¿Cuál es el patógeno causante de: "${m.associatedDiseases[0]?.name}" con morfología de ${m.morphology.shape} (${m.morphology.gramStain ?? 'Especial'})?`,
      answerName: m.scientificName,
      commonName: m.commonName,
      keyVirulence: m.virulenceFactors[0]?.name ?? 'N/A',
      firstLineTx: m.treatment.firstLine[0] ?? 'Soporte',
      goldStandardDx: m.diagnosticMethods[0]?.method ?? 'Microscopía / Cultivo',
      guatemalaStatus: m.guatemalaRelevance.endemicStatus
    }));

  const currentCard = flashcards[currentCardIndex] ?? flashcards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl border border-sky-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700">
          <GraduationCap className="h-4 w-4" />
          <span>Educación Médica Continua</span>
        </div>
        <h2 className="mt-1 text-2xl font-black text-slate-900 tracking-tight">
          Módulo de Estudio y Repaso Activo (Active Recall)
        </h2>
        <p className="mt-1 text-xs text-slate-600 max-w-2xl leading-relaxed">
          Herramienta de autoevaluación para estudiantes de medicina, residentes de medicina interna, pediatría y microbiología clínica.
        </p>
      </div>

      {/* Active Recall Flashcard Workspace */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-4">
        
        {/* Flashcard Header Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
              Flashcards de Alta Rentabilidad:
            </span>
            <span className="font-mono text-xs text-sky-800 bg-sky-100/70 px-2 py-0.5 rounded font-bold">
              {currentCardIndex + 1} de {flashcards.length}
            </span>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => { setStudyFilter('all'); setCurrentCardIndex(0); setIsFlipped(false); }}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${studyFilter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Todos
            </button>
            <button
              onClick={() => { setStudyFilter('bacteria'); setCurrentCardIndex(0); setIsFlipped(false); }}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${studyFilter === 'bacteria' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Bacterias
            </button>
            <button
              onClick={() => { setStudyFilter('parasito'); setCurrentCardIndex(0); setIsFlipped(false); }}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${studyFilter === 'parasito' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Parásitos
            </button>
            <button
              onClick={() => { setStudyFilter('virus'); setCurrentCardIndex(0); setIsFlipped(false); }}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${studyFilter === 'virus' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Virus
            </button>
          </div>
        </div>

        {/* The Card Itself */}
        {currentCard ? (
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[260px] cursor-pointer rounded-xl border border-slate-200 bg-white p-8 shadow-xs hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between"
          >
            {!isFlipped ? (
              /* Front of Card: Question / Challenge */
              <div className="space-y-4 my-auto text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Pregunta de Repaso Clínico
                </span>
                <p className="text-lg font-bold text-slate-900 max-w-xl mx-auto leading-relaxed">
                  {currentCard.question}
                </p>
                <div className="inline-flex items-center gap-1.5 text-xs text-sky-700 font-semibold pt-2">
                  <RotateCw className="h-3.5 w-3.5" />
                  <span>Haz clic para voltear y ver la respuesta</span>
                </div>
              </div>
            ) : (
              /* Back of Card: Answer & High-Yield Pearls */
              <div className="space-y-4 my-auto">
                <div className="text-center">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    Respuesta Correcta
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 italic">
                    {currentCard.answerName}
                  </h3>
                  {currentCard.commonName && (
                    <span className="text-xs text-slate-500 font-normal">
                      ({currentCard.commonName})
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-4 border-t border-slate-100">
                  <div className="p-2.5 bg-slate-50 rounded">
                    <span className="text-slate-500 block text-[11px]">Virulencia Clave:</span>
                    <span className="font-semibold text-slate-800">{currentCard.keyVirulence}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded">
                    <span className="text-slate-500 block text-[11px]">Diagnóstico Standard:</span>
                    <span className="font-semibold text-slate-800">{currentCard.goldStandardDx}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded">
                    <span className="text-slate-500 block text-[11px]">1ª Línea Terapéutica:</span>
                    <span className="font-semibold text-slate-800 line-clamp-2">{currentCard.firstLineTx}</span>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectOrganism(currentCard.organism);
                    }}
                    className="text-xs text-sky-700 hover:text-sky-900 font-bold underline"
                  >
                    Abrir Ficha Monográfica Completa →
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Card Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="hover:text-slate-900 font-medium px-2 py-1"
              >
                ← Tarjeta Anterior
              </button>
              <span className="text-[11px]">Toca la tarjeta para alternar anverso / reverso</span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="hover:text-slate-900 font-medium px-2 py-1"
              >
                Siguiente Tarjeta →
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-500">
            No hay tarjetas disponibles para esta categoría.
          </div>
        )}
      </div>

      {/* Honest Roadmap of Future Educational Modules (Requirement: Clearly mark "En desarrollo") */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Módulos Educativos en Desarrollo (Fases Posteriores):
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-2 opacity-85">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <FileQuestion className="h-4 w-4 text-slate-500" />
                <span>Exámenes y Banco de Preguntas</span>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                En desarrollo
              </span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Generador configurable de preguntas tipo opción múltiple con casos clínicos enfocados en infectología centroamericana.
            </p>
          </div>


          <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-2 opacity-85">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Layers className="h-4 w-4 text-slate-500" />
                <span>Ciclos Biológicos Interactivos</span>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                En desarrollo
              </span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Diagramas animados de transmisión de hospedero intermediario y definitivo para Taenia, Plasmodium y Trypanosoma.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
