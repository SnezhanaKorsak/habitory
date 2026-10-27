import type { AppLanguage } from './i18n';

export const getFonts = (language: AppLanguage) => {
  if (language === 'ru') {
    return {
      regular: 'MarckScript-Regular',
      bold: 'PlayfairDisplay-Bold',
      decorative: 'NeuchaRegular',
      //decorative: 'MarckScript-Regular',
    };
  }

  return {
    bold: 'FastelarDemoRegular',
    regular: 'PlaypenSansDevaRegular',
    decorative: 'NeuchaRegular',
    //decorative: 'BritishTimes',
  };
};
