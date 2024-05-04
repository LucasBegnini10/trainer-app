import { FlatList, Icon, Text, VStack, View } from "native-base";
import Card from "../../../src/components/card/card";
import { Ionicons } from "@expo/vector-icons";
import useWorkoutList from "../../../src/controllers/student/useWorkoutList";
import InputComponent from "../../../src/components/common/input/input";
import { WorkoutModel } from "../../../src/models/models";
import FilterDayWeek from "../../../src/components/filter-day-week/FilterDayWeek";
import CardSkeleton from "../../../src/components/card/card-skeleton";
import { formatWorkoutToCard } from "../../../src/utils/workout";
import { RefreshControl } from "react-native";

export default function HomeIndex() {
  const {
    navigationWorkout,
    workouts,
    filterDay,
    loading,
    filterKey,
    refresh,
  } = useWorkoutList();

  return (
    <VStack bg={"brand.bg"} flex={1}>
      <VStack>
        <FilterDayWeek key={"filter-day"} filterDay={filterDay} />

        <InputComponent
          value={filterKey.key}
          onChange={filterKey.changeKey}
          key={"search"}
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
      <FlatList
        refreshControl={
          <RefreshControl
            colors={["#ffb81a"]}
            tintColor={"#ffb81a"}
            refreshing={refresh.refreshing}
            onRefresh={refresh.onRefresh}
          />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        data={workouts}
        ItemSeparatorComponent={() => <View py={2} />}
        keyExtractor={(item, index) =>
          String(item.id || index).concat("#WORKOUT")
        }
        ListEmptyComponent={
          loading ? (
            <CardSkeleton />
          ) : (
            <Text color={"brand.gray"} ml={8}>
              Nenhum treino disponível.
            </Text>
          )
        }
        renderItem={({ item: workout }: { item: WorkoutModel }) => {
          if (loading) return <CardSkeleton />;

          return (
            <Card
              key={workout.id}
              {...formatWorkoutToCard(workout)}
              onClick={() => navigationWorkout(workout)}
            />
          );
        }}
      />
    </VStack>
  );
}
