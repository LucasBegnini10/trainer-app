import { WorkoutModel } from "../../models/models";
import { useState } from "react";
import { router } from "expo-router";
import { getWorkoutsQuery } from "../../services/workout/workoutQuery";
import { useUserStore } from "../../stores/useUserStore";

export default function useWorkoutList() {
  const { user } = useUserStore();

  const changeDay = () => {};

  const navigationWorkout = (workout: WorkoutModel) => {
    router.push({
      pathname: "/student/workout/details/[id]",
      params: { id: workout.id },
    });
  };

  const { data, isLoading } = getWorkoutsQuery({
    student_id: user.Students.student_id,
  });

  const workouts = (data?.data?.workouts || []) as Array<WorkoutModel> 

  return {
    navigationWorkout,
    workouts,
    changeDay,
    loading: isLoading,
  };
}
