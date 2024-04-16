import { useQuery } from "@tanstack/react-query";
import { GetWorkoutsType, getWorkout, getWorkouts } from "./workoutService";

export function getWorkoutQuery(workoutId: string) {
  return useQuery({
    queryFn: () => getWorkout(workoutId),
    queryKey: ["workout", workoutId],
  });
}

export function getWorkoutsQuery(params: GetWorkoutsType) {
  return useQuery({
    queryFn: () => getWorkouts(params),
    queryKey: ["workout", ...[params]],
  });
}
