import { Song, UserAnswers } from '../types';
import { SONGS } from '../data/songs';

export interface ScoredSong extends Song {
  score: number;
}

export function calculateScores(answers: UserAnswers): ScoredSong[] {
  return SONGS.map(song => {
    // 1. 作曲家マッチ度 (30%)
    let composerScore = 60;
    const favoriteComposers = (answers['Q4'] as string[]) || [];
    if (favoriteComposers.includes(song.composerId)) {
      composerScore = 95;
    }

    // 2. ムード合致度 (25%)
    const userMood = (answers['Q5'] as number) || 0;
    const moodDistance = Math.abs(userMood - song.mood);
    const moodScore = Math.max(0, 100 - moodDistance * 1.5);

    // 3. スタイル複合スコア (20%)
    const stylePoints = [];
    
    // Q7: 惹かれる要素
    const preferredElement = answers['Q7'] as string;
    if (preferredElement && song.style[preferredElement as keyof typeof song.style] > 80) {
      stylePoints.push(100);
    } else {
      stylePoints.push(60);
    }

    // Q10: テンポ
    const preferredTempo = answers['Q10'] as string;
    if (preferredTempo === 'any' || preferredTempo === song.tempo) {
      stylePoints.push(100);
    } else {
      stylePoints.push(60);
    }

    // Q6: 長さ
    const preferredScale = answers['Q6'] as string;
    let scaleMatch = false;
    if (preferredScale === 'any') scaleMatch = true;
    else if (preferredScale === 'short' && song.duration < 5) scaleMatch = true;
    else if (preferredScale === 'medium' && song.duration >= 5 && song.duration < 10) scaleMatch = true;
    else if (preferredScale === 'long' && song.duration >= 10) scaleMatch = true;
    
    stylePoints.push(scaleMatch ? 100 : 60);
    
    const styleScore = stylePoints.reduce((a, b) => a + b, 0) / stylePoints.length;

    // 4. 時代マッチ度 (10%)
    const preferredEra = answers['Q8'] as string;
    const eraScore = (preferredEra === 'any' || preferredEra === song.era) ? 100 : 60;

    // 5. 難易度マッチ度 (15%)
    let difficultyScore = 80;
    const role = answers['Q1'] as string;
    if (role !== 'listener') {
      const experience = (answers['Q2'] as number) || 1;
      // Simple estimation: more experience -> higher difficulty preference
      // 1yr -> 3, 3yr -> 5, 6yr -> 7, 10yr -> 8, 15yr -> 9
      let estimatedDifficulty = 3;
      if (experience >= 15) estimatedDifficulty = 9;
      else if (experience >= 10) estimatedDifficulty = 8;
      else if (experience >= 6) estimatedDifficulty = 7;
      else if (experience >= 3) estimatedDifficulty = 5;
      
      difficultyScore = Math.max(0, 100 - Math.abs(estimatedDifficulty - song.difficulty) * 8);
    }

    const totalScore = 
      (composerScore * 0.30) +
      (moodScore * 0.25) +
      (styleScore * 0.20) +
      (eraScore * 0.10) +
      (difficultyScore * 0.15);

    return {
      ...song,
      score: Math.round(totalScore)
    };
  }).sort((a, b) => b.score - a.score).slice(0, 10);
}
