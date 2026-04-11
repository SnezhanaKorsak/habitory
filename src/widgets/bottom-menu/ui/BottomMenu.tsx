import { StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../../../app/theme';
import { menuData } from '../config/menu-data';
import { MenuItem } from './MenuItem';

import { NavFunction } from '../../../shared/types';

type Props = {
  nav: NavFunction;
  currentRoute: string;
};

export const BottomMenu = ({ currentRoute, nav }: Props) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[{ paddingBottom: bottom + 12 }, styles.container]}>
      {menuData.map((item) => (
        <MenuItem
          key={item.path}
          item={item}
          currentRoute={currentRoute}
          nav={nav}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 32,
    backgroundColor: theme.bgAccent,
  },
});
