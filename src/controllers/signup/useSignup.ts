import { useToast } from "native-base";
import { emailIsValid, isEmpty } from "../../utils/validate";
import { useState } from "react";
import { signUpMutation } from "../../services/auth/authMutation";
import { router } from "expo-router";

const defaultStateInvalid = { invalid: false, error: "" };
const intialStateInvalid = {
  name: defaultStateInvalid,
  email: defaultStateInvalid,
  document: defaultStateInvalid,
  password: defaultStateInvalid,
};

const intialStateData = {
  name: "",
  email: "",
  document: "",
  password: "",
};

export default function useSignup() {
  const toast = useToast();

  const [invalid, setInvalid] = useState(intialStateInvalid);
  const [data, setData] = useState(intialStateData);
  const [seePassword, setSeePassword] = useState(false);

  const resetInvalid = () => setInvalid(intialStateInvalid);

  const setName = (name: string) =>
    setData((prev) => ({ ...prev, name: name }));

  const setEmail = (email: string) =>
    setData((prev) => ({ ...prev, email: email }));

  const setDocument = (document: string) =>
    setData((prev) => ({ ...prev, document: document }));

  const setPassword = (password: string) =>
    setData((prev) => ({ ...prev, password: password }));

  const toogleSeePassword = () => setSeePassword((prev) => !prev);

  const validateFields = () => {
    if (isEmpty(data["name"])) {
      setInvalid((prev) => ({
        ...prev,
        name: {
          error: "Preencha seu nome",
          invalid: true,
        },
      }));
      toast.show({
        description: "Oops! Preencha seu nome",
        bgColor: "red.500",
      });
      return false;
    }
    resetInvalid();
    if (isEmpty(data["email"])) {
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
    if (isEmpty(data["document"])) {
      setInvalid((prev) => ({
        ...prev,
        document: {
          error: "Preencha seu documento",
          invalid: true,
        },
      }));
      toast.show({
        description: "Oops! Preencha seu documento",
        bgColor: "red.500",
      });
      return false;
    }
    resetInvalid();
    if (isEmpty(data["password"])) {
      setInvalid((prev) => ({
        ...prev,
        password: {
          error: "Preencha sua senha",
          invalid: true,
        },
      }));
      toast.show({
        description: "Oops! Preencha sua senha",
        bgColor: "red.500",
      });
      return false;
    }
    resetInvalid();
    if (!emailIsValid(data["email"])) {
      setInvalid((prev) => ({
        ...prev,
        email: {
          error: "Preencha o e-mail corretamente",
          invalid: true,
        },
      }));
      toast.show({
        description: "Oops! Preencha o e-mail corretamente",
        bgColor: "red.500",
      });
      return false;
    }
    resetInvalid();

    return true;
  };

  const handleSignup = () => {
    if (validateFields()) {
      mutation.mutate(data);
    }
  };

  const onSuccess = (content: { status: number }) => {
    if (content.status === 201) {
      toast.show({
        description: "Conta criada com sucesso",
        bgColor: "green.500",
      });
      router.push({
        pathname: "/login",
        params: {
          email: data["email"],
        },
      });
    } else {
      toast.show({
        description: "Ocorreu um erro. Tente novamente mais tarde",
        bgColor: "red.500",
      });
    }
  };

  const onError = (err: { status: number; data: unknown }) => {
    console.log("err.data =>", err.data);
    const actions = {
      422: () => {
        setInvalid((prev) => ({
          ...prev,
          document: {
            invalid: true,
            error: "Documento já existente",
          },
          email: {
            invalid: true,
            error: "E-mail já existente",
          },
        }));
        toast.show({
          description: "Dados já cadastrados",
          bgColor: "red.500",
        });
      },
    };

    const action = actions[err.status];
    action && action();
  };

  const mutation = signUpMutation(onSuccess, onError);

  return {
    invalid,
    handleSignup,
    loading: mutation.isLoading,
    data: {
      set: {
        name: setName,
        email: setEmail,
        document: setDocument,
        password: setPassword,
      },
      get: {
        name: data.name,
        email: data.email,
        document: data.document,
        password: data.password,
      },
    },
    seePassword,
    toogleSeePassword,
  };
}
