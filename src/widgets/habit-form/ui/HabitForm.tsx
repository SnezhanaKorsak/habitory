import { HabitColorPicker } from './HabitColorPicker';
import { HabitDetailsBlock } from './HabitDetailsBlock';
import { HabitIconPicker } from './HabitIconPicker';
import { HabitTypeSelect } from './HabitTypeSelect';

import { HabitFormData } from '../model/types';

type Props = {
  form: HabitFormData;
  setForm: (value: HabitFormData) => void;
};

export const HabitForm = ({ form, setForm }: Props) => {
  return (
    <>
      <HabitTypeSelect form={form} setForm={setForm} />

      <HabitDetailsBlock form={form} setForm={setForm} />

      <HabitIconPicker form={form} setForm={setForm} />

      <HabitColorPicker form={form} setForm={setForm} />
    </>
  );
};
