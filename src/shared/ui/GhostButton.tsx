import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';

type Props = {
  title: string;
  leftAddon?: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
};

export const GhostButton = ({
  title,
  leftAddon,
  textStyle,
  onPress,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      {leftAddon && <View style={styles.leftAddon}>{leftAddon}</View>}

      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonPressed: {
    transform: [{ scale: 0.9 }],
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  leftAddon: {
    marginRight: 8,
  },
});
