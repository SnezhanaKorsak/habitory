import { Pressable, StyleSheet } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { FeatherIconName } from '../types';

type Props = {
  icon: FeatherIconName;
  size?: number;
  callback: () => void;
};

export const IconButton = ({ icon, callback, size = 26 }: Props) => {
  return (
    <Pressable
      onPress={callback}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Feather name={icon} size={size} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonPressed: {
    transform: [{ scale: 0.9 }],
  },
});
