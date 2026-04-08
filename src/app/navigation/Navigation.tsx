import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboardingPage } from '../../pages';
import { routes } from './routes';

import {
  StackNavigationProp,
  TypeRootStackParamList,
} from '../../shared/types';

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

export const Navigation = () => {
  const navigation = useNavigation<StackNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Переход к главному экрану после 3 секунд
      navigation.reset({
        index: 0,
        routes: [{ name: 'Habits' }],
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        //contentStyle: { backgroundColor: theme.colors.bgColor },
        animation: 'slide_from_right',
        animationDuration: 300,
      }}
    >
      {routes.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};
