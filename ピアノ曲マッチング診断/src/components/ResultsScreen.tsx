import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, RotateCcw, Trophy, Clock, Zap, Gauge } from 'lucide-react';
import { ScoredSong } from '../lib/scoring';

interface ResultsScreenProps {
  results: ScoredSong[];
  onRestart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, onRestart }) => {
  return (
    <div className="flex flex-col min-h-screen text-white p-4 md:p-12 max-w-5xl mx-auto w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-amber-500 text-sm font-bold tracking-[0.3em] uppercase mb-4 block">
          Analysis Complete
        </span>
        <h1 className="text-4xl md:text-6xl font-serif text-slate-100 mb-6">
          ✨ あなたにぴったりのピアノ曲
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          あなたの音楽的嗜好を分析した結果、以下の10曲が選ばれました。<br className="hidden md:block" />
          相性スコアが高い順に表示しています。
        </p>
      </motion.div>

      {/* Results List */}
      <div className="grid grid-cols-1 gap-8 mb-20">
        {results.map((song, idx) => (
          <motion.div
            key={song.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group relative bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 md:p-10 hover:bg-slate-800/60 transition-all hover:border-amber-500/30 overflow-hidden"
          >
            {/* Rank Badge */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
              <span className="text-3xl font-serif font-bold text-amber-500/40 group-hover:text-amber-500 transition-colors">
                {(idx + 1).toString().padStart(2, '0')}
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              {/* Song Info */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {song.genre.map(g => (
                    <span key={g} className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-full border border-slate-600/50">
                      {g}
                    </span>
                  ))}
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif text-slate-100 group-hover:text-amber-400 transition-colors">
                    {song.title}
                  </h3>
                  <p className="text-slate-400 text-lg">{song.composer}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Gauge className="w-4 h-4 text-amber-500" />
                    <span className="text-sm">難易度: {song.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span className="text-sm">長さ: {song.duration}分</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span className="text-sm uppercase">{song.tempo}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span className="text-sm">相性: {song.score}%</span>
                  </div>
                </div>

                {/* Score Bar */}
                <div className="pt-4">
                  <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${song.score}%` }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                      className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.youtubeKeyword)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-600/20 active:scale-95"
              >
                <ExternalLink className="w-5 h-5" />
                YouTubeで聴く
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-center pb-20">
        <button
          onClick={onRestart}
          className="flex items-center gap-3 px-10 py-5 bg-slate-800 border border-slate-700 hover:border-amber-500/50 text-white font-bold text-xl rounded-full transition-all hover:bg-slate-700 shadow-xl"
        >
          <RotateCcw className="w-6 h-6" />
          もう一度診断する
        </button>
      </div>
    </div>
  );
};
