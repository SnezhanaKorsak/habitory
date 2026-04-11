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
};

export const PrimaryButton = ({
  children,
  style,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <View style={[styles.buttonOverContainer, style]}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : [styles.buttonInnerContainer]
        }
        {...rest}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonOverContainer: {
    height: 36,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    backgroundColor: theme.accent200,
    paddingVertical: 7,
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 22,
    color: 'white',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
