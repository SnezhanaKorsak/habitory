import { ActivityIndicator } from 'react-native';

import { theme } from '../../app/theme';

export const Loader = () => {
  return <ActivityIndicator color={theme.accent200} size={120} />;
};
