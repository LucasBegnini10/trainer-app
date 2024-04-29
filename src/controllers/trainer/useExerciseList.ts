import { router } from "expo-router";
import { useUserStore } from "../../stores/useUserStore";
import { getExercisesQuery } from "../../services/exercise/exerciseQuery";
import { ExercisesModel } from "../../models/models";
import { useState } from "react";

export default function useExerciseList() {
  const trainer = useUserStore((state) => state.user.Trainers);
  const { data, isLoading } = getExercisesQuery(trainer.trainer_id);

  const [filter, setFilter] = useState("");

  const exercises = (data?.data?.exercises || []) as Array<ExercisesModel>;

  const finalExercises = exercises.filter((exercises) => {
    if (filter === "") return true;
    return exercises.name
      .trim()
      .toLowerCase()
      .includes(filter.trim().toLowerCase());
  });

  const goToCreateExercice = () => router.push("/trainer/exercise/create");

  const goToUpdateExercise = (exercise: ExercisesModel) =>
    router.push({
      pathname: "/trainer/exercise/[id]",
      params: { id: exercise.id },
    });

  return {
    goToCreateExercice,
    exercises: finalExercises,
    isLoading,
    goToUpdateExercise,
    setFilter,
    filter,
  };
}
