import { HabitType } from '../../../entities/habit';

import { FeatherIconName } from '../../../shared/types';

export type HabitFormData = {
  type: HabitType;
  name: string;
  description?: string;
  numericGoal?: number;
  numericUnit?: string;
  timerGoal?: number;
  icon: FeatherIconName;
  color: string;
};

export type SelectHabitType = {
  key: string;
  value: HabitType;
};
