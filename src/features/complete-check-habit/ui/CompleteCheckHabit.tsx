import { Modal, StyleSheet, Text,View } from 'react-native';

import { Calendar, DateData } from 'react-native-calendars';

import { theme } from '../../../app/theme';
import { useHabitsStore } from '../../../entities/habits';
import { IconButton } from '../../../shared/ui';

type Props = {
  habitId: string;
  visibleModal: boolean;
  setVisible: (visible: boolean) => void;
};

export const CompleteCheckHabit = ({
  habitId,
  visibleModal,
  setVisible,
}: Props) => {
  const habit = useHabitsStore((state) => state.getHabitById(habitId));
  const completeHabit = useHabitsStore((state) => state.completeHabit);

  if (!habit) return null;

  const currentDay = new Date().toLocaleDateString('en-CA');
  const markedDates = habit.completedDays.reduce(
    (obj, day) => {
      obj[day] = { selected: true };
      return obj;
    },
    {} as Record<string, { selected: boolean }>,
  );

  const dayPressHandler = (day: DateData) => {
    completeHabit(habitId, day.dateString);
  };

  return (
    <Modal transparent={true} visible={visibleModal} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <View style={{ width: '80%' }}>
              <Text
                style={styles.title}
              >{'Tap a date to mark the habit\u00A0as\u00A0done'}</Text>
            </View>
            <IconButton icon="x" callback={() => setVisible(false)} />
          </View>

          <Calendar
            style={styles.calendar}
            firstDay={1}
            current={currentDay}
            maxDate={currentDay}
            onDayPress={(day) => dayPressHandler(day)}
            markedDates={{
              [currentDay]: {
                customStyles: {
                  container: {
                    borderRadius: '50%',
                    borderWidth: 2,
                    borderColor: theme.accent200,
                  },
                  text: {
                    color: theme.accent200,
                    fontWeight: 'bold',
                  },
                },
              },
              ...markedDates,
            }}
            markingType="custom"
            theme={{
              backgroundColor: theme.bgSecondary,
              calendarBackground: theme.bgSecondary,
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: theme.accent200,
              selectedDayTextColor: '#ffffff',
              todayTextColor: theme.accent200,
              dayTextColor: theme.textPrimary,
              textDisabledColor: theme.textShadow,
              arrowColor: theme.accent200,
            }}
          />
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
    width: '90%',
    backgroundColor: theme.bgSecondary,
    borderRadius: 16,
    padding: 16,
  },
  calendar: {
    height: 350,
    backgroundColor: theme.bgSecondary,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    marginRight: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
