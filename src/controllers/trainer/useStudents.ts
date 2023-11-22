import { useEffect, useMemo, useState } from "react";
import { Student, UserModel } from "../../models/models";
import { getStudentsQuery } from "../../services/trainer/trainerQuery";
import { useUserStore } from "../../stores/useUserStore";
import { isEmpty } from "../../utils/validate";

export default function useStudents() {
  const trainer = useUserStore((state) => state.user.Trainers);

  const { data, isLoading } = getStudentsQuery(trainer.trainer_id);

  const students = (data?.data?.students || []) as Array<UserModel>;
  const [studentsFiltered, setStudentsFiltered] = useState(students);
  const [key, setKey] = useState("");

  useEffect(() => {
    if (students instanceof Array && students.length > 0) {
      setStudentsFiltered(students);
    }
  }, [students]);

  useEffect(() => {
    filterStudents()
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
  }

  return {
    students: studentsFiltered,
    isLoading,
    setKey,
    key
  };
}
