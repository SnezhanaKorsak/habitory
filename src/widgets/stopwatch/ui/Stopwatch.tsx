import { StyleSheet, Text } from 'react-native';

import {
  ColorFormat,
  CountdownCircleTimer,
} from 'react-native-countdown-circle-timer';

import { theme } from '../../../app/theme';
import { TimerStatus } from '../../../entities/timer';
import { formattedTimeString } from '../../../shared/lib';

type Props = {
  resetKey: number;
  timerStatus: TimerStatus;
  onSetTime: (remainingTime: number) => void;
};

const MAX_DURATION = 24 * 60 * 60; // 24 часа

export const Stopwatch = ({ resetKey, timerStatus, onSetTime }: Props) => {
  const isPlaying = timerStatus === 'play';

  return (
    <CountdownCircleTimer
      key={resetKey}
      isPlaying={isPlaying}
      duration={MAX_DURATION}
      colors={theme.accent100 as ColorFormat}
      size={220}
      strokeWidth={16}
      trailColor={theme.bgShadow as ColorFormat}
      rotation="clockwise"
      onUpdate={(remainingTime) => {
        const elapsedTime = MAX_DURATION - remainingTime;

        onSetTime(elapsedTime);
      }}
    >
      {({ remainingTime }) => {
        const elapsedTime = MAX_DURATION - remainingTime;

        return (
          <Text style={styles.remainingText}>
            {formattedTimeString(elapsedTime)}
          </Text>
        );
      }}
    </CountdownCircleTimer>
  );
};

const styles = StyleSheet.create({
  remainingText: {
    fontSize: 32,
  },
});
