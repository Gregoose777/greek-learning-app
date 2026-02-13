import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        variantStyles[variant],
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.textOnPrimary : colors.primary}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.text,
            sizeTextStyles[size],
            variantTextStyles[variant],
            isDisabled && styles.textDisabled,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...typography.button,
  },
  textDisabled: {
    color: colors.textDisabled,
  },
});

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  sm: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  md: { paddingVertical: spacing.sm + 2, paddingHorizontal: spacing.lg },
  lg: { paddingVertical: spacing.md - 2, paddingHorizontal: spacing.xl },
};

const sizeTextStyles: Record<ButtonSize, { fontSize: number }> = {
  sm: { fontSize: 14 },
  md: { fontSize: 16 },
  lg: { fontSize: 18 },
};

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
};

const variantTextStyles: Record<ButtonVariant, { color: string }> = {
  primary: { color: colors.textOnPrimary },
  secondary: { color: colors.textOnSecondary },
  outline: { color: colors.primary },
  ghost: { color: colors.primary },
};
