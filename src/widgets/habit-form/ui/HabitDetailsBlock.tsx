import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { FloatingInput } from '../../../shared/ui';

import { HabitFormData } from '../model/types';

type Props = {
  form: HabitFormData;
  setForm: (value: HabitFormData) => void;
};

export const HabitDetailsBlock = ({ form, setForm }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setForm({ ...form, name, description });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description]);

  return (
    <View style={styles.container}>
      <FloatingInput
        value={name}
        onChangeValue={setName}
        placeholder={'Name'}
      />
      <FloatingInput
        value={description}
        onChangeValue={setDescription}
        placeholder={'Description (optional)'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop: 20,
  },
});
