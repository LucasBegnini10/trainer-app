import {
  Badge,
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  IconButton,
  Row,
  ScrollView,
  Text,
  VStack,
  View,
  Pressable,
  Modal,
  FlatList,
  Avatar,
  Checkbox,
  PresenceTransition,
} from "native-base";
import InputComponent from "../../../src/components/common/input/input";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useCreateWorkout, {
  CreateWorkoutType,
} from "../../../src/controllers/trainer/useCreateWorkout";
import { ExercisesModel, UserModel } from "../../../src/models/models";
import { useState } from "react";
import { getInitials, limitString } from "../../../src/utils/string";

export default function CreateWorkout() {
  const {
    exercises,
    students,
    workout,
    exercisesSelected,
    studentsSelected,
    scheduleDescription,
  }: CreateWorkoutType = useCreateWorkout();

  return (
    <ScrollView bg={"brand.bg"} flex={1}>
      <HeaderCreateWorkout />
      <VStack space={2} my={4} px={"4"}>
        <InputComponent
          label="Nome do Treino"
          // value={exercise.name}
          // onChange={(e) => setExercise((prev) => ({ ...prev, name: e }))}
          // invalid={invalid.name.error}
          // error={invalid.name.msg}
        />
        <InputComponent
          textarea
          label="Descrição do Treino"
          // value={exercise.description}
          // onChange={(e) => setExercise((prev) => ({ ...prev, description: e }))}
          // invalid={invalid.name.error}
          // error={invalid.name.msg}
          // inputProps={{
          //     multiline: true
          // }}
        />

        <ScheduleDescription
          options={scheduleDescription.options}
          toggle={scheduleDescription.toggle}
          state={scheduleDescription.state}
        />
        <Divider bg={"brand.gray"} />

        <SelectUserList
          students={students}
          studentsSelected={studentsSelected.get}
          set={studentsSelected.set}
          remove={studentsSelected.remove}
        />
        <Divider bg={"brand.gray"} />

        <SelectExerciseList
          exercises={exercises}
          exercisesSelected={exercisesSelected.get}
          set={exercisesSelected.set}
          remove={exercisesSelected.remove}
        />

        <Button
          mt={4}
          // onPress={pickVideo}
          bg={"brand.bg"}
          borderColor={"brand.primary"}
          borderWidth={"1"}
        >
          <Text fontFamily={"Roboto-Medium"} color={"brand.primary"}>
            {"ESCOLHAR IMAGEM DO TREINO"}
          </Text>
        </Button>

        {/* {exercise?.file ? (
          <>
          <View my={0}/>
          <Video
            source={{
              uri: exercise.file?.uri,
            }}
            style={{ width: "100%", height: "45%" }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
          />
          </>
        ) : null} */}

        <Button
          // onPress={handleCreateExercice}
          // isLoading={loading}
          mt={4}
        >
          <Text fontFamily={"Roboto-Bold"} color={"brand.bg"} fontSize={14}>
            CRIAR TREINO
          </Text>
        </Button>
      </VStack>
    </ScrollView>
  );
}

const HeaderCreateWorkout = () => {
  const insets = useSafeAreaInsets();

  const goBack = () => router.back();

  return (
    <HStack
      px={"4"}
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
        Cadastrar Treino
      </Heading>
      <View w="12" />
    </HStack>
  );
};

interface SelectUserListProps {
  students: UserModel[];
  studentsSelected: UserModel[];
  set: (student: UserModel) => void;
  remove: (student: UserModel) => void;
}

const SelectUserList = (props: SelectUserListProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <VStack>
      <Row alignItems={"center"} justifyContent={"space-between"}>
        <Text color={"white"}>
          Alunos selecionados ({props.studentsSelected.length})
        </Text>
        <IconButton
          onPress={() => setShowModal(true)}
          _pressed={{ bg: "brand.gray" }}
          icon={
            <Icon as={Ionicons} name={"open-outline"} color={"brand.primary"} />
          }
        />
      </Row>
      <ModalSelectUser
        showModal={showModal}
        setShowModal={setShowModal}
        {...props}
      />
    </VStack>
  );
};

interface ModalSelectUserProps extends SelectUserListProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const ModalSelectUser = ({
  setShowModal,
  showModal,
  remove,
  set,
  students,
  studentsSelected,
}: ModalSelectUserProps) => {
  const isChecked = (user: UserModel) =>
    Boolean(studentsSelected.find(({ id }) => id === user.id));

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
            Selecionar Alunos
          </Heading>
        </Modal.Header>
        <Modal.Body bg={"brand.bg"}>
          <FlatList
            bg={"brand.bg"}
            contentContainerStyle={{ paddingBottom: 20 }}
            data={students}
            ListEmptyComponent={
              <View>
                <Text color={"gray.600"} mt={2}>
                  Nenhum aluno encontrado.
                </Text>
              </View>
            }
            ItemSeparatorComponent={() => <View my={2} />}
            renderItem={({ item: user }) => {
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
                          {getInitials(user.name)}
                        </Text>
                      }
                    </Avatar>
                    <VStack space={1}>
                      <Heading
                        fontSize={"md"}
                        fontFamily={"Roboto-Medium"}
                        color={"white"}
                      >
                        {user.name}
                      </Heading>
                      <Text color={"white"} fontSize={"sm"}>
                        {user.email}
                      </Text>
                    </VStack>
                  </HStack>
                  <Checkbox
                    aria-label="Checkbox"
                    value="1"
                    onChange={(val) => (val ? set(user) : remove(user))}
                    isChecked={isChecked(user)}
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

interface SelectExerciseProps {
  exercises: ExercisesModel[];
  exercisesSelected: ExercisesModel[];
  set: (exercise: ExercisesModel) => void;
  remove: (exercise: ExercisesModel) => void;
}

const SelectExerciseList = (props: SelectExerciseProps) => {
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

interface ScheduleDescriptionProps {
  options: [string, string][];
  toggle: (day: string) => void;
  state: number[];
}

const ScheduleDescription = ({
  options,
  toggle,
  state,
}: ScheduleDescriptionProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <VStack>
      <Row alignItems={"center"} justifyContent={"space-between"}>
        <Text color={"white"}>Dia(s) da semana ({state?.length || 0})</Text>
        <IconButton
          onPress={() => setExpanded((prev) => !prev)}
          _pressed={{ bg: "brand.gray" }}
          icon={
            <Icon
              as={Ionicons}
              name={expanded ? "arrow-up" : "arrow-down"}
              color={"brand.primary"}
            />
          }
        />
      </Row>

      <PresenceTransition
        visible={expanded}
        initial={{
          opacity: 0,
          translateX: -10,
        }}
        animate={{
          opacity: 1,
          translateX: 0,
          transition: {
            duration: 600, 
          },
        }}
        style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {expanded && options.map((item) => {
          const [key, value] = item;
          const isActive = Boolean(state?.includes(parseInt(key)));

          return (
            <Pressable key={key} onPress={() => toggle(key)} m={1}>
              <Badge
                key={key}
                borderWidth={1}
                borderColor={"brand.primary"}
                bg={isActive ? "brand.primary" : "brand.bg"}
                rounded={"full"}
                px={4}
                _text={{
                  color: isActive ? "brand.bg" : "white",
                  fontSize: "sm",
                }}
              >
                {value}
              </Badge>
            </Pressable>
          );
        })}
      </PresenceTransition>
    </VStack>
  );
};
