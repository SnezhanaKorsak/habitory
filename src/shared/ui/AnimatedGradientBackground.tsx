import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const AnimatedGradientBackground = () => {
  const progress1 = useSharedValue(0);
  const progress2 = useSharedValue(0);
  const progress3 = useSharedValue(0);

  useEffect(() => {
    progress1.value = withRepeat(
      withTiming(1, {
        duration: 14000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );

    progress2.value = withRepeat(
      withTiming(1, {
        duration: 18000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );

    progress3.value = withRepeat(
      withTiming(1, {
        duration: 22000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blob1Style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: progress1.value * 80 - 40,
      },
      {
        translateY: progress1.value * 50 - 25,
      },
    ],
  }));

  const blob2Style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: progress2.value * -100 + 50,
      },
      {
        translateY: progress2.value * 70 - 35,
      },
    ],
  }));

  const blob3Style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: progress3.value * 60 - 30,
      },
      {
        translateY: progress3.value * -80 + 40,
      },
    ],
  }));

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {/* Основной фон */}
      <LinearGradient
        colors={['#e4dac0', '#eceadb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Тёплое пятно */}
      <AnimatedLinearGradient
        colors={[
          'rgba(216,155,124,0.45)',
          'rgba(227,180,106,0.15)',
          'transparent',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.blob, styles.blob1, blob1Style]}
      />

      {/* Холодное пятно */}
      <AnimatedLinearGradient
        colors={[
          'rgba(127,168,154,0.4)',
          'rgba(95,179,179,0.12)',
          'transparent',
        ]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[styles.blob, styles.blob2, blob2Style]}
      />

      {/* Лавандовое пятно */}
      <AnimatedLinearGradient
        colors={[
          'rgba(154,144,184,0.3)',
          'rgba(224,122,95,0.1)',
          'transparent',
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={[styles.blob, styles.blob3, blob3Style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
  },

  blob1: {
    top: -120,
    right: -80,
  },

  blob2: {
    bottom: -100,
    left: -100,
  },

  blob3: {
    top: '35%',
    left: '25%',
  },
});
