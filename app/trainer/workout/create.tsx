import {
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
} from "native-base";
import InputComponent from "../../../src/components/common/input/input";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useCreateWorkout, {
  CreateWorkoutType,
} from "../../../src/controllers/trainer/useCreateWorkout";
import { SelectExerciseList } from "../../../src/components/workout/selectExerciseList";

export default function CreateWorkout() {
  const {
    exercises,
    workout,
    exercisesSelected,
    selectStudents,
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

        <VStack>
          <Row alignItems={"center"} justifyContent={"space-between"}>
            <Text color={"white"}>
              Alunos selecionados ({selectStudents.students.length})
            </Text>
            <IconButton
              onPress={selectStudents.go}
              _pressed={{ bg: "brand.gray" }}
              icon={
                <Icon
                  as={Ionicons}
                  name={"open-outline"}
                  color={"brand.primary"}
                />
              }
            />
          </Row>
        </VStack>

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
