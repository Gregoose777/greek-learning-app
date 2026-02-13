import { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable, Animated, type ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../theme';
import type { MatchPairsExercise as MatchPairsEx, LocalizedString } from '../content/types';

interface MatchPairsExerciseProps {
  exercise: MatchPairsEx;
  lang: string;
  onAnswer: (correct: boolean) => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
}

type SelectionSide = 'greek' | 'translation';

interface Selection {
  side: SelectionSide;
  index: number;
}

/**
 * Shuffle an array using Fisher-Yates, returning a new array.
 */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function MatchPairsExercise({
  exercise,
  lang,
  onAnswer,
  t,
}: MatchPairsExerciseProps) {
  const pairs = exercise.pairs;

  // Shuffled indices for each column (stable across re-renders)
  const greekOrder = useMemo(() => shuffle(pairs.map((_, i) => i)), [pairs]);
  const translationOrder = useMemo(() => shuffle(pairs.map((_, i) => i)), [pairs]);

  const [selection, setSelection] = useState<Selection | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set());
  const [incorrectFlash, setIncorrectFlash] = useState<{ greek: number; translation: number } | null>(null);
  const [completed, setCompleted] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  // Shake animation for incorrect matches
  const [shakeAnim] = useState(() => new Animated.Value(0));

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  // Check completion
  useEffect(() => {
    if (matchedPairs.size === pairs.length && pairs.length > 0 && !completed) {
      setCompleted(true);
    }
  }, [matchedPairs, pairs.length, completed]);

  const handleSelect = (side: SelectionSide, index: number) => {
    // Index here is the original pair index
    if (matchedPairs.has(index)) return;
    if (incorrectFlash) return;

    if (!selection) {
      // First selection
      setSelection({ side, index });
      return;
    }

    if (selection.side === side) {
      // Same column - switch selection
      if (selection.index === index) {
        setSelection(null); // Deselect
      } else {
        setSelection({ side, index });
      }
      return;
    }

    // Different columns - check for match
    const greekIndex = side === 'greek' ? index : selection.index;
    const translationIndex = side === 'translation' ? index : selection.index;

    if (greekIndex === translationIndex) {
      // Correct match!
      setMatchedPairs((prev) => new Set([...prev, greekIndex]));
      setSelection(null);
    } else {
      // Incorrect match - flash red and reset
      setMistakes((m) => m + 1);
      setIncorrectFlash({ greek: greekIndex, translation: translationIndex });
      triggerShake();
      setTimeout(() => {
        setIncorrectFlash(null);
        setSelection(null);
      }, 600);
    }
  };

  const getItemStyle = (side: SelectionSide, pairIndex: number): ViewStyle => {
    if (matchedPairs.has(pairIndex)) {
      return styles.itemMatched;
    }
    if (incorrectFlash) {
      const isFlashing =
        (side === 'greek' && incorrectFlash.greek === pairIndex) ||
        (side === 'translation' && incorrectFlash.translation === pairIndex);
      if (isFlashing) return styles.itemIncorrect;
    }
    if (selection && selection.side === side && selection.index === pairIndex) {
      return styles.itemSelected;
    }
    return styles.item;
  };

  const getItemTextStyle = (side: SelectionSide, pairIndex: number) => {
    if (matchedPairs.has(pairIndex)) return styles.itemTextMatched;
    if (incorrectFlash) {
      const isFlashing =
        (side === 'greek' && incorrectFlash.greek === pairIndex) ||
        (side === 'translation' && incorrectFlash.translation === pairIndex);
      if (isFlashing) return styles.itemTextIncorrect;
    }
    if (selection && selection.side === side && selection.index === pairIndex) {
      return styles.itemTextSelected;
    }
    return styles.itemText;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{t('exercise.matchPairs')}</Text>

      <Animated.View
        style={[
          styles.columnsContainer,
          incorrectFlash ? { transform: [{ translateX: shakeAnim }] } : undefined,
        ]}
      >
        {/* Greek column */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>{t('exercise.greek')}</Text>
          {greekOrder.map((pairIndex) => (
            <Pressable
              key={`greek-${pairIndex}`}
              style={getItemStyle('greek', pairIndex)}
              onPress={() => handleSelect('greek', pairIndex)}
              disabled={matchedPairs.has(pairIndex) || !!incorrectFlash}
            >
              <Text style={getItemTextStyle('greek', pairIndex)}>
                {pairs[pairIndex].greek}
              </Text>
              {matchedPairs.has(pairIndex) && (
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
              )}
            </Pressable>
          ))}
        </View>

        {/* Translation column */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>{t('exercise.translation')}</Text>
          {translationOrder.map((pairIndex) => {
            const translationText =
              (pairs[pairIndex].translation as LocalizedString)[lang as keyof LocalizedString] ??
              pairs[pairIndex].translation.en;
            return (
              <Pressable
                key={`trans-${pairIndex}`}
                style={getItemStyle('translation', pairIndex)}
                onPress={() => handleSelect('translation', pairIndex)}
                disabled={matchedPairs.has(pairIndex) || !!incorrectFlash}
              >
                <Text style={getItemTextStyle('translation', pairIndex)}>
                  {translationText}
                </Text>
                {matchedPairs.has(pairIndex) && (
                  <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                )}
              </Pressable>
            );
          })}
        </View>
      </Animated.View>

      {completed && (
        <View style={styles.feedback}>
          <Ionicons name="checkmark-circle" size={24} color={colors.success} />
          <Text style={styles.feedbackText}>
            {mistakes === 0 ? t('exercise.perfectMatch') : t('exercise.allMatched')}
          </Text>
        </View>
      )}

      {completed && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => onAnswer(mistakes === 0)}>
            <Text style={styles.buttonText}>{t('exercise.continue')}</Text>
          </Pressable>
        </View>
      )}
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
    marginBottom: spacing.md,
  },
  columnsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  column: {
    flex: 1,
    gap: spacing.sm,
  },
  columnHeader: {
    ...typography.captionBold,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.sm + 2,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
    minHeight: 48,
  },
  itemSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.sm + 2,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: '#e8f0fe',
    minHeight: 48,
  },
  itemMatched: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.sm + 2,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.success,
    backgroundColor: '#e6f4ea',
    minHeight: 48,
    opacity: 0.7,
  },
  itemIncorrect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.sm + 2,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.error,
    backgroundColor: '#fce8e6',
    minHeight: 48,
  },
  itemText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  itemTextSelected: {
    ...typography.bodyBold,
    color: colors.primary,
    flex: 1,
  },
  itemTextMatched: {
    ...typography.bodyBold,
    color: colors.success,
    flex: 1,
  },
  itemTextIncorrect: {
    ...typography.bodyBold,
    color: colors.error,
    flex: 1,
  },
  feedback: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
    gap: spacing.sm,
    backgroundColor: '#e6f4ea',
  },
  feedbackText: {
    ...typography.bodyBold,
    color: colors.success,
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
  buttonText: {
    ...typography.button,
    color: colors.textOnPrimary,
  },
});
