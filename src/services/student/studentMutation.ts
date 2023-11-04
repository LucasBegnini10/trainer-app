import { useMutation } from "@tanstack/react-query";
import { createStudentService } from "./studentService";

export function createStudentMutation(
  cbSuccess: (content) => void,
  cbError: (err) => void
) {
  return useMutation({
    mutationFn: createStudentService,
    onError: cbError,
    onSuccess: cbSuccess,
  });
}
