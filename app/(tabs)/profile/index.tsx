import { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
} from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../../src/theme';
import { Card } from '../../../src/components';
import {
  getUserProfile,
  updateUserProfile,
  getCompletedLessons,
  resetAllProgress,
  getOrCreateStreak,
} from '../../../src/database';
import type { UserProfile, DailyStreak } from '../../../src/database';

const DAILY_GOAL_OPTIONS = [1, 2, 3, 5];
const APP_VERSION = '1.0.0';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [streak, setStreak] = useState<DailyStreak | null>(null);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  useFocusEffect(
    useCallback(() => {
      const p = getUserProfile();
      setProfile(p);
      setNameInput(p?.username ?? '');

      const s = getOrCreateStreak();
      setStreak(s);

      const completed = getCompletedLessons();
      setLessonsCompleted(completed.length);
    }, [])
  );

  const level = profile ? Math.floor(profile.totalXp / 100) + 1 : 1;

  const handleSaveName = () => {
    if (profile && nameInput.trim() !== profile.username) {
      updateUserProfile({ id: profile.id, username: nameInput.trim() });
      setProfile({ ...profile, username: nameInput.trim() });
    }
    setEditingName(false);
  };

  const handleDailyGoalChange = (goal: number) => {
    if (profile) {
      updateUserProfile({ id: profile.id, dailyGoal: goal });
      setProfile({ ...profile, dailyGoal: goal });
    }
  };

  const handleResetProgress = () => {
    Alert.alert(
      t('profile.resetConfirmTitle'),
      t('profile.resetConfirmMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('profile.resetConfirmButton'),
          style: 'destructive',
          onPress: () => {
            resetAllProgress();
            const p = getUserProfile();
            setProfile(p);
            const s = getOrCreateStreak();
            setStreak(s);
            setLessonsCompleted(0);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* User identity */}
      <View style={styles.userSection}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={40} color={colors.textOnPrimary} />
        </View>
        {editingName ? (
          <View style={styles.nameEditRow}>
            <TextInput
              style={styles.nameInput}
              value={nameInput}
              onChangeText={setNameInput}
              placeholder={t('profile.usernamePlaceholder')}
              placeholderTextColor={colors.textDisabled}
              autoFocus
              onSubmitEditing={handleSaveName}
              returnKeyType="done"
            />
            <Pressable onPress={handleSaveName} style={styles.nameCheckButton}>
              <Ionicons name="checkmark" size={22} color={colors.primary} />
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={() => setEditingName(true)} style={styles.nameRow}>
            <Text style={styles.username}>
              {profile?.username || t('profile.usernamePlaceholder')}
            </Text>
            <Ionicons name="pencil" size={16} color={colors.textSecondary} />
          </Pressable>
        )}
      </View>

      {/* Stats grid */}
      <View style={styles.statsGrid}>
        <Card variant="elevated" style={styles.statCard}>
          <Ionicons name="star" size={24} color={colors.secondary} />
          <Text style={styles.statValue}>{level}</Text>
          <Text style={styles.statLabel}>{t('profile.level')}</Text>
        </Card>

        <Card variant="elevated" style={styles.statCard}>
          <Ionicons name="flash" size={24} color={colors.primary} />
          <Text style={styles.statValue}>{profile?.totalXp ?? 0}</Text>
          <Text style={styles.statLabel}>{t('profile.totalXp')}</Text>
        </Card>

        <Card variant="elevated" style={styles.statCard}>
          <Ionicons name="flame" size={24} color={streak && streak.currentStreak > 0 ? colors.secondary : colors.textDisabled} />
          <Text style={styles.statValue}>{streak?.currentStreak ?? 0}</Text>
          <Text style={styles.statLabel}>{t('profile.currentStreak')}</Text>
        </Card>

        <Card variant="elevated" style={styles.statCard}>
          <Ionicons name="checkmark-done" size={24} color={colors.success} />
          <Text style={styles.statValue}>{lessonsCompleted}</Text>
          <Text style={styles.statLabel}>{t('profile.lessonsCompleted')}</Text>
        </Card>
      </View>

      {/* Settings section */}
      <Text style={styles.sectionTitle}>{t('profile.settings')}</Text>

      {/* Change Language */}
      <Link href="/(tabs)/profile/change-language" asChild>
        <Pressable>
          <Card variant="outlined" style={styles.settingRow}>
            <Ionicons name="language" size={22} color={colors.primary} />
            <Text style={styles.settingLabel}>{t('profile.changeLanguage')}</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textDisabled} />
          </Card>
        </Pressable>
      </Link>

      {/* Daily Goal */}
      <Card variant="outlined" style={styles.settingCard}>
        <View style={styles.settingHeader}>
          <Ionicons name="flag" size={22} color={colors.primary} />
          <Text style={styles.settingLabel}>{t('profile.dailyGoal')}</Text>
        </View>
        <View style={styles.goalOptions}>
          {DAILY_GOAL_OPTIONS.map((goal) => (
            <Pressable
              key={goal}
              style={[
                styles.goalChip,
                profile?.dailyGoal === goal && styles.goalChipActive,
              ]}
              onPress={() => handleDailyGoalChange(goal)}
            >
              <Text
                style={[
                  styles.goalChipText,
                  profile?.dailyGoal === goal && styles.goalChipTextActive,
                ]}
              >
                {goal === 1
                  ? t('profile.lessonsPerDay', { count: goal })
                  : t('profile.lessonsPerDayPlural', { count: goal })}
              </Text>
            </Pressable>
          ))}
        </View>
      </Card>

      {/* Reset Progress */}
      <Pressable onPress={handleResetProgress}>
        <Card variant="outlined" style={styles.settingRow}>
          <Ionicons name="trash" size={22} color={colors.error} />
          <Text style={[styles.settingLabel, { color: colors.error }]}>
            {t('profile.resetProgress')}
          </Text>
          <Ionicons name="chevron-forward" size={20} color={colors.textDisabled} />
        </Card>
      </Pressable>

      {/* About section */}
      <Text style={styles.sectionTitle}>{t('profile.about')}</Text>

      <Card variant="outlined" style={styles.aboutCard}>
        <Text style={styles.appName}>{t('profile.appName')}</Text>
        <Text style={styles.appDescription}>{t('profile.appDescription')}</Text>
        <Text style={styles.appVersion}>{t('profile.appVersion', { version: APP_VERSION })}</Text>
      </Card>
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
  // User identity
  userSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  username: {
    ...typography.heading2,
    color: colors.text,
  },
  nameEditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  nameInput: {
    ...typography.heading3,
    color: colors.text,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    minWidth: 180,
    textAlign: 'center',
  },
  nameCheckButton: {
    padding: spacing.xs,
  },
  // Stats grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  statCard: {
    width: '47%',
    flexGrow: 1,
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
    textAlign: 'center',
  },
  // Settings section
  sectionTitle: {
    ...typography.heading3,
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  settingLabel: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  settingCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  goalOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  goalChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.borderLight,
    backgroundColor: colors.surface,
  },
  goalChipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  goalChipText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  goalChipTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  // About section
  aboutCard: {
    padding: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  appName: {
    ...typography.heading3,
    color: colors.text,
  },
  appDescription: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  appVersion: {
    ...typography.caption,
    color: colors.textDisabled,
    marginTop: spacing.sm,
  },
});
