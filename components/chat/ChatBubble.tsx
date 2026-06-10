import React from 'react';
import { Text, View } from 'react-native';

interface ChatBubbleProps {
  isMe: boolean; 
  text: string;
  time: string;
}

export default function ChatBubble({ isMe, text, time }: ChatBubbleProps) {
  return (
    <View className={`w-full flex-row ${isMe ? 'justify-end' : 'justify-start'} mb-3`}>
      <View className="max-w-[80%]">
        <View
          className={`rounded-[22px] px-5 py-3.5 border ${
            isMe
              ? 'bg-[#A3A3A3] border-transparent rounded-tr-md' 
              : 'bg-[#1C1C1E] border-[#2A2B30] rounded-tl-md'  
          }`}
        >
          <Text
            className={`text-base leading-6 font-medium ${
              isMe ? 'text-[#14191C]' : 'text-[#E5E7EB]'
            }`}
          >
            {text}
          </Text>
        </View>

        <View className={`flex-row items-center mt-1 px-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
          <Text className="text-[#6B7280] text-xs font-medium">
            {time}
          </Text>
          
          {isMe && (
            <Text className="text-[#6B7280] text-xs ml-1 font-bold">
              ✓✓
            </Text>
          )}
        </View>

      </View>
    </View>
  );
}