import {
  ActivityIndicator,
  StyleProp,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { styleButton } from "./style";

export interface ButtonProps {
  loading?: boolean;
  disabled?: boolean;
  label?: string;
  onClick?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function Button(props: ButtonProps) {
  const style = styleButton(props);

  return (
    <TouchableOpacity
      onPress={props.onClick}
      style={[style.conatiner, props.style]}
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
