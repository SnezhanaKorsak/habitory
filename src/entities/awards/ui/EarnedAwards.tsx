import { ScrollView, View } from 'react-native';

import { IconButton, PageTitle } from '../../../shared/ui';
import { awards } from '../constants/awards';
import { AwardBadge } from './AwardBadge';

import { AwardsList, AwardsListState } from '../types/award-categories';

export const EarnedAwards = () => {
  const earnedAwardsList: AwardsListState[] = [
    { category: 'activity', level: 1 },
    { category: 'one_stream', level: 1 },
    { category: 'overtop', level: 2 },
    { category: 'time', level: 2 },
  ];

  const earnedAwards: AwardsList[] = earnedAwardsList.map(
    ({ category, level }) => ({
      category,
      award: awards[category].levels[level - 1],
    }),
  );

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
