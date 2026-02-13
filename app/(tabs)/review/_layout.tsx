import { Stack } from 'expo-router';

export default function ReviewLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Review' }} />
    </Stack>
  );
}
