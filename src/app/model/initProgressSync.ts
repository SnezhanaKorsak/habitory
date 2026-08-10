import { useAwardsStore } from '../../entities/awards';
import { useHabitsStore } from '../../entities/habits';
import { useProgressStore } from '../../entities/progress/model/useProgressStore';
import { calculateDailyXP, getDateString } from '../../shared/lib';

export const initProgressSync = () => {
  useHabitsStore.subscribe((state) => {
    const habits = state.habits;
    const completedTasks: string[] = habits
      .map((habit) => habit.completedDays)
      .flat();

    const progress = useProgressStore.getState();
    const awards = useAwardsStore.getState();

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
    }
  });
};
