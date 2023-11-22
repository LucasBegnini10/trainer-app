import { styles as styleForm } from "../../src/styles/form";
import {
  Actionsheet,
  Button,
  Center,
  Icon,
  Image,
  Text,
  View,
} from "native-base";
import useStart from "../../src/controllers/start/useStart";
import { Ionicons } from "@expo/vector-icons";

export default function StartPage() {
  const { disclose, navigateLogin, navigateSignup } = useStart();

  return (
    <Center bg="brand.bg" flex={1} px={10}>
      <View flex={1} justifyContent={"flex-end"}>
        <Image
          source={require("../../assets/logo.png")}
          style={styleForm.logo}
          alt="Logo"
        />
      </View>
      <View flex={1} pb={10} w={"full"} justifyContent={"flex-end"}>
        <Button
          padding={4}
          onPress={disclose.onOpen}
        >
          <Text  color={"brand.bg"} fontFamily={"Roboto-Bold"} fontSize={14}>
            COMERÇAR
          </Text>
        </Button>
      </View>
      <Actionsheet isOpen={disclose.isOpen} onClose={disclose.onClose}>
        <Actionsheet.Content bg="brand.gray">
          <Actionsheet.Item
            bg="brand.gray"
            onPress={navigateLogin}
            startIcon={
              <Icon
                as={Ionicons}
                name="enter-outline"
                size="md"
                color="brand.primary"
              />
            }
          >
            <Text fontSize={"md"} color={"white"}>Fazer Login</Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            bg="brand.gray"
            onPress={navigateSignup}
            startIcon={
              <Icon
                as={Ionicons}
                name="person"
                size="md"
                color="brand.primary"
              />
            }
          >
            <Text fontSize={"md"} color={"white"}>Criar Conta</Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}
