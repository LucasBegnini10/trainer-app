import { Avatar, Button, Center, HStack, Text, VStack } from "native-base";
import InputComponent from "../../src/components/common/input/input";

export default function ProfilePage() {
  return (
    <Center w={"full"} flex={1} justifyContent={"center"} bg="white" px={4}>
      <Avatar
        bg="green.500"
        size={"xl"}
        source={{
          uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        }}
      />

      <VStack w={"full"} space={3}>
        <InputComponent label="Nome" value="Lucas Begnini" />
        <InputComponent label="E-mail" value="begninilucas12@gmail.com" />
        <InputComponent label="Telefone" value="(19) 98768-2403" />
        <InputComponent label="Senha" value="*******" />
      </VStack>

      <Button
        variant={"outline"}
        borderColor={"primary.800"}
        mt={4}
        padding={4}
        rounded={"full"}
        w="full"
      >
        <Text fontFamily={"Inter-Bold"} color={"primary.800"} fontSize={14}>
          SALVAR
        </Text>
      </Button>

      <Button mt={20} padding={4} rounded={"full"} w="full" bg="red.500">
        <Text fontFamily={"Inter-Bold"} color={"white"} fontSize={14}>
          SAIR
        </Text>
      </Button>
    </Center>
  );
}
