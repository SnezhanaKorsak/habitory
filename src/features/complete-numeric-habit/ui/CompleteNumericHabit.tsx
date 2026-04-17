import { Modal, StyleSheet, Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { theme } from '../../../app/theme';
import { useHabitsStore } from '../../../entities/habits';
import { IconButton } from '../../../shared/ui';
import { ChangeNumericResult } from './ChangeNumericResult';

type Props = {
  habitId: string;
  visibleModal: boolean;
  setVisible: (visible: boolean) => void;
};

export const CompleteNumericHabit = ({
  habitId,
  visibleModal,
  setVisible,
}: Props) => {
  const habit = useHabitsStore((state) => state.getHabitById(habitId));

  if (!habit) return null;

  const { icon, name, color } = habit;
  const today = new Date();

  const currentValue = 0;

  return (
    <Modal transparent={true} visible={visibleModal} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title} numberOfLines={1}>
                {name}
              </Text>
              <Text style={[styles.title, { color }]}>
                {today.toLocaleDateString('ru')}
              </Text>
            </View>
            <Feather name={icon} size={30} color={color} />
          </View>

          <ChangeNumericResult currentValue={currentValue} color={color} />

          <IconButton icon="x" callback={() => setVisible(false)} />
        </View>
      </View>
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
    width: '80%',
    backgroundColor: theme.bgSecondary,
    borderRadius: 16,
    padding: 16,
  },
  title: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderBottomColor: theme.border,
  },
  info: {
    flexDirection: 'row',
  },
});
