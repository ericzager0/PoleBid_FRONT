import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';

interface SalesmanDetailsProps {
  image: ImageSourcePropType; 
  name: string;
}

export default function SalesmanDetails({ image, name }: SalesmanDetailsProps) {
  return (
    <View className="flex-row items-center bg-[#14191C] p-4 w-full">
      <View className="w-16 h-16 rounded-full border border-[#2A2B30] overflow-hidden shadow-md">
        <Image
          source={image}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 justify-center ml-4">
        <Text className="text-white text-2xl font-bold tracking-wide">
          {name}
        </Text>

        <View className="flex-row items-center mt-1">
          <View className="w-2 h-2 rounded-full bg-[#E8B83C] mr-2" />
          <Text className="text-[#E8B83C] text-[11px] font-extrabold tracking-[2px]">
            VENDEDOR VERIFICADO
          </Text>
        </View>

      </View>

    </View>
  );
}