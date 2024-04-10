import { useExerciseWorkoutStore } from "../../stores/useExercisesWorkoutStore";
import useExerciseList from "./useExerciseList";
import useStudents from "./useStudents";

export default function useSelectExercisesWorkout() {
  const {
    addExercise,
    clear,
    exercisesHashMap,
    getExercise,
    removeExercise,
  } = useExerciseWorkoutStore();

  const { exercises, isLoading } = useExerciseList();

  return {
    isLoading,
    addExercise,
    clear,
    exercisesHashMap,
    getExercise,
    removeExercise,
    exercises
  };
}
