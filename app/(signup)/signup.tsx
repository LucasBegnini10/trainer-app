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
import useSignup from "../../src/controllers/signup/useSignup";

export default function SignUpPage() {
  const {
    data: { get, set },
    handleSignup,
    invalid,
    seePassword,
    toogleSeePassword,
    loading
  } = useSignup();

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
        value={get.name}
        onChange={set.name}
        invalid={invalid.name.invalid}
        error={invalid.name.error}
        label="Nome"
        inputProps={{
          rounded: "full",
          autoCapitalize: "words",
          textContentType: "name",
        }}
        placeholder="Nome e Sobrenome"
      />
      <InputComponent
        value={get.email}
        onChange={set.email}
        invalid={invalid.email.invalid}
        error={invalid.email.error}
        label="E-mail"
        inputProps={{
          rounded: "full",
          autoCapitalize: "none",
          textContentType: "emailAddress",
        }}
        placeholder="seuemail@email.com"
      />
      <InputComponent
        value={get.document}
        onChange={set.document}
        invalid={invalid.document.invalid}
        error={invalid.document.error}
        label="Documento (CPF/CNPJ)"
        inputProps={{
          rounded: "full",
        }}
        placeholder="###.###.###-##"
      />

      <InputComponent
        invalid={invalid.password.invalid}
        error={invalid.password.error}
        label="Senha"
        onChange={set.password}
        value={get.password}
        secure={!seePassword}
        placeholder="*************"
        inputProps={{ autoCapitalize: "none", rounded: "full" }}
        icon={
          <IconButton
            icon={<Icon as={Ionicons} name={seePassword ? "eye" : "eye-off"} />}
            borderRadius="full"
            onPress={toogleSeePassword}
          />
        }
      />
      <Button
        onPress={handleSignup}
        mt={4}
        padding={4}
        rounded={"full"}
        w="full"
        bg="primary.700"
        isLoading={loading}
      >
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
