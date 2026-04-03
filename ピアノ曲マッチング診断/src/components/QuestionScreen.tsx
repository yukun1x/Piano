import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Question, UserAnswers } from '../types';

interface QuestionScreenProps {
  questions: Question[];
  onComplete: (answers: UserAnswers) => void;
  onBackToStart: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({ questions, onComplete, onBackToStart }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});

  const currentQuestion = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  const handleOptionSelect = (value: string | number) => {
    if (currentQuestion.type === 'radio') {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    } else {
      const currentSelections = (answers[currentQuestion.id] as (string | number)[]) || [];
      if (currentSelections.includes(value)) {
        setAnswers(prev => ({
          ...prev,
          [currentQuestion.id]: currentSelections.filter(v => v !== value)
        }));
      } else {
        if (currentQuestion.maxSelect && currentSelections.length >= currentQuestion.maxSelect) {
          return;
        }
        setAnswers(prev => ({
          ...prev,
          [currentQuestion.id]: [...currentSelections, value]
        }));
      }
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    } else {
      onBackToStart();
    }
  };

  const isAnswered = currentQuestion.type === 'radio' 
    ? answers[currentQuestion.id] !== undefined 
    : (answers[currentQuestion.id] as any[])?.length > 0;

  return (
    <div className="flex flex-col min-h-screen text-white p-4 md:p-8 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div className="space-y-1">
          <span className="text-amber-500 text-sm font-medium tracking-widest uppercase">
            {currentQuestion.chapter}
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-slate-100">
            {currentQuestion.text}
          </h2>
        </div>
        <div className="text-slate-400 text-lg font-mono">
          <span className="text-amber-400">{currentIdx + 1}</span> / {questions.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-800 rounded-full mb-12 overflow-hidden border border-slate-700/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
        />
      </div>

      {/* Options */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-4"
          >
            {currentQuestion.options.map((option) => {
              const isSelected = currentQuestion.type === 'radio'
                ? answers[currentQuestion.id] === option.value
                : (answers[currentQuestion.id] as any[])?.includes(option.value);

              return (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`
                    group relative flex items-center justify-between p-5 rounded-xl border-2 transition-all text-left
                    ${isSelected 
                      ? 'bg-amber-500/10 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]' 
                      : 'bg-slate-800/50 border-slate-700 hover:border-amber-500/50 hover:bg-slate-800'}
                  `}
                >
                  <span className={`text-lg transition-colors ${isSelected ? 'text-amber-400 font-medium' : 'text-slate-300'}`}>
                    {option.label}
                  </span>
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                    ${isSelected ? 'bg-amber-500 border-amber-500' : 'border-slate-600 group-hover:border-amber-500/50'}
                  `}>
                    {isSelected && <Check className="w-4 h-4 text-slate-900 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="flex justify-between items-center mt-12 py-6 border-t border-slate-800">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-4 py-2"
        >
          <ChevronLeft className="w-5 h-5" />
          戻る
        </button>
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className={`
            flex items-center gap-2 px-8 py-3 rounded-full font-bold text-lg transition-all
            ${isAnswered 
              ? 'bg-amber-500 text-slate-900 hover:bg-amber-400 shadow-lg shadow-amber-500/20' 
              : 'bg-slate-800 text-slate-600 cursor-not-allowed'}
          `}
        >
          {currentIdx === questions.length - 1 ? '結果を見る' : '次へ'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
