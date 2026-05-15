import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface CustomProgressBarProps {
  nombre: string;
  porcentaje: number;
  onPress?: () => void;
}

export default function CustomProgressBar({ nombre, porcentaje, onPress }: CustomProgressBarProps) {
  const widthPercent = Math.min(Math.max(porcentaje, 0), 100);

  return (
    <View className="w-[80%] px-4 py-2">
      <Pressable onPress={onPress}>
        <View className="w-full h-3 bg-[#373A43] rounded-full flex-row items-center">
          <View 
            className="h-full bg-[#FFD874] rounded-full justify-center relative"
            style={{ width: `${widthPercent}%` }}
          >
            <View className="absolute right-[-10px] w-5 h-5 rounded-full bg-[#FFD874]/40 items-center justify-center">
              <View className="w-2.5 h-2.5 rounded-full bg-[#FFD874]" />
            </View>
          </View>
        </View>
      </Pressable>

      <Text className="text-gray-100 text-center font-bold text-sm mt-2">
        {nombre}
      </Text>
      
    </View>
  );
}