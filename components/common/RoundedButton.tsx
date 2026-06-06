import React from "react";
import { Pressable, Text, View } from "react-native";

interface RoundedButtonProps {
  label?: string;
  variant?: "primary" | "secondary";
  onPress: () => void;
}

export default function RoundedButton({
  label = "Cerrar sesión",
  variant = "primary",
  onPress,
}: RoundedButtonProps) {
  
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#FF0B0B] active:bg-[#CC0A0A] hover:bg-[#E60A0A]";
    }
    
    return "bg-[#36393F] active:bg-[#2A2B30] hover:bg-[#4B4E54]";
  };

  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full px-4 py-2 ${getVariantClasses()}`}
    >
      <View className="flex-row items-center justify-center gap-2">
        <Text className="text-white font-bold tracking-wide">{label}</Text>
      </View>
    </Pressable>
  );
}