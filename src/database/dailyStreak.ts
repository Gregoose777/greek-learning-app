/**
 * CRUD helpers for DailyStreak.
 * Singleton pattern: only one streak record exists at a time.
 */
import { getDatabase } from './db';
import type { DailyStreak, DailyStreakInsert, DailyStreakUpdate } from './types';

interface DailyStreakRow {
  id: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  freezes_available: number;
  freeze_used_date: string | null;
}

function rowToDailyStreak(row: DailyStreakRow): DailyStreak {
  return {
    id: row.id,
    currentStreak: row.current_streak,
    longestStreak: row.longest_streak,
    lastActivityDate: row.last_activity_date,
    freezesAvailable: row.freezes_available,
    freezeUsedDate: row.freeze_used_date,
  };
}

/** Create a new daily streak record. */
export function createDailyStreak(data: DailyStreakInsert): DailyStreak {
  const db = getDatabase();
  const result = db.runSync(
    `INSERT INTO daily_streak (current_streak, longest_streak, last_activity_date, freezes_available, freeze_used_date)
     VALUES (?, ?, ?, ?, ?)`,
    [data.currentStreak, data.longestStreak, data.lastActivityDate, data.freezesAvailable, data.freezeUsedDate ?? null]
  );
  return getDailyStreakById(result.lastInsertRowId)!;
}

/** Get daily streak by ID. */
export function getDailyStreakById(id: number): DailyStreak | null {
  const db = getDatabase();
  const row = db.getFirstSync<DailyStreakRow>(
    'SELECT * FROM daily_streak WHERE id = ?',
    [id]
  );
  return row ? rowToDailyStreak(row) : null;
}

/** Get the current (first) daily streak record, or null if none exists. */
export function getDailyStreak(): DailyStreak | null {
  const db = getDatabase();
  const row = db.getFirstSync<DailyStreakRow>(
    'SELECT * FROM daily_streak ORDER BY id ASC LIMIT 1'
  );
  return row ? rowToDailyStreak(row) : null;
}

/** Update a daily streak record. */
export function updateDailyStreak(data: DailyStreakUpdate): DailyStreak | null {
  const db = getDatabase();
  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  if (data.currentStreak !== undefined) { fields.push('current_streak = ?'); values.push(data.currentStreak); }
  if (data.longestStreak !== undefined) { fields.push('longest_streak = ?'); values.push(data.longestStreak); }
  if (data.lastActivityDate !== undefined) { fields.push('last_activity_date = ?'); values.push(data.lastActivityDate); }
  if (data.freezesAvailable !== undefined) { fields.push('freezes_available = ?'); values.push(data.freezesAvailable); }
  if (data.freezeUsedDate !== undefined) { fields.push('freeze_used_date = ?'); values.push(data.freezeUsedDate); }

  if (fields.length === 0) return getDailyStreakById(data.id);

  values.push(data.id);
  db.runSync(
    `UPDATE daily_streak SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return getDailyStreakById(data.id);
}

/** Delete a daily streak record by ID. */
export function deleteDailyStreak(id: number): boolean {
  const db = getDatabase();
  const result = db.runSync('DELETE FROM daily_streak WHERE id = ?', [id]);
  return result.changes > 0;
}
