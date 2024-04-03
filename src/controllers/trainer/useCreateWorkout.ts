import { useState } from "react";
import useExerciseList from "./useExerciseList";
import useStudents from "./useStudents";
import { ExercisesModel, UserModel, WorkoutModel } from "../../models/models";
import { daysOfWeekMapping } from "../../utils/schedule";

export default function useCreateWorkout() {
  const { students } = useStudents();
  const { exercises } = useExerciseList();

  const [workout, setWorkout] = useState({} as WorkoutModel);
  const [studentsSelected, setStudentsSelected] = useState(
    [] as Array<UserModel>
  );
  const [exercisesSelected, setExercisesSelected] = useState(
    [] as Array<ExercisesModel>
  );

  const daysOfWeekOptions = Object.entries(daysOfWeekMapping);

  const toggleOptionDayOfWeek = (day: string) => {
    const dayInt = parseInt(day);
    setWorkout((prev) => {
      const scheduleDescription = prev.schedule_description || [];

      if (scheduleDescription.includes(dayInt)) {
        return {
          ...prev,
          schedule_description: scheduleDescription.filter(
            (item) => item !== dayInt
          ),
        };
      }

      return {
        ...prev,
        schedule_description: [...scheduleDescription, dayInt],
      };
    });
  };

  const handleSetStudentSelected = (student: UserModel) => {
    setStudentsSelected((prev) => [...new Set([...prev, student])]);
  };

  const handleRemoveStudentSelected = (student: UserModel) => {
    setStudentsSelected((prev) =>
      prev.filter((item) => item.id !== student.id)
    );
  };

  const handleSetExerciseSelected = (exercise: ExercisesModel) => {
    setExercisesSelected((prev) => [...new Set([...prev, exercise])]);
  };

  const handleRemoveExerciseSelected = (exercise: ExercisesModel) => {
    setExercisesSelected((prev) =>
      prev.filter((item) => item.id !== exercise.id)
    );
  };

  return {
    students,
    exercises,
    workout: {
      get: workout,
      set: setWorkout,
    },
    studentsSelected: {
      get: studentsSelected,
      set: handleSetStudentSelected,
      remove: handleRemoveStudentSelected,
    },
    exercisesSelected: {
      get: exercisesSelected,
      set: handleSetExerciseSelected,
      remove: handleRemoveExerciseSelected,
    },
    scheduleDescription: {
      options: daysOfWeekOptions,
      toggle: toggleOptionDayOfWeek,
      state: workout.schedule_description,
    },
  };
}

export type CreateWorkoutType = ReturnType<typeof useCreateWorkout>;
