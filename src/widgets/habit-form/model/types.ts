import { HabitType } from '../../../entities/habit';

export type HabitFormData = {
  type: HabitType;
  name: string;
  description: string;
  numericGoal?: number;
  numericUnit?: string;
  timerGoal?: number;
  icon: string;
  color: string;
};

export type ChangeFormHandler = <K extends keyof HabitFormData>(
  key: K,
  value: HabitFormData[K],
) => void;

export type SelectHabitType = {
  key: string;
  value: HabitType;
};
