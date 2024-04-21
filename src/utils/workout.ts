import { CardProps } from "../components/card/card";
import { WorkoutModel } from "../models/models";
import { format } from "date-fns";

export const formatWorkoutToCard = (
  workout: WorkoutModel,
  subtitle?: string
): CardProps => {
  return {
    title: workout.name,
    description: workout.description,
    img: workout.logo_url,
    subtitle,
    time: `Publicado em ${format(new Date(workout.created_at), "dd/MM/yyyy")}`,
  };
};
