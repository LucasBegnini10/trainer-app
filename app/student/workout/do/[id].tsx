import {
  Button,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
  VStack,
  View,
} from "native-base";
import useDoWorkout from "../../../../src/controllers/student/useDoWorkout";
import { Ionicons } from "@expo/vector-icons";
import { ResizeMode, Video } from "expo-av";

export default function DoWorkout() {
  const { goBack, exercise, currentIndex, workout } = useDoWorkout();

  return (
    <>
      <View flex={0.6} bg={"brand.bg"} position={"relative"}>
        <Video
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          style={{ width: "100%", height: "100%" }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
        />
        <IconButton
          onPress={goBack}
          size={"sm"}
          bg={"brand.bg"}
          _icon={{
            color: "brand.primary",
            size: "md",
            as: Ionicons,
            name: "arrow-back",
          }}
          _pressed={{
            bg: "brand.secondary",
          }}
          rounded={"full"}
          position={"absolute"}
          top={"20%"}
          left={"3%"}
        />
      </View>
      <VStack bg={"brand.bg"} flex={0.4}>
        <VStack flex={0.6} p={4} space={4}>
          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <Heading color={"white"}>{exercise.name}</Heading>
            <Text fontSize="sm" color={"brand.primary"}>
              Exercício {currentIndex + 1} de {workout.exercises.length}
            </Text>
          </HStack>
          <Text fontSize={"md"} color={"gray.400"}>
            {exercise.description}
          </Text>
        </VStack>
        <HStack
          roundedTopLeft={"lg"}
          roundedTopRight={"lg"}
          bg={"brand.bg"}
          flex={0.4}
          alignItems={"center"}
          justifyContent={"center"}
          space={2}
          px={2}
        >
          <Button
            flex={0.5}
            rounded={"full"}
            bg={"bg.gray"}
            borderColor={"brand.primary"}
            borderWidth={1}
          >
            <Heading color={"brand.primary"} fontSize={"lg"}>Voltar</Heading>
          </Button>
          <Button flex={0.5} rounded={"full"} color={"brand.primary"}>
            <Heading fontSize={"lg"}>Avançar</Heading>
          </Button>
        </HStack>
      </VStack>
    </>
  );
}
