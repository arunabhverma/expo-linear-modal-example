import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { darkenColor } from "@/utils/darkenColor";

type AvatarType = {
  title: string;
  bgColor: string;
};

export const Avatar = ({ title, bgColor }: AvatarType) => {
  const colorScheme = useColorScheme();
  let backgroundColor =
    colorScheme === "dark" ? bgColor : darkenColor(bgColor, 0.8);

  return (
    <View style={[styles.avatarContainer, { backgroundColor }]}>
      <Text style={styles.avatarText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 30,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontWeight: "700",
    letterSpacing: 0.5,
    fontSize: 10,
  },
});
