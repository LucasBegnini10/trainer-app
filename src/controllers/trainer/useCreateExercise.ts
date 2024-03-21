import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { isEmpty } from "../../utils/validate";
import { useToast } from "native-base";
import { createExerciseMutation } from "../../services/exercise/exerciseMutation";
import { router } from "expo-router";

const initialStateInvalid = {
  name: {
    error: false,
    msg: "",
  },
  description: {
    error: false,
    msg: "",
  },
  file: {
    error: false,
    msg: "",
  },
};

const initialStateExercise  = {

  name: "",
  description: "",
  file: {} as ImagePicker.ImagePickerAsset,
  blob: null as Blob | null,

}

export default function useCreateExercise() {
  const toast = useToast();
  const [exercise, setExercise] = useState(initialStateExercise);

  const [invalid, setInvalid] = useState(initialStateInvalid);

  const resetInvalid = () => setInvalid(initialStateInvalid);
  const resetExercise = () => setExercise(initialStateExercise)


  const validateFields = () => {
    if (isEmpty(exercise.name)) {
      toast.show({
        description: "Preencha o nome do exercício",
        bgColor: "red.500",
      });
      setInvalid((prev) => ({
        ...prev,
        name: {
          error: true,
          msg: "Preencha o nome do exercício",
        },
      }));
      return false;
    }
    resetInvalid();
    if (isEmpty(exercise.description)) {
      toast.show({
        description: "Preencha a descrição do exercício",
        bgColor: "red.500",
      });
      setInvalid((prev) => ({
        ...prev,
        description: {
          error: true,
          msg: "Preencha a descrição do exercício",
        },
      }));
      return false;
    }
    resetInvalid();
    if (!exercise.file) {
      toast.show({
        description: "Faça o upload do vídeo do exercício",
        bgColor: "red.500",
      });
      setInvalid((prev) => ({
        ...prev,
        file: {
          error: true,
          msg: "Faça o upload do vídeo do exercício",
        },
      }));
      return false;
    }
    resetInvalid();
    return true;
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      setExercise((prev) => ({ ...prev, file: result.assets[0], blob }));
    }
  };

  const handleCreateExercice = () => {
    if (validateFields()) {
      mutation.mutate({
        description: exercise.description,
        file: exercise.file,
        name: exercise.name,
      });
    }
  };

  const onSuccess = (data) => {
    toast.show({
      description: "Exercício criado com sucesso!",
      bgColor: "green.500",
    });
    resetExercise()
    router.push("/trainer/home")
  };

  const onError = (err) => {
    toast.show({
      description:"Não foi possível. Tente novamente!",
      bgColor: "red.500"
    })
  };

  const mutation = createExerciseMutation(onSuccess, onError);

  return {
    pickVideo,
    invalid,
    exercise,
    setExercise,
    handleCreateExercice,
    loading: mutation.isLoading,
  };
}