import { StyleSheet, Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';

export const ProgressRules = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('rules.title')}</Text>

      <Text style={styles.rule}>{t('rules.title1')}</Text>
      <Text style={styles.ruleDescription}>{t('rules.rule1')}</Text>

      <Text style={styles.rule}>{t('rules.title2')}</Text>
      <Text style={styles.ruleDescription}>{t('rules.rule2')}</Text>

      <Text style={styles.rule}>{t('rules.title3')}</Text>
      <Text style={styles.ruleDescription}>{t('rules.rule3')}</Text>

      <Text style={styles.title}>{t('rules.title4')}</Text>
      <Text style={styles.ruleDescription}>{t('rules.rule4')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 20,
    textAlign: 'left',
    fontFamily: 'ShantellSans-Medium',
  },
  rule: {
    marginBottom: 4,
    fontSize: 18,
    fontFamily: 'ShantellSans-Medium',
  },
  ruleDescription: {
    marginBottom: 12,
    fontSize: 16,
    fontFamily: 'NeuchaRegular',
  },
});
