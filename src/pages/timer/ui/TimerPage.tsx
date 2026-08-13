import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { theme } from '../../../app/theme';
import { UpdateTimeResult } from '../../../features';
import { PrimaryButton } from '../../../shared/ui';
import { Layout } from '../../../widgets';

export const TimerPage = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isShowCountDownTimer, setIsShowCountDownTimer] = useState(false);

  const startTimer = () => {
    if (currentValue === 0) {
      Toast.show({
        type: 'error',
        text1: 'Please, enter a valid interval!',
        position: 'top',
        topOffset: 150,
      });
      return;
    }

    setIsShowCountDownTimer(true);
  };

  const resumeTimer = () => {};
  const stopTimer = () => {};

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.timer}>
          <UpdateTimeResult
            currentValue={currentValue}
            setCurrentValue={setCurrentValue}
          />
        </View>

        {isShowCountDownTimer ? (
          <View style={styles.buttonBlock}>
            <PrimaryButton
              style={styles.groupBtn}
              onPress={resumeTimer}
              leftAddon={<Entypo name="controller-play" size={26} />}
            >
              <Text style={styles.text}>Resume</Text>
            </PrimaryButton>

            <PrimaryButton
              style={styles.groupBtn}
              backgroundColor={'#D89B7C'}
              onPress={stopTimer}
              leftAddon={<Entypo name="controller-stop" size={26} />}
            >
              <Text style={styles.text}>Stop</Text>
            </PrimaryButton>
          </View>
        ) : (
          <PrimaryButton
            style={styles.startBtn}
            onPress={startTimer}
            leftAddon={<Entypo name="controller-play" size={26} />}
          >
            <Text style={styles.text}>Start</Text>
          </PrimaryButton>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  timer: {
    width: '100%',
    marginBottom: 30,
  },
  buttonBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 30,
  },
  startBtn: {
    width: 150,
  },
  groupBtn: {
    width: '35%',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
