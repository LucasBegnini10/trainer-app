import { router } from "expo-router";
import { useRef, useState } from "react";

export default function useWorkout(){
  
  const video = useRef(null);
  const [status, setStatus] = useState({});

  const goBack = () => router.back()

  return {
    video,
    status,
    setStatus,
    goBack
  }

}