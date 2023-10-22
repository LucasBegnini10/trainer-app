import { ResizeMode, Video } from "expo-av";
import { HStack, Heading, IconButton, Text, VStack, View } from "native-base";
import useWorkout from "../../src/hooks/workout/useWorkout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

export default function Workout() {
  const { setStatus, status, video, goBack } = useWorkout();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top }}>
      <HStack alignItems={"center"} space={3} p={3}>
        <IconButton
        onPress={goBack}
          color="black"
          size={"sm"}
          _icon={{
            color: "black",
            size: "md",
            as: Ionicons,
            name: "arrow-back",
          }}
        />
        <Heading>Treino de Peito</Heading>
      </HStack>
      <Video
        ref={video}
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        style={{ width: "100%", height: "50%" }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
}
