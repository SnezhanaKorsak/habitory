import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { FloatingInput } from '../../../shared/ui';
import { TimerPicker } from './TimerPicker';

import { HabitFormData } from '../../../shared/types';
import { HabitType } from '../../../shared/types/habit';

type Props = {
  form: HabitFormData;
  setForm: (value: HabitFormData) => void;
};

export const HabitDetailsBlock = ({ form, setForm }: Props) => {
  const { t } = useTranslation();

  const [name, setName] = useState(form.name);
  const [description, setDescription] = useState(form.description);
  const [numericGoal, setNumericGoal] = useState(form.numericGoal);
  const [unit, setUnit] = useState(form.numericUnit);
  const [time, setTime] = useState(form.timerGoal);

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
        placeholder={t('newHabits.inputNamePlaceholder')}
      />

      {habitType === HabitType.numeric && (
        <>
          <View style={styles.extraBox}>
            <View style={styles.goal}>
              <FloatingInput
                value={numericGoal ?? 0}
                onChangeValue={(value) => setNumericGoal(Number(value))}
                placeholder={t('newHabits.goal')}
                type="numeric"
              />
            </View>

            <View style={styles.unit}>
              <View style={{ width: '70%' }}>
                <FloatingInput
                  value={unit ?? ''}
                  onChangeValue={(value) => setUnit(String(value))}
                  placeholder={t('newHabits.unit')}
                />
              </View>

              <View>
                <Text style={styles.text}>{t('newHabits.frequency')}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.hint}>{t('newHabits.frequencyExample')}</Text>
        </>
      )}

      {habitType === HabitType.time && (
        <View style={styles.unit}>
          <View style={{ width: '70%' }}>
            <TimerPicker value={time ?? 0} onChange={setTime} />
          </View>

          <View>
            <Text style={styles.text}>{t('newHabits.frequency')}</Text>
          </View>
        </View>
      )}

      <FloatingInput
        value={description ?? ''}
        onChangeValue={(value) => setDescription(String(value))}
        placeholder={t('newHabits.inputDescriptionPlaceholder')}
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
    fontFamily: 'NeuchaRegular',
  },
  hint: {
    marginTop: '-5%',
    fontSize: 16,
    fontFamily: 'NeuchaRegular',
  },
});
