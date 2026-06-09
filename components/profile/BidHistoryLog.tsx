import React, { useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';

export interface BidEvent {
  id: string;        
  timestamp: string;  
  idCategory: number; 
  name: string;      
  amount: number;     
}

interface BidHistoryLogProps {
  bids: BidEvent[];
  fullHeight?: boolean;
}

export default function BidHistoryLog({ bids, fullHeight = false }: BidHistoryLogProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  const getCategoryData = (idCategory: number) => {
    switch (idCategory) {
      case 1: return { name: "Silver", color: "#B6BABD" };
      case 2: return { name: "Gold", color: "#E8B83C" };
      case 3: return { name: "Platinum", color: "#B8C1E8" };
      default: return { name: "Normal", color: "#FFFFFF" };
    }
  };

  const formatMoney = (value: number) => {
    return '$' + value.toLocaleString('en-US');
  };

  return (
    <View 
      className={`bg-[#1C1D21] rounded-xl p-4 w-full border border-[#2A2B30] ${
        fullHeight ? 'flex-1 min-h-[300px]' : 'h-48'
      }`}
    >
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={true}
        nestedScrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {bids.map((bid) => {
          const cat = getCategoryData(bid.idCategory);
          
          return (
            <Text key={bid.id} className="text-white text-base font-bold mb-3 tracking-wide">
              {bid.timestamp} - <Text style={{ color: cat.color }}>[{cat.name}]</Text> {bid.name}: {formatMoney(bid.amount)}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
}