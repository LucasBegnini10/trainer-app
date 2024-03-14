import { Actionsheet, Avatar, Box, Heading, Text, VStack } from "native-base";
import { UserModel } from "../../models/models";
import InputComponent from "../common/input/input";
import { getInitials } from "../../utils/string";
import { applyMask } from "../../utils/mask";

interface UserInfosProp {
  user: UserModel;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserInfos({ user, isOpen, onClose }: UserInfosProp) {
  const document = user?.document
    ? user.document.length === 11
      ? applyMask.cpf(user.document)
      : applyMask.cnpj(user.document)
    : "";

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bg={"brand.bg"}>
        <Box w="100%" h={430} px={4}>
          <Heading
            textAlign={"center"}
            color={"white"}
            fontFamily={"Roboto-Bold"}
          >
            Dados do Aluno
          </Heading>

          {user && (
            <VStack mt={8} space={3} alignItems={"center"}>
              <Avatar bg="brand.primary" size={"lg"}>
                {
                  <Text color={"brand.bg"} fontSize={"xl"}>
                    {getInitials(user.name)}
                  </Text>
                }
              </Avatar>
              <InputComponent label="Nome" readonly value={user.name} />
              <InputComponent label="E-mail" value={user.email} readonly />
              <InputComponent
                label="Documento"
                value={document}
                readonly
              />
            </VStack>
          )}
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
