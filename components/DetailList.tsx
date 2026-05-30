import React from 'react';
import { Text, View } from 'react-native';

export interface InfoItem {
  label: string; 
  value: string | number;
}

interface DetailsListProps {
  data: InfoItem[];
}

export default function DetailsList({ data }: DetailsListProps) {
  return (
    <View className="w-full">
      {data.map((item, index) => (
        <Text 
          key={index} 
          className="text-gray-400 text-base mb-1.5 leading-relaxed"
        >
          {item.label}: <Text className="text-gray-300">{item.value}</Text>
        </Text>
      ))}
    </View>
  );
}