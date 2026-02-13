import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Animated, type ViewStyle, type TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../theme';
import { SpeakerButton } from './SpeakerButton';
import { triggerSuccessHaptic, triggerErrorHaptic, createPulseAnimation, createShakeAnimation } from '../utils';
import type { FillBlankExercise as FillBlankEx, LocalizedString } from '../content/types';

interface FillBlankExerciseProps {
  exercise: FillBlankEx;
  lang: string;
  onAnswer: (correct: boolean) => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
}

/**
 * Normalize text for fuzzy matching:
 * - lowercase
 * - strip accents/diacritics
 * - trim whitespace
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function FillBlankExercise({
  exercise,
  lang,
  onAnswer,
  t,
}: FillBlankExerciseProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [typedInput, setTypedInput] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const feedbackScale = useRef(new Animated.Value(1)).current;
  const feedbackTranslateX = useRef(new Animated.Value(0)).current;

  const hasWordBank = exercise.wordBank && exercise.wordBank.length > 0;

  const sentence =
    (exercise.sentence as LocalizedString)[lang as keyof LocalizedString] ??
    exercise.sentence.en;

  const getCurrentAnswer = (): string => {
    if (hasWordBank) return selectedWord ?? '';
    return typedInput;
  };

  const handleCheck = () => {
    const answer = getCurrentAnswer();
    if (answer.length === 0) return;
    const correct = normalize(answer) === normalize(exercise.answer);
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

  const handleWordSelect = (word: string) => {
    if (answered) return;
    setSelectedWord(selectedWord === word ? null : word);
  };

  const canCheck = hasWordBank ? selectedWord !== null : typedInput.trim().length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{sentence}</Text>

      {exercise.greekSentence && (
        <View style={styles.greekSentenceRow}>
          <Text style={styles.greekSentence}>{exercise.greekSentence}</Text>
          <SpeakerButton text={exercise.greekSentence} size={22} />
        </View>
      )}

      {hasWordBank ? (
        <View style={styles.wordBankContainer}>
          <Text style={styles.wordBankLabel}>{t('exercise.chooseWord')}</Text>
          <View style={styles.wordBank}>
            {exercise.wordBank!.map((word, index) => {
              const isSelected = selectedWord === word;
              const isAnswer = word === exercise.answer;

              let wordStyle: ViewStyle = styles.wordOption;
              let textStyle: TextStyle = styles.wordOptionText;

              if (answered) {
                if (isAnswer) {
                  wordStyle = styles.wordOptionCorrect;
                  textStyle = styles.wordOptionTextCorrect;
                } else if (isSelected && !isCorrect) {
                  wordStyle = styles.wordOptionIncorrect;
                  textStyle = styles.wordOptionTextIncorrect;
                }
              } else if (isSelected) {
                wordStyle = styles.wordOptionSelected;
                textStyle = styles.wordOptionTextSelected;
              }

              return (
                <Pressable
                  key={index}
                  style={wordStyle}
                  onPress={() => handleWordSelect(word)}
                  disabled={answered}
                >
                  <Text style={textStyle}>{word}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              answered && isCorrect && styles.inputCorrect,
              answered && !isCorrect && styles.inputIncorrect,
            ]}
            value={typedInput}
            onChangeText={setTypedInput}
            placeholder={t('exercise.typeAnswer')}
            placeholderTextColor={colors.textDisabled}
            editable={!answered}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={!answered ? handleCheck : undefined}
          />
        </View>
      )}

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
                answer: exercise.answer,
              })}
            </Text>
          )}
        </Animated.View>
      )}

      <View style={styles.buttonContainer}>
        {!answered ? (
          <Pressable
            style={[styles.button, !canCheck && styles.buttonDisabled]}
            onPress={handleCheck}
            disabled={!canCheck}
          >
            <Text
              style={[styles.buttonText, !canCheck && styles.buttonTextDisabled]}
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
  greekSentenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  greekSentence: {
    ...typography.heading2,
    color: colors.primary,
  },
  wordBankContainer: {
    marginTop: spacing.md,
  },
  wordBankLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  wordBank: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  wordOption: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  wordOptionSelected: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  wordOptionCorrect: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.success,
    backgroundColor: '#e6f4ea',
  },
  wordOptionIncorrect: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.error,
    backgroundColor: '#fce8e6',
  },
  wordOptionText: {
    ...typography.body,
    color: colors.text,
  },
  wordOptionTextSelected: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  wordOptionTextCorrect: {
    ...typography.bodyBold,
    color: colors.success,
  },
  wordOptionTextIncorrect: {
    ...typography.bodyBold,
    color: colors.error,
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
