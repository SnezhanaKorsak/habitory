import { useEffect, useState } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import { Navigation } from './Navigation';

export const RootNavigation = () => {
  const [currentRoute, setCurrentRoute] = useState<string | undefined>(
    undefined,
  );

  const navRef = useNavigationContainerRef();

  useEffect(() => {
    setCurrentRoute(navRef.getCurrentRoute()?.name);

    const listener = navRef.addListener('state', () =>
      setCurrentRoute(navRef.getCurrentRoute()?.name),
    );

    return () => navRef.removeListener('state', listener);
  }, []);

  return (
    <>
      <NavigationContainer ref={navRef}>
        <Navigation />
      </NavigationContainer>

      {/*{currentRoute && (
        <BottomMenu currentRoute={currentRoute} nav={navRef.navigate} />
      )}*/}
    </>
  );
};
