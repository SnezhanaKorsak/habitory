import { StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { theme } from '../../../app/theme';
import { awards } from '../../../entities/awards';
import { getDateString } from '../../../shared/lib';
import { AnimatedGradientBackground } from '../../../shared/ui/AnimatedGradientBackground';
import { Layout } from '../../../widgets';

import { AwardsCategoryNames } from '../../../entities/awards/types/award-categories';
import { StackRouteProp } from '../../../shared/types/navigation';

export const AwardPage = () => {
  const { params } = useRoute<StackRouteProp<'Award'>>();

  const category = params.awardCategory as AwardsCategoryNames;
  const isEarned = params.isEarned;
  const earnedAt = params.earnedAt;

  const { currentLevel, levels } = awards[category];
  const { icon, name, description } = levels[currentLevel];

  const formatedEarnedDate = getDateString(new Date(earnedAt))
    ?.split('-')
    .reverse()
    .join('.');

  return (
    <Layout>
      <AnimatedGradientBackground />

      <View style={styles.content}>
        {isEarned ? (
          <Text style={styles.emoji}>{icon}</Text>
        ) : (
          <Text style={styles.question}>?</Text>
        )}

        <Text style={styles.title}>{name}</Text>
        {isEarned && <Text style={styles.date}>{formatedEarnedDate}</Text>}
        <Text style={styles.description}>{description}</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    marginTop: -100,
    fontSize: 150,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 24,
    color: theme.textSecondary,
    textAlign: 'center',
  },
  date: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 8,
  },
  question: {
    marginTop: -100,
    fontSize: 150,
  },
});
