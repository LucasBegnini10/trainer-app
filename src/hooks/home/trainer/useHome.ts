import { router } from "expo-router";

export default function useHomeTrainer() {
  const goToCreateExercice = () => router.push("/trainer/createExercise");

  return {
    goToCreateExercice,
  };
}
