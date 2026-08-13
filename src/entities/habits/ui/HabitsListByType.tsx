import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { theme } from '../../../app/theme';
import { capitalizeFirstLetter } from '../../../shared/lib';
import { useHabitsStore } from '../model/useHabitsStore';

import { HabitType } from '../../../shared/types/habit';

type Props = {
  type: HabitType;
  onSelect: (id: string) => void;
};

export const HabitsListByType = ({ type, onSelect }: Props) => {
  const habits = useHabitsStore((state) => state.habits);
  const habitsByType = habits.filter((habit) => habit.type === type);

  if (habitsByType.length === 0) return null;

  return (
    <View style={styles.container}>
      {habitsByType.map(({ name, id, icon, color }) => {
        return (
          <Pressable
            key={id}
            onPress={() => onSelect(id)}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <View style={styles.item}>
              <View style={[styles.iconBg, { backgroundColor: color }]}>
                <Feather name={icon} size={24} color="white" />
              </View>

              <Text style={styles.text}>{capitalizeFirstLetter(name)}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 46,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.border,
  },
  text: {
    fontSize: 22,
    lineHeight: 60,
  },
  iconBg: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    transform: [{ scale: 0.98 }],
  },
});
