import { Avatar, Button, Text, VStack, View } from "native-base";
import InputComponent from "../../../src/components/common/input/input";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useProfile from "../../../src/controllers/profile/useProfile";
import UpdatePasswordComp from "../../../src/components/profile/updatePassword";
import { getInitials } from "../../../src/utils/string";

export default function ProfilePage() {
  const insets = useSafeAreaInsets();
  const {
    userData,
    logout,
    handleUpdateUser,
    invalid,
    setDocument,
    setEmail,
    setName,
    loading,
    updatePassword,
  } = useProfile();

  return (
    <View
      style={{ paddingTop: insets.top }}
      w={"full"}
      flex={1}
      alignItems={"center"}
      justifyContent={"center"}
      bg="white"
      px={4}
    >
      <Avatar
        bg="green.500"
        size={"xl"}
      >
        {getInitials(userData.name)}
      </Avatar>

      <VStack w={"full"} space={3}>
        <InputComponent
          label="Nome"
          value={userData.name}
          onChange={setName}
          invalid={invalid.name}
        />
        <InputComponent
          label="E-mail"
          value={userData.email}
          onChange={setEmail}
          invalid={invalid.email}
        />
        <InputComponent
          label="Documento"
          value={userData.document}
          onChange={setDocument}
          invalid={invalid.document}
        />
      </VStack>

      <Button
        isLoading={loading}
        onPress={handleUpdateUser}
        bg={"primary.800"}
        mt={6}
        padding={4}
        rounded={"full"}
        w="full"
      >
        <Text fontFamily={"Inter-Bold"} color={"white"} fontSize={14}>
          SALVAR
        </Text>
      </Button>

      <Button
        mt={6}
        padding={4}
        variant={"outline"}
        borderColor={"primary.800"}
        rounded={"full"}
        w="full"
        onPress={updatePassword.onShow}
      >
        <Text fontFamily={"Inter-Bold"} color={"primary.800"} fontSize={14}>
          ALTERAR SENHA
        </Text>
      </Button>

      <Button
        mt={20}
        variant={"outline"}
        borderColor={"red.700"}
        padding={4}
        rounded={"full"}
        w="full"
        onPress={logout}
      >
        <Text fontFamily={"Inter-Bold"} color={"red.700"} fontSize={14}>
          SAIR
        </Text>
      </Button>

      <UpdatePasswordComp
        isOpen={updatePassword.showUpdatePassword}
        onClose={updatePassword.onClose}
      />
    </View>
  );
}
