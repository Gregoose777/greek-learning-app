import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../theme';
import { SpeakerButton } from './SpeakerButton';
import { triggerSuccessHaptic, triggerErrorHaptic, createPulseAnimation, createShakeAnimation } from '../utils';
import type { TranslationExercise as TranslationEx, LocalizedString } from '../content/types';

interface TranslationExerciseProps {
  exercise: TranslationEx;
  lang: string;
  onAnswer: (correct: boolean) => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
}

/**
 * Normalize text for fuzzy matching:
 * - lowercase
 * - strip accents/diacritics
 * - trim whitespace
 * - collapse multiple spaces
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

function checkAnswer(userInput: string, acceptedAnswers: string[]): boolean {
  const normalizedInput = normalize(userInput);
  return acceptedAnswers.some((answer) => normalize(answer) === normalizedInput);
}

export function TranslationExercise({
  exercise,
  lang,
  onAnswer,
  t,
}: TranslationExerciseProps) {
  const [userInput, setUserInput] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const feedbackScale = useRef(new Animated.Value(1)).current;
  const feedbackTranslateX = useRef(new Animated.Value(0)).current;

  const prompt =
    (exercise.prompt as LocalizedString)[lang as keyof LocalizedString] ??
    exercise.prompt.en;

  const handleCheck = () => {
    if (userInput.trim().length === 0) return;
    const correct = checkAnswer(userInput, exercise.acceptedAnswers);
    setIsCorrect(correct);
    setAnswered(true);
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

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>
      {exercise.greekText && (
        <View style={styles.greekTextRow}>
          <Text style={styles.greekText}>{exercise.greekText}</Text>
          <SpeakerButton text={exercise.greekText} size={22} />
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            answered && isCorrect && styles.inputCorrect,
            answered && !isCorrect && styles.inputIncorrect,
          ]}
          value={userInput}
          onChangeText={setUserInput}
          placeholder={t('exercise.typeAnswer')}
          placeholderTextColor={colors.textDisabled}
          editable={!answered}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={!answered ? handleCheck : undefined}
        />
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
          <Text
            style={[
              styles.feedbackText,
              { color: isCorrect ? colors.success : colors.error },
            ]}
          >
            {isCorrect ? t('exercise.correct') : t('exercise.incorrect')}
          </Text>
          {!isCorrect && (
            <Text style={styles.correctAnswer}>
              {t('exercise.correctAnswerWas', {
                answer: exercise.acceptedAnswers[0],
              })}
            </Text>
          )}
        </Animated.View>
      )}

      <View style={styles.buttonContainer}>
        {!answered ? (
          <Pressable
            style={[
              styles.button,
              userInput.trim().length === 0 && styles.buttonDisabled,
            ]}
            onPress={handleCheck}
            disabled={userInput.trim().length === 0}
          >
            <Text
              style={[
                styles.buttonText,
                userInput.trim().length === 0 && styles.buttonTextDisabled,
              ]}
            >
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
  greekTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  greekText: {
    ...typography.heading2,
    color: colors.primary,
  },
  inputContainer: {
    marginTop: spacing.md,
  },
  input: {
    ...typography.body,
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  inputCorrect: {
    borderColor: colors.success,
    backgroundColor: '#e6f4ea',
  },
  inputIncorrect: {
    borderColor: colors.error,
    backgroundColor: '#fce8e6',
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
