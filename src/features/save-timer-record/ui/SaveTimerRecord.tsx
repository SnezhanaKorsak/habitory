import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { AntDesign, Feather } from '@expo/vector-icons';

import { theme } from '../../../app/theme';
import { useHabitsStore } from '../../../entities/habits';
import { formattedTimeString, getTodayString } from '../../../shared/lib';
import { GhostButton } from '../../../shared/ui';

import { HabitType } from '../../../shared/types/habit';

type Props = {
  isShowModal: boolean;
  habitId: string;
  time: number;
  onSaveTime: () => void;
  onCancelOperation: () => void;
};

export const SaveTimerRecord = ({
  isShowModal,
  habitId,
  time,
  onCancelOperation,
}: Props) => {
  const habits = useHabitsStore((state) => state.habits);
  const addTime = useHabitsStore((state) => state.addTime);

  const selectedHabit = habits.find((habit) => habit.id === habitId);

  if (!selectedHabit || selectedHabit.type != HabitType.time) return null;

  const { name, color, icon } = selectedHabit;
  const today = getTodayString();

  const saveTime = () => {
    addTime(habitId, today, time);
    onCancelOperation();
  };

  return (
    <Modal transparent={true} visible={isShowModal} animationType="fade">
      <View style={styles.modal}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>
            <Text style={[styles.title, { color }]}>{today}</Text>
          </View>

          <View style={[styles.icon, { backgroundColor: color }]}>
            <Feather name={icon} size={22} />
          </View>
        </View>

        <View style={styles.total}>
          <Text style={styles.time}>{formattedTimeString(time)}</Text>
          <Text style={styles.description}>Total time</Text>
        </View>

        <View style={styles.btnBlock}>
          <View style={styles.saveBtn}>
            <GhostButton
              title="SAVE TIME"
              textStyle={{ color }}
              leftAddon={
                <AntDesign name="field-time" size={22} color={color} />
              }
              onPress={saveTime}
            />
          </View>
          <View style={styles.closeBtn}>
            <GhostButton
              title="CLOSE"
              leftAddon={<AntDesign name="close-circle" size={22} />}
              onPress={onCancelOperation}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    backgroundColor: theme.bgAccent,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  },
  title: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    borderRadius: 8,
    marginRight: 6,
  },
  total: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  time: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    color: theme.textSecondary,
  },
  saveBtn: {
    height: 56,
    width: '50%',
    borderRightWidth: 1,
    borderRightColor: theme.border,
  },
  closeBtn: {
    height: 56,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBlock: {
    flexDirection: 'row',
    columnGap: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
});
