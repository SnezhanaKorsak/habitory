import { useNavigation } from '@react-navigation/native';

import Toast from 'react-native-toast-message';

import { useHabitsStore } from '../../../entities/habits';
import { validateHabitForm } from './validation';

import { HabitFormData, StackNavigationProp } from '../../../shared/types';

export const useUpdateHabit = (habitId: string) => {
  const navigation = useNavigation<StackNavigationProp>();
  const updateHabit = useHabitsStore((state) => state.updateHabit);

  const editHabit = (formData: HabitFormData) => {
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

    updateHabit(habitId, formData);

    navigation.navigate('Habits');
  };

  return { editHabit };
};
