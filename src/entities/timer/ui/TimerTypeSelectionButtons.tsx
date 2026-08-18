import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

import { theme } from '../../../app/theme';
import { GhostButton } from '../../../shared/ui';

import { TimerType } from '../types';

type Props = {
  timerType: TimerType;
  setTimerType: (timerType: TimerType) => void;
};

export const TimerTypeSelectionButtons = ({
  timerType,
  setTimerType,
}: Props) => {
  const stopwatchColor = timerType === 'stopwatch' ? theme.accent200 : '';
  const countdownColor = timerType === 'countdown' ? theme.accent200 : '';

  return (
    <View style={styles.container}>
      <GhostButton
        title="Stopwatch"
        textStyle={{ color: stopwatchColor }}
        leftAddon={<Entypo name="stopwatch" size={26} color={stopwatchColor} />}
        onPress={() => setTimerType('stopwatch')}
      />

      <View style={styles.divider} />

      <GhostButton
        title="Countdown"
        textStyle={{ color: countdownColor }}
        leftAddon={
          <MaterialCommunityIcons
            name="timer-sand"
            size={26}
            color={countdownColor}
          />
        }
        onPress={() => setTimerType('countdown')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: -16,
    height: 56,
    width: '110%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: theme.border,
    paddingHorizontal: '5%',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: theme.border,
  },
});
