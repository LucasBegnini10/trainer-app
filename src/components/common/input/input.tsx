import { FormControl, Input } from "native-base";
import { IInputProps } from "native-base/lib/typescript/components/primitives/Input/types";

export interface InputProps {
  label?: string;
  hint?: string;
  value?: string;
  onChange?: (e: string) => void;
  invalid?: boolean;
  error?: string;
  icon?: JSX.Element | JSX.Element[];
  secure?: boolean;
  placeholder?: string;
  inputProps?: IInputProps;
}

export default function InputComponent(props: InputProps) {
  return (
    <FormControl isInvalid={props.invalid}>
      <FormControl.Label>{props.label}</FormControl.Label>
      <Input
        fontSize={14}
        py={3}
        value={props.value}
        onChangeText={props.onChange}
        placeholder={props.placeholder}
        secureTextEntry={props.secure}
        InputRightElement={props.icon}
        {...props.inputProps}
      />
      {props.hint ? (
        <FormControl.HelperText>{props.hint}</FormControl.HelperText>
      ) : null}
      {props.error ? (
        <FormControl.ErrorMessage>{props.error}</FormControl.ErrorMessage>
      ) : null}
    </FormControl>
  );
}
