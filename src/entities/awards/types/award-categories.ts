export type Award = {
  icon: string;
  name: string;
  level: number;
  goal: number;
  shortDescription: string;
  description: string;
  currentProgress: number;
};

export type AwardCategory = {
  category: AwardsCategoryNames;
  backgroundIcon: string;
  backgroundIconType: BackgroundIconType;
  backgroundColor: string;
  unit: string;
  currentLevel: number;
  levels: Award[];
};

export type AwardsCategoryNames =
  | 'activity'
  | 'all_stream'
  | 'one_stream'
  | 'overtop'
  | 'time';

export type AvailableAwards = {
  category: AwardsCategoryNames;
  award: Award;
};

export type AwardsListState = {
  category: AwardsCategoryNames;
  level: number;
};

export type BackgroundIconType =
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'FontAwesome'
  | 'MaterialIcons';
