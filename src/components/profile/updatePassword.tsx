import { Actionsheet, Box, Button, Heading, Text, VStack } from "native-base";
import InputComponent from "../common/input/input";
import useUpdatePassword from "../../controllers/profile/useUpdatePassword";

interface IUpdatePasswordCompProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdatePasswordComp({
  isOpen,
  onClose,
}: IUpdatePasswordCompProps) {
  const {
    currentPassword,
    handleUdpatePassword,
    loading,
    newPassword,
    invalid,
    setInvalid,
  } = useUpdatePassword(onClose);

  return (
    <Actionsheet  isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bg={"brand.bg"}>
        <Box w="100%" h={400} px={4}>
          <Heading textAlign={"center"} color={"white"} fontFamily={"Roboto-Bold"}>Alterar senha</Heading>

          <VStack mt={2} space={3}>
            <InputComponent
              secure
              invalid={invalid.current.invalid}
              error={invalid.current.message}
              label="Senha atual"
              onChange={currentPassword.setCurrentPassword}
              value={currentPassword.currentPassword}
            />
            <InputComponent
              secure
              invalid={invalid.new.invalid}
              error={invalid.new.message}
              label="Nova Senha"
              onChange={newPassword.setNewPassword}
              value={newPassword.newPassword}
            />
            <Button
              onPress={handleUdpatePassword}
              isLoading={loading}
              mt={6}
            >
              <Text fontFamily={"Roboto-Bold"} color={"brand.bg"} fontSize={14}>
                ALTERAR SENHA
              </Text>
            </Button>
          </VStack>
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
