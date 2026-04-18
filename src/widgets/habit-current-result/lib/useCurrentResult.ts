import { Habit, HabitType } from '../../../shared/types/habit';

export const useCurrentResult = (habit: Habit) => {
  const today = new Date().toLocaleDateString('en-CA');

  let habitResult;
  let goal;
  let unit;

  if (habit.type === HabitType.numeric) {
    habitResult = habit.numericResults[today] ?? 0;
    goal = habit.numericGoal ?? 0;
    unit = habit.numericUnit ?? '';
  }

  if (habit.type === HabitType.time) {
    habitResult = habit.timeResults[today] ?? 0;
    goal = habit.timerGoal ?? 0;
  }

  return {
    habitResult: habitResult ?? 0,
    goal: goal ?? 0,
    unit: unit ?? '',
    day: today,
  };
};
