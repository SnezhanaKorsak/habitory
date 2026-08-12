import { addDays, getTodayString } from '../../shared/lib';

import { NumericHabitResults, TimerHabitResult } from '../../shared/types';

export const getCurrentHabitStreamDays = (
  allCompletedDays: string[][],
): number => {
  if (!allCompletedDays.length) {
    return 0;
  }

  // Собираем все дни всех привычек
  // и убираем дубликаты
  const uniqueCompletedDays = [...new Set(allCompletedDays.flat())].sort();

  if (!uniqueCompletedDays.length) {
    return 0;
  }

  const today = getTodayString();

  // Если сегодня ни одна привычка не выполнена,
  // текущая серия равна 0
  if (uniqueCompletedDays.at(-1) !== today) {
    return 0;
  }

  let streamDays = 1;

  // Идём от сегодняшнего дня назад
  for (let i = uniqueCompletedDays.length - 1; i > 0; i--) {
    const expectedPreviousDay = addDays(uniqueCompletedDays[i], -1);

    if (uniqueCompletedDays[i - 1] !== expectedPreviousDay) {
      break;
    }

    streamDays++;
  }

  return streamDays;
};

export const getOverTimeHabitResults = (timerHabits: TimerHabitResult[]) => {
  return timerHabits
    .map(
      ({ timerGoal, timeResults }) =>
        Object.values(timeResults).filter((result) => result > timerGoal)
          .length,
    )
    .reduce((acc, curr) => acc + curr, 0);
};

export const getOverNumericHabitResults = (
  numericHabits: NumericHabitResults[],
) => {
  return numericHabits
    .map(
      ({ numericGoal, numericResults }) =>
        Object.values(numericResults).filter((result) => result > numericGoal)
          .length,
    )
    .reduce((acc, curr) => acc + curr, 0);
};

export const getAllHabitTime = (timerHabits: TimerHabitResult[]) => {
  const allTime = timerHabits
    .map(({ timeResults }) =>
      Object.values(timeResults).reduce((acc, curr) => acc + curr, 0),
    )
    .reduce((acc, curr) => acc + curr, 0);

  return allTime / 60;
};
