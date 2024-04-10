import { useEffect, useState } from "react";
import useExerciseList from "./useExerciseList";
import { ExercisesModel, WorkoutModel } from "../../models/models";
import { router, useNavigation } from "expo-router";
import { useStudentsWorkoutStore } from "../../stores/useStudentsWorkoutStore";
import { Alert } from "react-native";

export default function useCreateWorkout() {
  const { students: studentsSelected, clear: clearStudentsSelected } =
    useStudentsWorkoutStore();
  const [workout, setWorkout] = useState({} as WorkoutModel);

  const { exercises } = useExerciseList();
  const [exercisesSelected, setExercisesSelected] = useState(
    [] as Array<ExercisesModel>
  );

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();

      const goBack = () => {
        clearStudentsSelected();
        setWorkout({} as WorkoutModel);

        navigation.dispatch(e.data.action);
      };

      Alert.alert(
        "Atenção",
        "Deseja realmente sair sem salvar? Você possui dados não salvos e os perderá se sair.",
        [
          {
            style: "default",
            text: "Cancelar",
            onPress: () => {},
            isPreferred: true,
          },
          {
            style: "destructive",
            text: "Sair sem salvar",
            onPress: goBack,
          },
        ],
        { cancelable: false }
      );
    });

    return unsubscribe
  }, []);

  const handleSetExerciseSelected = (exercise: ExercisesModel) => {
    setExercisesSelected((prev) => [...new Set([...prev, exercise])]);
  };

  const handleRemoveExerciseSelected = (exercise: ExercisesModel) => {
    setExercisesSelected((prev) =>
      prev.filter((item) => item.id !== exercise.id)
    );
  };

  const goToSelectUsers = () => {
    router.push("/trainer/workout/selectStudentsWorkout");
  };

  return {
    exercises,
    workout: {
      get: workout,
      set: setWorkout,
    },
    exercisesSelected: {
      get: exercisesSelected,
      set: handleSetExerciseSelected,
      remove: handleRemoveExerciseSelected,
    },
    selectStudents: {
      go: goToSelectUsers,
      students: studentsSelected,
    },
  };
}

export type CreateWorkoutType = ReturnType<typeof useCreateWorkout>;
