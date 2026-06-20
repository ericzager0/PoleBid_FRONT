import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ImageBackground, Text, View } from "react-native";

interface CatalogueTitleProps {
  title: string;
  imageUrl: string;
  isLive?: boolean;
}

export default function CatalogueTitle({
  title,
  imageUrl,
  isLive = false,
}: CatalogueTitleProps) {
  return (
    <View className="w-full h-56 rounded-[24px] overflow-hidden relative border border-[#2A2B30] shadow-lg">
      <ImageBackground
        source={{uri: imageUrl}}
        className="w-full h-full justify-end p-5"
        resizeMode="cover"
      >
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/30" />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.95)"]}
          className="absolute left-0 right-0 bottom-0 h-32"
        />

        {isLive && (
          <View className="absolute top-4 left-4 bg-[#E8B83C] px-3 py-1 rounded-md shadow-sm">
            <Text className="text-[#14191C] font-bold text-xs uppercase tracking-widest">
              Live Now
            </Text>
          </View>
        )}

        <View className="z-10">
          <Text
            className="text-white text-4xl font-extrabold tracking-tight mb-1"
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
