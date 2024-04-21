import { router } from "expo-router";
import { getWorkoutsQuery } from "../../services/workout/workoutQuery";
import { useUserStore } from "../../stores/useUserStore";
import { WorkoutModel } from "../../models/models";

export default function useWorkouts() {
  const goToCreateWorkout = () => router.push("/trainer/workout/create");
  const { user } = useUserStore();

  const { data, isLoading } = getWorkoutsQuery({
    trainer_id: user.Trainers.trainer_id,
  });

  const workouts = (data?.data?.workouts || [])  as Array<WorkoutModel>

  return {
    goToCreateWorkout,
    workouts,
    isLoading
  };
}

export type UseWorkoutsType = ReturnType<typeof useWorkouts>;
