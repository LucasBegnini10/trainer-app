import { colors } from "../theme/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
  },

  logoWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },

  logo: {
    width: 120,
    height: 120,
  },

  containerFields: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 24,
  },

  title: {
    fontFamily: "Inter-Bold",
    fontSize: 22,
    color: colors.primary,
  },

  subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: colors.grey,
  },

  actions: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textActions: {
    fontFamily: "Inter-Regular",
    fontSize: 12.5,
    color: colors.grey,
  },
});
