import { Avatar, HStack, Heading, Text, VStack } from "native-base";
import { getInitials } from "../../utils/string";

interface ExerciceProp {
  name: string;
  description?: string;
}

export default function ExerciseItem(props: ExerciceProp) {
  return (
    <HStack
      rounded={"full"}
      space={4}
      px={6}
      py={4}
      alignItems={"center"}
      bg="brand.gray"
    >
      <Avatar bg="brand.primary">
        <Text color={"brand.bg"}>{getInitials(props.name)}</Text>
      </Avatar>
      <VStack space={1}>
        <Heading fontSize={"md"} color={"white"} fontFamily={"Roboto-Bold"}>{props.name}</Heading>
        {props.description ? (
          <Text fontSize={"xs"} color="grey">
            {props.description}
          </Text>
        ) : null}
      </VStack>
    </HStack>
  );
}
