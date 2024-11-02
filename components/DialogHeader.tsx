import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { PressableScale } from "./PressableScale";

export const DialogHeader = ({
  onClose,
  theme,
}: {
  onClose: () => void;
  theme: ExtendedTheme;
}) => {
  return (
    <View style={styles.dialogHeader}>
      <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
        Assignee
      </Text>
      <PressableScale onPress={onClose} style={styles.dialogCloseButton}>
        <AntDesign name="close" size={20} color={theme.colors.background} />
      </PressableScale>
    </View>
  );
};

const styles = StyleSheet.create({
  dialogHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "500",
    opacity: 0.5,
  },
  dialogCloseButton: {
    width: 28,
    aspectRatio: 1,
    backgroundColor: "rgba(100,100,100,0.9)",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
  },
});
