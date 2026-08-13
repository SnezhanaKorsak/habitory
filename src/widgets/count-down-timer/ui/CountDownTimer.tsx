import { StyleSheet, Text, View } from 'react-native';

import {
  ColorFormat,
  CountdownCircleTimer,
} from 'react-native-countdown-circle-timer';

import { theme } from '../../../app/theme';

type Props = {
  duration: number;
  isPlaying: boolean;
};

export const CountDownTimer = ({ duration, isPlaying }: Props) => {
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
      >
        {({ remainingTime }) => {
          const hours = Math.floor(remainingTime / 3600);
          const minutes = Math.floor((remainingTime % 3600) / 60);
          const seconds = remainingTime % 60;

          const formatedHours = hours < 10 ? `0${hours}` : hours;
          const formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;
          const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

          return (
            <Text style={styles.remainingText}>
              {`${formatedHours}:${formatedMinutes}:${formatedSeconds}`}
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
