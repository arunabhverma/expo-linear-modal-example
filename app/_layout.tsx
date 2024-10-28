import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { PlatformColor, useColorScheme } from "react-native";
import "react-native-reanimated";

declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      button: "string";
    };
  };
  export function useTheme(): ExtendedTheme;
}

const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#0D0D0D",
    card: "#181818",
    button: "#262626",
  },
};

const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFF",
    card: "#F7F7F7",
    button: "#F8F8F8",
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? dark : light}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </ThemeProvider>
  );
}
