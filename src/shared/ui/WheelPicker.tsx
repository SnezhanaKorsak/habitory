import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { theme } from '../../app/theme';

const ITEM_HEIGHT = 40;
const LOOP_MULTIPLIER = 50;

type Props = {
  data: number[];
  value: number;
  onChange: (val: number) => void;
};

export const WheelPicker = ({ data, value, onChange }: Props) => {
  const ref = useRef<FlatList>(null);

  const loopedData = useMemo(() => {
    return Array(LOOP_MULTIPLIER).fill(data).flat();
  }, [data]);

  const middleIndex = Math.floor(loopedData.length / 2);

  const [activeIndex, setActiveIndex] = useState(middleIndex + value);

  useEffect(() => {
    const targetIndex = middleIndex + value;

    ref.current?.scrollToOffset({
      offset: targetIndex * ITEM_HEIGHT,
      animated: false,
    });

    setActiveIndex(targetIndex);
  }, [value, middleIndex]);

  const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);

    setActiveIndex(index);

    const realIndex = index % data.length;
    const realValue = data[realIndex];

    onChange(realValue);

    if (index < data.length || index > loopedData.length - data.length) {
      const newIndex = middleIndex + realIndex;

      setActiveIndex(newIndex);

      ref.current?.scrollToOffset({
        offset: newIndex * ITEM_HEIGHT,
        animated: false,
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={loopedData}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(_, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        contentContainerStyle={{
          paddingVertical: ITEM_HEIGHT,
        }}
        renderItem={({ item, index }) => {
          const isActive = index === activeIndex;

          return (
            <View style={styles.item}>
              <Text style={[styles.text, isActive && styles.activeText]}>
                {item.toString().padStart(2, '0')}
              </Text>
            </View>
          );
        }}
      />

      <View pointerEvents="none" style={styles.overlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT * 3,
    width: 60,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: theme.textSecondary,
  },
  activeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.textPrimary,
  },
  overlay: {
    position: 'absolute',
    top: ITEM_HEIGHT,
    left: 0,
    right: 0,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.border,
  },
});
