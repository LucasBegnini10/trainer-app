import { Ionicons } from "@expo/vector-icons";
import {
  Badge,
  Icon,
  IconButton,
  PresenceTransition,
  Pressable,
  Row,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";

interface ScheduleDescriptionProps {
  options: [string, string][];
  toggle: (day: string) => void;
  state: number[];
}

export const ScheduleDescription = ({
  options,
  toggle,
  state,
}: ScheduleDescriptionProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <VStack>
      <Row alignItems={"center"} justifyContent={"space-between"}>
        <Text color={"white"}>Dia(s) da semana ({state?.length || 0})</Text>
        <IconButton
          onPress={() => setExpanded((prev) => !prev)}
          _pressed={{ bg: "brand.gray" }}
          icon={
            <Icon
              as={Ionicons}
              name={expanded ? "arrow-up" : "arrow-down"}
              color={"brand.primary"}
            />
          }
        />
      </Row>

      <PresenceTransition
        visible={expanded}
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
        style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
      >
        {expanded &&
          options.map((item) => {
            const [key, value] = item;
            const isActive = Boolean(state?.includes(parseInt(key)));

            return (
              <Pressable key={key} onPress={() => toggle(key)} m={1}>
                <Badge
                  key={key}
                  borderWidth={1}
                  borderColor={"brand.primary"}
                  bg={isActive ? "brand.primary" : "brand.bg"}
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
};
