import { useEffect, useState } from "react";
import { UserModel } from "../../models/models";
import { getStudentsQuery } from "../../services/trainer/trainerQuery";
import { useUserStore } from "../../stores/useUserStore";
import { isEmpty } from "../../utils/validate";

export default function useStudents() {
  const trainer = useUserStore((state) => state.user.Trainers);
  const { data, isLoading } = getStudentsQuery(trainer.trainer_id);

  const students = (data?.data?.students || []) as Array<UserModel>;
  const [studentsFiltered, setStudentsFiltered] = useState(students);
  const [key, setKey] = useState("");
  const [studentDetails, setStudantDetails] = useState({
    open: false,
    student: null,
  });

  useEffect(() => {
    if (students instanceof Array && students.length > 0) {
      setStudentsFiltered(students);
    }
  }, [students]);

  useEffect(() => {
    filterStudents();
  }, [key]);

  const filterStudents = () => {
    if (isEmpty(key)) {
      setStudentsFiltered(students);
    } else {
      const studentsFilts = students.filter((s) =>
        s.name.toLowerCase().includes(key.toLocaleLowerCase())
      );

      setStudentsFiltered(studentsFilts);
    }
  };

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
    onCloseStudentDetails
  };
}
