import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { theme } from '../../../app/theme';
import { generateDays, generateHeatmapMatrix } from '../../../shared/lib';
import { CompleteCheckHabit } from '../../complete-check-habit';
import { CompleteNumericHabit } from '../../complete-numeric-habit';

import { HabitType } from '../../../shared/types/habit';

type Props = {
  habitId: string;
  color: string;
  type: HabitType;
  completedDays: string[];
};

export const HabitHeatMap = ({
  habitId,
  color,
  type,
  completedDays,
}: Props) => {
  const [visibleCheckModal, setVisibleCheckModal] = useState(false);
  const [visibleNumericModal, setVisibleNumericModal] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  const days = generateDays();
  const weeks = generateHeatmapMatrix(days);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: false });
    }, 0);
  }, []);

  const openModal = () => {
    switch (type) {
      case HabitType.check:
        return setVisibleCheckModal(true);
      case HabitType.numeric:
        return setVisibleNumericModal(true);
    }
  };

  return (
    <>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <Pressable onPress={openModal} style={styles.container}>
          {weeks.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.week}>
              {week.map((day, dayIndex) => {
                if (!day) {
                  return <View key={dayIndex} style={styles.emptyDay} />;
                }
                const completed = completedDays.includes(day.date);

                return (
                  <View
                    key={day.date}
                    style={[
                      styles.day,
                      {
                        backgroundColor: completed ? color : theme.bgShadow,
                      },
                    ]}
                  />
                );
              })}
            </View>
          ))}
        </Pressable>
      </ScrollView>

      <CompleteCheckHabit
        habitId={habitId}
        visibleModal={visibleCheckModal}
        setVisible={setVisibleNumericModal}
      />

      <CompleteNumericHabit
        habitId={habitId}
        visibleModal={visibleNumericModal}
        setVisible={setVisibleNumericModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexWrap: 'wrap',
  },
  day: {
    width: 16,
    height: 16,
    margin: 2,
    borderRadius: 3,
  },
  week: {
    flexDirection: 'column',
  },
  pressed: {
    transform: [{ scale: 0.9 }],
  },
  emptyDay: {
    width: 16,
    height: 16,
    margin: 2,
    opacity: 0,
  },
});
