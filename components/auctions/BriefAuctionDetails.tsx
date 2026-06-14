import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface BriefAuctionDetailsProps {
  auctionName: string;
  date: string;
}

export default function BriefAuctionDetails({ auctionName, date }: BriefAuctionDetailsProps) {
  return (
    <View className="bg-[#1C1C1E] border border-[#2A2B30] rounded-2xl p-4 flex-row items-center w-full">
      <View 
        className="w-12 h-12 rounded-full items-center justify-center mr-4 border"
        style={{ backgroundColor: '#E8B83C15', borderColor: '#E8B83C30' }}
      >
        <Ionicons name="calendar-outline" size={24} color="#E8B83C" />
      </View>

      <View className="flex-1 justify-center">
        <Text 
          className="text-[#E8B83C] text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5"
        >
          Subasta asignada
        </Text>
        
        <Text 
          className="text-white text-base font-bold tracking-wide mb-1" 
          numberOfLines={1}
        >
          {auctionName}
        </Text>
        
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={14} color="#9CA3AF" />
          <Text className="text-[#9CA3AF] text-sm ml-1 font-medium">
            {date}
          </Text>
        </View>
      </View>
    </View>
  );
}