import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import {  Icon, } from "native-base";
import Header from "../../src/components/common/header/header";

const routes = [
  { name: "index", href: "home",  icon: "home" },
  { name: "profile", href: "home/profile",  icon: "person" },
];

export default function LayoutHome() {
  return (
    <Tabs>
      {routes.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            href: item.href,
            tabBarShowLabel: false,
            header() {
              return <Header /> 
            },
            tabBarIcon: ({ focused }) => {
              return (
                <Icon
                  as={Ionicons}
                  name={item.icon}
                  size={"lg"}
                  color={focused ? "primary.800" : "gray.800"}
                />
              );
            },
          }}
        />
      ))}
    </Tabs>
  );
}
