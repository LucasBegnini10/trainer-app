import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Heading,
  ScrollView,
  Slider,
  Text,
  VStack,
  View,
} from "native-base";
import useDoWorkout from "../../../../src/controllers/student/useDoWorkout";
import { ResizeMode, Video } from "expo-av";
import { Dimensions } from "react-native";
import InputComponent from "../../../../src/components/common/input/input";
import LoadingPage from "../../../../src/components/common/loading-page/loadingPage";

const HEIGHT_SCREEN = Dimensions.get("window").height;

export default function DoWorkout() {
  const {
    goBack,
    goNext,
    exercise,
    currentIndex,
    workout,
    playerRef,
    isLast,
    feedback,
    isLoading,
    finishWorkout,
    setStatusVideo
  } = useDoWorkout();

  if (isLoading) {
    return <LoadingPage />;
  }

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
          onPlaybackStatusUpdate={setStatusVideo}
          resizeMode={ResizeMode.COVER}
          isLooping
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
          <View mt={10} />
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
            <Heading fontSize={"lg"}>
              {isLast ? "Finalizar" : "Avançar"}
            </Heading>
          </Button>
        </HStack>
      </VStack>

      <Actionsheet isOpen={feedback.isOpen} onClose={feedback.onClose}>
        <Actionsheet.Content height={HEIGHT_SCREEN * 0.65} bg={"brand.bg"}>
          <Heading
            color={"white"}
            fontWeight={"bold"}
            textAlign={"center"}
            fontSize={"xl"}
          >
            Feedback
          </Heading>

          <VStack w={"full"} mt={4} space={4} p={2}>
            <VStack space={2}>
              <Text color={"white"}>Nível de Cansaço</Text>
              <Slider
                onChange={feedback.setTiredLevel}
                value={feedback.tiredLevel}
                w="full"
                defaultValue={0}
                minValue={0}
                maxValue={3}
                accessibilityLabel="hello world"
                step={1}
                _interactionBox={{
                  backgroundColor: "brand.primary",
                  borderColor: "brand.primary",
                }}
                size={"lg"}
              >
                <Slider.Track bg={"brand.gray"}>
                  <Slider.FilledTrack bg={"brand.secondary"} />
                </Slider.Track>
                <Slider.Thumb
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  p={0}
                  m={0}
                  borderWidth={0}
                  bg="transparent"
                >
                  <Text fontSize={"3xl"} pr={8} pb={10}>
                    {feedback.iconTired}
                  </Text>
                </Slider.Thumb>
              </Slider>
              <Text color="brand.primary" fontSize={"sm"}>
                {feedback.labelTired}
              </Text>
            </VStack>

            <InputComponent
              textarea
              label="Feedback (opcional)"
              hint="Descreva como foi o exercício, o que sentiu, etc."
            />
            <Button rounded={"full"} color={"brand.primary"} onPress={finishWorkout}>
              <Text fontSize={"xl"} color={"brand.bg"}>
                Enviar
              </Text>
            </Button>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
