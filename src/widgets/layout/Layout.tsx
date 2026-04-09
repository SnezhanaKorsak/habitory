import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../../app/theme';

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: top + 10,
      }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgPrimary,
    paddingHorizontal: 20,
  },
});
