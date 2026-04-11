import React, { useState } from 'react';

import { HabitType } from '../../../entities/habit';
import { IconButton, PageTitle } from '../../../shared/ui';
import { Layout } from '../../../widgets';
import { HabitForm, HabitFormData } from '../../../widgets/habit-form';

import { FeatherIconName } from '../../../shared/types';

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
