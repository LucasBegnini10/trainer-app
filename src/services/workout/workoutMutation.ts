import { useMutation } from "@tanstack/react-query";
import { createWorkout, putWorkoutsExercises, putWorkoutsStudents } from "./workoutService";

export function createWorkoutMutation(
  cbSuccess: (content) => void,
  cbError: (err) => void
) {
  return useMutation({
    mutationFn: createWorkout,
    onError: cbError,
    onSuccess: cbSuccess,
  });
}

export function putWorkoutStudentsMutation(
  cbSuccess: (content) => void,
  cbError: (err) => void
) {
  return useMutation({
    mutationFn: putWorkoutsStudents,
    onError: cbError,
    onSuccess: cbSuccess,
  });
}

export function putWorkoutExercisesMutation(
  cbSuccess: (content) => void,
  cbError: (err) => void
) {
  return useMutation({
    mutationFn: putWorkoutsExercises,
    onError: cbError,
    onSuccess: cbSuccess,
  });
}
