import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../src/theme';
import { LanguageProvider, useLanguage } from '../src/i18n/LanguageProvider';

function RootNavigator() {
  const { isReady, isFirstLaunch } = useLanguage();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isReady) return;

    const onOnboarding = segments[0] === 'onboarding';

    if (isFirstLaunch && !onOnboarding) {
      router.replace('/onboarding');
    }
  }, [isReady, isFirstLaunch, segments, router]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
        <Stack.Screen name="language-picker" options={{ gestureEnabled: false }} />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <LanguageProvider>
      <RootNavigator />
    </LanguageProvider>
  );
}
