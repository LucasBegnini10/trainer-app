import { create } from "zustand";
import { ExercisesModel } from "../models/models";

interface ExerciseWorkoutStoreModel {
  exercises: ExercisesModel[];
  exercisesHashMap: Record<number, ExercisesModel>;
  getExercise: (id: number) => ExercisesModel;
  addExercise: (student: ExercisesModel) => void;
  removeExercise: (id: number) => void;
  clear: () => void;
}

export const useExerciseWorkoutStore = create<ExerciseWorkoutStoreModel>(
  (set, get) => ({
    exercises: [] as ExercisesModel[],
    exercisesHashMap: {} as Record<number, ExercisesModel>,
    getExercise: (id: number) => get().exercisesHashMap[id],
    addExercise: (student: ExercisesModel) =>
      set((state) => {
        const exercises = [...new Set([...state.exercises, student])];
        const exercisesHashMap = {
          ...state.exercisesHashMap,
          [student.id]: student,
        };
        return { ...state, exercises, exercisesHashMap };
      }),
    removeExercise: (id: number) =>
      set((state) => {
        const exercises = state.exercises.filter(
          (exercise) => exercise.id !== id
        );
        const exercisesHashMap = { ...state.exercisesHashMap };
        delete exercisesHashMap[id];
        return { ...state, exercises, exercisesHashMap };
      }),
    clear: () => set({ exercises: [], exercisesHashMap: {} }),
  })
);
