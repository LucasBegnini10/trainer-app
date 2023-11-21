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
  Input,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import useStudents from "../../../src/controllers/trainer/useStudents";
import { getInitials } from "../../../src/utils/string";

export default function StudentsList() {
  const handleGoCreateStudent = () => router.push("/trainer/createStudent");
  const { students, isLoading } = useStudents();

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
              <Spinner />
            ) : (
              <Text color={"gray.600"} mt={2}>
                Nenhum aluno encontrado.
              </Text>
            )}
          </View>
        }
        ItemSeparatorComponent={Divider}
        ListHeaderComponent={
          <Input
            placeholder="Pesquisar Aluno"
            w="100%"
            my={6}
            py={3}
            InputLeftElement={
              <Icon
                as={<Ionicons name="search" />}
                size={4}
                ml="2"
                color="muted.400"
              />
            }
          />
        }
        renderItem={({item}) => {
          return (
            <HStack space={4} px={6} py={4} alignItems={"center"} bg="white">
              <Avatar bg="primary.800">{getInitials(item.name)}</Avatar>
              <VStack space={1}>
                <Heading fontSize={"md"}>{item.name}</Heading>
              </VStack>
            </HStack>
          );
        }}
      />
      <Fab
        onPress={handleGoCreateStudent}
        renderInPortal={false}
        shadow={2}
        right={"10"}
        w={"12%"}
        bottom={30}
        size="lg"
        icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
      />
    </>
  );
}
