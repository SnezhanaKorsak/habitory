import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { useCreateHabit } from '../../../features';
import { IconButton, PageTitle } from '../../../shared/ui';
import { Loader } from '../../../shared/ui/Loader';
import { Layout } from '../../../widgets';
import { HabitForm } from '../../../widgets/habit-form';

import { FeatherIconName, HabitFormData } from '../../../shared/types';
import { HabitType } from '../../../shared/types/habit';

export const NewHabitPage = () => {
  const { createHabit } = useCreateHabit();
  const { t } = useTranslation();

  const [form, setForm] = useState<HabitFormData>({
    type: '' as HabitType,
    name: '',
    description: '',
    icon: '' as FeatherIconName,
    color: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    if (form.name && form.type && form.icon && form.color) {
      setIsLoading(true);
    }

    createHabit(form);
  };

  return (
    <Layout>
      <PageTitle
        title={t('newHabits.title')}
        rightAddon={<IconButton icon="save" size={32} callback={handleSave} />}
      />

      <HabitForm form={form} setForm={setForm} />

      {isLoading && (
        <View style={styles.loader}>
          <Loader />
        </View>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: '55%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
  },
});
