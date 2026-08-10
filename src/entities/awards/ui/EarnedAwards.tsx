import { ScrollView, View } from 'react-native';

import { IconButton, PageTitle } from '../../../shared/ui';
import { awards } from '../constants/awards';
import { useAwardsStore } from '../model/useAwardsStore';
import { AwardBadge } from './AwardBadge';

import { AwardsList } from '../types/award-categories';

export const EarnedAwards = () => {
  const earnedAwardsList = useAwardsStore((state) => state.earnedAwardsList);

  const earnedAwards: AwardsList[] = earnedAwardsList
    .filter(({ currentLevel }) => currentLevel > 0)
    .map(({ category, currentLevel }) => ({
      category,
      award: awards[category].levels[currentLevel - 1],
    }));

  if (earnedAwards.length === 0) return null;

  return (
    <View>
      <PageTitle
        title={'Earned awards'}
        rightAddon={<IconButton icon={'arrow-right'} callback={() => {}} />}
      />

      <ScrollView
        contentContainerStyle={{}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {earnedAwards.map(({ category, award }) => (
          <AwardBadge
            key={`${category}_${award.level}`}
            isEarned={true}
            award={award}
            awardInfo={awards[category]}
          />
        ))}
      </ScrollView>
    </View>
  );
};
