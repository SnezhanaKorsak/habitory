import { HabitTypeSelect } from './HabitTypeSelect';

import { ChangeFormHandler, HabitFormData } from '../model/types';

type Props = {
  form: HabitFormData;
  setForm: (value: HabitFormData) => void;
};

export const HabitForm = ({ form, setForm }: Props) => {
  const changeForm: ChangeFormHandler = (key, newValue) => {
    setForm({ ...form, [key]: newValue });
  };

  return (
    <>
      <HabitTypeSelect onChange={(value) => changeForm('type', value)} />

      {/* <HabitDetailsBlock />*/}

      {/* <HabitIconPicker />*/}

      {/* <HabitColorPicker />*/}

      {/* <Button onPress={onSubmit}>Save</Button>*/}
    </>
  );
};
