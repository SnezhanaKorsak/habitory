import { Modal, StyleSheet, Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';

import '../../../shared/config/calendar/locale';
import { theme } from '../../../app/theme';
import { useHabitsStore } from '../../../entities/habits';
import { useAppSettings } from '../../../shared/config/i18n/useAppSettings';
import { formatDate } from '../../../shared/lib/date';
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

  const { t } = useTranslation();
  const { language } = useAppSettings();

  if (!habit) return null;

  LocaleConfig.defaultLocale = language === 'ru' ? 'ru' : 'en';

  const today = new Date();
  const currentDay = formatDate(today);
  const minDate = formatDate(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
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
              <Text style={styles.title}>{t('habits.checkTitle')}</Text>
            </View>
            <IconButton icon="x" callback={() => setVisible(false)} />
          </View>

          <Calendar
            key={language.startsWith('ru') ? 'ru' : 'en'}
            style={styles.calendar}
            firstDay={1}
            current={currentDay}
            minDate={minDate}
            maxDate={currentDay}
            hideExtraDays={true}
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
    fontSize: 18,
    marginRight: 6,
    fontFamily: 'NeuchaRegular',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
