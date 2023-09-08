import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { styleInput } from "./style";
import { ReactNode } from "react";

export interface InputProps {
  label: string;
  hint?: string;
  value: string;
  onChange: (e: string) => void;
  loading?: boolean;
  invalid?: boolean;
  error?: string;
  icon?: ReactNode;
  secure?: boolean;
  placeholder?: string;
}

export default function Input(props: InputProps) {
  const style = styleInput(props);

  return (
    <View style={style.container}>
      <Text style={style.label}>{props.label}</Text>
      <View style={style.inputWrapper}>
        <TextInput
          placeholder={props.placeholder}
          secureTextEntry={props.secure}
          style={style.input}
          value={props.value}
          onChangeText={props.onChange}
          placeholderTextColor={"#ccc"}
        />
        {props.loading && <ActivityIndicator size={"small"} />}
        {props.icon && props.icon}
      </View>

      {props.hint && <Text style={style.hint}>{props.hint}</Text>}
      {props.error && <Text style={style.error}>{props.error}</Text>}
    </View>
  );
}
