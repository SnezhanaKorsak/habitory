import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';

import { useHabitsStore } from '../../../entities/habits';
import { useUpdateHabit } from '../../../features/save-habit';
import { IconButton, PageTitle } from '../../../shared/ui';
import { Layout } from '../../../widgets';
import { HabitForm } from '../../../widgets/habit-form';

import { HabitFormData } from '../../../shared/types';
import { StackRouteProp } from '../../../shared/types/navigation';

export const EditHabitPage = () => {
  const { params } = useRoute<StackRouteProp>();

  const habit = useHabitsStore((state) => state.getHabitById(params.habitId))!;

  const [form, setForm] = useState<HabitFormData>(habit ?? {});
  const { editHabit } = useUpdateHabit(habit.id);

  if (!habit) return null;

  const handleSave = () => {
    editHabit(form);
  };

  return (
    <Layout>
      <PageTitle
        title={'Edit Habit'}
        rightAddon={<IconButton icon="save" size={32} callback={handleSave} />}
      />

      <HabitForm form={form} setForm={setForm} />
    </Layout>
  );
};
