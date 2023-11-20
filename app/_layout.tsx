import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { colorModeManager } from "../src/utils/colorModeManager";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {theme} from "../src/theme/theme"

SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../assets/Roboto/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../assets/Roboto/Roboto-Bold.ttf"),
    "Roboto-Black": require("../assets/Roboto/Roboto-Black.ttf"),
    "Xspace-Regular": require("../assets/Xspace-Regular/Xspace-Regular.otf"),

  });

  const queryClient = new QueryClient();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider colorModeManager={colorModeManager} theme={theme}>
          <StatusBar style="auto" />
          <Slot />
        </NativeBaseProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
