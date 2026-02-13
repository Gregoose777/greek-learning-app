import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { colors, typography } from '../../../src/theme';

export default function ReviewLayout() {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { ...typography.heading3, color: colors.text },
        headerShadowVisible: false,
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen name="index" options={{ title: t('review.title') }} />
    </Stack>
  );
}
