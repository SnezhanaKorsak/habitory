import { NavigationProp, RouteProp } from '@react-navigation/native';

import { MaterialIcons } from '@expo/vector-icons';

export type TypeRootStackParamList = {
  Awards: undefined;
  AllEarnedAwards: undefined;
  Award: { awardCategory: string; isEarned: boolean };
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

export type StackRouteProp<T extends keyof TypeRootStackParamList> = RouteProp<
  TypeRootStackParamList,
  T
>;
