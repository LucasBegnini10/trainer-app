import { useMutation } from "@tanstack/react-query";
import { recoveryPassword, updatePassword, updateUserSerice } from "./userService";

export function updateUserMutation(
  cbSuccess: (content) => void,
  cbError: (err) => void
) {
  return useMutation({
    mutationFn: updateUserSerice,
    onError: cbError,
    onSuccess: cbSuccess,
  });
}

export function recoveryPasswordMutation(
  cbSuccess: (content) => void,
  cbError: (err) => void
) {
  return useMutation({
    mutationFn: recoveryPassword,
    onError: cbError,
    onSuccess: cbSuccess,
  });
}

export function updatePasswordMutation(
  cbSuccess: (content) => void,
  cbError: (err) => void
) {
  return useMutation({
    mutationFn: updatePassword,
    onError: cbError,
    onSuccess: cbSuccess,
  });
}
