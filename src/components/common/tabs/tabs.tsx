import { Box, Center, Text, View, useColorModeValue } from "native-base";
import { useState } from "react";
import { Animated, Dimensions, Pressable } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

const initialLayout = {
  width: Dimensions.get("window").width,
};

interface TabProps {
  tabs: ItemTab[];
}

interface ItemTab {
  key: string;
  title: string;
  component: () => React.JSX.Element;
}

function convertArrayItemsToSceneMap(tabs: ItemTab[]) {
  const result = {};

  tabs.forEach((item) => {
    result[item.key] = item.component;
  });

  return result;
}

export default function TabsComponent({ tabs }: TabProps) {
  const renderScene = SceneMap(convertArrayItemsToSceneMap(tabs));

  const [index, setIndex] = useState(0);
  const [routes] = useState(
    tabs.map(({ key, title }) => {
      return {
        key,
        title,
      };
    })
  );

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color =
            index === i
              ? useColorModeValue("#000", "#e5e5e5")
              : useColorModeValue("#1f2937", "#a1a1aa");
          const borderColor =
            index === i
              ? "cyan.500"
              : useColorModeValue("coolGray.200", "gray.400");
          return (
            <Box
              key={i}
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
            >
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
  );
}
