import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from './locales/en';
import { ru } from './locales/ru';

import 'intl-pluralrules';

export type AppLanguage = 'en' | 'ru';

export const LANGUAGE_STORAGE_KEY = 'language';

const resources = {
  en: { translation: en },
  ru: { translation: ru },
};

const isAppLanguage = (value: string | null): value is AppLanguage =>
  value === 'en' || value === 'ru';

export const initI18n = async (): Promise<void> => {
  const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

  await i18n.use(initReactI18next).init({
    resources,
    lng: isAppLanguage(savedLanguage) ? savedLanguage : 'en',
    fallbackLng: 'en',
    compatibilityJSON: 'v4',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
};

export const changeAppLanguage = async (
  language: AppLanguage,
): Promise<void> => {
  await i18n.changeLanguage(language);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

export default i18n;
