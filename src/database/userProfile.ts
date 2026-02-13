/**
 * CRUD helpers for UserProfile.
 * Singleton pattern: only one user profile exists at a time.
 */
import { getDatabase } from './db';
import type { UserProfile, UserProfileInsert, UserProfileUpdate } from './types';

interface UserProfileRow {
  id: number;
  username: string;
  reference_language: string;
  daily_goal: number;
  total_xp: number;
  current_level: number;
  created_at: number;
  updated_at: number;
}

function rowToUserProfile(row: UserProfileRow): UserProfile {
  return {
    id: row.id,
    username: row.username,
    referenceLanguage: row.reference_language as UserProfile['referenceLanguage'],
    dailyGoal: row.daily_goal,
    totalXp: row.total_xp,
    currentLevel: row.current_level,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Create a new user profile. */
export function createUserProfile(data: UserProfileInsert): UserProfile {
  const db = getDatabase();
  const now = Math.floor(Date.now() / 1000);
  const result = db.runSync(
    `INSERT INTO user_profile (username, reference_language, daily_goal, total_xp, current_level, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [data.username, data.referenceLanguage, data.dailyGoal, data.totalXp, data.currentLevel, now, now]
  );
  return getUserProfileById(result.lastInsertRowId)!;
}

/** Get user profile by ID. */
export function getUserProfileById(id: number): UserProfile | null {
  const db = getDatabase();
  const row = db.getFirstSync<UserProfileRow>(
    'SELECT * FROM user_profile WHERE id = ?',
    [id]
  );
  return row ? rowToUserProfile(row) : null;
}

/** Get the current (first) user profile, or null if none exists. */
export function getUserProfile(): UserProfile | null {
  const db = getDatabase();
  const row = db.getFirstSync<UserProfileRow>(
    'SELECT * FROM user_profile ORDER BY id ASC LIMIT 1'
  );
  return row ? rowToUserProfile(row) : null;
}

/** Update a user profile. Only provided fields are updated. */
export function updateUserProfile(data: UserProfileUpdate): UserProfile | null {
  const db = getDatabase();
  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  if (data.username !== undefined) { fields.push('username = ?'); values.push(data.username); }
  if (data.referenceLanguage !== undefined) { fields.push('reference_language = ?'); values.push(data.referenceLanguage); }
  if (data.dailyGoal !== undefined) { fields.push('daily_goal = ?'); values.push(data.dailyGoal); }
  if (data.totalXp !== undefined) { fields.push('total_xp = ?'); values.push(data.totalXp); }
  if (data.currentLevel !== undefined) { fields.push('current_level = ?'); values.push(data.currentLevel); }

  if (fields.length === 0) return getUserProfileById(data.id);

  const now = Math.floor(Date.now() / 1000);
  fields.push('updated_at = ?');
  values.push(now);
  values.push(data.id);

  db.runSync(
    `UPDATE user_profile SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return getUserProfileById(data.id);
}

/** Delete a user profile by ID. */
export function deleteUserProfile(id: number): boolean {
  const db = getDatabase();
  const result = db.runSync('DELETE FROM user_profile WHERE id = ?', [id]);
  return result.changes > 0;
}
