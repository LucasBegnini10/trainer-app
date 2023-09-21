import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Icon } from "native-base";

const routes = [
  { name: "index", href: "home", title: "Home", icon: "home" },
  { name: "profile", href: "home/profile", title: "Perfil", icon: "person" },
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
            title: item.title,
            tabBarIcon: ({ focused }) => {
              return (
                <Icon
                  as={Ionicons}
                  name={item.icon}
                  size={28}
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
