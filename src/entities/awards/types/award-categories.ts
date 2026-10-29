export type Award = {
  icon: string;
  nameRU: string;
  nameEN: string;
  level: number;
  goal: number;
  shortDescriptionRU: string;
  shortDescriptionEN: string;
  descriptionRU: string;
  descriptionEN: string;
};

export type AwardCategory = {
  category: AwardsCategoryNames;
  backgroundIcon: string;
  backgroundIconType: BackgroundIconType;
  backgroundColor: string;
  unitRU: string;
  unitEN: string;
  currentLevel: number;
  currentProgress: number;
  levels: Award[];
};

export type AwardsCategoryNames =
  | 'activity'
  | 'all_stream'
  | 'one_stream'
  | 'overtop'
  | 'time';

export type AwardsList = {
  category: AwardsCategoryNames;
  awards: Award[];
};

export type EarnedAwardsList = {
  category: AwardsCategoryNames;
  awards: (Award & { category: AwardsCategoryNames; earnedAt: Date })[];
};

export type AwardsListState = {
  category: AwardsCategoryNames;
  currentLevel: number;
  currentProgress: number;
  list: (Award & { category: AwardsCategoryNames; earnedAt: Date })[];
};

export type BackgroundIconType =
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'FontAwesome'
  | 'MaterialIcons';
