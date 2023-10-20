import AsyncLocalStorage from "@react-native-async-storage/async-storage";

export const setStorage = async (key: string, value: string) =>
  await AsyncLocalStorage.setItem(key, value);

export const getStorage = async (key: string) =>
  await AsyncLocalStorage.getItem(key);

export const getKeys = async () => await AsyncLocalStorage.getAllKeys();

export const clearStorage = async () => await AsyncLocalStorage.clear();
