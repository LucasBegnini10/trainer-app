import { Button, Center, Image, Text, View } from "native-base";
import InputComponent from "../../src/components/common/input/input";
import useForgotPassword from "../../src/controllers/forgotPassword/useForgotPassword";
import { Link } from "expo-router";

export default function ForgotPassword() {
  const { handleRecoveryPassword, loading, email, setEmail } =
    useForgotPassword();

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
        Recuperar Senha
      </Text>
      <InputComponent
        value={email}
        onChange={setEmail}
        label="E-mail"
        inputProps={{
          rounded: "full",
          autoCapitalize: "none",
          textContentType: "emailAddress",
        }}
        placeholder="seuemail@email.com"
      />

      <Button
        onPress={handleRecoveryPassword}
        isLoading={loading}
        mt={4}
        padding={4}
        rounded={"full"}
        w="full"
        bg="primary.700"
      >
        <Text fontFamily={"Inter-Bold"} color={"white"} fontSize={14}>
          RECUPER SENHA
        </Text>
      </Button>
      <Center>
        <Text>
          Lembrou da senha?{" "}
          <Link href={"/login"}>
            <Text color="primary.800">Fazer login</Text>
          </Link>
        </Text>
      </Center>
    </View>
  );
}
