import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface UserInfoCardProps {
  title: string;
  value: string;
}

export default function UserInfoCard({ title, value }: UserInfoCardProps) {
  return (
    <View className="mb-4">
      <Text className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 ml-1">
        {title}
      </Text>

      <View 
        className="flex-row items-center justify-between bg-[#1A1A1A] px-4 py-4 rounded-xl border border-[#333333]"
      >
        <Text className="text-gray-200 text-base flex-1 mr-4">
          {value}
        </Text>

        <MaterialCommunityIcons 
          name="lock-outline" 
          size={20} 
          color="#6B7280" 
        />
      </View>
    </View>
  );
}