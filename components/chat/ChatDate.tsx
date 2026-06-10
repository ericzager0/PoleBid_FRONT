import React from 'react';
import { Text, View } from 'react-native';

interface ChatDateProps {
  date: Date; 
}

export default function ChatDate({ date }: ChatDateProps) {
  
  const formatChatDate = (targetDate: Date): string => {
    const today = new Date();
    const isToday = 
      targetDate.getDate() === today.getDate() &&
      targetDate.getMonth() === today.getMonth() &&
      targetDate.getFullYear() === today.getFullYear();

    const hours = targetDate.getHours().toString().padStart(2, '0');
    const minutes = targetDate.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    if (isToday) {
      return `HOY ${timeString}`;
    } else {
      const day = targetDate.getDate().toString().padStart(2, '0');
      const month = (targetDate.getMonth() + 1).toString().padStart(2, '0'); 
      const year = targetDate.getFullYear();
      
      return `${day}/${month}/${year} ${timeString}`;
    }
  };

  return (
    <View className="w-full flex-row justify-center my-4">
      <View className="bg-[#1C1C1E] border border-[#2A2B30]/30 px-5 py-2 rounded-full shadow-sm">
        
        <Text className="text-[#E8B83C] text-[13px] font-extrabold tracking-[2px] text-center uppercase">
          {formatChatDate(date)}
        </Text>
        
      </View>
    </View>
  );
}