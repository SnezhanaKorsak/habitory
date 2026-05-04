import { StyleSheet, Text, View } from 'react-native';

import * as Progress from 'react-native-progress';

import { theme } from '../../../app/theme';
import { IconButton } from '../../../shared/ui';

type Props = {
  openBottomSheet: () => void;
};

export const ProgressInfo = ({ openBottomSheet }: Props) => {
  const icon = '🐣';
  const levelName = 'Beginner';
  const currentXP = 45;
  const maxXP = 150;

  const percent = (currentXP * 100) / maxXP;

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
          <View>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.levelName}>{levelName}</Text>
          </View>
        )}
      />
      <View>
        <View style={{ position: 'relative' }}>
          <Text style={styles.levelName}>
            {`${currentXP} / `}
            <Text style={{ color: theme.textSecondary }}>{maxXP}</Text>
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
  icon: {
    fontSize: 150,
    lineHeight: 170,
  },
  levelName: {
    marginTop: 20,
    fontSize: 36,
    fontFamily: 'FastelarDemoRegular',
    textAlign: 'center',
  },
  info: {
    position: 'absolute',
    top: 10,
    right: -30,
  },
});
