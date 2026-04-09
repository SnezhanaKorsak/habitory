import React from 'react';

import { useFonts } from 'expo-font';

type Props = {
  children: React.ReactNode;
};

export const FontsProvider = ({ children }: Props) => {
  const [fontsLoaded] = useFonts({
    Timbly: require('../../../assets/fonts/Timbly.otf'),
    FastelarDemoRegular: require('../../../assets/fonts/FastelarDemoRegular.ttf'),
    BritishTimes: require('../../../assets/fonts/BritishTimes.ttf'),
  });

  if (!fontsLoaded) return null;

  return <>{children}</>;
};
