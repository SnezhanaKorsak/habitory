import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { SelectList } from 'react-native-dropdown-select-list';

import { habitTypeTranslateKeys } from '../../../shared/config/translationMapper';

import { HabitFormData } from '../../../shared/types';
import { HabitType } from '../../../shared/types/habit';

type Props = {
  form: HabitFormData;
  setForm: (value: HabitFormData) => void;
};

export const HabitTypeSelect = ({ form, setForm }: Props) => {
  const { t } = useTranslation();

  const [selected, setSelected] = useState(form.type);

  const formData = Object.values(HabitType).map((type) => ({
    key: type,
    value: t(habitTypeTranslateKeys[type]),
  }));

  const onSelectHandler = () => {
    setForm({ ...form, type: selected });
  };

  return (
    <SelectList
      defaultOption={{
        key: form.type,
        value: t(habitTypeTranslateKeys[form.type]),
      }}
      data={formData}
      save="key"
      placeholder={t('newHabits.inputTypePlaceholder')}
      search={false}
      setSelected={(val: HabitType) => setSelected(val)}
      onSelect={onSelectHandler}
      boxStyles={{ paddingHorizontal: 12 }}
      inputStyles={{ fontSize: 16, fontFamily: 'NeuchaRegular' }}
      dropdownTextStyles={{ fontSize: 16, fontFamily: 'NeuchaRegular' }}
    />
  );
};
