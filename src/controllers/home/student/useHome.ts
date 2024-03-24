import { router } from "expo-router";
import workouts from "../../../data/workouts.json";
import { WorkoutModel } from "../../../models/models";
import { CardProps } from "../../../components/card/card";
import { formatScheduleArrayToString } from "../../../utils/schedule";

export default function useHome() {
  const navigationWorkout = () =>
    router.push({
      pathname: "/student/workoutDetails",
      params: {
        id: 123,
        name: "Treino de Peito",
      },
    });

  const formatWorkoutToCard = (workout: WorkoutModel): CardProps => {
    return {
      title: workout.name,
      description: workout.description,
      img: workout.logo_url,
      subtitle: formatScheduleArrayToString(workout.schedule_description),
    };
  };

  return {
    navigationWorkout,
    workouts,
    formatWorkoutToCard,
  };
}
