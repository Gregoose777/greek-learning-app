/**
 * Daily streak business logic.
 * Handles streak incrementing, resetting, freezes, and initialization.
 */
import { getDailyStreak, createDailyStreak, updateDailyStreak } from './dailyStreak';
import type { DailyStreak } from './types';

/** Get today's date as ISO string YYYY-MM-DD */
function getTodayISO(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/** Get yesterday's date as ISO string YYYY-MM-DD */
function getYesterdayISO(): string {
  const now = new Date();
  now.setDate(now.getDate() - 1);
  return now.toISOString().split('T')[0];
}

/** Calculate difference in days between two ISO date strings */
function daysBetween(dateA: string, dateB: string): number {
  const a = new Date(dateA + 'T00:00:00');
  const b = new Date(dateB + 'T00:00:00');
  return Math.round(Math.abs(a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Get or initialize the streak record.
 * Creates a new record if none exists.
 */
export function getOrCreateStreak(): DailyStreak {
  let streak = getDailyStreak();
  if (!streak) {
    streak = createDailyStreak({
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: '',
      freezesAvailable: 0,
      freezeUsedDate: null,
    });
  }
  return streak;
}

/**
 * Record a lesson completion for streak purposes.
 * Call this whenever a lesson is completed.
 *
 * Logic:
 * - If lastActivityDate is today, no change (already counted today).
 * - If lastActivityDate is yesterday, increment streak.
 * - If lastActivityDate is 2 days ago and a freeze is available (not already used),
 *   use the freeze and increment streak.
 * - Otherwise, reset streak to 1 (today starts a new streak).
 *
 * Returns the updated streak.
 */
export function recordLessonForStreak(): DailyStreak {
  const streak = getOrCreateStreak();
  const today = getTodayISO();
  const yesterday = getYesterdayISO();

  // Already recorded activity today
  if (streak.lastActivityDate === today) {
    return streak;
  }

  let newStreak: number;
  let freezesAvailable = streak.freezesAvailable;
  let freezeUsedDate = streak.freezeUsedDate;

  if (streak.lastActivityDate === yesterday) {
    // Consecutive day — increment streak
    newStreak = streak.currentStreak + 1;
  } else if (streak.lastActivityDate !== '' && daysBetween(streak.lastActivityDate, today) === 2 && freezesAvailable > 0) {
    // Missed exactly 1 day but have a freeze available
    // Use the freeze to cover yesterday
    newStreak = streak.currentStreak + 1;
    freezesAvailable -= 1;
    freezeUsedDate = yesterday;
  } else {
    // Missed more than 1 day (or first ever activity) — start fresh
    newStreak = 1;
    freezeUsedDate = null;
  }

  const newLongest = Math.max(streak.longestStreak, newStreak);

  // Bank a freeze every 7-day streak milestone
  // Award 1 freeze when streak reaches a multiple of 7 (7, 14, 21, etc.)
  // Only award if we just crossed the threshold (previous streak was below this multiple)
  const prevMultiple = Math.floor(streak.currentStreak / 7);
  const newMultiple = Math.floor(newStreak / 7);
  if (newMultiple > prevMultiple) {
    freezesAvailable += 1;
  }

  return updateDailyStreak({
    id: streak.id,
    currentStreak: newStreak,
    longestStreak: newLongest,
    lastActivityDate: today,
    freezesAvailable,
    freezeUsedDate,
  })!;
}

/**
 * Check and update streak state on app open.
 * If the user missed a day (last activity was 2+ days ago) and has no freeze,
 * the streak should be reset. This catches cases where the user opens the app
 * without completing a lesson.
 *
 * Returns the current streak state (potentially reset).
 */
export function checkStreakOnAppOpen(): DailyStreak {
  const streak = getOrCreateStreak();
  const today = getTodayISO();
  const yesterday = getYesterdayISO();

  // If last activity is today or yesterday, streak is still alive — no action needed
  if (streak.lastActivityDate === today || streak.lastActivityDate === yesterday) {
    return streak;
  }

  // If no activity date set, streak is already 0 — no change needed
  if (streak.lastActivityDate === '') {
    return streak;
  }

  const gap = daysBetween(streak.lastActivityDate, today);

  // Missed exactly 1 day and have a freeze — don't reset yet (freeze will be used on next completion)
  if (gap === 2 && streak.freezesAvailable > 0) {
    return streak;
  }

  // Streak broken — reset to 0
  if (streak.currentStreak > 0) {
    return updateDailyStreak({
      id: streak.id,
      currentStreak: 0,
      freezeUsedDate: null,
    })!;
  }

  return streak;
}
