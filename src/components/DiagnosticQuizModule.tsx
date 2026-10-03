import React, { useState } from 'react';
import { DIAGNOSTIC_PRACTICE_QUESTIONS } from '../data/diagnosticQuizData';
import { DiagnosticPracticeQuestion, AtlasParasiteStage } from '../types/microscopyAtlas';
import { PARASITOLOGY_ATLAS_STAGES } from '../data/parasitologyAtlasData';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Microscope,
  Eye,
  FileQuestion,
  BookOpen
} from 'lucide-react';

interface DiagnosticQuizModuleProps {
  onOpenStageInModal?: (stage: AtlasParasiteStage) => void;
}

export const DiagnosticQuizModule: React.FC<DiagnosticQuizModuleProps> = ({
  onOpenStageInModal
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion = DIAGNOSTIC_PRACTICE_QUESTIONS[currentIndex];

  const handleSelectOption = (optId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const selectedOpt = currentQuestion.options.find(o => o.id === selectedOptionId);
    if (selectedOpt?.isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < DIAGNOSTIC_PRACTICE_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Find linked stage if available
  const relatedStage = currentQuestion?.relatedStageId
    ? PARASITOLOGY_ATLAS_STAGES.find(s => s.id === currentQuestion.relatedStageId)
    : undefined;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-xl border border-sky-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700">
              <FileQuestion className="h-4 w-4" />
              <span>Taller de Autoevaluación Diagnóstica</span>
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
              Desafío Diagnóstico: Casos Clínicos Educativos Simulados
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Casos clínicos educativos simulados con fines docentes para entrenar el razonamiento diagnóstico y reconocimiento morfológico en medicina.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
              Caso {currentIndex + 1} de {DIAGNOSTIC_PRACTICE_QUESTIONS.length}
            </span>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
              Aciertos: {score}
            </span>
          </div>
        </div>

        {/* Mandatory Educational Disclaimer */}
        <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
          <span className="font-bold text-slate-700">Aviso metodológico:</span>
          <span>
            Los escenarios son casos clínicos educativos simulados para docencia médica. No constituyen expedientes clínicos reales ni estadísticas hospitalarias oficiales.
          </span>
        </div>
      </div>

      {!quizFinished ? (
        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5 text-xs">
          
          {/* Question Title */}
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
              Caso Clínico Educativo Simulado #{currentIndex + 1}
            </span>
            <h4 className="text-lg font-black text-slate-900 mt-0.5">
              {currentQuestion.questionTitle}
            </h4>
          </div>

          {/* Clinical Case Scenario Box */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-2">
            <span className="font-bold text-slate-900 block text-xs uppercase tracking-wide">
              Escenario Clínico Simulado y Muestra de Referencia:
            </span>
            <p className="text-slate-700 leading-relaxed text-xs">
              {currentQuestion.clinicalScenario}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-[11px]">
              <div>
                <span className="font-semibold text-slate-500">Muestra clínica: </span>
                <span className="font-bold text-slate-800">{currentQuestion.clinicalSample}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-500">Método de laboratorio: </span>
                <span className="font-bold text-slate-800">{currentQuestion.diagnosticMethod}</span>
              </div>
            </div>
          </div>

          {/* Microscopic Findings Box */}
          <div className="rounded-lg border border-sky-200 bg-sky-50/50 p-4 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-sky-950 text-xs">
              <Microscope className="h-4 w-4 text-sky-700" />
              <span>Hallazgos Observados al Microscopio Óptico:</span>
            </div>
            <p className="text-slate-800 leading-relaxed text-xs font-medium">
              "{currentQuestion.microscopicObservedFeatures}"
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 block text-xs">
              ¿Cuál es la identificación microbiológica y morfológica de certeza?
            </span>

            <div className="space-y-2">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                let optionClasses = 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70';

                if (isAnswerSubmitted) {
                  if (option.isCorrect) {
                    optionClasses = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500 font-bold';
                  } else if (isSelected && !option.isCorrect) {
                    optionClasses = 'border-red-500 bg-red-50 text-red-950 ring-1 ring-red-500';
                  } else {
                    optionClasses = 'border-slate-200 bg-white opacity-60';
                  }
                } else if (isSelected) {
                  optionClasses = 'border-sky-600 bg-sky-50/80 ring-1 ring-sky-600 font-semibold';
                }

                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(option.id)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all flex items-center justify-between text-xs ${optionClasses}`}
                  >
                    <span>{option.text}</span>
                    {isAnswerSubmitted && option.isCorrect && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 ml-2" />
                    )}
                    {isAnswerSubmitted && isSelected && !option.isCorrect && (
                      <XCircle className="h-4 w-4 text-red-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit / Next Button Bar */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
            {!isAnswerSubmitted ? (
              <button
                type="button"
                disabled={!selectedOptionId}
                onClick={handleSubmitAnswer}
                className="px-5 py-2 rounded-lg bg-sky-700 text-xs font-bold text-white hover:bg-sky-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
              >
                Confirmar Respuesta
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-slate-900 text-xs font-bold text-white hover:bg-slate-800 transition-all shadow-xs"
              >
                <span>{currentIndex + 1 < DIAGNOSTIC_PRACTICE_QUESTIONS.length ? 'Siguiente Caso' : 'Ver Resultados'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            {relatedStage && onOpenStageInModal && (
              <button
                type="button"
                onClick={() => onOpenStageInModal(relatedStage)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
              >
                <Eye className="h-3.5 w-3.5 text-sky-600" />
                <span>Ver estructura en el Atlas</span>
              </button>
            )}
          </div>

          {/* Feedback & Explanation Box upon submission */}
          {isAnswerSubmitted && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3 text-xs animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="font-bold text-slate-900 block text-xs">Explicación Diagnóstica:</span>
                <p className="text-slate-700 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>

              {/* Gold differential key pearl */}
              <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/70 text-slate-800 space-y-0.5">
                <span className="font-bold text-amber-950 block text-[11px] uppercase tracking-wide">
                  Perla Diferencial de Laboratorio:
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {currentQuestion.differentialKeyPearl}
                </p>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Completed Screen */
        <div className="rounded-xl border border-sky-200 bg-white p-8 shadow-xs text-center space-y-4">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-700 mb-1">
            <Award className="h-8 w-8" />
          </div>

          <h4 className="text-2xl font-black text-slate-900">
            ¡Taller Diagnóstico Completado!
          </h4>

          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Has obtenido un puntaje de <strong className="text-sky-800 text-base">{score} de {DIAGNOSTIC_PRACTICE_QUESTIONS.length}</strong> aciertos.
          </p>

          <div className="pt-3">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-sky-700 text-xs font-bold text-white hover:bg-sky-800 transition-all shadow-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reiniciar Casos de Autoevaluación</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
