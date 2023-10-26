import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import {  Icon, } from "native-base";
import Header from "../../../src/components/common/header/header";

const routes = [
  { name: "index", href: "/student/home",  icon: "home", showHeader: true },
  { name: "profile", href: "/student/home/profile",  icon: "person", showHeader: false },
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
            headerShown: item.showHeader,
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
