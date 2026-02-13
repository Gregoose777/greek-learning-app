import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';

const LANGUAGE_STORAGE_KEY = '@hellenica_language';

export type SupportedLanguage = 'en' | 'es' | 'fr';

export const LANGUAGES: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

/** Load the saved language from AsyncStorage, or return null if none saved. */
export async function getStoredLanguage(): Promise<SupportedLanguage | null> {
  const lang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (lang === 'en' || lang === 'es' || lang === 'fr') return lang;
  return null;
}

/** Save the selected language to AsyncStorage. */
export async function setStoredLanguage(lang: SupportedLanguage): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

/** Initialize i18n. Call once at app startup. */
export async function initI18n(language?: SupportedLanguage): Promise<void> {
  const storedLang = language ?? (await getStoredLanguage()) ?? 'en';

  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
    },
    lng: storedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
}

/** Change the language at runtime, persisting to storage. */
export async function changeLanguage(lang: SupportedLanguage): Promise<void> {
  await i18n.changeLanguage(lang);
  await setStoredLanguage(lang);
}

export default i18n;
