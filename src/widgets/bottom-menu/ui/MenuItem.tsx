import { Pressable } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { theme } from '../../../app/theme';

import { MenuItemType, NavFunction } from '../../../shared/types';

type Props = {
  item: MenuItemType;
  nav: NavFunction;
  currentRoute: string;
};

export const MenuItem = ({ item, currentRoute, nav }: Props) => {
  const { path, iconName } = item;
  const isActive = currentRoute === path;

  return (
    <Pressable onPress={() => nav(path)}>
      <MaterialIcons
        name={iconName}
        size={32}
        color={theme[isActive ? 'accent100' : 'textSecondary']}
      />
    </Pressable>
  );
};
