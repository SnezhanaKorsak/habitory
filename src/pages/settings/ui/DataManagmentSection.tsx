import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Feather } from '@expo/vector-icons';

import { theme } from '../../../app/theme';
import { useAwardsStore } from '../../../entities/awards';
import { useHabitsStore } from '../../../entities/habits';
import { useProgressStore } from '../../../entities/progress/model/useProgressStore';
import { ConfirmOperationModal } from '../../../features';

export const DataManagementSection = () => {
  const resetHabits = useHabitsStore((state) => state.reset);
  const resetAwards = useAwardsStore((state) => state.reset);
  const resetProgress = useProgressStore((state) => state.reset);

  const [isShowModal, setIsShowModal] = useState(false);

  const clearAll = async () => {
    await AsyncStorage.clear();
    resetHabits();
    resetAwards();
    resetProgress();
    setIsShowModal(false);
  };

  const confirmAction = () => setIsShowModal(true);
  const cancelOperation = () => setIsShowModal(false);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Feather name="database" size={22} color={theme.accent100} />

        <View style={styles.sectionText}>
          <Text style={styles.sectionTitle}>Data management</Text>
          <Text style={styles.sectionDescription}>Manage your app data</Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={confirmAction}
        style={({ pressed }) => [
          styles.clearButton,
          pressed && styles.clearButtonPressed,
        ]}
      >
        <Feather name="trash-2" size={18} color="#C64A38" />
        <Text style={styles.clearButtonText}>Clear all data</Text>
      </Pressable>

      <Text style={styles.warningText}>
        This action will permanently delete all your habits and progress.
      </Text>

      {isShowModal && (
        <ConfirmOperationModal
          title="Do you want to delete all the data?"
          description="If you do this, you will delete all habits, current progress, and awards. You will not be able to recover this data later."
          isShowModal={isShowModal}
          onCancelOperation={cancelOperation}
          onConfirmOperation={clearAll}
        />
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  section: {
    backgroundColor: theme.bgSecondary,
    borderRadius: 20,
    padding: 18,
    gap: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionText: {
    flex: 1,
    gap: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#171717',
  },
  sectionDescription: {
    fontSize: 13,
    lineHeight: 18,
    color: '#666666',
  },
  clearButton: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.accent100,
    borderRadius: 12,
  },
  clearButtonPressed: {
    backgroundColor: '#F0E2D8',
    opacity: 0.8,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.accent100,
  },
  warningText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#777067',
  },
});
