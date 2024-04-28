import { View, Spinner } from "native-base";

export default function LoadingPage() {
  return (
    <View
      flex={1}
      bg={"brand.bg"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner color={"brand.primary"} />
    </View>
  );
}