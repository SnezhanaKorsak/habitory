import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

import { theme } from '../../../app/theme';
import { GhostButton } from '../../../shared/ui';

type Props = {
  isShowModal: boolean;
  onCancelOperation: () => void;
  onConfirmOperation: () => void;
};

export const ConfirmTimerRecord = ({
  isShowModal,
  onCancelOperation,
  onConfirmOperation,
}: Props) => {
  return (
    <Modal transparent={true} visible={isShowModal} animationType="fade">
      <View style={styles.modal}>
        <Text style={styles.text}>Save record?</Text>
        <View style={styles.modalBtnBlock}>
          <GhostButton
            title="NO"
            textStyle={{ color: theme.textPrimary }}
            onPress={onCancelOperation}
          />
          <GhostButton
            title="YES"
            textStyle={{ color: theme.accent100 }}
            onPress={onConfirmOperation}
          />
        </View>
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
    height: '20%',
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
