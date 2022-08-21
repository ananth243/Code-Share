import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    "primary-dark": {
      100: "#E7F6F2",
      200: "#A5C9CA",
      300: "#395B64",
      400: "#2C3333",
    },
    "primary-light": {
      100: "#FFF9CA",
      200: "#FFDEB4",
      300: "#FFB4B4",
      400: "#B2A4FF",
    },
  },
  styles: {
    global: (props) => ({
      "html, body": {
        color:
          props.colorMode === "dark" ? "primary-dark.200" : "primary-light.400",
        backgroundColor:
          props.colorMode === "dark" ? "primary-dark.400" : "primary-light.100",
      },
    }),
  },
});

export default function Chakra({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
