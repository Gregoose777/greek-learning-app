import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography, spacing, borderRadius } from '../src/theme';
import { Button } from '../src/components';
import { useLanguage } from '../src/i18n/LanguageProvider';
import { LANGUAGES, type SupportedLanguage } from '../src/i18n';
import { useTranslation } from 'react-i18next';
import { getUserProfile, createUserProfile } from '../src/database';

export default function LanguagePickerScreen() {
  const { changeLanguage, completeLanguageSetup } = useLanguage();
  const { t } = useTranslation();
  const router = useRouter();
  const [selected, setSelected] = useState<SupportedLanguage>('en');

  const handleConfirm = async () => {
    await changeLanguage(selected);

    // Ensure user profile exists with selected language
    const existing = getUserProfile();
    if (!existing) {
      createUserProfile({
        username: '',
        referenceLanguage: selected,
        dailyGoal: 1,
        totalXp: 0,
        currentLevel: 1,
      });
    }

    completeLanguageSetup();
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🇬🇷</Text>
        <Text style={styles.title}>{t('languagePicker.title')}</Text>
        <Text style={styles.subtitle}>{t('languagePicker.subtitle')}</Text>

        <View style={styles.options}>
          {LANGUAGES.map((lang) => (
            <Pressable
              key={lang.code}
              style={[
                styles.option,
                selected === lang.code && styles.optionSelected,
              ]}
              onPress={() => {
                setSelected(lang.code);
                changeLanguage(lang.code);
              }}
            >
              <Text style={styles.flag}>{lang.flag}</Text>
              <Text
                style={[
                  styles.optionLabel,
                  selected === lang.code && styles.optionLabelSelected,
                ]}
              >
                {lang.label}
              </Text>
              {selected === lang.code && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title={t('languagePicker.confirm')}
          onPress={handleConfirm}
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
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl * 2,
    paddingBottom: spacing.xxl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.heading1,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
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
  checkmark: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '700',
  },
  footer: {
    paddingTop: spacing.lg,
  },
});
