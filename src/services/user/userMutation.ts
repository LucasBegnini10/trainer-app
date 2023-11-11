import { useMutation } from "@tanstack/react-query"
import { updateUserSerice } from "./userService";

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