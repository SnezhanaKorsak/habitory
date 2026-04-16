import React, { useState } from 'react';

import { IconButton, PageTitle } from '../../../shared/ui';
import { Layout } from '../../../widgets';
import { HabitForm } from '../../../widgets/habit-form';

import { FeatherIconName, HabitFormData } from '../../../shared/types';
import { HabitType } from '../../../shared/types/habit';

export const NewHabitPage = () => {
  const [form, setForm] = useState<HabitFormData>({
    type: HabitType.check,
    name: '',
    description: '',
    icon: '' as FeatherIconName,
    color: '',
  });

  const handleSave = () => {
    console.log(form);
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
