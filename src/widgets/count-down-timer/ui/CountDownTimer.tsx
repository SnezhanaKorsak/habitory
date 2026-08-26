import React from 'react';
import { StyleSheet, Text } from 'react-native';

import {
  ColorFormat,
  CountdownCircleTimer,
} from 'react-native-countdown-circle-timer';

import { theme } from '../../../app/theme';
import { TimerStatus } from '../../../entities/timer';
import { UpdateTimeResult } from '../../../features';
import { formattedTimeString } from '../../../shared/lib';

type Props = {
  timerStatus: TimerStatus;
  duration: number;
  isPlaying: boolean;
  currentValue: number;
  onSetTime: (totalElapsedTime: number) => void;
  setCurrentValue: (value: number) => void;
  onCompleteCountdown: () => void;
};

export const CountDownTimer = ({
  timerStatus,
  duration,
  isPlaying,
  currentValue,
  onSetTime,
  setCurrentValue,
  onCompleteCountdown,
}: Props) => {
  const isHideTimer = timerStatus !== 'start';

  return (
    <>
      {isHideTimer ? (
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={duration}
          colors={theme.accent100 as ColorFormat}
          size={220}
          strokeWidth={16}
          trailColor={theme.bgShadow as ColorFormat}
          rotation="clockwise"
          onUpdate={(remainingTime: number) => {
            onSetTime(duration - remainingTime);
          }}
          onComplete={(totalElapsedTime: number) => {
            onSetTime(totalElapsedTime);
            onCompleteCountdown();
          }}
        >
          {({ remainingTime }) => {
            return (
              <Text style={styles.remainingText}>
                {formattedTimeString(remainingTime)}
              </Text>
            );
          }}
        </CountdownCircleTimer>
      ) : (
        <UpdateTimeResult
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  remainingText: {
    fontSize: 32,
  },
});
