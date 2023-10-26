import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  Divider,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
  View,
} from "native-base";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const routes = [
  { name: "index", href: "home", icon: "barbell", title: "Exercícios" },
  {
    name: "students",
    href: "home/students",
    icon: "ios-people-sharp",
    title: "Alunos",
  },
];

export default function LayoutHomeTrainer() {
  const insets = useSafeAreaInsets();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => {
          return (
            <View flex={1}>
              <DrawerContentScrollView {...props}>
                <VStack px={4}>
                  <Image
                    alt="Image user"
                    source={{
                      uri: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
                    }}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 40,
                      marginBottom: 10,
                    }}
                  />
                  <Heading>John Doe</Heading>
                  <HStack>
                    <Text>Treinador</Text>
                  </HStack>
                </VStack>
                <Divider my={4} />
                <View>
                  <DrawerItemList {...props} />
                </View>
              </DrawerContentScrollView>
              <Divider my={4} />
              <View px={4} style={{ paddingBottom: insets.bottom + 20 }}>
                <TouchableOpacity onPress={() => {}}>
                  <HStack space={4} alignItems={"center"}>
                    <Icon
                      as={Ionicons}
                      name="log-out-outline"
                      color="red.600"
                      size={22}
                    />
                    <Text color="red.600">Sair</Text>
                  </HStack>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      >
        {routes.map((route) => {
          return (
            <Drawer.Screen
              key={route.name}
              name={route.name}
              options={{
                drawerType: "front",
                drawerIcon(props) {
                  return (
                    <Icon
                      as={Ionicons}
                      name={route.icon}
                      size={26}
                      color={props.color}
                    />
                  );
                },
                drawerLabel: route.title,
                title: route.title,
              }}
            />
          );
        })}
      </Drawer>
    </GestureHandlerRootView>
  );
}
