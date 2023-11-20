import { Ionicons } from "@expo/vector-icons";
import {
  Avatar,
  Button,
  Center,
  FlatList,
  HStack,
  Heading,
  IconButton,
  Image,
  Text,
  VStack,
  View,
} from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useWorkoutDetails from "../../../src/controllers/workout/useWorkoutDetails";

export default function WorkoutDetails() {
  const insets = useSafeAreaInsets();

  const { goBack, goWorkout } = useWorkoutDetails();

  return (
    <View bg={"brand.bg"} style={{ paddingTop: insets.top }}>
      <HStack alignItems={"center"} space={3} p={3}>
        <IconButton
          onPress={goBack}
          color="white"
          size={"sm"}
          _icon={{
            color: "white",
            size: "md",
            as: Ionicons,
            name: "arrow-back",
          }}
          _pressed={{
            bg: "brand.gray"
          }}
        />
        <Heading color="white" fontFamily={"Roboto-Bold"}>Treino de Peito</Heading>
      </HStack>
      <FlatList
        contentContainerStyle={{
          backgroundColor: "#373542",
          paddingBottom: 160,
        }}
        ListHeaderComponent={
          <View bg={"brand.bg"}>
            <Image
              source={{
                uri: "https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2023/04/05/75886402-treino-de-forca-1.jpg",
              }}
              alt="Alternate Text"
              w={"full"}
              h={"sm"}
            />
          </View>
        }
        data={[1, 2, 3, 4, 5, 6]}
        ItemSeparatorComponent={() => <View py={9} />}
        renderItem={() => (
          <HStack
            marginTop={-16}
            rounded={"full"}
            space={4}
            px={6}
            py={4}
            alignItems={"center"}
            bg="brand.bg"
          >
            <Avatar bg="brand.primary">
              <Text fontSize={"md"}>SP</Text>
            </Avatar>
            <VStack space={1}>
              <Heading fontSize={"md"} color={"white"} fontFamily={"Roboto-Bold"}>Supino Reto</Heading>
              <Text fontSize={"xs"} color="white">
                Descriçāo do Treino
              </Text>
            </VStack>
          </HStack>
        )}
      />
      <Center position="absolute" bottom={24} w="full">
        <Button
          padding={4}
          w="80"
          rounded={"full"}
          onPress={goWorkout}
        >
          <Text fontFamily={"Roboto-Bold"} color={"brand.bg"} fontSize={16}>
            INICIAR
          </Text>
        </Button>
      </Center>
    </View>
  );
}
