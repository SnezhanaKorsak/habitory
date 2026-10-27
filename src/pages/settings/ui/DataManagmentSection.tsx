import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { theme } from '../../../app/theme';
import { useAwardsStore } from '../../../entities/awards';
import { useHabitsStore } from '../../../entities/habits';
import { useProgressStore } from '../../../entities/progress/model/useProgressStore';
import { ConfirmOperationModal } from '../../../features';

export const DataManagementSection = () => {
  const { t } = useTranslation();

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
          <Text style={styles.sectionTitle}>
            {t('settings.dataManagement')}
          </Text>
          <Text style={styles.sectionDescription}>
            {t('settings.dataDescription')}
          </Text>
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
        <Feather name="trash-2" size={18} color={theme.accent100} />
        <Text style={styles.clearButtonText}>{t('settings.clearAllData')}</Text>
      </Pressable>

      <Text style={styles.warningText}>{t('settings.clearWarning')}</Text>

      {isShowModal && (
        <ConfirmOperationModal
          title={t('settings.modalTitle')}
          description={t('settings.modalDescription')}
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
    fontSize: 16,
    lineHeight: 18,
    color: '#171717',
    fontFamily: 'ShantellSans-Medium',
  },
  sectionDescription: {
    fontSize: 16,
    lineHeight: 18,
    color: '#666666',
    fontFamily: 'NeuchaRegular',
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
    fontSize: 16,
    fontWeight: '600',
    color: theme.accent100,
    fontFamily: 'ShantellSans-Medium',
  },
  warningText: {
    fontSize: 16,
    lineHeight: 18,
    color: '#777067',
    fontFamily: 'NeuchaRegular',
  },
});
