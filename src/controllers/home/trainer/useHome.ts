import { router } from "expo-router";
import { useUserStore } from "../../../stores/useUserStore";
import { getExercisesQuery } from "../../../services/exercise/exerciseQuery";
import { ExercisesModel } from "../../../models/models";

export default function useHomeTrainer() {
  const trainer = useUserStore((state) => state.user.Trainers);
  const { data, isLoading } = getExercisesQuery(trainer.trainer_id);
  const exercises = (data?.data?.exercises || []) as Array<ExercisesModel>;

  const goToCreateExercice = () => router.push("/trainer/exercise/create");

  const goToUpdateExercise = (exercise: ExercisesModel) =>
    router.push({
      pathname: "/trainer/exercise/[id]",
      params: { id: exercise.id },
    });

  return {
    goToCreateExercice,
    exercises,
    isLoading,
    goToUpdateExercise,
  };
}
