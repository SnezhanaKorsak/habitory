import { addDays, getTodayString } from '../../shared/lib';

import { NumericHabitResults, TimerHabitResult } from '../../shared/types';

export const getCurrentAllHabitStreamDays = (
  allCompletedDays: string[][],
): number => {
  if (!allCompletedDays.length) {
    return 0;
  }

  // Дни, в которые были выполнены ВСЕ привычки
  const allCompletedTogether = [
    ...new Set(
      allCompletedDays[0].filter((date) =>
        allCompletedDays.every((days) => days.includes(date)),
      ),
    ),
  ].sort();

  if (!allCompletedTogether.length) {
    return 0;
  }

  const today = getTodayString();
  const yesterday = addDays(today, -1);
  const lastCompletedDay = allCompletedTogether.at(-1);

  // Если все привычки последний раз были выполнены
  // раньше вчера — текущая серия прервана.
  if (lastCompletedDay !== today && lastCompletedDay !== yesterday) {
    return 0;
  }

  let currentStreamDays = 1;

  for (let i = allCompletedTogether.length - 1; i > 0; i--) {
    const expectedPreviousDay = addDays(allCompletedTogether[i], -1);

    if (allCompletedTogether[i - 1] !== expectedPreviousDay) {
      break;
    }

    currentStreamDays++;
  }

  return currentStreamDays;
};

export const getCurrentHabitStreamDays = (
  allCompletedDays: string[][],
): number => {
  if (!allCompletedDays.length) {
    return 0;
  }

  // Собираем все дни всех привычек и убираем дубликаты
  const uniqueCompletedDays = [...new Set(allCompletedDays.flat())].sort();

  if (!uniqueCompletedDays.length) {
    return 0;
  }

  const today = getTodayString();
  const yesterday = addDays(today, -1);
  const lastCompletedDay = uniqueCompletedDays.at(-1);

  // Серия продолжается, если последняя выполненная привычка
  // была сегодня или вчера.
  // Если раньше вчера — серия уже прервана.
  if (lastCompletedDay !== today && lastCompletedDay !== yesterday) {
    return 0;
  }

  let streamDays = 1;

  // Идём от последнего выполненного дня назад
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
