/**
 * CRUD helpers for LessonProgress.
 */
import { getDatabase } from './db';
import type { LessonProgress, LessonProgressInsert, LessonProgressUpdate } from './types';

interface LessonProgressRow {
  id: number;
  lesson_id: string;
  completed: number;
  score: number;
  xp_earned: number;
  time_spent_seconds: number;
  completed_at: number | null;
  attempts: number;
}

function rowToLessonProgress(row: LessonProgressRow): LessonProgress {
  return {
    id: row.id,
    lessonId: row.lesson_id,
    completed: row.completed === 1,
    score: row.score,
    xpEarned: row.xp_earned,
    timeSpentSeconds: row.time_spent_seconds,
    completedAt: row.completed_at,
    attempts: row.attempts,
  };
}

/** Create a new lesson progress record. */
export function createLessonProgress(data: LessonProgressInsert): LessonProgress {
  const db = getDatabase();
  const result = db.runSync(
    `INSERT INTO lesson_progress (lesson_id, completed, score, xp_earned, time_spent_seconds, completed_at, attempts)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [data.lessonId, data.completed ? 1 : 0, data.score, data.xpEarned, data.timeSpentSeconds, data.completedAt ?? null, data.attempts]
  );
  return getLessonProgressById(result.lastInsertRowId)!;
}

/** Get lesson progress by row ID. */
export function getLessonProgressById(id: number): LessonProgress | null {
  const db = getDatabase();
  const row = db.getFirstSync<LessonProgressRow>(
    'SELECT * FROM lesson_progress WHERE id = ?',
    [id]
  );
  return row ? rowToLessonProgress(row) : null;
}

/** Get lesson progress by lesson ID (the content ID, not row ID). */
export function getLessonProgressByLessonId(lessonId: string): LessonProgress | null {
  const db = getDatabase();
  const row = db.getFirstSync<LessonProgressRow>(
    'SELECT * FROM lesson_progress WHERE lesson_id = ?',
    [lessonId]
  );
  return row ? rowToLessonProgress(row) : null;
}

/** Get all lesson progress records. */
export function getAllLessonProgress(): LessonProgress[] {
  const db = getDatabase();
  const rows = db.getAllSync<LessonProgressRow>('SELECT * FROM lesson_progress');
  return rows.map(rowToLessonProgress);
}

/** Get all completed lessons. */
export function getCompletedLessons(): LessonProgress[] {
  const db = getDatabase();
  const rows = db.getAllSync<LessonProgressRow>(
    'SELECT * FROM lesson_progress WHERE completed = 1'
  );
  return rows.map(rowToLessonProgress);
}

/** Update a lesson progress record. */
export function updateLessonProgress(data: LessonProgressUpdate): LessonProgress | null {
  const db = getDatabase();
  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  if (data.lessonId !== undefined) { fields.push('lesson_id = ?'); values.push(data.lessonId); }
  if (data.completed !== undefined) { fields.push('completed = ?'); values.push(data.completed ? 1 : 0); }
  if (data.score !== undefined) { fields.push('score = ?'); values.push(data.score); }
  if (data.xpEarned !== undefined) { fields.push('xp_earned = ?'); values.push(data.xpEarned); }
  if (data.timeSpentSeconds !== undefined) { fields.push('time_spent_seconds = ?'); values.push(data.timeSpentSeconds); }
  if (data.completedAt !== undefined) { fields.push('completed_at = ?'); values.push(data.completedAt); }
  if (data.attempts !== undefined) { fields.push('attempts = ?'); values.push(data.attempts); }

  if (fields.length === 0) return getLessonProgressById(data.id);

  values.push(data.id);
  db.runSync(
    `UPDATE lesson_progress SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return getLessonProgressById(data.id);
}

/** Get lessons completed today (based on completed_at timestamp). */
export function getTodayCompletedLessonCount(): number {
  const db = getDatabase();
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startTimestamp = Math.floor(startOfDay.getTime() / 1000);
  const row = db.getFirstSync<{ count: number }>(
    'SELECT COUNT(*) as count FROM lesson_progress WHERE completed = 1 AND completed_at >= ?',
    [startTimestamp]
  );
  return row?.count ?? 0;
}

/** Delete a lesson progress record by ID. */
export function deleteLessonProgress(id: number): boolean {
  const db = getDatabase();
  const result = db.runSync('DELETE FROM lesson_progress WHERE id = ?', [id]);
  return result.changes > 0;
}
