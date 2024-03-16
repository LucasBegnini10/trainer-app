import { useQuery } from "@tanstack/react-query";
import { getExerciseById, getExercises } from "./exerciseService";

export function getExercisesQuery(trainerId: string, name?: string){
  return useQuery({
    queryFn: () => getExercises(trainerId, name),
    queryKey: ["exercises", trainerId, name],
  })
}

interface GetExerciseQueryType {
  id: string;
  enabled: boolean;
}

export function getExerciseQuery({id, enabled}: GetExerciseQueryType){
  return useQuery({
    queryFn: () => getExerciseById(id),
    queryKey: ["exercise", id],
    enabled
  })
}