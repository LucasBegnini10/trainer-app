import { Link } from "expo-router";
import InputComponent from "../../src/components/common/input/input";
import {
  Button,
  Center,
  Icon,
  IconButton,
  Image,
  Text,
  View,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function SignUpPage() {
  return (
    <View flex={1} justifyContent={"center"} px={4} style={{ gap: 20 }}>
      <Center mb={4}>
        <Image
          alt="Logo"
          source={require("../../assets/logo.png")}
          w={32}
          h={32}
        />
      </Center>
      <Text fontFamily={"Inter-Medium"} color="primary.600" fontSize={22}>
        Bem vindo(a) treinador(a)!
      </Text>
      <InputComponent
        label="Nome"
        inputProps={{
          rounded: "full",
          autoCapitalize: "words",
          textContentType: "name",
        }}
        placeholder="Nome e Sobrenome"
      />
      <InputComponent
        label="E-mail"
        inputProps={{
          rounded: "full",
          autoCapitalize: "none",
          textContentType: "emailAddress",
        }}
        placeholder="seuemail@email.com"
      />
      <InputComponent
        label="Documento (CPF/CNPJ)"
        inputProps={{
          rounded: "full",
        }}
        placeholder="###.###.###-##"
      />

      <InputComponent
        label="Senha"
        placeholder="*************"
        inputProps={{ autoCapitalize: "none", rounded: "full" }}
        icon={
          <IconButton
            icon={<Icon as={Ionicons} name={"eye"} />}
            borderRadius="full"
          />
        }
      />
      <Button mt={4} padding={4} rounded={"full"} w="full" bg="primary.700">
        <Text fontFamily={"Inter-Bold"} color={"white"} fontSize={14}>
          CADASTRAR
        </Text>
      </Button>
      <Center>
        <Text>
          Já possui uma conta?{" "}
          <Link href={"/login"}>
            <Text color="primary.800">Faça login</Text>
          </Link>
        </Text>
      </Center>
    </View>
  );
}
