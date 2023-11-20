import { useState } from "react";
import { recoveryPasswordMutation } from "../../services/user/userMutation";
import { emailIsValid } from "../../utils/validate";
import { useToast } from "native-base";
import { router } from "expo-router";

export default function useForgotPassword() {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const onSuccess = () => {
    toast.show({
      description: "E-mail enviado com sucesso!",
      bgColor: "green.500",
    });
    router.push("/login");
  };

  const onError = (err) => {
    toast.show({
      description:
        "Não foi possível recuperar sua senha. Tente novamente mais tarde",
      bgColor: "red.500",
    });
  };

  const mutation = recoveryPasswordMutation(onSuccess, onError);

  const handleRecoveryPassword = () => {
    if (!emailIsValid(email)) {
      toast.show({
        description: "Preencha o e-mail corretamente!",
        bgColor: "red.500",
      });

      return false;
    }

    mutation.mutate(email);
  };

  return {
    handleRecoveryPassword,
    loading: mutation.isLoading,
    email,
    setEmail,
  };
}
