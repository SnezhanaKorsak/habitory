import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';

import { useHabitsStore } from '../../../entities/habits';
import { IconButton, PageTitle } from '../../../shared/ui';
import { Layout } from '../../../widgets';
import { HabitCard } from '../../../widgets/habit-card';
import { EmptyAlert } from './EmptyAlert';

import { StackNavigationProp } from '../../../shared/types';

export const HabitsPage = () => {
  const navigation = useNavigation<StackNavigationProp>();
  const habitsList = useHabitsStore((state) => state.habits);
  const { t } = useTranslation();

  const isEmptyList = habitsList?.length === 0;

  const navigateToSettings = () => navigation.navigate('Settings');

  return (
    <Layout>
      <PageTitle
        title={t('habits.title')}
        rightAddon={
          <IconButton
            icon="settings"
            iconType="feather"
            size={32}
            callback={navigateToSettings}
          />
        }
      />

      {isEmptyList ? (
        <EmptyAlert />
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
        >
          {habitsList.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </ScrollView>
      )}
    </Layout>
  );
};
