import { Stack } from 'expo-router';

export default function LessonsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Lessons' }} />
    </Stack>
  );
}
