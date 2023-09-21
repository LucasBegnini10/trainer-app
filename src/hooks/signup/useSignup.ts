import { showToast } from "../../utils/toast";
import { emailIsValid, isEmpty } from "../../utils/validate";
import { useState } from "react";

const defaultStateInvalid = { invalid: false, error: "" };
const intialStateInvalid = {
  name: defaultStateInvalid,
  phone: defaultStateInvalid,
  email: defaultStateInvalid,
  password: defaultStateInvalid,
  confirmPassword: defaultStateInvalid,
};

const intialStateData = {
  name: "",
  phone: "",
  email: "",
  document: "",
  password: "",
  confirmPassword: "",
};

export default function useSignup() {
  const [invalid, setInvalid] = useState(intialStateInvalid);
  const [data, setData] = useState(intialStateData);
  const [loading, setLoading] = useState(false);
  const [seePassword, setSeePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const setName = (name: string) =>
    setData((prev) => ({ ...prev, name: name }));

  const setEmail = (email: string) =>
    setData((prev) => ({ ...prev, email: email }));

  const setDocument = (document: string) =>
    setData((prev) => ({ ...prev, document: document }));

  const setPhone = (phone: string) =>
    setData((prev) => ({ ...prev, phone: phone }));

  const setPassword = (password: string) =>
    setData((prev) => ({ ...prev, password: password }));

  const setConfirmPassword = (confirmPassword: string) =>
    setData((prev) => ({ ...prev, confirmPassword: confirmPassword }));

  const toogleSeePassword = () =>
    setSeePassword((prev) => ({ ...prev, password: !prev.password }));

  const toogleSeeConfirmPassword = () =>
    setSeePassword((prev) => ({
      ...prev,
      confirmPassword: !prev.confirmPassword,
    }));

  return {
    invalid,
    loading,

    data: {
      set: {
        setName,
        setEmail,
        setDocument,
        setPhone,
        setPassword,
        setConfirmPassword,
      },
      get: {
        name: data.name,
        email: data.email,
        document: data.document,
        phone: data.phone,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
    },
    seePassword: {
      get: {
        password: seePassword.password,
        confirmPassword: seePassword.confirmPassword,
      },
      toogle: {
        password: toogleSeePassword,
        confirmPassword: toogleSeeConfirmPassword,
      },
    },
  };
}
