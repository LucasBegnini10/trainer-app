import { useToast } from "native-base";
import { emailIsValid, isEmpty, passwordIsValid } from "../../utils/validate";
import { useState } from "react";
import { signUpMutation } from "../../services/auth/authMutation";
import { onlyNumbers } from "../../utils/string";
import { applyMask } from "../../utils/mask";
import { authService } from "../../services/auth/authService";
import { createTrainerService } from "../../services/trainer/trainerService";
import useLogin from "../login/useLogin";

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
  const { onSuccess: successlogin } = useLogin();

  const [invalid, setInvalid] = useState(intialStateInvalid);
  const [data, setData] = useState(intialStateData);
  const [seePassword, setSeePassword] = useState(false);

  const resetInvalid = () => setInvalid(intialStateInvalid);

  const setName = (name: string) =>
    setData((prev) => ({ ...prev, name: name }));

  const setEmail = (email: string) =>
    setData((prev) => ({ ...prev, email: email }));

  const setDocument = (document: string) => {
    const unmasked = onlyNumbers(document);
    let masked = document;

    if (unmasked.length === 11) {
      masked = applyMask.cpf(unmasked);
    } else if (unmasked.length === 14) {
      masked = applyMask.cnpj(unmasked);
    }

    setData((prev) => ({ ...prev, document: masked }));
  };

  const setPassword = (password: string) =>
    setData((prev) => ({ ...prev, password: password }));

  const toogleSeePassword = () => setSeePassword((prev) => !prev);

  const handleSignup = () => {
    if (validateFields()) {
      mutation.mutate({
        ...data,
        document: onlyNumbers(data["document"]),
      });
    }
  };

  const onSuccess = async () => {
    toast.show({
      description: "Conta criada com sucesso",
      bgColor: "green.500",
    });

    const {
      data: { token },
    } = await authService({ email: data.email, password: data.password });

    console.log({token})

    // await createTrainerService(data.email, token);
    // successlogin({ data: { token } });
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
    if (!passwordIsValid(data["password"])) {
      setInvalid((prev) => ({
        ...prev,
        password: {
          error:
            "A senha precisa conter pelo menos 8 caracteres, 1 número, 1 maiúscula, 1 minúscula e 1 caractere especial",
          invalid: true,
        },
      }));
      toast.show({
        description: "Oops! Preencha a senha corretamente",
        bgColor: "red.500",
      });
      return false;
    }
    resetInvalid();

    return true;
  };

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
