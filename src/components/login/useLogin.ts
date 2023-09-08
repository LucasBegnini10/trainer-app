import { useState } from "react";

export default function useLogin() {
  const [seePassword, setSeePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveData, setSaveData] = useState(false);
  const [invalid, setInvalid] = useState({
    email: {
      invalid: false,
      error: "",
    },
    password: {
      invalid: false,
      error: "",
    },
  });

  const toogleSeePassword = () => setSeePassword((prev) => !prev);

  const handleLogin = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(console.log({ success: true, token: 123 }));
      }, 2000);
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
  };
}
