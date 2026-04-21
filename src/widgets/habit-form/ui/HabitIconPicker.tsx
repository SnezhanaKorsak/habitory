import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../app/theme';
import { IconButton, PrimaryButton } from '../../../shared/ui';
import { previewIcons } from '../constants/form-data';
import { IconPicker } from './IconPicker';

import { FeatherIconName, HabitFormData } from '../../../shared/types';

type Props = {
  form: HabitFormData;
  setForm: (value: HabitFormData) => void;
};

export const HabitIconPicker = ({ form, setForm }: Props) => {
  const [selectedIcon, setSelectedIcon] = useState<FeatherIconName>(form.icon);
  const [iconsList, setIconsList] = useState<FeatherIconName[]>(
    form.icon && !previewIcons.includes(form.icon)
      ? [form.icon, ...previewIcons]
      : previewIcons,
  );
  const [showMore, setShowMore] = useState(false);

  const chooseIcon = (iconName: FeatherIconName) => {
    if (!iconsList.includes(iconName)) {
      setIconsList((prevState) => [iconName, ...prevState].slice(0, 18));
    }

    setSelectedIcon(iconName);
    setForm({ ...form, icon: iconName });
    setShowMore(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Icon:</Text>

      <View style={styles.list}>
        {iconsList.map((icon) => {
          return (
            <View
              key={icon}
              style={{
                ...styles.iconBtn,
                borderColor:
                  selectedIcon === icon ? theme.accent200 : 'transparent',
                borderWidth: selectedIcon === icon ? 1 : 0,
              }}
            >
              <IconButton
                icon={icon}
                size={22}
                callback={() => chooseIcon(icon)}
              />
            </View>
          );
        })}
      </View>

      <View style={styles.buttonBlock}>
        <PrimaryButton onPress={() => setShowMore(true)}>
          Show more
        </PrimaryButton>
      </View>

      <IconPicker
        visible={showMore}
        onSelect={chooseIcon}
        setModalVisible={setShowMore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  label: {
    fontSize: 20,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
    gap: 15,
    paddingHorizontal: 4,
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.bgAccent,
    width: 36,
    height: 36,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

    elevation: 3,
  },
  buttonBlock: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
});
