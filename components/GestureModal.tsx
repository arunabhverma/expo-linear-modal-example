import React from "react";
import { Dimensions, Modal, ModalProps, StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

const DRAG_THRESHOLD = 100;
const DEVICE_HEIGHT = Dimensions.get("window").height;

const GestureModal = ({
  onClose,
  ...props
}: ModalProps & { onClose: () => void }) => {
  const { top } = useSafeAreaInsets();
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const distance = useSharedValue(0);

  const onDragThresholdReached = () => {
    onClose();
  };

  const pan = Gesture.Pan()
    .onStart(() => {})
    .onChange((e) => {
      distance.value = Math.sqrt(e.translationX ** 2 + e.translationY ** 2);
      const normalizedDistance = interpolate(
        distance.value,
        [DRAG_THRESHOLD, DEVICE_HEIGHT],
        [1, 0.5]
      );
      if (distance.value < DRAG_THRESHOLD) {
        translateX.value = e.translationX;
        translateY.value = e.translationY;
      } else {
        translateX.value = e.translationX * normalizedDistance;
        translateY.value = e.translationY * normalizedDistance;
      }
    })
    .onFinalize(() => {
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
      if (distance.value > DRAG_THRESHOLD) {
        runOnJS(onDragThresholdReached)();
        distance.value = withTiming(0);
      } else {
        distance.value = withTiming(0);
      }
    });

  const animatedContainerStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      distance.value,
      [0, DEVICE_HEIGHT],
      [1, 0.3],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          scale,
        },
      ],
    };
  });

  return (
    <Modal onRequestClose={onClose} {...props}>
      <View style={styles.container}>
        <BlurView style={StyleSheet.absoluteFillObject} tint="prominent" />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <GestureDetector gesture={pan}>
            <Animated.View
              style={[
                animatedContainerStyle,
                { top: top + 20, alignSelf: "center" },
              ]}
            >
              {props.children}
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      </View>
    </Modal>
  );
};

export default GestureModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
