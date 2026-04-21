import { useState } from 'react';

import { SelectList } from 'react-native-dropdown-select-list';

import { formData } from '../constants/form-data';

import { HabitFormData } from '../../../shared/types';
import { HabitType } from '../../../shared/types/habit';

type Props = {
  form: HabitFormData;
  setForm: (value: HabitFormData) => void;
};

export const HabitTypeSelect = ({ form, setForm }: Props) => {
  const [selected, setSelected] = useState(form.type);
  const onSelectHandler = () => {
    setForm({ ...form, type: selected });
  };

  return (
    <SelectList
      defaultOption={{ key: form.type, value: form.type }}
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
