import { FlatList, Icon, VStack, View } from "native-base";
import Card from "../../../src/components/card/card";
import { Ionicons } from "@expo/vector-icons";
import useWorkoutList from "../../../src/controllers/student/useWorkoutList";
import InputComponent from "../../../src/components/common/input/input";
import { WorkoutModel } from "../../../src/models/models";
import FilterDayWeek from "../../../src/components/filter-day-week/FilterDayWeek";
import CardSkeleton from "../../../src/components/card/card-skeleton";
import { formatWorkoutToCard } from "../../../src/utils/workout";

export default function HomeIndex() {
  const { navigationWorkout, workouts, changeDay, loading } = useWorkoutList();

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 20 }}
      bg={"brand.bg"}
      data={workouts}
      ItemSeparatorComponent={() => <View py={2} />}
      keyExtractor={(item, index) => String(item.id || index)}
      renderItem={({ item: workout }) => {
        if (loading) {
          return <CardSkeleton />;
        }

        const params = formatWorkoutToCard(workout as WorkoutModel);
        return (
          <Card
            key={workout.id}
            {...params}
            onClick={() => navigationWorkout(workout as WorkoutModel)}
          />
        );
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
