import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { theme } from '../../../app/theme';
import { HabitCurrentResult, useHabitsStore } from '../../../entities/habits';
import { UpdateNumericResult, UpdateTimeResult } from '../../../features';
import { GhostButton } from '../../../shared/ui';
import { useCurrentResult } from '../lib/useCurrentResult';

import { Habit, HabitType } from '../../../shared/types/habit';

type Props = {
  habit: Habit;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const HabitResultPanel = ({ habit, visible, setVisible }: Props) => {
  const updateNumericResult = useHabitsStore(
    (state) => state.updateNumericResult,
  );
  const updateTimeResult = useHabitsStore((state) => state.updateTimeResult);

  const { habitResult, goal, unit, day } = useCurrentResult(habit);

  const [currentValue, setCurrentValue] = useState(habitResult);
  const [currentResult, setCurrentResult] = useState(habitResult);

  const [operationWithValue, setOperationWithValue] = useState('replace');
  const [operationWithResult, setOperationWithResult] = useState('cancel');

  const { id, icon, name, color } = habit;
  const today = new Date();

  useEffect(() => {
    setCurrentValue(habitResult);
    setCurrentResult(habitResult);
  }, [habitResult]);

  useEffect(() => {
    if (operationWithValue === 'replace') {
      setCurrentResult(currentValue);
    }

    if (operationWithValue === 'add') {
      setCurrentResult(habitResult + currentValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue]);

  useEffect(() => {
    setCurrentResult(habitResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationWithValue]);

  const increaseResult = () => {
    setCurrentValue((prev) => prev + 1);
  };

  const decreaseResult = () => {
    setCurrentValue((prev) => prev - 1);
  };

  const cancelOperation = () => {
    setOperationWithResult('cancel');
    setOperationWithValue('replace');
    setCurrentValue(habitResult);
    setCurrentResult(habitResult);
    setVisible(false);
  };

  const saveOperation = () => {
    setOperationWithResult('save');

    if (habit.type === HabitType.numeric) {
      updateNumericResult(id, day, currentResult);
    }

    if (habit.type === HabitType.time) {
      updateTimeResult(id, day, currentResult);
    }

    setVisible(false);
    setOperationWithValue('replace');
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

            <View style={[styles.icon, { backgroundColor: color }]}>
              <Feather name={icon} size={22} />
            </View>
          </View>

          <HabitCurrentResult
            type={habit.type}
            currentResult={currentResult}
            setCurrentValue={setCurrentValue}
            goal={goal}
            color={color}
            unit={unit}
            operationWithValue={operationWithValue}
            setOperationWithValue={setOperationWithValue}
          >
            {habit.type === HabitType.check ? (
              <UpdateNumericResult
                currentValue={currentValue}
                setCurrentValue={setCurrentValue}
                increaseResult={increaseResult}
                decreaseResult={decreaseResult}
              />
            ) : (
              <UpdateTimeResult
                currentValue={currentValue}
                setCurrentValue={setCurrentValue}
              />
            )}
          </HabitCurrentResult>

          <View style={styles.footer}>
            <GhostButton
              title="CANCEL"
              textStyle={{
                color:
                  operationWithResult === 'cancel' ? color : theme.textPrimary,
              }}
              onPress={cancelOperation}
            />

            <View style={styles.divider} />

            <GhostButton
              title="SAVE"
              textStyle={{
                color:
                  operationWithResult === 'save' ? color : theme.textPrimary,
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
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    borderRadius: 8,
    marginRight: 6,
  },
});
