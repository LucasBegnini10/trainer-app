import {
  Button,
  HStack,
  Heading,
  IconButton,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useCreateExercise from "../../../src/controllers/trainer/useCreateExercise";
import InputComponent from "../../../src/components/common/input/input";
import { ResizeMode, Video } from "expo-av";

export default function CreateExercisePage() {
  const { pickVideo, exercise, invalid, setExercise, handleCreateExercice, loading } = useCreateExercise();

  return (
    <ScrollView bg={"brand.bg"} flex={1}>
      <HeaderCreateExercise />
      <VStack space={2} my={4} px={"4"}>
        <InputComponent
          label="Nome do Exercício"
          value={exercise.name}
          onChange={(e) => setExercise((prev) => ({ ...prev, name: e }))}
          invalid={invalid.name.error}
          error={invalid.name.msg}
        />
        <InputComponent
          label="Descrição do Exercício"
          value={exercise.description}
          onChange={(e) => setExercise((prev) => ({ ...prev, description: e }))}
          invalid={invalid.name.error}
          error={invalid.name.msg}
          inputProps={{
              multiline: true
          }}
        />

        <Button
          mt={4}
          onPress={pickVideo}
          bg={"brand.bg"}
          borderColor={"brand.primary"}
          borderWidth={"1"}
        >
          <Text fontFamily={"Roboto-Medium"} color={"brand.primary"}>
            {exercise?.file?.fileName || "ESCOLHER VÍDEO"}
          </Text>
        </Button>

        {exercise?.file ? (
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
        ) : null}

        <Button onPress={handleCreateExercice} isLoading={loading} mt={4}>
          <Text fontFamily={"Roboto-Bold"} color={"brand.bg"} fontSize={14}>
            CRIAR EXERCÍCIO
          </Text>
        </Button>
      </VStack>
    </ScrollView>
  );
}

const HeaderCreateExercise = () => {
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
        Cadastrar Exercícios
      </Heading>
      <View w="12" />
    </HStack>
  );
};
