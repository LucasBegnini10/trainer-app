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
import useCreateStudent from "../../../src/controllers/trainer/useCreateStudent";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import InputComponent from "../../../src/components/common/input/input";

export default function CreateStudent() {
  const { student, invalid, loading, handleCreateStudent } = useCreateStudent();
  return (
    <View bg="brand.bg" h={"full"}>
      <HeaderCreateStudent />
      <VStack space={2} mt={4} px={"4"}>
        <InputComponent
          label="Nome"
          value={student.get.name}
          onChange={student.set.name}
          invalid={invalid.name.invalid}
          error={invalid.name.error}
        />
        <InputComponent
          label="E-mail"
          value={student.get.email}
          onChange={student.set.email}
          invalid={invalid.email.invalid}
          error={invalid.email.error}
          inputProps={{
            autoCapitalize: "none",
            type: "text",
            keyboardType: "email-address",
          }}
        />
        <InputComponent
          label="Documento"
          value={student.get.document}
          onChange={student.set.document}
          invalid={invalid.document.invalid}
          error={invalid.document.error}
        />
        <InputComponent
          label="Senha"
          onChange={student.set.password}
          value={student.get.password}
          invalid={invalid.password.invalid}
          error={invalid.password.error}
        />
        <Button isLoading={loading} onPress={handleCreateStudent} mt={4}>
          <Text fontFamily={"Roboto-Bold"} color={"brand.bg"} fontSize={14}>
            CADASTRAR
          </Text>
        </Button>
      </VStack>
    </View>
  );
}

const HeaderCreateStudent = () => {
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
      />
      <Heading color={"white"} fontFamily={"Roboto-Bold"}>Cadastrar Alunos</Heading>
      <View w="12" />
    </HStack>
  );
};
