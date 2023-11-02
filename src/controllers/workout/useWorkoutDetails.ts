import { router, useLocalSearchParams } from "expo-router";

export default function useWorkoutDetails(){
  const item = useLocalSearchParams;

  const goBack = () => router.back()

  const goWorkout = () => router.push("/student/workout")

  return {
    goBack,
    item,
    goWorkout
  }

}