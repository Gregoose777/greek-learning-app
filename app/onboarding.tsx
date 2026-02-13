import { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  FlatList,
  type ViewToken,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../src/theme';
import { Button } from '../src/components';
import { useLanguage } from '../src/i18n/LanguageProvider';
import { LANGUAGES, type SupportedLanguage } from '../src/i18n';
import { useTranslation } from 'react-i18next';
import { getUserProfile, createUserProfile, updateUserProfile } from '../src/database';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const DAILY_GOAL_OPTIONS = [1, 2, 3, 5];

export default function OnboardingScreen() {
  const { changeLanguage, completeLanguageSetup } = useLanguage();
  const { t } = useTranslation();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('en');
  const [selectedGoal, setSelectedGoal] = useState(1);

  const totalSteps = 3;

  const goToStep = (step: number) => {
    flatListRef.current?.scrollToIndex({ index: step, animated: true });
    setCurrentStep(step);
  };

  const handleSkip = async () => {
    await finishOnboarding();
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      // Welcome → Language
      goToStep(1);
    } else if (currentStep === 1) {
      // Language → Daily Goal
      await changeLanguage(selectedLang);
      goToStep(2);
    } else {
      // Daily Goal → Finish
      await finishOnboarding();
    }
  };

  const finishOnboarding = async () => {
    // Ensure language is set
    await changeLanguage(selectedLang);

    // Ensure user profile exists with selected settings
    const existing = getUserProfile();
    if (!existing) {
      createUserProfile({
        username: '',
        referenceLanguage: selectedLang,
        dailyGoal: selectedGoal,
        totalXp: 0,
        currentLevel: 1,
      });
    } else {
      updateUserProfile({
        id: existing.id,
        referenceLanguage: selectedLang,
        dailyGoal: selectedGoal,
      });
    }

    completeLanguageSetup();
    router.replace('/(tabs)/home');
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentStep(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderWelcomeStep = () => (
    <View style={[styles.stepContainer, { width: SCREEN_WIDTH }]}>
      <View style={styles.stepContent}>
        <Text style={styles.welcomeEmoji}>🇬🇷</Text>
        <Text style={styles.appTitle}>{t('onboarding.appName')}</Text>
        <Text style={styles.stepTitle}>{t('onboarding.welcomeTitle')}</Text>
        <Text style={styles.stepSubtitle}>{t('onboarding.welcomeSubtitle')}</Text>

        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Ionicons name="book-outline" size={24} color={colors.primary} />
            <Text style={styles.featureText}>{t('onboarding.feature1')}</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="game-controller-outline" size={24} color={colors.primary} />
            <Text style={styles.featureText}>{t('onboarding.feature2')}</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="volume-high-outline" size={24} color={colors.primary} />
            <Text style={styles.featureText}>{t('onboarding.feature3')}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderLanguageStep = () => (
    <View style={[styles.stepContainer, { width: SCREEN_WIDTH }]}>
      <View style={styles.stepContent}>
        <Ionicons name="language-outline" size={56} color={colors.primary} />
        <Text style={styles.stepTitle}>{t('onboarding.languageTitle')}</Text>
        <Text style={styles.stepSubtitle}>{t('onboarding.languageSubtitle')}</Text>

        <View style={styles.options}>
          {LANGUAGES.map((lang) => (
            <Pressable
              key={lang.code}
              style={[
                styles.option,
                selectedLang === lang.code && styles.optionSelected,
              ]}
              onPress={() => {
                setSelectedLang(lang.code);
                changeLanguage(lang.code);
              }}
            >
              <Text style={styles.flag}>{lang.flag}</Text>
              <Text
                style={[
                  styles.optionLabel,
                  selectedLang === lang.code && styles.optionLabelSelected,
                ]}
              >
                {lang.label}
              </Text>
              {selectedLang === lang.code && (
                <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
              )}
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );

  const renderGoalStep = () => (
    <View style={[styles.stepContainer, { width: SCREEN_WIDTH }]}>
      <View style={styles.stepContent}>
        <Ionicons name="trophy-outline" size={56} color={colors.secondary} />
        <Text style={styles.stepTitle}>{t('onboarding.goalTitle')}</Text>
        <Text style={styles.stepSubtitle}>{t('onboarding.goalSubtitle')}</Text>

        <View style={styles.goalOptions}>
          {DAILY_GOAL_OPTIONS.map((goal) => (
            <Pressable
              key={goal}
              style={[
                styles.goalChip,
                selectedGoal === goal && styles.goalChipSelected,
              ]}
              onPress={() => setSelectedGoal(goal)}
            >
              <Text
                style={[
                  styles.goalNumber,
                  selectedGoal === goal && styles.goalNumberSelected,
                ]}
              >
                {goal}
              </Text>
              <Text
                style={[
                  styles.goalLabel,
                  selectedGoal === goal && styles.goalLabelSelected,
                ]}
              >
                {goal === 1
                  ? t('onboarding.lessonPerDay')
                  : t('onboarding.lessonsPerDay')}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );

  const steps = [renderWelcomeStep, renderLanguageStep, renderGoalStep];

  return (
    <View style={styles.container}>
      {/* Skip button */}
      <View style={styles.header}>
        {currentStep < totalSteps - 1 ? (
          <Pressable onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>{t('onboarding.skip')}</Text>
          </Pressable>
        ) : (
          <View />
        )}
      </View>

      {/* Step content */}
      <FlatList
        ref={flatListRef}
        data={steps}
        renderItem={({ item: renderStep }) => renderStep()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      {/* Footer: dots + button */}
      <View style={styles.footer}>
        <View style={styles.dots}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <View
              key={i}
              style={[styles.dot, currentStep === i && styles.dotActive]}
            />
          ))}
        </View>

        <Button
          title={
            currentStep === totalSteps - 1
              ? t('onboarding.start')
              : t('onboarding.next')
          }
          onPress={handleNext}
          size="lg"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl + spacing.md,
  },
  skipButton: {
    padding: spacing.sm,
  },
  skipText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  stepContent: {
    alignItems: 'center',
  },
  welcomeEmoji: {
    fontSize: 72,
    marginBottom: spacing.md,
  },
  appTitle: {
    ...typography.heading1,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  stepTitle: {
    ...typography.heading2,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  stepSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  featureList: {
    width: '100%',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  featureText: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  options: {
    width: '100%',
    gap: spacing.md,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.borderLight,
    backgroundColor: colors.surface,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  flag: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  optionLabel: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  optionLabelSelected: {
    ...typography.bodyBold,
    color: colors.primary,
  },
  goalOptions: {
    width: '100%',
    gap: spacing.md,
  },
  goalChip: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.borderLight,
    backgroundColor: colors.surface,
    gap: spacing.md,
  },
  goalChipSelected: {
    borderColor: colors.secondary,
    backgroundColor: '#FFF8E1',
  },
  goalNumber: {
    ...typography.heading2,
    color: colors.text,
    width: 40,
    textAlign: 'center',
  },
  goalNumberSelected: {
    color: colors.secondary,
  },
  goalLabel: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  goalLabelSelected: {
    ...typography.bodyBold,
    color: colors.secondary,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.borderLight,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 24,
  },
});
