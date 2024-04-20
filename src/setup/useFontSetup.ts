import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useCallback } from "react";

export default function useFontSetup() {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("../../assets/Roboto/Roboto-Light.ttf"),
    "Roboto-Regular": require("../../assets/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../../assets/Roboto/Roboto-Bold.ttf"),
    "Roboto-Black": require("../../assets/Roboto/Roboto-Black.ttf"),
    "Xspace-Regular": require("../../assets/Xspace-Regular/Xspace-Regular.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

 

  return {
    onLayoutRootView,
    fontsLoaded
  }
}
