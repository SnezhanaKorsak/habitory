import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../app/theme';

import { FeatherIconName } from '../../../shared/types';

type Props = {
  isShowModal: boolean;
  habitName?: string;
  icon?: FeatherIconName;
  color?: string;
  time?: number;
  onSaveTime: () => void;
};

export const SaveTimerRecord = ({
  isShowModal,
  habitName,
  icon,
  color,
  time,
  onSaveTime,
}: Props) => {
  return (
    <Modal transparent={true} visible={isShowModal} animationType="fade">
      <View style={styles.modal}>
        <Text style={styles.text}>Save record?</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  text: {
    fontSize: 22,
    fontWeight: 'bold',
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
