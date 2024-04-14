import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Dimensions, PanResponder } from "react-native";

const HEIGHTS = {
  min: "260",
  breakpointToDown: "400",
  max: "520",
  maxToFreeze: "450",
};

const HEIGHT_SCREEN = Dimensions.get("window").height;

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
  };
}
