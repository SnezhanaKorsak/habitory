import { StyleSheet, Text, View } from 'react-native';

import * as Progress from 'react-native-progress';

import { theme } from '../../../app/theme';
import { useAppSettings } from '../../../shared/config/i18n/useAppSettings';
import { IconButton } from '../../../shared/ui';
import { levels } from '../constants/levels';
import { useProgressStore } from '../model/useProgressStore';

type Props = {
  openBottomSheet: () => void;
};

export const ProgressInfo = ({ openBottomSheet }: Props) => {
  const { language } = useAppSettings();

  const currentXP = useProgressStore((state) => state.experience);
  const currentLevel =
    levels.find(
      (level) =>
        currentXP >= level.minExperience && currentXP <= level.maxExperience,
    ) ?? levels[0];

  const icon = currentLevel.icon;
  const levelName =
    language === 'ru' ? currentLevel.nameRU : currentLevel.nameEN;
  const levelDescription =
    language === 'ru' ? currentLevel.descriptionRU : currentLevel.descriptionEN;
  const maxXP = currentLevel.maxExperience;
  const minXP = currentLevel.minExperience;

  const percent = ((currentXP - minXP) * 100) / maxXP;

  return (
    <View style={styles.container}>
      <Progress.Circle
        progress={percent / 100}
        size={320}
        thickness={10}
        strokeCap="round"
        color={theme.accent200}
        unfilledColor={theme.border}
        showsText={true}
        formatText={() => (
          <View style={styles.block}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.levelName}>{levelName}</Text>
            <Text style={styles.levelDescription}>{levelDescription}</Text>
          </View>
        )}
      />
      <View>
        <View style={{ position: 'relative' }}>
          <Text style={styles.levelName}>
            {`${Math.round(currentXP)}  ${maxXP <= 50000 ? '/' : ''}`}
            {maxXP <= 50000 && (
              <Text style={{ color: theme.textSecondary }}>{maxXP}</Text>
            )}
            <Text> XP</Text>
          </Text>
        </View>

        <View style={styles.info}>
          <IconButton
            icon="info"
            color={theme.textSecondary}
            size={24}
            callback={openBottomSheet}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 140,
    lineHeight: 160,
  },
  levelName: {
    marginTop: 8,
    fontSize: 20,
    fontFamily: 'ShantellSans-Medium',
    textAlign: 'center',
  },
  levelDescription: {
    width: 200,
    marginTop: 0,
    paddingLeft: 16,
    color: theme.textSecondary,
    fontSize: 16,
    fontFamily: 'NeuchaRegular',
    textAlign: 'center',
  },
  info: {
    position: 'absolute',
    top: 10,
    right: -30,
  },
});
