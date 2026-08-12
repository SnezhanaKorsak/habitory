import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
};

export const PageTitle = ({ title, rightAddon, leftAddon }: Props) => {
  return (
    <View style={styles.container}>
      {leftAddon}

      <Text style={styles.title}>{title}</Text>

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
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'FastelarDemoRegular',
  },
});
