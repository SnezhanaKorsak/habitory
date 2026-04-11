import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';

import { theme } from '../../app/theme';

type Props = {
  value: string | number;
  onChangeValue: (value: string | number) => void;
  placeholder: string;
  type?: 'numeric';
};

export const FloatingInput = ({
  value,
  onChangeValue,
  placeholder,
  type,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState(String(value ?? ''));

  const animated = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: isFocused || text ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [isFocused, text, animated]);

  const onEndEditingHandler = () => {
    if (type === 'numeric') {
      const numberValue = Number(text);
      onChangeValue(isNaN(numberValue) ? 0 : numberValue);
    } else {
      onChangeValue(text);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { borderColor: isFocused ? theme.accent200 : theme.border },
      ]}
    >
      <Animated.Text
        style={[
          styles.label,
          {
            transform: [
              {
                translateY: animated.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -23],
                }),
              },
            ],
            fontSize: animated.interpolate({
              inputRange: [0, 1],
              outputRange: [16, 14],
            }),
            backgroundColor: animated.interpolate({
              inputRange: [0, 1],
              outputRange: ['transparent', theme.bgPrimary],
            }),
          },
        ]}
      >
        {placeholder}
      </Animated.Text>

      <TextInput
        keyboardType={type === 'numeric' ? 'numeric' : 'default'}
        value={text}
        onChangeText={setText}
        onEndEditing={onEndEditingHandler}
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 46,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    position: 'relative',
  },

  input: {
    height: 46,
    fontSize: 16,
    padding: 0,
    margin: 0,
    color: theme.textPrimary,
  },

  label: {
    position: 'absolute',
    left: 12,
    top: '25%',
    color: theme.textSecondary,
  },
});
