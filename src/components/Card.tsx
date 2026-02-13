import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius } from '../theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  style?: ViewStyle;
}

export function Card({ children, variant = 'elevated', style }: CardProps) {
  return (
    <View style={[styles.base, variantStyles[variant], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
});

const variantStyles: Record<string, ViewStyle> = {
  elevated: {
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  outlined: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filled: {
    backgroundColor: colors.surface,
  },
};
