import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { colors, typography } from '../../../src/theme';

export default function ProfileLayout() {
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
      <Stack.Screen name="index" options={{ title: t('profile.title') }} />
      <Stack.Screen name="component-showcase" options={{ title: t('designSystem.title') }} />
      <Stack.Screen name="change-language" options={{ title: t('profile.changeLanguage') }} />
    </Stack>
  );
}
