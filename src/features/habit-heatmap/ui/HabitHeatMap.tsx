import { useEffect, useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { theme } from '../../../app/theme';
import { generateDays, generateHeatmapMatrix } from '../../../shared/lib';

type Props = {
  color: string;
  completed: boolean;
};

export const HabitHeatMap = ({ color, completed }: Props) => {
  const scrollRef = useRef<ScrollView>(null);

  const days = generateDays();
  const weeks = generateHeatmapMatrix(days);

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: false });
    }, 0);
  }, []);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <Pressable onPress={() => console.log('press')} style={styles.container}>
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.week}>
            {week.map((day, dayIndex) => {
              if (!day) {
                return <View key={dayIndex} style={styles.emptyDay} />;
              }
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
