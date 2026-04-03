export type Era = 'classical' | 'romantic' | 'modern' | 'contemporary';
export type Tempo = 'slow' | 'moderate' | 'fast' | 'dramatic';

export interface SongStyle {
  melody: number;
  harmony: number;
  technique: number;
  dynamics: number;
}

export interface Song {
  id: number;
  title: string;
  composer: string;
  composerId: string;
  difficulty: number;
  mood: number;
  tempo: Tempo;
  duration: number;
  era: Era;
  style: SongStyle;
  genre: string[];
  youtubeKeyword: string;
}

export interface QuestionOption {
  label: string;
  value: string | number;
}

export interface Question {
  id: string;
  chapter: string;
  text: string;
  type: 'radio' | 'checkbox';
  options: QuestionOption[];
  maxSelect?: number;
}

export interface UserAnswers {
  [key: string]: any;
}
