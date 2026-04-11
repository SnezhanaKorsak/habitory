import { useState } from 'react';

import { SelectList } from 'react-native-dropdown-select-list';

import { HabitType } from '../../../entities/habit';
import { formData } from '../constants/form-data';

import { HabitFormData } from '../model/types';

type Props = {
  form: HabitFormData;
  setForm: (value: HabitFormData) => void;
};

export const HabitTypeSelect = ({ form, setForm }: Props) => {
  const [selected, setSelected] = useState<HabitType>(HabitType.check);

  const onSelectHandler = () => {
    setForm({ ...form, type: selected });
  };

  return (
    <SelectList
      data={formData}
      save="value"
      placeholder="Select type of habit"
      search={false}
      setSelected={(val: HabitType) => setSelected(val)}
      onSelect={onSelectHandler}
      boxStyles={{ paddingHorizontal: 12 }}
      inputStyles={{ fontSize: 16 }}
    />
  );
};
