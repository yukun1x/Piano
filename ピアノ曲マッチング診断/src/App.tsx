import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StartScreen } from './components/StartScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { QUESTIONS } from './data/questions';
import { UserAnswers } from './types';
import { calculateScores, ScoredSong } from './lib/scoring';

type AppStep = 'start' | 'questions' | 'results';

export default function App() {
  const [step, setStep] = useState<AppStep>('start');
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [results, setResults] = useState<ScoredSong[]>([]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleStart = () => {
    setAnswers({});
    setStep('questions');
  };

  const handleComplete = (userAnswers: UserAnswers) => {
    setAnswers(userAnswers);
    const scoredSongs = calculateScores(userAnswers);
    setResults(scoredSongs);
    setStep('results');
  };

  const handleRestart = () => {
    setStep('start');
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Gradient Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-amber-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px]" />
      </div>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {step === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StartScreen onStart={handleStart} />
            </motion.div>
          )}

          {step === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <QuestionScreen
                questions={QUESTIONS}
                onComplete={handleComplete}
                onBackToStart={handleRestart}
              />
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResultsScreen results={results} onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 py-12 text-center border-t border-slate-900/50 bg-slate-950/50 backdrop-blur-md">
        <p className="text-slate-500 text-sm font-light tracking-widest uppercase">
          &copy; 2026 Piano Matcher Diagnostic App
        </p>
      </footer>
    </div>
  );
}
