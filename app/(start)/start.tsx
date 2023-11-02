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
    <Center flex={1} px={10}>
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
          rounded={"full"}
          bg="primary.700"
          onPress={disclose.onOpen}
        >
          <Text fontFamily={"Inter-Bold"} color={"white"} fontSize={14}>
            COMEÇAR
          </Text>
        </Button>
      </View>
      <Actionsheet isOpen={disclose.isOpen} onClose={disclose.onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item
            onPress={navigateLogin}
            rounded={"full"}
            startIcon={
              <Icon
                as={Ionicons}
                name="enter-outline"
                size="md"
                color="primary.700"
              />
            }
          >
            Fazer Login
          </Actionsheet.Item>
          <Actionsheet.Item
          onPress={navigateSignup}
            startIcon={
              <Icon as={Ionicons} name="person" size="md" color="primary.700" />
            }
            rounded={"full"}
          >
            Criar conta
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}
