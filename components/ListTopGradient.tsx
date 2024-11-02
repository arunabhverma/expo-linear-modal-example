import React from "react";
import { ColorSchemeName, StyleSheet } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

type ListGradientType = {
  theme: ExtendedTheme;
  colorScheme: ColorSchemeName;
};

const themedOpacityColor = (colorScheme: ColorSchemeName) => {
  return colorScheme === "light" ? "rgba(255,255,255,0)" : "rgba(24,24,24,0)";
};

export const ListTopGradient = ({ theme, colorScheme }: ListGradientType) => {
  return (
    <LinearGradient
      colors={[theme.colors.card, themedOpacityColor(colorScheme)]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.listGradient, { top: 0 }]}
    />
  );
};

export const ListBottomGradient = ({
  theme,
  colorScheme,
}: ListGradientType) => {
  return (
    <LinearGradient
      colors={[theme.colors.card, themedOpacityColor(colorScheme)]}
      start={{ x: 0, y: 0.95 }}
      end={{ x: 0, y: 0 }}
      style={[styles.listGradient, { bottom: 0 }]}
    />
  );
};

const styles = StyleSheet.create({
  listGradient: {
    height: 20,
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
});
