import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from 'react-native';

type Props = {
  title: string;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
};

export const GhostButton = ({ title, textStyle, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: '100%',
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
});
