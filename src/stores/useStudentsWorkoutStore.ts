import { create } from "zustand";
import { UserModel } from "../models/models";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface StudentsWorkout extends UserModel {
  schedule_id: number[];
  student_id: string;
}

interface StudentWorkoutStoreModel {
  students: StudentsWorkout[];
  studentsHashMap: Record<string, StudentsWorkout>;
  setScheduleId: (schedule_id: number[], studentId: string) => void;
  getStudent: (id: string) => StudentsWorkout;
  addStudent: (student: StudentsWorkout) => void;
  removeStudent: (id: string) => void;
  clear: () => void;
}

export const useStudentsWorkoutStore = create<StudentWorkoutStoreModel>(
  (set, get) => ({
    students: [] as StudentsWorkout[],
    studentsHashMap: {} as Record<string, StudentsWorkout>,
    getStudent: (id: string) => get().studentsHashMap[id],
    addStudent: (student: StudentsWorkout) =>
      set((state) => {
        const students = [...new Set([...state.students, student])];
        const studentsHashMap = {
          ...state.studentsHashMap,
          [student.id]: student,
        };
        return { ...state, students, studentsHashMap };
      }),
    setScheduleId: (schedule_id: number[], studentId: string) =>
      set((state) => {
        const student = state.studentsHashMap[studentId];
        if (!student) return;
        student.schedule_id = schedule_id;
        const studentsHashMap = {
          ...state.studentsHashMap,
          [student.id]: student,
        };
        return { ...state, studentsHashMap };
      }),
    removeStudent: (id: string) =>
      set((state) => {
        const students = state.students.filter((student) => student.id !== id);
        const studentsHashMap = { ...state.studentsHashMap };
        delete studentsHashMap[id];
        return { ...state, students, studentsHashMap };
      }),
    clear: () => set({ students: [], studentsHashMap: {} }),
  })
);
