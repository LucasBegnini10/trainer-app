import useExerciseList from "./useExerciseList";
import useStudents from "./useStudents";

export default function useCreateWorkout() {
  const { students } = useStudents();
  const { exercises } = useExerciseList();

  return {
    students,
    exercises
  };
}

export type CreateWorkoutType = ReturnType<typeof useCreateWorkout>;
