import React from 'react';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAwardsStore } from '../../../entities/awards';
import { useHabitsStore } from '../../../entities/habits';
import { useProgressStore } from '../../../entities/progress/model/useProgressStore';
import { IconButton, PageTitle } from '../../../shared/ui';
import { Layout } from '../../../widgets';
import { HabitCard } from '../../../widgets/habit-card';

export const HabitsPage = () => {
  const habitsList = useHabitsStore((state) => state.habits);
  const resetHabits = useHabitsStore((state) => state.reset);
  const resetAwards = useAwardsStore((state) => state.reset);
  const resetProgress = useProgressStore((state) => state.reset);

  const clearAll = async () => {
    await AsyncStorage.clear();
    resetHabits();
    resetAwards();
    resetProgress();
  };

  return (
    <Layout>
      <PageTitle
        title="Habbits"
        rightAddon={
          <IconButton
            icon="clear"
            iconType="antDesign"
            size={32}
            callback={clearAll}
          />
        }
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
      >
        {habitsList.map((habit) => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </ScrollView>
    </Layout>
  );
};
