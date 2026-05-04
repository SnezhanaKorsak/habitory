import { Habit, HabitType } from '../types/habit';

export const calculateDailyXP = (habits: Habit[], day: string) => {
  let xp = 0;

  habits.forEach((habit) => {
    // привычки да/нет
    if (habit.type === HabitType.check && habit.completedDays.includes(day)) {
      xp += 10;
    }

    // привычки количественные
    if (habit.numericGoal && habit.numericResults[day]) {
      const value = habit.numericResults[day];
      const percent = value / habit.numericGoal;
      xp += Math.min(20, Math.floor(percent * 20));
    }

    // привычки таймер
    if (habit.timeResults[day]) {
      xp += habit.timeResults[day] / (60 * 5);
    }
  });

  return xp;
};
