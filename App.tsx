import { useCallback } from "react";
import { Text, View, useColorScheme } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
      }}
    >
      <Text style={{ fontSize: 28, fontFamily: "Inter-Bold" }}>Inter-Bold</Text>
    </View>
  );
}

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Light": require("./assets/Inter/static/Inter-Light.ttf"),
    "Inter-Regular": require("./assets/Inter/static/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/Inter/static/Inter-Medium.ttf"),
    "Inter-Bold": require("./assets/Inter/static/Inter-Bold.ttf"),
    "Inter-Black": require("./assets/Inter/static/Inter-Black.ttf"),
  });

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
      <HomeScreen />
    </SafeAreaProvider>
  );
}
