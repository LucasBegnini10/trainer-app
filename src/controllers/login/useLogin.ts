import { emailIsValid, isEmpty } from "../../utils/validate";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useToast } from "native-base";
import { authMutation } from "../../services/auth/authMutation";
import { useUserStore } from "../../stores/useUserStore";
import { set } from "../../utils/storage";

const intialStateInvalid = {
  email: {
    invalid: false,
    error: "",
  },
  password: {
    invalid: false,
    error: "",
  },
};

export default function useLogin() {
  const toast = useToast();
  const item = useLocalSearchParams();
  const setToken = useUserStore((state) => state.setToken);

  const [seePassword, setSeePassword] = useState(false);
  const [email, setEmail] = useState((item?.email as string) || "begninilucas12@gmail.com");
  const [password, setPassword] = useState("Qyon@2022");
  const [saveData, setSaveData] = useState(false);
  const [invalid, setInvalid] = useState(intialStateInvalid);

  const toogleSeePassword = () => setSeePassword((prev) => !prev);
  const resetInvalid = () => setInvalid(intialStateInvalid);

  const validateFields = () => {
    if (isEmpty(email)) {
      setInvalid((prev) => ({
        ...prev,
        email: {
          error: "Preencha seu e-mail",
          invalid: true,
        },
      }));
      toast.show({
        description: "Oops! Preencha seu e-mail",
        bgColor: "red.500",
      });
      return false;
    }
    resetInvalid();

    if (isEmpty(password)) {
      setInvalid((prev) => ({
        ...prev,
        password: {
          error: "Preencha seu senha",
          invalid: true,
        },
      }));
      toast.show({
        description: "Oops! Preencha sua senha!",
        bgColor: "red.500",
      });
      return false;
    }
    resetInvalid();

    if (!emailIsValid(email)) {
      setInvalid((prev) => ({
        ...prev,
        email: {
          error: "Preencha seu e-mail corretamente",
          invalid: true,
        },
      }));
      toast.show({
        description: "Oops! Preencha um e-mail válido",
        bgColor: "red.500",
      });
      return false;
    }
    resetInvalid();

    return true;
  };

  const handleLogin = async () => {
    if (validateFields()) {
      mutation.mutate({
        email,
        password,
      });
    }
  };

  const onSuccess = async (content: { data: { token: string } }) => {
    const token = content.data.token;
    setToken(token);

    if (saveData) await set("@saveData", "true");
    router.push("/student/home");
  };

  const onError = (err: { status: number }) => {
    const context = {
      403: invalidCredentials,
      404: invalidCredentials,
    };

    const action = context[err.status];
    action && action();
  };

  const mutation = authMutation(onSuccess, onError);

  const invalidCredentials = () => {
    setInvalid((prev) => ({
      ...prev,
      email: {
        error: "",
        invalid: true,
      },
      password: {
        error: "",
        invalid: true,
      },
    }));
    toast.show({
      description: "E-mail/Senha inválidos",
      bgColor: "red.500",
    });
  };

  return {
    email,
    setEmail,
    invalid,
    handleLogin,
    seePassword,
    toogleSeePassword,
    password,
    setPassword,
    saveData,
    setSaveData,
    loading: mutation.isLoading,
  };
}
