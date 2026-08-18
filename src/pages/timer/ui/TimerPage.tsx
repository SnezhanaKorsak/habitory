import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { HabitsListByType } from '../../../entities/habits';
import {
  TimerControlButtons,
  TimerStatus,
  TimerType,
  TimerTypeSelectionButtons,
} from '../../../entities/timer';
import {
  ConfirmTimerRecord,
  SaveTimerRecord,
  UpdateTimeResult,
} from '../../../features';
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
  const [time, setTime] = useState(0);

  const [timerStatus, setTimerStatus] = useState<TimerStatus>('start');
  const [timerType, setTimerType] = useState<TimerType>('stopwatch');

  const cancelOperation = () => {
    setIsPlaying(false);
    setCurrentValue(0);
    setIsShowConfirmModal(false);
    setIsShowRecordModal(false);
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
              habitId={habitId}
              time={time}
              onSaveTime={onSaveTime}
              onCancelOperation={cancelOperation}
            />
          )}

          <TimerTypeSelectionButtons
            timerType={timerType}
            setTimerType={setTimerType}
          />

          {isShowCountDownTimer ? (
            <View style={styles.countDown}>
              <CountDownTimer
                duration={currentValue}
                isPlaying={isPlaying}
                onSetRemainingTime={setTime}
              />
            </View>
          ) : (
            <View style={styles.timer}>
              <UpdateTimeResult
                currentValue={currentValue}
                setCurrentValue={setCurrentValue}
              />
            </View>
          )}

          <TimerControlButtons
            timerStatus={timerStatus}
            isError={currentValue === 0}
            setIsShowConfirmModal={setIsShowConfirmModal}
            setTimerStatus={setTimerStatus}
          />
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
});
