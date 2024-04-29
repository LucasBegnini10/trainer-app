import { router } from "expo-router";
import { getWorkoutsQuery } from "../../services/workout/workoutQuery";
import { useUserStore } from "../../stores/useUserStore";
import { WorkoutModel } from "../../models/models";
import { useState } from "react";

export default function useWorkouts() {
  const goToCreateWorkout = () => router.push("/trainer/workout/create");
  const { user } = useUserStore();

  const [filter, setFilter] = useState("")

  const { data, isLoading } = getWorkoutsQuery({
    trainer_id: user.Trainers.trainer_id,
  });

  const workouts = (data?.data?.workouts || [])  as Array<WorkoutModel>

  const finalWorkouts = workouts.filter((workout) => {
    if(filter === "") return true
    return workout.name.trim().toLowerCase().includes(filter.trim().toLowerCase())
  })


  return {
    goToCreateWorkout,
    workouts: finalWorkouts,
    isLoading,
    filter,
    setFilter
  };
}

export type UseWorkoutsType = ReturnType<typeof useWorkouts>;
