import Input from "../src/components/common/input/index";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Page() {
  const [icon, setIcon] = useState<"eye" | "eye-off">("eye");

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Input label="Label" value="123" onChange={(e: string) => null} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
});
