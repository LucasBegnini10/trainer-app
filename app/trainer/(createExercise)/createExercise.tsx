import { Text, View } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CreateExercisePage(){

  const insets = useSafeAreaInsets()

  return <View style={{paddingTop: insets.top}}>
    <Text>OPA</Text>
  </View>
}