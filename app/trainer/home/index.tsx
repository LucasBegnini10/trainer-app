import { Ionicons } from "@expo/vector-icons";
import {
  Center,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Input,
  Spinner,
  Text,
  View,
} from "native-base";
import useWorkouts, {
  UseWorkoutsType,
} from "../../../src/controllers/trainer/useWorkouts";
import Card from "../../../src/components/card/card";
import { formatWorkoutToCard } from "../../../src/utils/workout";
import { WorkoutModel } from "../../../src/models/models";

export default function Workouts() {
  const { goToCreateWorkout, workouts, isLoading }: UseWorkoutsType =
    useWorkouts();

  return (
    <FlatList
      key={"WORKOUTS"}
      contentContainerStyle={{ paddingBottom: 20 }}
      bg={"brand.bg"}
      data={workouts}
      ItemSeparatorComponent={() => <View py={2} />}
      keyExtractor={(item, index) => String(item?.id || index)}
      ListEmptyComponent={
        <View px={6}>
          {isLoading ? (
            <Center>
              <Spinner color={"brand.primary"}/>
            </Center>
          ) : (
            <Text color={"gray.600"} mt={2}>
              Nenhum treino encontrado.
            </Text>
          )}
        </View>
      }
      renderItem={({ item: workout }) => {
        const params = formatWorkoutToCard(workout as WorkoutModel);
        return <Card key={workout.id} {...params} />;
      }}
      ListHeaderComponent={
        <HStack alignItems={"flex-end"} px={6} space={2} my={4} maxH={10}>
          <View flex={0.8}>
            <Input
              fontSize={14}
              py={3}
              h={"full"}
              bg="brand.gray"
              borderColor={"brand.gray"}
              color={"white"}
              placeholder={"Pesquisar treino"}
              rounded={"lg"}
              _focus={{
                borderColor: "brand.primary",
                bg: "brand.gray",
              }}
              InputLeftElement={
                <Icon
                  as={<Ionicons name="search" />}
                  size={4}
                  ml="2"
                  color="muted.400"
                />
              }
            />
          </View>

          <View flex={0.2}>
            <IconButton
              onPress={goToCreateWorkout}
              rounded={"lg"}
              icon={
                <Icon as={Ionicons} name="add" size={22} color={"brand.bg"} />
              }
              bg={"brand.primary"}
              height={"full"}
              _pressed={{ bg: "brand.secondary" }}
            />
          </View>
        </HStack>
      }
    />
  );
}
