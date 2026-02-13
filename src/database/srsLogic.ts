/**
 * Spaced Repetition System (SM-2 algorithm) logic for HellenicaGo.
 *
 * SM-2 algorithm:
 * - EF (easiness factor) >= 1.3, default 2.5
 * - After each review, user rates: Again (0), Hard (1), Good (2), Easy (3)
 * - We map these to SM-2 quality scores: Again=0, Hard=2, Good=4, Easy=5
 * - If quality < 3: reset repetitions to 0, interval to 1
 * - If quality >= 3: interval grows (1, 6, then EF * previous)
 * - EF adjusted: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
 * - EF minimum is 1.3
 */
import {
  createReviewCard,
  getReviewCardByVocabularyId,
  getDueReviewCards,
  updateReviewCard,
} from './reviewCard';
import { getLearnedVocabularyItems } from './vocabularyItem';
import type { ReviewCard } from './types';

export type SrsRating = 'again' | 'hard' | 'good' | 'easy';

/** Map user rating to SM-2 quality score (0-5). */
function ratingToQuality(rating: SrsRating): number {
  switch (rating) {
    case 'again': return 0;
    case 'hard': return 2;
    case 'good': return 4;
    case 'easy': return 5;
  }
}

/** Calculate new easiness factor from SM-2 formula. */
function calculateEasinessFactor(oldEF: number, quality: number): number {
  const newEF = oldEF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  return Math.max(1.3, newEF);
}

/** Calculate next interval in days based on SM-2 algorithm. */
function calculateNextInterval(
  repetitions: number,
  interval: number,
  easinessFactor: number,
  quality: number,
): { newInterval: number; newRepetitions: number } {
  if (quality < 3) {
    // Failed review: reset
    return { newInterval: 1, newRepetitions: 0 };
  }

  // Successful review
  let newInterval: number;
  if (repetitions === 0) {
    newInterval = 1;
  } else if (repetitions === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(interval * easinessFactor);
  }

  return { newInterval, newRepetitions: repetitions + 1 };
}

/** Process a review rating for a card. Returns the updated card. */
export function processReview(card: ReviewCard, rating: SrsRating): ReviewCard {
  const quality = ratingToQuality(rating);
  const newEF = calculateEasinessFactor(card.easinessFactor, quality);
  const { newInterval, newRepetitions } = calculateNextInterval(
    card.repetitions,
    card.interval,
    card.easinessFactor,
    quality,
  );

  const now = Math.floor(Date.now() / 1000);
  const nextReviewDate = now + newInterval * 86400; // days to seconds

  return updateReviewCard({
    id: card.id,
    easinessFactor: newEF,
    interval: newInterval,
    repetitions: newRepetitions,
    nextReviewDate,
    lastReviewedAt: now,
  })!;
}

/** Ensure all learned vocabulary items have a review card. */
export function ensureReviewCardsExist(): void {
  const learnedItems = getLearnedVocabularyItems();
  const now = Math.floor(Date.now() / 1000);

  for (const item of learnedItems) {
    const existing = getReviewCardByVocabularyId(item.id);
    if (!existing) {
      createReviewCard({
        vocabularyId: item.id,
        easinessFactor: 2.5,
        interval: 0,
        repetitions: 0,
        nextReviewDate: now, // due immediately
        lastReviewedAt: null,
      });
    }
  }
}

/** Get count of cards due for review today. */
export function getDueReviewCount(): number {
  return getDueReviewCards().length;
}

/** Get the due review cards with their vocabulary info for a session. */
export function getDueCardsForSession(): ReviewCard[] {
  return getDueReviewCards();
}
