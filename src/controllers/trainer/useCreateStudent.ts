import { useUserStore } from "../../stores/useUserStore";
import useSignup from "../signup/useSignup";
import { signUpMutation } from "../../services/auth/authMutation";
import { useToast } from "native-base";
import { onlyNumbers } from "../../utils/string";
import { createStudentService } from "../../services/student/studentService";
import { createTrainerStudentAssign } from "../../services/trainer/trainerService";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

export default function useCreateStudent() {
  const user = useUserStore((state) => state.user);
  const toast = useToast();
  const queryClient = useQueryClient()
  const trainerId = user.Trainers.trainer_id

  const { data, loading, invalid, validateFields, onError } = useSignup();

  const handleCreateStudent = async () => {
    if (validateFields()) {
      console.log("body =>", {
        ...data.get,
        document: onlyNumbers(data.get.document),
      });
      mutation.mutate({
        ...data.get,
        document: onlyNumbers(data.get.document),
      });
    }
  };

  const onSuccess = async () => {
    await createStudentService(data.get.email);
    await createTrainerStudentAssign(data.get.email);

    toast.show({
      description: "Aluno cadastrado com sucesso!",
      bgColor: "green.500",
    });

    queryClient.invalidateQueries({queryKey: ["students", trainerId]})

    router.push("/trainer/home/students");
  };

  const mutation = signUpMutation(onSuccess, onError);

  return { user, student: data, loading, invalid, handleCreateStudent };
}
