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
  VStack,
} from "native-base";

export default function StudentsList() {
  
  const handleGoCreateStudent = () => router.push("/trainer/createStudent")

  return (
    <>
      <FlatList
        px={4}
        contentContainerStyle={{ paddingBottom: 20 }}
        data={[..."OI TUDO BEM"]}
        ItemSeparatorComponent={Divider}
        bg="white"
        ListHeaderComponent={
          <Input
            placeholder="Pesquisar Anuo"
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
        renderItem={() => {
          return (
            <HStack space={4} px={6} py={4} alignItems={"center"} bg="white">
              <Avatar bg="primary.800">LB</Avatar>
              <VStack space={1}>
                <Heading fontSize={"md"}>Lucas Begnini</Heading>
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
        bottom={30}
        size="lg"
        icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
      />
    </>
  );
}
