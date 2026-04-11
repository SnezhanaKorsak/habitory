import { useState } from 'react';

import { SelectList } from 'react-native-dropdown-select-list';

import { HabitType } from '../../../entities/habit';

import { typesData } from '../constants/select-types-data';

type Props = {
  onChange: (value: HabitType) => void;
};

export const HabitTypeSelect = ({ onChange }: Props) => {
  const [selected, setSelected] = useState<HabitType>(HabitType.check);

  const onSelectHandler = () => {
    onChange(selected);
  };

  return (
    <SelectList
      data={typesData}
      save="value"
      placeholder="Select type of habit"
      search={false}
      setSelected={(val: HabitType) => setSelected(val)}
      onSelect={onSelectHandler}
    />
  );
};
