import { AntDesign } from "@expo/vector-icons";
import { Fab, FlatList, Icon, Text, View } from "native-base";

export default function Workouts() {
  return (
    <>
      <FlatList
        bg="brand.bg"
        contentContainerStyle={{ paddingBottom: 20 }}
        px={4}
        data={[]}
        ListEmptyComponent={
          <View>
            <Text color={"gray.600"} mt={2}>
              Nenhum treino encontrado.
            </Text>
          </View>
        }
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />

      <Fab
        renderInPortal={false}
        onPress={() => null}
        shadow={2}
        right={"10"}
        bottom={30}
        size="lg"
        width={"12"}
        icon={<Icon color="white" as={AntDesign} name="plus" size="md" />}
      />
    </>
  );
}
