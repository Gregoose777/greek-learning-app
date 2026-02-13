import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, borderRadius } from '../theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  trackColor?: string;
  height?: number;
  style?: ViewStyle;
}

export function ProgressBar({
  progress,
  color = colors.primary,
  trackColor = colors.surfaceAlt,
  height = 8,
  style,
}: ProgressBarProps) {
  const clampedProgress = Math.min(1, Math.max(0, progress));

  return (
    <View style={[styles.track, { backgroundColor: trackColor, height }, style]}>
      <View
        style={[
          styles.fill,
          {
            backgroundColor: color,
            width: `${clampedProgress * 100}%`,
            height,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: borderRadius.full,
  },
});
