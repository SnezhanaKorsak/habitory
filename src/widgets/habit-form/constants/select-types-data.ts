import { HabitType } from '../../../entities/habit';

import { SelectHabitType } from '../model/types';

export const typesData: SelectHabitType[] = [
  { key: '1', value: HabitType.check },
  { key: '2', value: HabitType.numeric },
  { key: '3', value: HabitType.time },
];
