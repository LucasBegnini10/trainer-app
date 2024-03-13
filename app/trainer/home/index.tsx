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
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import useHomeTrainer from "../../../src/controllers/home/trainer/useHome";
import { getInitials, limitString } from "../../../src/utils/string";

export default function HomeTrainer() {

  const {goToCreateExercice, exercises, isLoading} = useHomeTrainer() 

  return (
    <>
      <FlatList
        bg="brand.bg"
        contentContainerStyle={{ paddingBottom: 20 }}
        px={4}
        data={exercises}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={
          <View>
            {isLoading ? (
              <Spinner color={"brand.primary"} />
            ) : (
              <Text color={"gray.600"} mt={2}>
                Nenhum exercício encontrado.
              </Text>
            )}
          </View>
        }
        renderItem={({item}) => {
          return (
            <HStack space={4} px={6} py={4} alignItems={"center"}>
              <Avatar bg="brand.primary">
                <Text color={"brand.bg"}>{getInitials(item.name)}</Text>
              </Avatar>
              <VStack space={1}>
                <Heading fontSize={"md"} fontFamily={"Roboto-Medium"} color={"white"}>{item.name}</Heading>
                <Text fontSize={"sm"} color={"white"}>{limitString(item.description, 40)}</Text>
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
        width={"12"}
        icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
      />
    </>
  );
}
