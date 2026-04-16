import AsyncStorage from '@react-native-async-storage/async-storage';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Habit } from '../../../shared/types/habit';

type State = {
  habits: Habit[];
  loading: boolean;
  error: string | null;
};

type Action = {
  addHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
};

export const useHabitsStore = create<State & Action>()(
  persist(
    (set) => ({
      habits: [],
      loading: false,
      error: null,

      addHabit: (habit) =>
        set((state) => ({
          habits: [...state.habits, habit],
        })),
      deleteHabit: (id: string) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        })),
    }),
    {
      name: 'habits',

      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        habits: state.habits,
      }),
    },
  ),
);
