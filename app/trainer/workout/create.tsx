import {
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
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
import { ResizeMode } from "expo-av";

export default function CreateWorkout() {
  const {
    workout,
    selectExercises,
    selectStudents,
    invalid,
    handleCreateWorkout,
    pickImage,
  }: CreateWorkoutType = useCreateWorkout();

  return (
    <ScrollView bg={"brand.bg"} flex={1}>
      <HeaderCreateWorkout />
      <VStack space={2} my={4} px={"4"}>
        <InputComponent
          label="Nome do Treino"
          value={workout.get.name}
          onChange={(e) => workout.set({key: "name", value: e})}
          invalid={invalid.name?.error}
          error={invalid.name?.msg}
        />
        <InputComponent
          textarea
          label="Descrição do Treino"
          value={workout.get.description}
          onChange={(e) => workout.set({key: "description", value: e})}
          invalid={invalid.workout?.error}
          error={invalid.workout?.msg}
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

        <VStack>
          <Row alignItems={"center"} justifyContent={"space-between"}>
            <Text color={"white"}>
              Exercícios selecionados ({selectExercises.exercises.length})
            </Text>
            <IconButton
              onPress={selectExercises.go}
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

        <Button
          mt={4}
          onPress={pickImage}
          bg={"brand.bg"}
          borderColor={"brand.primary"}
          borderWidth={"1"}
        >
          <Text fontFamily={"Roboto-Medium"} color={"brand.primary"}>
            {(workout.get.file?.uri ? "TROCAR" : "ESCOLHAR") +
              " IMAGEM DO TREINO"}
          </Text>
        </Button>

        {workout.get.file?.uri ? (
          <View mt={2}>
            <Image
              source={{ uri: workout.get.file?.uri }}
              alt={"Imagem do treino"}
              resizeMode={ResizeMode.COVER}
              height={200}
              width={"100%"}
            />
          </View>
        ) : null}

        <Button
          onPress={handleCreateWorkout}
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
