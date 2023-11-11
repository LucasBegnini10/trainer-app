import { create } from "zustand";
import { UserModel } from "../models/models";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clear } from "../utils/storage";

interface UserStoreType {
  user: UserModel;
  token: string;
  getId: () => string;
  setToken: (token: string) => void;
  setUser: (user: UserModel) => void;
  clear: () => Promise<void>;
}

export const useUserStore = create<UserStoreType>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setToken: (token: string) => set((state) => ({ ...state, token: token })),
      setUser: (user: UserModel) => set((state) => ({ ...state, user: user })),
      clear: async () => {
        await clear();
        set(() => ({
          user: null,
          token: null,
        }));
      },
      getId: () => {
        return ""
      }
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
