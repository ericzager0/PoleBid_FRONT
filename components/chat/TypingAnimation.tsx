import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

export default function TypingAnimation() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  const createAnimation = (
    animatedValue: Animated.Value,
    delay: number
  ) => {
    return Animated.loop(
      Animated.sequence([
        Animated.delay(delay),

        Animated.timing(animatedValue, {
          toValue: -5,
          duration: 200,
          useNativeDriver: true,
        }),

        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),

        Animated.delay(400),
      ])
    );
  };

  useEffect(() => {
    const animations = [
      createAnimation(dot1, 0),
      createAnimation(dot2, 150),
      createAnimation(dot3, 300),
    ];

    animations.forEach((animation) => animation.start());

    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, []);

  return (
    <View className="flex-row items-center justify-center gap-3 bg-[#14191C] p-4 rounded-xl">
      <Animated.View
        style={{ transform: [{ translateY: dot1 }] }}
        className="w-3 h-3 rounded-full bg-[#E8B83C]"
      />

      <Animated.View
        style={{ transform: [{ translateY: dot2 }] }}
        className="w-3 h-3 rounded-full bg-[#E8B83C]"
      />

      <Animated.View
        style={{ transform: [{ translateY: dot3 }] }}
        className="w-3 h-3 rounded-full bg-[#E8B83C]"
      />
    </View>
  );
}