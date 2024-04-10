import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Avatar,
  Checkbox,
  FlatList,
  HStack,
  Heading,
  IconButton,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getInitials, limitString } from "../../../src/utils/string";
import { daysOfWeekMapping } from "../../../src/utils/schedule";
import { useState } from "react";
import { useExerciseWorkoutStore } from "../../../src/stores/useExercisesWorkoutStore";
import { ExercisesModel } from "../../../src/models/models";
import useSelectExercisesWorkout from "../../../src/controllers/trainer/useSelectExercisesWorkout";

export default function SelectExercisesWorkout() {
  const {
    addExercise,
    clear, 
    exercisesHashMap, 
    exercises, 
    getExercise,
    removeExercise,
    isLoading
  } = useSelectExercisesWorkout();

  const [expandedList, setExpandedList] = useState({});


  const onChangeCheckbox = (val: boolean, exercise: ExercisesModel) => {
    if (val) {
      addExercise({ ...exercise });
      setExpandedList((prev) => ({
        ...prev,
        [exercise.id]: true,
      }));
    } else {
      removeExercise(exercise.id);
    }
  };

  return (
    <FlatList
      data={exercises}
      bg={"brand.bg"}
      contentContainerStyle={{ paddingBottom: 20 }}
      px={4}
      ItemSeparatorComponent={() => <View my={2} />}
      renderItem={({ item: exercise }) => {
        const isChecked = Boolean(exercisesHashMap[exercise.id]);
        const isExpanded = Boolean(expandedList[exercise.id]);

        return (
          <VStack
            bg="brand.bg"
            rounded={"lg"}
            borderWidth={1}
            borderColor={"brand.gray"}
            p={"4"}
          >
            <HStack alignItems={"center"} justifyContent={"space-between"}>
              <HStack space={4} alignItems={"center"}>
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
                    {limitString(exercise.description, 50)}
                  </Text>
                </VStack>
              </HStack>
              <HStack alignItems={"center"} space={2}>
                <Checkbox
                  value="1"
                  isChecked={isChecked}
                  onChange={(val) => onChangeCheckbox(val, exercise)}
                  aria-label="Exercícios"
                  color={"brand.primary"}
                  borderColor={"white"}
                  _checked={{
                    bg: "brand.primary",
                    borderColor: "brand.primary",

                    _hover: {
                      bg: "brand.primary",
                      borderColor: "brand.primary",

                      _disabled: {
                        bg: "brand.primary",
                        borderColor: "brand.primary",
                      },
                    },
                  }}
                />
              </HStack>
            </HStack>
          </VStack>
        );
      }}
      ListEmptyComponent={
        <View>
          {isLoading ? (
            <Spinner color={"brand.primary"} />
          ) : (
            <Text color={"gray.600"} mt={2}>
              Nenhum aluno encontrado.
            </Text>
          )}
        </View>
      }
      ListHeaderComponent={<Header />}
    />
  );
}

const Header = () => {
  const insets = useSafeAreaInsets();

  const goBack = () => router.back();

  return (
    <HStack
      px={"4"}
      mb={"4"}
      bg="brand.bg"
      justifyContent={"space-between"}
      pt={`${insets.top + 20}px`}
    >
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
        _pressed={{ bg: "brand.grey" }}
      />
      <Heading fontFamily={"Roboto-Bold"} color={"white"}>
        Selecionar Alunos
      </Heading>
      <View w="12" />
    </HStack>
  );
};
