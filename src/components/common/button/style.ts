import { StyleSheet } from "react-native";
import { ButtonProps } from "./button";
import { colors } from "../../../theme/theme";

export const styleButton = (props: ButtonProps) =>
  StyleSheet.create({
    conatiner: {
      width: "100%",
      backgroundColor: colors.primary,
      ...(props.disabled && { backgroundColor: "#ccc" }),
      padding: 14,
      borderRadius: 20,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "center",
      gap: 6,
    },

    label: {
      fontSize: 16,
      fontFamily: "Inter-Bold",
      textTransform: "uppercase",
      color: "white",
    },
  });
