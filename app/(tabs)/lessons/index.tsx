import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../../src/theme';
import { Card } from '../../../src/components';

export default function LessonsScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
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
});
