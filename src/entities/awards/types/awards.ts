export type Award = {
  icon: string;
  name: string;
  level: number;
  goal: number;
  description: string;
  currentProgress: number;
};

export type AwardCategory = {
  category: AwardsCategoryNames;
  backgroundIcon: string;
  backgroundIconType: string;
  unit: string;
  levels: Award[];
};

export type AwardsCategoryNames =
  | 'activity'
  | 'all_stream'
  | 'one_stream'
  | 'overtop'
  | 'time';
