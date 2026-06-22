import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface BidLogProps {
  date: string;
  name: string;
  won: boolean;
  bid: string;
  onPress?: () => void;
}

export default function BidLog({ date, name, won, bid, onPress }: BidLogProps) {
  const containerClass = won ? 'bg-[#FDF4E3]' : 'bg-[#1C1C1E] border border-[#2A2B30]';
  const badgeClass = won ? 'bg-[#2A2B30]' : 'bg-transparent border border-[#4B4E54]';
  const badgeTextClass = won ? 'text-[#E8B83C]' : 'text-[#9CA3AF]';
  const titleClass = won ? 'text-[#1A1A1A]' : 'text-white';
  const subtitleClass = won ? 'text-[#6B7280]' : 'text-[#9CA3AF]';
  const boldValueClass = won ? 'text-[#1A1A1A]' : 'text-[#D1D5DB]';

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={onPress}
      className={`w-full rounded-2xl p-5 mb-4 shadow-sm ${containerClass}`}
    >
      
      <View className="flex-row justify-between items-center mb-3">
        <View className={`px-3 py-1 rounded-full justify-center items-center ${badgeClass}`}>
          <Text className={`text-[10px] font-bold tracking-widest uppercase ${badgeTextClass}`}>
            {won ? 'Won' : 'Participated'}
          </Text>
        </View>
        <Text className="text-[#8C8C8C] text-xs font-bold tracking-widest" style={{ fontFamily: 'SpaceMono-Regular' }}>
          {date}
        </Text>
      </View>

      <View className="flex-row justify-between items-center mb-2">
        <Text 
          className={`flex-1 text-2xl font-bold tracking-tight pr-4 ${titleClass}`}
          numberOfLines={1}
        >
          {name}
        </Text>
        {won && (
          <MaterialCommunityIcons name="trophy" size={32} color="#E8B83C" />
        )}
      </View>

      <Text className={`text-base font-medium ${subtitleClass}`}>
        {won ? 'Final Bid: ' : 'Outbid at: '}
        <Text className={`font-bold ${boldValueClass}`}>
          {bid}
        </Text>
      </Text>
    </TouchableOpacity>
  );
}