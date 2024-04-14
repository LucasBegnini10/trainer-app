import {
  Button,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import useDoWorkout from "../../../../src/controllers/student/useDoWorkout";
import { ResizeMode, Video } from "expo-av";

export default function DoWorkout() {
  const { goBack, goNext, exercise, currentIndex, workout, playerRef } = useDoWorkout();

  return (
    <>
      <View flex={0.6} bg={"brand.bg"} position={"relative"}>
        <Video
          ref={playerRef}
          source={{
            uri: exercise.video_url,
          }}
          style={{ width: "100%", height: "100%" }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay
        />
      </View>
      <VStack bg={"brand.bg"} flex={0.4} space={2}>
        <ScrollView flex={0.6} p={4}>
          <HStack mb={2} alignItems={"start"} space={2}>
            <Heading flex={0.7} color={"white"}>
              {exercise.name}
            </Heading>
            <Text flex={0.3} fontSize="sm" color={"brand.primary"}>
              Exercício {currentIndex + 1} de {workout.exercises.length}
            </Text>
          </HStack>
          <Text fontSize={"md"} color={"gray.400"}>
            {exercise.description}
          </Text>
          <View mt={10}/>
        </ScrollView>
        <HStack
          bg={"brand.bg"}
          flex={0.4}
          alignItems={"center"}
          justifyContent={"center"}
          space={2}
          p={2}
        >
          <Button
            flex={0.5}
            rounded={"full"}
            borderWidth={1}
            onPress={goBack}
            variant={"ghost"}
            bg={"transparent"}
            borderColor={"brand.primary"}
          >
            <Heading color={"brand.primary"} fontSize={"lg"}>
              Voltar
            </Heading>
          </Button>
          <Button
            onPress={goNext}
            flex={0.5}
            rounded={"full"}
            color={"brand.primary"}
          >
            <Heading fontSize={"lg"}>Avançar</Heading>
          </Button>
        </HStack>
      </VStack>
    </>
  );
}
