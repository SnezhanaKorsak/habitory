import { useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { initProgressSync } from './model/initProgressSync';
import { RootNavigation } from './navigation/RootNavigation';
import { FontsProvider } from './providers/FontsProvider';

export default function App() {
  useEffect(() => {
    initProgressSync();
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <FontsProvider>
          <RootNavigation />
        </FontsProvider>
      </SafeAreaProvider>

      <Toast />
      <StatusBar style="auto" />
    </>
  );
}
