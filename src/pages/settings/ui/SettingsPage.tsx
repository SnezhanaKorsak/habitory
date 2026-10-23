import { StyleSheet, View } from 'react-native';

import { theme } from '../../../app/theme';
import { DataManagementSection } from './DataManagmentSection';
import { Header } from './Header';
import { LanguageController } from './LanguageController';

export const SettingsPage = () => {
  return (
    <View style={styles.container}>
      <Header />

      <LanguageController />

      <DataManagementSection />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgPrimary,
    paddingHorizontal: 20,
    paddingTop: 44,
    gap: 20,
  },
});
