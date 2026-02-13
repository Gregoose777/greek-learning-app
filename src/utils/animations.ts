import { Animated } from 'react-native';

/**
 * Create a green pulse (scale) animation on correct answers.
 * Returns the Animated.Value for scale transforms.
 */
export function createPulseAnimation(scaleValue: Animated.Value): Animated.CompositeAnimation {
  return Animated.sequence([
    Animated.timing(scaleValue, {
      toValue: 1.05,
      duration: 150,
      useNativeDriver: true,
    }),
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }),
  ]);
}

/**
 * Create a shake (translateX) animation on incorrect answers.
 */
export function createShakeAnimation(translateX: Animated.Value): Animated.CompositeAnimation {
  return Animated.sequence([
    Animated.timing(translateX, { toValue: 10, duration: 50, useNativeDriver: true }),
    Animated.timing(translateX, { toValue: -10, duration: 50, useNativeDriver: true }),
    Animated.timing(translateX, { toValue: 10, duration: 50, useNativeDriver: true }),
    Animated.timing(translateX, { toValue: -10, duration: 50, useNativeDriver: true }),
    Animated.timing(translateX, { toValue: 0, duration: 50, useNativeDriver: true }),
  ]);
}

/**
 * Animate a value from 0 to target over duration ms.
 * Useful for count-up XP displays.
 */
export function createCountUpAnimation(
  animValue: Animated.Value,
  toValue: number,
  duration: number = 1000,
): Animated.CompositeAnimation {
  return Animated.timing(animValue, {
    toValue,
    duration,
    useNativeDriver: false, // needed for text value interpolation
  });
}
