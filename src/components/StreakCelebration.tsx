import { useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../theme';
import { triggerHeavyHaptic } from '../utils';

interface StreakCelebrationProps {
  streakCount: number;
  onDismiss: () => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
}

const PARTICLE_COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#FF9F43'];
const PARTICLE_COUNT = 20;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Particle {
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  rotate: Animated.Value;
  color: string;
  size: number;
  startX: number;
}

export function StreakCelebration({ streakCount, onDismiss, t }: StreakCelebrationProps) {
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(0)).current;
  const flameScale = useRef(new Animated.Value(0)).current;

  const particles: Particle[] = useMemo(() =>
    Array.from({ length: PARTICLE_COUNT }, () => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      opacity: new Animated.Value(1),
      rotate: new Animated.Value(0),
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      size: 8 + Math.random() * 8,
      startX: Math.random() * SCREEN_WIDTH,
    })),
  []);

  useEffect(() => {
    triggerHeavyHaptic();

    // Entrance animations
    Animated.parallel([
      Animated.timing(overlayOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.spring(cardScale, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }),
      Animated.spring(flameScale, { toValue: 1, friction: 3, tension: 60, useNativeDriver: true, delay: 200 }),
    ]).start();

    // Confetti particle animations
    const particleAnimations = particles.map((p) => {
      const spreadX = (Math.random() - 0.5) * SCREEN_WIDTH * 0.8;
      return Animated.parallel([
        Animated.timing(p.x, {
          toValue: spreadX,
          duration: 1500 + Math.random() * 500,
          useNativeDriver: true,
        }),
        Animated.timing(p.y, {
          toValue: SCREEN_HEIGHT * 0.5 + Math.random() * 100,
          duration: 1500 + Math.random() * 500,
          useNativeDriver: true,
        }),
        Animated.timing(p.opacity, {
          toValue: 0,
          duration: 1500 + Math.random() * 500,
          useNativeDriver: true,
        }),
        Animated.timing(p.rotate, {
          toValue: Math.random() * 10 - 5,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]);
    });
    Animated.stagger(30, particleAnimations).start();

    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => {
      Animated.timing(overlayOpacity, { toValue: 0, duration: 300, useNativeDriver: true }).start(onDismiss);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const milestoneEmoji = streakCount >= 100 ? 'trophy' : streakCount >= 30 ? 'medal' : 'flame';
  const milestoneColor = streakCount >= 100 ? colors.secondary : streakCount >= 30 ? '#FF6B6B' : colors.secondary;

  return (
    <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
      {/* Confetti particles */}
      {particles.map((p, i) => (
        <Animated.View
          key={i}
          style={[
            styles.particle,
            {
              left: p.startX,
              top: -20,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.size / 2,
              opacity: p.opacity,
              transform: [
                { translateX: p.x },
                { translateY: p.y },
                { rotate: p.rotate.interpolate({
                    inputRange: [-5, 5],
                    outputRange: ['-180deg', '180deg'],
                  })
                },
              ],
            },
          ]}
        />
      ))}

      {/* Celebration card */}
      <Animated.View style={[styles.card, { transform: [{ scale: cardScale }] }]}>
        <Animated.View style={{ transform: [{ scale: flameScale }] }}>
          <Ionicons name={milestoneEmoji as any} size={72} color={milestoneColor} />
        </Animated.View>
        <Text style={styles.title}>
          {t('streak.milestoneTitle', { count: streakCount })}
        </Text>
        <Text style={styles.subtitle}>
          {t('streak.milestoneSubtitle')}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  particle: {
    position: 'absolute',
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    width: '80%',
    maxWidth: 320,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    ...typography.heading1,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
