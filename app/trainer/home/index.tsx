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
import InputComponent from "../../../src/components/common/input/input";

export default function HomeTrainer() {

  const {goToCreateExercice} = useHomeTrainer() 

  return (
    <>
      <FlatList
        bg="brand.bg"
        contentContainerStyle={{ paddingBottom: 20 }}
        px={4}
        data={[..."OI TUDO BEM"]}
        ItemSeparatorComponent={Divider}
        // ListHeaderComponent={
        //   <InputComponent
        //     placeholder="Pesquisar Exercícios"
        //     py={6}
        //     InputLeftElement={
        //       <Icon
        //         as={<Ionicons name="search" />}
        //         size={4}
        //         ml="2"
        //         color="muted.400"
        //       />
        //     }
        //   />
        // }
        renderItem={() => {
          return (
            <HStack space={4} px={6} py={4} alignItems={"center"}>
              <Avatar bg="brand.primary">
                <Text color={"brand.bg"}>SR</Text>
              </Avatar>
              <VStack space={1}>
                <Text fontSize={"md"} fontFamily={"Roboto-Medium"} color={"white"}>SUPINO RETO</Text>
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
        w={"12%"}
        icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
      />
    </>
  );
}
