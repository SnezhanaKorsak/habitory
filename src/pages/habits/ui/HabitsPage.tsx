import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAwardsStore } from '../../../entities/awards';
import { useHabitsStore } from '../../../entities/habits';
import { useProgressStore } from '../../../entities/progress/model/useProgressStore';
import { ConfirmOperationModal } from '../../../features';
import { IconButton, PageTitle } from '../../../shared/ui';
import { Layout } from '../../../widgets';
import { HabitCard } from '../../../widgets/habit-card';

export const HabitsPage = () => {
  const habitsList = useHabitsStore((state) => state.habits);
  const resetHabits = useHabitsStore((state) => state.reset);
  const resetAwards = useAwardsStore((state) => state.reset);
  const resetProgress = useProgressStore((state) => state.reset);

  const [isShowModal, setIsShowModal] = useState(false);

  const confirmAction = () => setIsShowModal(true);

  const clearAll = async () => {
    await AsyncStorage.clear();
    resetHabits();
    resetAwards();
    resetProgress();
    setIsShowModal(false);
  };

  const cancelOperation = () => setIsShowModal(false);

  return (
    <Layout>
      <PageTitle
        title="Habits"
        rightAddon={
          <IconButton
            icon="clear"
            iconType="antDesign"
            size={32}
            callback={confirmAction}
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

      {isShowModal && (
        <ConfirmOperationModal
          title="Do you want to delete all the data?"
          description="If you do this, you will delete all habits, current progress, and awards. You will not be able to recover this data later."
          isShowModal={isShowModal}
          onCancelOperation={cancelOperation}
          onConfirmOperation={clearAll}
        />
      )}
    </Layout>
  );
};
