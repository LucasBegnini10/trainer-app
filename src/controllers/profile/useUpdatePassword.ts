import { useEffect, useState } from "react";
import { passwordIsValid } from "../../utils/validate";
import { useToast } from "native-base";
import { updatePasswordMutation } from "../../services/user/userMutation";
import { useUserStore } from "../../stores/useUserStore";

const initialInvalidState = {
  current: {
    invalid: false,
    message: "",
  },
  new: {
    invalid: false,
    message: "",
  },
};

export default function useUpdatePassword(onClose: () => void) {
  const user = useUserStore((state) => state.user);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [invalid, setInvalid] = useState(initialInvalidState);

  const toast = useToast();

  const onSuccess = (data) => {
    toast.show({
      description: "Senha alterada com sucesso!",
      bgColor: "green.500",
    });
    cleanFields();
    onClose();
  };

  const cleanFields = () => {
    setCurrentPassword("");
    setNewPassword("");
  };

  const onError = (error) => {
    if (error.status === 401) {
      setInvalid((prev) => ({
        ...prev,
        current: {
          invalid: true,
          message: "A senha atual está incorreta",
        },
      }));
    }
  };

  const mutation = updatePasswordMutation(onSuccess, onError);
  const resetInvalid = () => setInvalid(initialInvalidState);

  const validateFields = () => {
    resetInvalid();
    if (!passwordIsValid(currentPassword)) {
      setInvalid((prev) => ({
        ...prev,
        current: {
          message:
            "A senha precisa conter pelo menos 8 caracteres, 1 número, 1 maiúscula, 1 minúscula e 1 caractere especial",
          invalid: true,
        },
      }));
      return false;
    }
    resetInvalid();
    if (!passwordIsValid(newPassword)) {
      setInvalid((prev) => ({
        ...prev,
        new: {
          message:
            "A senha precisa conter pelo menos 8 caracteres, 1 número, 1 maiúscula, 1 minúscula e 1 caractere especial",
          invalid: true,
        },
      }));
      return false;
    }
    resetInvalid();

    return true;
  };

  const handleUdpatePassword = () => {
    if (validateFields()) {
      mutation.mutate({
        actualPassword: currentPassword,
        email: user.email,
        newPassword: newPassword,
      });
    }
  };

  return {
    handleUdpatePassword,
    newPassword: {
      newPassword,
      setNewPassword,
    },
    currentPassword: {
      currentPassword,
      setCurrentPassword,
    },

    setInvalid,
    invalid,

    loading: mutation.isLoading,
  };
}
