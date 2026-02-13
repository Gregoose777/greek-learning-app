import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, typography, spacing } from '../../../src/theme';

export default function ReviewScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={[typography.heading2, { color: colors.text }]}>{t('review.title')}</Text>
      <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
        {t('review.subtitle')}
      </Text>
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
});
