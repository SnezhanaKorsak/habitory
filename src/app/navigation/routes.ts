import {
  AwardsPage,
  EditHabitPage,
  HabitsPage,
  NewHabitPage,
  OnboardingPage,
  TimerPage,
} from '../../pages';

export const routes = [
  {
    name: 'Awards',
    component: AwardsPage,
  },
  {
    name: 'Edit',
    component: EditHabitPage,
  },
  {
    name: 'Habits',
    component: HabitsPage,
  },
  {
    name: 'New',
    component: NewHabitPage,
  },
  {
    name: 'Onboarding',
    component: OnboardingPage,
  },
  {
    name: 'Timer',
    component: TimerPage,
  },
] as const;

export type RouteKeys = keyof typeof routes;
