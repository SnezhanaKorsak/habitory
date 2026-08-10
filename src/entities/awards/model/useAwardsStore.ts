import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { awards } from '../constants/awards';

import {
  AwardsCategoryNames,
  AwardsListState,
} from '../types/award-categories';

type State = {
  earnedAwardsList: AwardsListState[];
  loading: boolean;
  error: string | null;
};

type Action = {
  updateActivityAwardsData: (completedTasks: number) => void;
};

const earnedAwardsKeys = Object.keys(awards);
const earnedAwards: AwardsListState[] = earnedAwardsKeys.map((key) => ({
  category: key as AwardsCategoryNames,
  currentLevel: 0,
  currentProgress: 0,
}));

export const useAwardsStore = create<State & Action>()(
  immer((set, get) => ({
    earnedAwardsList: earnedAwards,
    loading: false,
    error: null,

    updateActivityAwardsData: (completedTasks: number) =>
      set((state) => {
        const foundedCategory = state.earnedAwardsList.find(
          (award) => award.category === 'activity',
        );

        if (!foundedCategory) return;

        foundedCategory.currentProgress = completedTasks;
        foundedCategory.currentLevel =
          awards['activity'].levels.find(
            (level) => completedTasks >= level.goal,
          )?.level ?? 0;
      }),
  })),
);
