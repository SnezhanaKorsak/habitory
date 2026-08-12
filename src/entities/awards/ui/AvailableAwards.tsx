import { FlatList, StyleSheet, View } from 'react-native';

import { PageTitle } from '../../../shared/ui';
import { awards } from '../constants/awards';
import { useAwardsStore } from '../model/useAwardsStore';
import { AwardBadge } from './AwardBadge';

import { AwardsList } from '../types/award-categories';

export const AvailableAwards = () => {
  const earnedAwardsList = useAwardsStore((state) => state.earnedAwardsList);

  const availableAwards: (AwardsList & { currentProgress: number })[] =
    earnedAwardsList.map(({ category, currentLevel, currentProgress }) => {
      const currentAward = awards[category].levels[currentLevel];
      const previousAward = awards[category].levels[currentLevel - 1];

      const awardProgress = previousAward
        ? currentProgress - previousAward.goal
        : currentProgress;

      return {
        category,
        award: currentAward,
        currentProgress: awardProgress > 0 ? awardProgress : currentProgress,
      };
    });

  return (
    <View style={styles.container}>
      <PageTitle title={'Available awards'} />

      <FlatList
        data={availableAwards}
        keyExtractor={({ category, award }) => `${category}_${award.level}`}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <AwardBadge
            isEarned={false}
            award={item.award}
            awardInfo={{
              ...awards[item.category],
              currentProgress: item.currentProgress,
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
    marginHorizontal: 10,
  },
});
