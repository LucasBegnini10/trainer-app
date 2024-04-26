import { useEffect, useRef, useState } from "react";
import { router, useNavigation } from "expo-router";
import { useStudentsWorkoutStore } from "../../stores/useStudentsWorkoutStore";
import { Alert} from "react-native";
import { useExerciseWorkoutStore } from "../../stores/useExercisesWorkoutStore";
import { useToast } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { useCreateWorkoutStore } from "../../stores/useCreateWorkoutStore";
import { createWorkoutMutation } from "../../services/workout/workoutMutation";
import { AxiosResponse } from "axios";
import {
  putWorkoutsExercises,
  putWorkoutsStudents,
} from "../../services/workout/workoutService";

export default function useCreateWorkout() {
  const toast = useToast();
  const navigation = useNavigation();
  const workoutCreated = useRef<boolean>(false);

  const [loadingStudentsAndExercies, setLoadingStudentsAndExercies] =
    useState(false);

  const { students: studentsSelected, clear: clearStudentsSelected } =
    useStudentsWorkoutStore();

  const { exercises: exercisesSelected, clear: clearExercisesSelected } =
    useExerciseWorkoutStore();

  const { clear: clearWorkout, setWorkout, workout } = useCreateWorkoutStore();

  const [invalid, setInvalid] = useState(
    {} as { [key: string]: { error: boolean; msg: string } }
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();

      const goBack = () => {
        clearStudentsSelected();
        clearExercisesSelected();
        clearWorkout();

        navigation.dispatch(e.data.action);
      };

      if (fieldsAreEmpty() || workoutCreated.current) return goBack();

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

    return unsubscribe;
  }, []);

  const fieldsAreEmpty = () => {
    return (
      !workout.name &&
      !workout.description &&
      !workout.file &&
      exercisesSelected.length === 0 &&
      studentsSelected.length === 0
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setWorkout({ ...workout, file: result.assets[0] });
    }
  };

  const validateFields = () => {
    let error = false;
    const newInvalid = {} as { [key: string]: { error: boolean; msg: string } };

    if (!workout.name) {
      newInvalid.name = { error: true, msg: "Nome do treino é obrigatório" };
      error = true;
    }

    if (!workout.description) {
      newInvalid.workout = {
        error: true,
        msg: "Descrição do treino é obrigatória",
      };
      error = true;
    }

    if (!workout.file) {
      newInvalid.file = {
        error: true,
        msg: "Imagem do treino é obrigatória",
      };
      error = true;
    }

    setInvalid(newInvalid);

    if (error)
      toast.show({
        title: "Atenção",
        description: "Preencha todos os campos obrigatórios",
        bgColor: "red.500",
      });

    return !error;
  };

  const onSuccess = async (data: AxiosResponse<any, any>) => {
    if (![200, 201].includes(data.status)) return onError(data);

    const workoutId = data.data.id;

    setLoadingStudentsAndExercies(true);
    await Promise.all([
      putWorkoutsStudents({
        add: studentsSelected.map((student) => ({
          student_id: student.student_id,
          schedule: student.schedule_id,
        })),
        remove: [],
        workout_id: workoutId,
      }),
      putWorkoutsExercises({
        add: exercisesSelected.map(({ id }) => id),
        remove: [],
        workout_id: workoutId,
      }),
    ]);
    setLoadingStudentsAndExercies(false);

    toast.show({
      title: "Sucesso",
      description: "Treino criado com sucesso",
      bgColor: "green.500",
    });

    workoutCreated.current = true;

    router.back();
  };

  const onError = (error: AxiosResponse<any, any>) => {
    console.log("error ==>", error);
    toast.show({
      description: "Ocorreu um erro ao criar o treino",
      bgColor: "red.500",
    });
  };

  const { mutate, isLoading } = createWorkoutMutation(onSuccess, onError);

  const handleCreateWorkout = () => {
    if (!validateFields()) return;

    mutate({
      name: workout.name,
      description: workout.description,
      logo: workout.file,
    });
  };

  const goToSelectStudents = () => {
    router.push("/trainer/workout/selectStudentsWorkout");
  };

  const goToSelectExercises = () => {
    router.push("/trainer/workout/selectExercisesWorkout");
  };

  return {
    workout: {
      get: workout,
      set: (data: { key: string; value: string }) =>
        setWorkout({ ...workout, [data.key]: data.value }),
    },
    selectExercises: {
      go: goToSelectExercises,
      exercises: exercisesSelected,
    },
    selectStudents: {
      go: goToSelectStudents,
      students: studentsSelected,
    },
    invalid,
    handleCreateWorkout,
    pickImage,
    isLoading: isLoading || loadingStudentsAndExercies,
  };
}

export type CreateWorkoutType = ReturnType<typeof useCreateWorkout>;
