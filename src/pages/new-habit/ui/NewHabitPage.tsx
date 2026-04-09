import React from 'react';
import { Text } from 'react-native';

import { SaveNewHabit } from '../../../features/save-new-habbit';
import { Layout } from '../../../widgets';

export const NewHabitPage = () => {
  return (
    <Layout>
      <SaveNewHabit />
      <Text>Add Habit Page</Text>
    </Layout>
  );
};
