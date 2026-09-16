import { Pressable, StyleSheet } from 'react-native';

import { AntDesign, Feather } from '@expo/vector-icons';

import { AntDesignIconName, FeatherIconName } from '../types';

type Icon =
  | {
      iconType?: 'feather';
      icon: FeatherIconName;
    }
  | {
      iconType: 'antDesign';
      icon: AntDesignIconName;
    };

type Props = Icon & {
  size?: number;
  color?: string;
  callback: () => void;
};

export const IconButton = ({
  icon,
  iconType,
  callback,
  color,
  size = 26,
}: Props) => {
  return (
    <Pressable
      onPress={callback}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      {iconType === 'antDesign' ? (
        <AntDesign name={icon} size={size} color={color} />
      ) : (
        <Feather name={icon} size={size} color={color} />
      )}
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
