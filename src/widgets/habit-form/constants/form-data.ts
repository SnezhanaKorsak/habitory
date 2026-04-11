import { HabitType } from '../../../entities/habit';

import { FeatherIconName } from '../../../shared/types';
import { SelectHabitType } from '../model/types';

export const formData: SelectHabitType[] = [
  { key: '1', value: HabitType.check },
  { key: '2', value: HabitType.numeric },
  { key: '3', value: HabitType.time },
];

export const previewIcons: FeatherIconName[] = [
  'activity',
  'archive',
  'book-open',
  'calendar',
  'clock',
  'code',
  'coffee',
  'dollar-sign',
  'droplet',
  'file-text',
  'film',
  'heart',
  'headphones',
  'home',
  'music',
  'pen-tool',
  'trash-2',
  'star',
];
