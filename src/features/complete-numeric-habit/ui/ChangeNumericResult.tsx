import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../app/theme';
import { PrimaryButton } from '../../../shared/ui';

type Props = {
  currentValue: number;
  color: string;
};

export const ChangeNumericResult = ({ currentValue, color }: Props) => {
  const [result, setResult] = useState(currentValue);
  const [operation, setOperation] = useState('replace');

  const increase = () => setResult((prevState) => prevState + 1);
  const decrease = () => setResult((prevState) => prevState - 1);

  const replaceOperation = () => setOperation('replace');
  const addOperation = () => setOperation('add');

  return (
    <View style={styles.container}>
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

      <View style={styles.btnBlock}>
        <PrimaryButton
          style={[styles.leftBtn, { width: '50%' }]}
          backgroundColor={operation === 'replace' ? color : theme.bgPrimary}
          onPress={replaceOperation}
        >
          <Text style={styles.text}>Replace</Text>
        </PrimaryButton>
        <PrimaryButton
          style={[styles.rightBtn, { width: '50%', borderLeftWidth: 0 }]}
          backgroundColor={operation === 'add' ? color : theme.bgPrimary}
          onPress={addOperation}
        >
          <Text style={styles.text}>Add</Text>
        </PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 8,
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
