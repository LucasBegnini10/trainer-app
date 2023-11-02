import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Avatar,
  Divider,
  Fab,
  FlatList,
  HStack,
  Heading,
  Icon,
  Input,
  Text,
  VStack,
} from "native-base";
import useHomeTrainer from "../../../src/controllers/home/trainer/useHome";

export default function HomeTrainer() {

  const {goToCreateExercice} = useHomeTrainer() 

  return (
    <>
      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        px={4}
        data={[..."OI TUDO BEM"]}
        ItemSeparatorComponent={Divider}
        bg="white"
        ListHeaderComponent={
          <Input
            placeholder="Pesquisar Exercícios"
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
      <Fab
        renderInPortal={false}
        onPress={goToCreateExercice}
        shadow={2}
        right={"10"}
        bottom={30}
        size="lg"
        icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
      />
    </>
  );
}
