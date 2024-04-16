import { type ImagePickerAsset } from "expo-image-picker";
import api from "../api";

interface ICreateWorkout {
  name: string;
  description: string;
  logo: ImagePickerAsset;
}

export const createWorkout = async (data: ICreateWorkout) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  //@ts-ignore
  formData.append("logo", {
    uri: data.logo.uri,
    name: data.logo.fileName || data.name,
    type: data.logo.type,
  });

  return await api
    .post("/workouts/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};

export const getWorkout = async (workoutId: string) => {
  return await api
    .get(`/workouts/${workoutId}`)
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};

export interface GetWorkoutsType {
  id?: string;
  trainer_id?: string;
  student_id?: string;
  name?: string;
  startsAt?: string;
  endsAt?: string;
}

export const getWorkouts = async (params: GetWorkoutsType) => {
  return await api
    .get(`/workouts/list`, { params })
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};

type StudentWorkout = {
  student_id: string;
  schedule: Array<number>;
};

interface PutWorkoutStudentsType {
  workout_id: string;
  add: Array<StudentWorkout>;
  remove: Array<StudentWorkout>;
}

export const putWorkoutsStudents = async (body: PutWorkoutStudentsType) => {
  return await api
    .put(`/workouts/update/students`, body)
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};

interface PutWorkoutExerciseType {
  workout_id: number;
  add: number[];
  remove: any[];
}

export const putWorkoutsExercises = async (body: PutWorkoutExerciseType) => {
  return await api
    .put(`/workouts/update/exercises`, body)
    .then((res) => res)
    .catch((err) => {
      throw err?.response || err;
    });
};
