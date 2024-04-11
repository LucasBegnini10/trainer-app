import { ScrollView } from "native-base";
import HeaderDefault from "../../../../src/components/common/header/headerDefault";

export default function WorkoutDetails() {
  return (
    <ScrollView bg={"brand.bg"} flex={1}>
      <HeaderDefault title={"Detalhes do Treino"} />
    </ScrollView>
  );
}
