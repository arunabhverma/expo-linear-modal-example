import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import Animated, {
  LinearTransition,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DialogHeader } from "./DialogHeader";
import { DialogSearchBar } from "./DialogSearch";
import { ListRenderItem } from "./ListRenderItem";
import { ListBottomGradient, ListTopGradient } from "./ListTopGradient";
import { CARD_HEIGHT } from "@/constants";
import { DATA } from "@/mock/DATA";

const AssigneeDialog = ({ onClose }: { onClose: () => void }) => {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const keyboard = useAnimatedKeyboard();
  const { width, height } = useWindowDimensions();

  const [activeAssigneeId, setActiveAssigneeId] = useState("0");
  const [searchString, setSearchString] = useState("");

  const filteredData = useMemo(() => {
    const query = searchString.toLowerCase().trim();
    return DATA?.filter(
      (item) =>
        item.username.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query)
    );
  }, [DATA, searchString]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const paddingTop = top + 20;
    const bufferSpace = 50;

    const availableSpace = height - CARD_HEIGHT - paddingTop;
    const keyboardOverlap = keyboard.height.value - availableSpace;
    const adjustedOverlap = keyboardOverlap + bufferSpace;

    const containerHeight = Math.min(
      CARD_HEIGHT,
      CARD_HEIGHT - adjustedOverlap
    );

    return {
      height: containerHeight,
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: width * 0.9,
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.cardShadow,
        },
        styles.container,
        animatedContainerStyle,
      ]}
    >
      <View style={styles.subContainer}>
        <DialogHeader onClose={onClose} theme={theme} />
        <DialogSearchBar
          value={searchString}
          onChangeText={setSearchString}
          theme={theme}
          colorScheme={colorScheme}
        />
        <View style={{ flex: 1 }}>
          <ListTopGradient theme={theme} colorScheme={colorScheme} />
          <Animated.FlatList
            showsVerticalScrollIndicator={false}
            itemLayoutAnimation={LinearTransition}
            keyboardShouldPersistTaps={"handled"}
            data={filteredData}
            renderItem={({ item, index }) => (
              <ListRenderItem
                item={item}
                index={index}
                activeAssigneeId={activeAssigneeId}
                setActiveAssigneeId={setActiveAssigneeId}
              />
            )}
            keyExtractor={(val) => val.id}
          />
          <ListBottomGradient theme={theme} colorScheme={colorScheme} />
        </View>
      </View>
    </Animated.View>
  );
};

export default AssigneeDialog;

const styles = StyleSheet.create({
  container: {
    height: CARD_HEIGHT,
    borderRadius: 20,
    paddingTop: 20,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  subContainer: {
    overflow: "hidden",
    flex: 1,
    borderRadius: 20,
  },
});
