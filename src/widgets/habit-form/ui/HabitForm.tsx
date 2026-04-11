import { HabitDetailsBlock } from './HabitDetailsBlock';
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

      {/* <HabitIconPicker />*/}

      {/* <HabitColorPicker />*/}

      {/* <Button onPress={onSubmit}>Save</Button>*/}
    </>
  );
};
