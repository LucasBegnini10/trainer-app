import { useState } from "react";
import { ExercisesModel } from "../../models/models";
import {
  Avatar,
  Checkbox,
  FlatList,
  HStack,
  Heading,
  Icon,
  IconButton,
  Modal,
  Row,
  Text,
  VStack,
  View,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { getInitials, limitString } from "../../utils/string";

interface SelectExerciseProps {
  exercises: ExercisesModel[];
  exercisesSelected: ExercisesModel[];
  set: (exercise: ExercisesModel) => void;
  remove: (exercise: ExercisesModel) => void;
}

export const SelectExerciseList = (props: SelectExerciseProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <VStack>
      <Row alignItems={"center"} justifyContent={"space-between"}>
        <Text color={"white"}>
          Exercícios selecionados ({props.exercisesSelected.length})
        </Text>
        <IconButton
          onPress={() => setShowModal(true)}
          _pressed={{ bg: "brand.gray" }}
          icon={
            <Icon as={Ionicons} name={"open-outline"} color={"brand.primary"} />
          }
        />
      </Row>
      <ModalSelectExercise
        showModal={showModal}
        setShowModal={setShowModal}
        {...props}
      />
    </VStack>
  );
};

interface ModalSelectExerciseProps extends SelectExerciseProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const ModalSelectExercise = ({
  exercises,
  exercisesSelected,
  remove,
  set,
  setShowModal,
  showModal,
}: ModalSelectExerciseProps) => {
  const isChecked = (exercise: ExercisesModel) => {
    return Boolean(exercisesSelected.find(({ id }) => id === exercise.id));
  };
  return (
    <Modal
      size={"xl"}
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      bg={"#000000a3"}
    >
      <Modal.Content>
        <Modal.CloseButton
          _icon={{ color: "white" }}
          _pressed={{ bg: "brand.gray" }}
        />
        <Modal.Header bg={"brand.bg"}>
          <Heading size={"md"} color={"white"}>
            Selecionar Exercícios
          </Heading>
        </Modal.Header>
        <Modal.Body bg={"brand.bg"}>
          <FlatList
            bg={"brand.bg"}
            contentContainerStyle={{ paddingBottom: 20 }}
            data={exercises}
            ListEmptyComponent={
              <View>
                <Text color={"gray.600"} mt={2}>
                  Nenhum exercício encontrado.
                </Text>
              </View>
            }
            ItemSeparatorComponent={() => <View my={2} />}
            renderItem={({ item: exercise }) => {
              return (
                <HStack
                  p={4}
                  alignItems={"center"}
                  bg="brand.bg"
                  rounded={"lg"}
                  borderWidth={1}
                  borderColor={"brand.gray"}
                  justifyContent={"space-between"}
                >
                  <HStack alignItems={"center"} space={4}>
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
                        {limitString(exercise.description, 30)}
                      </Text>
                    </VStack>
                  </HStack>
                  <Checkbox
                    aria-label="Checkbox"
                    value="1"
                    onChange={(val) => (val ? set(exercise) : remove(exercise))}
                    isChecked={isChecked(exercise)}
                    _checked={{
                      bg: "brand.primary",
                      borderColor: "brand.primary",
                    }}
                    _pressed={{
                      bg: "brand.primary",
                      borderColor: "brand.primary",
                    }}
                    _focus={{
                      bg: "brand.primary",
                      borderColor: "brand.primary",
                    }}
                    _unchecked={{
                      bg: "brand.bg",
                      borderColor: "brand.primary",
                    }}
                    _hover={{
                      bg: "brand.primary",
                      borderColor: "brand.primary",
                    }}
                    _disabled={{
                      bg: "brand.primary",
                      borderColor: "brand.primary",
                    }}
                  />
                </HStack>
              );
            }}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
