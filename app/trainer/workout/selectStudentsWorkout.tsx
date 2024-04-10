import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Avatar,
  Badge,
  Checkbox,
  Divider,
  FlatList,
  HStack,
  Heading,
  Icon,
  IconButton,
  PresenceTransition,
  Pressable,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useSelectStudentsWorkout from "../../../src/controllers/trainer/useSelectStudentsWorkout";
import { getInitials } from "../../../src/utils/string";
import { daysOfWeekMapping } from "../../../src/utils/schedule";
import { useState } from "react";
import { UserModel } from "../../../src/models/models";

export default function SelectStudentsWorkout() {
  const {
    addStudent,
    getStudent,
    removeStudent,
    studentsHashMap,
    isLoading,
    students,
    setScheduleId,
  } = useSelectStudentsWorkout();

  const [expandedList, setExpandedList] = useState({});

  const toggleExpandedList = (user: UserModel) => {
    setExpandedList((prev) => ({
      ...prev,
      [user.id]: !prev[user.id],
    }));
  };

  const onChangeCheckbox = (val: boolean, user: UserModel) => {
    if (val) {
      addStudent({ ...user, schedule_id: [new Date().getDay()] });
      setExpandedList((prev) => ({
        ...prev,
        [user.id]: true,
      }));
    } else {
      removeStudent(user.id);
      setExpandedList((prev) => ({
        ...prev,
        [user.id]: false,
      }));
    }
  };

  return (
    <FlatList
      data={students}
      bg={"brand.bg"}
      contentContainerStyle={{ paddingBottom: 20 }}
      px={4}
      ItemSeparatorComponent={() => <View my={2} />}
      renderItem={({ item: user }) => {
        const isChecked = Boolean(studentsHashMap[user.id]);
        const isExpanded = Boolean(expandedList[user.id]);

        return (
          <VStack
            bg="brand.bg"
            rounded={"lg"}
            borderWidth={1}
            borderColor={"brand.gray"}
            p={"4"}
          >
            <HStack alignItems={"center"} justifyContent={"space-between"}>
              <HStack space={4} alignItems={"center"}>
                <Avatar bg="brand.primary">
                  {
                    <Text color={"brand.bg"} fontSize={"lg"}>
                      {getInitials(user.name)}
                    </Text>
                  }
                </Avatar>
                <VStack space={1}>
                  <Heading
                    fontSize={"md"}
                    fontFamily={"Roboto-Medium"}
                    color={"white"}
                  >
                    {user.name}
                  </Heading>
                  <Text color={"white"} fontSize={"sm"}>
                    {user.email}
                  </Text>
                </VStack>
              </HStack>
              <HStack alignItems={"center"} space={2}>
                <Checkbox
                  value="1"
                  isChecked={isChecked}
                  onChange={(val) => onChangeCheckbox(val, user)}
                  aria-label="Alunos"
                  color={"brand.primary"}
                  borderColor={"white"}
                  _checked={{
                    bg: "brand.primary",
                    borderColor: "brand.primary",

                    _hover: {
                      bg: "brand.primary",
                      borderColor: "brand.primary",

                      _disabled: {
                        bg: "brand.primary",
                        borderColor: "brand.primary",
                      },
                    },
                  }}
                />
                {isChecked && (
                  <IconButton
                    onPress={() => toggleExpandedList(user)}
                    icon={
                      <Icon
                        as={Ionicons}
                        name={isExpanded ? "arrow-up" : "arrow-down"}
                        color={"white"}
                      />
                    }
                  />
                )}
              </HStack>
            </HStack>

            {isExpanded && <Divider bg={"brand.gray"} my={"4"} />}

            <PresenceTransition
              visible={isChecked}
              initial={{
                opacity: 0,
                translateX: -10,
              }}
              animate={{
                opacity: 1,
                translateX: 0,
                transition: {
                  duration: 600,
                },
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {isExpanded &&
                Object.entries(daysOfWeekMapping).map((item) => {
                  const [key, value] = item;
                  const student = getStudent(user.id);
                  const isActive = student?.schedule_id.includes(Number(key));
                  const isDisabled =
                    isActive && student?.schedule_id?.length === 1;

                  const handlePress = () => {
                    const schedule_id = isActive
                      ? student?.schedule_id?.filter((id) => id !== Number(key))
                      : [...student?.schedule_id, Number(key)];

                    setScheduleId(schedule_id, user.id);
                  };

                  return (
                    <Pressable
                      disabled={isDisabled}
                      key={key}
                      onPress={handlePress}
                      m={1}
                    >
                      <Badge
                        key={key}
                        borderWidth={1}
                        borderColor={
                          isDisabled ? "brand.secondary" : "brand.primary"
                        }
                        bg={
                          isDisabled
                            ? "brand.secondary"
                            : isActive
                            ? "brand.primary"
                            : "brand.bg"
                        }
                        rounded={"full"}
                        px={4}
                        _text={{
                          color: isActive ? "brand.bg" : "white",
                          fontSize: "sm",
                        }}
                      >
                        {value}
                      </Badge>
                    </Pressable>
                  );
                })}
            </PresenceTransition>
          </VStack>
        );
      }}
      ListEmptyComponent={
        <View>
          {isLoading ? (
            <Spinner color={"brand.primary"} />
          ) : (
            <Text color={"gray.600"} mt={2}>
              Nenhum aluno encontrado.
            </Text>
          )}
        </View>
      }
      ListHeaderComponent={<Header />}
    />
  );
}

const Header = () => {
  const insets = useSafeAreaInsets();

  const goBack = () => router.back();

  return (
    <HStack
      px={"4"}
      mb={"4"}
      bg="brand.bg"
      justifyContent={"space-between"}
      pt={`${insets.top + 20}px`}
    >
      <IconButton
        onPress={goBack}
        color="white"
        size={"sm"}
        _icon={{
          color: "white",
          size: "md",
          as: Ionicons,
          name: "arrow-back",
        }}
        _pressed={{ bg: "brand.grey" }}
      />
      <Heading fontFamily={"Roboto-Bold"} color={"white"}>
        Selecionar Alunos
      </Heading>
      <View w="12" />
    </HStack>
  );
};
