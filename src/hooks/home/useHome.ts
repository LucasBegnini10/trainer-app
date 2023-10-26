import { router } from "expo-router";

export default function useHome(){

  const navigationWorkout = () => router.push({
    pathname: "/student/workoutDetails",
    params: {
      id: 123,
      name: "Treino de Peito",
    }
  })

  return {
    navigationWorkout
  }
}