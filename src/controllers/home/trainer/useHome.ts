import { router } from "expo-router";
import { useUserStore } from "../../../stores/useUserStore";
import { getExercisesQuery } from "../../../services/exercise/exerciseQuery";
import { ExercisesModel } from "../../../models/models";

export default function useHomeTrainer() {
  const goToCreateExercice = () => router.push("/trainer/createExercise");

  const trainer = useUserStore((state) => state.user.Trainers);

  const { data, isLoading } = getExercisesQuery(trainer.trainer_id);

  const exercises = (data?.data?.exercises || []) as Array<ExercisesModel>

  return {
    goToCreateExercice,
    exercises,
    isLoading
  };
}
