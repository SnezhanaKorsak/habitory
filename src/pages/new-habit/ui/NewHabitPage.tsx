import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { createNewHabit } from '../../../features/create-new-habit';
import { IconButton, PageTitle } from '../../../shared/ui';
import { Layout } from '../../../widgets';
import { HabitForm } from '../../../widgets/habit-form';

import {
  FeatherIconName,
  HabitFormData,
  StackNavigationProp,
} from '../../../shared/types';
import { HabitType } from '../../../shared/types/habit';

export const NewHabitPage = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const [form, setForm] = useState<HabitFormData>({
    type: HabitType.check,
    name: '',
    description: '',
    icon: '' as FeatherIconName,
    color: '',
  });

  const handleSave = () => {
    createNewHabit(form);
    navigation.navigate('Habits');
  };

  return (
    <Layout>
      <PageTitle
        title={'New Habit'}
        rightAddon={<IconButton icon="save" size={32} callback={handleSave} />}
      />

      <HabitForm form={form} setForm={setForm} />
    </Layout>
  );
};
