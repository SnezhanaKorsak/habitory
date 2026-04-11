import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../../app/theme';
import { WheelPicker } from './WheelPicker';

const hoursData = Array.from({ length: 25 }, (_, i) => i);
const minutesData = Array.from({ length: 60 }, (_, i) => i);
const secondsData = Array.from({ length: 60 }, (_, i) => i);

type Props = {
  value: number;
  onChange: (val: number) => void;
};

export const TimerPicker = ({ value, onChange }: Props) => {
  const [visible, setVisible] = useState(false);

  const initialHours = Math.floor(value / 3600);
  const initialMinutes = Math.floor((value % 3600) / 60);
  const initialSeconds = value % 60;

  const [h, setH] = useState(initialHours);
  const [m, setM] = useState(initialMinutes);
  const [s, setS] = useState(initialSeconds);

  const open = () => setVisible(true);
  const close = () => setVisible(false);
  const cancel = () => {
    setH(initialHours);
    setM(initialMinutes);
    setS(initialSeconds);
    setVisible(false);
  };

  const save = () => {
    onChange(h * 3600 + m * 60 + s);
    close();
  };

  return (
    <>
      <Pressable onPress={open} style={styles.input}>
        <Text>
          {`${h.toString().padStart(2, '0')}:${m
            .toString()
            .padStart(2, '0')}:${s.toString().padStart(2, '0')}`}
        </Text>
      </Pressable>

      <Modal transparent={true} visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>Set Timer</Text>

            <View style={styles.row}>
              <WheelPicker data={hoursData} value={h} onChange={setH} />
              <WheelPicker data={minutesData} value={m} onChange={setM} />
              <WheelPicker data={secondsData} value={s} onChange={setS} />
            </View>

            <View style={styles.labels}>
              <Text>h</Text>
              <Text>m</Text>
              <Text>s</Text>
            </View>

            <View style={styles.actions}>
              <Pressable onPress={cancel}>
                <Text>Cancel</Text>
              </Pressable>
              <Pressable onPress={save}>
                <Text style={{ fontWeight: 'bold' }}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },

  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  labels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
