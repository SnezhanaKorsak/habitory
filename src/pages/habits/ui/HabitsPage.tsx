import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useHabitsStore } from '../../../entities/habits';
import { IconButton, PageTitle } from '../../../shared/ui';
import { Layout } from '../../../widgets';
import { HabitCard } from '../../../widgets/habit-card';
import { EmptyAlert } from './EmptyAlert';

import { StackNavigationProp } from '../../../shared/types';

export const HabitsPage = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const habitsList = useHabitsStore((state) => state.habits);

  const isEmptyList = habitsList?.length === 0;

  const navigateToSettings = () => navigation.navigate('Settings');

  return (
    <Layout>
      <PageTitle
        title="Habits"
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
