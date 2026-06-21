import React, { useRef } from "react";
import { ScrollView, Text, View } from "react-native";

export interface BidEvent {
  identificador: number;
  created_at: string;
  asistente: number;
  ganador: string;
  importe: number;
  categoria: string;
  isMe?: boolean;
}

interface BidHistoryLogProps {
  bids: BidEvent[];
  fullHeight?: boolean;
}

export default function BidHistoryLog({
  bids,
  fullHeight = false,
}: BidHistoryLogProps) {
  const scrollViewRef = useRef<ScrollView>(null);

  const getCategoryData = (idCategory: string) => {
    switch (idCategory) {
      case "plata": return { name: "Silver", color: "#C0C0C0" };
      case "oro": return { name: "Gold", color: "#FFD700" };
      case "platino": return { name: "Platinum", color: "#B8C1E8" };
      case "especial": return { name: "Special", color: "#E8B83C" };
      default: return { name: "Comun", color: "#B6BABD" };
    }
  };

  const formatMoney = (value: number) => {
    return "$" + value.toLocaleString("en-US");
  };

  const formatTime = (value: string) => {
    return new Date(value).toLocaleTimeString("en-GB", {
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    });
  };

  return (
    <View
      className={`bg-[#1C1D21] rounded-xl p-4 w-full border border-[#2A2B30] ${
        fullHeight ? "flex-1 min-h-[300px]" : "h-48"
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
            <Text
              key={bid.identificador}
              className={`text-base font-bold mb-3 tracking-wide ${
                bid.isMe ? 'text-[#38BDF8]' : 'text-white' 
              }`}
            >
              {formatTime(bid.created_at)} -{" "}
              <Text style={{ color: cat.color }}>[{cat.name}]</Text>{" "}
              {bid.isMe ? "(Vos)" : `Postor ${bid.identificador}`}: {formatMoney(bid.importe)}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
}