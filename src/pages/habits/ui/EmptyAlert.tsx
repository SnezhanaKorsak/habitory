import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AntDesign, Feather } from '@expo/vector-icons';

import { theme } from '../../../app/theme';

import { StackNavigationProp } from '../../../shared/types';

export const EmptyAlert = () => {
  const navigation = useNavigation<StackNavigationProp>();

  const navigateToCreateHabit = () => navigation.navigate('New');

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <AntDesign name="alert" size={22} color="#C64A38" />

        <View style={styles.sectionText}>
          <Text style={styles.sectionTitle}>No habits yet</Text>
          <Text style={styles.sectionDescription}>
            Start building better routines by creating your first habit.
          </Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={navigateToCreateHabit}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Feather name="arrow-right" size={18} color={theme.accent100} />
        <Text style={styles.buttonText}>Create the first habit</Text>
      </Pressable>
    </View>
  );
};

export const styles = StyleSheet.create({
  section: {
    backgroundColor: theme.bgSecondary,
    borderRadius: 20,
    marginTop: 30,
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
  button: {
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
  buttonPressed: {
    backgroundColor: '#F0E2D8',
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.accent100,
  },
});
