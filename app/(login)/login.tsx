import useLogin from "../../src/controllers/login/useLogin";
import { Link } from "expo-router";
import InputComponent from "../../src/components/common/input/input";
import {
  Button,
  Center,
  Checkbox,
  Heading,
  Icon,
  IconButton,
  Image,
  KeyboardAvoidingView,
  Row,
  ScrollView,
  Text,
  View,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginPage() {
  const {
    email,
    handleLogin,
    invalid,
    seePassword,
    setEmail,
    password,
    setPassword,
    saveData,
    setSaveData,
    toogleSeePassword,
    loading,
  } = useLogin();

  const inset = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        paddingTop: inset.top,
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      bg={"brand.bg"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          px={4}
          contentContainerStyle={{
            gap: 20,
            flex: 1,
            flexGrow: 1,
            justifyContent: "center",
          }}
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
            color="brand.primary"
            fontFamily={"Roboto-Bold"}
            fontSize={22}
          >
            Bem vindo(a) de volta
          </Heading>
          </View>
          <InputComponent
            label="Digite seu e-mail"
            onChange={setEmail}
            value={email}
            invalid={invalid.email.invalid}
            error={invalid.email.error}
            inputProps={{
              autoCapitalize: "none",
              textContentType: "emailAddress",
            }}
            placeholder="E-mail"
          />
          <InputComponent
            invalid={invalid.password.invalid}
            error={invalid.password.error}
            label="Digite sua senha"
            onChange={setPassword}
            value={password}
            secure={!seePassword}
            placeholder="Senha"
            inputProps={{ autoCapitalize: "none" }}
            icon={
              <IconButton
                icon={
                  <Icon
                    color={"white"}
                    as={Ionicons}
                    name={seePassword ? "eye" : "eye-off"}
                  />
                }
                borderRadius="full"
                onPress={toogleSeePassword}
              />
            }
          />
          <Row alignItems={"center"} justifyContent={"space-between"}>
            <Row space={2}>
              <Checkbox
                borderColor={"brand.bg"}
                _checked={{
                  bg: "brand.primary",
                  borderColor: "brand.primary",
                }}
                value={saveData ? "false" : "true"}
                _pressed={{ backgroundColor: "brand.secondary" }}
                onChange={setSaveData}
              >
                <Text color={"white"}>Salvar dados</Text>
              </Checkbox>
            </Row>
            <View>
              <Link href={"/forgot-password"}>
                <Text color={"white"}>Esqueci minha senha</Text>
              </Link>
            </View>
          </Row>
          <Button mt={4} onPress={handleLogin} isLoading={loading}>
            <Text fontFamily={"Roboto-Bold"} color={"brand.bg"} fontSize={14}>
              LOGIN
            </Text>
          </Button>
          <Center>
            <Text color="white">
              Ainda não possui conta?{" "}
              <Link href={"/signup"}>
                <Text color="brand.primary">Cadastre-se</Text>
              </Link>
            </Text>
          </Center>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
