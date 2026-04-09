import { Image,StyleSheet, Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../../../app/theme';

export const OnboardingPage = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: top * 2,
      }}
    >
      <View>
        <Text style={styles.title}>Digital Habits Tracker</Text>
        <Text style={styles.description}>Your habits, your power</Text>
      </View>

      <Image
        source={require('../../../../assets/bg-image.jpg')}
        style={styles.img}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: theme.bgPrimary,
  },
  title: {
    fontSize: 64,
    textAlign: 'center',
    fontFamily: 'FastelarDemoRegular',
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    fontFamily: 'BritishTimes',
    textAlign: 'center',
    color: theme.accent100,
  },
  img: {
    width: '100%',
    height: 550,
  },
});
