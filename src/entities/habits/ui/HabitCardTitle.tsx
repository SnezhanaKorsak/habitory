import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { theme } from '../../../app/theme';
import { capitalizeFirstLetter } from '../../../shared/lib';

import { FeatherIconName, StackNavigationProp } from '../../../shared/types';

type Props = {
  id: string;
  icon: FeatherIconName;
  title: string;
  description?: string;
};

export const HabitCardTitle = ({ icon, title, description, id }: Props) => {
  const navigation = useNavigation<StackNavigationProp>();

  const onPressHandler = () => {
    navigation.navigate('Edit', { habitId: id });
  };

  return (
    <Pressable
      onPress={onPressHandler}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={styles.icon}>
        <Feather name={icon} size={22} />
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {capitalizeFirstLetter(title)}
        </Text>
        {description && (
          <Text style={styles.description} numberOfLines={1}>
            {capitalizeFirstLetter(description)}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: {
    transform: [{ scale: 0.9 }],
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.bgShadow,
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 6,
  },
  info: {
    height: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: 'PlayfairDisplay-Bold',
  },
  description: {
    fontSize: 16,
    fontFamily: 'NeuchaRegular',
  },
});
