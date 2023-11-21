import { useMutation } from "@tanstack/react-query";
import { createExercise } from "./exerciseService";

export function createExerciseMutation(
  cbSuccess: (content) => void,
  cbError: (err) => void
) {
  return useMutation({
    mutationFn: createExercise,
    onError: cbError,
    onSuccess: cbSuccess,
  });
}
