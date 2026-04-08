import { Feather } from '@expo/vector-icons';

export type TypeRootStackParamList = {
  Awards: undefined;
  Edit: undefined;
  Habits: undefined;
  New: undefined;
  Onboarding: undefined;
  Timer: undefined;
};

export type MenuItemType = {
  iconName: keyof typeof Feather.glyphMap;
  path: keyof TypeRootStackParamList;
};

export type NavFunction = (name: keyof TypeRootStackParamList) => void;
