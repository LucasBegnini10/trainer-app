import { emailIsValid, isEmpty } from "../../utils/validate";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useToast } from "native-base";
import { authMutation } from "../../services/auth/authMutation";

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

  const [seePassword, setSeePassword] = useState(false);
  const [email, setEmail] = useState(item?.email as string || "");
  const [password, setPassword] = useState("");
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

  const onSuccess = () => {
    console.log("SUCCESSO");
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
