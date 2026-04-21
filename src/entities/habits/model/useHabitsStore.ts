import AsyncStorage from '@react-native-async-storage/async-storage';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { Habit, HabitFormData } from '../../../shared/types/habit';

type State = {
  habits: Habit[];
  loading: boolean;
  error: string | null;
};

type Action = {
  getHabitById: (id: string) => Habit | undefined;
  addHabit: (habit: Habit) => void;
  updateHabit: (id: string, formData: HabitFormData) => void;
  deleteHabit: (id: string) => void;
  completeHabit: (id: string, day: string) => void;
  updateNumericResult: (id: string, day: string, value: number) => void;
  updateTimeResult: (id: string, day: string, value: number) => void;
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

      updateHabit: (habitId, formData) =>
        set((state) => {
          state.habits = state.habits.map((h) =>
            h.id === habitId ? { ...h, ...formData } : h,
          );
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

      updateNumericResult: (id: string, day: string, value: number) =>
        set((state: State) => {
          const habit = state.habits.find((h) => h.id === id);
          if (!habit) return;

          habit.numericResults[day] = value;

          if (value >= habit.numericGoal!) {
            habit.completedDays.push(day);
          } else {
            habit.completedDays = habit.completedDays.filter((d) => d !== day);
          }
        }),

      updateTimeResult: (id: string, day: string, value: number) =>
        set((state: State) => {
          const habit = state.habits.find((h) => h.id === id);
          if (!habit) return;

          habit.timeResults[day] = value;

          if (value >= habit.timerGoal!) {
            habit.completedDays.push(day);
          } else {
            habit.completedDays = habit.completedDays.filter((d) => d !== day);
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
