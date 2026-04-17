import { FeatherIconName } from './icons';

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

export type Habit = HabitFormData & {
  id: string;
  createdAt: Date;
  completedDays: string[];
  numericResults: { [key: string]: number }[];
  timeResults: { [key: string]: number }[];
};

export type SelectHabitType = {
  key: string;
  value: HabitType;
};

export enum HabitType {
  check = 'WITH A YES OR NO',
  numeric = 'WITH A NUMERIC VALUE',
  time = 'WITH A TIMER',
}
