import { FormControl, Input, Text, TextArea } from "native-base";
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
  textarea?: boolean;
}

export default function InputComponent(props: InputProps) {
  return (
    <FormControl isInvalid={props.invalid}>
      <FormControl.Label>
        <Text color={"white"}>{props.label}</Text>
      </FormControl.Label>
      {props.textarea ? (
        <TextArea
          autoCompleteType={"off"}
          isDisabled={props.disabled}
          fontSize={14}
          py={3}
          value={props.value}
          bg="brand.gray"
          borderColor={"brand.gray"}
          onChangeText={props.onChange}
          color={"white"}
          isReadOnly={props.readonly}
          placeholder={props.placeholder}
          secureTextEntry={props.secure}
          InputRightElement={props.icon}
          rounded={"lg"}
          _focus={{
            borderColor: "brand.primary",
            bg: "brand.gray",
          }}
          {...props.inputProps}
        />
      ) : (
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
          placeholder={props.placeholder}
          secureTextEntry={props.secure}
          InputRightElement={props.icon}
          rounded={"lg"}
          _focus={{
            borderColor: "brand.primary",
            bg: "brand.gray",
          }}
          {...props.inputProps}
        />
      )}

      {props.hint ? (
        <FormControl.HelperText>{props.hint}</FormControl.HelperText>
      ) : null}
      {props.error ? (
        <FormControl.ErrorMessage>{props.error}</FormControl.ErrorMessage>
      ) : null}
    </FormControl>
  );
}
