/**
 * Data model types for the HellenicaGo local database.
 */

export interface UserProfile {
  id: number;
  username: string;
  referenceLanguage: 'en' | 'es' | 'fr';
  dailyGoal: number; // lessons per day
  totalXp: number;
  currentLevel: number;
  createdAt: number; // unix timestamp
  updatedAt: number;
}

export interface LessonProgress {
  id: number;
  lessonId: string; // matches seed data lesson ID
  completed: boolean;
  score: number; // 0-100 percentage
  xpEarned: number;
  timeSpentSeconds: number;
  completedAt: number | null; // unix timestamp
  attempts: number;
}

export interface VocabularyItem {
  id: number;
  greek: string;
  transliteration: string;
  translationEn: string;
  translationEs: string;
  translationFr: string;
  exampleSentence: string | null;
  category: string; // e.g. "alphabet", "greetings", "numbers"
  lessonId: string | null; // lesson where first encountered
  learned: boolean;
  createdAt: number;
}

export interface ReviewCard {
  id: number;
  vocabularyId: number; // FK to VocabularyItem
  easinessFactor: number; // SM-2 algorithm, default 2.5
  interval: number; // days until next review
  repetitions: number; // number of consecutive correct reviews
  nextReviewDate: number; // unix timestamp
  lastReviewedAt: number | null;
}

export interface DailyStreak {
  id: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string; // ISO date string YYYY-MM-DD
  freezesAvailable: number;
  freezeUsedDate: string | null; // ISO date string
}

// Insert types (omit auto-generated fields)
export type UserProfileInsert = Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>;
export type LessonProgressInsert = Omit<LessonProgress, 'id'>;
export type VocabularyItemInsert = Omit<VocabularyItem, 'id' | 'createdAt'>;
export type ReviewCardInsert = Omit<ReviewCard, 'id'>;
export type DailyStreakInsert = Omit<DailyStreak, 'id'>;

// Update types (partial, but id required)
export type UserProfileUpdate = Partial<Omit<UserProfile, 'id' | 'createdAt'>> & { id: number };
export type LessonProgressUpdate = Partial<Omit<LessonProgress, 'id'>> & { id: number };
export type VocabularyItemUpdate = Partial<Omit<VocabularyItem, 'id' | 'createdAt'>> & { id: number };
export type ReviewCardUpdate = Partial<Omit<ReviewCard, 'id'>> & { id: number };
export type DailyStreakUpdate = Partial<Omit<DailyStreak, 'id'>> & { id: number };
