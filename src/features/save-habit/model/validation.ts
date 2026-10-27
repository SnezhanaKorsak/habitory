import { HabitFormData } from '../../../shared/types';
import { HabitType } from '../../../shared/types/habit';

export const validateHabitForm = (data: HabitFormData) => {
  if (!data.type) {
    return 'type';
  }

  if (!data.name.trim()) {
    return 'name';
  }

  if (!data.icon) {
    return 'icon';
  }

  if (!data.color) {
    return 'color';
  }

  if (data.type === HabitType.numeric && !data.numericGoal) {
    return 'numericGoal';
  }

  if (data.type === HabitType.time && !data.timerGoal) {
    return 'timerGoal';
  }

  return null;
};
