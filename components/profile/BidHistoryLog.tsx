import React, { useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';

export interface BidEvent {
  identificador: number;        
  created_at: string;  
  asistente: number; 
  ganador: string;      
  importe: number;
  categoria: string;     
}

interface BidHistoryLogProps {
  bids: BidEvent[];
  fullHeight?: boolean;
}

export default function BidHistoryLog({ bids, fullHeight = false }: BidHistoryLogProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  const getCategoryData = (idCategory: string) => {
    switch (idCategory) {
      case "Plata": return { name: "Silver", color: "#B6BABD" };
      case "Oro": return { name: "Gold", color: "#E8B83C" };
      case "Platino": return { name: "Platinum", color: "#B8C1E8" };
      default: return { name: "Comun", color: "#FFFFFF" };
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
          const cat = getCategoryData(bid.categoria);
          
          return (
            <Text key={bid.identificador} className="text-white text-base font-bold mb-3 tracking-wide">
              {bid.created_at} - <Text style={{ color: cat.color }}>[{cat.name}]</Text> {bid.ganador}: {formatMoney(bid.importe)}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
}