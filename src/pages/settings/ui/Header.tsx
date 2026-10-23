import { StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { theme } from '../../../app/theme';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.header}>
      <View style={styles.headerIcon}>
        <Feather name="settings" size={24} color={theme.accent100} />
      </View>

      <View style={styles.headerText}>
        <Text style={styles.title}>{t('settings.title')}</Text>
        <Text style={styles.subtitle}>{t('settings.subtitle')}</Text>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: theme.bgSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#171717',
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    color: '#666666',
  },
});
