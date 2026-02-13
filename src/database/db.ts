/**
 * Database initialization and schema management for HellenicaGo.
 * Uses expo-sqlite v16 synchronous API.
 */
import * as SQLite from 'expo-sqlite';

const DB_NAME = 'hellenica.db';

let _db: SQLite.SQLiteDatabase | null = null;

/** Get the singleton database instance, creating it if needed. */
export function getDatabase(): SQLite.SQLiteDatabase {
  if (!_db) {
    _db = SQLite.openDatabaseSync(DB_NAME);
    initializeSchema(_db);
  }
  return _db;
}

/** Create all tables if they don't already exist. */
function initializeSchema(db: SQLite.SQLiteDatabase): void {
  db.execSync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS user_profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL DEFAULT '',
      reference_language TEXT NOT NULL DEFAULT 'en' CHECK(reference_language IN ('en', 'es', 'fr')),
      daily_goal INTEGER NOT NULL DEFAULT 1,
      total_xp INTEGER NOT NULL DEFAULT 0,
      current_level INTEGER NOT NULL DEFAULT 1,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );

    CREATE TABLE IF NOT EXISTS lesson_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lesson_id TEXT NOT NULL UNIQUE,
      completed INTEGER NOT NULL DEFAULT 0,
      score INTEGER NOT NULL DEFAULT 0,
      xp_earned INTEGER NOT NULL DEFAULT 0,
      time_spent_seconds INTEGER NOT NULL DEFAULT 0,
      completed_at INTEGER,
      attempts INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS vocabulary_item (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      greek TEXT NOT NULL,
      transliteration TEXT NOT NULL DEFAULT '',
      translation_en TEXT NOT NULL DEFAULT '',
      translation_es TEXT NOT NULL DEFAULT '',
      translation_fr TEXT NOT NULL DEFAULT '',
      example_sentence TEXT,
      category TEXT NOT NULL DEFAULT '',
      lesson_id TEXT,
      learned INTEGER NOT NULL DEFAULT 0,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );

    CREATE TABLE IF NOT EXISTS review_card (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vocabulary_id INTEGER NOT NULL,
      easiness_factor REAL NOT NULL DEFAULT 2.5,
      interval INTEGER NOT NULL DEFAULT 0,
      repetitions INTEGER NOT NULL DEFAULT 0,
      next_review_date INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      last_reviewed_at INTEGER,
      FOREIGN KEY (vocabulary_id) REFERENCES vocabulary_item(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS daily_streak (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      current_streak INTEGER NOT NULL DEFAULT 0,
      longest_streak INTEGER NOT NULL DEFAULT 0,
      last_activity_date TEXT NOT NULL DEFAULT '',
      freezes_available INTEGER NOT NULL DEFAULT 0,
      freeze_used_date TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);
    CREATE INDEX IF NOT EXISTS idx_vocabulary_category ON vocabulary_item(category);
    CREATE INDEX IF NOT EXISTS idx_vocabulary_lesson ON vocabulary_item(lesson_id);
    CREATE INDEX IF NOT EXISTS idx_review_card_next_review ON review_card(next_review_date);
    CREATE INDEX IF NOT EXISTS idx_review_card_vocab ON review_card(vocabulary_id);
  `);
}

/** Close the database connection (for cleanup/testing). */
export function closeDatabase(): void {
  if (_db) {
    _db.closeSync();
    _db = null;
  }
}
