import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import React from 'react';
import { Text, View } from 'react-native';

interface BidLogProps {
  date: string;
  name: string;
  won: boolean;
}

export default function BidLog({ date, name, won }: BidLogProps) {
  return (
    <View className="w-full bg-[#5E5E5E] rounded-2xl flex-row items-center justify-between p-4 mb-3">
      
      <View className="flex-1">
        <Text className="text-[#A1A1A1] text-[10px] font-medium mb-1">
          {date}
        </Text>
        
        <Text className="text-[#1A1A1A] text-xl font-bold leading-tight">
          {name}
        </Text>
      </View>

      {won && (
        <View className="bg-[#1C1C1E] p-2 rounded-xl">
          <FontAwesome6 name="medal" size={28} color="#EBB454" />
        </View>
      )}

    </View>
  );
}