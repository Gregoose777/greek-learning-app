import { useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { colors, typography, spacing, borderRadius } from '../../../src/theme';
import { ProgressBar, MultipleChoiceExercise, TranslationExercise, FillBlankExercise, MatchPairsExercise, LessonSummary } from '../../../src/components';
import { getLessonById } from '../../../src/content';
import type { Exercise, LocalizedString } from '../../../src/content/types';
import {
  getLessonProgressByLessonId,
  createLessonProgress,
  updateLessonProgress,
  getUserProfile,
  updateUserProfile,
  recordLessonForStreak,
  markVocabularyLearnedByLesson,
  ensureReviewCardsExist,
} from '../../../src/database';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const router = useRouter();

  const lesson = id ? getLessonById(id) : null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [exerciseKey, setExerciseKey] = useState(0);
  const [savedXp, setSavedXp] = useState(0);
  const [savedTimeSpent, setSavedTimeSpent] = useState(0);
  const startTimeRef = useRef(Date.now());

  const exercises = lesson?.exercises ?? [];
  const totalExercises = exercises.length;
  const currentExercise: Exercise | undefined = exercises[currentIndex];

  const saveLessonCompletion = useCallback((finalCorrect: number, lessonId: string) => {
    const accuracy = totalExercises > 0 ? finalCorrect / totalExercises : 0;
    const xpEarned = 10 + Math.round(accuracy * 5);
    const timeSpentSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
    const score = Math.round(accuracy * 100);
    const now = Math.floor(Date.now() / 1000);

    // Create or update LessonProgress
    const existing = getLessonProgressByLessonId(lessonId);
    if (existing) {
      updateLessonProgress({
        id: existing.id,
        completed: true,
        score,
        xpEarned: Math.max(existing.xpEarned, xpEarned),
        timeSpentSeconds: existing.timeSpentSeconds + timeSpentSeconds,
        completedAt: now,
        attempts: existing.attempts + 1,
      });
    } else {
      createLessonProgress({
        lessonId,
        completed: true,
        score,
        xpEarned,
        timeSpentSeconds,
        completedAt: now,
        attempts: 1,
      });
    }

    // Update total XP on user profile
    const profile = getUserProfile();
    if (profile) {
      // Only add XP if this is a new completion or better score
      const xpToAdd = existing ? Math.max(0, xpEarned - existing.xpEarned) : xpEarned;
      if (xpToAdd > 0) {
        const newTotalXp = profile.totalXp + xpToAdd;
        updateUserProfile({
          id: profile.id,
          totalXp: newTotalXp,
          currentLevel: Math.floor(newTotalXp / 100) + 1,
        });
      }
    }

    // Mark vocabulary from this lesson as learned + create review cards
    markVocabularyLearnedByLesson(lessonId);
    ensureReviewCardsExist();

    // Record streak activity
    recordLessonForStreak();

    setSavedXp(xpEarned);
    setSavedTimeSpent(timeSpentSeconds);
  }, [totalExercises]);

  const handleAnswer = useCallback((correct: boolean) => {
    const newCorrect = correct ? correctCount + 1 : correctCount;
    if (correct) {
      setCorrectCount(newCorrect);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex >= totalExercises) {
      setTimeout(() => {
        setCorrectCount(newCorrect);
        if (id) saveLessonCompletion(newCorrect, id);
        setShowSummary(true);
      }, 300);
    } else {
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setExerciseKey((k) => k + 1);
      }, 300);
    }
  }, [currentIndex, correctCount, totalExercises, id, saveLessonCompletion]);

  const handleContinue = useCallback(() => {
    router.back();
  }, [router]);

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setShowSummary(false);
    setExerciseKey((k) => k + 1);
    startTimeRef.current = Date.now();
  }, []);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={[typography.heading3, { color: colors.error }]}>
          {t('common.error')}
        </Text>
      </View>
    );
  }

  if (showSummary) {
    return (
      <View style={styles.container}>
        <LessonSummary
          correctCount={correctCount}
          totalCount={totalExercises}
          xpEarned={savedXp}
          timeSpentSeconds={savedTimeSpent}
          onContinue={handleContinue}
          onRetry={handleRetry}
          t={t}
        />
      </View>
    );
  }

  const progress = totalExercises > 0 ? currentIndex / totalExercises : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ProgressBar progress={progress} height={6} />
        <Text style={styles.counter}>
          {t('exercise.questionOf', { current: currentIndex + 1, total: totalExercises })}
        </Text>
      </View>

      <View style={styles.exerciseArea}>
        {currentExercise && renderExercise(currentExercise, exerciseKey, lang, handleAnswer, t)}
      </View>
    </View>
  );
}

function renderExercise(
  exercise: Exercise,
  key: number,
  lang: string,
  onAnswer: (correct: boolean) => void,
  t: (key: string, opts?: Record<string, unknown>) => string,
) {
  switch (exercise.type) {
    case 'multiple_choice':
      return (
        <MultipleChoiceExercise
          key={key}
          exercise={exercise}
          lang={lang}
          onAnswer={onAnswer}
          t={t}
        />
      );
    case 'listening':
      return (
        <MultipleChoiceExercise
          key={key}
          exercise={{
            id: exercise.id,
            type: 'multiple_choice',
            prompt: exercise.prompt,
            options: exercise.options,
            correctIndex: exercise.correctIndex,
          }}
          lang={lang}
          onAnswer={onAnswer}
          t={t}
        />
      );
    case 'translation':
      return (
        <TranslationExercise
          key={key}
          exercise={exercise}
          lang={lang}
          onAnswer={onAnswer}
          t={t}
        />
      );
    case 'fill_blank':
      return (
        <FillBlankExercise
          key={key}
          exercise={exercise}
          lang={lang}
          onAnswer={onAnswer}
          t={t}
        />
      );
    case 'match_pairs':
      return (
        <MatchPairsExercise
          key={key}
          exercise={exercise}
          lang={lang}
          onAnswer={onAnswer}
          t={t}
        />
      );
    default:
      return (
        <SkipExercise
          key={key}
          exercise={exercise}
          lang={lang}
          onAnswer={onAnswer}
          t={t}
        />
      );
  }
}

function SkipExercise({
  exercise,
  lang,
  onAnswer,
  t,
}: {
  exercise: Exercise;
  lang: string;
  onAnswer: (correct: boolean) => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
}) {
  const prompt = 'prompt' in exercise
    ? ((exercise as unknown as { prompt: LocalizedString }).prompt[lang as keyof LocalizedString] ??
       (exercise as unknown as { prompt: LocalizedString }).prompt.en)
    : exercise.type;

  return (
    <View style={styles.skipContainer}>
      <Text style={styles.skipPrompt}>{prompt}</Text>
      <Text style={styles.skipNote}>
        ({exercise.type} - coming in a future update)
      </Text>
      <Pressable style={styles.skipButton} onPress={() => onAnswer(true)}>
        <Text style={styles.skipButtonText}>{t('exercise.continue')}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  header: {
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  counter: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  exerciseArea: {
    flex: 1,
  },
  skipContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  skipPrompt: {
    ...typography.heading3,
    color: colors.text,
    textAlign: 'center',
  },
  skipNote: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  skipButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
  },
  skipButtonText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
});
