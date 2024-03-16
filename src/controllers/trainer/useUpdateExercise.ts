import { useLocalSearchParams } from "expo-router/src/hooks";
import { getExerciseQuery } from "../../services/exercise/exerciseQuery";
import { ExercisesModel } from "../../models/models";
import { useEffect, useState } from "react";

export default function useUpdateExercise(){
  const local = useLocalSearchParams();

  const exerciseId = (local.id || "") as string;

  const {data, isLoading: loadingExercise} = getExerciseQuery({
    id: exerciseId,
    enabled: Boolean(exerciseId),
  })

  const [exercise, setExercise] = useState({} as ExercisesModel)

  useEffect(() => {
    if(data?.data?.exercise){
      setExercise(data?.data?.exercise)
    }
  }, [data?.data])
  
  return {
    exercise,
    loadingExercise,
    setExercise
  }
}