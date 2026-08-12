import { useAwardsStore } from '../../entities/awards';
import { useHabitsStore } from '../../entities/habits';
import { useProgressStore } from '../../entities/progress/model/useProgressStore';
import { calculateDailyXP, getDateString } from '../../shared/lib';

import { HabitType } from '../../shared/types/habit';

export const initProgressSync = () => {
  useHabitsStore.subscribe((state) => {
    const habits = state.habits;
    const completedTasks: string[] = habits
      .map((habit) => habit.completedDays)
      .flat();
    const allCompletedDays: string[][] = habits.map(
      (habit) => habit.completedDays,
    );
    const timerHabitResults = habits
      .filter((habit) => habit.type === HabitType.time)
      .map((habit) => ({
        timerGoal: habit.timerGoal!,
        timeResults: habit.timeResults!,
      }));

    const numericHabitResults = habits
      .filter((habit) => habit.type === HabitType.numeric)
      .map((habit) => ({
        numericGoal: habit.numericGoal!,
        numericResults: habit.numericResults!,
      }));

    const progress = useProgressStore.getState();

    const today = getDateString(new Date());

    const todayXP = calculateDailyXP(habits, today);
    const prevXP = progress.xpByDay[today] || 0;
    const diff = todayXP - prevXP;

    if (diff !== 0) {
      if (diff > 0) {
        useProgressStore.getState().addXP(diff);
      } else {
        useProgressStore.getState().subtractXP(Math.abs(diff));
      }
    }

    useProgressStore.getState().setXPForDay(today, todayXP);

    if (todayXP > 0) {
      useProgressStore.getState().setLastActivityDate(today);
    }

    if (completedTasks.length > 0) {
      useAwardsStore.getState().updateActivityAwardsData(completedTasks.length);
      useAwardsStore.getState().checkAllStreamAwards(allCompletedDays);
      useAwardsStore.getState().checkHabitStreamAwards(allCompletedDays);
      useAwardsStore
        .getState()
        .checkOvertopAwards(timerHabitResults, numericHabitResults);
    }
  });
};
