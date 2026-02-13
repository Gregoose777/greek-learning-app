import { useState, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../../src/theme';
import { Card, ProgressBar, Button } from '../../../src/components';
import {
  getDueCardsForSession,
  getVocabularyItemById,
  processReview,
} from '../../../src/database';
import type { ReviewCard, VocabularyItem, SrsRating } from '../../../src/database';

interface CardWithVocab {
  card: ReviewCard;
  vocab: VocabularyItem;
}

function getTranslation(item: VocabularyItem, lang: string): string {
  switch (lang) {
    case 'es': return item.translationEs;
    case 'fr': return item.translationFr;
    default: return item.translationEn;
  }
}

const RATINGS: { key: SrsRating; color: string; icon: string }[] = [
  { key: 'again', color: colors.error, icon: 'close-circle' },
  { key: 'hard', color: '#e67e22', icon: 'alert-circle' },
  { key: 'good', color: colors.success, icon: 'checkmark-circle' },
  { key: 'easy', color: colors.primary, icon: 'star' },
];

export default function ReviewSessionScreen() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const router = useRouter();

  const cardsWithVocab = useMemo<CardWithVocab[]>(() => {
    const dueCards = getDueCardsForSession();
    const result: CardWithVocab[] = [];
    for (const card of dueCards) {
      const vocab = getVocabularyItemById(card.vocabularyId);
      if (vocab) {
        result.push({ card, vocab });
      }
    }
    return result;
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<SrsRating[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const totalCards = cardsWithVocab.length;
  const currentCard = cardsWithVocab[currentIndex];

  const handleReveal = useCallback(() => {
    setRevealed(true);
  }, []);

  const handleRate = useCallback((rating: SrsRating) => {
    if (!currentCard) return;

    processReview(currentCard.card, rating);
    const newResults = [...results, rating];
    setResults(newResults);

    const nextIndex = currentIndex + 1;
    if (nextIndex >= totalCards) {
      setShowSummary(true);
    } else {
      setCurrentIndex(nextIndex);
      setRevealed(false);
    }
  }, [currentCard, currentIndex, totalCards, results]);

  const handleFinish = useCallback(() => {
    router.back();
  }, [router]);

  // Empty state: no cards due
  if (totalCards === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-circle" size={64} color={colors.success} />
          <Text style={styles.emptyTitle}>{t('srs.noCardsDue')}</Text>
          <Text style={styles.emptySubtitle}>{t('srs.allCaughtUp')}</Text>
          <Button
            title={t('srs.backToReview')}
            onPress={handleFinish}
            variant="primary"
            size="lg"
            style={{ marginTop: spacing.lg }}
          />
        </View>
      </View>
    );
  }

  // Summary screen
  if (showSummary) {
    const againCount = results.filter(r => r === 'again').length;
    const hardCount = results.filter(r => r === 'hard').length;
    const goodCount = results.filter(r => r === 'good').length;
    const easyCount = results.filter(r => r === 'easy').length;

    return (
      <View style={styles.container}>
        <View style={styles.summaryContainer}>
          <Ionicons name="trophy" size={48} color={colors.secondary} />
          <Text style={styles.summaryTitle}>{t('srs.sessionComplete')}</Text>
          <Text style={styles.summarySubtitle}>
            {t('srs.cardsReviewed', { count: totalCards })}
          </Text>

          <Card variant="outlined" style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={[styles.summaryDot, { backgroundColor: colors.error }]} />
              <Text style={styles.summaryLabel}>{t('srs.again')}</Text>
              <Text style={styles.summaryValue}>{againCount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <View style={[styles.summaryDot, { backgroundColor: '#e67e22' }]} />
              <Text style={styles.summaryLabel}>{t('srs.hard')}</Text>
              <Text style={styles.summaryValue}>{hardCount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <View style={[styles.summaryDot, { backgroundColor: colors.success }]} />
              <Text style={styles.summaryLabel}>{t('srs.good')}</Text>
              <Text style={styles.summaryValue}>{goodCount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <View style={[styles.summaryDot, { backgroundColor: colors.primary }]} />
              <Text style={styles.summaryLabel}>{t('srs.easy')}</Text>
              <Text style={styles.summaryValue}>{easyCount}</Text>
            </View>
          </Card>

          <Button
            title={t('srs.finish')}
            onPress={handleFinish}
            variant="primary"
            size="lg"
            style={{ marginTop: spacing.lg }}
          />
        </View>
      </View>
    );
  }

  // Review card
  const progress = totalCards > 0 ? currentIndex / totalCards : 0;

  return (
    <View style={styles.container}>
      {/* Progress header */}
      <View style={styles.header}>
        <ProgressBar progress={progress} height={6} />
        <Text style={styles.counter}>
          {t('srs.cardOf', { current: currentIndex + 1, total: totalCards })}
        </Text>
      </View>

      {/* Card display */}
      <View style={styles.cardArea}>
        <Card variant="elevated" style={styles.reviewCard}>
          {/* Greek word (always shown) */}
          <Text style={styles.greekWord}>{currentCard.vocab.greek}</Text>
          <Text style={styles.transliteration}>{currentCard.vocab.transliteration}</Text>

          {/* Answer area */}
          {!revealed ? (
            <Pressable style={styles.revealButton} onPress={handleReveal}>
              <Ionicons name="eye" size={24} color={colors.primary} />
              <Text style={styles.revealText}>{t('srs.tapToReveal')}</Text>
            </Pressable>
          ) : (
            <View style={styles.answerArea}>
              <View style={styles.divider} />
              <Text style={styles.translationLabel}>{t('srs.translation')}</Text>
              <Text style={styles.translationText}>
                {getTranslation(currentCard.vocab, lang)}
              </Text>
              {currentCard.vocab.exampleSentence && (
                <Text style={styles.exampleText}>{currentCard.vocab.exampleSentence}</Text>
              )}
            </View>
          )}
        </Card>

        {/* Rating buttons (only shown when revealed) */}
        {revealed && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratePrompt}>{t('srs.howWellDidYouKnow')}</Text>
            <View style={styles.ratingRow}>
              {RATINGS.map(({ key, color, icon }) => (
                <Pressable
                  key={key}
                  style={[styles.ratingButton, { borderColor: color }]}
                  onPress={() => handleRate(key)}
                >
                  <Ionicons name={icon as any} size={24} color={color} />
                  <Text style={[styles.ratingLabel, { color }]}>{t(`srs.${key}`)}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  // Header
  header: {
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  counter: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  // Card area
  cardArea: {
    flex: 1,
    justifyContent: 'center',
  },
  reviewCard: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  greekWord: {
    ...typography.heading1,
    color: colors.text,
    fontSize: 36,
    textAlign: 'center',
  },
  transliteration: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  // Reveal button
  revealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  revealText: {
    ...typography.body,
    color: colors.primary,
  },
  // Answer area
  answerArea: {
    width: '100%',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: colors.borderLight,
    marginBottom: spacing.md,
  },
  translationLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  translationText: {
    ...typography.heading2,
    color: colors.primary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  exampleText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: spacing.sm,
  },
  // Rating buttons
  ratingContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  ratePrompt: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  ratingButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    gap: 4,
  },
  ratingLabel: {
    ...typography.caption,
    fontWeight: '600',
  },
  // Empty state
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  emptyTitle: {
    ...typography.heading3,
    color: colors.text,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
  },
  // Summary
  summaryContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTitle: {
    ...typography.heading2,
    color: colors.text,
    marginTop: spacing.md,
  },
  summarySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  summaryCard: {
    marginTop: spacing.lg,
    padding: spacing.md,
    width: '100%',
    gap: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  summaryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  summaryLabel: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  summaryValue: {
    ...typography.heading3,
    color: colors.text,
  },
});
