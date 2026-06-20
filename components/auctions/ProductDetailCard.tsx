import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface ProductDetailCardProps {
  price: string;
  date?: string;
}

export default function ProductDetailCard({
  price,
  date,
}: ProductDetailCardProps) {
  const isPriceDefined = price !== "A definir" && price.trim() !== "";

  return (
    <View className="bg-[#1C1C1E] border border-[#2A2B30] rounded-[28px] p-5 mb-4 shadow-sm w-full">
      <View className="border-b border-[#2A2B30] pb-5 mb-4 items-center w-full">
        <Text className="text-[#E8B83C] text-[11px] font-bold uppercase tracking-[0.2em] mb-1 text-center">
          Precio Base
        </Text>

        <Text
          className={`font-bold text-center w-full px-2 ${
            isPriceDefined
              ? "text-4xl text-white tracking-tight"
              : "text-2xl text-[#9CA3AF] italic"
          }`}
          numberOfLines={1}
          adjustsFontSizeToFit={true}
        >
          {price}
        </Text>
      </View>

      <View className="flex-row justify-between items-center px-2">
        <View className="flex-row items-center flex-1">
          <View className="w-10 h-10 rounded-full bg-[#2A2B30] items-center justify-center mr-3">
            <Ionicons name="calendar-outline" size={18} color="#E8B83C" />
          </View>
          <View>
            <Text className="text-[#9CA3AF] text-[11px] font-medium uppercase tracking-wider mb-0.5">
              Fecha
            </Text>
            <Text className="text-white text-sm font-semibold">
              {date || "A definir"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
