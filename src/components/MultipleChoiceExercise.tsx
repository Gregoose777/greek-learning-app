import { useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../theme';
import { SpeakerButton } from './SpeakerButton';
import { triggerSuccessHaptic, triggerErrorHaptic, createPulseAnimation, createShakeAnimation } from '../utils';
import type { MultipleChoiceExercise as MCExercise, LocalizedString } from '../content/types';

interface MultipleChoiceExerciseProps {
  exercise: MCExercise;
  lang: string;
  onAnswer: (correct: boolean) => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
}

export function MultipleChoiceExercise({
  exercise,
  lang,
  onAnswer,
  t,
}: MultipleChoiceExerciseProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const isCorrect = selectedIndex === exercise.correctIndex;

  const feedbackScale = useRef(new Animated.Value(1)).current;
  const feedbackTranslateX = useRef(new Animated.Value(0)).current;

  const prompt = (exercise.prompt as LocalizedString)[lang as keyof LocalizedString] ?? exercise.prompt.en;

  const handleCheck = () => {
    if (selectedIndex === null) return;
    setAnswered(true);
    const correct = selectedIndex === exercise.correctIndex;
    if (correct) {
      triggerSuccessHaptic();
      createPulseAnimation(feedbackScale).start();
    } else {
      triggerErrorHaptic();
      createShakeAnimation(feedbackTranslateX).start();
    }
  };

  const handleContinue = () => {
    onAnswer(isCorrect);
  };

  const getOptionStyle = (index: number) => {
    if (!answered) {
      return index === selectedIndex ? styles.optionSelected : styles.option;
    }
    if (index === exercise.correctIndex) return styles.optionCorrect;
    if (index === selectedIndex && !isCorrect) return styles.optionIncorrect;
    return styles.option;
  };

  const getOptionTextStyle = (index: number) => {
    if (!answered) {
      return index === selectedIndex ? styles.optionTextSelected : styles.optionText;
    }
    if (index === exercise.correctIndex) return styles.optionTextCorrect;
    if (index === selectedIndex && !isCorrect) return styles.optionTextIncorrect;
    return styles.optionText;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>
      {exercise.greekPrompt && (
        <View style={styles.greekPromptRow}>
          <Text style={styles.greekPrompt}>{exercise.greekPrompt}</Text>
          <SpeakerButton text={exercise.greekPrompt} size={22} />
        </View>
      )}

      <View style={styles.options}>
        {exercise.options.map((option, index) => {
          const optionText = (option as LocalizedString)[lang as keyof LocalizedString] ?? option.en;
          return (
            <Pressable
              key={index}
              style={getOptionStyle(index)}
              onPress={() => {
                if (!answered) setSelectedIndex(index);
              }}
              disabled={answered}
            >
              <Text style={getOptionTextStyle(index)}>{optionText}</Text>
              {answered && index === exercise.correctIndex && (
                <Ionicons name="checkmark-circle" size={22} color={colors.success} />
              )}
              {answered && index === selectedIndex && !isCorrect && index !== exercise.correctIndex && (
                <Ionicons name="close-circle" size={22} color={colors.error} />
              )}
            </Pressable>
          );
        })}
      </View>

      {answered && (
        <Animated.View
          style={[
            styles.feedback,
            isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect,
            {
              transform: [
                { scale: feedbackScale },
                { translateX: feedbackTranslateX },
              ],
            },
          ]}
        >
          <Ionicons
            name={isCorrect ? 'checkmark-circle' : 'close-circle'}
            size={24}
            color={isCorrect ? colors.success : colors.error}
          />
          <Text style={[styles.feedbackText, { color: isCorrect ? colors.success : colors.error }]}>
            {isCorrect ? t('exercise.correct') : t('exercise.incorrect')}
          </Text>
          {!isCorrect && (
            <Text style={styles.correctAnswer}>
              {t('exercise.correctAnswerWas', {
                answer: (exercise.options[exercise.correctIndex] as LocalizedString)[lang as keyof LocalizedString] ?? exercise.options[exercise.correctIndex].en,
              })}
            </Text>
          )}
        </Animated.View>
      )}

      <View style={styles.buttonContainer}>
        {!answered ? (
          <Pressable
            style={[styles.button, selectedIndex === null && styles.buttonDisabled]}
            onPress={handleCheck}
            disabled={selectedIndex === null}
          >
            <Text style={[styles.buttonText, selectedIndex === null && styles.buttonTextDisabled]}>
              {t('exercise.checkAnswer')}
            </Text>
          </Pressable>
        ) : (
          <Pressable style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>{t('exercise.continue')}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  prompt: {
    ...typography.heading3,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  greekPromptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  greekPrompt: {
    ...typography.heading2,
    color: colors.primary,
  },
  options: {
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  optionSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  optionCorrect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.success,
    backgroundColor: '#e6f4ea',
  },
  optionIncorrect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.error,
    backgroundColor: '#fce8e6',
  },
  optionText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  optionTextSelected: {
    ...typography.bodyBold,
    color: colors.primary,
    flex: 1,
  },
  optionTextCorrect: {
    ...typography.bodyBold,
    color: colors.success,
    flex: 1,
  },
  optionTextIncorrect: {
    ...typography.bodyBold,
    color: colors.error,
    flex: 1,
  },
  feedback: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  feedbackCorrect: {
    backgroundColor: '#e6f4ea',
  },
  feedbackIncorrect: {
    backgroundColor: '#fce8e6',
  },
  feedbackText: {
    ...typography.bodyBold,
  },
  correctAnswer: {
    ...typography.body,
    color: colors.textSecondary,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.surfaceAlt,
  },
  buttonText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
  buttonTextDisabled: {
    color: colors.textDisabled,
  },
});
