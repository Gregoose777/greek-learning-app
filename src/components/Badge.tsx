import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

type BadgeVariant = 'primary' | 'success' | 'error' | 'warning' | 'neutral';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
}

export function Badge({
  label,
  variant = 'primary',
  size = 'md',
  style,
}: BadgeProps) {
  return (
    <View style={[styles.base, sizeStyles[size], badgeVariantStyles[variant], style]}>
      <Text style={[styles.text, sizeTextStyles[size], textVariantStyles[variant]]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: borderRadius.full,
  },
  text: {
    ...typography.captionBold,
  },
});

const sizeStyles: Record<BadgeSize, ViewStyle> = {
  sm: { paddingVertical: 2, paddingHorizontal: spacing.sm },
  md: { paddingVertical: spacing.xs, paddingHorizontal: spacing.sm + 4 },
};

const sizeTextStyles: Record<BadgeSize, { fontSize: number }> = {
  sm: { fontSize: 11 },
  md: { fontSize: 13 },
};

const badgeVariantStyles: Record<BadgeVariant, ViewStyle> = {
  primary: { backgroundColor: colors.primaryLight + '22' },
  success: { backgroundColor: colors.success + '22' },
  error: { backgroundColor: colors.error + '22' },
  warning: { backgroundColor: colors.warning + '22' },
  neutral: { backgroundColor: colors.surfaceAlt },
};

const textVariantStyles: Record<BadgeVariant, { color: string }> = {
  primary: { color: colors.primary },
  success: { color: colors.success },
  error: { color: colors.error },
  warning: { color: colors.secondaryDark },
  neutral: { color: colors.textSecondary },
};
