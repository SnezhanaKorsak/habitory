import AsyncStorage from '@react-native-async-storage/async-storage';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

type State = {
  experience: number;
  lastActivityDate: string;
  xpByDay: Record<string, number>;
};

type Action = {
  addXP: (value: number) => void;
  subtractXP: (value: number) => void;
  setLastActivityDate: (date: string) => void;
  setXPForDay: (day: string, value: number) => void;
};

export const useProgressStore = create<State & Action>()(
  persist(
    immer((set) => ({
      experience: 0,
      lastActivityDate: '',
      xpByDay: {},

      addXP: (value) =>
        set((state) => {
          state.experience += value;
        }),

      subtractXP: (value) =>
        set((state) => {
          state.experience = Math.max(0, state.experience - value);
        }),

      setLastActivityDate: (date) =>
        set((state) => {
          state.lastActivityDate = date;
        }),

      setXPForDay: (day, value) =>
        set((state) => {
          state.xpByDay = {
            ...state.xpByDay,
            [day]: value,
          };
        }),
    })),
    {
      name: 'progress',
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        experience: state.experience,
      }),
    },
  ),
);
