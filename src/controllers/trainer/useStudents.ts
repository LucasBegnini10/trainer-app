import { useEffect, useState } from "react";
import { UserModel } from "../../models/models";
import { getStudentsQuery } from "../../services/trainer/trainerQuery";
import { useUserStore } from "../../stores/useUserStore";
import { isEmpty } from "../../utils/validate";

export default function useStudents() {
  const trainer = useUserStore((state) => state.user.Trainers);
  const { data, isLoading } = getStudentsQuery(trainer.trainer_id);

  const students = (data?.data?.students || []) as Array<UserModel>;
  const [key, setKey] = useState("");
  const [studentDetails, setStudantDetails] = useState({
    open: false,
    student: null,
  });

  const studentsFiltered = students.filter((student) => {
    if (isEmpty(key)) return true;
    return (
      student.name.toLowerCase().includes(key.toLowerCase()) ||
      student.email.toLowerCase().includes(key.toLowerCase())
    );
  });

  const showStudentDetails = (user: UserModel) =>
    setStudantDetails({
      open: true,
      student: user,
    });

  const onCloseStudentDetails = () =>
    setStudantDetails({ open: false, student: null });

  return {
    students: studentsFiltered,
    isLoading,
    setKey,
    key,
    showStudentDetails,
    studentDetails,
    onCloseStudentDetails,
  };
}
