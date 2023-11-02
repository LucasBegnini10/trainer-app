import { emailIsValid, isEmpty } from "../../utils/validate";
import { useState } from "react";

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
  const [invalid, setInvalid] = useState(intialStateInvalid);
  const [data, setData] = useState(intialStateData);
  const [seePassword, setSeePassword] = useState(false);

  const setName = (name: string) =>
    setData((prev) => ({ ...prev, name: name }));

  const setEmail = (email: string) =>
    setData((prev) => ({ ...prev, email: email }));

  const setDocument = (document: string) =>
    setData((prev) => ({ ...prev, document: document }));

  const setPassword = (password: string) =>
    setData((prev) => ({ ...prev, password: password }));

  const toogleSeePassword = () => setSeePassword((prev) => !prev);

  return {
    invalid,

    data: {
      set: {
        setName,
        setEmail,
        setDocument,
        setPassword,
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
