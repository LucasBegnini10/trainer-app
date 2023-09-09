import Toast from "react-native-toast-message";
import { ToastShowParams } from "react-native-toast-message";

export const showToast = (params: ToastShowParams) => {
  const text1 = params.type === "success" ? "Eeba" : "Oops";
  Toast.show({
    ...params,
    position: params.position || "bottom",
    text1: params.text1 || text1,
  });
};
