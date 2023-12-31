import { useMutation } from "@tanstack/react-query";
import { createTrainerService } from "./trainerService";

export function createTrainerMutation(
  cbSuccess: (content) => void,
  cbError: (err) => void
) {
  return useMutation({
    mutationFn: createTrainerService,
    onError: cbError,
    onSuccess: cbSuccess,
  });
}
