import { HabitFormData } from '../model/types';

type Props = {
  value: HabitFormData;
  onChange: (value: HabitFormData) => void;
};

export const HabitForm = ({ value, onChange }: Props) => {
  return (
    <>
      {/*  <HabitTypeSelect />*/}

      {/* <HabitDetailsBlock />*/}

      {/* <HabitIconPicker />*/}

      {/* <HabitColorPicker />*/}

      {/* <Button onPress={onSubmit}>Save</Button>*/}
    </>
  );
};
