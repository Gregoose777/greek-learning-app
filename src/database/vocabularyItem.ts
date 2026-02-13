/**
 * CRUD helpers for VocabularyItem.
 */
import { getDatabase } from './db';
import type { VocabularyItem, VocabularyItemInsert, VocabularyItemUpdate } from './types';

interface VocabularyItemRow {
  id: number;
  greek: string;
  transliteration: string;
  translation_en: string;
  translation_es: string;
  translation_fr: string;
  example_sentence: string | null;
  category: string;
  lesson_id: string | null;
  learned: number;
  created_at: number;
}

function rowToVocabularyItem(row: VocabularyItemRow): VocabularyItem {
  return {
    id: row.id,
    greek: row.greek,
    transliteration: row.transliteration,
    translationEn: row.translation_en,
    translationEs: row.translation_es,
    translationFr: row.translation_fr,
    exampleSentence: row.example_sentence,
    category: row.category,
    lessonId: row.lesson_id,
    learned: row.learned === 1,
    createdAt: row.created_at,
  };
}

/** Create a new vocabulary item. */
export function createVocabularyItem(data: VocabularyItemInsert): VocabularyItem {
  const db = getDatabase();
  const now = Math.floor(Date.now() / 1000);
  const result = db.runSync(
    `INSERT INTO vocabulary_item (greek, transliteration, translation_en, translation_es, translation_fr, example_sentence, category, lesson_id, learned, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [data.greek, data.transliteration, data.translationEn, data.translationEs, data.translationFr, data.exampleSentence ?? null, data.category, data.lessonId ?? null, data.learned ? 1 : 0, now]
  );
  return getVocabularyItemById(result.lastInsertRowId)!;
}

/** Get a vocabulary item by ID. */
export function getVocabularyItemById(id: number): VocabularyItem | null {
  const db = getDatabase();
  const row = db.getFirstSync<VocabularyItemRow>(
    'SELECT * FROM vocabulary_item WHERE id = ?',
    [id]
  );
  return row ? rowToVocabularyItem(row) : null;
}

/** Get all vocabulary items. */
export function getAllVocabularyItems(): VocabularyItem[] {
  const db = getDatabase();
  const rows = db.getAllSync<VocabularyItemRow>('SELECT * FROM vocabulary_item');
  return rows.map(rowToVocabularyItem);
}

/** Get vocabulary items by category. */
export function getVocabularyItemsByCategory(category: string): VocabularyItem[] {
  const db = getDatabase();
  const rows = db.getAllSync<VocabularyItemRow>(
    'SELECT * FROM vocabulary_item WHERE category = ?',
    [category]
  );
  return rows.map(rowToVocabularyItem);
}

/** Get vocabulary items for a specific lesson. */
export function getVocabularyItemsByLesson(lessonId: string): VocabularyItem[] {
  const db = getDatabase();
  const rows = db.getAllSync<VocabularyItemRow>(
    'SELECT * FROM vocabulary_item WHERE lesson_id = ?',
    [lessonId]
  );
  return rows.map(rowToVocabularyItem);
}

/** Get all learned vocabulary items. */
export function getLearnedVocabularyItems(): VocabularyItem[] {
  const db = getDatabase();
  const rows = db.getAllSync<VocabularyItemRow>(
    'SELECT * FROM vocabulary_item WHERE learned = 1'
  );
  return rows.map(rowToVocabularyItem);
}

/** Update a vocabulary item. */
export function updateVocabularyItem(data: VocabularyItemUpdate): VocabularyItem | null {
  const db = getDatabase();
  const fields: string[] = [];
  const values: (string | number | null)[] = [];

  if (data.greek !== undefined) { fields.push('greek = ?'); values.push(data.greek); }
  if (data.transliteration !== undefined) { fields.push('transliteration = ?'); values.push(data.transliteration); }
  if (data.translationEn !== undefined) { fields.push('translation_en = ?'); values.push(data.translationEn); }
  if (data.translationEs !== undefined) { fields.push('translation_es = ?'); values.push(data.translationEs); }
  if (data.translationFr !== undefined) { fields.push('translation_fr = ?'); values.push(data.translationFr); }
  if (data.exampleSentence !== undefined) { fields.push('example_sentence = ?'); values.push(data.exampleSentence); }
  if (data.category !== undefined) { fields.push('category = ?'); values.push(data.category); }
  if (data.lessonId !== undefined) { fields.push('lesson_id = ?'); values.push(data.lessonId); }
  if (data.learned !== undefined) { fields.push('learned = ?'); values.push(data.learned ? 1 : 0); }

  if (fields.length === 0) return getVocabularyItemById(data.id);

  values.push(data.id);
  db.runSync(
    `UPDATE vocabulary_item SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return getVocabularyItemById(data.id);
}

/** Mark all vocabulary items for a lesson as learned. */
export function markVocabularyLearnedByLesson(lessonId: string): void {
  const db = getDatabase();
  db.runSync(
    'UPDATE vocabulary_item SET learned = 1 WHERE lesson_id = ? AND learned = 0',
    [lessonId]
  );
}

/** Search vocabulary items by greek text or translation. */
export function searchVocabularyItems(query: string, lang: 'en' | 'es' | 'fr'): VocabularyItem[] {
  const db = getDatabase();
  const pattern = `%${query}%`;
  const translationCol = `translation_${lang}`;
  const rows = db.getAllSync<VocabularyItemRow>(
    `SELECT * FROM vocabulary_item WHERE learned = 1 AND (greek LIKE ? OR transliteration LIKE ? OR ${translationCol} LIKE ?) ORDER BY greek ASC`,
    [pattern, pattern, pattern]
  );
  return rows.map(rowToVocabularyItem);
}

/** Delete a vocabulary item by ID. */
export function deleteVocabularyItem(id: number): boolean {
  const db = getDatabase();
  const result = db.runSync('DELETE FROM vocabulary_item WHERE id = ?', [id]);
  return result.changes > 0;
}
