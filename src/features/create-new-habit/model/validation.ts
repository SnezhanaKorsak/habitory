import { HabitFormData } from '../../../shared/types';
import { HabitType } from '../../../shared/types/habit';

export const validateHabitForm = (data: HabitFormData) => {
  if (!data.name.trim()) {
    return 'Enter the name of the habit';
  }

  if (!data.icon) {
    return 'Select an icon';
  }

  if (!data.color) {
    return 'Select an color';
  }

  if (data.type === HabitType.numeric && !data.numericGoal) {
    return 'Specify a numerical goal';
  }

  if (data.type === HabitType.time && !data.timerGoal) {
    return 'Specify the goal for the timer';
  }

  return null;
};
