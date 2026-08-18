import { StyleSheet, Text, View } from 'react-native';

import {
  ColorFormat,
  CountdownCircleTimer,
} from 'react-native-countdown-circle-timer';

import { theme } from '../../../app/theme';
import { formattedTimeString } from '../../../shared/lib';

type Props = {
  duration: number;
  isPlaying: boolean;
  onSetRemainingTime: (remainingTime: number) => void;
};

export const CountDownTimer = ({
  duration,
  isPlaying,
  onSetRemainingTime,
}: Props) => {
  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={theme.accent100 as ColorFormat}
        size={220}
        strokeWidth={16}
        trailColor={theme.bgShadow as ColorFormat}
        rotation="counterclockwise"
        onUpdate={(remainingTime: number) => {
          onSetRemainingTime(duration - remainingTime);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  remainingText: {
    fontSize: 32,
  },
});
