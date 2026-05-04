import { useHabitsStore } from '../../entities/habits';
import { useProgressStore } from '../../entities/progress/model/useProgressStore';
import { calculateDailyXP, getDateString } from '../../shared/lib';

export const initProgressSync = () => {
  useHabitsStore.subscribe((state) => {
    const habits = state.habits;
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
  });
};
