import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OnboardingPage } from '../../pages';
import { routes } from './routes';

import { TypeRootStackParamList } from '../../shared/types';

const Stack = createNativeStackNavigator<TypeRootStackParamList>();

export const Navigation = () => {
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreview(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        //contentStyle: { backgroundColor: theme.colors.bgColor },
        animation: 'slide_from_right',
        animationDuration: 300,
      }}
    >
      {showPreview ? (
        <Stack.Screen name="Onboarding" component={OnboardingPage} />
      ) : (
        routes.map(({ name, component }) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))
      )}
    </Stack.Navigator>
  );
};
