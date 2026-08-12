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
}));

export const useAwardsStore = create<State & Action>()(
  persist(
    immer((set) => ({
      earnedAwardsList: earnedAwards,
      loading: false,
      error: null,

      updateActivityAwardsData: (completedTasksNumber: number) =>
        set((state) => {
          const foundedCategory = state.earnedAwardsList.find(
            (award) => award.category === 'activity',
          );

          if (!foundedCategory) return;

          foundedCategory.currentProgress = completedTasksNumber;

          const newLevel =
            awards['activity'].levels.find(
              (level) => completedTasksNumber >= level.goal,
            )?.level ?? 0;

          foundedCategory.currentLevel = Math.max(
            foundedCategory.currentLevel,
            newLevel,
          );
        }),

      checkAllStreamAwards: (allCompletedDays) =>
        set((state) => {
          const streamDays = getCurrentAllHabitStreamDays(allCompletedDays);

          const foundedCategory = state.earnedAwardsList.find(
            (award) => award.category === 'all_stream',
          );

          if (!foundedCategory) return;

          foundedCategory.currentProgress = streamDays;

          const newLevel =
            awards['all_stream'].levels.find(
              (level) => streamDays >= level.goal,
            )?.level ?? 0;

          foundedCategory.currentLevel = Math.max(
            foundedCategory.currentLevel,
            newLevel,
          );
        }),

      checkHabitStreamAwards: (allCompletedDays: string[][]) =>
        set((state) => {
          const streamDays = getCurrentHabitStreamDays(allCompletedDays);

          const foundedCategory = state.earnedAwardsList.find(
            (award) => award.category === 'one_stream',
          );

          if (!foundedCategory) return;

          foundedCategory.currentProgress = streamDays;

          const newLevel =
            awards['one_stream'].levels.find(
              (level) => streamDays >= level.goal,
            )?.level ?? 0;

          foundedCategory.currentLevel = Math.max(
            foundedCategory.currentLevel,
            newLevel,
          );

          return state;
        }),

      checkOvertopAwards: (
        timerHabitResults: TimerHabitResult[],
        numericHabitResults: NumericHabitResults[],
      ) =>
        set((state) => {
          const overTimeResult = getOverTimeHabitResults(timerHabitResults);
          const overNumericResult =
            getOverNumericHabitResults(numericHabitResults);

          const totalResult = overTimeResult + overNumericResult;

          const foundedCategory = state.earnedAwardsList.find(
            (award) => award.category === 'overtop',
          );

          if (!foundedCategory) return;

          foundedCategory.currentProgress = totalResult;

          const newLevel =
            awards['overtop'].levels.find((level) => totalResult >= level.goal)
              ?.level ?? 0;

          foundedCategory.currentLevel = Math.max(
            foundedCategory.currentLevel,
            newLevel,
          );

          return state;
        }),

      checkTimeAwards: (timerHabitResults: TimerHabitResult[]) =>
        set((state) => {
          const allTimes = getAllHabitTime(timerHabitResults);

          const foundedCategory = state.earnedAwardsList.find(
            (award) => award.category === 'time',
          );

          if (!foundedCategory) return;

          foundedCategory.currentProgress = allTimes;

          const newLevel =
            awards['time'].levels.find((level) => allTimes >= level.goal)
              ?.level ?? 0;

          foundedCategory.currentLevel = Math.max(
            foundedCategory.currentLevel,
            newLevel,
          );

          return state;
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
