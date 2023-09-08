import Input from "../src/components/common/input/index";
import Button from "../src/components/common/button/index";
import { View } from "react-native";

export default function Page() {
  return (
    <View style={{ paddingHorizontal: 10, gap: 50 }}>
      <Input label="Label" value="123" onChange={(e: string) => null} />
      <Button label="Teste" onClick={() => null} />
    </View>
  );
}
