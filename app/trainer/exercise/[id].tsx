import {
  Button,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import InputComponent from "../../../src/components/common/input/input";
import { ResizeMode, Video } from "expo-av";
import useUpdateExercise from "../../../src/controllers/trainer/useUpdateExercise";
import HeaderDefault from "../../../src/components/common/header/headerDefault";

export default function UpdateExercise() {
  const { exercise, setExercise } = useUpdateExercise();

  return (
    <ScrollView bg={"brand.bg"} flex={1}>
      <HeaderDefault title={"Editar Exercício"} />
      <VStack space={2} my={4} px={"4"}>
        <InputComponent
          label="Nome do Exercício"
          value={exercise?.name}
          onChange={(e) => setExercise((prev) => ({ ...prev, name: e }))}
          // invalid={invalid.name.error}
          // error={invalid.name.msg}
        />
        <InputComponent
          label="Descrição do Exercício"
          value={exercise?.description}
          textarea
          onChange={(e) => setExercise((prev) => ({ ...prev, description: e }))}
          // invalid={invalid.name.error}
          // error={invalid.name.msg}
          inputProps={{
            multiline: true,
          }}
        />

        <Button
          mt={4}
          // onPress={pickVideo}
          bg={"brand.bg"}
          borderColor={"brand.primary"}
          borderWidth={"1"}
        >
          <Text fontFamily={"Roboto-Medium"} color={"brand.primary"}>
            {"ESCOLHER VÍDEO"}
          </Text>
        </Button>

        {exercise?.video_url ? (
          <>
            <View my={0} />
            <Video
              source={{
                uri: exercise?.video_url,
              }}
              style={{ width: "100%", height: "35%" }}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              isLooping
            />
          </>
        ) : null}

        <Button
          // onPress={handleCreateExercice}
          // isLoading={loading}
          mt={4}
        >
          <Text fontFamily={"Roboto-Bold"} color={"brand.bg"} fontSize={14}>
            EDITAR EXERCÍCIO
          </Text>
        </Button>
      </VStack>
    </ScrollView>
  );
}
