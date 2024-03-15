import { FlatList, Icon,  View } from "native-base";
import Card from "../../../src/components/card/card";
import { Ionicons } from "@expo/vector-icons";
import useHome from "../../../src/controllers/home/student/useHome";
import InputComponent from "../../../src/components/common/input/input";
import workouts from "../../../src/data/workouts.json";
import {format} from "date-fns"


export default function HomeIndex() {
  const { navigationWorkout } = useHome();

  return (
    <FlatList
      px={6}
      contentContainerStyle={{ paddingBottom: 20 }}
      bg={"brand.bg"}
      data={workouts}
      ItemSeparatorComponent={() => <View py={2} />}
      renderItem={({ item }) => {
        const params = {
          title: item.name,
          description: item.description,
          img: item.logo_url,
          subtitle: item.schedule_description,
          time: `Publicado em ${format(item.created_at, "dd/MM/yyyy")}`,
        };
        return <Card {...params} onClick={() => navigationWorkout()} />;
      }}
      ListHeaderComponent={
        <InputComponent
          placeholder="Pesquisar Treino"
          inputProps={{
            mb: 6,
            InputLeftElement: (
              <Icon
                as={<Ionicons name="search" />}
                size={4}
                ml="2"
                color="muted.400"
              />
            ),
          }}
        />
      }
    />
  );
}
