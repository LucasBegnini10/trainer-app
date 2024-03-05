import { Avatar, Button, ScrollView, Text, VStack, View } from "native-base";
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
    <ScrollView
      style={{ paddingTop: insets.top }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
      w={"full"}
      flex={1}
      bg="brand.bg"
      px={4}
    >
      <Avatar bg="brand.primary" size={"xl"}>
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

      <Button isLoading={loading} onPress={handleUpdateUser} mt={6}>
        <Text fontFamily={"Roboto-Bold"} color={"brand.bg"} fontSize={14}>
          SALVAR
        </Text>
      </Button>

      <Button
        mt={6}
        borderColor={"brand.primary"}
        borderWidth={1}
        bg="brand.bg"
        onPress={updatePassword.onShow}
      >
        <Text fontFamily={"Roboto-Bold"} color={"brand.primary"} fontSize={14}>
          ALTERAR SENHA
        </Text>
      </Button>

      <Button
        mt={20}
        mb={10}
        variant={"outline"}
        borderColor={"red.700"}
        bg="brand.bg"
        onPress={logout}
      >
        <Text fontFamily={"Roboto-Bold"} color={"red.700"} fontSize={14}>
          SAIR
        </Text>
      </Button>

      <UpdatePasswordComp
        isOpen={updatePassword.showUpdatePassword}
        onClose={updatePassword.onClose}
      />
    </ScrollView>
  );
}
