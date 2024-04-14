import { router } from "expo-router";
import Workouts from "../../data/workoutsWithExercises.json";
import { useState } from "react";
const workout = Workouts[0];

export default function useDoWorkout() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const exercise = workout.exercises[currentIndex];

  return { goBack: () => router.back(), exercise, workout, currentIndex };
}
