import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';

import { useHabitsStore } from '../../../entities/habits';
import { validateHabitForm } from './validation';

import { HabitFormData } from '../../../shared/types';
import { Habit } from '../../../shared/types/habit';

export const createNewHabit = (formData: HabitFormData) => {
  const addHabit = useHabitsStore.getState().addHabit;

  const error = validateHabitForm(formData);

  if (error) {
    return Toast.show({
      type: 'error',
      text1: error,
      position: 'bottom',
      keyboardOffset: 120,
    });
  }

  const newHabit: Habit = {
    id: uuid.v4(),
    ...formData,
    completed: false,
    createdAt: new Date(),
    numericCurrentValue: 0,
    timerCurrentValue: 0,
  };

  addHabit(newHabit);
};
