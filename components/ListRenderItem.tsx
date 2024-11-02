import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { DATA_TYPE } from "@/types/ListDataTypes";
import { Avatar } from "./Avatar";

type ListRenderItemType = {
  item: DATA_TYPE;
  index: number;
  activeAssigneeId: string;
  setActiveAssigneeId: (id: string) => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Checkmark = () => {
  const theme = useTheme();
  return (
    <Animated.View entering={ZoomIn} exiting={ZoomOut}>
      <Ionicons name="checkmark" size={24} color={theme.colors.text} />
    </Animated.View>
  );
};

export const ListRenderItem = ({
  item,
  index,
  activeAssigneeId,
  setActiveAssigneeId,
}: ListRenderItemType) => {
  const theme = useTheme();
  return (
    <AnimatedPressable
      entering={FadeIn.delay(10 * index)}
      exiting={FadeOut}
      onPress={() => {
        setActiveAssigneeId(item.id);
      }}
      style={styles.container}
    >
      {item.id === "0" ? (
        <Ionicons
          name="person-circle-outline"
          size={32}
          color={theme.colors.text}
          style={{ opacity: 0.8 }}
        />
      ) : (
        <Avatar title={item.initials} bgColor={item.avatarColor} />
      )}
      <View style={styles.listItemStyle}>
        <View>
          <Text style={[styles.usernameStyle, { color: theme.colors.text }]}>
            {item.id === "0" ? "No assignee" : item.username}
          </Text>
        </View>
        {activeAssigneeId === item.id && <Checkmark />}
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    paddingHorizontal: 25,
    paddingVertical: 12,
  },
  listItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  usernameStyle: {
    fontWeight: "500",
    fontSize: 22,
  },
});
