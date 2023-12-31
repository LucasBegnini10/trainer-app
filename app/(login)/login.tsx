import useLogin from "../../src/controllers/login/useLogin";
import { Link } from "expo-router";
import InputComponent from "../../src/components/common/input/input";
import {
  Button,
  Center,
  Checkbox,
  Icon,
  IconButton,
  Image,
  Row,
  Text,
  View,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

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

  return (
    <View
      flex={1}
      bg="brand.bg"
      justifyContent={"center"}
      px={4}
      style={{ gap: 20 }}
    >
      <Center mb={4}>
        <Image
          alt="Logo"
          source={require("../../assets/logo.png")}
          w={32}
          h={32}
        />
      </Center>
      <Text color="brand.primary" fontFamily={"Roboto-Bold"} fontSize={22}>
        Bem vindo(a) de volta
      </Text>
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
            _checked={{ bg: "brand.primary", borderColor: "brand.primary" }}
            value={saveData ? "false" : "true"}
            _pressed={{backgroundColor: "brand.secondary"}}
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
    </View>
  );
}
