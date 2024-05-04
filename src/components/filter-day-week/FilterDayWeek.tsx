import { Badge, FlatList, Pressable } from "native-base";
import { LAST_KEY_DAY, daysOfWeekMapping } from "../../utils/schedule";
import { memo, useEffect, useRef } from "react";

interface FilterDayWeekProps {
  filterDay: {
    day: number;
    changeDay: (day: number) => void;
  };
}

function FilterDayWeek({ filterDay }: FilterDayWeekProps) {
  const flatListRef = useRef(null);

  const handleChangeDay = async (day: number) => filterDay.changeDay(day);

  const scrollToActiveItem = (day: number) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: day,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToActiveItem(filterDay.day);
    }, 500);
    return () => clearTimeout(timer);
  }, [filterDay.day]);

  return (
    <FlatList
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
      keyExtractor={(item) => String(item[0]).concat("#DAY")}
      renderItem={({ item }) => {
        const [key, value] = item;

        const active = key === `${filterDay.day}`;

        return (
          <Pressable onPress={() => handleChangeDay(Number(key))}>
            <Badge
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

export default memo(FilterDayWeek, (prev, next) => prev.filterDay.day === next.filterDay.day);    
