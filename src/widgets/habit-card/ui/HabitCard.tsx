import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '../../../app/theme';
import { HabitCardTitle } from '../../../entities/habits';
import { CompleteCheckHabit , DeleteHabit , HabitHeatMap } from '../../../features';
import { HabitResultPanel } from '../../habit-current-result';

import { Habit, HabitType } from '../../../shared/types/habit';

type Props = {
  habit: Habit;
};

export const HabitCard = ({ habit }: Props) => {
  const [visibleCheckModal, setVisibleCheckModal] = useState(false);
  const [visibleNumericModal, setVisibleNumericModal] = useState(false);

  const { id, icon, name, description, color, completedDays, type } = habit;

  const openModal = () => {
    switch (type) {
      case HabitType.check:
        return setVisibleCheckModal(true);
      case HabitType.numeric:
      case HabitType.time:
        return setVisibleNumericModal(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HabitCardTitle
          id={id}
          title={name}
          description={description}
          icon={icon}
        />
        <DeleteHabit id={id} />
      </View>

      <HabitHeatMap
        color={color}
        completedDays={completedDays}
        openModal={openModal}
      />

      <CompleteCheckHabit
        habitId={id}
        visibleModal={visibleCheckModal}
        setVisible={setVisibleCheckModal}
      />

      <HabitResultPanel
        habit={habit}
        visible={visibleNumericModal}
        setVisible={setVisibleNumericModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 212,
    backgroundColor: theme.bgShadow,
    marginBottom: 20,
    borderRadius: 10,
    padding: 14,
  },
  pressed: {
    transform: [{ scale: 0.9 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heatMapContainer: {
    marginTop: 10,
    flexWrap: 'wrap',
  },
});
