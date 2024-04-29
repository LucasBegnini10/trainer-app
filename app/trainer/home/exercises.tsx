import { AntDesign, Ionicons } from "@expo/vector-icons";
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
import useExerciseList from "../../../src/controllers/trainer/useExerciseList";
import { getInitials } from "../../../src/utils/string";
import { TouchableOpacity } from "react-native";
import InputComponent from "../../../src/components/common/input/input";

export default function HomeTrainer() {
  const {
    goToCreateExercice,
    exercises,
    isLoading,
    goToUpdateExercise,
    filter,
    setFilter,
  } = useExerciseList();

  return (
    <>
      <FlatList
        bg="brand.bg"
        contentContainerStyle={{ paddingBottom: 20 }}
        px={4}
        data={exercises}
        ItemSeparatorComponent={() => <View my={2} />}
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
        ListHeaderComponent={
          <InputComponent
            placeholder="Pesquisar Aluno"
            onChange={setFilter}
            value={filter}
            inputProps={{
              mb: "4",
              leftElement: (
                <Icon
                  as={<Ionicons name="search" />}
                  size={4}
                  ml="2"
                  color="muted.400"
                />
              ),
            }}
          />
        }
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
                <VStack space={1} flex={1}>
                  <Heading
                    fontSize={"md"}
                    fontFamily={"Roboto-Medium"}
                    color={"white"}
                  >
                    {exercise.name}
                  </Heading>
                  <Text
                    ellipsizeMode="tail"
                    color={"white"}
                    numberOfLines={1}
                    fontSize={"sm"}
                  >
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
