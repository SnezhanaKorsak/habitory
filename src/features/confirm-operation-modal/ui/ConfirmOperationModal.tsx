import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { theme } from '../../../app/theme';
import { GhostButton } from '../../../shared/ui';

type Props = {
  isShowModal: boolean;
  title: string;
  description?: string;
  onCancelOperation: () => void;
  onConfirmOperation: () => void;
};

export const ConfirmOperationModal = ({
  isShowModal,
  title,
  description,
  onCancelOperation,
  onConfirmOperation,
}: Props) => {
  return (
    <Modal transparent={true} visible={isShowModal} animationType="fade">
      <TouchableWithoutFeedback onPress={onCancelOperation}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.text}>{title}</Text>
            {description && (
              <Text style={styles.description}>{description}</Text>
            )}

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
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    minHeight: '20%',
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
  description: {
    fontSize: 18,
    marginTop: 10,
    color: theme.textSecondary,
  },
  modalBtnBlock: {
    flexDirection: 'row',
    height: 56,
    width: '100%',
    borderTopWidth: 1,
    borderColor: theme.border,
    alignItems: 'stretch',
    justifyContent: 'space-around',
    marginTop: 8,
  },
});
