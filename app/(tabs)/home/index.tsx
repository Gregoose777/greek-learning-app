import { useCallback, useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useFocusEffect, Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../../../src/theme';
import { Card, ProgressBar, StreakCelebration } from '../../../src/components';
import {
  checkStreakOnAppOpen,
  getUserProfile,
  getAllLessonProgress,
  getDueReviewCards,
  getTodayCompletedLessonCount,
} from '../../../src/database';
import type { DailyStreak, UserProfile, LessonProgress } from '../../../src/database';
import { getAllLessonsFlat } from '../../../src/content';
import type { Lesson } from '../../../src/content';

const STREAK_MILESTONES = [7, 30, 100];

function getNextLesson(
  allLessons: Lesson[],
  progressMap: Map<string, LessonProgress>,
): Lesson | null {
  for (const lesson of allLessons) {
    const progress = progressMap.get(lesson.id);
    if (!progress?.completed) return lesson;
  }
  return null;
}

export default function HomeScreen() {
  const { t } = useTranslation();
  const [streak, setStreak] = useState<DailyStreak | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
  const [allComplete, setAllComplete] = useState(false);
  const [reviewDueCount, setReviewDueCount] = useState(0);
  const [todayLessons, setTodayLessons] = useState(0);
  const [celebrationStreak, setCelebrationStreak] = useState<number | null>(null);
  const prevStreakRef = useRef<number>(0);

  useFocusEffect(
    useCallback(() => {
      const s = checkStreakOnAppOpen();
      setStreak(s);

      // Check for streak milestone celebration
      const prevStreak = prevStreakRef.current;
      if (s.currentStreak > prevStreak) {
        for (const milestone of STREAK_MILESTONES) {
          if (s.currentStreak >= milestone && prevStreak < milestone) {
            setCelebrationStreak(milestone);
            break;
          }
        }
      }
      prevStreakRef.current = s.currentStreak;

      const p = getUserProfile();
      setProfile(p);

      const allProgress = getAllLessonProgress();
      const map = new Map<string, LessonProgress>();
      for (const prog of allProgress) {
        map.set(prog.lessonId, prog);
      }

      const allLessons = getAllLessonsFlat();
      const next = getNextLesson(allLessons, map);
      setNextLesson(next);
      setAllComplete(next === null && allLessons.length > 0);

      const dueCards = getDueReviewCards();
      setReviewDueCount(dueCards.length);

      const todayCount = getTodayCompletedLessonCount();
      setTodayLessons(todayCount);
    }, [])
  );

  const level = profile ? Math.floor(profile.totalXp / 100) + 1 : 1;
  const dailyGoal = profile?.dailyGoal ?? 1;
  const goalProgress = Math.min(todayLessons / dailyGoal, 1);
  const goalMet = todayLessons >= dailyGoal;

  return (
    <View style={styles.wrapper}>
      {celebrationStreak !== null && (
        <StreakCelebration
          streakCount={celebrationStreak}
          onDismiss={() => setCelebrationStreak(null)}
          t={t}
        />
      )}
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={[typography.heading2, { color: colors.text }]}>{t('home.title')}</Text>
      <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
        {t('home.subtitle')}
      </Text>

      {/* Stats row: Level, XP, Reviews Due */}
      <View style={styles.statsRow}>
        <Card variant="elevated" style={styles.statCard}>
          <Ionicons name="star" size={24} color={colors.secondary} />
          <Text style={styles.statValue}>{level}</Text>
          <Text style={styles.statLabel}>{t('home.level')}</Text>
        </Card>

        <Card variant="elevated" style={styles.statCard}>
          <Ionicons name="flash" size={24} color={colors.primary} />
          <Text style={styles.statValue}>{profile?.totalXp ?? 0}</Text>
          <Text style={styles.statLabel}>{t('home.totalXp')}</Text>
        </Card>

        <Card variant="elevated" style={styles.statCard}>
          <Ionicons name="albums" size={24} color={colors.success} />
          <Text style={styles.statValue}>{reviewDueCount}</Text>
          <Text style={styles.statLabel}>{t('home.reviewDue')}</Text>
        </Card>
      </View>

      {/* Streak card */}
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

      {/* Daily Goal card */}
      <Card variant="elevated" style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Ionicons
            name={goalMet ? 'checkmark-circle' : 'flag'}
            size={24}
            color={goalMet ? colors.success : colors.primary}
          />
          <Text style={[typography.heading3, { color: colors.text, marginLeft: spacing.sm }]}>
            {t('home.dailyGoal')}
          </Text>
        </View>
        <ProgressBar
          progress={goalProgress}
          color={goalMet ? colors.success : colors.primary}
          height={10}
          style={{ marginTop: spacing.sm }}
        />
        <Text style={styles.goalText}>
          {goalMet
            ? t('home.dailyGoalComplete')
            : t('home.dailyGoalProgress', { completed: todayLessons, goal: dailyGoal })}
        </Text>
        {goalMet && (
          <Text style={[styles.goalText, { marginTop: spacing.xs }]}>
            {t('home.dailyGoalProgress', { completed: todayLessons, goal: dailyGoal })}
          </Text>
        )}
      </Card>

      {/* Continue button */}
      {nextLesson ? (
        <Link href={`/(tabs)/lessons/lesson?id=${nextLesson.id}` as any} asChild>
          <Pressable>
            <Card variant="elevated" style={styles.continueCard}>
              <View style={styles.continueRow}>
                <View style={styles.continueIcon}>
                  <Ionicons name="play" size={28} color={colors.textOnPrimary} />
                </View>
                <View style={styles.continueText}>
                  <Text style={[typography.heading3, { color: colors.textOnPrimary }]}>
                    {t('home.continueLesson')}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color={colors.textOnPrimary} />
              </View>
            </Card>
          </Pressable>
        </Link>
      ) : allComplete ? (
        <Card variant="elevated" style={styles.completeCard}>
          <Ionicons name="trophy" size={32} color={colors.secondary} />
          <Text style={[typography.heading3, { color: colors.text, marginTop: spacing.sm }]}>
            {t('home.allLessonsComplete')}
          </Text>
        </Card>
      ) : (
        <Link href="/(tabs)/lessons" asChild>
          <Pressable>
            <Card variant="elevated" style={styles.startCard}>
              <Ionicons name="rocket" size={32} color={colors.primary} />
              <Text style={[typography.heading3, { color: colors.text, marginTop: spacing.sm }]}>
                {t('home.noLessonsYet')}
              </Text>
            </Card>
          </Pressable>
        </Link>
      )}
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  // Stats row
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
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
  // Streak card
  streakCard: {
    marginTop: spacing.md,
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
  // Daily goal card
  goalCard: {
    marginTop: spacing.md,
    padding: spacing.md,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  // Continue button card
  continueCard: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.primary,
  },
  continueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  continueText: {
    flex: 1,
  },
  // All complete card
  completeCard: {
    marginTop: spacing.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  // Start card
  startCard: {
    marginTop: spacing.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
});
