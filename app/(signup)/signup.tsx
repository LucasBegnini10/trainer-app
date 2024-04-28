import { Link } from "expo-router";
import InputComponent from "../../src/components/common/input/input";
import {
  Button,
  Center,
  Heading,
  Icon,
  IconButton,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import useSignup from "../../src/controllers/signup/useSignup";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform } from "react-native";

export default function SignUpPage() {
  const {
    data: { get, set },
    handleSignup,
    invalid,
    seePassword,
    toogleSeePassword,
    loading,
  } = useSignup();

  const inset = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: inset.top }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      bg={"brand.bg"}
    >
      <ScrollView
        px={4}
        contentContainerStyle={{ gap: 20, justifyContent: "center", flex: 1 }}
      >
        <Center mb={4}>
          <Image
            alt="Logo"
            source={require("../../assets/logo.png")}
            w={32}
            h={32}
          />
        </Center>
        <View>
          <Heading
            fontFamily={"Roboto-Bold"}
            color="brand.primary"
            fontSize={22}
          >
            Bem vindo(a) treinador(a)!
          </Heading>
        </View>
        <InputComponent
          value={get.name}
          onChange={set.name}
          invalid={invalid.name.invalid}
          error={invalid.name.error}
          label="Nome"
          inputProps={{
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
          inputProps={{}}
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
          inputProps={{ autoCapitalize: "none" }}
          icon={
            <IconButton
              icon={
                <Icon
                  color="brand.primary"
                  as={Ionicons}
                  name={seePassword ? "eye" : "eye-off"}
                />
              }
              borderRadius="full"
              onPress={toogleSeePassword}
            />
          }
        />
        <Button onPress={handleSignup} mt={4} isLoading={loading}>
          <Text fontFamily={"Roboto-Bold"} color={"brand.bg"} fontSize={14}>
            CADASTRAR
          </Text>
        </Button>
        <Center mb={10}>
          <Text color={"white"}>
            Já possui uma conta?{" "}
            <Link href={"/login"}>
              <Text color="brand.primary">Faça login</Text>
            </Link>
          </Text>
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
