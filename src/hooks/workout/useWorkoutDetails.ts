import { router, useLocalSearchParams } from "expo-router";

export default function useWorkoutDetails(){
  const item = useLocalSearchParams;

  const goBack = () => router.back()

  return {
    goBack,
    item
  }

}