import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet,View } from 'react-native';

import { theme } from '../../app/theme';

export const LoadingDots = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  const animateDot = (dot: Animated.Value, delay: number) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(dot, {
          toValue: 1,
          duration: 500,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(dot, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    animateDot(dot1, 0);
    animateDot(dot2, 200);
    animateDot(dot3, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDot = (dot: Animated.Value, index: number) => (
    <Animated.View
      key={index}
      style={[
        styles.dot,
        {
          opacity: dot,
          transform: [
            {
              scale: dot.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1.2],
              }),
            },
          ],
        },
      ]}
    />
  );

  return (
    <View style={styles.container}>{[dot1, dot2, dot3].map(renderDot)}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.accent200,
  },
});
