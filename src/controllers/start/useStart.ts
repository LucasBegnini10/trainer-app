import { router } from "expo-router";
import { useDisclose } from "native-base";
import { useEffect } from "react";
import { get } from "../../utils/storage";
import { useUserStore } from "../../stores/useUserStore";

export default function useStart() {
  const disclose = useDisclose();
  const token = useUserStore((state) => state.token);

  const navigateLogin = () => router.push("/login");
  const navigateSignup = () => router.push("/signup");

  useEffect(() => {
    userIsLogged();
  }, []);

  const userIsLogged = async () => {
    const saveData = await get("@saveData");
    const userSavedData = saveData && JSON.parse(saveData);

    if (userSavedData && token) {
      //TODO: get user data and type
      router.push("/student/home");
    }
  };

  return { disclose, navigateLogin, navigateSignup };
}
