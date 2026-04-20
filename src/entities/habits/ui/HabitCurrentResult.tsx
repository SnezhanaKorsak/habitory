import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../app/theme';
import { PrimaryButton } from '../../../shared/ui';

import { HabitType } from '../../../shared/types/habit';

type Props = {
  type: HabitType;
  currentResult: number;
  setCurrentValue: (value: number) => void;
  color: string;
  goal: number;
  unit: string;
  operationWithValue: string;
  setOperationWithValue: (value: string) => void;
  children: React.ReactNode;
};

export const HabitCurrentResult = ({
  type,
  currentResult,
  setCurrentValue,
  color,
  goal,
  unit,
  operationWithValue,
  setOperationWithValue,
  children,
}: Props) => {
  const hours = Math.floor(currentResult / 3600);
  const minutes = Math.floor((currentResult % 3600) / 60);
  const seconds = currentResult % 60;

  const goalHours = Math.floor(goal / 3600);
  const goalMinutes = Math.floor((goal % 3600) / 60);
  const goalSeconds = goal % 60;

  const formatTime = (h: number, m: number, s: number) => {
    const parts = [];

    if (h) {
      parts.push(h.toString().padStart(2, '0'));
    }

    parts.push((m ?? 0).toString().padStart(2, '0'));
    parts.push((s ?? 0).toString().padStart(2, '0'));

    return parts.join(':');
  };

  const replaceOperation = () => {
    setOperationWithValue('replace');
    setCurrentValue(currentResult);
  };
  const addOperation = () => {
    setOperationWithValue('add');
    setCurrentValue(0);
  };

  return (
    <View style={styles.container}>
      {children}

      <View style={styles.btnBlock}>
        <PrimaryButton
          style={[styles.leftBtn, { width: '50%' }]}
          backgroundColor={
            operationWithValue === 'replace' ? color : theme.bgPrimary
          }
          onPress={replaceOperation}
        >
          <Text style={styles.text}>Replace</Text>
        </PrimaryButton>
        <PrimaryButton
          style={[styles.rightBtn, { width: '50%', borderLeftWidth: 0 }]}
          backgroundColor={
            operationWithValue === 'add' ? color : theme.bgPrimary
          }
          onPress={addOperation}
        >
          <Text style={styles.text}>Add</Text>
        </PrimaryButton>
      </View>

      <View style={styles.summary}>
        {type === HabitType.time ? (
          <Text>
            {`Today: ${formatTime(hours, minutes, seconds)} /${formatTime(goalHours, goalMinutes, goalSeconds)}`}
          </Text>
        ) : (
          <Text
            style={styles.summaryInfo}
          >{`Today: ${currentResult}/${goal} ${unit}`}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  info: {
    width: '50%',
    height: 40,
    backgroundColor: theme.bgPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBlock: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftBtn: {
    width: '25%',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 1,
    borderRightColor: theme.border,
  },
  rightBtn: {
    width: '25%',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 1,
    borderLeftColor: theme.border,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  summary: {
    height: 40,
    backgroundColor: theme.bgPrimary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryInfo: {
    fontSize: 16,
  },
});
