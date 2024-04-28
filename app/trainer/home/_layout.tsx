import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  Avatar,
  Divider,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
  View,
} from "native-base";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import { Alert, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserStore } from "../../../src/stores/useUserStore";
import { getInitials } from "../../../src/utils/string";
import { router } from "expo-router";
import { clear } from "../../../src/utils/storage";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const routes = [
  {
    name: "index",
    href: "index",
    icon: "rocket",
    title: "Treinos",
  },

  {
    name: "exercises",
    href: "home/exercises",
    icon: "barbell",
    title: "Exercícios",
  },
  {
    name: "students",
    href: "home/students",
    icon: "ios-people-sharp",
    title: "Alunos",
  },
  {
    name: "profile",
    href: "home/profile",
    icon: "person-circle-outline",
    title: "Perfil",
  },
];

export default function LayoutHomeTrainer() {
  const insets = useSafeAreaInsets();

  const user = useUserStore((state) => state.user);

  const logout = () => {
    Alert.alert("Atenção", "Tem certeza que deseja sair?", [
      { isPreferred: true, text: "Cancelar", style: "cancel" },
      {
        onPress: async () => {
          router.replace("/login");
          await clear();
        },
        isPreferred: true,
        text: "Sair",
        style: "destructive",
      },
    ]);
  };

  const navigation = useNavigation();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => {
          return (
            <View flex={1} bg="brand.gray">
              <DrawerContentScrollView {...props}>
                <VStack px={4}>
                  <Avatar
                    style={{
                      height: 60,
                      width: 60,
                      marginBottom: 10,
                    }}
                    bg="brand.primary"
                  >
                    {getInitials(user.name)}
                  </Avatar>
                  <Heading color={"white"} fontFamily={"Roboto-Bold"}>
                    {user.name}
                  </Heading>
                  <HStack>
                    <Text color={"white"}>Treinador</Text>
                  </HStack>
                </VStack>
                <Divider my={4} />
                <View>
                  <DrawerItemList {...props} />
                </View>
              </DrawerContentScrollView>
              <Divider my={4} />
              <View px={4} style={{ paddingBottom: insets.bottom + 20 }}>
                <TouchableOpacity onPress={logout}>
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
                headerLeft: () => (
                  <IconButton
                    icon={
                      <Icon
                        color="brand.primary"
                        as={Ionicons}
                        name={"menu-outline"}
                        size={6}
                      />
                    }
                    _pressed={{
                      bg: "brand.gray",
                    }}
                    onPress={() =>
                      navigation.dispatch(DrawerActions.toggleDrawer())
                    }
                    m={2}
                  />
                ),
                headerStyle: {
                  backgroundColor: "#12111f",
                },
                headerTitleStyle: {
                  color: "white",
                },
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
                drawerActiveTintColor: "#ffb81a",
                drawerInactiveTintColor: "white",
                title: route.title,
              }}
            />
          );
        })}
      </Drawer>
    </GestureHandlerRootView>
  );
}
