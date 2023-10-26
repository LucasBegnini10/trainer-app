import useLogin from "../../src/hooks/login/useLogin";
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
    loading,
  } = useLogin();

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
        Bem vindo(a) de volta
      </Text>
      <InputComponent
        label="E-mail"
        onChange={setEmail}
        value={email}
        invalid={invalid.email.invalid}
        error={invalid.email.error}
        inputProps={{
          rounded: "full",
          textContentType: "emailAddress",
        }}
        placeholder="seuemail@email.com"
      />
      <InputComponent
        invalid={invalid.password.invalid}
        error={invalid.password.error}
        label="Senha"
        onChange={setPassword}
        value={password}
        secure={!seePassword}
        placeholder="*************"
        inputProps={{ autoCapitalize: "none", rounded: "full" }}
        icon={
          <IconButton
            icon={<Icon as={Ionicons} name={seePassword ? "eye" : "eye-off"} />}
            borderRadius="full"
          />
        }
      />
      <Row alignItems={"center"} justifyContent={"space-between"}>
        <Row space={2}>
          <Checkbox value={saveData ? "false" : "true"} onChange={setSaveData}>
            <Text>Salvar dados</Text>
          </Checkbox>
        </Row>
        <View>
          <Link href={"/forgot-password"}>
            <Text color={"primary.800"}>Esqueci minha senha</Text>
          </Link>
        </View>
      </Row>
      <Button
        mt={4}
        padding={4}
        rounded={"full"}
        w="full"
        bg="primary.700"
        onPress={handleLogin}
      >
        <Text fontFamily={"Inter-Bold"} color={"white"} fontSize={14}>
          LOGIN
        </Text>
      </Button>
      <Center>
        <Text>
          Ainda não possui conta?{" "}
          <Link href={"/signup"}>
            <Text color="primary.800">Cadastre-se</Text>
          </Link>
        </Text>
      </Center>
    </View>
  );
}
