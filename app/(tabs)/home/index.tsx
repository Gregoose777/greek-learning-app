import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../../src/theme';
import { Card } from '../../../src/components';
import { checkStreakOnAppOpen } from '../../../src/database';
import type { DailyStreak } from '../../../src/database';

export default function HomeScreen() {
  const { t } = useTranslation();
  const [streak, setStreak] = useState<DailyStreak | null>(null);

  useFocusEffect(
    useCallback(() => {
      const s = checkStreakOnAppOpen();
      setStreak(s);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={[typography.heading2, { color: colors.text }]}>{t('home.title')}</Text>
      <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
        {t('home.subtitle')}
      </Text>

      {streak && (
        <Card variant="elevated" style={styles.streakCard}>
          <View style={styles.streakRow}>
            <Ionicons
              name="flame"
              size={40}
              color={streak.currentStreak > 0 ? colors.secondary : colors.textDisabled}
            />
            <View style={styles.streakInfo}>
              <Text style={styles.streakNumber}>{streak.currentStreak}</Text>
              <Text style={styles.streakLabel}>
                {t('streak.dayStreak', { count: streak.currentStreak })}
              </Text>
            </View>
          </View>

          <View style={styles.streakDetails}>
            <View style={styles.streakStat}>
              <Text style={styles.streakStatValue}>{streak.longestStreak}</Text>
              <Text style={styles.streakStatLabel}>{t('streak.longest')}</Text>
            </View>
            <View style={styles.streakDivider} />
            <View style={styles.streakStat}>
              <View style={styles.freezeRow}>
                <Ionicons name="snow" size={16} color={colors.primary} />
                <Text style={styles.streakStatValue}>{streak.freezesAvailable}</Text>
              </View>
              <Text style={styles.streakStatLabel}>{t('streak.freezes')}</Text>
            </View>
          </View>

          {streak.freezesAvailable > 0 && (
            <Text style={styles.freezeHint}>{t('streak.freezeHint')}</Text>
          )}
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  streakCard: {
    marginTop: spacing.lg,
    padding: spacing.md,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  streakInfo: {
    flex: 1,
  },
  streakNumber: {
    ...typography.heading1,
    color: colors.text,
    fontSize: 36,
    lineHeight: 40,
  },
  streakLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  streakDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  streakStat: {
    flex: 1,
    alignItems: 'center',
  },
  streakStatValue: {
    ...typography.heading3,
    color: colors.text,
  },
  streakStatLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  streakDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.borderLight,
  },
  freezeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  freezeHint: {
    ...typography.caption,
    color: colors.primary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
