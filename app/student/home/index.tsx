import { FlatList, Icon,  VStack, View } from "native-base";
import Card from "../../../src/components/card/card";
import { Ionicons } from "@expo/vector-icons";
import useHome from "../../../src/controllers/home/student/useHome";
import InputComponent from "../../../src/components/common/input/input";
import { WorkoutModel } from "../../../src/models/models";
import FilterDayWeek from "../../../src/components/filter-day-week/FilterDayWeek";
import CardSkeleton from "../../../src/components/card/card-skeleton";

export default function HomeIndex() {
  const {
    navigationWorkout,
    workouts,
    formatWorkoutToCard,
    changeDay,
    loading,
  } = useHome();

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 20 }}
      bg={"brand.bg"}
      data={loading ? Array.from({ length: 5 }) : workouts}
      ItemSeparatorComponent={() => <View py={2} />}
      keyExtractor={(item, index) => `WORKOUTS_${index}`}
      renderItem={({ item: workout }) => {
        if (loading) {
          return <CardSkeleton />;
        }

        const params = formatWorkoutToCard(workout as WorkoutModel);
        return <Card {...params} onClick={() => navigationWorkout()} />;
      }}
      ListHeaderComponent={
        <VStack>
          <FilterDayWeek onChange={changeDay} />

          <InputComponent
            placeholder="Pesquisar Treino"
            inputProps={{
              mx: 6,
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
        </VStack>
      }
    />
  );
}
