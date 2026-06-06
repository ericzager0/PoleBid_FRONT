import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export default function FilterButton({ label, isActive, onPress }: FilterButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`px-5 py-1.5 rounded-full border ${
        isActive 
          ? 'bg-[#EBB454] border-[#EBB454]' 
          : 'bg-transparent border-[#8E8E93]'
      }`}
    >
      <Text 
        className={`text-sm font-medium ${
          isActive ? 'text-[#1A1A1A]' : 'text-[#E5E5EA]'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}