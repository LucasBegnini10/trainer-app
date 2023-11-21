import {
  Button,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
  View,
} from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import InputComponent from "../../../src/components/common/input/input";

export default function CreateExercisePage() {
  return (
    <View bg={"brand.bg"} h={"full"}>
      <HeaderCreateExercise />
      <VStack space={2} mt={4} px={"4"}>
        <InputComponent label="Nome" />
        <InputComponent label="E-mail" />
        <InputComponent label="Documento" />
        <InputComponent label="Senha" />
        <Button mt={4}>
          <Text fontFamily={"Roboto-Bold"} color={"brand.bg"} fontSize={14}>
            CRAIR EXERCÍCIO
          </Text>
        </Button>
      </VStack>
    </View>
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
        _pressed={{bg: "brand.grey"}}
      />
      <Heading fontFamily={"Roboto-Bold"} color={"white"}>Cadastrar Alunos</Heading>
      <View w="12" />
    </HStack>
  );
};
