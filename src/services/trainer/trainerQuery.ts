import { useQuery } from "@tanstack/react-query";
import { getStudentsByTrainerId } from "./trainerService";

export function getStudentsQuery(trainerId: string){
  return useQuery({
    queryFn: () =>  getStudentsByTrainerId(trainerId),
    queryKey: ["students", trainerId],
    
  })
}