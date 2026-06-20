import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CatalogueProductCardProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  onPress?: () => void;
}

export default function CatalogueProductCard({
  title,
  description,
  price,
  imageUrl,
  onPress,
}: CatalogueProductCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="flex-row w-full bg-[#1C1C1E] rounded-2xl overflow-hidden mb-4 border border-[#2A2B30] shadow-sm"
    >
      <View className="flex-1 p-4 justify-between z-10">
        <View className="mb-4">
          <Text
            className="text-white text-xl font-bold leading-tight mb-1.5"
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text
            className="text-[#9CA3AF] text-sm leading-snug"
            numberOfLines={2}
          >
            {description}
          </Text>
        </View>

        <View className="gap-y-2.5">
          <View className="flex-row items-center gap-x-2">
            <MaterialCommunityIcons name="cash" size={24} color="#E8B83C" />
            <Text className="text-[#E8B83C] text-xl font-bold tracking-wide">
              {price}
            </Text>
          </View>
        </View>
      </View>

      <View className="w-[140px] bg-[#0A0A0A] relative">
        <Image
          source={{uri: imageUrl}}
          className="absolute w-full h-full"
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
}
