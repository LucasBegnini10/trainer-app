import { ResizeMode, Video } from "expo-av";
import {
  Button,
  Center,
  Divider,
  FlatList,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
  VStack,
  View,
} from "native-base";
import useWorkout from "../../../src/controllers/workout/useWorkout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Tabs from "../../../src/components/common/tabs/tabs";
import ExerciseItem from "../../../src/components/workout/exerciseItem";

export default function Workout() {
  const { setStatus, status, video, goBack } = useWorkout();
  const insets = useSafeAreaInsets();

  return (
    <View bg="brand.bg" style={{ paddingTop: insets.top }}>
      <HStack alignItems={"center"} space={3} p={3}>
        <IconButton
          onPress={goBack}
          color="white"
          size={"sm"}
          _icon={{
            color: "white",
            size: "md",
            as: Ionicons,
            name: "arrow-back",
          }}
          _pressed={{
            bg: "brand.gray",
          }}
        />
        <Heading color="white" fontFamily={"Roboto-Bold"}>
          Treino de Peito
        </Heading>
      </HStack>
      <Video
        ref={video}
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        style={{ width: "100%", height: "25%" }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />

      <View h={"55.5%"}>
        <Tabs
          tabs={[
            {
              key: "exercises",
              title: "Exercícios",
              component: ListExercises,
            },
            {
              key: "workout",
              title: "Treino",
              component: WorkoutDescription,
            },
          ]}
        />
      </View>

      <Divider my={3} />

      <HStack
        bg="brand.bg"
        alignItems={"center"}
        justifyContent={"space-between"}
        w="full"
        mt={3}
        px={7}
      >
        <Button
          py={4}
          px={8}
          w={"40%"}
          borderColor={"brand.primary"}
          borderWidth={1}
          rounded={"full"}
          bg={"brand.bg"}
          leftIcon={
            <Icon
              as={Ionicons}
              color="brand.primary"
              name="arrow-back"
              size="sm"
            />
          }
        >
          <Text
            fontFamily={"Roboto-Bold"}
            color={"brand.primary"}
            fontSize={14}
          >
            ANTERIOR
          </Text>
        </Button>
        <Button
          py={4}
          px={8}
          w={"40%"}
          rounded={"full"}
          rightIcon={
            <Icon
              as={Ionicons}
              color="brand.bg"
              name="arrow-forward"
              size="sm"
            />
          }
        >
          <Text fontFamily={"Roboto-Bold"} color={"brand.bg"} fontSize={14}>
            PRÓXIMO
          </Text>
        </Button>
      </HStack>
    </View>
  );
}

const ListExercises = () => {
  return (
    <FlatList
      bg="brand.bg"
      data={[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]}
      renderItem={() => <ExerciseItem name="Supino Reto" />}
    />
  );
};

export const WorkoutDescription = () => (
  <VStack p={4}>
    <Heading color={"white"} fontFamily={"Roboto-Bold"}>
      Treino de Peito
    </Heading>
    <Text mt={2} color="white">
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has
      roots in a piece of classical Latin literature from 45 BC, making it over
      2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
      College in Virginia, looked up one of the more obscure Latin words,
      consectetur, from a Lorem Ipsum passage, and going through the cites of
      the word in classical literature, discovered the undoubtable source. Lorem
      Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
      Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This
      book is a treatise on the theory of ethics, very popular during the
      Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
      amet..", comes from a line in section 1.10.32.
    </Text>
  </VStack>
);
