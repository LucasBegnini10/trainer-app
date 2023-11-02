import { useMutation } from "@tanstack/react-query";
import { IAuth, IAuthSignUp, signUpService, authService } from "./authService";

export function authMutation(cbSuccess: (content) => void, cbError: (err) => void) {
  return useMutation({
    mutationFn: (auth: IAuth) => authService(auth),
    onError: cbError,
    onSuccess: cbSuccess,
  });
}

export function signUpMutation(cbSuccess: () => void, cbError: () => void) {
  return useMutation({
    mutationFn: (account: IAuthSignUp) => signUpService(account),
    onError: cbError,
    onSuccess: cbSuccess,
  });
}
