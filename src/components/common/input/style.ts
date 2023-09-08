import { StyleSheet } from "react-native";
import { InputProps } from "./input";
import { colors } from "../../../theme/theme";

export const styleInput = (props: InputProps) =>
  StyleSheet.create({
    container: {
      flexDirection: "column",
      gap: 6,
      width: "100%",
    },

    label: {
      ...(props.invalid && { color: "red" }),
      fontFamily: "Inter-Medium",
      color: colors.grey,
    },

    inputWrapper: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.primary,
      padding: 10,
      borderRadius: 20,
      justifyContent: "space-between",
      ...(props.invalid && { borderColor: "red" }),
    },

    input: {
      fontSize: 14,
      height: "100%",
      width: "90%",
      fontFamily: "Inter-Regular",
    },

    hint: {
      fontSize: 12,
      color: "#696969",
      fontFamily: "Inter-Light",
    },

    error: {
      fontSize: 12,
      color: "red",
      fontFamily: "Inter-Regular",
    },
  });
