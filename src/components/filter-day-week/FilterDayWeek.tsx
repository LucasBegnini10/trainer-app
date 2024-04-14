import { Badge, FlatList, Pressable } from "native-base";
import { LAST_KEY_DAY, daysOfWeekMapping } from "../../utils/schedule";
import { memo, useEffect, useRef, useState } from "react";

interface FilterDayWeekProps {
  onChange?: (day: number) => void;
}

function FilterDayWeek({ onChange }: FilterDayWeekProps) {
  const [dayFilter, setDayFilter] = useState(() => new Date().getDay());

  const handleChangeDay = async (day: number) => {
    setDayFilter(day);
    if (onChange) {
      onChange(day);
    }
  };

  const flatListRef = useRef(null);

  const scrollToActiveItem = () => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: dayFilter,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToActiveItem();
    }, 500);
  }, []);

  return (
    <FlatList
      key={"DAYS_OF_WEEK"}
      ref={flatListRef}
      py={2}
      pl={6}
      data={Object.entries(daysOfWeekMapping)}
      horizontal
      getItemLayout={(data, index) => ({
        length: 50,
        offset: 50 * index,
        index,
      })}
      keyExtractor={(item) => `DAYS_OF_WEEK_${item[0]}`}
      renderItem={({ item }) => {
        const [key, value] = item;

        const active = key === `${dayFilter}`;

        return (
          <Pressable key={key} onPress={() => handleChangeDay(Number(key))}>
            <Badge
              key={key}
              borderWidth={1}
              borderColor={"brand.primary"}
              bg={active ? "brand.primary" : "brand.bg"}
              rounded={"full"}
              mr={key === `${LAST_KEY_DAY}` ? 12 : 2}
              px={4}
              _text={{
                color: active ? "brand.bg" : "white",
                fontSize: "sm",
              }}
            >
              {value}
            </Badge>
          </Pressable>
        );
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
}

export default memo(FilterDayWeek);
