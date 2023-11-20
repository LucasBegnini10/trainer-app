import { Center, Image, Text, View } from "native-base";

export default function SelectProfile() {
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
      <Text fontFamily={"Roboto-Medium"} color="primary.600" fontSize={22}>
        Selecione seu perfil
      </Text>
    </View>
  );
}
