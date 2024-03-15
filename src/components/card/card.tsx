import {
  Box,
  AspectRatio,
  Image,
  Center,
  Stack,
  Heading,
  Text,
  HStack,
  Button,
} from "native-base";

interface CardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  img?: string;
  onClick?: () => void;
  time?: string;
}

export default function Card(props: CardProps) {
  return (
    <Button bg="brand.gray" padding={0} onPress={props.onClick}>
      <Box alignItems="center">
        <Box
          rounded="lg"
          overflow="hidden"
          borderColor="brand.gray"
          borderWidth="1"
          backgroundColor={"brand.bg"}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: props.img
                }}
                alt="Imagem do Treino"
              />
            </AspectRatio>
            {/* <Center
              bg="violet.500"
              _dark={{
                bg: "violet.400",
              }}
              _text={{
                color: "warmGray.50",
                fontWeight: "700",
                fontSize: "xs",
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5"
            >
              PHOTOS
            </Center> */}
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" color={"white"} fontWeight={"bold"} ml="-1">
                {props.title}
              </Heading>
              <Text
                fontSize="xs"
                color={"brand.primary"}
                fontWeight="600"
                ml="-0.5"
                mt="-1"
              >
                {props.subtitle}
              </Text>
            </Stack>
            <Text fontWeight="400" color={"white"}>{props.description}</Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            >
              <HStack alignItems="center">
                <Text
                  color="coolGray.300"
                  fontWeight="400"
                  fontSize={"xs"}
                >
                  {props.time}
                </Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Box>
    </Button>
  );
}
