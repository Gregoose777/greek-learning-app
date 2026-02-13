/**
 * Content schema for HellenicaGo lesson content.
 * Hierarchy: Course > Unit > Lesson > Exercise
 */

/** Localized string for EN/ES/FR reference languages */
export interface LocalizedString {
  en: string;
  es: string;
  fr: string;
}

/** Exercise types supported by the lesson engine */
export type ExerciseType =
  | 'multiple_choice'
  | 'translation'
  | 'fill_blank'
  | 'match_pairs'
  | 'listening';

/** Base exercise interface with shared fields */
interface ExerciseBase {
  id: string;
  type: ExerciseType;
}

/** Multiple choice: pick the correct answer from 4 options */
export interface MultipleChoiceExercise extends ExerciseBase {
  type: 'multiple_choice';
  prompt: LocalizedString;
  options: LocalizedString[];
  correctIndex: number;
  greekPrompt?: string; // Optional Greek text shown alongside prompt
}

/** Translation: translate a sentence between Greek and reference language */
export interface TranslationExercise extends ExerciseBase {
  type: 'translation';
  prompt: LocalizedString;
  greekText: string;
  direction: 'to_greek' | 'from_greek';
  acceptedAnswers: string[]; // Multiple valid answers (reference lang or Greek)
}

/** Fill in the blank: complete the sentence with the missing word */
export interface FillBlankExercise extends ExerciseBase {
  type: 'fill_blank';
  sentence: LocalizedString; // Sentence with ___ for the blank
  greekSentence: string; // Full Greek sentence with ___ for blank
  answer: string;
  wordBank?: string[]; // Optional word choices
}

/** Match pairs: match Greek words with their translations */
export interface MatchPairsExercise extends ExerciseBase {
  type: 'match_pairs';
  pairs: Array<{
    greek: string;
    translation: LocalizedString;
  }>;
}

/** Listening: hear Greek pronunciation and identify the word/meaning */
export interface ListeningExercise extends ExerciseBase {
  type: 'listening';
  greekText: string;
  prompt: LocalizedString;
  options: LocalizedString[];
  correctIndex: number;
}

/** Union type for all exercise types */
export type Exercise =
  | MultipleChoiceExercise
  | TranslationExercise
  | FillBlankExercise
  | MatchPairsExercise
  | ListeningExercise;

/** A single lesson containing a sequence of exercises */
export interface Lesson {
  id: string;
  unitId: string;
  order: number;
  title: LocalizedString;
  description: LocalizedString;
  exercises: Exercise[];
  /** Vocabulary introduced in this lesson */
  vocabulary: Array<{
    greek: string;
    transliteration: string;
    translation: LocalizedString;
    exampleSentence?: LocalizedString;
  }>;
}

/** A unit grouping related lessons */
export interface Unit {
  id: string;
  courseId: string;
  order: number;
  title: LocalizedString;
  description: LocalizedString;
  lessons: Lesson[];
}

/** Top-level course containing all units */
export interface Course {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  units: Unit[];
}
