import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { theme } from '../../../app/theme';
import {
  type AppLanguage,
  changeAppLanguage,
} from '../../../shared/config/i18n';

export const LanguageController = () => {
  const { t, i18n } = useTranslation();

  const language: AppLanguage = i18n.resolvedLanguage === 'ru' ? 'ru' : 'en';

  const handleLanguageChange = async (nextLanguage: AppLanguage) => {
    try {
      await changeAppLanguage(nextLanguage);
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('Failed to change language:', error);
    }
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Feather name="globe" size={22} color={theme.accent100} />

        <View style={styles.sectionText}>
          <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
          <Text style={styles.sectionDescription}>
            {t('settings.languageDescription')}
          </Text>
        </View>
      </View>

      <View style={styles.languageSelector}>
        <Pressable
          accessibilityRole="radio"
          accessibilityState={{ checked: language === 'en' }}
          onPress={() => void handleLanguageChange('en')}
          style={[
            styles.languageOption,
            language === 'en' && styles.languageOptionActive,
          ]}
        >
          <Text
            style={[
              styles.languageText,
              language === 'en' && styles.languageTextActive,
            ]}
          >
            English
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="radio"
          accessibilityState={{ checked: language === 'ru' }}
          onPress={() => void handleLanguageChange('ru')}
          style={[
            styles.languageOption,
            language === 'ru' && styles.languageOptionActive,
          ]}
        >
          <Text
            style={[
              styles.languageText,
              language === 'ru' && styles.languageTextActive,
            ]}
          >
            Русский
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  section: {
    backgroundColor: theme.bgSecondary,
    borderRadius: 20,
    padding: 18,
    gap: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionText: {
    flex: 1,
    gap: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#171717',
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: '#666666',
  },
  languageSelector: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 12,
    backgroundColor: '#EAE3D5',
    gap: 4,
  },
  languageOption: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageOptionActive: {
    backgroundColor: theme.accent100,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#171717',
  },
  languageTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
