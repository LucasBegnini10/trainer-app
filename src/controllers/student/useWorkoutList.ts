import { WorkoutModel } from "../../models/models";
import { useCallback, useMemo, useState } from "react";
import { router } from "expo-router";
import { getWorkoutsQuery } from "../../services/workout/workoutQuery";
import { useUserStore } from "../../stores/useUserStore";

export default function useWorkoutList() {
  const { user } = useUserStore();
  const [dayFilter, setDayFilter] = useState<number>(new Date().getDay());
  const [filterKey, setFilterKey] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);

  const navigationWorkout = (workout: WorkoutModel) => {
    router.push({
      pathname: "/student/workout/details/[id]",
      params: { id: workout.id },
    });
  };

  const { data, isLoading, refetch } = getWorkoutsQuery({
    student_id: user.Students.student_id,
    scheduledAt: [dayFilter],
  });

  const workouts = (data?.data?.workouts || []) as Array<WorkoutModel>;

  const finalWorkouts = workouts.filter((workout) => {
    if (!filterKey.trim().length) return true;
    return workout.name.toLowerCase().includes(filterKey.toLowerCase());
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, []);

  return {
    navigationWorkout,
    workouts: finalWorkouts,
    filterDay: useMemo(
      () => ({
        day: dayFilter,
        changeDay: (day: number) => setDayFilter(day),
      }),
      [dayFilter, setDayFilter]
    ),
    filterKey: {
      key: filterKey,
      changeKey: (key: string) => setFilterKey(key),
    },
    loading: isLoading,
    refresh: {
      refreshing,
      onRefresh,
    }
  };
}
