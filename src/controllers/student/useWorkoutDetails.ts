import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Dimensions, PanResponder } from "react-native";
import { getWorkoutQuery } from "../../services/workout/workoutQuery";
import { WorkoutDetailsModel } from "../../models/models";

const HEIGHT_SCREEN = Dimensions.get("window").height;

const HEIGHTS = {
  min: String(HEIGHT_SCREEN * 0.4),
  breakpointToDown: String(HEIGHT_SCREEN * 0.65),
  max: String(HEIGHT_SCREEN * 0.7),
  maxToFreeze: String(HEIGHT_SCREEN * 0.4),
};

export default function useWorkoutDetails() {
  const local = useLocalSearchParams();
  const workoutId = (local.id || "") as string;
  const goBack = () => router.back();

  const [height, setHeight] = useState(HEIGHTS.min);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {},
      onPanResponderMove: (evt, gestureState) => {
        const height = HEIGHT_SCREEN - gestureState.moveY;
        if (height > +HEIGHTS.maxToFreeze) setHeight(HEIGHTS.max);
        else setHeight(String(height));
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const height = HEIGHT_SCREEN - gestureState.moveY;

        if (height <= +HEIGHTS.breakpointToDown) {
          setHeight(HEIGHTS.min);
        } else {
          setHeight(HEIGHTS.max);
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    })
  ).current;

  const { data, isLoading } = getWorkoutQuery(workoutId);

  const workout = (data?.data?.workout || {}) as WorkoutDetailsModel;

  const goToDoWorkout = () =>
    router.push({
      pathname: "/student/workout/do/[id]",
      params: { id: workoutId },
    });

  return {
    goBack,
    height,
    maxHeightActive: height === HEIGHTS.max,
    panResponder,
    goToDoWorkout,
    isLoading,
    workout,
  };
}
