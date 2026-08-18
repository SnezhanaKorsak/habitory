import { StyleSheet, Text, View } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { PrimaryButton } from '../../../shared/ui';

import { TimerStatus } from '../types';

type Props = {
  timerStatus: TimerStatus;
  isError: boolean;
  setTimerStatus: (status: TimerStatus) => void;
  setIsShowConfirmModal: (isShowConfirmModal: boolean) => void;
};

export const TimerControlButtons = ({
  timerStatus,
  isError,
  setTimerStatus,
  setIsShowConfirmModal,
}: Props) => {
  const startTimer = () => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: 'Please, enter a valid interval!',
        position: 'top',
        topOffset: 150,
      });
      return;
    }
    setTimerStatus('play');
    //setIsShowCountDownTimer(true);
  };

  const pauseTimer = () => {
    setTimerStatus('pause');
  };

  const resumeTimer = () => {
    setTimerStatus('play');
  };

  const stopTimer = () => {
    setTimerStatus('start');
    setIsShowConfirmModal(true);
    // setIsShowCountDownTimer(false);
  };

  return (
    <>
      {timerStatus === 'start' && (
        <PrimaryButton
          style={styles.startBtn}
          onPress={startTimer}
          leftAddon={<Entypo name="controller-play" size={26} />}
        >
          <Text style={styles.text}>START</Text>
        </PrimaryButton>
      )}

      {timerStatus === 'play' && (
        <PrimaryButton
          style={styles.startBtn}
          onPress={pauseTimer}
          leftAddon={<Entypo name="controller-paus" size={26} />}
        >
          <Text style={styles.text}>PAUSE</Text>
        </PrimaryButton>
      )}

      {timerStatus === 'pause' && (
        <View style={styles.buttonBlock}>
          <PrimaryButton
            style={styles.groupBtn}
            onPress={resumeTimer}
            leftAddon={<Entypo name="controller-play" size={26} />}
          >
            <Text style={styles.text}>RESUME</Text>
          </PrimaryButton>

          <PrimaryButton
            style={styles.groupBtn}
            backgroundColor={'#DDCDA2'}
            onPress={stopTimer}
            leftAddon={<Entypo name="controller-stop" size={26} />}
          >
            <Text style={styles.text}>STOP</Text>
          </PrimaryButton>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  startBtn: {
    width: 150,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  groupBtn: {
    width: '35%',
  },
  buttonBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 30,
  },
});
