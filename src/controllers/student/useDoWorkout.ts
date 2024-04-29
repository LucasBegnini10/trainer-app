import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useReducer, useRef, useState } from "react";
import { useKeepAwake } from "expo-keep-awake";
import * as ScreenOrientation from "expo-screen-orientation";
import { Video, Audio, AVPlaybackStatus } from "expo-av";
import { Alert } from "react-native";
import { getWorkoutQuery } from "../../services/workout/workoutQuery";
import { WorkoutDetailsModel } from "../../models/models";
import { useToast } from "native-base";

const labelTired = {
  0: "Não estou cansado",
  1: "Um pouco cansado",
  2: "Cansado",
  3: "Muito cansado",
};

const iconTired = {
  0: "😀",
  1: "😐",
  2: "😩",
  3: "🥵",
};

export default function useDoWorkout() {
  useKeepAwake();

  const toast = useToast();
  const local = useLocalSearchParams();
  const navigation = useNavigation();

  const workoutId = (local.id || "") as string;
  const { data, isLoading } = getWorkoutQuery(workoutId);

  const workout = (data?.data?.workout || {}) as WorkoutDetailsModel;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState({
    isOpen: false,
    message: "",
    tiredLevel: 0,
  });
  const [statusVideo, setStatusVideo] = useState<AVPlaybackStatus>(null)

  const playerRef = useRef<Video>(null);
  const workoutFinished = useRef(false);

  const exercise = workout.exercises[currentIndex];

  useEffect(() => {
    if(statusVideo?.isLoaded){
      triggerAudio()
    }
  }, [statusVideo?.isLoaded])

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
      if (!workoutFinished.current) {
        e.preventDefault();
        showAlertGoBack(e);
      }
    });

    return unsubscribe;
  }, []);


  const triggerAudio = async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    playerRef.current.playAsync();
  };

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
      setFeedback((prev) => ({ ...prev, isOpen: true }));
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

  const finishWorkout = () => {
    workoutFinished.current = true;
    toast.show({
      description: "Treino finalizado com sucesso",
      bgColor: "green.500",
    });

    router.replace("/student/home");
  };

  return {
    goBack,
    goNext,
    isLoading,
    exercise,
    workout,
    currentIndex,
    playerRef,
    isLast: currentIndex === workout.exercises.length - 1,
    feedback: {
      ...feedback,
      onClose: () => setFeedback((prev) => ({ ...prev, isOpen: false })),
      setTiredLevel: (tiredLevel: number) => {
        setFeedback((prev) => ({ ...prev, tiredLevel }));
      },
      labelTired: labelTired[feedback.tiredLevel],
      iconTired: iconTired[feedback.tiredLevel],
    },
    finishWorkout,
    setStatusVideo
  };
}
