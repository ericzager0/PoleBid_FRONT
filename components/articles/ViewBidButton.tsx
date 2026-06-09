import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ViewBidButtonProps extends TouchableOpacityProps {
  label?: string;
}

export default function ViewBidButton({
  label = "Ver subasta",
  className = "",
  ...props
}: ViewBidButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`flex-row items-center justify-center border border-[#E8B83C] bg-[#E8B83C]/5 rounded-full py-3 px-8 self-start ${className}`}
      {...props}
    >
      <Text className="text-[#E8B83C] text-lg font-medium tracking-widest font-mono mr-3">
        {label}
      </Text>
      
      <Feather name="external-link" size={20} color="#E8B83C" />
    </TouchableOpacity>
  );
}