import { useMutation } from "@tanstack/react-query";
import api from "./api";

interface AuthType {
  email: string;
  password: string;
}

export default function loginService(
  cbSuccess: () => void,
  cbError: () => void
) {
  const auth = async (login: AuthType) => {
    return await api
      .post("/auth", login)
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  };

  const authMutation = useMutation({
    mutationFn: (login: AuthType) => auth(login),
    onError: cbError,
    onSuccess: cbSuccess,
  });

  return authMutation;
}
