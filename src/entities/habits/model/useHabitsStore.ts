import AsyncStorage from '@react-native-async-storage/async-storage';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Habit } from '../../../shared/types/habit';

type State = {
  habits: Habit[];
  loading: boolean;
  error: string | null;
};

type Action = {
  getHabitById: (id: string) => Habit | undefined;
  addHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  completeHabit: (id: string, day: string) => void;
};

export const useHabitsStore = create<State & Action>()(
  persist(
    immer((set, get) => ({
      habits: [],
      loading: false,
      error: null,

      getHabitById: (id: string) => {
        return get().habits.find((h) => h.id === id);
      },

      addHabit: (habit) =>
        set((state) => {
          state.habits.push(habit);
        }),

      deleteHabit: (id: string) =>
        set((state: State) => {
          state.habits = state.habits.filter((habit) => habit.id !== id);
        }),

      completeHabit: (id: string, day: string) =>
        set((state: State) => {
          const habit = state.habits.find((h) => h.id === id);
          if (!habit) return;

          const exists = habit.completedDays.includes(day);

          if (exists) {
            habit.completedDays = habit.completedDays.filter((d) => d !== day);
          } else {
            habit.completedDays.push(day);
          }
        }),
    })),
    {
      name: 'habits',
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        habits: state.habits,
      }),
    },
  ),
);
