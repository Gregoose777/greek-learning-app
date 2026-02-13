import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../theme';
import { Button } from './Button';
import { Card } from './Card';
import { createCountUpAnimation, triggerSuccessHaptic } from '../utils';

interface LessonSummaryProps {
  correctCount: number;
  totalCount: number;
  xpEarned: number;
  timeSpentSeconds: number;
  onContinue: () => void;
  onRetry: () => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

export function LessonSummary({
  correctCount,
  totalCount,
  xpEarned,
  timeSpentSeconds,
  onContinue,
  onRetry,
  t,
}: LessonSummaryProps) {
  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  // XP count-up animation
  const xpAnim = useRef(new Animated.Value(0)).current;
  const [displayXp, setDisplayXp] = useState(0);

  useEffect(() => {
    triggerSuccessHaptic();
    const listener = xpAnim.addListener(({ value }) => {
      setDisplayXp(Math.round(value));
    });
    createCountUpAnimation(xpAnim, xpEarned, 800).start();
    return () => xpAnim.removeListener(listener);
  }, [xpEarned]);

  // Trophy scale entrance animation
  const trophyScale = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(trophyScale, {
      toValue: 1,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: trophyScale }] }}>
        <Ionicons name="trophy" size={64} color={colors.secondary} style={styles.icon} />
      </Animated.View>
      <Text style={styles.title}>{t('lessonSummary.title')}</Text>

      <Card variant="elevated" style={styles.card}>
        <View style={styles.statRow}>
          <View style={styles.stat}>
            <Ionicons name="star" size={28} color={colors.secondary} />
            <Text style={styles.statValue}>{displayXp}</Text>
            <Text style={styles.statLabel}>{t('lessonSummary.xpEarned')}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Ionicons name="checkmark-done-circle" size={28} color={colors.success} />
            <Text style={styles.statValue}>{accuracy}%</Text>
            <Text style={styles.statLabel}>{t('lessonSummary.score')}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Ionicons name="time" size={28} color={colors.primary} />
            <Text style={styles.statValue}>{formatTime(timeSpentSeconds)}</Text>
            <Text style={styles.statLabel}>{t('lessonSummary.timeSpent')}</Text>
          </View>
        </View>
        <Text style={styles.detail}>
          {t('lessonSummary.questionsCorrect', { correct: correctCount, total: totalCount })}
        </Text>
      </Card>

      <View style={styles.buttons}>
        <Button
          title={t('lessonSummary.continueLearning')}
          onPress={onContinue}
          variant="primary"
          size="lg"
          style={styles.continueButton}
        />
        {accuracy < 100 && (
          <Button
            title={t('lessonSummary.retryLesson')}
            onPress={onRetry}
            variant="outline"
            size="md"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  icon: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.heading1,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    marginBottom: spacing.xl,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },
  statValue: {
    ...typography.heading2,
    color: colors.text,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: colors.border,
  },
  detail: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  buttons: {
    width: '100%',
    gap: spacing.sm,
  },
  continueButton: {
    width: '100%',
  },
});
