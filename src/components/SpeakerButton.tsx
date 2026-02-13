import { useState, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../theme';
import { speakGreek, isTtsAvailable } from '../utils';

interface SpeakerButtonProps {
  text: string;
  size?: number;
  color?: string;
  style?: object;
}

export function SpeakerButton({
  text,
  size = 24,
  color = colors.primary,
  style,
}: SpeakerButtonProps) {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    isTtsAvailable().then(setAvailable);
  }, []);

  if (!available) return null;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        style,
      ]}
      onPress={() => speakGreek(text)}
      hitSlop={8}
    >
      <Ionicons name="volume-medium" size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  pressed: {
    opacity: 0.6,
  },
});
