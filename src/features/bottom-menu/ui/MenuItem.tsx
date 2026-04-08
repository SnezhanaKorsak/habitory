import { Pressable } from 'react-native';

import { Feather } from '@expo/vector-icons';

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
      <Feather
        name={iconName}
        size={26}
        //color={theme.colors[isActive ? 'primary' : 'secondary']}
      />
    </Pressable>
  );
};
