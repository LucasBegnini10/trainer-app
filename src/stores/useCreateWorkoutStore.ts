import { create } from "zustand";
import { ImagePickerAsset } from "expo-image-picker";

interface CreateWorkoutModel {
  name: string;
  description: string;
  trainer_id: string;
  file: ImagePickerAsset;
  exercises: string[];
  students: {
    add: { [key: string]: number[] }[];
    remove: { [key: string]: number[] }[];
  };
}

interface CreateWorkoutStoreModel {
  workout: CreateWorkoutModel;
  setWorkout: (workout: CreateWorkoutModel) => void;
  clear: () => void;
}

export const useCreateWorkoutStore = create<CreateWorkoutStoreModel>(
  (set, get) => ({
    workout: {} as CreateWorkoutModel,
    setWorkout: (workout: CreateWorkoutModel) => set({ workout }),
    clear: () => set({ workout: {} as CreateWorkoutModel }),
  })
);
