import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppSettings } from '../config/i18n/useAppSettings';

type Props = {
  title: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
};

export const PageTitle = ({ title, rightAddon, leftAddon }: Props) => {
  const { fonts } = useAppSettings();

  return (
    <View style={styles.container}>
      {leftAddon && <View style={styles.leftAddon}>{leftAddon}</View>}

      <View style={styles.main}>
        <Text style={[styles.title, { fontFamily: fonts.bold }]}>{title}</Text>
      </View>

      {rightAddon && <View style={styles.rightAddon}>{rightAddon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  main: {
    flex: 1,
  },

  title: {
    fontSize: 32,
    lineHeight: 40,
  },
  leftAddon: {
    width: 30,
    marginRight: 8,
  },
  rightAddon: {
    width: 30,
    marginLeft: 8,
  },
});
