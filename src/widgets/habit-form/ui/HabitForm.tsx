import { ScrollView } from 'react-native';

import { HabitColorPicker } from './HabitColorPicker';
import { HabitDetailsBlock } from './HabitDetailsBlock';
import { HabitIconPicker } from './HabitIconPicker';
import { HabitTypeSelect } from './HabitTypeSelect';

import { HabitFormData } from '../../../shared/types';

type Props = {
  form: HabitFormData;
  setForm: (value: HabitFormData) => void;
};

export const HabitForm = ({ form, setForm }: Props) => {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <HabitTypeSelect form={form} setForm={setForm} />

      <HabitDetailsBlock form={form} setForm={setForm} />

      <HabitIconPicker form={form} setForm={setForm} />

      <HabitColorPicker form={form} setForm={setForm} />
    </ScrollView>
  );
};
