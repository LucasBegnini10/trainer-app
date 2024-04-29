import {
  Actionsheet,
  Avatar,
  Button,
  FlatList,
  HStack,
  Heading,
  IconButton,
  Image,
  ScrollView,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import useWorkoutDetails from "../../../../src/controllers/student/useWorkoutDetails";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import LoadingPage from "../../../../src/components/common/loading-page/loadingPage";

export default function WorkoutDetails() {
  const {
    goBack,
    height,
    panResponder,
    maxHeightActive,
    goToDoWorkout,
    isLoading,
    workout,
    thumbs,
  } = useWorkoutDetails();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <View flex={0.35} position={"relative"}>
        <Image
          bg={"brand.bg"}
          source={{ uri: workout.logo_url }}
          alt={workout.name}
          width={"full"}
          resizeMode="cover"
          height={"full"}
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
          top={"15%"}
          left={"3%"}
        />
      </View>
      <ScrollView bg={"brand.bg"} flex={0.25} p={4}>
        <VStack space={2}>
          {/* <Text fontSize={"xs"} color={"brand.primary"}>
            Teste
          </Text> */}
          <Heading fontWeight={"bold"} color={"white"}>
            {workout.name}
          </Heading>
          <Text fontSize={"sm"} color={"gray.300"}>
            {workout.description}
          </Text>
          <HStack space={2}>
            <VStack
              alignItems={"center"}
              flex={0.5}
              p={2}
              bg={"brand.gray"}
              rounded={"lg"}
            >
              <Text color={"gray.300"} fontSize={"sm"}>
                Exercícios
              </Text>
              <Text color={"white"} fontSize={"md"}>
                {workout.exercises.length}
              </Text>
            </VStack>
            <VStack
              alignItems={"center"}
              flex={0.5}
              p={2}
              bg={"brand.gray"}
              rounded={"lg"}
            >
              <Text color={"gray.300"} fontSize={"sm"}>
                Publicado em
              </Text>
              <Text color={"white"}>
                {format(workout.created_at, "dd/MM/yyyy")}
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </ScrollView>
      <Actionsheet
        {...panResponder.panHandlers}
        disableOverlay={!maxHeightActive}
        isOpen={true}
        onClose={() => {}}
      >
        <Actionsheet.Content height={height} bg={"brand.gray"}>
          <View style={{ flex: 1 }} w={"full"}>
            <FlatList
              flex={1}
              bg={"brand.gray"}
              w={"full"}
              keyExtractor={(item, index) => String(index)}
              data={workout.exercises}
              renderItem={({ item }) => {
                return (
                  <HStack space={2} alignItems={"center"} mb={2}>
                    <Avatar source={{ uri: thumbs[item.id] }} />
                    <Text fontSize={"lg"} color={"white"}>{item.name}</Text >
                  </HStack>
                );
              }}
              ListHeaderComponent={
                <Heading
                  color={"white"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                  fontSize={"xl"}
                  py={2}
                >
                  Exercícios
                </Heading>
              }
            />
            <View p={2}>
              <Button
                onPress={goToDoWorkout}
                rounded={"full"}
                color={"brand.primary"}
              >
                <Text fontSize={"xl"} color={"brand.bg"}>
                  Iniciar Treino
                </Text>
              </Button>
            </View>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
