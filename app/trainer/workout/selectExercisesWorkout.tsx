import {
  Avatar,
  Checkbox,
  FlatList,
  HStack,
  Heading,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import { getInitials, limitString } from "../../../src/utils/string";
import { useState } from "react";
import { ExercisesModel } from "../../../src/models/models";
import useSelectExercisesWorkout from "../../../src/controllers/trainer/useSelectExercisesWorkout";
import HeaderDefault from "../../../src/components/common/header/headerDefault";

export default function SelectExercisesWorkout() {
  const {
    addExercise,
    exercisesHashMap,
    exercises,
    removeExercise,
    isLoading,
  } = useSelectExercisesWorkout();

  const onChangeCheckbox = (val: boolean, exercise: ExercisesModel) => {
    if (val) {
      addExercise({ ...exercise });
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

        return (
          <VStack
            bg="brand.bg"
            rounded={"lg"}
            borderWidth={1}
            borderColor={"brand.gray"}
            p={"4"}
          >
            <HStack alignItems={"center"} justifyContent={"space-between"}>
              <HStack space={4} alignItems={"center"} flex={0.7}>
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
              <HStack alignItems={"center"} space={2} flex={0.05}>
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
              Nenhum exercício encontrado.
            </Text>
          )}
        </View>
      }
      ListHeaderComponent={
        <HeaderDefault style={{ mb: 4 }} title={"Selecionar Exercícios"} />
      }
    />
  );
}
