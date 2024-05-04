import { WorkoutModel } from "../../models/models";
import { useMemo, useState } from "react";
import { router } from "expo-router";
import { getWorkoutsQuery } from "../../services/workout/workoutQuery";
import { useUserStore } from "../../stores/useUserStore";

export default function useWorkoutList() {
  const { user } = useUserStore();
  const [dayFilter, setDayFilter] = useState<number>(new Date().getDay());
  const [filterKey, setFilterKey] = useState<string>("");

  const navigationWorkout = (workout: WorkoutModel) => {
    router.push({
      pathname: "/student/workout/details/[id]",
      params: { id: workout.id },
    });
  };

  const { data, isLoading } = getWorkoutsQuery({
    student_id: user.Students.student_id,
    scheduledAt: [dayFilter],
  });

  const workouts = (data?.data?.workouts || []) as Array<WorkoutModel>;

  const finalWorkouts = workouts.filter((workout) => {
    if (!filterKey.trim().length) return true;
    return workout.name.toLowerCase().includes(filterKey.toLowerCase());
  });

  return {
    navigationWorkout,
    workouts: finalWorkouts,
    filterDay: useMemo(() => ({
      day: dayFilter,
      changeDay: (day: number) => setDayFilter(day),
    }), [dayFilter, setDayFilter]),
    filterKey: {
      key: filterKey,
      changeKey: (key: string) => setFilterKey(key),
    },
    loading: isLoading,
  };
}
