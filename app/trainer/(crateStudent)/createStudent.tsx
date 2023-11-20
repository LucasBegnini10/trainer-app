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
import { UserModel } from "../../../src/models/models";
import useCreateStudent from "../../../src/controllers/trainer/useCreateStudent";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import InputComponent from "../../../src/components/common/input/input";

export default function CreateStudent() {
  const { user, student, invalid, loading, handleCreateStudent } =
    useCreateStudent();
  return (
    <>
      <HeaderCreateStudent user={user} />
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
        <Button isLoading={loading} onPress={handleCreateStudent} mt={4} padding={4} rounded={"full"} w="full" bg="primary.700">
          <Text fontFamily={"Roboto-Bold"} color={"white"} fontSize={14}>
            CADASTRAR
          </Text>
        </Button>
      </VStack>
    </>
  );
}

const HeaderCreateStudent = ({ user }: { user: UserModel }) => {
  const insets = useSafeAreaInsets();

  const goBack = () => router.back();

  return (
    <HStack
      px={"4"}
      bg="white"
      justifyContent={"space-between"}
      pt={`${insets.top + 20}px`}
    >
      <IconButton
        onPress={goBack}
        color="black"
        size={"sm"}
        _icon={{
          color: "black",
          size: "md",
          as: Ionicons,
          name: "arrow-back",
        }}
      />
      <Heading>Cadastrar Alunos</Heading>
      <View w="12" />
    </HStack>
  );
};
