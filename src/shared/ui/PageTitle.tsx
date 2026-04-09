import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  rightAddon?: React.ReactNode;
};

export const PageTitle = ({ title, rightAddon }: Props) => {
  return (
    <View style={styles.container}>
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
