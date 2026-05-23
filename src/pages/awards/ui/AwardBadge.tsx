import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

import { theme } from '../../../app/theme';

import {
  Award,
  AwardCategory,
} from '../../../entities/awards/types/award-categories';

type Props = {
  award: Award;
  awardInfo: AwardCategory;
  isEarned?: boolean;
};

const mappedIconComponent = {
  Ionicons: Ionicons,
  MaterialCommunityIcons: MaterialCommunityIcons,
  FontAwesome: FontAwesome,
  MaterialIcons: MaterialIcons,
};

export const AwardBadge = ({ awardInfo, award, isEarned = false }: Props) => {
  const { backgroundIcon, backgroundIconType, backgroundColor, unit } =
    awardInfo;
  const {
    icon,
    name: awardName,
    shortDescription,
    currentProgress,
    goal,
  } = award;

  //const currentProgress = 0;

  const IconComponent = mappedIconComponent[backgroundIconType];

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <IconComponent
            name={backgroundIcon as keyof typeof IconComponent.glyphMap}
            size={120}
            color={backgroundColor}
          />

          <View
            style={[
              styles.icon,
              { marginTop: backgroundIcon === 'triangle' ? 15 : 0 },
            ]}
          >
            {isEarned ? (
              <Text style={styles.emoji}>{icon}</Text>
            ) : (
              <Text style={styles.question}>?</Text>
            )}
          </View>
        </Pressable>
      </View>

      <View style={{ width: 120 }}>
        <Text style={styles.title}>{awardName}</Text>
        {isEarned ? (
          <Text style={styles.description}>{shortDescription}</Text>
        ) : (
          <Text style={styles.description}>
            {`${currentProgress}/${goal} ${unit}`}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  box: {
    width: 120,
    height: 120,
    marginRight: 20,
    position: 'relative',
  },
  icon: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
  },
  question: {
    fontSize: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonPressed: {
    transform: [{ scale: 0.9 }],
  },
});
