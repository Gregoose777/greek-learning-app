/**
 * Seed data loader for HellenicaGo.
 * Loads course content into the SQLite database on first launch.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from '../database/db';
import { greekCourse } from './seedData';
import type { Course, Lesson } from './types';

const SEED_VERSION_KEY = 'hellenica_seed_version';
const CURRENT_SEED_VERSION = '2';

/** Check if seed data has already been loaded */
async function isSeedLoaded(): Promise<boolean> {
  const version = await AsyncStorage.getItem(SEED_VERSION_KEY);
  return version === CURRENT_SEED_VERSION;
}

/** Insert vocabulary items from a lesson into the database */
function insertLessonVocabulary(lesson: Lesson): void {
  const db = getDatabase();
  for (const vocab of lesson.vocabulary) {
    // Check if vocabulary already exists (by greek text + lesson ID)
    const existing = db.getFirstSync<{ id: number }>(
      'SELECT id FROM vocabulary_item WHERE greek = ? AND lesson_id = ?',
      [vocab.greek, lesson.id]
    );
    if (!existing) {
      db.runSync(
        `INSERT INTO vocabulary_item (greek, transliteration, translation_en, translation_es, translation_fr, example_sentence, category, lesson_id, learned)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
        [
          vocab.greek,
          vocab.transliteration,
          vocab.translation.en,
          vocab.translation.es,
          vocab.translation.fr,
          vocab.exampleSentence?.en ?? null,
          lesson.unitId,
          lesson.id,
        ]
      );
    }
  }
}

/** Load all seed data from the course into the database */
function loadCourseData(course: Course): void {
  const db = getDatabase();
  db.withTransactionSync(() => {
    for (const unit of course.units) {
      for (const lesson of unit.lessons) {
        insertLessonVocabulary(lesson);
      }
    }
  });
}

/**
 * Initialize seed data on app start.
 * Only loads data if not already loaded (based on version key).
 */
export async function initializeSeedData(): Promise<void> {
  const loaded = await isSeedLoaded();
  if (loaded) return;

  loadCourseData(greekCourse);
  await AsyncStorage.setItem(SEED_VERSION_KEY, CURRENT_SEED_VERSION);
}

/**
 * Get the full course content (for rendering lessons/exercises).
 * This reads from the bundled JSON, not from the database.
 */
export function getCourseContent(): Course {
  return greekCourse;
}

/** Get a specific unit by ID */
export function getUnitById(unitId: string) {
  return greekCourse.units.find((u) => u.id === unitId) ?? null;
}

/** Get a specific lesson by ID */
export function getLessonById(lessonId: string) {
  for (const unit of greekCourse.units) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return null;
}

/** Get all lessons in order across all units */
export function getAllLessonsFlat(): Lesson[] {
  return greekCourse.units.flatMap((u) => u.lessons);
}
