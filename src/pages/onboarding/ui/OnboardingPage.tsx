import { Image, StyleSheet, Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../../../app/theme';
import { useAppSettings } from '../../../shared/config/i18n/useAppSettings';
import { LoadingDots } from '../../../shared/ui';

export const OnboardingPage = () => {
  const { top } = useSafeAreaInsets();
  const { t } = useTranslation();

  const { language, fonts } = useAppSettings();
  const styles = languageStyles[language];

  return (
    <View
      style={{
        ...commonStyles.container,
        paddingTop: top * 2,
      }}
    >
      <View>
        <Text style={[styles.title, { fontFamily: fonts.bold }]}>
          {t('onboarding.title')}
        </Text>
        <Text style={[styles.description, { fontFamily: fonts.decorative }]}>
          {t('onboarding.subtitle')}
        </Text>
      </View>

      <LoadingDots />

      <Image
        source={require('../../../../assets/bg-image.jpg')}
        style={commonStyles.img}
        resizeMode="contain"
      />
    </View>
  );
};

const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: theme.bgPrimary,
  },
  img: {
    width: '100%',
    height: 500,
  },
});

const languageStyles = {
  en: StyleSheet.create({
    title: {
      fontSize: 64,
      textAlign: 'center',
    },
    description: {
      marginTop: 0,
      marginBottom: 20,
      fontSize: 24,
      textAlign: 'center',
      color: theme.accent100,
    },
  }),

  ru: StyleSheet.create({
    title: {
      fontSize: 56,
      lineHeight: 66,
      letterSpacing: -1.5,
      textAlign: 'center',
    },
    description: {
      marginTop: 12,
      marginBottom: 0,
      fontSize: 24,
      lineHeight: 36,
      textAlign: 'center',
      color: theme.accent100,
    },
  }),
};
