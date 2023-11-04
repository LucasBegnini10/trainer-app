import { create } from "zustand";
import { UserModel } from "../models/models";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserStoreType {
  user: UserModel;
  token: string;
  setToken: (token: string) => void;
  setUser: (user: UserModel) => void;
  clear: () => void;
}

export const useUserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setToken: (token: string) => set((state) => ({ ...state, token: token })),
      setUser: (user: UserModel) => set((state) => ({ ...state, user: user })),
      clear: () =>
        set(() => ({
          user: null,
          token: null,
        })),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
