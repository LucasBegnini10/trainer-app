import workouts from "../../data/workouts.json";
import { WorkoutModel } from "../../models/models";
import { CardProps } from "../../components/card/card";
import { formatScheduleArrayToString } from "../../utils/schedule";
import { format } from "date-fns";
import { useState } from "react";
import { router } from "expo-router";

export default function useWorkoutList() {
  const [loading, setLoading] = useState(false);

  const changeDay = () => {};

  const navigationWorkout = (workout: WorkoutModel) => {
    router.push({
      pathname: "/student/workout/details/[id]",
      params: { id: workout.id },
    });
  }

  const formatWorkoutToCard = (workout: WorkoutModel): CardProps => {
    return {
      title: workout.name,
      description: workout.description,
      img: workout.logo_url,
      subtitle: formatScheduleArrayToString(workout.schedule_description),
      time: `Publicado em ${format(
        new Date(workout.created_at),
        "dd/MM/yyyy"
      )}`,
    };
  };

  return {
    navigationWorkout,
    workouts,
    formatWorkoutToCard,
    changeDay,
    loading,
  };
}
