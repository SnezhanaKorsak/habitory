import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../app/theme';
import { PrimaryButton } from '../../../shared/ui';

type Props = {
  currentValue: number;
};

export const UpdateNumericCurrentResult = ({ currentValue }: Props) => {
  const [result, setResult] = useState(currentValue);

  const increase = () => setResult((prevState) => prevState + 1);
  const decrease = () => setResult((prevState) => prevState - 1);
  return (
    <View style={styles.btnBlock}>
      <PrimaryButton
        style={styles.leftBtn}
        backgroundColor={theme.bgPrimary}
        onPress={decrease}
        disabled={result === 0}
      >
        <Text style={styles.text}>-</Text>
      </PrimaryButton>
      <View style={styles.info}>
        <Text style={styles.text}>{result}</Text>
      </View>
      <PrimaryButton
        style={styles.rightBtn}
        backgroundColor={theme.bgPrimary}
        onPress={increase}
      >
        <Text style={styles.text}>+</Text>
      </PrimaryButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  info: {
    width: '50%',
    height: 40,
    backgroundColor: theme.bgPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBlock: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftBtn: {
    width: '25%',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 1,
    borderRightColor: theme.border,
  },
  rightBtn: {
    width: '25%',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 1,
    borderLeftColor: theme.border,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
