import { useTranslation } from 'react-i18next';

import type { AppLanguage } from './index';
import { getFonts } from '../typography';

export const useAppSettings = () => {
  const { i18n } = useTranslation();

  const language: AppLanguage = i18n.resolvedLanguage === 'ru' ? 'ru' : 'en';
  const fonts = getFonts(language);

  return {
    fonts,
    language,
  }
};
