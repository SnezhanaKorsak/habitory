import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { HabitsListByType } from '../../../entities/habits';
import {
  ConfirmTimerRecord,
  SaveTimerRecord,
  UpdateTimeResult,
} from '../../../features';
import { PrimaryButton } from '../../../shared/ui';
import { BottomSheet } from '../../../shared/ui/BottomSheet';
import { CountDownTimer, Layout } from '../../../widgets';

import { HabitType } from '../../../shared/types/habit';

export const TimerPage = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isShowCountDownTimer, setIsShowCountDownTimer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [isShowRecordModal, setIsShowRecordModal] = useState(false);
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [habitId, setHabitId] = useState('');

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
    setIsShowConfirmModal(true);
    setIsShowCountDownTimer(false);
  };

  const cancelOperation = () => {
    setIsPlaying(false);
    setCurrentValue(0);
    setIsShowConfirmModal(false);
  };

  const confirmOperation = () => {
    setIsShowConfirmModal(false);
    setIsOpenBottomSheet(true);
  };

  const selectHabit = (habitId: string) => {
    setHabitId(habitId);
    setIsOpenBottomSheet(false);
    setIsShowRecordModal(true);
  };

  const onSaveTime = () => {
    console.log(habitId, 'habit');
    setIsShowRecordModal(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Layout>
        <View style={styles.container}>
          {isShowConfirmModal && (
            <ConfirmTimerRecord
              isShowModal={isShowConfirmModal}
              onCancelOperation={cancelOperation}
              onConfirmOperation={confirmOperation}
            />
          )}

          {isShowRecordModal && (
            <SaveTimerRecord
              isShowModal={isShowRecordModal}
              onSaveTime={onSaveTime}
            />
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
        <HabitsListByType type={HabitType.time} onSelect={selectHabit} />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
