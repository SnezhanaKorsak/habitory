import { StyleSheet, Text, TextInput, View } from 'react-native';

import { theme } from '../../../app/theme';
import { PrimaryButton } from '../../../shared/ui';

type Props = {
  currentValue: number;
  setCurrentValue: (value: number) => void;
  increaseResult: () => void;
  decreaseResult: () => void;
};

export const UpdateNumericResult = ({
  currentValue,
  setCurrentValue,
  increaseResult,
  decreaseResult,
}: Props) => {
  const onChangeHandler = (text: string) => {
    const sanitized = text.replace(/[^0-9]/g, '');

    if (sanitized === '') {
      setCurrentValue(0);
      return;
    }

    const num = Number(sanitized);
    if (!isNaN(num)) {
      setCurrentValue(num);
    }
  };

  return (
    <View style={styles.btnBlock}>
      <PrimaryButton
        style={styles.leftBtn}
        backgroundColor={theme.bgPrimary}
        onPress={decreaseResult}
        disabled={currentValue === 0}
      >
        <Text style={styles.text}>-</Text>
      </PrimaryButton>
      <View style={styles.info}>
        <TextInput
          value={String(currentValue)}
          onChangeText={onChangeHandler}
          keyboardType={'numeric'}
          style={styles.input}
        />
      </View>
      <PrimaryButton
        style={styles.rightBtn}
        backgroundColor={theme.bgPrimary}
        onPress={increaseResult}
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
  },
  input: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 0,
    paddingBottom: 0,
    margin: 0,
    backgroundColor: theme.bgPrimary,
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
  },
});
