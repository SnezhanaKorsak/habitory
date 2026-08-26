import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IconButton, PageTitle } from '../../../shared/ui';
import { awards } from '../constants/awards';
import { useAwardsStore } from '../model/useAwardsStore';
import { AwardBadge } from './AwardBadge';

import { StackNavigationProp } from '../../../shared/types';
import { EarnedAwardsList } from '../types/award-categories';

export const EarnedAwards = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const earnedAwardsList = useAwardsStore((state) => state.earnedAwardsList);

  const earnedAwards: EarnedAwardsList[] = earnedAwardsList
    .filter(({ currentLevel }) => currentLevel > 0)
    .map(({ category, list }) => ({
      category,
      awards: list,
    }));

  if (earnedAwards.length === 0) return null;

  const allList = earnedAwards
    .map(({ awards }) => awards)
    .flat()
    .sort(
      (a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime(),
    );

  const goToAllEarnedAwardsPage = () => {
    navigation.navigate('AllEarnedAwards');
  };

  return (
    <View>
      <PageTitle
        title={'Earned awards'}
        rightAddon={
          <IconButton icon={'arrow-right'} callback={goToAllEarnedAwardsPage} />
        }
      />

      <ScrollView
        contentContainerStyle={{}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {allList.map((award) => (
          <AwardBadge
            key={`${award.category}_${award.level}`}
            isEarned={true}
            award={award}
            awardInfo={awards[award.category]}
          />
        ))}
      </ScrollView>
    </View>
  );
};
