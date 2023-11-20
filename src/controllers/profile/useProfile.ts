import { useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { UserModel } from "../../models/models";
import { isEmpty } from "../../utils/validate";
import { useToast } from "native-base";
import { clear } from "../../utils/storage";
import { router } from "expo-router";
import { updateUserMutation } from "../../services/user/userMutation";
import { getUser } from "../../services/user/userService";

const initialStateInvalid = {
  name: false,
  email: false,
  document: false,
};

export default function useProfile() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const toast = useToast();

  const [userData, setUserData] = useState<UserModel>(user);
  const [invalid, setInvalid] = useState(initialStateInvalid);

  const [showUpdatePassword, setShowUpdatePassword] = useState(false)

  const setName = (name: string) =>
    setUserData((prev) => ({
      ...prev,
      name: name,
    }));

  const setDocument = (document: string) =>
    setUserData((prev) => ({
      ...prev,
      document: document,
    }));

  const setEmail = (email: string) =>
    setUserData((prev) => ({
      ...prev,
      email: email,
    }));

  const resetInvalid = () => setInvalid(initialStateInvalid);

  const validateFields = () => {
    if (isEmpty(userData.name)) {
      setInvalid((prev) => ({
        ...prev,
        name: true,
      }));
      toast.show({
        description: "Preencha seu nome",
        bgColor: "red.500",
      });
      return false;
    }
    resetInvalid();
    if (isEmpty(userData.email)) {
      setInvalid((prev) => ({
        ...prev,
        email: true,
      }));
      toast.show({
        description: "Preencha seu e-mail",
        bgColor: "red.500",
      });
      return false;
    }
    resetInvalid();
    if (isEmpty(userData.document)) {
      setInvalid((prev) => ({
        ...prev,
        document: true,
      }));
      toast.show({
        description: "Preencha seu documento",
        bgColor: "red.500",
      });
      return false;
    }
    resetInvalid();

    return true;
  };

  const handleUpdateUser = () => {
    if (validateFields()) {
      mutation.mutate({
        document: userData.document,
        email: userData.email,
        name: userData.name,
      });
    }
  };

  const onSuccess = async () => {
    toast.show({
      description: "Dados salvos com sucesso",
      bgColor: "green.500",
    });
    const { user: _user } = await getUser(user.id);
    console.log(_user)

    setUser(_user);
  };

  const onError = (err: { status: number; data: unknown }) => {
    console.log(err.status);
    console.log(err.data);
  };

  const mutation = updateUserMutation(onSuccess, onError);

  const logout = async () => {
    router.replace("/login");
    await clear();
  };

  const onShowUpdatePassword = () => setShowUpdatePassword(true)
  const onCloseUpdatePassword = () => setShowUpdatePassword(false) 

  return {
    userData,
    logout,
    handleUpdateUser,
    invalid,
    setName,
    setEmail,
    setDocument,
    loading: mutation.isLoading,
    updatePassword: {
      onShow: onShowUpdatePassword,
      onClose: onCloseUpdatePassword,
      showUpdatePassword
    }
  };
}
