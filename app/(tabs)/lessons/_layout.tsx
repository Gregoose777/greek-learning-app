import { Stack } from 'expo-router';
import { colors, typography } from '../../../src/theme';

export default function LessonsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { ...typography.heading3, color: colors.text },
        headerShadowVisible: false,
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Lessons' }} />
    </Stack>
  );
}
