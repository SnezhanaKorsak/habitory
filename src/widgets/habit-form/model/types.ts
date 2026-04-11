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
