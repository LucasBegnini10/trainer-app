import { router } from "expo-router";

export default function useWorkouts() {
  const goToCreateWorkout = () => router.push("/trainer/workout/create");

  return {
    goToCreateWorkout
  };
}

export type UseWorkoutsType = ReturnType<typeof useWorkouts>;
