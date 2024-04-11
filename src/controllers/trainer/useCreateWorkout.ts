import { useEffect, useState } from "react";
import { WorkoutModel } from "../../models/models";
import { router, useNavigation } from "expo-router";
import { useStudentsWorkoutStore } from "../../stores/useStudentsWorkoutStore";
import { Alert, Linking } from "react-native";
import { useExerciseWorkoutStore } from "../../stores/useExercisesWorkoutStore";
import { useToast } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { useCreateWorkoutStore } from "../../stores/useCreateWorkoutStore";

export default function useCreateWorkout() {
  const toast = useToast();
  const navigation = useNavigation();

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

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

  const pickImage = async () => {
    if (status.status !== ImagePicker.PermissionStatus.GRANTED) {
      const response = await requestPermission();

      if (response.status !== ImagePicker.PermissionStatus.GRANTED) {
        Alert.alert(
          "Atenção",
          "Você precisa permitir o acesso a galeria para selecionar uma imagem. Deseja ir para a tela de configurações?",
          [
            {
              style: "destructive",
              text: "Cancelar",
              onPress: () => {},
            },
            {
              style: "default",
              text: "Ir até configurações",
              onPress: () => Linking.openSettings(),
            },
          ]
        );

        return;
      }
    }

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

    setInvalid(newInvalid);

    if (error)
      toast.show({
        title: "Atenção",
        description: "Preencha todos os campos obrigatórios",
        bgColor: "red.500",
      });

    return error;
  };

  const handleCreateWorkout = () => {
    if (!validateFields()) return;
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
  };
}

export type CreateWorkoutType = ReturnType<typeof useCreateWorkout>;
