import { StyleSheet, View } from 'react-native';

import { theme } from '../../../app/theme';
import { HabitCardTitle } from '../../../entities/habits/ui/HabitCardTitle';
import { DeleteHabit } from '../../../features/delete-habit';
import { HabitHeatMap } from '../../../features/habit-heatmap/ui/HabitHeatMap';

import { Habit } from '../../../shared/types/habit';

type Props = {
  habit: Habit;
};

export const HabitCard = ({ habit }: Props) => {
  const { id, icon, name, description, color, completedDays } = habit;
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

      <HabitHeatMap habitId={id} color={color} completedDays={completedDays} />
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
});
