import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAudioPlayer } from 'expo-audio';

import { HabitsListByType } from '../../../entities/habits';
import {
  TimerControlButtons,
  TimerStatus,
  TimerType,
  TimerTypeSelectionButtons,
} from '../../../entities/timer';
import { ConfirmTimerRecord, SaveTimerRecord } from '../../../features';
import { BottomSheet } from '../../../shared/ui/BottomSheet';
import { CountDownTimer, Layout, Stopwatch } from '../../../widgets';

import { HabitType } from '../../../shared/types/habit';

export const TimerPage = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [isShowRecordModal, setIsShowRecordModal] = useState(false);
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [habitId, setHabitId] = useState('');
  const [time, setTime] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const [timerStatus, setTimerStatus] = useState<TimerStatus>('start');
  const [timerType, setTimerType] = useState<TimerType>('countdown');

  const player = useAudioPlayer(
    require('../../../../assets/sounds/timerEndSound.mp3'),
  );

  const isError = timerType === 'countdown' && currentValue === 0;
  const isPlaying = timerStatus === 'play';

  const cancelOperation = () => {
    setCurrentValue(0);
    setResetKey((prevState) => prevState + 1);

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

  const onCompleteCountdown = () => {
    player.seekTo(0);
    player.play();

    setIsShowConfirmModal(true);
    setTimerStatus('start');
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

          {timerType === 'stopwatch' && (
            <View style={styles.timer}>
              <Stopwatch
                resetKey={resetKey}
                timerStatus={timerStatus}
                onSetTime={setTime}
              />
            </View>
          )}

          {timerType === 'countdown' && (
            <View style={styles.timer}>
              <CountDownTimer
                timerStatus={timerStatus}
                duration={currentValue}
                isPlaying={isPlaying}
                currentValue={currentValue}
                onSetTime={setTime}
                setCurrentValue={setCurrentValue}
                onCompleteCountdown={onCompleteCountdown}
              />
            </View>
          )}

          <TimerControlButtons
            timerStatus={timerStatus}
            isError={isError}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
