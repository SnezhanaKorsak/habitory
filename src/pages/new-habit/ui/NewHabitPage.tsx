import React, { useState } from 'react';

import { IconButton, PageTitle } from '../../../shared/ui';
import { Layout } from '../../../widgets';
import { HabitForm, HabitFormData } from '../../../widgets/habit-form';

export const NewHabitPage = () => {
  const [form, setForm] = useState<HabitFormData>({
    type: 'check',
    name: '',
    description: '',
    icon: '',
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

      <HabitForm value={form} onChange={setForm} />
    </Layout>
  );
};
