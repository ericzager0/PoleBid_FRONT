import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface ProductDetailCardProps {
  price: string;
  date: string;
  time: string;
}

export default function ProductDetailCard({
  price,
  date,
  time,
}: ProductDetailCardProps) {
  return (
    <View className="w-full bg-[#1C1C1E] rounded-[20px] p-5 border border-[#2A2B30] shadow-sm">
      <View className="flex-row items-center mb-6">
        
        <View className="w-14 h-14 bg-[#2A2B30] rounded-xl border border-[#4B4E54] items-center justify-center mr-4 shadow-sm">
          <MaterialCommunityIcons name="cash-multiple" size={28} color="#E8B83C" />
        </View>

        <View className="justify-center">
          <Text className="text-[#9CA3AF] text-xs font-bold tracking-[0.15em] uppercase mb-1">
            Precio Actual
          </Text>
          <Text className="text-[#E8B83C] text-[32px] font-bold leading-none tracking-wide">
            {price}
          </Text>
        </View>

      </View>

      <View className="flex-row items-start justify-between">
        <View className="flex-row items-center flex-1 pr-4">
          <MaterialCommunityIcons name="calendar-blank-outline" size={24} color="#E8B83C" />
          <Text className="text-[#D1D5DB] text-[15px] font-medium ml-3 leading-snug flex-shrink">
            {date}
          </Text>
        </View>

        <View className="flex-row items-center flex-1 pl-2">
          <MaterialCommunityIcons name="clock-outline" size={24} color="#E8B83C" />
          <Text className="text-[#D1D5DB] text-[15px] font-medium ml-3">
            {time}
          </Text>
        </View>

      </View>
      
    </View>
  );
}