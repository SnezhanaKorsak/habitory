import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useHabitsStore } from '../../../entities/habits';
import { Layout } from '../../../widgets';

export const HabitsPage = () => {
  const habitsList = useHabitsStore((state) => state.habits);
  // AsyncStorage.removeItem('habits');
  console.log('habitsList', habitsList);

  return (
    <Layout>
      <Text>Habits Page</Text>
    </Layout>
  );
};
