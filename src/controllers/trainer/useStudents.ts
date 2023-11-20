import { Student, UserModel } from "../../models/models";
import { getStudentsQuery } from "../../services/trainer/trainerQuery";
import { useUserStore } from "../../stores/useUserStore";

export default function useStudents() {
  const trainer = useUserStore((state) => state.user.Trainers);

  const { data, isLoading } = getStudentsQuery(trainer.trainer_id);

  return {
    students: (data?.data || []) as Array<UserModel>,
    isLoading,
  };
}
