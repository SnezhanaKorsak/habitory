import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { theme } from '../../../app/theme';
import { HabitsListByType } from '../../../entities/habits';
import { UpdateTimeResult } from '../../../features';
import { GhostButton, PrimaryButton } from '../../../shared/ui';
import { BottomSheet } from '../../../shared/ui/BottomSheet';
import { CountDownTimer, Layout } from '../../../widgets';

import { HabitType } from '../../../shared/types/habit';

export const TimerPage = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isShowCountDownTimer, setIsShowCountDownTimer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(true);

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
    setIsPlaying(true);
    setIsShowCountDownTimer(true);
  };

  const pauseTimer = () => {
    setIsPlaying((prevState) => !prevState);
  };

  const resumeTimer = () => {
    setIsPlaying(true);
  };

  const stopTimer = () => {
    setIsPlaying(false);
    setIsShowModal(true);
    setIsShowCountDownTimer(false);
  };

  const cancelOperation = () => {
    setIsPlaying(false);
    setCurrentValue(0);
    setIsShowModal(false);
  };

  const confirmOperation = () => {
    setIsShowModal(false);
    setIsOpenBottomSheet(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Layout>
        <View style={styles.container}>
          {isShowModal && (
            <Modal
              transparent={true}
              visible={isShowModal}
              animationType="fade"
            >
              <View style={styles.modal}>
                <Text style={styles.text}>Save record?</Text>
                <View style={styles.modalBtnBlock}>
                  <GhostButton
                    title="NO"
                    textStyle={{ color: theme.textPrimary }}
                    onPress={cancelOperation}
                  />
                  <GhostButton
                    title="YES"
                    textStyle={{ color: theme.accent100 }}
                    onPress={confirmOperation}
                  />
                </View>
              </View>
            </Modal>
          )}
          {isShowCountDownTimer ? (
            <View style={styles.countDown}>
              <CountDownTimer duration={currentValue} isPlaying={isPlaying} />
            </View>
          ) : (
            <View style={styles.timer}>
              <UpdateTimeResult
                currentValue={currentValue}
                setCurrentValue={setCurrentValue}
              />
            </View>
          )}

          {isShowCountDownTimer && isPlaying && (
            <PrimaryButton
              style={styles.groupBtn}
              onPress={pauseTimer}
              leftAddon={<Entypo name="controller-paus" size={26} />}
            >
              <Text style={styles.text}>PAUSE</Text>
            </PrimaryButton>
          )}

          {isShowCountDownTimer && !isPlaying && (
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

          {!isShowCountDownTimer && (
            <PrimaryButton
              style={styles.startBtn}
              onPress={startTimer}
              leftAddon={<Entypo name="controller-play" size={26} />}
            >
              <Text style={styles.text}>START</Text>
            </PrimaryButton>
          )}
        </View>
      </Layout>

      <BottomSheet
        isOpen={isOpenBottomSheet}
        title="Today"
        subtitle="Select an activity"
        onClose={() => setIsOpenBottomSheet(false)}
      >
        <HabitsListByType type={HabitType.time} />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginVertical: 8,
  },
  timer: {
    width: '100%',
    marginBottom: 40,
  },
  countDown: {
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    alignItems: 'center',
    backgroundColor: theme.bgAccent,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.border,
  },
  modalBtnBlock: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderColor: theme.border,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  },
});
