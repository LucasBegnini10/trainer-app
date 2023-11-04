import AsyncStorage from "@react-native-async-storage/async-storage";

export const set = async (key: string, value: string) =>
  await AsyncStorage.setItem(key, value);

export const get = async (key: string) => await AsyncStorage.getItem(key);

export const clear = async () => await AsyncStorage.clear();

export const keys = async () => await AsyncStorage.getAllKeys();
