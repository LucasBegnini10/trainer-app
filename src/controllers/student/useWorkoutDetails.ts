import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
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
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
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

        console.log("height -->", height)

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

  return {
    goBack,
    height,
    panResponder,
  };
}
