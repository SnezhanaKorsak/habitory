import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { HabitType } from '../../../entities/habit';
import { FloatingInput } from '../../../shared/ui';
import { TimerPicker } from './TimerPicker';

import { HabitFormData } from '../model/types';

type Props = {
  form: HabitFormData;
  setForm: (value: HabitFormData) => void;
};

export const HabitDetailsBlock = ({ form, setForm }: Props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [numericGoal, setNumericGoal] = useState(0);
  const [unit, setUnit] = useState('');
  const [time, setTime] = useState(0);

  const habitType = form.type;

  useEffect(() => {
    setForm({
      ...form,
      name,
      description,
      numericGoal,
      numericUnit: unit,
      timerGoal: time,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description, numericGoal, unit, time]);

  return (
    <View style={styles.container}>
      <FloatingInput
        value={name}
        onChangeValue={(value) => setName(String(value))}
        placeholder={'Name'}
      />

      {habitType === HabitType.numeric && (
        <>
          <View style={styles.extraBox}>
            <View style={styles.goal}>
              <FloatingInput
                value={numericGoal}
                onChangeValue={(value) => setNumericGoal(Number(value))}
                placeholder={'Goal'}
                type="numeric"
              />
            </View>

            <View style={styles.unit}>
              <View style={{ width: '70%' }}>
                <FloatingInput
                  value={unit}
                  onChangeValue={(value) => setUnit(String(value))}
                  placeholder={'Unit (optional)'}
                />
              </View>

              <View>
                <Text style={styles.text}>a day.</Text>
              </View>
            </View>
          </View>
          <Text style={styles.hint}>e.g., 3 times a day </Text>
        </>
      )}

      {habitType === HabitType.time && (
        <View style={styles.unit}>
          <View style={{ width: '70%' }}>
            <TimerPicker value={time} onChange={setTime} />
          </View>

          <View>
            <Text style={styles.text}>a day.</Text>
          </View>
        </View>
      )}

      <FloatingInput
        value={description}
        onChangeValue={(value) => setDescription(String(value))}
        placeholder={'Description (optional)'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 20,
  },
  extraBox: {
    flexDirection: 'row',
    gap: '5%',
  },
  goal: {
    width: '30%',
  },
  unit: {
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  hint: {
    marginTop: '-5%',
    fontSize: 16,
  },
});
