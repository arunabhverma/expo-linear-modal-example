import React from "react";
import { ColorSchemeName, StyleSheet, TextInput, View } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { darkenColor } from "@/utils/darkenColor";

type DialogSearchBar = {
  value: string;
  onChangeText: (val: string) => void;
  theme: ExtendedTheme;
  colorScheme: ColorSchemeName;
};

export const DialogSearchBar = ({
  value,
  onChangeText,
  theme,
  colorScheme,
}: DialogSearchBar) => {
  const backgroundColor =
    colorScheme === "dark"
      ? darkenColor(theme.colors.card, 0.8)
      : darkenColor(theme.colors.card, 0.95);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <AntDesign
        name="search1"
        size={24}
        color={theme.colors.text}
        style={{ opacity: 0.3 }}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Assign to..."
        style={[styles.textStyle, { color: theme.colors.text }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  textStyle: {
    flex: 1,
    fontSize: 22,
    paddingVertical: 10,
  },
});
