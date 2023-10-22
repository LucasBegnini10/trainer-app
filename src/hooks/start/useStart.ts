import { router } from "expo-router";
import { useDisclose } from "native-base";

export default function useStart() {
  const disclose = useDisclose();

  const navigateLogin = () => router.push("/login");

  return { disclose, navigateLogin };
}
