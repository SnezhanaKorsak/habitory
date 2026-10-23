import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { initI18n } from '../shared/config/i18n';
import { initProgressSync } from './model/initProgressSync';
import { RootNavigation } from './navigation/RootNavigation';
import { FontsProvider } from './providers/FontsProvider';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    initI18n()
      .catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error('Failed to initialize localization:', error);
      })
      .finally(() => {
        if (isMounted) {
          setIsReady(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    initProgressSync();
  }, []);

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E4DAC0',
        }}
      >
        <ActivityIndicator color="#C64A38" />
      </View>
    );
  }

  return (
    <>
      <SafeAreaProvider>
        <FontsProvider>
          <RootNavigation />
        </FontsProvider>
      </SafeAreaProvider>

      <Toast />
      <StatusBar style="dark" />
    </>
  );
}
