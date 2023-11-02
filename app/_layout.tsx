import { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, theme } from "native-base";
import { colorModeManager } from "../src/utils/colorModeManager";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Inter-Light": require("../assets/Inter/static/Inter-Light.ttf"),
    "Inter-Regular": require("../assets/Inter/static/Inter-Regular.ttf"),
    "Inter-Medium": require("../assets/Inter/static/Inter-Medium.ttf"),
    "Inter-Bold": require("../assets/Inter/static/Inter-Bold.ttf"),
    "Inter-Black": require("../assets/Inter/static/Inter-Black.ttf"),
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
