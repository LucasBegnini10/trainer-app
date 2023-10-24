import { FlatList, Icon, Input, View } from "native-base";
import Card from "../../../src/components/card/card";
import { Ionicons } from "@expo/vector-icons";
import useHome from "../../../src/hooks/home/useHome";

export default function HomeIndex() {

  const {navigationWorkout} = useHome()

  return (
    <FlatList
      px={6}
      contentContainerStyle={{paddingBottom: 20}}
      bg={"white"}
      data={[1, 2, 3]}
      ItemSeparatorComponent={() => <View py={2} />}
      renderItem={({}) => <Card onClick={() => navigationWorkout()}/>}
      ListHeaderComponent={
        <Input
          placeholder="Pesquisar Treino"
          w="100%"
          my={4}
          InputLeftElement={
            <Icon
              as={<Ionicons name="search" />}
              size={4}
              ml="2"
              color="muted.400"
            />
          }
        />
      }
    />
  );
}
