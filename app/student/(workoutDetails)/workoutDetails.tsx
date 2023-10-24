import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
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
import useWorkoutDetails from "../../../src/hooks/workout/useWorkoutDetails";

export default function WorkoutDetails() {
  const insets = useSafeAreaInsets();

  const { goBack, goWorkout } = useWorkoutDetails();

  return (
    <View style={{ paddingTop: insets.top }}>
      <HStack alignItems={"center"} space={3} p={3}>
        <IconButton
          onPress={goBack}
          color="black"
          size={"sm"}
          _icon={{
            color: "black",
            size: "md",
            as: Ionicons,
            name: "arrow-back",
          }}
        />
        <Heading>Treino de Peito</Heading>
      </HStack>
      <FlatList
        contentContainerStyle={{
          backgroundColor: "#f1f1f1",
          paddingBottom: 160,
        }}
        ListHeaderComponent={
          <View>
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
            bg="white"
          >
            <Avatar bg="primary.800">SP</Avatar>
            <VStack space={1}>
              <Heading fontSize={"md"}>Supino Reto</Heading>
              <Text fontSize={"xs"} color="grey">
                Descriçāo do Treino
              </Text>
            </VStack>
          </HStack>
        )}
      />
      <Center position="absolute" bottom={24} w="full">
        <Button
          padding={4}
          rounded={"full"}
          w="80"
          bg="primary.700"
          onPress={goWorkout}
        >
          <Text fontFamily={"Inter-Bold"} color={"white"} fontSize={14}>
            INICIAR
          </Text>
        </Button>
      </Center>
    </View>
  );
}
