import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { styleButton } from "./style";

export interface ButtonProps {
  loading?: boolean;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  const style = styleButton(props);

  return (
    <TouchableOpacity
      onPress={props.onClick}
      style={style.conatiner}
      disabled={props.disabled}
    >
      {props.loading ? (
        <ActivityIndicator size={"small"} color={"white"} />
      ) : (
        <Text style={style.label}>{props.label}</Text>
      )}
    </TouchableOpacity>
  );
}
