import { useNavigation } from '@react-navigation/native';

import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';

import { useHabitsStore } from '../../../entities/habits';
import { validateHabitForm } from './validation';

import { HabitFormData, StackNavigationProp } from '../../../shared/types';
import { Habit } from '../../../shared/types/habit';

export const useCreateHabit = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const addHabit = useHabitsStore((state) => state.addHabit);

  const createHabit = (formData: HabitFormData) => {
    const error = validateHabitForm(formData);

    if (error) {
      Toast.show({
        type: 'error',
        text1: error,
        position: 'bottom',
        keyboardOffset: 120,
      });
      return;
    }

    const newHabit: Habit = {
      id: uuid.v4() as string,
      ...formData,
      createdAt: new Date(),
      completedDays: [],
      numericTypeResults: [],
      timeTypeResults: [],
    };

    addHabit(newHabit);

    navigation.navigate('Habits');
  };

  return { createHabit };
};
