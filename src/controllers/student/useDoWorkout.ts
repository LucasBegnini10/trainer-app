import { router, useNavigation } from "expo-router";
import Workouts from "../../data/workoutsWithExercises.json";
import { useEffect, useRef, useState } from "react";
import { useKeepAwake } from "expo-keep-awake";
const workout = Workouts[0];
import * as ScreenOrientation from "expo-screen-orientation";
import { Video } from "expo-av";
import { Alert } from "react-native";

export default function useDoWorkout() {
  useKeepAwake();
  const [currentIndex, setCurrentIndex] = useState(0);
  const exercise = workout.exercises[currentIndex];
  const navigation = useNavigation();
  const playerRef = useRef<Video>(null);

  const showAlertGoBack = (e: any) => {
    Alert.alert(
      "Atenção",
      "Tem certeza que deseja sair do treino? Você ainda não o finalizou",
      [
        {
          style: "default",
          text: "Cancelar",
          onPress: () => {},
          isPreferred: true,
        },
        {
          style: "destructive",
          text: "Sair e perder progresso",
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]
    );
  };

  const goBack = () => {
    if (!currentIndex) {
      router.back();
    } else setCurrentIndex((prev) => prev - 1);
  };

  const goNext = () => {
    if (currentIndex === workout.exercises.length - 1)
      router.push("/student/home");
    else setCurrentIndex((prev) => prev + 1);
  };

  const listenOrientationChange = async (
    event: ScreenOrientation.OrientationChangeEvent
  ) => {
    const orientation = event.orientationInfo.orientation;

    const horizontalOrientations = [
      ScreenOrientation.Orientation.LANDSCAPE_LEFT,
      ScreenOrientation.Orientation.LANDSCAPE_RIGHT,
    ];

    if (horizontalOrientations.includes(orientation)) {
      await playerRef.current.presentFullscreenPlayer();
    } else {
      await playerRef.current.dismissFullscreenPlayer();
      await playerRef.current.playAsync();
    }
  };

  const setOrientation = async (
    orientation: ScreenOrientation.OrientationLock
  ) => {
    await ScreenOrientation.lockAsync(orientation);
  };

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener(
      listenOrientationChange
    );

    setOrientation(ScreenOrientation.OrientationLock.DEFAULT);

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
      setOrientation(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      showAlertGoBack(e);
    });

    return unsubscribe;
  }, []);

  return { goBack, goNext, exercise, workout, currentIndex, playerRef };
}
