import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  initI18n,
  getStoredLanguage,
  changeLanguage as changeI18nLanguage,
  type SupportedLanguage,
} from './index';
import { initializeSeedData } from '../content/seedLoader';

interface LanguageContextValue {
  language: SupportedLanguage;
  isReady: boolean;
  isFirstLaunch: boolean;
  changeLanguage: (lang: SupportedLanguage) => Promise<void>;
  completeLanguageSetup: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  isReady: false,
  isFirstLaunch: false,
  changeLanguage: async () => {},
  completeLanguageSetup: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    (async () => {
      const stored = await getStoredLanguage();
      setIsFirstLaunch(stored === null);
      await initI18n(stored ?? undefined);
      await initializeSeedData();
      setIsReady(true);
    })();
  }, []);

  const changeLanguage = useCallback(async (lang: SupportedLanguage) => {
    await changeI18nLanguage(lang);
  }, []);

  const completeLanguageSetup = useCallback(() => {
    setIsFirstLaunch(false);
  }, []);

  const language = (i18n.language ?? 'en') as SupportedLanguage;

  return (
    <LanguageContext.Provider
      value={{ language, isReady, isFirstLaunch, changeLanguage, completeLanguageSetup }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
