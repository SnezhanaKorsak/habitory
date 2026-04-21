import React, { useState } from 'react';

import { useCreateHabit } from '../../../features';
import { IconButton, PageTitle } from '../../../shared/ui';
import { Layout } from '../../../widgets';
import { HabitForm } from '../../../widgets/habit-form';

import { FeatherIconName, HabitFormData } from '../../../shared/types';
import { HabitType } from '../../../shared/types/habit';

export const NewHabitPage = () => {
  const { createHabit } = useCreateHabit();

  const [form, setForm] = useState<HabitFormData>({
    type: '' as HabitType,
    name: '',
    description: '',
    icon: '' as FeatherIconName,
    color: '',
  });

  const handleSave = () => {
    createHabit(form);
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
