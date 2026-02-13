// Content types
export type {
  LocalizedString,
  ExerciseType,
  MultipleChoiceExercise,
  TranslationExercise,
  FillBlankExercise,
  MatchPairsExercise,
  ListeningExercise,
  Exercise,
  Lesson,
  Unit,
  Course,
} from './types';

// Seed data
export { greekCourse } from './seedData';

// Seed loader & content accessors
export {
  initializeSeedData,
  getCourseContent,
  getUnitById,
  getLessonById,
  getAllLessonsFlat,
} from './seedLoader';

// Alphabet data
export { GREEK_ALPHABET, generateQuizOptions } from './alphabetData';
export type { GreekLetter } from './alphabetData';
