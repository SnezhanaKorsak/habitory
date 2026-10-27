import { HabitType } from '../types/habit';

export const habitTypeTranslateKeys: Record<HabitType, string> = {
  [HabitType.check]: 'habitTypes.check',
  [HabitType.numeric]: 'habitTypes.numeric',
  [HabitType.time]: 'habitTypes.time',
};

export const validateErrorTranslateKeys: Record<string, string> = {
  type: 'formErrors.type',
  name: 'formErrors.name',
  icon: 'formErrors.icon',
  color: 'formErrors.color',
  numericGoal: 'formErrors.numericGoal',
  timerGoal: 'formErrors.timerGoal',
};
