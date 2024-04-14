import { router } from "expo-router";
import Workouts from "../../data/workoutsWithExercises.json";
import { useState } from "react";
import { useKeepAwake } from "expo-keep-awake";
const workout = Workouts[0];

export default function useDoWorkout() {
  useKeepAwake()
  const [currentIndex, setCurrentIndex] = useState(0);

  const exercise = workout.exercises[currentIndex];

  const goBack = () => {
    if (!currentIndex) router.back();
    else setCurrentIndex((prev) => prev - 1);
  };

  const goNext = () => {
    if (currentIndex === workout.exercises.length - 1) router.push("/student/home")
    else setCurrentIndex((prev) => prev + 1);
  }

  return { goBack, goNext, exercise, workout, currentIndex };
}
