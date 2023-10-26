import { Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  Divider,
  FlatList,
  HStack,
  Heading,
  Icon,
  Input,
  Text,
  VStack,
  View,
} from "native-base";

export default function HomeTrainer() {
  return (
    <FlatList
      data={[..."OI TUDO BEM"]}
      ItemSeparatorComponent={Divider}
      bg="white"
      ListHeaderComponent={
        <Input
          placeholder="Pesquisar Treino"
          w="100%"
          my={6}
          py={6}
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
            <Avatar bg="primary.800">SR</Avatar>
            <VStack space={1}>
              <Heading fontSize={"md"}>SUPINO RETO</Heading>
            </VStack>
          </HStack>
        );
      }}
    />
  );
}
