import { Ionicons } from "@expo/vector-icons";
import { Avatar, HStack, Heading, VStack, Text, IconButton } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserStore } from "../../../stores/useUserStore";
import { router } from "expo-router";
import { getInitials } from "../../../utils/string";

export default function Header() {
  const insets = useSafeAreaInsets();
  const clear = useUserStore((state) => state.clear);

  const user = useUserStore((state) => state.user);

  const logout = async () => {
    router.replace("/login");
    await clear();
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
        <Avatar bg="primary.800" size={"md"}>
          {getInitials(user.name)}
        </Avatar>
        <VStack>
          <Heading fontSize={"md"}>{user.name}</Heading>
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
