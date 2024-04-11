import {
  Button,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import useCreateExercise from "../../../src/controllers/trainer/useCreateExercise";
import InputComponent from "../../../src/components/common/input/input";
import { ResizeMode, Video } from "expo-av";
import HeaderDefault from "../../../src/components/common/header/headerDefault";

export default function CreateExercisePage() {
  const { pickVideo, exercise, invalid, setExercise, handleCreateExercice, loading } = useCreateExercise();

  return (
    <ScrollView bg={"brand.bg"} flex={1}>
      <HeaderDefault title={"Cadastrar Exercícios"} />
      <VStack space={2} my={4} px={"4"}>
        <InputComponent
          label="Nome do Exercício"
          value={exercise.name}
          onChange={(e) => setExercise((prev) => ({ ...prev, name: e }))}
          invalid={invalid.name.error}
          error={invalid.name.msg}
        />
        <InputComponent
          textarea
          label="Descrição do Exercício"
          value={exercise.description}
          onChange={(e) => setExercise((prev) => ({ ...prev, description: e }))}
          invalid={invalid.name.error}
          error={invalid.name.msg}
          inputProps={{
            multiline: true,
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
            <View my={0} />
            <Video
              source={{
                uri: exercise.file?.uri,
              }}
              style={{ width: "100%", height: "40%" }}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              isLooping
            />
          </>
        ) : null}

        <Button onPress={handleCreateExercice} isLoading={loading}>
          <Text fontFamily={"Roboto-Bold"} color={"brand.bg"} fontSize={14}>
            CRIAR EXERCÍCIO
          </Text>
        </Button>
      </VStack>
    </ScrollView>
  );
}
