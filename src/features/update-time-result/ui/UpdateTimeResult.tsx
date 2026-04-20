import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../app/theme';
import { WheelPicker } from '../../../shared/ui';

type Props = {
  currentValue: number;
  setCurrentValue: (value: number) => void;
};

const hoursData = Array.from({ length: 25 }, (_, i) => i);
const minutesData = Array.from({ length: 60 }, (_, i) => i);
const secondsData = Array.from({ length: 60 }, (_, i) => i);

export const UpdateTimeResult = ({ currentValue, setCurrentValue }: Props) => {
  const h = Math.floor(currentValue / 3600);
  const m = Math.floor((currentValue % 3600) / 60);
  const s = currentValue % 60;

  const handleChange = (newH = h, newM = m, newS = s) => {
    const newValue = newH * 3600 + newM * 60 + newS;
    setCurrentValue(newValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <WheelPicker
          data={hoursData}
          value={h}
          onChange={(val) => handleChange(val, m, s)}
        />
        <WheelPicker
          data={minutesData}
          value={m}
          onChange={(val) => handleChange(h, val, s)}
        />
        <WheelPicker
          data={secondsData}
          value={s}
          onChange={(val) => handleChange(h, m, val)}
        />
      </View>

      <View style={styles.labelsBlock}>
        <Text style={styles.labels}>hours</Text>
        <Text style={styles.labels}>minutes</Text>
        <Text style={styles.labels}>seconds</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 16,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  labelsBlock: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 2,
  },
  labels: {
    color: theme.textSecondary,
  },
});
