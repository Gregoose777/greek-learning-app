import { StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { colors, typography, spacing } from '../../../src/theme';
import { getLessonById } from '../../../src/content';
import type { LocalizedString } from '../../../src/content';

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const lesson = id ? getLessonById(id) : null;

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={[typography.heading3, { color: colors.error }]}>
          {t('common.error')}
        </Text>
      </View>
    );
  }

  const title = (lesson.title as LocalizedString)[lang as keyof LocalizedString] ?? lesson.title.en;
  const description = (lesson.description as LocalizedString)[lang as keyof LocalizedString] ?? lesson.description.en;

  return (
    <View style={styles.container}>
      <Text style={[typography.heading2, { color: colors.text }]}>{title}</Text>
      <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.sm }]}>
        {description}
      </Text>
      <View style={styles.placeholder}>
        <Text style={[typography.body, { color: colors.textSecondary }]}>
          {t('unitMap.exerciseCount', { count: lesson.exercises.length })}
        </Text>
        <Text style={[typography.caption, { color: colors.textDisabled, marginTop: spacing.sm }]}>
          {t('unitMap.comingSoon')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
