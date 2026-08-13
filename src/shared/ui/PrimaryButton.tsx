import React, { PropsWithChildren } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { theme } from '../../app/theme';

type Props = PressableProps & {
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  leftAddon?: React.ReactNode;
};

export const PrimaryButton = ({
  children,
  leftAddon,
  style,
  backgroundColor,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <View style={[styles.buttonOverContainer, style]}>
      <Pressable
        style={({ pressed }) => [
          styles.buttonInnerContainer,
          pressed && styles.pressed,
          { backgroundColor: backgroundColor ?? theme.accent200 },
        ]}
        {...rest}
      >
        {leftAddon}
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOverContainer: {
    height: 40,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 26,
    color: theme.textPrimary,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
