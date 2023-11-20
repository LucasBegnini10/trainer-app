import { extendTheme } from "native-base";

export const theme = extendTheme({
  colors: {
    brand: {
      primary: "#ffb81a",
      secondary: "#c08709",
      bg: "#12111f",
      gray: "#373542",
    },
  },
  components: {
    Button: {
      defaultProps: {
        padding: 4,
        rounded: "md",
        w: "full",
        bg: "brand.primary",
        _pressed: {
          bg: "brand.secondary"
        }
      },
    },
    Text: {
      defaultProps: {
        fontFamily: "Roboto-Regular"
      }
    }
  },
});
