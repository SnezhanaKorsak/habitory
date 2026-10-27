import { useTranslation } from 'react-i18next';

import type { AppLanguage } from './index';

export const useAppLanguage = (): AppLanguage => {
  const { i18n } = useTranslation();

  return i18n.resolvedLanguage === 'ru' ? 'ru' : 'en';
};
