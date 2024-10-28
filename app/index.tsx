import React, { useState } from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { PressableScale } from "@/components/PressableScale";
import GestureModal from "@/components/GestureModal";

const Main = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <PressableScale
        onPress={() => setVisible(true)}
        style={{
          flexDirection: "row",
          gap: 10,
          backgroundColor: theme.colors.button,
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 8,
        }}
      >
        <Ionicons
          name="person-circle-outline"
          size={28}
          color={theme.colors.text}
          style={{ opacity: 0.8 }}
        />
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 18,
            fontWeight: "500",
            opacity: 0.8,
          }}
        >
          Assignee
        </Text>
      </PressableScale>
      <GestureModal
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
        transparent
      >
        <View style={{ width: 200, height: 200, backgroundColor: "red" }}>
          <Text>Hello worlds</Text>
        </View>
      </GestureModal>
    </View>
  );
};

export default Main;
