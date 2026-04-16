import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../app/theme';

import { HabitFormData } from '../../../shared/types';

type Props = {
  form: HabitFormData;
  setForm: (value: HabitFormData) => void;
};

export const HabitColorPicker = ({ form, setForm }: Props) => {
  const [selectedColor, setSelectedColor] = useState(form.color);

  const chooseColor = (color: string) => {
    setForm({ ...form, color: color });
    setSelectedColor(color);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Color:</Text>

      <View style={styles.list}>
        {theme.cardsBg.map((color) => (
          <Pressable
            key={color}
            onPress={() => chooseColor(color)}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <View
              style={{
                ...styles.colorBtn,
                borderColor:
                  selectedColor === color ? theme.accent200 : 'transparent',
                borderWidth: selectedColor === color ? 1 : 0,
              }}
            >
              <View style={{ ...styles.color, backgroundColor: color }} />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: {
    fontSize: 20,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
    rowGap: 15,
    columnGap: 45,
    paddingHorizontal: 4,
  },
  colorBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.bgAccent,
    width: 36,
    height: 36,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

    elevation: 3,
  },
  color: {
    width: 22,
    height: 22,
    borderRadius: '50%',
    borderWidth: 1,
    borderColor: theme.border,
  },
  buttonBlock: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonPressed: {
    transform: [{ scale: 0.9 }],
  },
});
