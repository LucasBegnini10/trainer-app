import {  Center, FlatList, Heading } from "native-base";
import Card from "../../src/components/card/card";

export default function HomeIndex() {
  return (
    <FlatList
      bg={"white"} 
      data={[1, 2, 3]} 
      renderItem={({}) => <Card />} 
      />
  );
}
