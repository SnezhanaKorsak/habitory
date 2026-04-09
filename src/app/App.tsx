import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigation } from './navigation/RootNavigation';
import { FontsProvider } from './providers/FontsProvider';

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <FontsProvider>
          <RootNavigation />
        </FontsProvider>
      </SafeAreaProvider>

      <StatusBar style="auto" />
    </>
  );
}
