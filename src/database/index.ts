// Database initialization
export { getDatabase, closeDatabase } from './db';

// Types
export type {
  UserProfile,
  UserProfileInsert,
  UserProfileUpdate,
  LessonProgress,
  LessonProgressInsert,
  LessonProgressUpdate,
  VocabularyItem,
  VocabularyItemInsert,
  VocabularyItemUpdate,
  ReviewCard,
  ReviewCardInsert,
  ReviewCardUpdate,
  DailyStreak,
  DailyStreakInsert,
  DailyStreakUpdate,
} from './types';

// UserProfile CRUD
export {
  createUserProfile,
  getUserProfile,
  getUserProfileById,
  updateUserProfile,
  deleteUserProfile,
} from './userProfile';

// LessonProgress CRUD
export {
  createLessonProgress,
  getLessonProgressById,
  getLessonProgressByLessonId,
  getAllLessonProgress,
  getCompletedLessons,
  getTodayCompletedLessonCount,
  updateLessonProgress,
  deleteLessonProgress,
} from './lessonProgress';

// VocabularyItem CRUD
export {
  createVocabularyItem,
  getVocabularyItemById,
  getAllVocabularyItems,
  getVocabularyItemsByCategory,
  getVocabularyItemsByLesson,
  getLearnedVocabularyItems,
  updateVocabularyItem,
  deleteVocabularyItem,
} from './vocabularyItem';

// ReviewCard CRUD
export {
  createReviewCard,
  getReviewCardById,
  getReviewCardByVocabularyId,
  getDueReviewCards,
  getAllReviewCards,
  updateReviewCard,
  deleteReviewCard,
} from './reviewCard';

// DailyStreak CRUD
export {
  createDailyStreak,
  getDailyStreak,
  getDailyStreakById,
  updateDailyStreak,
  deleteDailyStreak,
} from './dailyStreak';

// Streak business logic
export {
  getOrCreateStreak,
  recordLessonForStreak,
  checkStreakOnAppOpen,
} from './streakLogic';
