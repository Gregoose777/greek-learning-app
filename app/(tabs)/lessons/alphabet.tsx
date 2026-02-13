import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  StyleSheet,
  FlatList,
  ViewStyle,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../../src/i18n/LanguageProvider';
import { colors, typography, spacing, borderRadius } from '../../../src/theme';
import { Button, Card, ProgressBar, Badge, SpeakerButton } from '../../../src/components';
import { speakGreek } from '../../../src/utils';
import { GREEK_ALPHABET, generateQuizOptions } from '../../../src/content';
import type { GreekLetter } from '../../../src/content';

type TabMode = 'learn' | 'quiz';

export default function AlphabetScreen() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabMode>('learn');
  const [learnedLetters, setLearnedLetters] = useState<Set<string>>(new Set());
  const [selectedLetter, setSelectedLetter] = useState<GreekLetter | null>(null);

  const progress = learnedLetters.size / GREEK_ALPHABET.length;

  const toggleLearned = useCallback((letterId: string) => {
    setLearnedLetters((prev) => {
      const next = new Set(prev);
      if (next.has(letterId)) {
        next.delete(letterId);
      } else {
        next.add(letterId);
      }
      return next;
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Progress header */}
      <View style={styles.progressHeader}>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>
          {t('alphabet.lettersLearned', {
            learned: learnedLetters.size,
            total: GREEK_ALPHABET.length,
          })}
        </Text>
        <ProgressBar progress={progress} color={colors.success} height={6} />
      </View>

      {/* Tab switcher */}
      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tab, activeTab === 'learn' && styles.tabActive]}
          onPress={() => setActiveTab('learn')}
        >
          <Ionicons
            name="book-outline"
            size={18}
            color={activeTab === 'learn' ? colors.primary : colors.textSecondary}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'learn' && styles.tabTextActive,
            ]}
          >
            {t('alphabet.learnTab')}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === 'quiz' && styles.tabActive]}
          onPress={() => setActiveTab('quiz')}
        >
          <Ionicons
            name="help-circle-outline"
            size={18}
            color={activeTab === 'quiz' ? colors.primary : colors.textSecondary}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'quiz' && styles.tabTextActive,
            ]}
          >
            {t('alphabet.quizTab')}
          </Text>
        </Pressable>
      </View>

      {activeTab === 'learn' ? (
        <LetterGrid
          learnedLetters={learnedLetters}
          onSelectLetter={setSelectedLetter}
          language={language}
        />
      ) : (
        <QuizMode
          learnedLetters={learnedLetters}
          onMarkLearned={(id) =>
            setLearnedLetters((prev) => new Set(prev).add(id))
          }
        />
      )}

      {/* Letter detail modal */}
      {selectedLetter && (
        <LetterDetailModal
          letter={selectedLetter}
          isLearned={learnedLetters.has(selectedLetter.id)}
          onToggleLearned={() => toggleLearned(selectedLetter.id)}
          onClose={() => setSelectedLetter(null)}
          language={language}
        />
      )}
    </View>
  );
}

/* ─── Letter Grid ─── */

function LetterGrid({
  learnedLetters,
  onSelectLetter,
  language,
}: {
  learnedLetters: Set<string>;
  onSelectLetter: (letter: GreekLetter) => void;
  language: string;
}) {
  const renderItem = useCallback(
    ({ item }: { item: GreekLetter }) => (
      <Pressable
        style={({ pressed }) => [
          styles.letterCard,
          learnedLetters.has(item.id) && styles.letterCardLearned,
          pressed && styles.letterCardPressed,
        ]}
        onPress={() => onSelectLetter(item)}
      >
        <Text style={styles.letterUppercase}>{item.uppercase}</Text>
        <Text style={styles.letterLowercase}>{item.lowercase}</Text>
        <Text style={styles.letterName}>{item.name}</Text>
        {learnedLetters.has(item.id) && (
          <View style={styles.learnedBadge}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
          </View>
        )}
      </Pressable>
    ),
    [learnedLetters, onSelectLetter]
  );

  return (
    <FlatList
      data={GREEK_ALPHABET}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      numColumns={4}
      columnWrapperStyle={styles.gridRow}
      contentContainerStyle={styles.gridContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

/* ─── Letter Detail Modal ─── */

function LetterDetailModal({
  letter,
  isLearned,
  onToggleLearned,
  onClose,
  language,
}: {
  letter: GreekLetter;
  isLearned: boolean;
  onToggleLearned: () => void;
  onClose: () => void;
  language: string;
}) {
  const { t } = useTranslation();
  const lang = language as 'en' | 'es' | 'fr';

  return (
    <Modal
      visible
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Header */}
        <View style={styles.modalHeader}>
          <Text style={[typography.heading2, { color: colors.text }]}>
            {t('alphabet.letterDetail')}
          </Text>
          <Pressable onPress={onClose} hitSlop={12}>
            <Ionicons name="close" size={28} color={colors.textSecondary} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.modalContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Big letter display */}
          <View style={styles.bigLetterContainer}>
            <Text style={styles.bigLetterUpper}>{letter.uppercase}</Text>
            <Text style={styles.bigLetterLower}>{letter.lowercase}</Text>
          </View>

          {/* Greek name */}
          <Text style={[typography.heading3, { color: colors.text, textAlign: 'center' }]}>
            {letter.nameGreek} ({letter.name})
          </Text>

          {/* Audio pronunciation */}
          <Pressable style={styles.audioButton} onPress={() => speakGreek(letter.nameGreek)}>
            <Ionicons name="volume-medium" size={24} color={colors.primary} />
            <Text style={[typography.body, { color: colors.primary, marginLeft: spacing.sm }]}>
              {t('alphabet.tapToHear')}
            </Text>
          </Pressable>

          {/* Detail rows */}
          <Card variant="outlined" style={styles.detailCard}>
            <DetailRow label={t('alphabet.pronunciation')} value={letter.pronunciation} />
            <View style={styles.divider} />
            <DetailRow label={t('alphabet.transliteration')} value={letter.transliteration} />
            <View style={styles.divider} />
            <DetailRow
              label={t('alphabet.example')}
              value={`${letter.exampleWord.greek} (${letter.exampleWord.transliteration})`}
              subtitle={letter.exampleWord.translation[lang]}
            />
          </Card>

          {/* Mark as learned button */}
          <Button
            title={isLearned ? t('alphabet.markedLearned') : t('alphabet.markAsLearned')}
            onPress={onToggleLearned}
            variant={isLearned ? 'secondary' : 'primary'}
            style={{ marginTop: spacing.lg }}
          />
        </ScrollView>
      </View>
    </Modal>
  );
}

function DetailRow({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.detailRow}>
      <Text style={[typography.captionBold, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <Text style={[typography.body, { color: colors.text }]}>{value}</Text>
      {subtitle && (
        <Text style={[typography.caption, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

/* ─── Quiz Mode ─── */

function QuizMode({
  learnedLetters,
  onMarkLearned,
}: {
  learnedLetters: Set<string>;
  onMarkLearned: (id: string) => void;
}) {
  const { t } = useTranslation();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Shuffle letters for quiz
  const quizLetters = useMemo(
    () => [...GREEK_ALPHABET].sort(() => Math.random() - 0.5),
    [quizStarted] // re-shuffle when quiz restarts
  );

  const currentLetter = quizLetters[currentIndex];
  const options = useMemo(
    () => (currentLetter ? generateQuizOptions(currentLetter) : []),
    [currentLetter]
  );

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setQuizFinished(false);
  };

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer !== null) return; // already answered
    setSelectedAnswer(index);
    if (options[index].isCorrect) {
      setCorrectCount((c) => c + 1);
      onMarkLearned(currentLetter.id);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= GREEK_ALPHABET.length) {
      setQuizFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
    }
  };

  if (!quizStarted || quizFinished) {
    return (
      <View style={styles.quizCenterContainer}>
        {quizFinished ? (
          <>
            <Ionicons name="trophy" size={64} color={colors.secondary} />
            <Text style={[typography.heading2, { color: colors.text, marginTop: spacing.md }]}>
              {t('alphabet.quizComplete')}
            </Text>
            <Text
              style={[
                typography.body,
                { color: colors.textSecondary, marginTop: spacing.sm, textAlign: 'center' },
              ]}
            >
              {t('alphabet.quizScore', {
                correct: correctCount,
                total: GREEK_ALPHABET.length,
              })}
            </Text>
            <Button
              title={t('alphabet.tryAgain')}
              onPress={handleStartQuiz}
              style={{ marginTop: spacing.lg }}
            />
          </>
        ) : (
          <>
            <Ionicons name="help-circle" size={64} color={colors.primary} />
            <Text style={[typography.heading2, { color: colors.text, marginTop: spacing.md }]}>
              {t('alphabet.quizTitle')}
            </Text>
            <Text
              style={[
                typography.body,
                { color: colors.textSecondary, marginTop: spacing.sm, textAlign: 'center' },
              ]}
            >
              {t('alphabet.quizPrompt')}
            </Text>
            <Button
              title={t('alphabet.startQuiz')}
              onPress={handleStartQuiz}
              style={{ marginTop: spacing.lg }}
            />
          </>
        )}
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.quizContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Quiz progress */}
      <ProgressBar
        progress={(currentIndex + 1) / GREEK_ALPHABET.length}
        height={4}
        style={{ marginBottom: spacing.md }}
      />
      <Text style={[typography.caption, { color: colors.textSecondary, textAlign: 'center' }]}>
        {currentIndex + 1} / {GREEK_ALPHABET.length}
      </Text>

      {/* Letter prompt */}
      <View style={styles.quizLetterContainer}>
        <Text style={styles.quizLetter}>{currentLetter.uppercase}</Text>
        <Text style={styles.quizLetterSmall}>{currentLetter.lowercase}</Text>
      </View>

      <Text
        style={[
          typography.body,
          { color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.lg },
        ]}
      >
        {t('alphabet.quizPrompt')}
      </Text>

      {/* Answer options */}
      {options.map((option, idx) => {
        const isSelected = selectedAnswer === idx;
        const showResult = selectedAnswer !== null;
        const isCorrect = option.isCorrect;

        let optionStyle: ViewStyle = styles.optionDefault;
        if (showResult && isCorrect) {
          optionStyle = styles.optionCorrect;
        } else if (showResult && isSelected && !isCorrect) {
          optionStyle = styles.optionIncorrect;
        }

        return (
          <Pressable
            key={idx}
            style={[styles.optionButton, optionStyle]}
            onPress={() => handleSelectAnswer(idx)}
            disabled={selectedAnswer !== null}
          >
            <Text
              style={[
                typography.body,
                {
                  color:
                    showResult && isCorrect
                      ? colors.success
                      : showResult && isSelected && !isCorrect
                        ? colors.error
                        : colors.text,
                },
              ]}
            >
              {option.text}
            </Text>
            {showResult && isCorrect && (
              <Ionicons name="checkmark-circle" size={22} color={colors.success} />
            )}
            {showResult && isSelected && !isCorrect && (
              <Ionicons name="close-circle" size={22} color={colors.error} />
            )}
          </Pressable>
        );
      })}

      {/* Feedback and next button */}
      {selectedAnswer !== null && (
        <View style={styles.feedbackContainer}>
          {options[selectedAnswer].isCorrect ? (
            <Badge label={t('alphabet.correct')} variant="success" />
          ) : (
            <View>
              <Badge label={t('alphabet.incorrect')} variant="error" />
              <Text
                style={[
                  typography.caption,
                  { color: colors.textSecondary, marginTop: spacing.xs },
                ]}
              >
                {t('alphabet.theCorrectAnswer')}{' '}
                {currentLetter.pronunciation}
              </Text>
            </View>
          )}
          <Button
            title={t('alphabet.next')}
            onPress={handleNext}
            size="sm"
          />
        </View>
      )}
    </ScrollView>
  );
}

/* ─── Styles ─── */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressHeader: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  // Tab bar
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    gap: spacing.xs,
  },
  tabActive: {
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    ...typography.captionBold,
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
  },
  // Grid
  gridContent: {
    padding: spacing.md,
    paddingTop: spacing.xs,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  letterCard: {
    width: '23%',
    aspectRatio: 0.85,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    position: 'relative',
  },
  letterCardLearned: {
    backgroundColor: colors.success + '10',
    borderColor: colors.success + '40',
  },
  letterCardPressed: {
    opacity: 0.7,
  },
  letterUppercase: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  letterLowercase: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 1,
  },
  letterName: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
    fontSize: 10,
  },
  learnedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalContent: {
    padding: spacing.lg,
  },
  bigLetterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: spacing.lg,
    marginVertical: spacing.lg,
  },
  bigLetterUpper: {
    fontSize: 80,
    fontWeight: '700',
    color: colors.primary,
  },
  bigLetterLower: {
    fontSize: 56,
    fontWeight: '400',
    color: colors.primaryLight,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.primary + '10',
    borderRadius: borderRadius.md,
  },
  detailCard: {
    gap: 0,
  },
  detailRow: {
    paddingVertical: spacing.sm,
    gap: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
  },
  // Quiz
  quizCenterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  quizContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  quizLetterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  quizLetter: {
    fontSize: 72,
    fontWeight: '700',
    color: colors.primary,
  },
  quizLetterSmall: {
    fontSize: 36,
    color: colors.primaryLight,
    marginTop: spacing.xs,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
  },
  optionDefault: {
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.success + '10',
  },
  optionIncorrect: {
    borderColor: colors.error,
    backgroundColor: colors.error + '10',
  },
  feedbackContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.xs,
  },
});
