import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Avatar,
  Divider,
  Fab,
  FlatList,
  HStack,
  Heading,
  Icon,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import useStudents from "../../../src/controllers/trainer/useStudents";
import { getInitials } from "../../../src/utils/string";
import InputComponent from "../../../src/components/common/input/input";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserInfos from "../../../src/components/user/user-infos";

export default function StudentsList() {
  const handleGoCreateStudent = () => router.push("/trainer/student/create");
  const {
    students,
    isLoading,
    key,
    setKey,
    showStudentDetails,
    studentDetails,
    onCloseStudentDetails,
  } = useStudents();

  return (
    <>
      <FlatList
        bg={"brand.bg"}
        px={4}
        contentContainerStyle={{ paddingBottom: 20 }}
        data={students}
        ListEmptyComponent={
          <View>
            {isLoading ? (
              <Spinner color={"brand.primary"} />
            ) : (
              <Text color={"gray.600"} mt={2}>
                Nenhum aluno encontrado.
              </Text>
            )}
          </View>
        }
        ItemSeparatorComponent={() => <View my={2}/>}
        ListHeaderComponent={
          <InputComponent
            placeholder="Pesquisar Aluno"
            onChange={setKey}
            value={key}
            inputProps={{
              my: "4",
              leftElement: (
                <Icon
                  as={<Ionicons name="search" />}
                  size={4}
                  ml="2"
                  color="muted.400"
                />
              ),
            }}
          />
        }
        renderItem={({ item: user }) => {
          return (
            <TouchableOpacity onPress={() => showStudentDetails(user)}>
              <HStack
                space={4}
                p={4}
                alignItems={"center"}
                bg="brand.bg"
                rounded={"lg"}
                borderWidth={1}
                borderColor={"brand.gray"}
              >
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
            </TouchableOpacity>
          );
        }}
      />
      <Fab
        onPress={handleGoCreateStudent}
        renderInPortal={false}
        shadow={2}
        right={"10"}
        w={"12"}
        bottom={30}
        size="lg"
        icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
      />

      <UserInfos
        isOpen={studentDetails.open}
        onClose={onCloseStudentDetails}
        user={studentDetails.student}
      />
    </>
  );
}
