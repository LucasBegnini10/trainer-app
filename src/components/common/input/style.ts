import { StyleSheet } from "react-native";
import { InputProps } from "./input";

export const styleInput = (props: InputProps) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      gap: 6,
      width: "100%",
    },

    label: {
      ...(props.invalid && { color: "red" }),
    },

    inputWrapper: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      padding: 10,
      borderRadius: 6,
      justifyContent: "space-between",
      ...(props.invalid && { borderColor: "red" }),
    },

    input: {
      fontSize: 16,
      height: "100%",
      width: "90%",
    },

    hint: {
      fontSize: 12,
      color: "#696969",
    },

    error: {
      fontSize: 12,
      color: "red",
    },
  });
