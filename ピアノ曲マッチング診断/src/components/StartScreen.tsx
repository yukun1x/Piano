import React from 'react';
import { motion } from 'motion/react';
import { Music, BarChart3, Users, Play } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full"
      >
        <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-tight text-amber-400">
          ピアノ曲マッチング診断
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light leading-relaxed">
          15問の質問に答えると、あなたの音楽的嗜好を分析し、<br className="hidden md:block" />
          最も相性の良いピアノ曲TOP10をレコメンドします。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 border border-amber-500/20">
              <BarChart3 className="text-amber-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">データ分析</h3>
            <p className="text-sm text-slate-400">独自のアルゴリズムで嗜好を数値化</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 border border-amber-500/20">
              <Music className="text-amber-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">厳選された名曲</h3>
            <p className="text-sm text-slate-400">クラシックから近現代まで幅広く網羅</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 border border-amber-500/20">
              <Users className="text-amber-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium mb-2">パーソナライズ</h3>
            <p className="text-sm text-slate-400">あなただけの「運命の1曲」に出会う</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative inline-flex items-center gap-3 px-10 py-5 bg-amber-500 text-slate-900 font-bold text-xl rounded-full overflow-hidden transition-all hover:bg-amber-400 shadow-xl shadow-amber-500/20"
        >
          <Play className="w-6 h-6 fill-current" />
          診断を開始する
        </motion.button>
      </motion.div>
    </div>
  );
};
