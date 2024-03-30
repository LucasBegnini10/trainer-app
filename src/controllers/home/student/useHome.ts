import workouts from "../../../data/workouts.json";
import { WorkoutModel } from "../../../models/models";
import { CardProps } from "../../../components/card/card";
import { formatScheduleArrayToString } from "../../../utils/schedule";
import { format } from "date-fns";
import { useMemo, useState } from "react";

export default function useHome() {
  const [loading, setLoading] = useState(false);

  const changeDay = () => {};

  const navigationWorkout = () => {
    console.log("navegando para workout")
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
