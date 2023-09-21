import { router } from "expo-router";
import { emailIsValid, isEmpty } from "../../utils/validate";
import { useState } from "react";

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
  const [seePassword, setSeePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveData, setSaveData] = useState(false);
  const [invalid, setInvalid] = useState(intialStateInvalid);
  const [loading, setLoading] = useState(false);

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
      return false;
    }
    resetInvalid();

    if (!emailIsValid(email)) {
      setInvalid((prev) => ({
        ...prev,
        email: {
          error: "Preencha seu e-mail corretamente`",
          invalid: true,
        },
      }));
      return false;
    }
    resetInvalid();

    return true;
  };

  const handleLogin = async () => {
    router.push("/home");
    // if (!validateFields()) return;
    // return new Promise((resolve) => {
    //   setLoading(true);
    //   setTimeout(() => {
    //     setLoading(false);
    //     resolve({ success: true, token: 123 });
    //   }, 2000);
    // });
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
    loading,
  };
}
