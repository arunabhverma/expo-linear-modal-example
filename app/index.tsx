import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { PressableScale } from "@/components/PressableScale";
import GestureModal from "@/components/GestureModal";
import AssigneeDialog from "@/components/AssigneeDialog";

const Main = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <PressableScale
        onPress={() => setVisible(true)}
        style={[
          styles.buttonContainer,
          { backgroundColor: theme.colors.button },
        ]}
      >
        <Ionicons
          name="person-circle-outline"
          size={28}
          color={theme.colors.text}
          style={{ opacity: 0.8 }}
        />
        <Text style={[styles.buttonText, { color: theme.colors.text }]}>
          Assignee
        </Text>
      </PressableScale>
      <GestureModal
        animationType="fade"
        visible={visible}
        onClose={() => setVisible(false)}
        transparent
      >
        <AssigneeDialog onClose={() => setVisible(false)} />
      </GestureModal>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    opacity: 0.8,
  },
});
