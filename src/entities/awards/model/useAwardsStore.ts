import AsyncStorage from '@react-native-async-storage/async-storage';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  getAllHabitTime,
  getCurrentAllHabitStreamDays,
  getCurrentHabitStreamDays,
  getOverNumericHabitResults,
  getOverTimeHabitResults,
} from '../../../app/lib/awards';
import { awards } from '../constants/awards';

import { NumericHabitResults, TimerHabitResult } from '../../../shared/types/';
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
  checkAllStreamAwards: (allCompletedDays: string[][]) => void;
  checkHabitStreamAwards: (allCompletedDays: string[][]) => void;
  checkOvertopAwards: (
    timerHabitResults: TimerHabitResult[],
    numericHabitResults: NumericHabitResults[],
  ) => void;
  checkTimeAwards: (timerHabitResults: TimerHabitResult[]) => void;
};

const earnedAwardsKeys = Object.keys(awards);
const earnedAwards: AwardsListState[] = earnedAwardsKeys.map((key) => ({
  category: key as AwardsCategoryNames,
  currentLevel: 0,
  currentProgress: 0,
  list: [],
}));

export const useAwardsStore = create<State & Action>()(
  persist(
    immer((set) => ({
      earnedAwardsList: earnedAwards,
      loading: false,
      error: null,

      updateActivityAwardsData: (completedTasksNumber: number) =>
        set((state) => {
          const type = 'activity';
          const foundedCategory = state.earnedAwardsList.find(
            (award) => award.category === type,
          );

          if (!foundedCategory) return;

          foundedCategory.currentProgress = completedTasksNumber;

          const completedAwards = awards[type].levels.filter(
            (level) => completedTasksNumber >= level.goal,
          );
          const newLevel = completedAwards?.length ?? 0;

          if (newLevel < foundedCategory.currentLevel) return;

          foundedCategory.currentLevel = newLevel;
          const existingAwards = foundedCategory.list;

          foundedCategory.list = completedAwards.map((award, index) => {
            const existingAward = existingAwards[index];

            return {
              ...award,
              category: type,
              earnedAt: existingAward?.earnedAt ?? new Date(),
            };
          });
        }),

      checkAllStreamAwards: (allCompletedDays) =>
        set((state) => {
          const type = 'all_stream';
          const streamDays = getCurrentAllHabitStreamDays(allCompletedDays);

          const foundedCategory = state.earnedAwardsList.find(
            (award) => award.category === type,
          );

          if (!foundedCategory) return;

          foundedCategory.currentProgress = streamDays;

          const completedAwards = awards[type].levels.filter(
            (level) => streamDays >= level.goal,
          );
          const newLevel = completedAwards?.length ?? 0;

          if (newLevel < foundedCategory.currentLevel) return;

          foundedCategory.currentLevel = newLevel;
          const existingAwards = foundedCategory.list;

          foundedCategory.list = completedAwards.map((award, index) => {
            const existingAward = existingAwards[index];

            return {
              ...award,
              category: type,
              earnedAt: existingAward?.earnedAt ?? new Date(),
            };
          });
        }),

      checkHabitStreamAwards: (allCompletedDays: string[][]) =>
        set((state) => {
          const type = 'one_stream';
          const streamDays = getCurrentHabitStreamDays(allCompletedDays);

          const foundedCategory = state.earnedAwardsList.find(
            (award) => award.category === type,
          );

          if (!foundedCategory) return;

          foundedCategory.currentProgress = streamDays;

          const completedAwards = awards[type].levels.filter(
            (level) => streamDays >= level.goal,
          );
          const newLevel = completedAwards?.length ?? 0;

          if (newLevel < foundedCategory.currentLevel) return;

          foundedCategory.currentLevel = newLevel;
          const existingAwards = foundedCategory.list;

          foundedCategory.list = completedAwards.map((award, index) => {
            const existingAward = existingAwards[index];

            return {
              ...award,
              category: type,
              earnedAt: existingAward?.earnedAt ?? new Date(),
            };
          });
        }),

      checkOvertopAwards: (
        timerHabitResults: TimerHabitResult[],
        numericHabitResults: NumericHabitResults[],
      ) =>
        set((state) => {
          const type = 'overtop';
          const overTimeResult = getOverTimeHabitResults(timerHabitResults);
          const overNumericResult =
            getOverNumericHabitResults(numericHabitResults);

          const totalResult = overTimeResult + overNumericResult;

          const foundedCategory = state.earnedAwardsList.find(
            (award) => award.category === type,
          );

          if (!foundedCategory) return;

          foundedCategory.currentProgress = totalResult;

          const completedAwards = awards[type].levels.filter(
            (level) => totalResult >= level.goal,
          );
          const newLevel = completedAwards?.length ?? 0;

          if (newLevel < foundedCategory.currentLevel) return;

          foundedCategory.currentLevel = newLevel;
          const existingAwards = foundedCategory.list;

          foundedCategory.list = completedAwards.map((award, index) => {
            const existingAward = existingAwards[index];

            return {
              ...award,
              category: type,
              earnedAt: existingAward?.earnedAt ?? new Date(),
            };
          });
        }),

      checkTimeAwards: (timerHabitResults: TimerHabitResult[]) =>
        set((state) => {
          const type = 'time';
          const allTimes = getAllHabitTime(timerHabitResults);

          const foundedCategory = state.earnedAwardsList.find(
            (award) => award.category === type,
          );

          if (!foundedCategory) return;

          foundedCategory.currentProgress = allTimes;

          const completedAwards = awards[type].levels.filter(
            (level) => allTimes >= level.goal,
          );
          const newLevel = completedAwards?.length ?? 0;

          if (newLevel < foundedCategory.currentLevel) return;

          foundedCategory.currentLevel = newLevel;
          const existingAwards = foundedCategory.list;

          foundedCategory.list = completedAwards.map((award, index) => {
            const existingAward = existingAwards[index];

            return {
              ...award,
              category: type,
              earnedAt: existingAward?.earnedAt ?? new Date(),
            };
          });
        }),
    })),
    {
      name: 'awards',
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        earnedAwardsList: state.earnedAwardsList,
      }),
    },
  ),
);
