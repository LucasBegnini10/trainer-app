import { ColorMode, StorageManager } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem("@my-app-color-mode");
      return val === "dark" ? "dark" : "light";
    } catch (e) {
      console.log(e);
      return "light";
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem("@my-app-color-mode", value);
    } catch (e) {
      console.log(e);
    }
  },
};
