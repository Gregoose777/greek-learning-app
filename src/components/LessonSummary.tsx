import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../theme';
import { Button } from './Button';
import { Card } from './Card';

interface LessonSummaryProps {
  correctCount: number;
  totalCount: number;
  xpEarned: number;
  onContinue: () => void;
  onRetry: () => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
}

export function LessonSummary({
  correctCount,
  totalCount,
  xpEarned,
  onContinue,
  onRetry,
  t,
}: LessonSummaryProps) {
  const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;

  return (
    <View style={styles.container}>
      <Ionicons name="trophy" size={64} color={colors.secondary} style={styles.icon} />
      <Text style={styles.title}>{t('lessonSummary.title')}</Text>

      <Card variant="elevated" style={styles.card}>
        <View style={styles.statRow}>
          <View style={styles.stat}>
            <Ionicons name="star" size={28} color={colors.secondary} />
            <Text style={styles.statValue}>{xpEarned}</Text>
            <Text style={styles.statLabel}>{t('lessonSummary.xpEarned')}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Ionicons name="checkmark-done-circle" size={28} color={colors.success} />
            <Text style={styles.statValue}>{accuracy}%</Text>
            <Text style={styles.statLabel}>{t('lessonSummary.score')}</Text>
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
    ...typography.heading1,
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
