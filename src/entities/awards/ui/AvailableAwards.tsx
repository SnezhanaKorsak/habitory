import { FlatList, StyleSheet, View } from 'react-native';

import { PageTitle } from '../../../shared/ui';
import { awards } from '../constants/awards';
import { AwardBadge } from './AwardBadge';

import {
  AwardsCategoryNames,
  AwardsList,
  AwardsListState,
} from '../types/award-categories';

export const AvailableAwards = () => {
  const awardKeys = Object.keys(awards) as AwardsCategoryNames[];

  const availableAwardsList: AwardsListState[] = awardKeys.map((key) => ({
    category: key,
    level: 2,
  }));

  const availableAwards: AwardsList[] = availableAwardsList.map(
    ({ category, level }) => ({
      category,
      award: awards[category].levels[level - 1],
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
