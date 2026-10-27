import { useNavigation } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';

import { theme } from '../../../app/theme';
import { useHabitsStore } from '../../../entities/habits';
import { validateErrorTranslateKeys } from '../../../shared/config/translationMapper';
import { validateHabitForm } from './validation';

import { HabitFormData, StackNavigationProp } from '../../../shared/types';
import { Habit } from '../../../shared/types/habit';

export const useCreateHabit = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const addHabit = useHabitsStore((state) => state.addHabit);
  const { t } = useTranslation();

  const createHabit = (formData: HabitFormData) => {
    const error = validateHabitForm(formData);

    if (error) {
      Toast.show({
        type: 'error',
        text2: t(validateErrorTranslateKeys[error]),
        position: 'bottom',
        keyboardOffset: 120,
        text2Style: {
          color: theme.textPrimary,
          fontSize: 18,
          fontFamily: 'NeuchaRegular',
        },
      });
      return;
    }

    const newHabit: Habit = {
      id: uuid.v4() as string,
      ...formData,
      createdAt: new Date(),
      completedDays: [],
      numericResults: {},
      timeResults: {},
    };

    addHabit(newHabit);

    navigation.navigate('Habits');
  };

  return { createHabit };
};
