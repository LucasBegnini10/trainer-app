import { Ionicons } from "@expo/vector-icons";
import { Avatar, HStack, Heading, VStack, Text, IconButton } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserStore } from "../../../stores/useUserStore";
import { router } from "expo-router";

export default function Header() {
  const insets = useSafeAreaInsets();
  const clear = useUserStore((state) => state.clear);

  const logout = async () => {
    await clear();
    router.replace("/login");
  };

  return (
    <HStack
      bg="white"
      justifyContent={"space-between"}
      px={8}
      pb={4}
      pt={`${insets.top + 20}px`}
    >
      <HStack alignItems={"center"} space={4}>
        <Avatar
          bg="green.500"
          size={"md"}
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        />
        <VStack>
          <Heading fontSize={"md"}>Lucas Begnini</Heading>
          <Text fontSize={"xs"} color="gray.400">
            Aluno
          </Text>
        </VStack>
      </HStack>
      <IconButton
        onPress={logout}
        colorScheme="red"
        _icon={{
          as: Ionicons,
          name: "log-out-outline",
        }}
      />
    </HStack>
  );
}
