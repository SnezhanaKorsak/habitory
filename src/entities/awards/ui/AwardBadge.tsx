import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

import { theme } from '../../../app/theme';
import { useAppSettings } from '../../../shared/config/i18n/useAppSettings';

import { StackNavigationProp } from '../../../shared/types';
import {
  Award,
  AwardCategory,
  AwardsCategoryNames,
} from '../types/award-categories';

type Props = {
  award: Award & { category?: AwardsCategoryNames; earnedAt?: Date };
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
  const navigation = useNavigation<StackNavigationProp>();

  const { language } = useAppSettings();
  const isRussianLanguage = language === 'ru';

  const {
    category,
    backgroundIcon,
    backgroundIconType,
    backgroundColor,
    unitRU,
    unitEN,
    currentProgress,
  } = awardInfo;
  const {
    icon,
    nameRU,
    nameEN,
    shortDescriptionRU,
    shortDescriptionEN,
    goal,
    earnedAt,
  } = award;

  const awardName = isRussianLanguage ? nameRU : nameEN;
  const shortDescription = isRussianLanguage
    ? shortDescriptionRU
    : shortDescriptionEN;
  const unit = isRussianLanguage ? unitRU : unitEN;

  const IconComponent = mappedIconComponent[backgroundIconType];

  const cardWidth = isEarned ? 160 : '45%';

  const goToAwardPage = () => {
    navigation.navigate('Award', {
      awardCategory: category,
      isEarned,
      earnedAt: earnedAt ?? '',
    });
  };

  return (
    <View style={[styles.container, { width: cardWidth }]}>
      <View style={styles.box}>
        <Pressable
          onPress={goToAwardPage}
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

      <View style={styles.info}>
        <Text style={styles.title}>{awardName}</Text>
        {isEarned ? (
          <Text style={styles.description}>{shortDescription}</Text>
        ) : (
          <Text
            style={styles.description}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
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
    width: '100%',
    height: 120,
    marginRight: 20,
    position: 'relative',
  },
  info: {
    width: '100%',
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
    textAlign: 'center',
    fontFamily: 'ShantellSans-Medium',
  },
  description: {
    fontSize: 14,
    color: theme.textSecondary,
    fontFamily: 'NeuchaRegular',
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
