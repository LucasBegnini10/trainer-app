import api from "../api";
import * as ImagePicker from "expo-image-picker";

interface ICreateExercise {
  name: string;
  description: string;
  file: Blob;
}

export const createExercise = async (data: ICreateExercise) => {
  const formData = new FormData();

  const file = new File([data.file], "video", {type: "video/mp4"});

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("video", file);


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
