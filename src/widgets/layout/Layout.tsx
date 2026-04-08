import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  title?: string;
  children: React.ReactNode;
};

export const Layout = ({ children, title }: Props) => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: Platform.OS === 'android' ? top * 2 : top / 5,
      }}
    >
      {title && <Text style={styles.title}>{title}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171324',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    // color: theme.colors.primaryText,
    textAlign: 'center',
  },
});
