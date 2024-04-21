import { useEffect } from "react";
import StartPage from "./(start)/start";
import { LogBox } from "react-native";

export default function IndexPage() {
  useEffect(() => {
    LogBox.ignoreLogs([
      "In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.",
    ]);
  }, []);

  return <StartPage />;
}
