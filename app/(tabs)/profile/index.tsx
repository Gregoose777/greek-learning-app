import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { colors, typography, spacing } from '../../../src/theme';
import { Button } from '../../../src/components';

export default function ProfileScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={[typography.heading2, { color: colors.text }]}>{t('profile.title')}</Text>
      <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
        {t('profile.subtitle')}
      </Text>
      <View style={styles.buttons}>
        <Link href="/(tabs)/profile/change-language" asChild>
          <Button title={t('profile.changeLanguage')} variant="primary" onPress={() => {}} />
        </Link>
        <Link href="/(tabs)/profile/component-showcase" asChild>
          <Button title={t('profile.viewDesignSystem')} variant="outline" onPress={() => {}} />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  buttons: {
    marginTop: spacing.xl,
    gap: spacing.md,
    width: '80%',
  },
});
