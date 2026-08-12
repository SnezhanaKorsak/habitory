import AsyncStorage from '@react-native-async-storage/async-storage';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  getAllHabitTime,
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
          foundedCategory.currentLevel =
            awards['activity'].levels.find(
              (level) => completedTasksNumber >= level.goal,
            )?.level ?? 0;
        }),

      checkAllStreamAwards: (allCompletedDays: string[][]) =>
        set((state) => {
          if (!allCompletedDays.length) {
            return;
          }

          // Берём даты первой привычки и оставляем только те,
          // которые есть у всех остальных привычек
          const allCompletedTogether = allCompletedDays[0]
            .filter((date) =>
              allCompletedDays.every((days) => days.includes(date)),
            )
            .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

          let maxStreamDays = 0;
          let currentStreamDays = 0;

          for (let i = 0; i < allCompletedTogether.length; i++) {
            if (i === 0) {
              currentStreamDays = 1;
              maxStreamDays = 1;
              continue;
            }

            const previousDate = new Date(allCompletedTogether[i - 1]);
            const currentDate = new Date(allCompletedTogether[i]);

            const diffInDays =
              (currentDate.getTime() - previousDate.getTime()) /
              (1000 * 60 * 60 * 24);

            if (diffInDays === 1) {
              currentStreamDays += 1;
            } else {
              currentStreamDays = 1;
            }

            maxStreamDays = Math.max(maxStreamDays, currentStreamDays);
          }

          const foundedCategory = state.earnedAwardsList.find(
            (award) => award.category === 'all_stream',
          );

          if (!foundedCategory) return;

          foundedCategory.currentProgress = maxStreamDays;
          foundedCategory.currentLevel =
            awards['all_stream'].levels.find(
              (level) => maxStreamDays >= level.goal,
            )?.level ?? 0;
        }),

      checkHabitStreamAwards: (allCompletedDays: string[][]) =>
        set((state) => {
          const streamDays = getCurrentHabitStreamDays(allCompletedDays);

          const foundedCategory = state.earnedAwardsList.find(
            (award) => award.category === 'one_stream',
          );

          if (!foundedCategory) return;

          foundedCategory.currentProgress = streamDays;
          foundedCategory.currentLevel =
            awards['one_stream'].levels.find(
              (level) => streamDays >= level.goal,
            )?.level ?? 0;

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
          foundedCategory.currentLevel =
            awards['overtop'].levels.find((level) => totalResult >= level.goal)
              ?.level ?? 0;

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
          foundedCategory.currentLevel =
            awards['time'].levels.find((level) => allTimes >= level.goal)
              ?.level ?? 0;

          return state;
        }),
    })),
    {
      name: 'awards',
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        awards: state.earnedAwardsList,
      }),
    },
  ),
);
