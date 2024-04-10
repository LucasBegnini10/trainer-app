import { useStudentsWorkoutStore } from "../../stores/useStudentsWorkoutStore";
import useStudents from "./useStudents";

export default function useSelectStudentsWorkout() {
  const {
    students: studentsSelected,
    addStudent,
    clear,
    getStudent,
    removeStudent,
    studentsHashMap,
    setScheduleId,
  } = useStudentsWorkoutStore();

  const { students: allStudents, isLoading } = useStudents();

  const students = allStudents.map((student) => {
    return {
      ...student,
      schedule_id: [],
    };
  });

  return {
    studentsSelected,
    addStudent,
    clear,
    getStudent,
    removeStudent,
    studentsHashMap,
    students,
    isLoading,
    setScheduleId,
  };
}
