import { useQuery } from "@tanstack/react-query";
import { getExercises } from "./exerciseService";

export function getExercisesQuery(trainerId: string, name?: string){
  return useQuery({
    queryFn: () => getExercises(trainerId, name),
    queryKey: ["exercises", trainerId, name],
    
  })
}