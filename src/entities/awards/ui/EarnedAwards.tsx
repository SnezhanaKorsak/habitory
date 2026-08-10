import { ScrollView, View } from 'react-native';

import { IconButton, PageTitle } from '../../../shared/ui';
import { awards } from '../constants/awards';
import { AwardBadge } from './AwardBadge';

import { AwardsList, AwardsListState } from '../types/award-categories';

export const EarnedAwards = () => {
  //from store
  const earnedAwardsList: AwardsListState[] = [
    { category: 'activity', currentLevel: 2, currentProgress: 20 },
    { category: 'all_stream', currentLevel: 0, currentProgress: 0 },
    { category: 'one_stream', currentLevel: 1, currentProgress: 20 },
    { category: 'overtop', currentLevel: 3, currentProgress: 20 },
    { category: 'time', currentLevel: 0, currentProgress: 0 },
  ];

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
