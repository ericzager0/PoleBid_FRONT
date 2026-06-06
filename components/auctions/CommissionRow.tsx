import React from 'react';
import { Text, View } from 'react-native';

interface CommissionRowProps {
  percentage: string | number; 
}

export default function CommissionRow({ percentage }: CommissionRowProps) {
  return (
    <View className="flex-row items-center justify-between py-4 px-2 border-y border-[#2A2B30]">
      <Text className="text-[#E8B83C] text-xs font-bold tracking-[0.2em] uppercase">
        Comisión
      </Text>

      <Text className="text-white text-lg font-bold tracking-wide">
        {percentage}%
      </Text>
    </View>
  );
}