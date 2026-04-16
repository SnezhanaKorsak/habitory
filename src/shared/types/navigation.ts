import { NavigationProp } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';

export type TypeRootStackParamList = {
  Awards: undefined;
  Edit: { habitId: string };
  Habits: undefined;
  New: undefined;
  Progress: undefined;
  Onboarding: undefined;
  Timer: undefined;
};

export type MenuItemType = {
  iconName: keyof typeof MaterialIcons.glyphMap;
  path: keyof TypeRootStackParamList;
};

export type NavFunction = (name: keyof TypeRootStackParamList) => void;

export type StackNavigationProp = NavigationProp<TypeRootStackParamList>;
