/**
 * CRUD helpers for ReviewCard.
 */
import { getDatabase } from './db';
import type { ReviewCard, ReviewCardInsert, ReviewCardUpdate } from './types';

interface ReviewCardRow {
  id: number;
  vocabulary_id: number;
  easiness_factor: number;
  interval: number;
  repetitions: number;
  next_review_date: number;
  last_reviewed_at: number | null;
}

function rowToReviewCard(row: ReviewCardRow): ReviewCard {
  return {
    id: row.id,
    vocabularyId: row.vocabulary_id,
    easinessFactor: row.easiness_factor,
    interval: row.interval,
    repetitions: row.repetitions,
    nextReviewDate: row.next_review_date,
    lastReviewedAt: row.last_reviewed_at,
  };
}

/** Create a new review card. */
export function createReviewCard(data: ReviewCardInsert): ReviewCard {
  const db = getDatabase();
  const result = db.runSync(
    `INSERT INTO review_card (vocabulary_id, easiness_factor, interval, repetitions, next_review_date, last_reviewed_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [data.vocabularyId, data.easinessFactor, data.interval, data.repetitions, data.nextReviewDate, data.lastReviewedAt ?? null]
  );
  return getReviewCardById(result.lastInsertRowId)!;
}

/** Get a review card by ID. */
export function getReviewCardById(id: number): ReviewCard | null {
  const db = getDatabase();
  const row = db.getFirstSync<ReviewCardRow>(
    'SELECT * FROM review_card WHERE id = ?',
    [id]
  );
  return row ? rowToReviewCard(row) : null;
}

/** Get the review card for a specific vocabulary item. */
export function getReviewCardByVocabularyId(vocabularyId: number): ReviewCard | null {
  const db = getDatabase();
  const row = db.getFirstSync<ReviewCardRow>(
    'SELECT * FROM review_card WHERE vocabulary_id = ?',
    [vocabularyId]
  );
  return row ? rowToReviewCard(row) : null;
}

/** Get all review cards due for review (next_review_date <= now). */
export function getDueReviewCards(): ReviewCard[] {
  const db = getDatabase();
  const now = Math.floor(Date.now() / 1000);
  const rows = db.getAllSync<ReviewCardRow>(
    'SELECT * FROM review_card WHERE next_review_date <= ? ORDER BY next_review_date ASC',
    [now]
  );
  return rows.map(rowToReviewCard);
}

/** Get all review cards. */
export function getAllReviewCards(): ReviewCard[] {
  const db = getDatabase();
  const rows = db.getAllSync<ReviewCardRow>('SELECT * FROM review_card');
  return rows.map(rowToReviewCard);
}

/** Update a review card. */
export function updateReviewCard(data: ReviewCardUpdate): ReviewCard | null {
  const db = getDatabase();
  const fields: string[] = [];
  const values: (number | null)[] = [];

  if (data.vocabularyId !== undefined) { fields.push('vocabulary_id = ?'); values.push(data.vocabularyId); }
  if (data.easinessFactor !== undefined) { fields.push('easiness_factor = ?'); values.push(data.easinessFactor); }
  if (data.interval !== undefined) { fields.push('interval = ?'); values.push(data.interval); }
  if (data.repetitions !== undefined) { fields.push('repetitions = ?'); values.push(data.repetitions); }
  if (data.nextReviewDate !== undefined) { fields.push('next_review_date = ?'); values.push(data.nextReviewDate); }
  if (data.lastReviewedAt !== undefined) { fields.push('last_reviewed_at = ?'); values.push(data.lastReviewedAt); }

  if (fields.length === 0) return getReviewCardById(data.id);

  values.push(data.id);
  db.runSync(
    `UPDATE review_card SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return getReviewCardById(data.id);
}

/** Delete a review card by ID. */
export function deleteReviewCard(id: number): boolean {
  const db = getDatabase();
  const result = db.runSync('DELETE FROM review_card WHERE id = ?', [id]);
  return result.changes > 0;
}
