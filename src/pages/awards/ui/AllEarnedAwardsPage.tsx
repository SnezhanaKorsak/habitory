import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  AwardBadge,
  awards,
  AwardsList,
  useAwardsStore,
} from '../../../entities/awards';
import { IconButton, PageTitle } from '../../../shared/ui';
import { Layout } from '../../../widgets';

import { StackNavigationProp } from '../../../shared/types';

export const AllEarnedAwardsPage = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const earnedAwardsList = useAwardsStore((state) => state.earnedAwardsList);

  const earnedAwards: AwardsList[] = earnedAwardsList
    .filter(({ currentLevel }) => currentLevel > 0)
    .map(({ category, currentLevel }) => ({
      category,
      award: awards[category].levels[currentLevel - 1],
    }));

  if (earnedAwards.length === 0) return null;

  const goBack = () => navigation.goBack();

  return (
    <Layout>
      <PageTitle
        title={'Your awards'}
        leftAddon={<IconButton icon={'arrow-left'} callback={goBack} />}
      />

      <View style={styles.container}>
        <FlatList
          data={earnedAwards}
          keyExtractor={({ category, award }) => `${category}_${award.level}`}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <AwardBadge
              key={`${item.category}_${item.award.level}`}
              isEarned={true}
              award={item.award}
              awardInfo={awards[item.category]}
            />
          )}
        />
      </View>
    </Layout>
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
