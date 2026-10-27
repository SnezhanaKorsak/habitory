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
    PlaypenSansDevaRegular: require('../../../assets/fonts/PlaypenSansDeva-Regular.ttf'),
    NeuchaRegular: require('../../../assets/fonts/Neucha-Regular.ttf'),

    // Russian fonts
    'PlayfairDisplay-Bold': require('../../../assets/fonts/PlayfairDisplay-Bold.ttf'),
    'PlayfairDisplay-SemiBoldItalic': require('../../../assets/fonts/PlayfairDisplay-SemiBoldItalic.ttf'),
    'MarckScript-Regular': require('../../../assets/fonts/MarckScript-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return <>{children}</>;
};
