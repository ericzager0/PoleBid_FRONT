import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface ReceiptCardProps {
  buyerName: string;
  totalAmount: number;
  netAmount: number;
  currency?: string;
}

export default function ReceiptCard({
  buyerName,
  totalAmount,
  netAmount,
  currency = 'ARS'
}: ReceiptCardProps) {

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('es-AR').format(amount);
  };

  const rawPercentage = (netAmount / totalAmount) * 100;
  const progressPercentage = Math.min(rawPercentage, 100);

  return (
    <View className="w-full bg-[#E5E5E5] rounded-3xl p-6">
      <View className="flex-row items-center mb-5">
        <View className="w-12 h-12 rounded-full bg-[#4B4E54] items-center justify-center mr-4">
          <Ionicons name="person" size={24} color="#E5E5E5" />
        </View>
        <View>
          <Text className="text-[#6B7280] text-sm font-medium mb-0.5">
            Adquirido por
          </Text>
          <Text className="text-[#1A1A1A] text-xl font-bold">
            {buyerName}
          </Text>
        </View>
      </View>

      <View className="h-[1px] bg-[#D1D5DB] w-full mb-5" />

      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[#6B7280] text-base font-medium">
          Monto total
        </Text>
        <Text className="text-[#1A1A1A] text-xl font-bold">
          {currency} {formatMoney(totalAmount)}
        </Text>
      </View>

      <View className="w-full h-2 bg-[#D1D5DB] rounded-full mb-5 overflow-hidden">
        <View 
          className="h-full bg-[#FDD835] rounded-full" 
          style={{ width: `${progressPercentage}%` }} 
        />
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-[#1A1A1A] text-lg font-bold">
          Usted recibe
        </Text>
        <Text className="text-[#1A1A1A] text-2xl font-bold">
          {currency} {formatMoney(netAmount)}
        </Text>
      </View>

    </View>
  );
}