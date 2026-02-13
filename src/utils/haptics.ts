import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

const isHapticsAvailable = Platform.OS === 'ios' || Platform.OS === 'android';

export function triggerSuccessHaptic(): void {
  if (!isHapticsAvailable) return;
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {}
}

export function triggerErrorHaptic(): void {
  if (!isHapticsAvailable) return;
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  } catch {}
}

export function triggerSelectionHaptic(): void {
  if (!isHapticsAvailable) return;
  try {
    Haptics.selectionAsync();
  } catch {}
}

export function triggerHeavyHaptic(): void {
  if (!isHapticsAvailable) return;
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch {}
}
