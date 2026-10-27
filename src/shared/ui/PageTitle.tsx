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
      {leftAddon}

      <Text style={[styles.title, { fontFamily: fonts.bold }]}>{title}</Text>

      {rightAddon}
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
  title: {
    width: 'auto',
    fontSize: 32,
    lineHeight: 40,
  },
});
