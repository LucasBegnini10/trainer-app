import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Avatar,
  Divider,
  Fab,
  FlatList,
  HStack,
  Heading,
  Icon,
  Input,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import useHomeTrainer from "../../../src/controllers/home/trainer/useHome";
import { getInitials } from "../../../src/utils/string";
import { TouchableOpacity } from "react-native";

export default function HomeTrainer() {
  const { goToCreateExercice, exercises, isLoading, goToUpdateExercise } =
    useHomeTrainer();

  return (
    <>
      <FlatList
        bg="brand.bg"
        contentContainerStyle={{ paddingBottom: 20 }}
        px={4}
        data={exercises}
        ItemSeparatorComponent={() => <View my={2}/>}
        ListEmptyComponent={
          <View>
            {isLoading ? (
              <Spinner color={"brand.primary"} />
            ) : (
              <Text color={"gray.600"} mt={2}>
                Nenhum exercício encontrado.
              </Text>
            )}
          </View>
        }
        ListHeaderComponent={<View my={2} />}
        renderItem={({ item: exercise }) => {
          return (
            <TouchableOpacity onPress={() => goToUpdateExercise(exercise)}>
              <HStack
                space={4}
                p={4}
                alignItems={"center"}
                bg="brand.bg"
                rounded={"lg"}
                borderWidth={1}
                borderColor={"brand.gray"}
              >
                <Avatar bg="brand.primary">
                  {
                    <Text color={"brand.bg"} fontSize={"lg"}>
                      {getInitials(exercise.name)}
                    </Text>
                  }
                </Avatar>
                <VStack space={1}>
                  <Heading
                    fontSize={"md"}
                    fontFamily={"Roboto-Medium"}
                    color={"white"}
                  >
                    {exercise.name}
                  </Heading>
                  <Text color={"white"} fontSize={"sm"}>
                    {exercise.description}
                  </Text>
                </VStack>
              </HStack>
            </TouchableOpacity>
          );
        }}
      />
      <Fab
        renderInPortal={false}
        onPress={goToCreateExercice}
        shadow={2}
        right={"10"}
        bottom={30}
        size="lg"
        width={"12"}
        icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
      />
    </>
  );
}
