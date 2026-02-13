import { Stack } from 'expo-router';
import { colors, typography } from '../../../src/theme';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { ...typography.heading3, color: colors.text },
        headerShadowVisible: false,
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
    </Stack>
  );
}
