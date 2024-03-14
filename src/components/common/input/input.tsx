import { FormControl, Input, Text } from "native-base";
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
  disabled?: boolean;
  readonly?: boolean;
}

export default function InputComponent(props: InputProps) {
  return (
    <FormControl isInvalid={props.invalid}>
      <FormControl.Label>
        <Text color={"white"}>{props.label}</Text>
      </FormControl.Label>
      <Input
        isDisabled={props.disabled}
        fontSize={14}
        py={3}
        value={props.value}
        bg="brand.gray"
        borderColor={"brand.gray"}
        onChangeText={props.onChange}
        color={"white"}
        isReadOnly={props.readonly}
        _focus={{
          borderColor: "brand.primary",
          bg: "brand.gray"
        }}
        placeholder={props.placeholder}
        secureTextEntry={props.secure}
        InputRightElement={props.icon}
        rounded={"lg"}
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
