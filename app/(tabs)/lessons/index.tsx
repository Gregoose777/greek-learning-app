import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Link, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../../src/theme';
import { Card, ProgressBar } from '../../../src/components';
import { getCourseContent } from '../../../src/content';
import type { Unit, Lesson, LocalizedString } from '../../../src/content';
import { getAllLessonProgress } from '../../../src/database';
import type { LessonProgress } from '../../../src/database';

type LessonStatus = 'completed' | 'unlocked' | 'locked';

function getLocalizedText(text: LocalizedString, lang: string): string {
  return text[lang as keyof LocalizedString] ?? text.en;
}

function getLessonStatus(
  lesson: Lesson,
  progressMap: Map<string, LessonProgress>,
  _allLessons: Lesson[],
): LessonStatus {
  const progress = progressMap.get(lesson.id);
  if (progress?.completed) return 'completed';

  // All lessons are freely accessible
  return 'unlocked';
}

function getUnitCompletion(unit: Unit, progressMap: Map<string, LessonProgress>): number {
  if (unit.lessons.length === 0) return 0;
  const completed = unit.lessons.filter((l) => progressMap.get(l.id)?.completed).length;
  return completed / unit.lessons.length;
}

function LessonNode({
  lesson,
  status,
  lang,
}: {
  lesson: Lesson;
  status: LessonStatus;
  lang: string;
}) {
  const title = getLocalizedText(lesson.title, lang);

  const nodeContent = (
    <View style={[styles.lessonNode, status === 'locked' && styles.lessonNodeLocked]}>
      <View
        style={[
          styles.lessonCircle,
          status === 'completed' && styles.lessonCircleCompleted,
          status === 'unlocked' && styles.lessonCircleUnlocked,
          status === 'locked' && styles.lessonCircleLocked,
        ]}
      >
        {status === 'completed' ? (
          <Ionicons name="checkmark" size={20} color={colors.textOnPrimary} />
        ) : status === 'locked' ? (
          <Ionicons name="lock-closed" size={16} color={colors.textDisabled} />
        ) : (
          <Text style={styles.lessonOrder}>{lesson.order}</Text>
        )}
      </View>
      <Text
        style={[
          typography.body,
          styles.lessonTitle,
          status === 'locked' && { color: colors.textDisabled },
        ]}
        numberOfLines={2}
      >
        {title}
      </Text>
    </View>
  );

  if (status === 'locked') {
    return nodeContent;
  }

  return (
    <Link href={`/(tabs)/lessons/lesson?id=${lesson.id}` as any} asChild>
      <Pressable>{nodeContent}</Pressable>
    </Link>
  );
}

export default function LessonsScreen() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [progressMap, setProgressMap] = useState<Map<string, LessonProgress>>(new Map());

  const course = getCourseContent();
  const allLessons = course.units.flatMap((u) => u.lessons);

  // Reload progress each time the screen is focused
  useFocusEffect(
    useCallback(() => {
      const allProgress = getAllLessonProgress();
      const map = new Map<string, LessonProgress>();
      for (const p of allProgress) {
        map.set(p.lessonId, p);
      }
      setProgressMap(map);
    }, [])
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={[typography.heading2, { color: colors.text }]}>{t('lessons.title')}</Text>
      <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
        {t('lessons.subtitle')}
      </Text>

      {/* Alphabet section link */}
      <Link href="/(tabs)/lessons/alphabet" asChild>
        <Pressable style={styles.sectionLink}>
          <Card variant="elevated" style={styles.sectionCard}>
            <View style={styles.sectionRow}>
              <View style={styles.sectionIcon}>
                <Ionicons name="text" size={28} color={colors.primary} />
              </View>
              <View style={styles.sectionTextContainer}>
                <Text style={[typography.heading3, { color: colors.text }]}>
                  {t('alphabet.title')}
                </Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {t('alphabet.subtitle')}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={colors.textSecondary} />
            </View>
          </Card>
        </Pressable>
      </Link>

      {/* Unit list */}
      {course.units.map((unit) => {
        const completion = getUnitCompletion(unit, progressMap);
        const completedCount = unit.lessons.filter(
          (l) => progressMap.get(l.id)?.completed
        ).length;

        return (
          <View key={unit.id} style={styles.unitContainer}>
            <Card variant="elevated" style={styles.unitCard}>
              <View style={styles.unitHeader}>
                <View style={styles.unitBadge}>
                  <Text style={styles.unitBadgeText}>{unit.order}</Text>
                </View>
                <View style={styles.unitTitleContainer}>
                  <Text style={[typography.heading3, { color: colors.text }]}>
                    {getLocalizedText(unit.title, lang)}
                  </Text>
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>
                    {t('unitMap.lessonCount', { completed: completedCount, total: unit.lessons.length })}
                  </Text>
                </View>
              </View>

              <View style={styles.progressRow}>
                <ProgressBar
                  progress={completion}
                  color={completion === 1 ? colors.success : colors.primary}
                  height={6}
                  style={styles.unitProgress}
                />
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {Math.round(completion * 100)}%
                </Text>
              </View>

              <View style={styles.lessonList}>
                {unit.lessons.map((lesson) => {
                  const status = getLessonStatus(lesson, progressMap, allLessons);
                  return (
                    <LessonNode
                      key={lesson.id}
                      lesson={lesson}
                      status={status}
                      lang={lang}
                    />
                  );
                })}
              </View>
            </Card>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  sectionLink: {
    marginTop: spacing.lg,
  },
  sectionCard: {
    padding: spacing.md,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary + '14',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  sectionTextContainer: {
    flex: 1,
    gap: 2,
  },
  unitContainer: {
    marginTop: spacing.lg,
  },
  unitCard: {
    padding: spacing.md,
  },
  unitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  unitBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  unitBadgeText: {
    color: colors.textOnPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
  unitTitleContainer: {
    flex: 1,
    gap: 2,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  unitProgress: {
    flex: 1,
  },
  lessonList: {
    gap: spacing.xs,
  },
  lessonNode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
  },
  lessonNodeLocked: {
    opacity: 0.6,
  },
  lessonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  lessonCircleCompleted: {
    backgroundColor: colors.success,
  },
  lessonCircleUnlocked: {
    backgroundColor: colors.primaryLight,
  },
  lessonCircleLocked: {
    backgroundColor: colors.surfaceAlt,
  },
  lessonOrder: {
    color: colors.textOnPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  lessonTitle: {
    flex: 1,
    color: colors.text,
  },
});
