import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../app/theme';

export const ProgressRules = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Как ты получаешь XP</Text>

      <Text style={styles.rule}>✔️ Да / нет привычки</Text>
      <Text style={styles.ruleDescription}>
        Просто выполни — и получи +10 XP
      </Text>

      <Text style={styles.rule}>🔢 Количественные привычки</Text>
      <Text style={styles.ruleDescription}>
        Чем больше сделал — тем больше XP (до 20 XP за цель)
      </Text>

      <Text style={styles.rule}>⏱ Таймер</Text>
      <Text style={styles.ruleDescription}>Каждые 5 минут +1 XP</Text>

      <Text style={styles.title}>Важно</Text>

      <Text style={styles.rule}>
        Пропустил день без активности — получишь −10 XP
      </Text>
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
    fontWeight: 'bold',
    textAlign: 'left',
  },
  rule: {
    fontSize: 18,
  },
  ruleDescription: {
    marginBottom: 8,
    fontSize: 16,
    color: theme.border,
  },
});
