import { type ImagePickerAsset } from "expo-image-picker";
import api from "../api";

interface ICreateExercise {
  name: string;
  description: string;
  file: ImagePickerAsset;
}

export const createExercise = async (data: ICreateExercise) => {
  const formData = new FormData();


  formData.append("name", data.name);
  formData.append("description", data.description);
  //@ts-ignore
  formData.append("video", {
    uri: data.file.uri,
    name: data.file.fileName || data.name,
    type: data.file.type,
  });

  return await api
    .post("/exercises/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};

export const getExercises = async (trainerId: string, name?: string) => {
  return await api
    .get(`/exercises/?trainerId=${trainerId}${name ? `&name=${name}` : ""}`)
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};

export const getExerciseById = async (id: string) => {
  return await api
    .get(`/exercises/${id}`)
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};
