import { Avatar, Button, Text, VStack, View } from "native-base";
import InputComponent from "../../../src/components/common/input/input";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfilePage() {

  const insets = useSafeAreaInsets()

  return (
    <View style={{paddingTop: insets.top}} w={"full"} flex={1} alignItems={"center"} justifyContent={"center"} bg="white" px={4}>
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

      <Button bg={"primary.800"} mt={4} padding={4} rounded={"full"} w="full">
        <Text fontFamily={"Inter-Bold"} color={"white"} fontSize={14}>
          SALVAR
        </Text>
      </Button>

      <Button
        mt={20}
        variant={"outline"}
        borderColor={"red.700"}
        padding={4}
        rounded={"full"}
        w="full"
      >
        <Text fontFamily={"Inter-Bold"} color={"red.700"} fontSize={14}>
          SAIR
        </Text>
      </Button>
    </View>
  );
}
