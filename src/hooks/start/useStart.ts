import { router } from "expo-router";
import { useDisclose, useTheme } from "native-base";

export default function useStart() {
  const disclose = useDisclose();

  const navigateLogin = () => router.push("/login");

  return { disclose, navigateLogin };
}
