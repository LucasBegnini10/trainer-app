import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { HStack, Heading, IconButton, View } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HeaderDefault({title}){
  const insets = useSafeAreaInsets();

  const goBack = () => router.back();

  return (
    <HStack
      px={"4"}
      bg="brand.bg"
      justifyContent={"space-between"}
      pt={`${insets.top + 20}px`}
    >
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
        _pressed={{ bg: "brand.grey" }}
      />
      <Heading fontFamily={"Roboto-Bold"} color={"white"}>
        {title}
      </Heading>
      <View w="12" />
    </HStack>
  );
};
