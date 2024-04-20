import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { colorModeManager } from "../src/utils/colorModeManager";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "../src/theme/theme";
import useFontSetup from "../src/setup/useFontSetup";

SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const queryClient = new QueryClient();

  const { fontsLoaded, onLayoutRootView } = useFontSetup();

  if (!fontsLoaded) return null;

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
