import { useState } from "react";
import { UserModel } from "../../models/models";
import { Avatar, Checkbox, FlatList, HStack, Heading, Icon, IconButton, Modal, Row, Text, VStack, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { getInitials } from "../../utils/string";

interface SelectUserListProps {
  students: UserModel[];
  studentsSelected: UserModel[];
  set: (student: UserModel) => void;
  remove: (student: UserModel) => void;
}

export const SelectUserList = (props: SelectUserListProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <VStack>
      <Row alignItems={"center"} justifyContent={"space-between"}>
        <Text color={"white"}>
          Alunos selecionados ({props.studentsSelected.length})
        </Text>
        <IconButton
          onPress={() => setShowModal(true)}
          _pressed={{ bg: "brand.gray" }}
          icon={
            <Icon as={Ionicons} name={"open-outline"} color={"brand.primary"} />
          }
        />
      </Row>
      <ModalSelectUser
        showModal={showModal}
        setShowModal={setShowModal}
        {...props}
      />
    </VStack>
  );
};

interface ModalSelectUserProps extends SelectUserListProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const ModalSelectUser = ({
  setShowModal,
  showModal,
  remove,
  set,
  students,
  studentsSelected,
}: ModalSelectUserProps) => {
  const isChecked = (user: UserModel) =>
    Boolean(studentsSelected.find(({ id }) => id === user.id));

  return (
    <Modal
      size={"xl"}
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      bg={"#000000a3"}
    >
      <Modal.Content>
        <Modal.CloseButton
          _icon={{ color: "white" }}
          _pressed={{ bg: "brand.gray" }}
        />
        <Modal.Header bg={"brand.bg"}>
          <Heading size={"md"} color={"white"}>
            Selecionar Alunos
          </Heading>
        </Modal.Header>
        <Modal.Body bg={"brand.bg"}>
          <FlatList
            bg={"brand.bg"}
            contentContainerStyle={{ paddingBottom: 20 }}
            data={students}
            ListEmptyComponent={
              <View>
                <Text color={"gray.600"} mt={2}>
                  Nenhum aluno encontrado.
                </Text>
              </View>
            }
            ItemSeparatorComponent={() => <View my={2} />}
            renderItem={({ item: user }) => {
              return (
                <HStack
                  p={4}
                  alignItems={"center"}
                  bg="brand.bg"
                  rounded={"lg"}
                  borderWidth={1}
                  borderColor={"brand.gray"}
                  justifyContent={"space-between"}
                >
                  <HStack alignItems={"center"} space={4}>
                    <Avatar bg="brand.primary">
                      {
                        <Text color={"brand.bg"} fontSize={"lg"}>
                          {getInitials(user.name)}
                        </Text>
                      }
                    </Avatar>
                    <VStack space={1}>
                      <Heading
                        fontSize={"md"}
                        fontFamily={"Roboto-Medium"}
                        color={"white"}
                      >
                        {user.name}
                      </Heading>
                      <Text color={"white"} fontSize={"sm"}>
                        {user.email}
                      </Text>
                    </VStack>
                  </HStack>
                  <Checkbox
                    aria-label="Checkbox"
                    value="1"
                    onChange={(val) => (val ? set(user) : remove(user))}
                    isChecked={isChecked(user)}
                    _checked={{
                      bg: "brand.primary",
                      borderColor: "brand.primary",
                    }}
                    _pressed={{
                      bg: "brand.primary",
                      borderColor: "brand.primary",
                    }}
                    _focus={{
                      bg: "brand.primary",
                      borderColor: "brand.primary",
                    }}
                    _unchecked={{
                      bg: "brand.bg",
                      borderColor: "brand.primary",
                    }}
                    _hover={{
                      bg: "brand.primary",
                      borderColor: "brand.primary",
                    }}
                    _disabled={{
                      bg: "brand.primary",
                      borderColor: "brand.primary",
                    }}
                  />
                </HStack>
              );
            }}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
