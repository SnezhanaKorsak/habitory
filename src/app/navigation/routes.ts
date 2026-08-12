import {
  AwardsPage,
  EditHabitPage,
  HabitsPage,
  NewHabitPage,
  OnboardingPage,
  ProgressPage,
  TimerPage,
} from '../../pages';
import { AllEarnedAwardsPage } from '../../pages/awards/ui/AllEarnedAwardsPage';

export const routes = [
  {
    name: 'Awards',
    component: AwardsPage,
  },
  {
    name: 'AllEarnedAwards',
    component: AllEarnedAwardsPage,
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
    name: 'Progress',
    component: ProgressPage,
  },
  {
    name: 'Timer',
    component: TimerPage,
  },
];
