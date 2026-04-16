import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useHabitsStore } from '../../../entities/habits';
import { PageTitle } from '../../../shared/ui';
import { Layout } from '../../../widgets';
import { HabitCard } from '../../../widgets/habit-card';

export const HabitsPage = () => {
  const habitsList = useHabitsStore((state) => state.habits);
  // AsyncStorage.removeItem('habits');
  //console.log('habitsList', habitsList);

  return (
    <Layout>
      <PageTitle title="Habbits" />
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
