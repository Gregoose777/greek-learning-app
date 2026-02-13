import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { colors, typography, spacing, borderRadius } from '../../../src/theme';
import { Button } from '../../../src/components';
import { useLanguage } from '../../../src/i18n/LanguageProvider';
import { LANGUAGES, type SupportedLanguage } from '../../../src/i18n';
import { getUserProfile, updateUserProfile } from '../../../src/database';

export default function ChangeLanguageScreen() {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const router = useRouter();
  const [selected, setSelected] = useState<SupportedLanguage>(language);

  const handleSave = async () => {
    await changeLanguage(selected);

    // Update the user profile's reference language
    const profile = getUserProfile();
    if (profile) {
      updateUserProfile({ id: profile.id, referenceLanguage: selected });
    }

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('profile.referenceLanguage')}</Text>

      <View style={styles.options}>
        {LANGUAGES.map((lang) => (
          <Pressable
            key={lang.code}
            style={[
              styles.option,
              selected === lang.code && styles.optionSelected,
            ]}
            onPress={() => setSelected(lang.code)}
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

      <View style={styles.footer}>
        <Button title={t('common.save')} onPress={handleSave} size="lg" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  heading: {
    ...typography.heading2,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  options: {
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
    marginTop: spacing.xl,
  },
});
