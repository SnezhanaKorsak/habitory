import { StyleSheet, Text, View } from 'react-native';

import { Entypo } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import { theme } from '../../../app/theme';
import { useAppSettings } from '../../../shared/config/i18n/useAppSettings';
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
  const { language } = useAppSettings();
  const { t } = useTranslation();

  const isRussian = language === 'ru';
  const btnWidth = isRussian ? '80%' : '40%';

  const startTimer = () => {
    if (isError) {
      Toast.show({
        type: 'error',
        text2: t('timer.error'),
        text2Style: {
          color: theme.textPrimary,
          fontSize: 18,
          fontFamily: 'NeuchaRegular',
        },
        position: 'top',
        topOffset: 150,
      });
      return;
    }
    setTimerStatus('play');
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
  };

  return (
    <>
      {timerStatus === 'start' && (
        <PrimaryButton
          style={styles.startBtn}
          onPress={startTimer}
          leftAddon={<Entypo name="controller-play" size={26} />}
        >
          <Text style={styles.text}>{t('common.start')}</Text>
        </PrimaryButton>
      )}

      {timerStatus === 'play' && (
        <PrimaryButton
          style={styles.startBtn}
          onPress={pauseTimer}
          leftAddon={<Entypo name="controller-paus" size={26} />}
        >
          <Text style={styles.text}>{t('common.pause')}</Text>
        </PrimaryButton>
      )}

      {timerStatus === 'pause' && (
        <View
          style={styles[isRussian ? 'buttonBlockColumn' : 'buttonBlockRow']}
        >
          <PrimaryButton
            style={[styles.groupBtn, { width: btnWidth }]}
            onPress={resumeTimer}
            leftAddon={<Entypo name="controller-play" size={26} />}
          >
            <Text style={styles.text}>{t('common.resume')}</Text>
          </PrimaryButton>

          <PrimaryButton
            style={[styles.groupBtn, { width: btnWidth }]}
            backgroundColor={'#DDCDA2'}
            onPress={stopTimer}
            leftAddon={<Entypo name="controller-stop" size={26} />}
          >
            <Text style={styles.text}>{t('common.stop')}</Text>
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
    fontFamily: 'ShantellSans-Medium',
  },
  groupBtn: {
    width: '40%',
  },
  buttonBlockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 30,
  },
  buttonBlockColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 30,
  },
});
