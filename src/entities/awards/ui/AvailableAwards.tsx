import { FlatList, StyleSheet, View } from 'react-native';

import { PageTitle } from '../../../shared/ui';
import { awards } from '../constants/awards';
import { AwardBadge } from './AwardBadge';

import { AwardsList, AwardsListState } from '../types/award-categories';

export const AvailableAwards = () => {
  //from store
  const earnedAwardsList: AwardsListState[] = [
    { category: 'activity', currentLevel: 2, currentProgress: 20 },
    { category: 'all_stream', currentLevel: 0, currentProgress: 0 },
    { category: 'one_stream', currentLevel: 1, currentProgress: 20 },
    { category: 'overtop', currentLevel: 3, currentProgress: 20 },
    { category: 'time', currentLevel: 0, currentProgress: 0 },
  ];

  const availableAwards: AwardsList[] = earnedAwardsList.map(
    ({ category, currentLevel }) => ({
      category,
      award: awards[category].levels[currentLevel],
    }),
  );

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
            awardInfo={awards[item.category]}
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
