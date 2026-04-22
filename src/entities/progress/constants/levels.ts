import { Level } from '../types/progress';

export const levels: Level[] = [
  {
    icon: '🐣',
    name: 'Beginner',
    minExperience: 0,
    maxExperience: 150,
  },
  {
    icon: '🌱',
    name: 'Starter',
    minExperience: 151,
    maxExperience: 300,
  },
  {
    icon: '🔥',
    name: 'Progressing',
    minExperience: 301,
    maxExperience: 700,
  },
  {
    icon: '⚡',
    name: 'Active',
    minExperience: 701,
    maxExperience: 1500,
  },
  {
    icon: '🧱',
    name: 'Consistent',
    minExperience: 1501,
    maxExperience: 3000,
  },
  {
    icon: '⚔️',
    name: 'Disciplined',
    minExperience: 3001,
    maxExperience: 6000,
  },
  {
    icon: '🧠',
    name: 'Mindful',
    minExperience: 6001,
    maxExperience: 12000,
  },
  {
    icon: '💎',
    name: 'Advanced',
    minExperience: 12001,
    maxExperience: 25000,
  },
  {
    icon: '👑',
    name: 'Habit Master',
    minExperience: 25001,
    maxExperience: 50000,
  },
  {
    icon: '🏅',
    name: 'Legend',
    minExperience: 50001,
    maxExperience: 500000000000000,
  },
];
