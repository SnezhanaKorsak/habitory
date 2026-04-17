import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { theme } from '../../../app/theme';
import { HabitCurrentResult } from '../../../entities/habits';
import { UpdateNumericCurrentResult } from '../../../features/update-numeric-current-result';
import { GhostButton } from '../../../shared/ui';

import { Habit } from '../../../shared/types/habit';

type Props = {
  habit: Habit;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const HabitResultPanel = ({ habit, visible, setVisible }: Props) => {
  const { icon, name, color, numericUnit } = habit;

  const [operation, setOperation] = useState('cancel');

  const today = new Date();

  const currentValue = 0;
  const goal = 10;

  const cancelOperation = () => {
    setOperation('cancel');
    setVisible(false);
  };

  const saveOperation = () => {
    setOperation('save');
    setVisible(false);
  };

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title} numberOfLines={1}>
                {name}
              </Text>
              <Text style={[styles.title, { color }]}>
                {today.toLocaleDateString('ru')}
              </Text>
            </View>
            <Feather name={icon} size={30} color={color} />
          </View>

          <HabitCurrentResult
            result={currentValue}
            goal={goal}
            color={color}
            numericUnit={numericUnit}
          >
            <UpdateNumericCurrentResult currentValue={currentValue} />
          </HabitCurrentResult>

          <View style={styles.footer}>
            <GhostButton
              title="CANCEL"
              textStyle={{
                color: operation === 'cancel' ? color : theme.textPrimary,
              }}
              onPress={cancelOperation}
            />

            <View style={styles.divider} />

            <GhostButton
              title="SAVE"
              textStyle={{
                color: operation === 'save' ? color : theme.textPrimary,
              }}
              onPress={saveOperation}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    backgroundColor: theme.bgSecondary,
    borderRadius: 16,
    paddingTop: 16,
  },
  title: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomColor: theme.border,
  },
  info: {
    flexDirection: 'row',
  },
  footer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: theme.border,
  },
});
